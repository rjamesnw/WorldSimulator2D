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
    var PhysicsState = /** @class */ (function (_super) {
        __extends(PhysicsState, _super);
        function PhysicsState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /** The sum of all directional forces being applied to this object (not normalized). */
            _this.netForce = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            /** This is calculated based on the mass and current velocity after 'update()' is called. */
            _this.momentum = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            /** The calculated speed of the object. This is what the object should be before any dampening is applied for game purposes. */
            _this.velocity = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            /** The speed of the object after 'update()' is called (one physics calculation pass, or one "step"). */
            _this.stepVelocity = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            return _this;
        }
        PhysicsState.prototype.copyFrom = function (state) {
            _super.prototype.copyFrom.call(this, state);
            var physState = state;
            this.mass = physState.mass;
            if (physState.netForce) {
                this.netForce.x = physState.netForce.x;
                this.netForce.y = physState.netForce.y;
                this.netForce.nx = physState.netForce.nx;
                this.netForce.ny = physState.netForce.ny;
            }
            if (physState.momentum) {
                this.momentum.x = physState.momentum.x;
                this.momentum.y = physState.momentum.y;
                this.momentum.nx = physState.momentum.nx;
                this.momentum.ny = physState.momentum.ny;
            }
            if (physState.velocity) {
                this.velocity.x = physState.velocity.x;
                this.velocity.y = physState.velocity.y;
                this.velocity.nx = physState.velocity.nx;
                this.velocity.ny = physState.velocity.ny;
            }
            if (physState.stepVelocity) {
                this.stepVelocity.x = physState.stepVelocity.x;
                this.stepVelocity.y = physState.stepVelocity.y;
                this.stepVelocity.nx = physState.stepVelocity.nx;
                this.stepVelocity.ny = physState.stepVelocity.ny;
            }
            return this;
        };
        PhysicsState.prototype.clone = function () {
            return _super.prototype.clone.call(this);
        };
        return PhysicsState;
    }(WorldSimulator2D.SpacialState));
    WorldSimulator2D.PhysicsState = PhysicsState;
    /**
     * Holds physics properties for this object in regards to speed, velocity, mass, and gravity. It also takes into account the gravity of the world as well.
     */
    var PhysicsObject = /** @class */ (function (_super) {
        __extends(PhysicsObject, _super);
        function PhysicsObject() {
            var _this = _super.call(this) || this;
            _this.isPhysicsObject = true;
            _this.unmovable = false; // (physics objects default to movable)
            return _this;
        }
        Object.defineProperty(PhysicsObject.prototype, "velocity", {
            /** Gets 'currentState.velocity'. */
            get: function () { return this.currentState.velocity; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PhysicsObject.prototype, "mass", {
            /** Gets/sets 'currentState.mass'. */
            get: function () { return this.currentState.mass; },
            set: function (v) { this.currentState.mass = v; },
            enumerable: true,
            configurable: true
        });
        PhysicsObject.prototype.initialize = function (isnew, autoReset) {
            _super.prototype.initialize.call(this, isnew, autoReset);
        };
        PhysicsObject.prototype.configure = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _super.prototype.configure.call(this);
            return this;
        };
        PhysicsObject.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        // --------------------------------------------------------------------------------------------------------------------
        PhysicsObject.prototype.startup = function () {
            return _super.prototype.startup.call(this);
        };
        PhysicsObject.gpuKernal = function (a, typeIndex, dataIndex, outIndex, __this, result) {
            return 0;
        };
        PhysicsObject.prototype.update = function (processor) {
            var state = this.currentState, w = this.world;
            // state.velocity.x += state.stepVelocity.x;
            // state.velocity.y += state.stepVelocity.y;
            // ... make sure the velocity doesn't move position more than one pixel; scale down if necessary ...
            var svx = state.stepVelocity.x, svy = state.stepVelocity.y;
            // if (vx < -1 || vx > 1 || vy < -1 || vy > 1) {
            //     var absvx = vx < 0 ? -vx : vx, absvy = vy < 0 ? -vy : vy, v = absvx > absvy ? absvx : absvy;
            //     if (v > 1) { state.velocity.x = vx /= v; state.velocity.y = vy /= v; }
            // }
            state.position.x += svx;
            state.position.y += svy;
            return _super.prototype.update.call(this, processor);
        };
        PhysicsObject.prototype.postUpdate = function (buffer, index, piplineIndex) {
            var state = this.currentState, calcID = buffer[index + WorldSimulator2D.MathPipelines.GravityCalculationOutputs.calcID];
            if (piplineIndex == WorldSimulator2D.MathPipelines.Types.GravityCalculation && calcID === 0) {
                state.stepVelocity.x = buffer[index + WorldSimulator2D.MathPipelines.GravityCalculationOutputs.vstepx] || 0; // (just in case, to prevent NaN)
                state.stepVelocity.y = buffer[index + WorldSimulator2D.MathPipelines.GravityCalculationOutputs.vstepy] || 0; // (just in case, to prevent NaN)
                state.velocity.x = buffer[index + WorldSimulator2D.MathPipelines.GravityCalculationOutputs.vx] || 0; // (just in case, to prevent NaN)
                state.velocity.y = buffer[index + WorldSimulator2D.MathPipelines.GravityCalculationOutputs.vy] || 0; // (just in case, to prevent NaN)
            }
            return _super.prototype.postUpdate.call(this, buffer, index, piplineIndex);
        };
        //? This is the working original, but should be removed soon ...
        //__update(kernalBufferManager: MathPiplines.KernalBufferManager): this { // (reminder: Y+ is UP)
        //    var w = this._world, state = this.currentState;
        //    if (<object>this !== w && !this.unmovable) { // (the world is the top most and should not be processing itself!)
        //        // (Note: when 'this.unmovable' is true, other objects can still update the forces; the object just won't move due to it.)
        //        // ... get world force on this object based on distance from world center ...
        //        var x = state.x, y = state.y;
        //        var d = distance2D(0, 0, x, y) / w.unitBlockSize * w.metersPerBlockSize / 2; // (make sure it's in meters: d in world particles / particles per 1.75 meters * 1.75 to get the meters)
        //        if (d) {
        //            var nx = x / d, ny = y / d; // (get normals for the offset between objects)
        //            var f = (6.67408e-11 * state.mass * this._world.currentState.mass) / (d * d) / w.gravitationalScale; // (constant 6.67e-11 scaled to 6.67e-6 because mass is also scaled by half the exponent)
        //            if (f > w.maxGravitationalForce) f = w.maxGravitationalForce;
        //        } else
        //            nx = 0, ny = 0, f = 0; // (get normals for the offset between objects)
        //        var fx = nx * f, fy = ny * f;
        //        state.netForce.x = fx; // (scale the force down so the updates can be called many times per render frame)
        //        state.netForce.y = fy; // (scale the force down so the updates can be called many times per render frame)
        //        // ... get the velocity of this object ...
        //        var vx = (state.velocity.x -= fx) / w.velocityScale;
        //        var vy = (state.velocity.y -= fy) / w.velocityScale;
        //        //var vx = this.velocity.x; 
        //        //var vy = this.velocity.y;
        //        var pixelSize = w.pixelSize;
        //        // ... make sure the velocity cannot "skip" grid locations ...
        //        // (Each particle exists in a grid location, but high velocities can skip grid locations causing missed interactions.
        //        //  For this reason the velocity MUST be clamped a max of 1 grid jump only. To have particles seem to "skip" ahead,
        //        //  the 'update()' process can be called many times to more rapidly speed up the movement process [physics time])
        //        if (vx <= -pixelSize) vx = -pixelSize;
        //        if (vx >= pixelSize) vx = pixelSize;
        //        if (vy <= -pixelSize) vy = -pixelSize;
        //        if (vy >= pixelSize) vy = pixelSize;
        //        state.x += vx;
        //        state.y += vy;
        //        state.stepVelocity.x = vx;
        //        state.stepVelocity.y = vy;
        //        // ... also calculate the force of momentum based on the mass and this velocity ...
        //        state.momentum.x = state.mass * vx;
        //        state.momentum.y = state.mass * vy;
        //        // ... normalize vectors ...
        //        state.netForce.updateNormals();
        //        state.velocity.updateNormals();
        //        state.stepVelocity.updateNormals();
        //        state.momentum.updateNormals();
        //    }
        //    return super._update(kernalBufferManager);
        //}
        PhysicsObject.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        /** Set the mass on this object to a scaled version of the real world kilogram value. */
        PhysicsObject.prototype.setMass = function (kg) { this.currentState.mass = kg; return this; };
        /** Set the mass on this object to a scaled version of the real world gram value. */
        PhysicsObject.prototype.setMassInGrams = function (g) { this.setMass(g / 1000); return this; };
        /**
         * Converts and adds the given atomic weight to this matter.
         * The return value is the matter object itself so more than one weight can be added.
         * @param w An atomic weight (typically taken from the periodic table).
         * @param count An optional value to use as a convenient multiplier. This is typically the subscript of an element in a formula (i.e. the 2 in H2O).
         */
        PhysicsObject.prototype.addAtomicWeight = function (w, count) {
            if (count === void 0) { count = 1; }
            this.currentState.mass = (this.currentState.mass || 0) + w /*grams*/ * count / 1000;
            return this;
        };
        // --------------------------------------------------------------------------------------------------------------------
        PhysicsObject.type = WorldSimulator2D.SpatialObject.type | WorldSimulator2D.ObjectTypes.PhysicsObject;
        PhysicsObject._nonClonableProperties = (PhysicsObject._nonClonableProperties['mass'] = void 0,
            PhysicsObject._nonClonableProperties['velocity'] = void 0,
            PhysicsObject._nonClonableProperties['history'] = void 0,
            PhysicsObject._nonClonableProperties);
        PhysicsObject._StateType = PhysicsState;
        return PhysicsObject;
    }(WorldSimulator2D.SpatialObject));
    WorldSimulator2D.PhysicsObject = PhysicsObject;
})(WorldSimulator2D || (WorldSimulator2D = {}));
// Notes:
// * Inertia: http://hyperphysics.phy-astr.gsu.edu/hbase/mi.html (I = m*r^2) 
// * Momentum: https://www.youtube.com/watch?v=oTqTHuwvqNw
//# sourceMappingURL=physicsobject.js.map