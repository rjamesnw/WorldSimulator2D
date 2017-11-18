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
     * Represents a single simulated world to render to an output.
     * While calling '{Engine}.render()' is enough, the simulation output is on a per-world basis.  Also, each world has its
     * own render service. This has an interesting benefit of allowing for multiple output screens per world on a single
     * browser! This could be useful for allowing people to move from one world to another while keeping the simulation of
     * the worlds separated.
     * Unit definitions: A "World Pixel" is a pixel in the simulated world.  A "Graphics Pixel" or "Display Pixel" is considered
     * a pixel on the graphics card display output.  By default, 32 graphics display pixels is treated as 1.75 meters.
     */
    var World = /** @class */ (function (_super) {
        __extends(World, _super);
        // --------------------------------------------------------------------------------------------------------------------
        function World() {
            var _this = _super.call(this) || this;
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
            _this.pixelSize = World.DefaultPixelSize;
            /** The current temperature of the world in Kelvins. The default starts at 20C/68F (converted to Kelvins). */
            _this.currentTemperature = WorldSimulator2D.celsiusToKelvins(20);
            //readonly layers: Layer[] = [];
            ///** Gravity in meters per second. */
            //gravity = 9.8; // ?
            /** The radius of the world (in km) to the world center. */
            _this.radius = World.DEFAULT_EARTH_RADIUS;
            /** The size of a world grid block in world pixels (not graphics display pixels, as defined by 'pixelSize). The default is 32. */
            _this.unitBlockSize = 32;
            /** The number of meters in a unit block size.  The default is 1.75/ */
            _this.metersPerBlockSize = 1.75;
            /** When two particles occupy the same space (which is not possible in real life) the force of attraction due to gravity
            * can cause and explosive force pushing objects apart.  This number is a cap to make sure this doesn't happen.
            * The default is the same size as the pixel size.
            */
            _this.maxGravitationalForce = World.DefaultPixelSize;
            /** The physics velocity is scaled by this factor to prevent skipping particle grid locations at high velocities.
            * In the system, the force of gravity is treated like m/s^2 (a unit/s each second). This is applied to velocities which are in units/s.
            * Since the velocities are in units/s at a given point, the velocities are scaled by the second using this property. This
            * helps to prevent skipping grid locations, however it also means that the update loop should be called more than once each
            * frame.  For 60 frames/second, the times to update objects should also be scaled at '60 / velocityScale'.
            */
            _this.velocityScale = 1;
            /** Scales gravitational forces to be within the desired parameters of the world.  This allows visualizing large mass objects using small visual sprite objects. */
            _this.gravitationalScale = 1e13;
            /** Pressure of the atmosphere at altitude 0 (in kPa). */
            _this.atmosphericPressure = 101.325; // (https://goo.gl/DjVFB2)
            _this._renderData = WorldSimulator2D.createFloat32ArrayBuffer(WorldSimulator2D.MAX_OBJECTS);
            _this.world = _this;
            _this.unmovable = true; // (physics objects default to movable)
            return _this;
            //// ... by default initialize the periodic element textures (simply using their element numbers) ...
            //for (var i = 0, n = PeriodicTable.elements.length; i < n; ++i)
            //    this.textures[i] = null; // (just place holding; we need a renderer to complete this)
        }
        World.prototype.initialize = function (isnew, autoReset) {
            _super.prototype.initialize.call(this, isnew, autoReset);
            this.setMass(World.DEFAULT_EARTH_MASS); // (just a default value)
        };
        World.prototype.configure = function (element, width, height, pixelSize) {
            if (width === void 0) { width = 1920 / 2; }
            if (height === void 0) { height = 1080 / 2; }
            _super.prototype.configure.call(this);
            var world = this;
            if (pixelSize !== void 0)
                world.pixelSize = pixelSize;
            var e = typeof element == "object" && element instanceof HTMLElement ? element : document.getElementById('' + element);
            if (!e)
                throw this.error("An output target could not be found with the element id '" + element + "'.");
            var canvas = e instanceof HTMLCanvasElement ? e : void 0;
            // ... make sure it is a canvas, otherwise one will be created ...
            var gl = world.gl = new WebGLJS.Context(this, width, height, canvas);
            world.element = canvas = this.gl.canvas;
            if (e && e != canvas)
                e.appendChild(canvas);
            // ... create the shader program that will be used to render the particles ...
            var program = world.particleRenderProgram = gl.createShader()
                .setVertexCode(WorldSimulator2D.MathPipelines.renderCode_vs(this.gl))
                .setFragmentCode(WorldSimulator2D.MathPipelines.renderCode_fs(this.gl))
                .build();
            program.sharedBuffer = gl.createBuffer(); // (to receive the data for rendering)
            program.attribute('a_pos').definePointer(2, false, WorldSimulator2D.MathPipelines.ParticleRenderInputs.x * 4);
            program.attribute('a_colorRGB').definePointer(1, false, WorldSimulator2D.MathPipelines.ParticleRenderInputs.colorRGB * 4);
            program.attribute('a_alpha').definePointer(1, false, WorldSimulator2D.MathPipelines.ParticleRenderInputs.alpha * 4);
            this.viewCenterXOffset = width / 2;
            this.viewCenterYOffset = height / 2;
            world.resourceManager = this.engine.create(WorldSimulator2D.ResourceManager);
            // ... initialize default textures for the default elements ...
            for (var i = 0, n = WorldSimulator2D.PeriodicTable.elements.length; i < n; ++i) {
                var el = WorldSimulator2D.PeriodicTable.elements[i];
                this.resourceManager.registerResource(el.name, this.gl.createTexture(this.pixelSize, this.pixelSize, el.color));
            }
            return this;
        };
        World.prototype.clone = function () {
            var clone = _super.prototype.clone.call(this);
            return clone;
        };
        // --------------------------------------------------------------------------------------------------------------------
        /**
         * Creates and adds a layer to this world.
         * A layer is used to place world objects at world-pixel locations.
         */
        World.prototype.createLayer = function () {
            var layer = this.engine.createLayer();
            this.add(layer);
            return layer;
        };
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
        World.prototype._threadCompleted = function (thread) {
            var world = thread.cpu.mathProcessor.owner, engine = world.engine;
            var kernalBufferManager = world.processor;
            var bufferGroup = kernalBufferManager.mathPipelines[0]; // (there's only ever one group needed for CPU processing)
            bufferGroup[thread.data.id].buffer = thread.data.buffer; // (the thread data has returned, put it back)
        };
        World.prototype._threadsCompleted = function (cpu, inputCount) {
            cpu.mathProcessor.owner._processResults(cpu.mathProcessor);
        };
        World.prototype._processResults = function (processor) {
            var engine = this.engine, fbData = processor._glFeedbackBuffer.data, readIndex = 0;
            for (var plIndex = 0, pln = processor.mathPipelines.length; plIndex < pln; ++plIndex) {
                var mathPipeline = processor.mathPipelines[plIndex]; // (there's only ever one group needed for CPU processing)
                var blockCount = processor._glBufferSegmentBlockCounts[plIndex];
                for (; blockCount > 0; --blockCount, readIndex += mathPipeline.blockLength) {
                    var id = fbData[readIndex];
                    if (id > 0) {
                        var o = engine.objects.items[id];
                        if (o && o.postUpdate)
                            o.postUpdate(fbData, readIndex, plIndex);
                    }
                }
            }
        };
        /**
         * Startup this world.
         */
        World.prototype.startup = function () {
            if (!this.processor) {
                this.processor = new WorldSimulator2D.MathPipelines.MathProcessor(this, WorldSimulator2D.MathPipelines.ProcessorTypes.GPU, void 0, void 0, this.gl); // new MathPiplines.KernalBufferManagerV2(MathPiplines.ProcessorTypes.GPU, void 0, 4);
                this.processor.registerPipeline(WorldSimulator2D.MathPipelines.GravityMathProgram, WorldSimulator2D.MathPipelines.Types.GravityCalculation);
                // (note: requesting 'GPU' mode is not guaranteed, and may switch back to 'CPU' mode)
                if (this.processor.cpu) {
                    this.processor.cpu.onCompleted.push(this._threadsCompleted);
                    this.processor.cpu.onThreadCompleted.push(this._threadCompleted);
                }
            }
            else
                this.processor.reset();
            if (this.world.pixelSize <= 0)
                this.error("'{World}.pixelSize' cannot be <= 0.");
            if (this.world.unitBlockSize <= 0)
                this.error("'{World}.unitBlockSize' cannot be <= 0.");
            if (this.world.metersPerBlockSize <= 0)
                this.error("'{World}.metersPerBlockSize' cannot be <= 0.");
            if (this.world.gravitationalScale == 0)
                this.error("'{World}.gravitationalScale' cannot be 0.");
            if (this.world.velocityScale == 0)
                this.error("'{World}.velocityScale' cannot be 0.");
            if (!this._inputdata)
                this._inputdata = [];
            _super.prototype.startup.call(this);
            this.flatten(false);
            for (var i = 0, n = this.flattenedItems.count; i < n; ++i)
                if (!(this.flattenedItems[i].constructor.type & WorldSimulator2D.ObjectTypes.World))
                    this.flattenedItems[i].startup();
            return this;
        };
        /**
         * Update this world.
         */
        World.prototype.update = function () {
            var processor = this.processor;
            if (!processor)
                throw this.error("Please call 'startup()' first.");
            if (processor.cpu && !processor.cpu.completed)
                return; // (make sure the threads are finished before we do this again)
            if (this.graphUpdated || !this.flattenedItems) {
                /** Create a list of objects to be sent to the math processing buffer streams.
                  * On first pass, this collection is updated with a list of objects when 'graphUpdated' is true. The list of items are
                  * reused for fast processing loops rather than walk the tree of graph nodes when the node tree hasn't changed.
                  */
                this.flatten(false);
            }
            processor.reset();
            for (var i = 0, n = this.flattenedItems.count; i < n; ++i)
                if (!(this.flattenedItems[i].constructor.type & (WorldSimulator2D.ObjectTypes.Layer | WorldSimulator2D.ObjectTypes.World))) {
                    var item = this.flattenedItems[i];
                    if (item.currentState)
                        item.previousState.copyFrom(item.currentState); // (after the update, copy the current values to the previous state)
                    item.update(processor);
                }
            // ... after the updates send any pending calculations to be processed (gravity, collisions, etc.) ...
            processor.execute(this.unitBlockSize, this.metersPerBlockSize, this.currentState.mass, this.gravitationalScale, this.maxGravitationalForce, this.velocityScale, this.pixelSize, this.gl.canvasWidth, this.gl.canvasHeight);
            // ... reconcile the results: if we are in GPU mode, the results will be immediately available (otherwise we have to wait on CPU threads [workers]) ...
            if (WorldSimulator2D.enablePostMathProcessing && processor.gl)
                this._processResults(processor);
            return this; //?super.update(void 0);
        };
        /**
         * Render this world.
         */
        World.prototype.render = function () {
            //?super.render();
            var processor = this.processor;
            if (processor.cpu && !processor.cpu.completed)
                return; // (if in CPU mode, make sure the threads are finished before we render anything)
            // ... finally, copy values to be rendered ...
            for (var i = 0, i2 = 0, n = this.flattenedItems.count; i < n; ++i) {
                var item = this.flattenedItems[i];
                if (item.constructor.type & WorldSimulator2D.ObjectTypes.Matter) {
                    if (i2 + WorldSimulator2D.MathPipelines.ParticleRenderInputs.blockSize >= this._renderData.length) {
                        // ... render buffer is too small, time to resize ...
                        var oldArray = this._renderData;
                        this._renderData = WorldSimulator2D.createFloat32ArrayBuffer(oldArray.length + 1000);
                        this._renderData.set(oldArray);
                        this._renderData.count = oldArray.count;
                    }
                    this._renderData[i2 + WorldSimulator2D.MathPipelines.ParticleRenderInputs.x] = item.currentState.position.x;
                    this._renderData[i2 + WorldSimulator2D.MathPipelines.ParticleRenderInputs.y] = item.currentState.position.y;
                    var color = item.color;
                    if (typeof color != 'string')
                        item.color = color = '' + color;
                    while (color[0] == '#')
                        color = color.slice(1); // (trim '#')
                    var hasAlpha = color.length > 6;
                    var rgbInt = parseInt(hasAlpha ? color.slice(-6) : color, 16); // (https://jsperf.com/hex-to-rgb-2)
                    var alpha = hasAlpha ? (parseInt(color.slice(0, -6), 16) & 255) / 255 : 1;
                    this._renderData[i2 + WorldSimulator2D.MathPipelines.ParticleRenderInputs.colorRGB] = rgbInt;
                    this._renderData[i2 + WorldSimulator2D.MathPipelines.ParticleRenderInputs.alpha] = alpha;
                    i2 += WorldSimulator2D.MathPipelines.ParticleRenderInputs.blockSize;
                }
            }
            this._renderData.count = i2;
            //!this.updateMathBuffer(); // (update buffer with any changes due to collisions, etc)
            //!this.firstChild.addGridDebugParticles(processor, false, false);
            var renderCount = (this._renderData.count / WorldSimulator2D.MathPipelines.ParticleRenderInputs.blockSize) | 0;
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
        };
        // --------------------------------------------------------------------------------------------------------------------
        World.type = WorldSimulator2D.PhysicsObject.type | WorldSimulator2D.ObjectTypes.World;
        World.DEFAULT_EARTH_MASS = 5.972e24; // kg
        World.DEFAULT_EARTH_RADIUS = 6371; // km
        World.DefaultPixelSize = 4;
        // --------------------------------------------------------------------------------------------------------------------
        World._nonClonableProperties = (World._nonClonableProperties['element'] = void 0,
            World._nonClonableProperties['renderService'] = void 0,
            World._nonClonableProperties);
        return World;
    }(WorldSimulator2D.PhysicsObject));
    WorldSimulator2D.World = World;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=world.js.map