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
    var WorldObject = (function (_super) {
        __extends(WorldObject, _super);
        function WorldObject() {
            var _this = _super.call(this) || this;
            _this.canCollide = true;
            return _this;
        }
        WorldObject.prototype.updateMass = function () {
            var mass = 0;
            if (this.particlesRoot) {
                var items = this.particlesRoot.children;
                for (var i = (items && items.count || 0) - 1; i >= 0; --i)
                    mass += items[i].currentState.mass;
            }
            this.currentState.mass = mass;
            return mass;
        };
        Object.defineProperty(WorldObject.prototype, "volume", {
            get: function () {
                return this.width * this.height;
            },
            enumerable: true,
            configurable: true
        });
        WorldObject.prototype.density = function () {
            return this.currentState.mass / this.volume;
        };
        WorldObject.prototype.initialize = function (isnew, autoReset) {
            _super.prototype.initialize.call(this, isnew, autoReset);
            this.width = 0;
            this.height = 0;
            this.updateMass();
        };
        WorldObject.prototype.configure = function (width, height) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            _super.prototype.configure.call(this, parent);
            this.clear();
            this.width = width;
            this.height = height;
            this.particlesRoot = new WorldSimulator2D.GraphObject();
            this.particlesRoot.parent = this;
            return this;
        };
        WorldObject.prototype.dispose = function () {
            this.particlesRoot.clear();
            _super.prototype.dispose.call(this);
        };
        WorldObject.prototype.clear = function () {
            this.particlesRoot.clear();
            _super.prototype.clear.call(this);
        };
        WorldObject.prototype.updateTexture = function () {
            return this;
        };
        WorldObject.prototype.startup = function () {
            return _super.prototype.startup.call(this);
        };
        WorldObject.prototype.update = function (processor) {
            return _super.prototype.update.call(this, processor);
        };
        WorldObject.prototype.postUpdate = function (buffer, index, piplineIndex) {
            return _super.prototype.postUpdate.call(this, buffer, index, piplineIndex);
        };
        WorldObject.prototype.render = function () {
        };
        WorldObject.type = WorldSimulator2D.PhysicsObject.type | WorldSimulator2D.ObjectTypes.WorldObject;
        return WorldObject;
    }(WorldSimulator2D.PhysicsObject));
    WorldSimulator2D.WorldObject = WorldObject;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=worldobject.js.map