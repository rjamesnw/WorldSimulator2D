namespace WorldSimulator2D {

    export interface IGraphObjectInternal {
        index: number;
        world: IWorld;
        layer: ILayer;
        parent: IGraphObject;
        previous: IGraphObject;
        next: IGraphObject;
        firstChild: IGraphObject;
        lastChild: IGraphObject;
        flattenedItems: IArrayBuffer<IGraphObject>;
        graphUpdated: boolean;
        childrenUpdated: boolean;
        children: IArrayBuffer<IGraphObject>;
    }

    /**
     * Holds a collection of nested objects.
     * A graph is a comment nested-layout-based construct used by most layout engines (example: the browser DOM).
     */
    export class GraphObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends EngineObject implements IGraphObjectInternal {
        // --------------------------------------------------------------------------------------------------------------------

        static readonly type = EngineObject.type | ObjectTypes.GraphObject;

        protected static _nonClonableProperties: I_nonClonableProperties = (
            GraphObject._nonClonableProperties['index'] = void 0,
            GraphObject._nonClonableProperties['world'] = void 0,
            GraphObject._nonClonableProperties['layer'] = void 0,
            GraphObject._nonClonableProperties['parent'] = void 0,
            GraphObject._nonClonableProperties['previous'] = void 0,
            GraphObject._nonClonableProperties['next'] = void 0,
            GraphObject._nonClonableProperties['firstChild'] = void 0,
            GraphObject._nonClonableProperties['lastChild'] = void 0,
            GraphObject._nonClonableProperties['updateCounter'] = void 0,
            GraphObject._nonClonableProperties['_updateCounter'] = void 0,
            GraphObject._nonClonableProperties
        );

        // --------------------------------------------------------------------------------------------------------------------

        /** The index of this object in the parent child collection. */
        readonly index: number;

        /** The world in which this graph object resides. */
        readonly world: IWorld;

        /** The layer in the world in which this graph object resides. */
        readonly layer: ILayer;

        /** The parent object to this object. */
        readonly parent: TParent;

        /** The previous sibling graph object. */
        readonly previous: IGraphObject;

        /** The next sibling graph object. */
        readonly next: IGraphObject;

        /** The first graph object child under this graph object (linked-list). */
        readonly firstChild: TChildren;
        /** The last graph object child under this graph object (linked-list). */
        readonly lastChild: TChildren;

        /** All child items under this graph object. */
        get children(): IArrayBuffer<TChildren> {
            var children = this._children;
            if (this.childrenUpdated || !children) {
                if (!children) this._children = children = createArrayBuffer();
                children.count = 0;
                var o = <IGraphObjectInternal>this.firstChild;
                while (o) { o.index = children.count; children[children.count++] = <TChildren>o; o = <TChildren>o.next; }
                (<IGraphObjectInternal>this).childrenUpdated = false;
            }
            return children;
        }
        private _children: IArrayBuffer<TChildren>;

        /** Set to true when the graph under this object has changed (not including this object).
        * This is especially used by the world instance to know when to re-flatten the hierarchy for processing.
        */
        readonly graphUpdated: boolean;

        /** Set to true when any immediate child was added or removed under this object.
        * This is especially used to speed up flattening the graph hierarchy.
        */
        readonly childrenUpdated: boolean;

        /**
        * Triggered every time the parent reference changes.
        * @param source The source of the event. This is used mainly to update the local world and layer references when a parent changes.
        */
        protected onParentChanged(source: IGraphObject): void {
            (<IGraphObjectInternal>this).world = source.world;
            (<IGraphObjectInternal>this).layer = source.layer;
            // ... notify children as well ...
            if (this.firstChild)
                this.firstChild.onParentChanged(source);
            if (this.next)
                this.next.onParentChanged(source);
        }

        /** The number of updates made to this object. The update increments each time 'update()' is called.  This is 0 when the update is being called for the first time. */
        get updateCount() { return this._updateCount; }
        protected _updateCount: number = 0; // (this doesn't default to 0 in case the value wraps; undefined will be the flag for the first time)

        /** This is false before 'update()' is called, then true for every call thereafter. */
        get running() { return this._updateCount > 0; }

        // --------------------------------------------------------------------------------------------------------------------

        constructor() { super(); }

        /**
       * Returns a new Error instance with added information to identify the graph object.
       * @param msg The error message.
       */
        error(msg: string): Error {
            return super.error(msg, this.world, this.layer);
        }

        initialize(isnew: boolean, autoReset?: boolean) {
            super.initialize(isnew, autoReset);
        }

        configure(...args: any[]): this {
            return this;
        }

        dispose(): void {
            // ... dispose all children first ...
            this.clear();
            // ... remove from any parent graph node ...
            this.remove();
            // ... call base to complete the disposal ...
            super.dispose();
        }

        /**
         * Remove all the child objects from this graph object.
         */
        clear(): void {
            while (this.lastChild)
                this.lastChild.dispose(); // (always best practice to remove from end first [reverse from adding])
        }

        // --------------------------------------------------------------------------------------------------------------------

        /**
         * Adds the specified object and returns it's position in the collection.
         * @param obj The object to add.
         */
        add(obj: TChildren): TChildren {
            if (typeof obj != OBJECT || obj === null) throw this.error("No object was given to add.");

            var o = <IGraphObjectInternal>obj, $this = <IGraphObjectInternal>this, fc = <IGraphObjectInternal>this.firstChild, lc = <IGraphObjectInternal>this.lastChild;

            if (o.parent == this) return obj; // (assume already added)

            var parentChanged = false;
            if (o.parent && o.parent != this) {
                debugger;
                obj.remove();
                parentChanged = true;
            }

            if (fc || lc) {
                if (!fc) $this.firstChild = fc = <IGraphObject>lc; // (just fix things up, just in case a users makes an error)
                if (!lc) $this.lastChild = lc = <IGraphObject>fc; // (just fix things up, just in case a users makes an error)
                lc.next = <IGraphObject>o; o.previous = <IGraphObject>lc;
                $this.lastChild = <IGraphObject>o;
            } else {
                (<IGraphObjectInternal>this).firstChild = obj;
                (<IGraphObjectInternal>this).lastChild = obj;
            }

            $this.childrenUpdated = true;

            o.parent = this;

            if (<object>this != this.engine) { // (this part doesn't apply to the engine)
                o.world = this instanceof World ? this : this.world;
                if (<object>this != this.world) // (this part doesn't apply to worlds)
                    o.layer = this instanceof Layer ? this : this.layer;
            }

            // ... flag this and all parent hierarchy levels that the graph has updated down to this point.
            var _ = $this;
            while (_) { _.graphUpdated = true; _ = _.parent; }

            if (parentChanged && obj.onParentChanged)
                obj.onParentChanged(this);

            return obj;
        }
        private _updateWorldAndLayer(world: World, layer: Layer): void {
            (<IGraphObjectInternal>this).world = world;
            (<IGraphObjectInternal>this).layer = layer;
        }

        /**
         * Removes and returns the current object from the parent and returns it.
         */
        remove(): this {
            var $this = <IGraphObjectInternal>this, parent = <IGraphObjectInternal>this.parent, prev = <IGraphObjectInternal>this.previous, next = <IGraphObjectInternal>this.next;

            if (parent) {
                if (parent.firstChild == $this)
                    parent.firstChild = $this.next;
                if (parent.lastChild == $this)
                    parent.lastChild = $this.previous;
                parent.childrenUpdated = true;
                // ... flag all parent hierarchy levels that the graph has updated down to this point.
                var o = parent;
                while (o) { o.graphUpdated = true; o = o.parent; }
            }

            if (prev || next) {
                if (prev) prev.next = $this.next;
                if (next) next.previous = $this.previous;
                $this.next = null;
                $this.previous = null;
            }

            $this.world = void 0; // (no longer associated with a world)
            $this.layer = void 0; // (no longer associated with a layer)
            $this.index = void 0; // (no longer associated with an array index)
            $this.parent = void 0; // (no longer associated with a parent)

            return this;
        }

        // --------------------------------------------------------------------------------------------------------------------

        /**
         * Called once ONLY when '{Engine}.update()' is called the first time.
         */
        startup(): this {
            if (!(this instanceof Engine))
                if (!this.world)
                    throw this.error("This object is not associated with a world.  An associated world is required to render objects.  Put the object into a world first.");
            this._updateCount = 0;
            return this;
        }

        /**
         * Call to update this object and copy the results to the buffer for accelerated processing.
         * @param buffer The buffer that will receive the updated values from this object.
         * @param index The index where to copy the values.
         * @returns True if values were written to the buffer, and false otherwise.
         */
        update(processor?: MathPipelines.MathProcessor): this {
            if (!(this._updateCount > 0))
                this._updateCount = 1;
            else
                ++this._updateCount;
            return this;
        }

        /**
         * Process calculations.
         * @param buffer The buffer with the results.
         * @param index The index into the buffer with the result block.
         * @param calcID 
         */
        postUpdate?(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;

        /**
         * Called during the render process, before the world gets rendered.
         */
        render(includeNext = false): void {
            if (this.firstChild)
                this.firstChild.render(true);
        }

        // --------------------------------------------------------------------------------------------------------------------

        ///** A stack used to iterated over all objects and nested objects without incurring the penalty of calling functions. */
        //?private static _placeHolder: IArrayBuffer<IGraphObject> = createArrayBuffer();
        //?private static _lastIndex: IArrayBuffer<number> = createArrayBuffer();

        /** Call 'flatten()' to build/update this list.
        * 'flattenedItems.count' will be the actual number of items stored. 'flattenedItems.length' is capacity only (to limit any resizing).
        */
        readonly flattenedItems: IArrayBuffer<IGraphObject>;

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
        flatten(includethis = true) { // (https://jsperf.com/iterative-array-flatten-2)
            var i = 0, o = <IGraphObjectInternal>this, fc = o.firstChild, out = this.flattenedItems;

            if (!this.graphUpdated && out) return out; // (no changes detected, return the same list of items)

            if (!out) o.flattenedItems = out = createArrayBuffer();

            out.count = 0;

            // ... iterate depth first: top [back], to bottom [front] ...

            if (fc)  // (note: if a child does exist this allows us to only need to check if the while loop is done in one place only)
                do {
                    if (fc) { // (go into child objects under this one)
                        o = fc;
                        fc = o.firstChild;
                        i = 0;
                        o.index = i; // (especially useful for 'Z' levels [where 0 is the farthest back])
                    } else {
                        out[out.count++] = <IGraphObject>o; // (add leaf, depth first)
                        if (o.next) {
                            o = o.next; // (next leaf)
                            o.index = ++i;
                            fc = o.firstChild;
                        } else {
                            // ... end of objects at this level, go back to parent, store it finally, and jump to next if not done ...
                            o = o.parent;
                            if (o == <object>this) break; // (note: cannot add any index to the root object; only while going through children)
                            i = o.index;
                            fc = null; // (when coming back to the parent don't check the first child again)
                        }
                    }
                } while (true);

            // ... the root object started from is not added via the loop, and is always the LAST item added to the list ...

            if (includethis)
                out[out.count++] = <IGraphObject>o;

            (<IGraphObjectInternal>this).graphUpdated = false;

            return out;
        }

        // --------------------------------------------------------------------------------------------------------------------

        /**
         * Traverse the tree in real-time to count this instance and all child instances.
         * Note: 'flattenedItems.count' can also be used to get a count of all objects when 'flatten()' is called.
         */
        count(): number {
            var count = 1;
            if (this.firstChild)
                count += this.firstChild.count();
            if (this.next)
                count += this.next.count();
            return count;
        }

        // --------------------------------------------------------------------------------------------------------------------
    }

    export interface IGraphObject extends GraphObject { }
}

// Warning: Recursive tree calling on large numbers of objects will fail with stack overflow.