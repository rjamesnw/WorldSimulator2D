namespace WorldSimulator2D {

    /**
     * A special collection that never shortens the internal array, and keeps track of empty index locations for fast adding
     * and removing of items.  As items are removed from the end, a special 'last index' pointer is reduced.
     * This collection mainly exists to use indexes as object IDs for quick add, lookup, and removal using those IDs.  Objects
     * added to this collection are not kept in order.
     * Note: When adding objects, to make removing more efficient, make sure they have a unique 'id' property, otherwise
     * 'indexOf()' on the items list is used to find the item to be removed, which is an O(n) operation.
     */
    export class IndexedCollection<T> implements IDisposable {
        readonly items: T[]; // (if a number, it is a back reference to the '_emptyIndexes' array where the empty index was placed)
        private _lastItemIndex: number = -1; // (index of the last item)
        private _emptyIndexes: number[]; // (the indexes of removed items)
        private _IdObjectsIndex: { [index: string]: number;[index: number]: number; }; // (a special dictionary of engine objects based on their IDs for faster lookups)
        get capactity() { return this.items && this.items.length || 0; }
        readonly count: number = 0;

        /** Returns true of the collection is locked and cannot be changed (however, the collection can still be disposed). */
        get isLocked() { return this._locked; }
        private _locked = false;

        /** Returns true of the collection is locked and cannot be expanded beyond the initial capacity*/
        get isCapacityLocked() { return this._capacityLocked; }
        private _capacityLocked = false;

        /**
         * Sets the new capacity for the collection.
         * If the new size is less than the items array length, the request is ignored (the items will not be truncated).
         * @param size The new size of the items array.
         */
        setCapacity(size: number, locked = false): this {
            if (this._locked) throw Error("The collection is locked and cannot be modified.");
            if (this._capacityLocked) throw Error("Capacity is locked and cannot be changed.");
            if (size > 0) {
                if (!this.items)
                    (<{ items: any }>this).items = [];
                if (size > this.items.length)
                    this.items.length = size;
            }
            this._capacityLocked = locked;
            return this;
        }

        setItem(index: number, item: T): this {
            if (this._locked) throw Error("The collection is locked and cannot be modified.");
            if (!this.items)
                (<{ items: any }>this).items = [];
            this.items[index] = item;
            return this;
        }

        /**
         * Adds a new item and returns it's index.
         */
        add(item: T): number {
            if (this._locked) throw Error("The collection is locked and cannot be modified.");
            if (!this.items)
                (<{ items: any }>this).items = [];
            if (this._emptyIndexes && this._emptyIndexes.length > 0)
                var i = this._emptyIndexes.pop()
            else {
                if (this._capacityLocked) throw Error("Capacity reached and this collection does not allowed expansion.");
                var i = ++this._lastItemIndex;
            }
            this.items[i] = item;
            if (i > this._lastItemIndex) this._lastItemIndex = i;
            ++(<{ count: any }>this).count;
            var id = item['id'];
            if (typeof id == "number" || typeof id == "string") {
                if (!this._IdObjectsIndex)
                    this._IdObjectsIndex = {};
                this._IdObjectsIndex[id] = i;
            }
            return i;
        }

        /**
         * Adds a range of items. The items are added one by one to make sure any empty indexes are used. As such, the additions
         * may not be sequential.
         */
        addRange(...items: T[]): this {
            if (this._locked) throw Error("The collection is locked and cannot be modified.");
            if (items && items.length) {
                if (!this.items)
                    (<{ items: any }>this).items = [];
                for (var i = 0, n = items.length; i < n; ++i)
                    this.add(items[i]);
            }
            return this;
        }

        /**
         * Adds a range of items and returns the index of the first item.
         * Note: For speed purposes, adding ranges ALWAYS appends and never uses empty index positions.
         */
        fastAddRange(...items: T[]): number {
            if (this._locked) throw Error("The collection is locked and cannot be modified.");
            if (this._capacityLocked) throw Error("Capacity reached and this collection does not allowed expansion.");
            if (items && items.length) {
                if (!this.items)
                    (<{ items: any }>this).items = [];
                var firstItemIndex = this.items.length;
                this.items.push(...items);
                this._lastItemIndex = this.items.length - 1;
                (<{ count: any }>this).count += items.length;
                // ... still need to check if the items need to be indexed using object IDs ...
                for (var i = firstItemIndex, i2 = this._lastItemIndex; i <= i2; ++i) {
                    var item = items[i];
                    var id = item['id'];
                    if (typeof id == "number" || typeof id == "string") {
                        if (!this._IdObjectsIndex)
                            this._IdObjectsIndex = {};
                        this._IdObjectsIndex[id] = i;
                    }
                }
            }
            return firstItemIndex;
        }

        /**
         * Find and return the index of the given item.
         */
        indexOf(item: T): number {
            var id = item['id'];
            if (typeof id == "number" || typeof id == "string")
                return this._IdObjectsIndex && this._IdObjectsIndex[id];
            else
                return this.items && this.items.indexOf(item) || -1;
        }

        /**
         * Removes and returns the item at the specific index.
         * @param index The index of the item to remove.
         * @param ignoreIndexErrors If true, and the index is out of bounds, no error is thrown and 'undefined' is returned.
         */
        removeAt(index: number, ignoreIndexErrors = false): T {
            if (this._locked) throw Error("The collection is locked and cannot be modified.");
            if (index < 0 || index >= this.capactity)
                if (ignoreIndexErrors)
                    return void 0;
                else
                    throw Error("The index is out of bounds.");
            var removedItem = this.items[index];
            if (typeof removedItem == NUMBER)
                if (ignoreIndexErrors)
                    return void 0;
                else
                    throw Error("There is no item at the given index.");
            if (index == this._lastItemIndex)
                while (this.items[this._lastItemIndex] === void 0)
                    --this._lastItemIndex; // (reduce the last item index until a non-undefined entry is found)
            if (!this._emptyIndexes)
                this._emptyIndexes = [];
            this.items[index] = <any>this._emptyIndexes.length;
            this._emptyIndexes.push(index);
            var id = removedItem['id'];
            if (typeof id == "number" || typeof id == "string")
                this._IdObjectsIndex && (this._IdObjectsIndex[id] = void 0);
            --(<{ count: any }>this).count;
            return removedItem;
        }

        /**
         * Removes and returns the specified item.
         * @param item The item to remove.
         * @param ignoreErrors If true, and the item does not exist, no error is thrown, and the given item is just returned.
         */
        remove(item: T, ignoreErrors = false): T {
            if (this._locked) throw Error("The collection is locked and cannot be modified.");
            var i = this.indexOf(item);
            if (i < 0)
                if (ignoreErrors)
                    return item;
                else
                    throw Error("The specified item does not exist in this collection.")
            return this.removeAt(i);
        }

        /**
         * Clears the collection and optionally disposes the individual items as well (if applicable).
         * @param includeItems If true (default) will call the 'dispose()' functions existing on any objects in the collection.
         */
        dispose(includeItems = true) {
            if (this.items) {
                if (includeItems)
                    for (var i = this.items.length - 1; i >= 0; --i) {
                        var item = this.items[i];
                        if (typeof item == OBJECT && typeof (<IDisposable>item).dispose == FUNCTION)
                            (<IDisposable>item).dispose();
                    }
                this.items.length = 0;
            }
            if (this._emptyIndexes)
                this._emptyIndexes.length = 0;
            if (this._IdObjectsIndex)
                this._IdObjectsIndex.length = 0;
            this._lastItemIndex = -1;
            (<{ count: any }>this).count = 0;
            this._locked = false;
            this._capacityLocked = false;
        }

    }
}