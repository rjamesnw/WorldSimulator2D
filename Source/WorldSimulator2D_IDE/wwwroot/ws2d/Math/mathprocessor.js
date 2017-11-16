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
    WorldSimulator2D.MAX_OBJECTS = 100;
    WorldSimulator2D.MAX_CALCULAIONS_PER_PIPELINE_BUFFER = 1000;
    WorldSimulator2D.enablePostMathProcessing = true;
    WorldSimulator2D.enableCollisions = true;
    var MathPiplines;
    (function (MathPiplines) {
        var Types;
        (function (Types) {
            Types[Types["GravityCalculation"] = 0] = "GravityCalculation";
        })(Types = MathPiplines.Types || (MathPiplines.Types = {}));
        var GravityCalculationInputs;
        (function (GravityCalculationInputs) {
            GravityCalculationInputs[GravityCalculationInputs["objectID"] = 0] = "objectID";
            GravityCalculationInputs[GravityCalculationInputs["calcID"] = 1] = "calcID";
            GravityCalculationInputs[GravityCalculationInputs["m1"] = 2] = "m1";
            GravityCalculationInputs[GravityCalculationInputs["m2"] = 3] = "m2";
            GravityCalculationInputs[GravityCalculationInputs["x1"] = 4] = "x1";
            GravityCalculationInputs[GravityCalculationInputs["y1"] = 5] = "y1";
            GravityCalculationInputs[GravityCalculationInputs["x2"] = 6] = "x2";
            GravityCalculationInputs[GravityCalculationInputs["y2"] = 7] = "y2";
            GravityCalculationInputs[GravityCalculationInputs["blockSize"] = 8] = "blockSize";
        })(GravityCalculationInputs = MathPiplines.GravityCalculationInputs || (MathPiplines.GravityCalculationInputs = {}));
        var GravityCalculationOutputs;
        (function (GravityCalculationOutputs) {
            GravityCalculationOutputs[GravityCalculationOutputs["objectID"] = 0] = "objectID";
            GravityCalculationOutputs[GravityCalculationOutputs["calcID"] = 1] = "calcID";
            GravityCalculationOutputs[GravityCalculationOutputs["d"] = 2] = "d";
            GravityCalculationOutputs[GravityCalculationOutputs["f"] = 3] = "f";
            GravityCalculationOutputs[GravityCalculationOutputs["fx"] = 4] = "fx";
            GravityCalculationOutputs[GravityCalculationOutputs["fy"] = 5] = "fy";
            GravityCalculationOutputs[GravityCalculationOutputs["vstepx"] = 6] = "vstepx";
            GravityCalculationOutputs[GravityCalculationOutputs["vstepy"] = 7] = "vstepy";
        })(GravityCalculationOutputs = MathPiplines.GravityCalculationOutputs || (MathPiplines.GravityCalculationOutputs = {}));
        var CollisionCalculationInputs;
        (function (CollisionCalculationInputs) {
            CollisionCalculationInputs[CollisionCalculationInputs["objectID"] = 0] = "objectID";
            CollisionCalculationInputs[CollisionCalculationInputs["calcID"] = 1] = "calcID";
            CollisionCalculationInputs[CollisionCalculationInputs["m1"] = 2] = "m1";
            CollisionCalculationInputs[CollisionCalculationInputs["m2"] = 3] = "m2";
            CollisionCalculationInputs[CollisionCalculationInputs["vx1"] = 4] = "vx1";
            CollisionCalculationInputs[CollisionCalculationInputs["vy1"] = 5] = "vy1";
            CollisionCalculationInputs[CollisionCalculationInputs["vx2"] = 6] = "vx2";
            CollisionCalculationInputs[CollisionCalculationInputs["vy2"] = 7] = "vy2";
            CollisionCalculationInputs[CollisionCalculationInputs["blockSize"] = 8] = "blockSize";
        })(CollisionCalculationInputs = MathPiplines.CollisionCalculationInputs || (MathPiplines.CollisionCalculationInputs = {}));
        var MathPipeline = (function () {
            function MathPipeline(processor, program) {
                this.processor = processor;
                this.bufferWriteIndex = 0;
                if (!program)
                    throw Error("'program' is required.");
                this.program = program;
                if (!this.blockLength)
                    throw Error("");
                this.buffers = [WorldSimulator2D.createFloat32ArrayBuffer(processor.maxCalculationsPerBuffer * this.blockLength)];
            }
            Object.defineProperty(MathPipeline.prototype, "length", {
                get: function () {
                    var count = 0;
                    for (var bufferIndex = 0, lastIndex = this.bufferWriteIndex; bufferIndex <= lastIndex; ++bufferIndex)
                        count += this.buffers[bufferIndex].count;
                    return count;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MathPipeline.prototype, "blockLength", {
                get: function () { return this.program && this.program.blockLength; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MathPipeline.prototype, "stride", {
                get: function () { return this.program && this.program.stride; },
                enumerable: true,
                configurable: true
            });
            MathPipeline.prototype.nextBuffer = function () {
                var internals = this;
                var b = this.buffers[internals.bufferWriteIndex++], i = this.bufferWriteIndex;
                b.count = b.length;
                var b = this.buffers[i];
                if (!b)
                    this.buffers[i] = b = WorldSimulator2D.createFloat32ArrayBuffer(this.processor.maxCalculationsPerBuffer * this.program.blockLength);
            };
            MathPipeline.prototype.reset = function () {
                for (var i = 0, i2 = this.bufferWriteIndex; i <= i2; ++i)
                    this.buffers[i].count = 0;
                this.bufferWriteIndex = 0;
            };
            return MathPipeline;
        }());
        MathPiplines.MathPipeline = MathPipeline;
        var ProcessorTypes;
        (function (ProcessorTypes) {
            ProcessorTypes[ProcessorTypes["CPU"] = 0] = "CPU";
            ProcessorTypes[ProcessorTypes["GPU"] = 1] = "GPU";
        })(ProcessorTypes = MathPiplines.ProcessorTypes || (MathPiplines.ProcessorTypes = {}));
        var MathProgram = (function () {
            function MathProgram(processor) {
                this.processor = processor;
                var config = this.config = this.constructor;
                this.blockLength = config.inputs && config.inputs.length || 0;
                this.stride = this.blockLength * 4;
            }
            MathProgram.getEnumNames = function (enumRef) { return WS2D.getEnumNames(enumRef, "blockSize"); };
            MathProgram.prototype.buildShaderProgram = function (mathCode) {
                if (!mathCode)
                    throw Error("MathProgram: buildShaderProgram(): 'mathCode' is required.");
                if (!this.processor.gl || !this.processor.gl.webgl2)
                    throw Error("MathProgram: buildShaderProgram(): WebGL 2 not supported.");
                var staticType = this.constructor;
                var inputs = staticType.inputs;
                var outputs = staticType.outputs;
                var globals = staticType.globals;
                var inPrefix = staticType.inVariablePrefix;
                var outPrefix = staticType.outVariablePrefix;
                var varyings = [];
                var vertexCode = "#version 300 es\n\
                #ifdef GL_ES\n\
                    precision highp float;\n\
                    precision highp int;\n\
                #endif\n\n";
                if (globals)
                    for (var i = 0, n = globals.length; i < n; ++i)
                        vertexCode += "uniform float " + globals[i] + ";\n";
                vertexCode += "\n";
                if (inputs)
                    for (var i = 0, n = inputs.length; i < n; ++i) {
                        vertexCode += "in float " + (inPrefix + inputs[i]) + ";\n";
                    }
                vertexCode += "\n";
                if (outputs)
                    for (var i = 0, n = outputs.length; i < n; ++i) {
                        vertexCode += "out float " + (outPrefix + outputs[i]) + ";\n";
                        varyings.push(outPrefix + outputs[i]);
                    }
                vertexCode += "\nvoid main() {\n\
                    " + mathCode + "\n\
                }";
                var fragmentCode = "#version 300 es\n\
                #ifdef GL_ES\n\
                    precision highp float;\n\
                    precision highp int;\n\
                #endif\n\
                out vec4 o_color;\n\
                void main() {\n\
                    discard; \n\
                }";
                var gl = this.processor.gl;
                var program = (_a = gl.createShader().disableRasterizer()
                    .setVertexCode(vertexCode).setFragmentCode(fragmentCode)).build.apply(_a, [false, gl.enums.FeedbackModes.INTERLEAVED_ATTRIBS].concat(varyings));
                if (inputs)
                    for (var i = 0, n = inputs.length; i < n; ++i) {
                        var a = program.attribute(inPrefix + inputs[i]);
                        if (a)
                            a.definePointer(1, false, i * 4);
                    }
                return program;
                var _a;
            };
            MathProgram.prototype.buildJSProgram = function (jsCode) {
                throw Error("Not implemented yet.");
            };
            MathProgram.prototype.getGPUProgram = function () {
                var code = this.getGLSLMainCode && this.getGLSLMainCode() || void 0;
                if (!code)
                    throw Error("'getGLSLMainCode()' resulted in empty/undefined code for math program '" + WorldSimulator2D.getTypeName(this) + "'.");
                return this.buildShaderProgram(code);
            };
            MathProgram.prototype.getCPUProgram = function () {
                var code = this.getJSMainCode && this.getJSMainCode() || void 0;
                if (!code)
                    throw Error("'getJSMainCode()' resulted in empty/undefined code for math program '" + WorldSimulator2D.getTypeName(this) + "'.");
                return this.buildJSProgram(code);
            };
            MathProgram.inVariablePrefix = "a_";
            MathProgram.outVariablePrefix = "v_";
            return MathProgram;
        }());
        MathPiplines.MathProgram = MathProgram;
        var GravityMathProgram = (function (_super) {
            __extends(GravityMathProgram, _super);
            function GravityMathProgram(processor) {
                return _super.call(this, processor) || this;
            }
            GravityMathProgram.prototype.getGLSLMainCode = function () {
                return "\
                    // ... get world force on this object based on distance from world center ...\n\
                    vec2 diff = vec2(a_x2-a_x1, a_y2-a_y1);\n\
                    float len = length(diff);\n\
                    float d = len / unitBlockSize * metersPerBlockSize / 2.; // (make sure it's in meters: d in world particles / particles per 1.75 meters * 1.75 to get the meters)\n\
                    float f = (6.67408e-11 * a_m1 * a_m2) / (d * d) / gravitationalScale; // (constant 6.67e-11 scaled to 6.67e-6 because mass is also scaled by half the exponent)\n\
                    f = clamp(f, 0., maxGravitationalForce);\n\
                    vec2 dirNormal = normalize(diff); // (get force vectors) \n\
                    vec2 forceNormal = -dirNormal * f; // (get force vectors) \n\
                    \n\
                    // ... get the velocity of this object ...\n\
                    \n\
                    vec2 stepv = forceNormal / velocityScale;\n\
                    float stepvlen = length(stepv);\n\
                    stepv.x = clamp(stepv.x, -1., 1.);\n\
                    stepv.y = clamp(stepv.y, -1., 1.);\n\
                    //stepv = float(stepvlen <= 1.) * stepv + float(stepvlen > 1.) * 1.;\n\
                    v_objectID = a_objectID;\n\
                    v_calcID = a_calcID;\n\
                    v_d = d;\n\
                    v_f = f;\n\
                    v_fx = forceNormal.x;\n\
                    v_fy = forceNormal.y;\n\
                    v_vstepx = stepv.x;\n\
                    v_vstepy = stepv.y;\n\
";
            };
            GravityMathProgram.prototype.getJSMainCode = function () {
                return "";
            };
            GravityMathProgram.inputs = WorldSimulator2D.getEnumNames(GravityCalculationInputs);
            GravityMathProgram.outputs = WorldSimulator2D.getEnumNames(GravityCalculationOutputs);
            GravityMathProgram.globals = ["unitBlockSize", "metersPerBlockSize", "gravitationalScale", "maxGravitationalForce", "velocityScale"];
            return GravityMathProgram;
        }(MathProgram));
        MathPiplines.GravityMathProgram = GravityMathProgram;
        var MathProcessor = (function () {
            function MathProcessor(owner, processorType, maxCalculationsPerBuffer, _numberOfInputBuffersOrCores, glOrCPU) {
                if (maxCalculationsPerBuffer === void 0) { maxCalculationsPerBuffer = WorldSimulator2D.MAX_CALCULAIONS_PER_PIPELINE_BUFFER; }
                this.owner = owner;
                this.processorType = processorType;
                this.maxCalculationsPerBuffer = maxCalculationsPerBuffer;
                this._numberOfInputBuffersOrCores = _numberOfInputBuffersOrCores;
                this.mathPipelines = [];
                this._glBufferSegmentBlockCounts = WorldSimulator2D.createArrayBuffer();
                this.counter = 0;
                if (processorType < 0 || processorType > 1)
                    throw Error("'processorType' is not valid.");
                if (maxCalculationsPerBuffer < 1)
                    throw Error("'maxCalculationsPerBuffer' must be >= 1.");
                if (processorType == ProcessorTypes.GPU) {
                    console.log("GPU mode requested ...");
                    if (_numberOfInputBuffersOrCores < 1)
                        throw Error("'numberOfCores' must be >= 1.");
                    if (!_numberOfInputBuffersOrCores)
                        this._numberOfInputBuffersOrCores = _numberOfInputBuffersOrCores = 1;
                    var gl = glOrCPU;
                    this.gl = gl || (gl = new WebGLJS.Context(this, 1, 1));
                    if (!this.gl.isWebGL2Supported) {
                        this.gl = void 0;
                        this.processorType = processorType = ProcessorTypes.CPU;
                        console.warn("WebGL 2 is required to support math accelerations for this system, but it is not supported in your browser.  Instead multiple worker threads will be used.");
                    }
                }
                if (processorType == ProcessorTypes.CPU) {
                    throw Error("Not implemented yet.");
                }
            }
            MathProcessor.prototype.registerPipeline = function (mathProgram, piplineIndex) {
                if (mathProgram.constructor == MathProgram)
                    throw Error("Cannot register math program: Invalid type - you must derive from the MathProgram abstract class to create a custom program.");
                if (!(piplineIndex >= 0 && piplineIndex < 32))
                    throw Error("'piplineIndex' must be a value from 0 to 31. You may also wish use a 'MathPiplines.Types' constant instead.");
                var pl = this.mathPipelines[piplineIndex];
                if (pl)
                    if (pl.constructor == mathProgram)
                        return this;
                    else
                        throw Error("Cannot register math program: there is already a different program registered at this index.");
                var program = new mathProgram(this);
                var pipeline = this.mathPipelines[piplineIndex] = new MathPipeline(this, program);
                return this;
            };
            MathProcessor.prototype.execute = function (unitBlockSize, metersPerBlockSize, worldMass, gravitationalScale, maxGravitationalForce, velocityScale, pixelSize, width, height) {
                if (this.cpu) {
                }
                else {
                    var totalLengthRequired = 0;
                    this._glBufferSegmentBlockCounts.count = 0;
                    for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex) {
                        var pipeline = this.mathPipelines[pipelineIndex];
                        this._glBufferSegmentBlockCounts[this._glBufferSegmentBlockCounts.count++] = pipeline.length / pipeline.blockLength;
                        totalLengthRequired += pipeline.length;
                    }
                    if (totalLengthRequired == 0)
                        return;
                    if (!this._glBuffer) {
                        this._glBuffer = this.gl.createBuffer().setProperties(this.gl.enums.UsageTypes.DYNAMIC_DRAW);
                        this._glFeedbckBuffer = this.gl.createBuffer().setProperties(this.gl.enums.UsageTypes.DYNAMIC_DRAW);
                    }
                    if (!this._glBuffer.data || totalLengthRequired > this._glBuffer.data.length) {
                        this._glBuffer.setData(new Float32Array(totalLengthRequired));
                        this._glFeedbckBuffer.setData(new Float32Array(totalLengthRequired));
                    }
                    this._glBuffer.setData(void 0, totalLengthRequired);
                    this._glFeedbckBuffer.setData(void 0, totalLengthRequired);
                    var renderIndex = 0, renderCount;
                    for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex) {
                        var pipeline = this.mathPipelines[pipelineIndex];
                        for (var bufferIndex = 0, lastIndex = pipeline.bufferWriteIndex; bufferIndex <= lastIndex; ++bufferIndex) {
                            var buffer = pipeline.buffers[bufferIndex];
                            this._glBuffer.data.set(buffer.subarray(0, buffer.count), renderIndex);
                            renderIndex += buffer.count;
                        }
                    }
                    var renderIndex = 0;
                    for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex) {
                        var pipeline = this.mathPipelines[pipelineIndex];
                        var program = pipeline.shader || (pipeline.shader = pipeline.program.getGPUProgram());
                        program.sharedBuffer = this._glBuffer;
                        program.feedbackBuffer = this._glFeedbckBuffer;
                        program.setUniform("unitBlockSize", unitBlockSize, false);
                        program.setUniform("metersPerBlockSize", metersPerBlockSize, false);
                        program.setUniform("worldMass", worldMass, false);
                        program.setUniform("gravitationalScale", gravitationalScale, false);
                        program.setUniform("maxGravitationalForce", maxGravitationalForce, false);
                        program.setUniform("velocityScale", velocityScale, false);
                        program.setUniform("pixelSize", pixelSize, false);
                        program.setUniform("width", width, false);
                        program.setUniform("height", height, false);
                        renderCount = this._glBufferSegmentBlockCounts[pipelineIndex];
                        if (!program.feedbackBuffer)
                            program.feedbackBuffer = this.gl.createBuffer().setProperties(this.gl.enums.UsageTypes.DYNAMIC_DRAW);
                        if (!program.feedbackBuffer.data || program.feedbackBuffer.data.length < renderCount)
                            program.feedbackBuffer.setData(new Float32Array(renderCount));
                        this.gl.render(program, this.gl.enums.PrimitiveTypeModes.POINTS, renderIndex, renderCount);
                        renderCount += renderCount;
                    }
                    this._glFeedbckBuffer.getData();
                }
                ++this.counter;
            };
            MathProcessor.prototype.reset = function () {
                for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex)
                    this.mathPipelines[pipelineIndex].reset();
            };
            return MathProcessor;
        }());
        MathPiplines.MathProcessor = MathProcessor;
    })(MathPiplines = WorldSimulator2D.MathPiplines || (WorldSimulator2D.MathPiplines = {}));
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=mathprocessor.js.map