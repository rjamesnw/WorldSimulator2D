var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WorldSimulator2D;
(function (WorldSimulator2D) {
    /**
     * Holds a collection of nested objects.
     * A graph is a comment nested-layout-based construct used by most layout engines (example: the browser DOM).
     */
    var GraphObject = /** @class */ (function (_super) {
        __extends(GraphObject, _super);
        // --------------------------------------------------------------------------------------------------------------------
        function GraphObject() {
            var _this = _super.call(this) || this;
            _this._updateCount = 0; // (this doesn't default to 0 in case the value wraps; undefined will be the flag for the first time)
            return _this;
        }
        Object.defineProperty(GraphObject.prototype, "children", {
            /** All child items under this graph object. */
            get: function () {
                var children = this._children;
                if (this.childrenUpdated || !children) {
                    if (!children)
                        this._children = children = WorldSimulator2D.createArrayBuffer();
                    children.count = 0;
                    var o = this.firstChild;
                    while (o) {
                        o.index = children.count;
                        children[children.count++] = o;
                        o = o.next;
                    }
                    this.childrenUpdated = false;
                }
                return children;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * Triggered every time the parent reference changes.
        * @param source The source of the event. This is used mainly to update the local world and layer references when a parent changes.
        */
        GraphObject.prototype.onParentChanged = function (source) {
            this.world = source.world;
            this.layer = source.layer;
            // ... notify children as well ...
            if (this.firstChild)
                this.firstChild.onParentChanged(source);
            if (this.next)
                this.next.onParentChanged(source);
        };
        Object.defineProperty(GraphObject.prototype, "updateCount", {
            /** The number of updates made to this object. The update increments each time 'update()' is called.  This is 0 when the update is being called for the first time. */
            get: function () { return this._updateCount; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GraphObject.prototype, "running", {
            /** This is false before 'update()' is called, then true for every call thereafter. */
            get: function () { return this._updateCount > 0; },
            enumerable: true,
            configurable: true
        });
        /**
       * Returns a new Error instance with added information to identify the graph object.
       * @param msg The error message.
       */
        GraphObject.prototype.error = function (msg) {
            return _super.prototype.error.call(this, msg, this.world, this.layer);
        };
        GraphObject.prototype.initialize = function (isnew, autoReset) {
            _super.prototype.initialize.call(this, isnew, autoReset);
        };
        GraphObject.prototype.configure = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this;
        };
        GraphObject.prototype.dispose = function () {
            // ... dispose all children first ...
            this.clear();
            // ... remove from any parent graph node ...
            this.remove();
            // ... call base to complete the disposal ...
            _super.prototype.dispose.call(this);
        };
        /**
         * Remove all the child objects from this graph object.
         */
        GraphObject.prototype.clear = function () {
            while (this.lastChild)
                this.lastChild.dispose(); // (always best practice to remove from end first [reverse from adding])
        };
        // --------------------------------------------------------------------------------------------------------------------
        /**
         * Adds the specified object and returns it's position in the collection.
         * @param obj The object to add.
         */
        GraphObject.prototype.add = function (obj) {
            if (typeof obj != WorldSimulator2D.OBJECT || obj === null)
                throw this.error("No object was given to add.");
            var o = obj, $this = this, fc = this.firstChild, lc = this.lastChild;
            if (o.parent == this)
                return obj; // (assume already added)
            var parentChanged = false;
            if (o.parent && o.parent != this) {
                debugger;
                obj.remove();
                parentChanged = true;
            }
            if (fc || lc) {
                if (!fc)
                    $this.firstChild = fc = lc; // (just fix things up, just in case a users makes an error)
                if (!lc)
                    $this.lastChild = lc = fc; // (just fix things up, just in case a users makes an error)
                lc.next = o;
                o.previous = lc;
                $this.lastChild = o;
            }
            else {
                this.firstChild = obj;
                this.lastChild = obj;
            }
            $this.childrenUpdated = true;
            o.parent = this;
            if (this != this.engine) {
                o.world = this instanceof WorldSimulator2D.World ? this : this.world;
                if (this != this.world)
                    o.layer = this instanceof WorldSimulator2D.Layer ? this : this.layer;
            }
            // ... flag this and all parent hierarchy levels that the graph has updated down to this point.
            var _ = $this;
            while (_) {
                _.graphUpdated = true;
                _ = _.parent;
            }
            if (parentChanged && obj.onParentChanged)
                obj.onParentChanged(this);
            return obj;
        };
        GraphObject.prototype._updateWorldAndLayer = function (world, layer) {
            this.world = world;
            this.layer = layer;
        };
        /**
         * Removes and returns the current object from the parent and returns it.
         */
        GraphObject.prototype.remove = function () {
            var $this = this, parent = this.parent, prev = this.previous, next = this.next;
            if (parent) {
                if (parent.firstChild == $this)
                    parent.firstChild = $this.next;
                if (parent.lastChild == $this)
                    parent.lastChild = $this.previous;
                parent.childrenUpdated = true;
                // ... flag all parent hierarchy levels that the graph has updated down to this point.
                var o = parent;
                while (o) {
                    o.graphUpdated = true;
                    o = o.parent;
                }
            }
            if (prev || next) {
                if (prev)
                    prev.next = $this.next;
                if (next)
                    next.previous = $this.previous;
                $this.next = null;
                $this.previous = null;
            }
            $this.world = void 0; // (no longer associated with a world)
            $this.layer = void 0; // (no longer associated with a layer)
            $this.index = void 0; // (no longer associated with an array index)
            $this.parent = void 0; // (no longer associated with a parent)
            return this;
        };
        // --------------------------------------------------------------------------------------------------------------------
        /**
         * Called once ONLY when '{Engine}.update()' is called the first time.
         */
        GraphObject.prototype.startup = function () {
            if (!(this instanceof WorldSimulator2D.Engine))
                if (!this.world)
                    throw this.error("This object is not associated with a world.  An associated world is required to render objects.  Put the object into a world first.");
            this._updateCount = 0;
            return this;
        };
        /**
         * Call to update this object and copy the results to the buffer for accelerated processing.
         * @param buffer The buffer that will receive the updated values from this object.
         * @param index The index where to copy the values.
         * @returns True if values were written to the buffer, and false otherwise.
         */
        GraphObject.prototype.update = function (processor) {
            if (!(this._updateCount > 0))
                this._updateCount = 1;
            else
                ++this._updateCount;
            return this;
        };
        /**
         * Called during the render process, before the world gets rendered.
         */
        GraphObject.prototype.render = function (includeNext) {
            if (includeNext === void 0) { includeNext = false; }
            if (this.firstChild)
                this.firstChild.render(true);
        };
        /**
         * Flattens the graph hierarchy (this object and all children) as an array and returns the array.
         * If 'graphUpdated' is true, then no changes where made to the hierarchy, and the previous list is returned as is.
         * Calling this function will set 'graphUpdated' to false on this object (only).
         * The array returned is cached in the current instance and reused.  If you wish to modify the array, be aware calling this function
         * will update the same array.  Make sure to make a copy of the array returned if you wish to persist any changes to it.
         * You can use 'WS2D.copyArray()' for a fast cross-browser solution.
         * Note: The array returned is of type 'WS2D.IArrayBuffer', and has a 'count' property for the number of items, not
         * 'length'. The array length is the "capacity" of the array, not the number of items.
         * WARNING: This should only be called on a root object of a tree (like the world).  Calling this on every object would create a
         * flattened array on every object in the tree for all objects under it, taking up way too much memory than really needed.
         * @param includethis If true (default) then the current object is included in the flattened list.
         */
        GraphObject.prototype.flatten = function (includethis) {
            if (includethis === void 0) { includethis = true; }
            var i = 0, o = this, fc = o.firstChild, out = this.flattenedItems;
            if (!this.graphUpdated && out)
                return out; // (no changes detected, return the same list of items)
            if (!out)
                o.flattenedItems = out = WorldSimulator2D.createArrayBuffer();
            out.count = 0;
            // ... iterate depth first: top [back], to bottom [front] ...
            if (fc)
                do {
                    if (fc) {
                        o = fc;
                        fc = o.firstChild;
                        i = 0;
                        o.index = i; // (especially useful for 'Z' levels [where 0 is the farthest back])
                    }
                    else {
                        out[out.count++] = o; // (add leaf, depth first)
                        if (o.next) {
                            o = o.next; // (next leaf)
                            o.index = ++i;
                            fc = o.firstChild;
                        }
                        else {
                            // ... end of objects at this level, go back to parent, store it finally, and jump to next if not done ...
                            o = o.parent;
                            if (o == this)
                                break; // (note: cannot add any index to the root object; only while going through children)
                            i = o.index;
                            fc = null; // (when coming back to the parent don't check the first child again)
                        }
                    }
                } while (true);
            // ... the root object started from is not added via the loop, and is always the LAST item added to the list ...
            if (includethis)
                out[out.count++] = o;
            this.graphUpdated = false;
            return out;
        };
        // --------------------------------------------------------------------------------------------------------------------
        /**
         * Traverse the tree in real-time to count this instance and all child instances.
         * Note: 'flattenedItems.count' can also be used to get a count of all objects when 'flatten()' is called.
         */
        GraphObject.prototype.count = function () {
            var count = 1;
            if (this.firstChild)
                count += this.firstChild.count();
            if (this.next)
                count += this.next.count();
            return count;
        };
        // --------------------------------------------------------------------------------------------------------------------
        GraphObject.type = WorldSimulator2D.EngineObject.type | WorldSimulator2D.ObjectTypes.GraphObject;
        GraphObject._nonClonableProperties = (GraphObject._nonClonableProperties['index'] = void 0,
            GraphObject._nonClonableProperties['world'] = void 0,
            GraphObject._nonClonableProperties['layer'] = void 0,
            GraphObject._nonClonableProperties['parent'] = void 0,
            GraphObject._nonClonableProperties['previous'] = void 0,
            GraphObject._nonClonableProperties['next'] = void 0,
            GraphObject._nonClonableProperties['firstChild'] = void 0,
            GraphObject._nonClonableProperties['lastChild'] = void 0,
            GraphObject._nonClonableProperties['updateCounter'] = void 0,
            GraphObject._nonClonableProperties['_updateCounter'] = void 0,
            GraphObject._nonClonableProperties);
        return GraphObject;
    }(WorldSimulator2D.EngineObject));
    WorldSimulator2D.GraphObject = GraphObject;
})(WorldSimulator2D || (WorldSimulator2D = {}));
// Warning: Recursive tree calling on large numbers of objects will fail with stack overflow. 
//# sourceMappingURL=graphobject.js.map