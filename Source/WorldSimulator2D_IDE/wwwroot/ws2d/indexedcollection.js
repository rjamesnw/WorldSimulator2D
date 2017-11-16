var WorldSimulator2D;
(function (WorldSimulator2D) {
    var IndexedCollection = (function () {
        function IndexedCollection() {
            this._lastItemIndex = -1;
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
            get: function () { return this._locked; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndexedCollection.prototype, "isCapacityLocked", {
            get: function () { return this._capacityLocked; },
            enumerable: true,
            configurable: true
        });
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
        IndexedCollection.prototype.indexOf = function (item) {
            var id = item['id'];
            if (typeof id == "number" || typeof id == "string")
                return this._IdObjectsIndex && this._IdObjectsIndex[id];
            else
                return this.items && this.items.indexOf(item) || -1;
        };
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
                    --this._lastItemIndex;
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