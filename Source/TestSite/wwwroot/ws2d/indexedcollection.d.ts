declare namespace WorldSimulator2D {
    /**
     * A special collection that never shortens the internal array, and keeps track of empty index locations for fast adding
     * and removing of items.  As items are removed from the end, a special 'last index' pointer is reduced.
     * This collection mainly exists to use indexes as object IDs for quick add, lookup, and removal using those IDs.  Objects
     * added to this collection are not kept in order.
     * Note: When adding objects, to make removing more efficient, make sure they have a unique 'id' property, otherwise
     * 'indexOf()' on the items list is used to find the item to be removed, which is an O(n) operation.
     */
    class IndexedCollection<T> implements IDisposable {
        readonly items: T[];
        private _lastItemIndex;
        private _emptyIndexes;
        private _IdObjectsIndex;
        readonly capactity: number;
        readonly count: number;
        /** Returns true of the collection is locked and cannot be changed (however, the collection can still be disposed). */
        readonly isLocked: boolean;
        private _locked;
        /** Returns true of the collection is locked and cannot be expanded beyond the initial capacity*/
        readonly isCapacityLocked: boolean;
        private _capacityLocked;
        /**
         * Sets the new capacity for the collection.
         * If the new size is less than the items array length, the request is ignored (the items will not be truncated).
         * @param size The new size of the items array.
         */
        setCapacity(size: number, locked?: boolean): this;
        setItem(index: number, item: T): this;
        /**
         * Adds a new item and returns it's index.
         */
        add(item: T): number;
        /**
         * Adds a range of items. The items are added one by one to make sure any empty indexes are used. As such, the additions
         * may not be sequential.
         */
        addRange(...items: T[]): this;
        /**
         * Adds a range of items and returns the index of the first item.
         * Note: For speed purposes, adding ranges ALWAYS appends and never uses empty index positions.
         */
        fastAddRange(...items: T[]): number;
        /**
         * Find and return the index of the given item.
         */
        indexOf(item: T): number;
        /**
         * Removes and returns the item at the specific index.
         * @param index The index of the item to remove.
         * @param ignoreIndexErrors If true, and the index is out of bounds, no error is thrown and 'undefined' is returned.
         */
        removeAt(index: number, ignoreIndexErrors?: boolean): T;
        /**
         * Removes and returns the specified item.
         * @param item The item to remove.
         * @param ignoreErrors If true, and the item does not exist, no error is thrown, and the given item is just returned.
         */
        remove(item: T, ignoreErrors?: boolean): T;
        /**
         * Clears the collection and optionally disposes the individual items as well (if applicable).
         * @param includeItems If true (default) will call the 'dispose()' functions existing on any objects in the collection.
         */
        dispose(includeItems?: boolean): void;
    }
}
