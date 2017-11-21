namespace WorldSimulator2D {

    /**
     * The maximum expected objects to be supported (soft limit).
     * This number is used to predict in advance how to split up buffers for processing calculation streams.
     */
    export var MAX_OBJECTS = 10000;
    export var MAX_CALCULATIONS_PER_PIPELINE_BUFFER = 10100;
    export var enablePostMathProcessing = true;
    export var enableCollisions = true;

    /**
     * Types and routines for processing calculations on piped float-based data streams.
     */
    export namespace MathPipelines {

        /** Supported math pipeline types. */
        export enum Types {
            GravityCalculation
        }

        export enum GravityCalculationInputs {
            /** Object requesting the calculation. */
            objectID,
            /** An ID for the requesting object to identify where to apply the response. */
            calcID,
            /** Mass of object 1. */
            m1,
            /** Mass of object 2. */
            m2,
            /** X position of object 1. */
            x1,
            /** Y position of object 1. */
            y1,
            /** X position of object 2. */
            x2,
            /** Y position of object 2. */
            y2,
            /** The current X velocity to be updated. */
            vx,
            /** The current Y velocity to be updated. */
            vy,
            /* (MUST BE AT END - Counts the number of data items [enums] in one data block [one block per object being processed]) */
            blockSize
        }

        export enum GravityCalculationOutputs {
            /** Object requesting the calculation. */
            objectID,
            /** An ID for the requesting object to identify where to apply the response. */
            calcID,
            /** The distance between the two points. */
            d,
            /** The force of attraction.*/
            f,
            /** The force in the X direction. */
            fx,
            /** The force in the Y direction. */
            fy,
            /** The velocity X step due to the force and velocity scale. */
            vstepx,
            /** The velocity Y step due to the force and velocity scale. */
            vstepy,
            /** The new X velocity. */
            vx,
            /** The new Y velocity. */
            vy,
        }

        export enum CollisionCalculationInputs {
            /** Object requesting the calculation. */
            objectID,
            /** An ID for the requesting object to identify where to apply the response. */
            calcID,
            /** Mass of object 1. */
            m1,
            /** Mass of object 2. */
            m2,
            /** X velocity of object 1. */
            vx1,
            /** Y velocity of object 1. */
            vy1,
            /** X velocity of object 2. */
            vx2,
            /** Y velocity of object 2. */
            vy2,
            /* (MUST BE AT END - Counts the number of data items [enums] in one data block [one block per object being processed]) */
            blockSize
        }

        // TODO: Make math processor more generic, instead of enums above (registered data pointers, like webgl perhaps).

        export interface IMathPipelineInternal {
            bufferWriteIndex: number;
            blockLength: number;
            stride: number;
        }

        export class MathPipeline implements IMathPipelineInternal {
            /** One or more float buffer arrays to write math arguments to.
            * The 'count' property on the buffers is the amount of data to process for each buffer. The count should be
            * equal to the length (capacity) for all buffers leading up to the last buffer.
            * Note: For the GPU, all buffers become flattened into a single array to both send and read from one GPU buffer.
            */
            readonly buffers: IFloat32ArrayBuffer[];
            /** The math program to run for the associated buffer arrays. */
            readonly program: MathProgram;
            /** For GPU acceleration, this is the built shader program cached here for quick reuse. */
            shader: GL.ShaderProgram;
            /** The current buffer being written to. */
            readonly bufferWriteIndex = 0;
            /** The required length to store all buffer data for this pipeline.  The total of all buffer counts are added together and returned (each float entry is one count). */
            get length(): number {
                var count = 0;
                for (var bufferIndex = 0, lastIndex = this.bufferWriteIndex; bufferIndex <= lastIndex; ++bufferIndex)
                    count += this.buffers[bufferIndex].count;
                return count;
            }
            /** The number of items (floats) in a block of data. */
            get blockLength() { return this.program && this.program.blockLength; }
            /** The size of a block of object data in the buffer (in bytes). Read indexes should always increment by this value. */
            get stride() { return this.program && this.program.stride; }
            /** This must be set to true in order to update buffers on the target system (usually GPU, to prevent having to upload it over and over). */
            changed: boolean;

            constructor(public readonly processor: MathProcessor, program: MathProgram) {
                if (!program) throw Error("'program' is required.");
                this.program = program;
                if (!this.blockLength) throw Error("");
                this.buffers = [createFloat32ArrayBuffer(processor.maxCalculationsPerBuffer * this.blockLength)];
            }

            /**
             * Go to the next buffer to get ready to store more values for calculations.
             */
            nextBuffer(): void {
                var internals = <IMathPipelineInternal>this;
                var b = this.buffers[internals.bufferWriteIndex++], i = this.bufferWriteIndex;
                b.count = b.length;
                var b = this.buffers[i];
                if (!b) this.buffers[i] = b = createFloat32ArrayBuffer(this.processor.maxCalculationsPerBuffer * this.program.blockLength);
            }

            /**
             * Reset the math pipeline for calculation math run.
             */
            reset() {
                for (var i = 0, i2 = this.bufferWriteIndex; i <= i2; ++i)
                    this.buffers[i].count = 0;
                (<{ bufferWriteIndex: number }>this).bufferWriteIndex = 0;
            }
        }

        export interface IMathPipelines extends Array<MathPipeline> { }

        export enum ProcessorTypes { CPU, GPU }

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
        export abstract class MathProgram {
            /** The variables to be used in both the GPU and CPU math programs. These become 'attributes' in the shader program.
            * For example, for distance calculations, the input variables might be 'x1', 'y1', 'x2', 'y2'.
            * These values change from block to block.
            */
            static readonly inputs: string[];

            /** The variables to be used in both the GPU and CPU math programs. These become 'varyings' in the shader program for the feedback buffer.
            * For example, for distance calculations, the output varying might be 'd' for distance.
            * These values change from block to block.
            */
            static readonly outputs: string[];

            /** Global values to be used in both the GPU and CPU math programs. These become 'uniforms' in the shader program.
            * For example, 'worldMass', 'windVectorX', 'windVectorY', 'worldTempurature', etc.
            * These values stay the same from block to block.
            */
            static readonly globals: string[];

            /** A prefix to add to the input variables when generating the shader code (such as 'a_' for attribute [the default]). */
            static readonly inVariablePrefix = "a_";

            /** A prefix to add to the output variables when generating the shader code (such as 'v_' for varying [the default]). */
            static readonly outVariablePrefix = "v_";

            /** Configuration for this math program. */
            readonly config: typeof MathProgram;

            /** Block size in floats for each calculation entry. */
            readonly blockLength: number;

            /** Block size in bytes for each calculation entry. */
            readonly stride: number;

            /**
             * Gets name values from an enum object in ascending numerical value order and returns the names as an array of strings.
             * The 'blockSize' key word is excluded from this list.
             * @param enumRef A reference to the enum object.
             */
            static getEnumNames(enumRef: {}) { return WS2D.getEnumNames(enumRef, "blockSize"); }

            constructor(public readonly processor: MathProcessor) {
                var config = this.config = this.constructor as typeof MathProgram;
                this.blockLength = config.inputs && config.inputs.length || 0;
                this.stride = this.blockLength * 4;
            }

            buildShaderProgram(mathCode: string): GL.ShaderProgram {
                if (!mathCode) throw Error("MathProgram: buildShaderProgram(): 'mathCode' is required.");
                if (!this.processor.gl || !this.processor.gl.webgl2)
                    throw Error("MathProgram: buildShaderProgram(): WebGL 2 not supported.");


                var staticType = <typeof MathProgram>this.constructor;
                var inputs: string[] = staticType.inputs;
                var outputs: string[] = staticType.outputs;
                var globals: string[] = staticType.globals;
                var inPrefix: string = staticType.inVariablePrefix;
                var outPrefix: string = staticType.outVariablePrefix;
                var varyings: string[] = [];

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
                    "+ mathCode + "\n\
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

                var program = gl.createShader().disableRasterizer()
                    .setVertexCode(vertexCode).setFragmentCode(fragmentCode)
                    .build(false, gl.enums.FeedbackModes.INTERLEAVED_ATTRIBS, ...varyings);

                if (inputs)
                    for (var i = 0, n = inputs.length; i < n; ++i) {
                        var a = program.attribute(inPrefix + inputs[i]);
                        if (a) a.definePointer(1, false, i * 4, this.blockLength * 4);
                    }

                return program;
            }

            buildJSProgram(jsCode: string): Function {
                throw Error("Not implemented yet.");
            }

            /** Returns the shader program to use for calculations. If not specified then 'getGLSLMainCode()' must be implemented. */
            getGPUProgram(): GL.ShaderProgram {
                var code = this.getGLSLMainCode && this.getGLSLMainCode() || void 0;
                if (!code) throw Error("'getGLSLMainCode()' resulted in empty/undefined code for math program '" + getTypeName(this) + "'.");
                return this.buildShaderProgram(code);
            }

            /** Returns the JS function to use for calculations.  This function is injected into a thread for this operation.
            * If not specified then 'getGLSLMainCode()' must be implemented.
            */
            getCPUProgram(): Function {
                var code = this.getJSMainCode && this.getJSMainCode() || void 0;
                if (!code) throw Error("'getJSMainCode()' resulted in empty/undefined code for math program '" + getTypeName(this) + "'.");
                return this.buildJSProgram(code);
            }

            /** Returns the shader program main code to use for calculations. If not specified then 'getGPUProgram()' must be implemented. */
            abstract getGLSLMainCode(): string;

            /** Returns the JavaScript program main code to use for calculations. If not specified then 'getCPUProgram()' must be implemented. */
            abstract getJSMainCode(): string;
        }

        /**
         * Calculates force of attraction between two points.
         */
        export class GravityMathProgram extends MathProgram {
            static readonly inputs = getEnumNames(GravityCalculationInputs, "blockSize");
            static readonly outputs = getEnumNames(GravityCalculationOutputs);
            static readonly globals = ["unitBlockSize", "metersPerBlockSize", "gravitationalScale", "maxGravitationalForce", "velocityScale"];
            constructor(processor: MathProcessor) { super(processor); }
            getGLSLMainCode() {
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
            }

            getJSMainCode(): string {
                return "";
            }
        }

        /**
        * A processor for running calculations that are either GPU or CPU-thread accelerated.
        * If the GPU is not supported, the instance will fall-back to running routines within the normal CPU using worker threads instead.
        * In the world simulator there may be both modes used: CPU for more complex data where responses are needed back more quickly, and
        * GPU for period math intensive calculations (such as calculating gravity between a list of objects with a list of planetary objects).
        */
        export class MathProcessor {
            /** Multiple registered math pipelines for streaming arguments for accelerated calculations. */
            readonly mathPipelines: IMathPipelines = [];

            readonly gl: WebGL;
            readonly cpu: CPU;

            readonly _glBuffer: GL.Buffer;
            readonly _glBufferSegmentBlockCounts = createArrayBuffer();
            readonly _glFeedbackBuffer: GL.Buffer;

            /**
             * Creates a new buffer manager.
             * @param maxObjects The buffers must have a fixed number of entries (one per object).
             * If there are more objects than the max, then batched processing is required (or use the CPU for the rest in case of buffer transfer overhead).
             * @param numberOfInputBuffers The number of data buffers to send to the GPU. There are 4 streams of float data per buffer (each is a vec4).
             * @param gl The WebGL wrapper to use for the math calculations.  If undefined, one will be created.
             */
            constructor(owner: object, processorType?: ProcessorTypes.GPU, maxObjects?: number, numberOfInputBuffers?: number, gl?: WebGL);
            /**
             * Creates a new buffer manager.
             * @param maxObjects The buffers must have a fixed number of entries (one per object).
             * If there are more objects than the max, then batched processing is required (or use the CPU for the rest in case of buffer transfer overhead).
             * @param numberOfCores For CPU processing, this is the number of cores instead (if undefined, it uses 'navigator.hardwareConcurrency', or defaults to 4 if not available).
             * @param cpu The CPU Web Worker based wrapper to use for the math calculations.  If undefined, one will be created.
             */
            constructor(owner: object, processorType?: ProcessorTypes.CPU, maxObjects?: number, numberOfCores?: number, cpu?: CPU);
            constructor(public readonly owner: object, public readonly processorType: ProcessorTypes, public readonly maxCalculationsPerBuffer = MAX_CALCULATIONS_PER_PIPELINE_BUFFER, private _numberOfInputBuffersOrCores?: number, glOrCPU?: WebGL | CPU) {
                if (processorType < 0 || processorType > 1) throw Error("'processorType' is not valid.");
                if (maxCalculationsPerBuffer < 1) throw Error("'maxCalculationsPerBuffer' must be >= 1.");

                if (processorType == ProcessorTypes.GPU) {
                    console.log("GPU mode requested ...");
                    if (_numberOfInputBuffersOrCores < 1) throw Error("'numberOfCores' must be >= 1.");
                    if (!_numberOfInputBuffersOrCores) this._numberOfInputBuffersOrCores = _numberOfInputBuffersOrCores = 1; // TODO: Detect this perhaps - or better yet, make the system dynamic to adjust for best performance!

                    var gl = <WebGL>glOrCPU;
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

            registerPipeline<T extends typeof MathProgram>(mathProgram: T, piplineIndex: Types): this {
                if (mathProgram.constructor == MathProgram) throw Error("Cannot register math program: Invalid type - you must derive from the MathProgram abstract class to create a custom program.");
                if (!(piplineIndex >= 0 && piplineIndex < 32)) throw Error("'piplineIndex' must be a value from 0 to 31. You may also wish use a 'MathPipelines.Types' constant instead.");
                var pl = this.mathPipelines[piplineIndex];
                if (pl)
                    if (pl.constructor == mathProgram)
                        return this;
                    else
                        throw Error("Cannot register math program: there is already a different program registered at this index.");

                var program: MathProgram = new (<any>mathProgram)(this);

                var pipeline = this.mathPipelines[piplineIndex] = new MathPipeline(this, program);

                return this;
            }

            // ----------------------------------------------------------------------------------------------------------------

            counter = 0;

            execute(
                unitBlockSize: number, metersPerBlockSize: number, worldMass: number, gravitationalScale: number, maxGravitationalForce: number, velocityScale: number, pixelSize: number, width: number, height: number // global world params
            ): void {
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

                } else {
                    //var globals = { unitBlockSize: unitBlockSize, metersPerBlockSize: metersPerBlockSize, worldMass: worldMass, gravitationalScale: gravitationalScale, maxGravitationalForce: maxGravitationalForce, velocityScale: velocityScale, pixelSize: pixelSize, width: width, height: height };

                    // ... preparation: find out the total size of the single array we need to have to copy all the buffers into it (faster to send just one to the GPU) ...

                    var totalLengthRequired = 0;

                    this._glBufferSegmentBlockCounts.count = 0;

                    for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex) {
                        var pipeline = this.mathPipelines[pipelineIndex];
                        this._glBufferSegmentBlockCounts[this._glBufferSegmentBlockCounts.count++] = pipeline.length / pipeline.blockLength;
                        totalLengthRequired += pipeline.length;
                    }

                    if (totalLengthRequired == 0) return; // (nothing to do)

                    if (!this._glBuffer) {
                        (<{ _glBuffer: GL.Buffer }>this)._glBuffer = this.gl.createBuffer().setProperties(this.gl.enums.UsageTypes.DYNAMIC_DRAW);
                        (<{ _glFeedbackBuffer: GL.Buffer }>this)._glFeedbackBuffer = this.gl.createBuffer().setProperties(this.gl.enums.UsageTypes.DYNAMIC_DRAW);
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
                                (<Float32Array>this._glBuffer.data).set(buffer.subarray(0, buffer.count), renderIndex);
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
                        program.feedbackBuffer = this._glFeedbackBuffer

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
            }

            // ----------------------------------------------------------------------------------------------------------------

            /**
            * Reset the state of the manager to get ready for a new run.
            */
            reset(): void {
                for (var pipelineIndex = 0, pipelineCount = this.mathPipelines.length; pipelineIndex < pipelineCount; ++pipelineIndex)
                    this.mathPipelines[pipelineIndex].reset();
            }
        }
    }
}
