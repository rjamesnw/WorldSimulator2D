namespace WorldSimulator2D {
    /**
     * A world object is a single grouping of matter particles.  These particles have bonds created between them that try to hold
     * the particles together.  When the object gets hit, the collision point is "unwound" to get the affected matter particle.
     * This allows the particles of this object to be broken off given enough force.
     * World objects GREATLY reduce the rendering speed by rendering the individual particles to a group sprite.  This also
     * allows for rotation and sprite-based 2D physics simulations (since most of the world will be made from large blocks and
     * not small particles, which would be WAY too slow [at least in a browser using JS]).
     */
    export class WorldObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends PhysicsObject<TParent, TChildren> {
        // --------------------------------------------------------------------------------------------------------------------

        static readonly type = PhysicsObject.type | ObjectTypes.WorldObject;

        // --------------------------------------------------------------------------------------------------------------------

        /** The matter "particles" for this object. */
        particlesRoot: GraphObject<WorldObject, Matter>;

        /**  The sprite texture resource (by ID) used to render the particle sprites to make the system simulation rendering more efficient. */
        protected _SpriteTextureResourceID: string;

        /** Horizontal width in world particles. Each particle represents one cm^2 unit. */
        width: number;
        /** Vertical height in world particles. Each particle represents one cm^2 unit. */
        height: number;

        updateMass(): number {
            var mass = 0;
            if (this.particlesRoot) {
                var items = this.particlesRoot.children;
                for (var i = (items && items.count || 0) - 1; i >= 0; --i)
                    mass += items[i].currentState.mass;
            }
            (<{ mass: any }>this.currentState).mass = mass;
            return mass;
        }

        /** In cm^2, which is used to determine the density as well. */
        get volume(): number {
            return this.width * this.height;
        }

        /** How dense the matter is. */
        density(): number {
            return this.currentState.mass / this.volume;
        }

        _cacheEnabled: boolean;

        // --------------------------------------------------------------------------------------------------------------------

        constructor() {
            super();
            this.canCollide = true; // (default for world objects)
        }

        initialize(isnew: boolean, autoReset?: boolean) {
            super.initialize(isnew, autoReset);
            this.width = 0;
            this.height = 0;
            this.updateMass();
        }

        configure(width: number, height: number, ...args: any[]): this {
            super.configure(parent);
            this.clear();
            this.width = width;
            this.height = height;
            this.particlesRoot = new GraphObject();
            (<IGraphObjectInternal>this.particlesRoot).parent = this;
            return this;
        }

        dispose(): void {
            this.particlesRoot.clear();
            super.dispose();
        }

        clear(): void {
            this.particlesRoot.clear();
            super.clear();
        }

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
        updateTexture(): this {
            return this;
        }

        // --------------------------------------------------------------------------------------------------------------------

        startup(): this {
            return super.startup();
        }

        update(processor: MathPipelines.MathProcessor) { // (reminder: Y+ is UP)
            //?if (!this._cacheEnabled)
            //    this.particlesRoot.update(processor); // (ONLY update items when caching is not YET enabled)
            return super.update(processor);
        }

        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this {
            return super.postUpdate(buffer, index, piplineIndex);
        }

        render(): void {
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
        }

        // --------------------------------------------------------------------------------------------------------------------
    }
}