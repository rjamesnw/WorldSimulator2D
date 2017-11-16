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
    var World = (function (_super) {
        __extends(World, _super);
        function World() {
            var _this = _super.call(this) || this;
            _this.pixelSize = World.DefaultPixelSize;
            _this.currentTemperature = WorldSimulator2D.celsiusToKelvins(20);
            _this.radius = World.DEFAULT_EARTH_RADIUS;
            _this.unitBlockSize = 32;
            _this.metersPerBlockSize = 1.75;
            _this.maxGravitationalForce = World.DefaultPixelSize;
            _this.velocityScale = 1;
            _this.gravitationalScale = 1e13;
            _this.atmosphericPressure = 101.325;
            _this._renderData = WorldSimulator2D.createFloat32ArrayBuffer(WorldSimulator2D.MAX_OBJECTS);
            _this.world = _this;
            _this.unmovable = true;
            return _this;
        }
        World.prototype.initialize = function (isnew, autoReset) {
            _super.prototype.initialize.call(this, isnew, autoReset);
            this.setMass(World.DEFAULT_EARTH_MASS);
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
            var gl = world.gl = new WebGLJS.Context(this, width, height, canvas);
            world.element = canvas = this.gl.canvas;
            if (e && e != canvas)
                e.appendChild(canvas);
            var program = world.particleRenderProgram = gl.createShader()
                .setVertexCode(WorldSimulator2D.MathPiplines.renderCode_vs(this.gl)).setFragmentCode(WorldSimulator2D.MathPiplines.renderCode_fs(this.gl))
                .build();
            program.sharedBuffer = gl.createBuffer();
            program.attribute('a_pos').definePointer(2, false, WorldSimulator2D.MathPiplines.ParticleRenderInputs.x * 4);
            program.attribute('a_colorRGB').definePointer(1, false, WorldSimulator2D.MathPiplines.ParticleRenderInputs.colorRGB * 4);
            program.attribute('a_alpha').definePointer(1, false, WorldSimulator2D.MathPiplines.ParticleRenderInputs.alpha * 4);
            this.viewCenterXOffset = width / 2;
            this.viewCenterYOffset = height / 2;
            world.resourceManager = this.engine.create(WorldSimulator2D.ResourceManager);
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
        World.prototype.createLayer = function () {
            var layer = this.engine.createLayer();
            this.add(layer);
            return layer;
        };
        World.prototype._threadCompleted = function (thread) {
            var world = thread.cpu.mathProcessor.owner, engine = world.engine;
            var kernalBufferManager = world.processor;
            var bufferGroup = kernalBufferManager.mathPipelines[0];
            bufferGroup[thread.data.id].buffer = thread.data.buffer;
        };
        World.prototype._threadsCompleted = function (cpu, inputCount) {
            cpu.mathProcessor.owner._processResults(cpu.mathProcessor);
        };
        World.prototype._processResults = function (processor) {
            var engine = this.engine, fbData = processor._glFeedbckBuffer.data, readIndex = 0;
            for (var plIndex = 0, pln = processor.mathPipelines.length; plIndex < pln; ++plIndex) {
                var mathPipeline = processor.mathPipelines[plIndex];
                var blockCount = processor._glBufferSegmentBlockCounts[plIndex];
                for (; blockCount > 0; --blockCount, readIndex += mathPipeline.blockLength) {
                    var id = fbData[readIndex];
                    if (id >= 0) {
                        var o = engine.objects.items[id];
                        if (o && o.postUpdate)
                            o.postUpdate(fbData, readIndex, plIndex);
                    }
                }
            }
        };
        World.prototype.startup = function () {
            if (!this.processor) {
                this.processor = new WorldSimulator2D.MathPiplines.MathProcessor(this, WorldSimulator2D.MathPiplines.ProcessorTypes.GPU, void 0, void 0, this.gl);
                this.processor.registerPipeline(WorldSimulator2D.MathPiplines.GravityMathProgram, WorldSimulator2D.MathPiplines.Types.GravityCalculation);
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
        World.prototype.update = function () {
            var processor = this.processor;
            if (!processor)
                throw this.error("Please call 'startup()' first.");
            if (processor.cpu && !processor.cpu.completed)
                return;
            if (this.graphUpdated || !this.flattenedItems) {
                this.flatten(false);
            }
            processor.reset();
            for (var i = 0, n = this.flattenedItems.count; i < n; ++i)
                if (!(this.flattenedItems[i].constructor.type & (WorldSimulator2D.ObjectTypes.Layer | WorldSimulator2D.ObjectTypes.World))) {
                    var item = this.flattenedItems[i];
                    if (item.currentState)
                        item.previousState.copyFrom(item.currentState);
                    item.update(processor);
                }
            processor.execute(this.unitBlockSize, this.metersPerBlockSize, this.currentState.mass, this.gravitationalScale, this.maxGravitationalForce, this.velocityScale, this.pixelSize, this.gl.canvasWidth, this.gl.canvasHeight);
            if (WorldSimulator2D.enablePostMathProcessing && processor.gl)
                this._processResults(processor);
            return this;
        };
        World.prototype.render = function () {
            var processor = this.processor;
            if (processor.cpu && !processor.cpu.completed)
                return;
            for (var i = 0, i2 = 0, n = this.flattenedItems.count; i < n; ++i) {
                var item = this.flattenedItems[i];
                if (item.constructor.type & WorldSimulator2D.ObjectTypes.Matter) {
                    if (i2 + WorldSimulator2D.MathPiplines.ParticleRenderInputs.blockSize >= this._renderData.length) {
                        var oldArray = this._renderData;
                        this._renderData = WorldSimulator2D.createFloat32ArrayBuffer(oldArray.length + 1000);
                        this._renderData.set(oldArray);
                        this._renderData.count = oldArray.count;
                    }
                    this._renderData[i2 + WorldSimulator2D.MathPiplines.ParticleRenderInputs.x] = item.currentState.position.x;
                    this._renderData[i2 + WorldSimulator2D.MathPiplines.ParticleRenderInputs.y] = item.currentState.position.y;
                    var color = item.color;
                    if (typeof color != 'string')
                        item.color = color = '' + color;
                    while (color[0] == '#')
                        color = color.slice(1);
                    var hasAlpha = color.length > 6;
                    var rgbInt = parseInt(hasAlpha ? color.slice(-6) : color, 16);
                    var alpha = hasAlpha ? (parseInt(color.slice(0, -6), 16) & 255) / 255 : 1;
                    this._renderData[i2 + WorldSimulator2D.MathPiplines.ParticleRenderInputs.colorRGB] = rgbInt;
                    this._renderData[i2 + WorldSimulator2D.MathPiplines.ParticleRenderInputs.alpha] = alpha;
                    i2 += WorldSimulator2D.MathPiplines.ParticleRenderInputs.blockSize;
                }
            }
            this._renderData.count = i2;
            var renderCount = (this._renderData.count / WorldSimulator2D.MathPiplines.ParticleRenderInputs.blockSize) | 0;
            if (renderCount) {
                var program = this.particleRenderProgram;
                var gl = program.ctx;
                program.sharedBuffer.setData(this._renderData, this._renderData.count);
                program.setUniform("pixelSize", this.pixelSize, false);
                program.setUniform("width", this.gl.canvasWidth, false);
                program.setUniform("height", this.gl.canvasHeight, false);
                gl.render(program, gl.enums.PrimitiveTypeModes.POINTS, 0, renderCount);
            }
        };
        World.type = WorldSimulator2D.PhysicsObject.type | WorldSimulator2D.ObjectTypes.World;
        World.DEFAULT_EARTH_MASS = 5.972e24;
        World.DEFAULT_EARTH_RADIUS = 6371;
        World.DefaultPixelSize = 4;
        World._nonClonableProperties = (World._nonClonableProperties['element'] = void 0,
            World._nonClonableProperties['renderService'] = void 0,
            World._nonClonableProperties);
        return World;
    }(WorldSimulator2D.PhysicsObject));
    WorldSimulator2D.World = World;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=world.js.map