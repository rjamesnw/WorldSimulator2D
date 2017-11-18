namespace WorldSimulator2D {

    export interface IInternalWorldProperties {
        gl: WebGL;
        particleRenderProgram: GL.ShaderProgram;
        element: HTMLElement;
        resourceManager: ResourceManager;
        pixelSize: number;
        currentTemperature: number;
        //gravity: number; //?
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
    export class World extends PhysicsObject<Engine, Layer> implements IWorld, IInternalWorldProperties {
        // --------------------------------------------------------------------------------------------------------------------

        static readonly type = PhysicsObject.type | ObjectTypes.World;

        static readonly DEFAULT_EARTH_MASS = 5.972e24; // kg
        static readonly DEFAULT_EARTH_RADIUS = 6371; // km

        static DefaultPixelSize = 4;

        // --------------------------------------------------------------------------------------------------------------------

        static _nonClonableProperties: I_nonClonableProperties = (
            World._nonClonableProperties['element'] = void 0,
            World._nonClonableProperties['renderService'] = void 0,
            World._nonClonableProperties
        );

        // --------------------------------------------------------------------------------------------------------------------

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

        ///** A list of textures created within this world to be shared by objects in the world.  This helps to speed up rendering.
        //* The texture index is the ID.
        //*/
        //?use the resource manager instead! / readonly textures: object[] = [];

        /**
        * The size in graphics display pixels for a single "pixel" in the simulated world.
        * For example, if this is 2 (the default) then each pixel on a world layer is equal to a 2x2 graphics display pixel.
        * Note: This also dictates the layer grid cell size (width and hight).  Because of the particle grouping by grid cell, it
        * also has the effect of acting as the "collision radius" of a particle, since collisions only check in colliding grid cells.
        */
        readonly pixelSize: number = World.DefaultPixelSize;

        /** The current temperature of the world in Kelvins. The default starts at 20C/68F (converted to Kelvins). */
        readonly currentTemperature = celsiusToKelvins(20);

        //readonly layers: Layer[] = [];

        ///** Gravity in meters per second. */
        //gravity = 9.8; // ?

        /** The radius of the world (in km) to the world center. */
        radius = World.DEFAULT_EARTH_RADIUS;

        /** The size of a world grid block in world pixels (not graphics display pixels, as defined by 'pixelSize). The default is 32. */
        unitBlockSize = 32;

        /** The number of meters in a unit block size.  The default is 1.75/ */
        metersPerBlockSize = 1.75;

        /** When two particles occupy the same space (which is not possible in real life) the force of attraction due to gravity
        * can cause and explosive force pushing objects apart.  This number is a cap to make sure this doesn't happen.
        * The default is the same size as the pixel size.
        */
        maxGravitationalForce = World.DefaultPixelSize;

        /** The physics velocity is scaled by this factor to prevent skipping particle grid locations at high velocities.
        * In the system, the force of gravity is treated like m/s^2 (a unit/s each second). This is applied to velocities which are in units/s.
        * Since the velocities are in units/s at a given point, the velocities are scaled by the second using this property. This
        * helps to prevent skipping grid locations, however it also means that the update loop should be called more than once each
        * frame.  For 60 frames/second, the times to update objects should also be scaled at '60 / velocityScale'.
        */
        velocityScale = 1;

        /** Scales gravitational forces to be within the desired parameters of the world.  This allows visualizing large mass objects using small visual sprite objects. */
        gravitationalScale = 1e13;

        /** Pressure of the atmosphere at altitude 0 (in kPa). */
        atmosphericPressure = 101.325; // (https://goo.gl/DjVFB2)

        /** The X offset required to make the center of the render output at 0,0. */
        viewCenterXOffset: number;
        /** The Y offset required to make the center of the render output at 0,0. */
        viewCenterYOffset: number;

        /** Data to be input for processing using either GPU.JS or web workers. */
        private _inputdata: number[];

        /** The math processor to use for calculations in this world. */
        private processor: MathPipelines.MathProcessor;

        private _renderData = createFloat32ArrayBuffer(MAX_OBJECTS);

        // --------------------------------------------------------------------------------------------------------------------

        constructor() {
            super();
            (<IGraphObjectInternal>this).world = this;
            this.unmovable = true; // (physics objects default to movable)
            //// ... by default initialize the periodic element textures (simply using their element numbers) ...
            //for (var i = 0, n = PeriodicTable.elements.length; i < n; ++i)
            //    this.textures[i] = null; // (just place holding; we need a renderer to complete this)
        }

        initialize(isnew: boolean, autoReset?: boolean) {
            super.initialize(isnew, autoReset);
            this.setMass(World.DEFAULT_EARTH_MASS); // (just a default value)
        }

        configure(element: string | HTMLElement, width = 1920 / 2, height = 1080 / 2, pixelSize?: number): this {
            super.configure();

            var world: IInternalWorldProperties = this;
            if (pixelSize !== void 0) world.pixelSize = pixelSize;

            var e = typeof element == "object" && element instanceof HTMLElement ? element : document.getElementById('' + element);
            if (!e) throw this.error("An output target could not be found with the element id '" + element + "'.");

            var canvas = e instanceof HTMLCanvasElement ? e : void 0;

            // ... make sure it is a canvas, otherwise one will be created ...
            var gl = world.gl = new WebGLJS.Context(this, width, height, canvas);
            world.element = canvas = this.gl.canvas;

            if (e && e != canvas)
                (<HTMLElement>e).appendChild(canvas);

            // ... create the shader program that will be used to render the particles ...

            var program = world.particleRenderProgram = gl.createShader()
                .setVertexCode(MathPipelines.renderCode_vs(this.gl))
                .setFragmentCode(MathPipelines.renderCode_fs(this.gl))
                .build();

            program.sharedBuffer = gl.createBuffer(); // (to receive the data for rendering)

            program.attribute('a_pos').definePointer(2, false, MathPipelines.ParticleRenderInputs.x * 4);
            program.attribute('a_colorRGB').definePointer(1, false, MathPipelines.ParticleRenderInputs.colorRGB * 4);
            program.attribute('a_alpha').definePointer(1, false, MathPipelines.ParticleRenderInputs.alpha * 4);

            this.viewCenterXOffset = width / 2;
            this.viewCenterYOffset = height / 2;

            world.resourceManager = this.engine.create(ResourceManager);

            // ... initialize default textures for the default elements ...
            for (var i = 0, n = PeriodicTable.elements.length; i < n; ++i) {
                var el = PeriodicTable.elements[i];
                this.resourceManager.registerResource(el.name, this.gl.createTexture(this.pixelSize, this.pixelSize, el.color));
            }

            return this;
        }

        clone(): this {
            var clone = super.clone();
            return clone;
        }

        // --------------------------------------------------------------------------------------------------------------------

        /**
         * Creates and adds a layer to this world.
         * A layer is used to place world objects at world-pixel locations.
         */
        createLayer(): Layer {
            var layer = this.engine.createLayer();
            this.add(layer);
            return layer;
        }

        // --------------------------------------------------------------------------------------------------------------------
        //

        ///**
        // * Creates a sprite based on a given resource entry in the associated renderer.
        // * @param resourcePathOrID A resource path or ID. If empty, a default sprite is created.
        // * @param fallbackFillColor A fill color to use if the given resource is not specified, or not found.
        // */
        //? createParticleSprite(resourcePathOrID?: string, fallbackFillColor = '808080'): object {
        //    if (resourcePathOrID !== void 0 && resourcePathOrID !== null)
        //        var texture = this.renderService.getTexture(resourcePathOrID); // (for matter with the same name taken from elements, the name will pull a defaulted texture for that name as an ID, instead of a path/filename))
        //    if (!texture) { // (no resource found, so create a new entry, then register it under the same name)
        //        texture = this.renderService.createRenderTexture(this.pixelSize, this.pixelSize, fallbackFillColor);
        //        this.renderService.registerResource(resourcePathOrID, texture); // (cache for other objects with the same name missing textures)
        //    }
        //    var sprite = this.renderService.createSprite(void 0, texture);
        //    return sprite;
        //}

        ///**
        // * Creates a sprite based on a given resource entry in the associated renderer.
        // * @param resourcePathOrID A resource path or ID. If empty, a default sprite is created.
        // * @param fallbackWidth A width to use if the given resource is not specified, or not found.
        // * @param fallbackHeight A height to use if the given resource is not specified, or not found.
        // * @param fallbackFillColor A fill color to use if the given resource is not specified, or not found.
        // */
        //? createSprite(resourcePathOrID?: string, fallbackWidth = this.pixelSize * 16, fallbackHeight = this.pixelSize * 16, fallbackFillColor = '800000'): object {
        //    var sprite = null;

        //    if (resourcePathOrID !== void 0 && resourcePathOrID !== null)
        //        sprite = this.renderService.createSprite(resourcePathOrID);

        //    // ... if that failed, create a red place holder sprite ...

        //    if (!sprite) {
        //        var texture = this.renderService.createRenderTexture(fallbackWidth, fallbackHeight, fallbackFillColor);
        //        sprite = this.renderService.createSprite(void 0, texture);
        //    }

        //    return sprite;
        //}

        // --------------------------------------------------------------------------------------------------------------------

        private _threadCompleted(this: void, thread: MathPipelines.ThreadProgram): void {
            var world = thread.cpu.mathProcessor.owner as World, engine = world.engine;
            var kernalBufferManager = world.processor;
            var bufferGroup = kernalBufferManager.mathPipelines[0]; // (there's only ever one group needed for CPU processing)
            bufferGroup[thread.data.id].buffer = thread.data.buffer; // (the thread data has returned, put it back)
        }

        private _threadsCompleted(this: void, cpu: MathPipelines.CPU, inputCount: number): void {
            (<World>cpu.mathProcessor.owner)._processResults(cpu.mathProcessor);
        }

        private _processResults(processor: WorldSimulator2D.MathPipelines.MathProcessor) {
            var engine = this.engine, fbData = processor._glFeedbackBuffer.data, readIndex = 0;
            for (var plIndex = 0, pln = processor.mathPipelines.length; plIndex < pln; ++plIndex) {
                var mathPipeline = processor.mathPipelines[plIndex]; // (there's only ever one group needed for CPU processing)
                var blockCount = processor._glBufferSegmentBlockCounts[plIndex];
                for (; blockCount > 0; --blockCount, readIndex += mathPipeline.blockLength) {
                    var id = fbData[readIndex];
                    if (id > 0) {
                        var o = <IGraphObject>engine.objects.items[id];
                        if (o && o.postUpdate)
                            o.postUpdate(<Float32Array>fbData, readIndex, plIndex);
                    }
                }
            }
        }

        /**
         * Startup this world.
         */
        startup(): this {
            if (!this.processor) {
                this.processor = new MathPipelines.MathProcessor(this, MathPipelines.ProcessorTypes.GPU, void 0, void 0, this.gl); // new MathPiplines.KernalBufferManagerV2(MathPiplines.ProcessorTypes.GPU, void 0, 4);
                this.processor.registerPipeline(MathPipelines.GravityMathProgram, MathPipelines.Types.GravityCalculation);
                // (note: requesting 'GPU' mode is not guaranteed, and may switch back to 'CPU' mode)
                if (this.processor.cpu) {
                    this.processor.cpu.onCompleted.push(this._threadsCompleted);
                    this.processor.cpu.onThreadCompleted.push(this._threadCompleted);
                }
            } else
                this.processor.reset();

            if (this.world.pixelSize <= 0) this.error("'{World}.pixelSize' cannot be <= 0.");
            if (this.world.unitBlockSize <= 0) this.error("'{World}.unitBlockSize' cannot be <= 0.");
            if (this.world.metersPerBlockSize <= 0) this.error("'{World}.metersPerBlockSize' cannot be <= 0.");
            if (this.world.gravitationalScale == 0) this.error("'{World}.gravitationalScale' cannot be 0.");
            if (this.world.velocityScale == 0) this.error("'{World}.velocityScale' cannot be 0.");
            if (!this._inputdata)
                this._inputdata = [];

            super.startup();

            this.flatten(false);

            for (var i = 0, n = this.flattenedItems.count; i < n; ++i)
                if (!((<typeof EngineObject>this.flattenedItems[i].constructor).type & ObjectTypes.World))
                    this.flattenedItems[i].startup();

            return this;
        }

        /**
         * Update this world.
         */
        update() { // (reminder: Y+ is UP)
            var processor = this.processor;

            if (!processor) throw this.error("Please call 'startup()' first.");

            if (processor.cpu && !processor.cpu.completed) return; // (make sure the threads are finished before we do this again)

            if (this.graphUpdated || !this.flattenedItems) {
                /** Create a list of objects to be sent to the math processing buffer streams.
                  * On first pass, this collection is updated with a list of objects when 'graphUpdated' is true. The list of items are
                  * reused for fast processing loops rather than walk the tree of graph nodes when the node tree hasn't changed.
                  */
                this.flatten(false);
            }

            processor.reset();

            for (var i = 0, n = this.flattenedItems.count; i < n; ++i)
                if (!((<typeof EngineObject>this.flattenedItems[i].constructor).type & (ObjectTypes.Layer | ObjectTypes.World))) {
                    var item = <ISpatialObject><any>this.flattenedItems[i];
                    if (item.currentState)
                        item.previousState.copyFrom(item.currentState); // (after the update, copy the current values to the previous state)
                    item.update(processor);
                }

            // ... after the updates send any pending calculations to be processed (gravity, collisions, etc.) ...

            processor.execute(this.unitBlockSize, this.metersPerBlockSize, this.currentState.mass, this.gravitationalScale, this.maxGravitationalForce, this.velocityScale, this.pixelSize, this.gl.canvasWidth, this.gl.canvasHeight);

            // ... reconcile the results: if we are in GPU mode, the results will be immediately available (otherwise we have to wait on CPU threads [workers]) ...

            if (enablePostMathProcessing && processor.gl)
                this._processResults(processor);

            return this; //?super.update(void 0);
        }

        /**
         * Render this world.
         */
        render(): void {
            //?super.render();

            var processor = this.processor;

            if (processor.cpu && !processor.cpu.completed) return; // (if in CPU mode, make sure the threads are finished before we render anything)

            // ... finally, copy values to be rendered ...

            for (var i = 0, i2 = 0, n = this.flattenedItems.count; i < n; ++i) {
                var item = <IMatter><any>this.flattenedItems[i];
                if ((<typeof EngineObject>item.constructor).type & ObjectTypes.Matter) {

                    if (i2 + MathPipelines.ParticleRenderInputs.blockSize >= this._renderData.length) {
                        // ... render buffer is too small, time to resize ...
                        var oldArray = this._renderData;
                        this._renderData = createFloat32ArrayBuffer(oldArray.length + 1000);
                        this._renderData.set(oldArray);
                        this._renderData.count = oldArray.count;
                    }

                    this._renderData[i2 + MathPipelines.ParticleRenderInputs.x] = item.currentState.position.x;
                    this._renderData[i2 + MathPipelines.ParticleRenderInputs.y] = item.currentState.position.y;

                    var color = item.color;
                    if (typeof color != 'string') item.color = color = '' + color;
                    while (color[0] == '#') color = color.slice(1);// (trim '#')

                    var hasAlpha = color.length > 6;
                    var rgbInt = parseInt(hasAlpha ? color.slice(-6) : color, 16); // (https://jsperf.com/hex-to-rgb-2)
                    var alpha = hasAlpha ? (parseInt(color.slice(0, -6), 16) & 255) / 255 : 1;

                    this._renderData[i2 + MathPipelines.ParticleRenderInputs.colorRGB] = rgbInt;
                    this._renderData[i2 + MathPipelines.ParticleRenderInputs.alpha] = alpha;

                    i2 += MathPipelines.ParticleRenderInputs.blockSize;
                }
            }

            this._renderData.count = i2;

            //!this.updateMathBuffer(); // (update buffer with any changes due to collisions, etc)

            //!this.firstChild.addGridDebugParticles(processor, false, false);

            var renderCount = (this._renderData.count / MathPipelines.ParticleRenderInputs.blockSize) | 0;

            if (renderCount) {
                var program = this.particleRenderProgram;
                var gl = program.ctx;

                //if (this.resend)
                program.sharedBuffer.setData(this._renderData, this._renderData.count);

                program.setUniform("pixelSize", this.pixelSize, false);
                program.setUniform("width", this.gl.canvasWidth, false);
                program.setUniform("height", this.gl.canvasHeight, false);

                gl.render(program, gl.enums.PrimitiveTypeModes.POINTS, 0, renderCount);
            }
        }

        // --------------------------------------------------------------------------------------------------------------------
    }

    export interface IWorld extends World { }
}