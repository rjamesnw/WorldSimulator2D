declare namespace WorldSimulator2D {
    interface IInternalWorldProperties {
        gl: WebGL;
        particleRenderProgram: GL.ShaderProgram;
        element: HTMLElement;
        resourceManager: ResourceManager;
        pixelSize: number;
        currentTemperature: number;
        atmosphericPressure: number;
    }
    /**
     * Represents a single simulated world to render to an output.
     * While calling '{Engine}.render()' is enough, the simulation output is on a per-world basis.  Also, each world has its
     * own render service. This has an interesting benefit of allowing for multiple output screens per world on a single
     * browser! This could be useful for allowing people to move from one world to another while keeping the simulation of
     * the worlds separated.
     * Unit definitions: A "World Pixel" is a pixel in the simulated world.  A "Graphics Pixel" or "Display Pixel" is considered
     * a pixel on the graphics card display output.  By default, 32 graphics display pixels is treated as 1.75 meters.
     */
    class World extends PhysicsObject<Engine, Layer> implements IWorld, IInternalWorldProperties {
        static readonly type: number;
        static readonly DEFAULT_EARTH_MASS: number;
        static readonly DEFAULT_EARTH_RADIUS: number;
        static DefaultPixelSize: number;
        static _nonClonableProperties: I_nonClonableProperties;
        /** The previous world object. */
        readonly previous: IWorld;
        /** The next world object. */
        readonly next: IWorld;
        /** The internal WebGL wrapper context used for math and graphics processing. */
        readonly gl: WebGL;
        readonly particleRenderProgram: GL.ShaderProgram;
        /** The target element to receive the output from the render service. */
        readonly element: HTMLElement;
        readonly resourceManager: ResourceManager;
        /**
        * The size in graphics display pixels for a single "pixel" in the simulated world.
        * For example, if this is 2 (the default) then each pixel on a world layer is equal to a 2x2 graphics display pixel.
        * Note: This also dictates the layer grid cell size (width and hight).  Because of the particle grouping by grid cell, it
        * also has the effect of acting as the "collision radius" of a particle, since collisions only check in colliding grid cells.
        */
        readonly pixelSize: number;
        /** The current temperature of the world in Kelvins. The default starts at 20C/68F (converted to Kelvins). */
        readonly currentTemperature: number;
        /** The radius of the world (in km) to the world center. */
        radius: number;
        /** The size of a world grid block in world pixels (not graphics display pixels, as defined by 'pixelSize). The default is 32. */
        unitBlockSize: number;
        /** The number of meters in a unit block size.  The default is 1.75/ */
        metersPerBlockSize: number;
        /** When two particles occupy the same space (which is not possible in real life) the force of attraction due to gravity
        * can cause and explosive force pushing objects apart.  This number is a cap to make sure this doesn't happen.
        * The default is the same size as the pixel size.
        */
        maxGravitationalForce: number;
        /** The physics velocity is scaled by this factor to prevent skipping particle grid locations at high velocities.
        * In the system, the force of gravity is treated like m/s^2 (a unit/s each second). This is applied to velocities which are in units/s.
        * Since the velocities are in units/s at a given point, the velocities are scaled by the second using this property. This
        * helps to prevent skipping grid locations, however it also means that the update loop should be called more than once each
        * frame.  For 60 frames/second, the times to update objects should also be scaled at '60 / velocityScale'.
        */
        velocityScale: number;
        /** Scales gravitational forces to be within the desired parameters of the world.  This allows visualizing large mass objects using small visual sprite objects. */
        gravitationalScale: number;
        /** Pressure of the atmosphere at altitude 0 (in kPa). */
        atmosphericPressure: number;
        /** The X offset required to make the center of the render output at 0,0. */
        viewCenterXOffset: number;
        /** The Y offset required to make the center of the render output at 0,0. */
        viewCenterYOffset: number;
        /** Data to be input for processing using either GPU.JS or web workers. */
        private _inputdata;
        /** The math processor to use for calculations in this world. */
        private processor;
        private _renderData;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(element: string | HTMLElement, width?: number, height?: number, pixelSize?: number): this;
        clone(): this;
        /**
         * Creates and adds a layer to this world.
         * A layer is used to place world objects at world-pixel locations.
         */
        createLayer(): Layer;
        private _threadCompleted(this, thread);
        private _threadsCompleted(this, cpu, inputCount);
        private _processResults(processor);
        /**
         * Startup this world.
         */
        startup(): this;
        /**
         * Update this world.
         */
        update(): this;
        /**
         * Render this world.
         */
        render(): void;
    }
    interface IWorld extends World {
    }
}
