declare namespace WorldSimulator2D {
    class SpacialState implements IClonable {
        /** The position of the object (in world particles). By default convention, every 32 units is considered 1.75 meters. */
        position: Vector2D;
        /** After calling 'update()', this stores the direction of travel (-1, 0, or 1 for 'x' and 'y')  for this object, if any.
        */
        direction: Vector2D;
        /** A flag that is set per update frame when the object's position changed since the last update.
        * Since this is calculated when 'update()' is called, movements made after the method is called won't be detected until the next frame.  To prevent this, make movements BEFORE calling 'super.update()' from derived types.
        */
        moved: boolean;
        /** A flag that is set per update frame when the object's grid location changed since the last update.
        * Since this is calculated when 'update()' is called, movements made after the method is called won't be detected until the next frame.  To prevent this, make movements BEFORE calling 'super.update()' from derived types.
        */
        gridMoved: boolean;
        /** A flag that is set when the object position is not the same as the last position.
        * This flag is never cleared once set and must be manually cleared.
        */
        hasMoved: boolean;
        /** A flag that is set when the object position has NEVER changed. Once set, the flag is never cleared.
        * This flag is used to figure out which objects have remained unmoved since the simulation started.
        */
        readonly neverMoved: boolean;
        /**
         * Update the current state with values from another state.
         */
        copyFrom(state: ISpacialState): this;
        /**
         * Update the given state with values from the current state.
         */
        copyTo(targetState: ISpacialState): this;
        clone(): this;
    }
    interface ISpacialState extends SpacialState {
    }
    interface ISpatialObjectInternal {
        _gridCell: IGridCell;
        _gridItemsIndex: number;
        isPhysicsObject: boolean;
    }
    /**
     * Holds the position of an object on a specific layer.
     * The position of an object is based on world particles and NOT graphic pixels.
     * A world particle is a group of one or more display pixels. Since matter is processed per particle, this allows scaling for better performance.
     * NOTE: Positive "Y" is UP.  This is to keep consistent with most 3D contexts
     */
    class SpatialObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends GraphObject<TParent, TChildren> implements ISpatialObject, ISpatialObjectInternal {
        static readonly type: number;
        protected static _nonClonableProperties: I_nonClonableProperties;
        /** The type to use when creating states objects for storing calculated properties for this object.
        * Every object contains a type of state for data storage.
        */
        protected static _StateType: typeof SpacialState;
        /** A quick reference to the array container at the grid location where this object was last placed. */
        readonly _gridCell: IGridCell;
        readonly _gridItemsIndex: number;
        /** This is true if this object implements physics based routines (an IPhysicsObject type with mass, velocity, etc.). */
        readonly isPhysicsObject: boolean;
        /** If true then this object can collide. If not it is ignored in all collisions. */
        canCollide: boolean;
        /** If false/undefined (default) then this object can move when collided with.
        * If not, it is stationary and the force of impact is applied 100% back to the impacting object's velocity based on it's travel direction.
        */
        unmovable: boolean;
        /** History of states for the object. Enabling states allows to track previous states (position, velocity, etc.) for the object - but this can
        * be an expensive operation to do to many times, so it's important to limit this only to a few objects.
        */
        history: SpacialState[];
        /** The maximum history length (default is 0). */
        historyMax: number;
        /** The current state of calculated data. A default instance is set after initialization and remains for the lifetime of the object.
        * After movement, the current state is copied to the history.  If no movement, there won't be any history (for better efficiency).
        */
        currentState: SpacialState;
        /** The previous state of calculated data. This is undefined until new calculations are received.
        * After movement, the current state is copied to the history.  If no movement, there won't be any history (for better efficiency).
        */
        previousState: SpacialState;
        /** Gets/sets 'currentState.x'. */
        x: number;
        /** Gets/sets 'currentState.y'. */
        y: number;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(...args: any[]): this;
        clone(): this;
        dispose(): void;
        startup(): this;
        /**
         * This is called first by the startup to calculate initial values, and by 'update()' to continue the process.
         * This function does not update any child objects, and only applies to the current object itself.
         */
        protected _updateGridWithPosition(): void;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
        /**
         * This is an event that is triggered when two objects are detected as colliding within a layer.
         * By default the physics system picks up on this event and does the following:
         * 1. Gets the 'force' of the two objects.
         * 2. Determines of one particle "destroys" another due to low density.
         * 3. Determines the net rebound force based on current inertia forces.
         * @param source The object in the collision that was moved when the collision occurred. Typical reactions are to
         * move the source back to its last position and apply impact forces to both objects.
         * @param target The object the source collided with. This object did not move yet!
         */
        onCollided?(source: ISpatialObject, target: ISpatialObject): void;
        /**
         * Triggers when an objects falls outside the grid (once only).
         * The default implementation deletes objects flying outside the grid zone (which is required for particle collisions).
         * They become lost in infinite travel outwards from grid center at 0,0, thus it is not considered a collision or destruction event.
         * @param source The layer that had the object before it went outside the bounds.
         */
        onOutsideGrid(source: ILayer): void;
    }
    interface ISpatialObject extends SpatialObject {
    }
}
