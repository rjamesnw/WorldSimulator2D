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
    var PhysicsState = (function (_super) {
        __extends(PhysicsState, _super);
        function PhysicsState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.netForce = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            _this.momentum = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            _this.velocity = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
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
    var PhysicsObject = (function (_super) {
        __extends(PhysicsObject, _super);
        function PhysicsObject() {
            var _this = _super.call(this) || this;
            _this.isPhysicsObject = true;
            _this.unmovable = false;
            return _this;
        }
        Object.defineProperty(PhysicsObject.prototype, "velocity", {
            get: function () { return this.currentState.velocity; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PhysicsObject.prototype, "mass", {
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
        PhysicsObject.prototype.startup = function () {
            return _super.prototype.startup.call(this);
        };
        PhysicsObject.gpuKernal = function (a, typeIndex, dataIndex, outIndex, __this, result) {
            return 0;
        };
        PhysicsObject.prototype.update = function (processor) {
            var state = this.currentState, w = this.world;
            state.velocity.x += state.stepVelocity.x;
            state.velocity.y += state.stepVelocity.y;
            if (state.velocity.x > 1)
                state.velocity.x = 1;
            if (state.velocity.y > 1)
                state.velocity.y = 1;
            state.position.x += state.velocity.x;
            state.position.y += state.velocity.y;
            var gravCalcPipe = processor.mathPipelines[WorldSimulator2D.MathPiplines.Types.GravityCalculation];
            var buffer = gravCalcPipe.buffers[gravCalcPipe.bufferWriteIndex], i = buffer.count += gravCalcPipe.blockLength;
            buffer[i + WorldSimulator2D.MathPiplines.GravityCalculationInputs.objectID] = this.id;
            buffer[i + WorldSimulator2D.MathPiplines.GravityCalculationInputs.calcID] = 0;
            buffer[i + WorldSimulator2D.MathPiplines.GravityCalculationInputs.m1] = w.mass;
            buffer[i + WorldSimulator2D.MathPiplines.GravityCalculationInputs.m2] = this.mass;
            buffer[i + WorldSimulator2D.MathPiplines.GravityCalculationInputs.x1] = 0;
            buffer[i + WorldSimulator2D.MathPiplines.GravityCalculationInputs.y1] = 0;
            buffer[i + WorldSimulator2D.MathPiplines.GravityCalculationInputs.x2] = state.position.x;
            buffer[i + WorldSimulator2D.MathPiplines.GravityCalculationInputs.y2] = state.position.y;
            if (buffer.count >= buffer.length)
                gravCalcPipe.nextBuffer();
            return _super.prototype.update.call(this, processor);
        };
        PhysicsObject.prototype.postUpdate = function (buffer, index, piplineIndex) {
            var state = this.currentState, calcID = buffer[index];
            if (piplineIndex == WorldSimulator2D.MathPiplines.Types.GravityCalculation && calcID === 0) {
                state.stepVelocity.x = buffer[index + WorldSimulator2D.MathPiplines.GravityCalculationOutputs.vstepx];
                state.stepVelocity.y = buffer[index + WorldSimulator2D.MathPiplines.GravityCalculationOutputs.vstepy];
            }
            return _super.prototype.postUpdate.call(this, buffer, index, piplineIndex);
        };
        PhysicsObject.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        PhysicsObject.prototype.setMass = function (kg) { this.currentState.mass = kg; return this; };
        PhysicsObject.prototype.setMassInGrams = function (g) { this.setMass(g / 1000); return this; };
        PhysicsObject.prototype.addAtomicWeight = function (w, count) {
            if (count === void 0) { count = 1; }
            this.currentState.mass = (this.currentState.mass || 0) + w * count / 1000;
            return this;
        };
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
//# sourceMappingURL=physicsobject.js.map