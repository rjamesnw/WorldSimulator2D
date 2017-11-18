declare namespace WorldSimulator2D {
    interface IGraphObjectInternal {
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
    class GraphObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends EngineObject implements IGraphObjectInternal {
        static readonly type: number;
        protected static _nonClonableProperties: I_nonClonableProperties;
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
        readonly children: IArrayBuffer<TChildren>;
        private _children;
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
        protected onParentChanged(source: IGraphObject): void;
        /** The number of updates made to this object. The update increments each time 'update()' is called.  This is 0 when the update is being called for the first time. */
        readonly updateCount: number;
        protected _updateCount: number;
        /** This is false before 'update()' is called, then true for every call thereafter. */
        readonly running: boolean;
        constructor();
        /**
       * Returns a new Error instance with added information to identify the graph object.
       * @param msg The error message.
       */
        error(msg: string): Error;
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(...args: any[]): this;
        dispose(): void;
        /**
         * Remove all the child objects from this graph object.
         */
        clear(): void;
        /**
         * Adds the specified object and returns it's position in the collection.
         * @param obj The object to add.
         */
        add(obj: TChildren): TChildren;
        private _updateWorldAndLayer(world, layer);
        /**
         * Removes and returns the current object from the parent and returns it.
         */
        remove(): this;
        /**
         * Called once ONLY when '{Engine}.update()' is called the first time.
         */
        startup(): this;
        /**
         * Call to update this object and copy the results to the buffer for accelerated processing.
         * @param buffer The buffer that will receive the updated values from this object.
         * @param index The index where to copy the values.
         * @returns True if values were written to the buffer, and false otherwise.
         */
        update(processor?: MathPipelines.MathProcessor): this;
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
        render(includeNext?: boolean): void;
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
        flatten(includethis?: boolean): IArrayBuffer<IGraphObject>;
        /**
         * Traverse the tree in real-time to count this instance and all child instances.
         * Note: 'flattenedItems.count' can also be used to get a count of all objects when 'flatten()' is called.
         */
        count(): number;
    }
    interface IGraphObject extends GraphObject {
    }
}
