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
     * A world object is a single grouping of matter particles.  These particles have bonds created between them that try to hold
     * the particles together.  When the object gets hit, the collision point is "unwound" to get the affected matter particle.
     * This allows the particles of this object to be broken off given enough force.
     * World objects GREATLY reduce the rendering speed by rendering the individual particles to a group sprite.  This also
     * allows for rotation and sprite-based 2D physics simulations (since most of the world will be made from large blocks and
     * not small particles, which would be WAY too slow [at least in a browser using JS]).
     */
    var WorldObject = /** @class */ (function (_super) {
        __extends(WorldObject, _super);
        // --------------------------------------------------------------------------------------------------------------------
        function WorldObject() {
            var _this = _super.call(this) || this;
            _this.canCollide = true; // (default for world objects)
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
            /** In cm^2, which is used to determine the density as well. */
            get: function () {
                return this.width * this.height;
            },
            enumerable: true,
            configurable: true
        });
        /** How dense the matter is. */
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
        // --------------------------------------------------------------------------------------------------------------------
        ///**
        // * Sets a particle to the given matter.
        // * @param x The x position relative to this world object.
        // * @param y The y position relative to this world object.
        // * @param matter The matter to use. If no matter is given, an empty matter instance is created (typically air matter).
        // */
        //?setParticle(x: number, y: number, matter?: Matter): Matter {
        //    var i = this.width * y + x;
        //    if (i < 0 || i >= this.width * this.height)
        //        throw this.error("Location is out of bounds.");
        //    var m = matter || this.engine.create(Matter);
        //    this.particlesRoot.children[i] = m;
        //    return m;
        //}
        ///**
        // * Sets a particle to the given matter. No bounds checks are performed, so be sure to use this call wisely.
        // * @param x The x position relative to this world object.
        // * @param y The y position relative to this world object.
        // * @param matter The matter to use. If no matter is given, an empty matter instance is created (typically air matter).
        // */
        //?fastSetParticle(x: number, y: number, matter?: Matter): Matter {
        //    var i = this.width * y + x;
        //    var m = matter || this.engine.create(Matter);
        //    this.particlesRoot.children[i] = m;
        //    return m;
        //}
        // --------------------------------------------------------------------------------------------------------------------
        /**
         * Rebuild the texture used by this world object that is painted by all the bound child particles.
         */
        WorldObject.prototype.updateTexture = function () {
            return this;
        };
        // --------------------------------------------------------------------------------------------------------------------
        WorldObject.prototype.startup = function () {
            return _super.prototype.startup.call(this);
        };
        WorldObject.prototype.update = function (processor) {
            //?if (!this._cacheEnabled)
            //    this.particlesRoot.update(processor); // (ONLY update items when caching is not YET enabled)
            return _super.prototype.update.call(this, processor);
        };
        WorldObject.prototype.postUpdate = function (buffer, index, piplineIndex) {
            return _super.prototype.postUpdate.call(this, buffer, index, piplineIndex);
        };
        WorldObject.prototype.render = function () {
            //?if (this._SpriteTexture)
            //    for (var i = 0, n = this.particles.length; i < n; ++i) {
            //        this.world.renderService.renderToTexture(this.particles[i]['_sprite'], this._SpriteTexture);
            //    }
            // ... if caching is off, turn it on now to speed things up ...
            // TODO: FOR WorldObjects: if (!this._cacheEnabled) {
            //    // ... make sure all child objects have rendered first so they can be cached into one bitmap for this world object ...
            //    var items = this.particlesRoot.children.items;
            //    for (var i = 0, n = items && items.length || 0; i < n; ++i)
            //        if (items[i])
            //            items[i].render();
            //    super.render();
            //    this._world.renderService.cacheGraphObject(this._renderServiceGraphObject, this._cacheEnabled = true);
            //}
        };
        // --------------------------------------------------------------------------------------------------------------------
        WorldObject.type = WorldSimulator2D.PhysicsObject.type | WorldSimulator2D.ObjectTypes.WorldObject;
        return WorldObject;
    }(WorldSimulator2D.PhysicsObject));
    WorldSimulator2D.WorldObject = WorldObject;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=worldobject.js.map