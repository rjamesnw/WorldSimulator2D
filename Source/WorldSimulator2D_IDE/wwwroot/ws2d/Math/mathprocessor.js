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
     * The maximum expected objects to be supported (soft limit).
     * This number is used to predict in advance how to split up buffers for processing calculation streams.
     */
    WorldSimulator2D.MAX_OBJECTS = 8000;
    WorldSimulator2D.MAX_CALCULATIONS_PER_PIPELINE_BUFFER = 10100;
    WorldSimulator2D.enablePostMathProcessing = true;
    WorldSimulator2D.enableCollisions = true;
    /**
     * Types and routines for processing calculations on piped float-based data streams.
     */
    var MathPipelines;
    (function (MathPipelines) {
        /** Supported math pipeline types. */
        var Types;
        (function (Types) {
            Types[Types["GravityCalculation"] = 0] = "GravityCalculation";
        })(Types = MathPipelines.Types || (MathPipelines.Types = {}));
        var GravityCalculationInputs;
        (function (GravityCalculationInputs) {
            /** Object requesting the calculation. */
            GravityCalculationInputs[GravityCalculationInputs["objectID"] = 0] = "objectID";
            /** An ID for the requesting object to identify where to apply the response. */
            GravityCalculationInputs[GravityCalculationInputs["calcID"] = 1] = "calcID";
            /** Mass of object 1. */
            GravityCalculationInputs[GravityCalculationInputs["m1"] = 2] = "m1";
            /** Mass of object 2. */
            GravityCalculationInputs[GravityCalculationInputs["m2"] = 3] = "m2";
            /** X position of object 1. */
            GravityCalculationInputs[GravityCalculationInputs["x1"] = 4] = "x1";
            /** Y position of object 1. */
            GravityCalculationInputs[GravityCalculationInputs["y1"] = 5] = "y1";
            /** X position of object 2. */
            GravityCalculationInputs[GravityCalculationInputs["x2"] = 6] = "x2";
            /** Y position of object 2. */
            GravityCalculationInputs[GravityCalculationInputs["y2"] = 7] = "y2";
            /** The current X velocity to be updated. */
            GravityCalculationInputs[GravityCalculationInputs["vx"] = 8] = "vx";
            /** The current Y velocity to be updated. */
            GravityCalculationInputs[GravityCalculationInputs["vy"] = 9] = "vy";
            /* (MUST BE AT END - Counts the number of data items [enums] in one data block [one block per object being processed]) */
            GravityCalculationInputs[GravityCalculationInputs["blockSize"] = 10] = "blockSize";
        })(GravityCalculationInputs = MathPipelines.GravityCalculationInputs || (MathPipelines.GravityCalculationInputs = {}));
        var GravityCalculationOutputs;
        (function (GravityCalculationOutputs) {
            /** Object requesting the calculation. */
            GravityCalculationOutputs[GravityCalculationOutputs["objectID"] = 0] = "objectID";
            /** An ID for the requesting object to identify where to apply the response. */
            GravityCalculationOutputs[GravityCalculationOutputs["calcID"] = 1] = "calcID";
            /** The distance between the two points. */
            GravityCalculationOutputs[GravityCalculationOutputs["d"] = 2] = "d";
            /** The force of attraction.*/
            GravityCalculationOutputs[GravityCalculationOutputs["f"] = 3] = "f";
            /** The force in the X direction. */
            GravityCalculationOutputs[GravityCalculationOutputs["fx"] = 4] = "fx";
            /** The force in the Y direction. */
            GravityCalculationOutputs[GravityCalculationOutputs["fy"] = 5] = "fy";
            /** The velocity X step due to the force and velocity scale. */
            GravityCalculationOutputs[GravityCalculationOutputs["vstepx"] = 6] = "vstepx";
            /** The velocity Y step due to the force and velocity scale. */
            GravityCalculationOutputs[GravityCalculationOutputs["vstepy"] = 7] = "vstepy";
            /** The new X velocity. */
            GravityCalculationOutputs[GravityCalculationOutputs["vx"] = 8] = "vx";
            /** The new Y velocity. */
            GravityCalculationOutputs[GravityCalculationOutputs["vy"] = 9] = "vy";
        })(GravityCalculationOutputs = MathPipelines.GravityCalculationOutputs || (MathPipelines.GravityCalculationOutputs = {}));
        var CollisionCalculationInputs;
        (function (CollisionCalculationInputs) {
            /** Object requesting the calculation. */
            CollisionCalculationInputs[CollisionCalculationInputs["objectID"] = 0] = "objectID";
            /** An ID for the requesting object to identify where to apply the response. */
            CollisionCalculationInputs[CollisionCalculationInputs["calcID"] = 1] = "calcID";
            /** Mass of object 1. */
            CollisionCalculationInputs[CollisionCalculationInputs["m1"] = 2] = "m1";
            /** Mass of object 2. */
            CollisionCalculationInputs[CollisionCalculationInputs["m2"] = 3] = "m2";
            /** X velocity of object 1. */
            CollisionCalculationInputs[CollisionCalculationInputs["vx1"] = 4] = "vx1";
            /** Y velocity of object 1. */
            CollisionCalculationInputs[CollisionCalculationInputs["vy1"] = 5] = "vy1";
            /** X velocity of object 2. */
            CollisionCalculationInputs[CollisionCalculationInputs["vx2"] = 6] = "vx2";
            /** Y velocity of object 2. */
            CollisionCalculationInputs[CollisionCalculationInputs["vy2"] = 7] = "vy2";
            /* (MUST BE AT END - Counts the number of data items [enums] in one data block [one block per object being processed]) */
            CollisionCalculationInputs[CollisionCalculationInputs["blockSize"] = 8] = "blockSize";
        })(CollisionCalculationInputs = MathPipelines.CollisionCalculationInputs || (MathPipelines.CollisionCalculationInputs = {}));
        var MathPipeline = /** @class */ (function () {
            function MathPipeline(processor, program) {
                this.processor = processor;
                /** The current buffer being written to. */
                this.bufferWriteIndex = 0;
                if (!program)
                    throw Error("'program' is required.");
                this.program = program;
                if (!this.blockLength)
                    throw Error("");
                this.buffers = [WorldSimulator2D.createFloat32ArrayBuffer(processor.maxCalculationsPerBuffer * this.blockLength)];
            }
            Object.defineProperty(MathPipeline.prototype, "length", {
                /** The required length to store all buffer data for this pipeline.  The total of all buffer counts are added together and returned (each float entry is one count). */
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
                /** The number of items (floats) in a block of data. */
                get: function () { return this.program && this.program.blockLength; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MathPipeline.prototype, "stride", {
                /** The size of a block of object data in the buffer (in bytes). Read indexes should always increment by this value. */
                get: function () { return this.program && this.program.stride; },
                enumerable: true,
                configurable: true
            });
            /**
             * Go to the next buffer to get ready to store more values for calculations.
             */
            MathPipeline.prototype.nextBuffer = function () {
                var internals = this;
                var b = this.buffers[internals.bufferWriteIndex++], i = this.bufferWriteIndex;
                b.count = b.length;
                var b = this.buffers[i];
                if (!b)
                    this.buffers[i] = b = WorldSimulator2D.createFloat32ArrayBuffer(this.processor.maxCalculationsPerBuffer * this.program.blockLength);
            };
            /**
             * Reset the math pipeline for calculation math run.
             */
            MathPipeline.prototype.reset = function () {
                for (var i = 0, i2 = this.bufferWriteIndex; i <= i2; ++i)
                    this.buffers[i].count = 0;
                this.bufferWriteIndex = 0;
            };
            return MathPipeline;
        }());
        MathPipelines.MathPipeline = MathPipeline;
        var ProcessorTypes;
        (function (ProcessorTypes) {
            ProcessorTypes[ProcessorTypes["CPU"] = 0] = "CPU";
            ProcessorTypes[ProcessorTypes["GPU"] = 1] = "GPU";
        })(ProcessorTypes = MathPipelines.ProcessorTypes || (MathPipelines.ProcessorTypes = {}));
        /**
         * The base type for math programs that will calculate blocks of variable data in a buffer stream.
         * Each program can be registered with a MathProcessor instance to create different streams of math data to be
         * processed by either the GPU or CPU worker threads.
         * To get started, create enums to offset into a float32 array for each of the following, then inherit from this
         * class and add the following to your class:
         *    1. static readonly variables = MathProgram.getEnumNames(YourMathBlockEnumsHere); // (or leave as undefined if none)
         *    2. static readonly globals = [Your, Globals, Here]; // (or leave as undefined if none)
         *    3. Implement 'getGLSLMainCode()' and 'getJSMainCode()' to return code for the math to be calculated.
         */
        var MathProgram = /** @class */ (function () {
            function MathProgram(processor) {
                this.processor = processor;
                var config = this.config = this.constructor;
                this.blockLength = config.inputs && config.inputs.length || 0;
                this.stride = this.blockLength * 4;
            }
            /**
             * Gets name values from an enum object in ascending numerical value order and returns the names as an array of strings.
             * The 'blockSize' key word is excluded from this list.
             * @param enumRef A reference to the enum object.
             */
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
                    for (var i = 0, n = inputs.length; i < n; ++i)
                        vertexCode += "in float " + (inPrefix + inputs[i]) + ";\n";
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
                }"; // (not used)
                // TODO: See if this is really needed.
                // ... create the transform feedback buffer we need ...
                var gl = this.processor.gl;
                // ... create the shader program ...
                var program = (_a = gl.createShader().disableRasterizer()
                    .setVertexCode(vertexCode).setFragmentCode(fragmentCode)).build.apply(_a, [false, gl.enums.FeedbackModes.INTERLEAVED_ATTRIBS].concat(varyings));
                if (inputs)
                    for (var i = 0, n = inputs.length; i < n; ++i) {
                        var a = program.attribute(inPrefix + inputs[i]);
                        if (a)
                            a.definePointer(1, false, i * 4, this.blockLength * 4);
                    }
                return program;
                var _a;
            };
            MathProgram.prototype.buildJSProgram = function (jsCode) {
                throw Error("Not implemented yet.");
            };
            /** Returns the shader program to use for calculations. If not specified then 'getGLSLMainCode()' must be implemented. */
            MathProgram.prototype.getGPUProgram = function () {
                var code = this.getGLSLMainCode && this.getGLSLMainCode() || void 0;
                if (!code)
                    throw Error("'getGLSLMainCode()' resulted in empty/undefined code for math program '" + WorldSimulator2D.getTypeName(this) + "'.");
                return this.buildShaderProgram(code);
            };
            /** Returns the JS function to use for calculations.  This function is injected into a thread for this operation.
            * If not specified then 'getGLSLMainCode()' must be implemented.
            */
            MathProgram.prototype.getCPUProgram = function () {
                var code = this.getJSMainCode && this.getJSMainCode() || void 0;
                if (!code)
                    throw Error("'getJSMainCode()' resulted in empty/undefined code for math program '" + WorldSimulator2D.getTypeName(this) + "'.");
                return this.buildJSProgram(code);
            };
            /** A prefix to add to the input variables when generating the shader code (such as 'a_' for attribute [the default]). */
            MathProgram.inVariablePrefix = "a_";
            /** A prefix to add to the output variables when generating the shader code (such as 'v_' for varying [the default]). */
            MathProgram.outVariablePrefix = "v_";
            return MathProgram;
        }());
        MathPipelines.MathProgram = MathProgram;
        /**
         * Calculates force of attraction between two points.
         */
        var GravityMathProgram = /** @class */ (function (_super) {
            __extends(GravityMathProgram, _super);
            function GravityMathProgram(processor) {
                return _super.call(this, processor) || this;
            }
            GravityMathProgram.prototype.getGLSLMainCode = function () {
                return "\
                    // ... get world force on this object based on distance from world center ...\n\
                    vec2 diff = vec2(a_x2-a_x1, a_y2-a_y1);\n\
                    float len = length(diff);\n\
                    float d = 1e-20 + len / unitBlockSize * metersPerBlockSize / 2.; // (make sure it's in meters: d in world particles / particles per 1.75 meters * 1.75 to get the meters)\n\
                    float f = (6.67408e-11 * a_m1 * a_m2) / (d * d) / gravitationalScale;\n\
                    f = clamp(f, 0., maxGravitationalForce);\n\
                    vec2 dirNormal = normalize(diff); // (get force vectors) \n\
                    vec2 forceNormal = dirNormal * -f; // (get force vectors) \n\
                    \n\
                    // ... get the velocity of this object ...\n\
                    \n\
                    vec2 v = vec2(a_vx, a_vy) + forceNormal; // (get new velocity)\n\
                    float vlen = 1e-20 + length(v);\n\
                    v = float(vlen<=velocityScale*1.)*v + float(vlen>velocityScale*1.)*(v/vlen*velocityScale*1.); // (cap velocity; 'v/vlen' unit vec * velocityScale)\n\
                    \n\
                    vec2 stepv = v/velocityScale;\n\
                    \n\
                    float steplen = 1e-20 + length(stepv); \n\
                    stepv = float(steplen<=1.)*stepv + float(steplen>1.)*(stepv/steplen);\n\
                    \n\
                    v_objectID = a_objectID;\n\
                    v_calcID = a_calcID;\n\
                    v_d = d;\n\
                    v_f = f;\n\
                    v_fx = forceNormal.x;\n\
                    v_fy = forceNormal.y;\n\
                    v_vstepx = stepv.x;\n\
                    v_vstepy = stepv.y;\n\
                    v_vx = v.x;\n\
                    v_vy = v.y;\n\
";
            };
            GravityMathProgram.prototype.getJSMainCode = function () {
                return "";
            };
            GravityMathProgram.inputs = WorldSimulator2D.getEnumNames(GravityCalculationInputs, "blockSize");
            GravityMathProgram.outputs = WorldSimulator2D.getEnumNames(GravityCalculationOutputs);
            GravityMathProgram.globals = ["unitBlockSize", "metersPerBlockSize", "gravitationalScale", "maxGravitationalForce", "velocityScale"];
            return GravityMathProgram;
        }(MathProgram));
        MathPipelines.GravityMathProgram = GravityMathProgram;
        /**
        * A processor for running calculations that are either GPU or CPU-thread accelerated.
        * If the GPU is not supported, the instance will fall-back to running routines within the normal CPU using worker threads instead.
        * In the world simulator there may be both modes used: CPU for more complex data where responses are needed back more quickly, and
        * GPU for period math intensive calculations (such as calculating gravity between a list of objects with a list of planetary objects).
        */
        var MathProcessor = /** @class */ (function () {
            function MathProcessor(owner, processorType, maxCalculationsPerBuffer, _numberOfInputBuffersOrCores, glOrCPU) {
                if (maxCalculationsPerBuffer === void 0) { maxCalculationsPerBuffer = WorldSimulator2D.MAX_CALCULATIONS_PER_PIPELINE_BUFFER; }
                this.owner = owner;
                this.processorType = processorType;
                this.maxCalculationsPerBuffer = maxCalculationsPerBuffer;
                this._numberOfInputBuffersOrCores = _numberOfInputBuffersOrCores;
                /** Multiple registered math pipelines for streaming arguments for accelerated calculations. */
                this.mathPipelines = [];
                this._glBufferSegmentBlockCounts = WorldSimulator2D.createArrayBuffer();
                // ----------------------------------------------------------------------------------------------------------------
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
                        this._numberOfInputBuffersOrCores = _numberOfInputBuffersOrCores = 1; // TODO: Detect this perhaps - or better yet, make the system dynamic to adjust for best performance!
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
                    //console.log("CPU-threading mode enabled.");
                    //if (_numberOfInputBuffersOrCores < 1) throw Error("'numberOfInputBuffers' must be >= 1.");
                    //this._numberOfInputBuffersOrCores = _numberOfInputBuffersOrCores = navigator.hardwareConcurrency || 8; // TODO: Detect this perhaps - or better yet, make the system dynamic to adjust for best performance!
                    //this.cpu = new CPU(this, this.estimatedBufferLength, _numberOfInputBuffersOrCores);
                    //this._numberOfInputBuffersOrCores = this.cpu.cores;
                    //console.log("Cores: " + this._numberOfInputBuffersOrCores);
                }
            }
            // ----------------------------------------------------------------------------------------------------------------
            MathProcessor.prototype.registerPipeline = function (mathProgram, piplineIndex) {
                if (mathProgram.constructor == MathProgram)
                    throw Error("Cannot register math program: Invalid type - you must derive from the MathProgram abstract class to create a custom program.");
                if (!(piplineIndex >= 0 && piplineIndex < 32))
                    throw Error("'piplineIndex' must be a value from 0 to 31. You may also wish use a 'MathPipelines.Types' constant instead.");
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
            MathProcessor.prototype.execute = function (unitBlockSize, metersPerBlockSize, worldMass, gravitationalScale, maxGravitationalForce, velocityScale, pixelSize, width, height // global world params
            ) {
                if (this.cpu) {
                    //if (this.cpu.completed) {
                    //    this.cpu.setInputs(this.currentChannelGroup);
                    //    this.changed = false; // TODO: (not used yet; may not need to for threads, since no data copying is performed like with GPU buffers)
                    //    this.cpu.setGlobal("unitBlockSize", unitBlockSize);
                    //    this.cpu.setGlobal("metersPerBlockSize", metersPerBlockSize);
                    //    this.cpu.setGlobal("worldMass", worldMass);
                    //    this.cpu.setGlobal("gravitationalScale", gravitationalScale);
                    //    this.cpu.setGlobal("maxGravitationalForce", maxGravitationalForce);
                    //    this.cpu.setGlobal("velocityScale", velocityScale);
                    //    this.cpu.setGlobal("pixelSize", pixelSize);
                    //    this.cpu.setGlobal("width", width);
                    //    this.cpu.setGlobal("height", height);
                    //    this.cpu.start();
                    //}
                }
                else {
                    //var globals = { unitBlockSize: unitBlockSize, metersPerBlockSize: metersPerBlockSize, worldMass: worldMass, gravitationalScale: gravitationalScale, maxGravitationalForce: maxGravitationalForce, velocityScale: velocityScale, pixelSize: pixelSize, width: width, height: height };
                    // ... preparation: find out the total size of the single array we need to have to copy all the buffers into it (faster to send just one to the GPU) ...
                    var totalLengthRequired = 0;
                    this._glBufferSegmentBlockCounts.count = 0;
                    for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex) {
                        var pipeline = this.mathPipelines[pipelineIndex];
                        this._glBufferSegmentBlockCounts[this._glBufferSegmentBlockCounts.count++] = pipeline.length / pipeline.blockLength;
                        totalLengthRequired += pipeline.length;
                    }
                    if (totalLengthRequired == 0)
                        return; // (nothing to do)
                    if (!this._glBuffer) {
                        this._glBuffer = this.gl.createBuffer().setProperties(this.gl.enums.UsageTypes.DYNAMIC_DRAW);
                        this._glFeedbackBuffer = this.gl.createBuffer().setProperties(this.gl.enums.UsageTypes.DYNAMIC_DRAW);
                    }
                    // ... make sure the target array is large enough ...
                    if (!this._glBuffer.data || totalLengthRequired > this._glBuffer.data.length) {
                        this._glBuffer.setData(new Float32Array(totalLengthRequired));
                        this._glFeedbackBuffer.setData(new Float32Array(totalLengthRequired));
                    }
                    else {
                        this._glBuffer.setData(this._glBuffer.data, totalLengthRequired);
                        this._glFeedbackBuffer.setData(this._glBuffer.data, totalLengthRequired);
                    }
                    // ... now copy all the buffers in order to the single array ...
                    var renderIndex = 0, renderCount;
                    for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex) {
                        var pipeline = this.mathPipelines[pipelineIndex];
                        for (var bufferIndex = 0, lastIndex = pipeline.bufferWriteIndex; bufferIndex <= lastIndex; ++bufferIndex) {
                            var buffer = pipeline.buffers[bufferIndex];
                            if (buffer.count) {
                                this._glBuffer.data.set(buffer.subarray(0, buffer.count), renderIndex);
                                renderIndex += buffer.count;
                            }
                        }
                    }
                    var renderIndex = 0;
                    for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex) {
                        var pipeline = this.mathPipelines[pipelineIndex];
                        var program = pipeline.shader || (pipeline.shader = pipeline.program.getGPUProgram());
                        // ... put all data together in a single array and send one array to reduce overhead ...
                        // if (program.sharedBuffer.data) sub copy else allocate;
                        program.sharedBuffer = this._glBuffer;
                        program.feedbackBuffer = this._glFeedbackBuffer;
                        program.setUniform("unitBlockSize", unitBlockSize, false);
                        program.setUniform("metersPerBlockSize", metersPerBlockSize, false);
                        program.setUniform("worldMass", worldMass, false);
                        program.setUniform("gravitationalScale", gravitationalScale, false);
                        program.setUniform("maxGravitationalForce", maxGravitationalForce, false);
                        program.setUniform("velocityScale", velocityScale, false);
                        program.setUniform("pixelSize", pixelSize, false);
                        program.setUniform("width", width, false);
                        program.setUniform("height", height, false);
                        // ... inputs ready, run shader program and do calculations on the GPU ...
                        renderCount = this._glBufferSegmentBlockCounts[pipelineIndex];
                        this.gl.render(program, this.gl.enums.PrimitiveTypeModes.POINTS, renderIndex, renderCount);
                        renderCount += renderCount;
                    }
                    // ... the transform feedback buffer should now have the results ...
                    this._glFeedbackBuffer.getData();
                }
                ++this.counter;
            };
            // ----------------------------------------------------------------------------------------------------------------
            /**
            * Reset the state of the manager to get ready for a new run.
            */
            MathProcessor.prototype.reset = function () {
                for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex)
                    this.mathPipelines[pipelineIndex].reset();
            };
            return MathProcessor;
        }());
        MathPipelines.MathProcessor = MathProcessor;
    })(MathPipelines = WorldSimulator2D.MathPipelines || (WorldSimulator2D.MathPipelines = {}));
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=mathprocessor.js.map