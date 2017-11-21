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
    var SpacialState = /** @class */ (function () {
        function SpacialState() {
            /** The position of the object (in world particles). By default convention, every 32 units is considered 1.75 meters. */
            this.position = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            /** After calling 'update()', this stores the direction of travel (-1, 0, or 1 for 'x' and 'y')  for this object, if any.
            */
            this.direction = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            /** A flag that is set per update frame when the object's position changed since the last update.
            * Since this is calculated when 'update()' is called, movements made after the method is called won't be detected until the next frame.  To prevent this, make movements BEFORE calling 'super.update()' from derived types.
            */
            this.moved = false;
            /** A flag that is set per update frame when the object's grid location changed since the last update.
            * Since this is calculated when 'update()' is called, movements made after the method is called won't be detected until the next frame.  To prevent this, make movements BEFORE calling 'super.update()' from derived types.
            */
            this.gridMoved = false;
            /** A flag that is set when the object position is not the same as the last position.
            * This flag is never cleared once set and must be manually cleared.
            */
            this.hasMoved = false;
            /** A flag that is set when the object position has NEVER changed. Once set, the flag is never cleared.
            * This flag is used to figure out which objects have remained unmoved since the simulation started.
            */
            this.neverMoved = true;
        }
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
        SpacialState.prototype.copyFrom = function (state) {
            if (state) {
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
                this.neverMoved = state.neverMoved;
            }
            return this;
        };
        /**
         * Update the given state with values from the current state.
         */
        SpacialState.prototype.copyTo = function (targetState) {
            return this.copyFrom.call(targetState, this);
        };
        SpacialState.prototype.clone = function () {
            return new this.constructor().copyFrom(this);
        };
        return SpacialState;
    }());
    WorldSimulator2D.SpacialState = SpacialState;
    /**
     * Holds the position of an object on a specific layer.
     * The position of an object is based on world particles and NOT graphic pixels.
     * A world particle is a group of one or more display pixels. Since matter is processed per particle, this allows scaling for better performance.
     * NOTE: Positive "Y" is UP.  This is to keep consistent with most 3D contexts
     */
    var SpatialObject = /** @class */ (function (_super) {
        __extends(SpatialObject, _super);
        // --------------------------------------------------------------------------------------------------------------------
        function SpatialObject() {
            var _this = _super.call(this) || this;
            _this._gridItemsIndex = -1;
            /** The maximum history length (default is 0). */
            _this.historyMax = 0;
            return _this;
        }
        Object.defineProperty(SpatialObject.prototype, "x", {
            /** Gets/sets 'currentState.x'. */
            get: function () { return this.currentState.position.x; },
            set: function (v) { this.currentState.position.x = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpatialObject.prototype, "y", {
            /** Gets/sets 'currentState.y'. */
            get: function () { return this.currentState.position.y; },
            set: function (v) { this.currentState.position.y = v; },
            enumerable: true,
            configurable: true
        });
        SpatialObject.prototype.initialize = function (isnew, autoReset) {
            this.currentState = new this.constructor._StateType();
            _super.prototype.initialize.call(this, isnew, autoReset);
        };
        SpatialObject.prototype.configure = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _super.prototype.configure.call(this);
            return this;
        };
        SpatialObject.prototype.clone = function () {
            var clone = _super.prototype.clone.call(this);
            return clone;
        };
        SpatialObject.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            // ... arrays of disposable objects are not disposed by default to be safe, so these must be handled custom for each type where applicable ...
            //if (this.history)
            //    Engine.dispose(this.history, true);
        };
        // --------------------------------------------------------------------------------------------------------------------
        SpatialObject.prototype.startup = function () {
            _super.prototype.startup.call(this);
            // ... make sure x,y and grid x,y are in sync before we start ...
            if (this.layer)
                this._updateGridWithPosition();
            this.previousState = this.currentState.clone(); // (on startup keep this the same)
            return this;
        };
        /**
         * This is called first by the startup to calculate initial values, and by 'update()' to continue the process.
         * This function does not update any child objects, and only applies to the current object itself.
         */
        SpatialObject.prototype._updateGridWithPosition = function () {
            if (this.constructor.type & WorldSimulator2D.ObjectTypes.Matter) {
                var state = this.currentState, w = this.world, layer = this.layer;
                if (!state.position.x)
                    state.position.x = 0;
                if (!state.position.y)
                    state.position.y = 0;
                this.layer['_OnObjectGridPositionChanged'](this);
            }
        };
        SpatialObject.prototype.update = function (processor) {
            var layer = this.layer, state = this.currentState, pstate = this.previousState;
            var xdiff = state.position.x - pstate.position.x;
            var ydiff = state.position.y - pstate.position.y;
            state.direction.x = (xdiff > 0) - (xdiff < 0);
            state.direction.y = (ydiff > 0) - (ydiff < 0);
            state.moved = xdiff != 0 || ydiff != 0;
            state.gridMoved = pstate.position.x != state.position.x || pstate.position.y != state.position.y;
            if (state.moved) {
                state.hasMoved = true;
                state.neverMoved = false;
            }
            return _super.prototype.update.call(this, processor);
        };
        SpatialObject.prototype.postUpdate = function (buffer, index, piplineIndex) {
            var layer = this.layer, state = this.currentState, pstate = this.previousState;
            return this;
        };
        SpatialObject.prototype.render = function () {
            _super.prototype.render.call(this);
            var w = this.world;
            // ... update the sprite location ...
            // (the world is the top most and should not move its container! [although the world position might offset child objects])
        };
        /**
         * Triggers when an objects falls outside the grid (once only).
         * The default implementation deletes objects flying outside the grid zone (which is required for particle collisions).
         * They become lost in infinite travel outwards from grid center at 0,0, thus it is not considered a collision or destruction event.
         * @param source The layer that had the object before it went outside the bounds.
         */
        SpatialObject.prototype.onOutsideGrid = function (source) {
            // ... remove by default ...
            if (this.parent) {
                this.dispose();
            }
        };
        // --------------------------------------------------------------------------------------------------------------------
        SpatialObject.type = WorldSimulator2D.GraphObject.type | WorldSimulator2D.ObjectTypes.SpacialObject;
        SpatialObject._nonClonableProperties = (SpatialObject._nonClonableProperties['_gridItems'] = void 0,
            SpatialObject._nonClonableProperties['history'] = void 0,
            SpatialObject._nonClonableProperties['_history'] = void 0,
            SpatialObject._nonClonableProperties['x'] = void 0,
            SpatialObject._nonClonableProperties['y'] = void 0,
            SpatialObject._nonClonableProperties);
        /** The type to use when creating states objects for storing calculated properties for this object.
        * Every object contains a type of state for data storage.
        */
        SpatialObject._StateType = SpacialState;
        return SpatialObject;
    }(WorldSimulator2D.GraphObject));
    WorldSimulator2D.SpatialObject = SpatialObject;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=spatialobject.js.map