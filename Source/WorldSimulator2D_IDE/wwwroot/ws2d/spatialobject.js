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
    var SpacialState = (function () {
        function SpacialState() {
            this.position = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            this.direction = WorldSimulator2D.Engine.create(WorldSimulator2D.Vector2D);
            this.moved = false;
            this.gridMoved = false;
            this.hasMoved = false;
            this.neverMoved = true;
        }
        SpacialState.prototype.copyFrom = function (state) {
            if (state) {
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
                this.moved = state.moved;
                this.gridMoved = state.gridMoved;
                this.hasMoved = state.hasMoved;
                this.neverMoved = state.neverMoved;
            }
            return this;
        };
        SpacialState.prototype.copyTo = function (targetState) {
            return this.copyFrom.call(targetState, this);
        };
        SpacialState.prototype.clone = function () {
            return new this.constructor().copyFrom(this);
        };
        return SpacialState;
    }());
    WorldSimulator2D.SpacialState = SpacialState;
    var SpatialObject = (function (_super) {
        __extends(SpatialObject, _super);
        function SpatialObject() {
            var _this = _super.call(this) || this;
            _this._gridItemsIndex = -1;
            _this.historyMax = 0;
            return _this;
        }
        Object.defineProperty(SpatialObject.prototype, "x", {
            get: function () { return this.currentState.position.x; },
            set: function (v) { this.currentState.position.x = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpatialObject.prototype, "y", {
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
        };
        SpatialObject.prototype.startup = function () {
            _super.prototype.startup.call(this);
            if (this.layer)
                this._updateGridWithPosition();
            this.previousState = this.currentState.clone();
            return this;
        };
        SpatialObject.prototype._updateGridWithPosition = function () {
            var state = this.currentState, w = this.world, layer = this.layer;
            if (!state.position.x)
                state.position.x = 0;
            if (!state.position.y)
                state.position.y = 0;
            this.layer['_OnObjectGridPositionChanged'](this);
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
        };
        SpatialObject.prototype.onOutsideGrid = function (source) {
            if (this.parent) {
                this.dispose();
            }
        };
        SpatialObject.type = WorldSimulator2D.GraphObject.type | WorldSimulator2D.ObjectTypes.SpacialObject;
        SpatialObject._nonClonableProperties = (SpatialObject._nonClonableProperties['_gridItems'] = void 0,
            SpatialObject._nonClonableProperties['history'] = void 0,
            SpatialObject._nonClonableProperties['_history'] = void 0,
            SpatialObject._nonClonableProperties['x'] = void 0,
            SpatialObject._nonClonableProperties['y'] = void 0,
            SpatialObject._nonClonableProperties);
        SpatialObject._StateType = SpacialState;
        return SpatialObject;
    }(WorldSimulator2D.GraphObject));
    WorldSimulator2D.SpatialObject = SpatialObject;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=spatialobject.js.map