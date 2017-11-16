namespace WorldSimulator2D {

    export class SpacialState implements IClonable {
        /** The position of the object (in world particles). By default convention, every 32 units is considered 1.75 meters. */
        position: Vector2D = Engine.create(Vector2D);

        /** After calling 'update()', this stores the direction of travel (-1, 0, or 1 for 'x' and 'y')  for this object, if any.
        */
        direction: Vector2D = Engine.create(Vector2D);

        /** A flag that is set per update frame when the object's position changed since the last update.
        * Since this is calculated when 'update()' is called, movements made after the method is called won't be detected until the next frame.  To prevent this, make movements BEFORE calling 'super.update()' from derived types.
        */
        moved = false;

        /** A flag that is set per update frame when the object's grid location changed since the last update.
        * Since this is calculated when 'update()' is called, movements made after the method is called won't be detected until the next frame.  To prevent this, make movements BEFORE calling 'super.update()' from derived types.
        */
        gridMoved = false;

        /** A flag that is set when the object position is not the same as the last position.
        * This flag is never cleared once set and must be manually cleared.
        */
        hasMoved = false;

        /** A flag that is set when the object position has NEVER changed. Once set, the flag is never cleared.
        * This flag is used to figure out which objects have remained unmoved since the simulation started.
        */
        readonly neverMoved = true;

        // --------------------------------------------------------------------------------------------------------------------

        ///** After calling 'update()', this stores the grid position.  Grids hold one or more particles in order to quickly lookup neighboring ones.
        //*/
        //?gridPosition: Vector2D = Engine.create(Vector2D);

        ///** The direction of change in grid location as an object is moving, if any. */
        //?gridDirection: Vector2D = Engine.create(Vector2D);

        // --------------------------------------------------------------------------------------------------------------------

        /**
         * Update the current state with values from another state.
         */
        copyFrom(state: ISpacialState): this {
            if (state) { // TODO: Inline this for each property for a speed boost instead of using a loop (thought a loop for now won't miss properties during dev)
                //?if (physState.netForce) {
                //    this.netForce.x = state.netForce.x;
                //    this.netForce.y = state.netForce.y;
                //    this.netForce.nx = state.netForce.nx;
                //    this.netForce.ny = state.netForce.ny;
                //}

                //?if (state.momentum) {
                //    this.momentum.x = state.momentum.x;
                //    this.momentum.y = state.momentum.y;
                //    this.momentum.nx = state.momentum.nx;
                //    this.momentum.ny = state.momentum.ny;
                //}

                if (state.position) {
                    this.position.x = state.position.x;
                    this.position.y = state.position.y;
                    this.position.nx = state.position.nx;
                    this.position.ny = state.position.ny;
                }

                if (state.direction) {
                    this.direction.x = state.direction.x;
                    this.direction.y = state.direction.y;
                    this.direction.nx = state.direction.nx;
                    this.direction.ny = state.direction.ny;
                }

                //?if (state.gridPosition) {
                //    this.gridPosition.x = state.gridPosition.x;
                //    this.gridPosition.y = state.gridPosition.y;
                //    this.gridPosition.nx = state.gridPosition.nx;
                //    this.gridPosition.ny = state.gridPosition.ny;
                //}

                //?if (state.gridDirection) {
                //    this.gridDirection.x = state.gridDirection.x;
                //    this.gridDirection.y = state.gridDirection.y;
                //    this.gridDirection.nx = state.gridDirection.nx;
                //    this.gridDirection.ny = state.gridDirection.ny;
                //}

                this.moved = state.moved;
                this.gridMoved = state.gridMoved;
                this.hasMoved = state.hasMoved;
                (<{ neverMoved: boolean }>this).neverMoved = state.neverMoved;
            }
            return this;
        }

        /**
         * Update the given state with values from the current state.
         */
        copyTo(targetState: ISpacialState): this {
            return this.copyFrom.call(targetState, this);
        }

        clone(): this {
            return <any>new (<{ new(): SpacialState }>this.constructor)().copyFrom(this);
        }
    }

    export interface ISpacialState extends SpacialState { }

    export interface ISpatialObjectInternal {
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
    export class SpatialObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject>
        extends GraphObject<TParent, TChildren> implements ISpatialObject, ISpatialObjectInternal {
        // --------------------------------------------------------------------------------------------------------------------

        static readonly type = GraphObject.type | ObjectTypes.SpacialObject;

        protected static _nonClonableProperties: I_nonClonableProperties = (
            SpatialObject._nonClonableProperties['_gridItems'] = void 0,
            SpatialObject._nonClonableProperties['history'] = void 0,
            SpatialObject._nonClonableProperties['_history'] = void 0,
            SpatialObject._nonClonableProperties['x'] = void 0,
            SpatialObject._nonClonableProperties['y'] = void 0,
            SpatialObject._nonClonableProperties
        );

        /** The type to use when creating states objects for storing calculated properties for this object.
        * Every object contains a type of state for data storage. 
        */
        protected static _StateType = SpacialState;

        // --------------------------------------------------------------------------------------------------------------------

        /** A quick reference to the array container at the grid location where this object was last placed. */
        readonly _gridCell: IGridCell;
        readonly _gridItemsIndex = -1;

        // --------------------------------------------------------------------------------------------------------------------
        // Spacial objects define physics behavior properties used in collision detection.

        /** This is true if this object implements physics based routines (an IPhysicsObject type with mass, velocity, etc.). */
        readonly isPhysicsObject: boolean;

        /** If true then this object can collide. If not it is ignored in all collisions. */
        canCollide: boolean;

        /** If false/undefined (default) then this object can move when collided with.
        * If not, it is stationary and the force of impact is applied 100% back to the impacting object's velocity based on it's travel direction.
        */
        unmovable: boolean;

        //isSolid: boolean;

        /** History of states for the object. Enabling states allows to track previous states (position, velocity, etc.) for the object - but this can
        * be an expensive operation to do to many times, so it's important to limit this only to a few objects.
        */
        history: SpacialState[];

        /** The maximum history length (default is 0). */
        historyMax: number = 0;

        /** The current state of calculated data. A default instance is set after initialization and remains for the lifetime of the object. 
        * After movement, the current state is copied to the history.  If no movement, there won't be any history (for better efficiency).
        */
        currentState: SpacialState;

        /** The previous state of calculated data. This is undefined until new calculations are received.
        * After movement, the current state is copied to the history.  If no movement, there won't be any history (for better efficiency).
        */
        previousState: SpacialState;

        /** Gets/sets 'currentState.x'. */
        get x() { return this.currentState.position.x; }
        set x(v: number) { this.currentState.position.x = v; }

        /** Gets/sets 'currentState.y'. */
        get y() { return this.currentState.position.y; }
        set y(v: number) { this.currentState.position.y = v; }

        // --------------------------------------------------------------------------------------------------------------------

        constructor() { super(); }

        initialize(isnew: boolean, autoReset?: boolean) {
            this.currentState = new (<typeof SpatialObject>this.constructor)._StateType();
            super.initialize(isnew, autoReset);
        }

        configure(...args: any[]): this {
            super.configure();
            return this;
        }

        clone(): this {
            var clone = super.clone();
            return clone;
        }

        dispose(): void {
            super.dispose();
            // ... arrays of disposable objects are not disposed by default to be safe, so these must be handled custom for each type where applicable ...
            //if (this.history)
            //    Engine.dispose(this.history, true);
        }

        // --------------------------------------------------------------------------------------------------------------------

        startup(): this {
            super.startup();

            // ... make sure x,y and grid x,y are in sync before we start ...
            if (this.layer)
                this._updateGridWithPosition();

            this.previousState = this.currentState.clone(); // (on startup keep this the same)

            return this;
        }

        /**
         * This is called first by the startup to calculate initial values, and by 'update()' to continue the process.
         * This function does not update any child objects, and only applies to the current object itself.
         */
        protected _updateGridWithPosition(): void {
            var state = this.currentState, w = this.world, layer = this.layer;
            if (!state.position.x) state.position.x = 0;
            if (!state.position.y) state.position.y = 0;
            this.layer['_OnObjectGridPositionChanged'](this);
        }

        update(processor: MathPipelines.MathProcessor) { // (reminder: Y+ is UP)
            var layer = this.layer, state = this.currentState, pstate = this.previousState;

            var xdiff = state.position.x - pstate.position.x;
            var ydiff = state.position.y - pstate.position.y;
            state.direction.x = <any>(xdiff > 0) - <any>(xdiff < 0);
            state.direction.y = <any>(ydiff > 0) - <any>(ydiff < 0);
            state.moved = xdiff != 0 || ydiff != 0;
            state.gridMoved = pstate.position.x != state.position.x || pstate.position.y != state.position.y;

            if (state.moved) {
                state.hasMoved = true;
                (<{ neverMoved: any }>state).neverMoved = false;
            }

            return super.update(processor);
        }

        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this {
            var layer = this.layer, state = this.currentState, pstate = this.previousState;
            return this;
        }

        render(): void {
            super.render();
            var w = this.world;
            // ... update the sprite location ...
            // (the world is the top most and should not move its container! [although the world position might offset child objects])
        }

        // --------------------------------------------------------------------------------------------------------------------

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
        onOutsideGrid(source: ILayer): void {
            // ... remove by default ...
            if (this.parent) {
                this.dispose();
            }
        }

        // --------------------------------------------------------------------------------------------------------------------
    }

    export interface ISpatialObject extends SpatialObject { }
}