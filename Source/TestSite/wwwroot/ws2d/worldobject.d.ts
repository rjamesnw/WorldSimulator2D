declare namespace WorldSimulator2D {
    /**
     * A world object is a single grouping of matter particles.  These particles have bonds created between them that try to hold
     * the particles together.  When the object gets hit, the collision point is "unwound" to get the affected matter particle.
     * This allows the particles of this object to be broken off given enough force.
     * World objects GREATLY reduce the rendering speed by rendering the individual particles to a group sprite.  This also
     * allows for rotation and sprite-based 2D physics simulations (since most of the world will be made from large blocks and
     * not small particles, which would be WAY too slow [at least in a browser using JS]).
     */
    class WorldObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends PhysicsObject<TParent, TChildren> {
        static readonly type: number;
        /** The matter "particles" for this object. */
        particlesRoot: GraphObject<WorldObject, Matter>;
        /**  The sprite texture resource (by ID) used to render the particle sprites to make the system simulation rendering more efficient. */
        protected _SpriteTextureResourceID: string;
        /** Horizontal width in world particles. Each particle represents one cm^2 unit. */
        width: number;
        /** Vertical height in world particles. Each particle represents one cm^2 unit. */
        height: number;
        updateMass(): number;
        /** In cm^2, which is used to determine the density as well. */
        readonly volume: number;
        /** How dense the matter is. */
        density(): number;
        _cacheEnabled: boolean;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(width: number, height: number, ...args: any[]): this;
        dispose(): void;
        clear(): void;
        /**
         * Rebuild the texture used by this world object that is painted by all the bound child particles.
         */
        updateTexture(): this;
        startup(): this;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
    }
}
