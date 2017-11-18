var WorldSimulator2D;
(function (WorldSimulator2D) {
    /**
     * A special collection that never shortens the internal array, and keeps track of empty index locations for fast adding
     * and removing of items.  As items are removed from the end, a special 'last index' pointer is reduced.
     * This collection mainly exists to use indexes as object IDs for quick add, lookup, and removal using those IDs.  Objects
     * added to this collection are not kept in order.
     * Note: When adding objects, to make removing more efficient, make sure they have a unique 'id' property, otherwise
     * 'indexOf()' on the items list is used to find the item to be removed, which is an O(n) operation.
     */
    var IndexedCollection = /** @class */ (function () {
        function IndexedCollection() {
            this._lastItemIndex = -1; // (index of the last item)
            this.count = 0;
            this._locked = false;
            this._capacityLocked = false;
        }
        Object.defineProperty(IndexedCollection.prototype, "capactity", {
            get: function () { return this.items && this.items.length || 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndexedCollection.prototype, "isLocked", {
            /** Returns true of the collection is locked and cannot be changed (however, the collection can still be disposed). */
            get: function () { return this._locked; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndexedCollection.prototype, "isCapacityLocked", {
            /** Returns true of the collection is locked and cannot be expanded beyond the initial capacity*/
            get: function () { return this._capacityLocked; },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the new capacity for the collection.
         * If the new size is less than the items array length, the request is ignored (the items will not be truncated).
         * @param size The new size of the items array.
         */
        IndexedCollection.prototype.setCapacity = function (size, locked) {
            if (locked === void 0) { locked = false; }
            if (this._locked)
                throw Error("The collection is locked and cannot be modified.");
            if (this._capacityLocked)
                throw Error("Capacity is locked and cannot be changed.");
            if (size > 0) {
                if (!this.items)
                    this.items = [];
                if (size > this.items.length)
                    this.items.length = size;
            }
            this._capacityLocked = locked;
            return this;
        };
        IndexedCollection.prototype.setItem = function (index, item) {
            if (this._locked)
                throw Error("The collection is locked and cannot be modified.");
            if (!this.items)
                this.items = [];
            this.items[index] = item;
            return this;
        };
        /**
         * Adds a new item and returns it's index.
         */
        IndexedCollection.prototype.add = function (item) {
            if (this._locked)
                throw Error("The collection is locked and cannot be modified.");
            if (!this.items)
                this.items = [];
            if (this._emptyIndexes && this._emptyIndexes.length > 0)
                var i = this._emptyIndexes.pop();
            else {
                if (this._capacityLocked)
                    throw Error("Capacity reached and this collection does not allowed expansion.");
                var i = ++this._lastItemIndex;
            }
            this.items[i] = item;
            if (i > this._lastItemIndex)
                this._lastItemIndex = i;
            ++this.count;
            var id = item['id'];
            if (typeof id == "number" || typeof id == "string") {
                if (!this._IdObjectsIndex)
                    this._IdObjectsIndex = {};
                this._IdObjectsIndex[id] = i;
            }
            return i;
        };
        /**
         * Adds a range of items. The items are added one by one to make sure any empty indexes are used. As such, the additions
         * may not be sequential.
         */
        IndexedCollection.prototype.addRange = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            if (this._locked)
                throw Error("The collection is locked and cannot be modified.");
            if (items && items.length) {
                if (!this.items)
                    this.items = [];
                for (var i = 0, n = items.length; i < n; ++i)
                    this.add(items[i]);
            }
            return this;
        };
        /**
         * Adds a range of items and returns the index of the first item.
         * Note: For speed purposes, adding ranges ALWAYS appends and never uses empty index positions.
         */
        IndexedCollection.prototype.fastAddRange = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            if (this._locked)
                throw Error("The collection is locked and cannot be modified.");
            if (this._capacityLocked)
                throw Error("Capacity reached and this collection does not allowed expansion.");
            if (items && items.length) {
                if (!this.items)
                    this.items = [];
                var firstItemIndex = this.items.length;
                (_a = this.items).push.apply(_a, items);
                this._lastItemIndex = this.items.length - 1;
                this.count += items.length;
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
            var _a;
        };
        /**
         * Find and return the index of the given item.
         */
        IndexedCollection.prototype.indexOf = function (item) {
            var id = item['id'];
            if (typeof id == "number" || typeof id == "string")
                return this._IdObjectsIndex && this._IdObjectsIndex[id];
            else
                return this.items && this.items.indexOf(item) || -1;
        };
        /**
         * Removes and returns the item at the specific index.
         * @param index The index of the item to remove.
         * @param ignoreIndexErrors If true, and the index is out of bounds, no error is thrown and 'undefined' is returned.
         */
        IndexedCollection.prototype.removeAt = function (index, ignoreIndexErrors) {
            if (ignoreIndexErrors === void 0) { ignoreIndexErrors = false; }
            if (this._locked)
                throw Error("The collection is locked and cannot be modified.");
            if (index < 0 || index >= this.capactity)
                if (ignoreIndexErrors)
                    return void 0;
                else
                    throw Error("The index is out of bounds.");
            var removedItem = this.items[index];
            if (typeof removedItem == WorldSimulator2D.NUMBER)
                if (ignoreIndexErrors)
                    return void 0;
                else
                    throw Error("There is no item at the given index.");
            if (index == this._lastItemIndex)
                while (this.items[this._lastItemIndex] === void 0)
                    --this._lastItemIndex; // (reduce the last item index until a non-undefined entry is found)
            if (!this._emptyIndexes)
                this._emptyIndexes = [];
            this.items[index] = this._emptyIndexes.length;
            this._emptyIndexes.push(index);
            var id = removedItem['id'];
            if (typeof id == "number" || typeof id == "string")
                this._IdObjectsIndex && (this._IdObjectsIndex[id] = void 0);
            --this.count;
            return removedItem;
        };
        /**
         * Removes and returns the specified item.
         * @param item The item to remove.
         * @param ignoreErrors If true, and the item does not exist, no error is thrown, and the given item is just returned.
         */
        IndexedCollection.prototype.remove = function (item, ignoreErrors) {
            if (ignoreErrors === void 0) { ignoreErrors = false; }
            if (this._locked)
                throw Error("The collection is locked and cannot be modified.");
            var i = this.indexOf(item);
            if (i < 0)
                if (ignoreErrors)
                    return item;
                else
                    throw Error("The specified item does not exist in this collection.");
            return this.removeAt(i);
        };
        /**
         * Clears the collection and optionally disposes the individual items as well (if applicable).
         * @param includeItems If true (default) will call the 'dispose()' functions existing on any objects in the collection.
         */
        IndexedCollection.prototype.dispose = function (includeItems) {
            if (includeItems === void 0) { includeItems = true; }
            if (this.items) {
                if (includeItems)
                    for (var i = this.items.length - 1; i >= 0; --i) {
                        var item = this.items[i];
                        if (typeof item == WorldSimulator2D.OBJECT && typeof item.dispose == WorldSimulator2D.FUNCTION)
                            item.dispose();
                    }
                this.items.length = 0;
            }
            if (this._emptyIndexes)
                this._emptyIndexes.length = 0;
            if (this._IdObjectsIndex)
                this._IdObjectsIndex.length = 0;
            this._lastItemIndex = -1;
            this.count = 0;
            this._locked = false;
            this._capacityLocked = false;
        };
        return IndexedCollection;
    }());
    WorldSimulator2D.IndexedCollection = IndexedCollection;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=indexedcollection.js.map