declare namespace WorldSimulator2D {
    /**
     * The maximum expected objects to be supported (soft limit).
     * This number is used to predict in advance how to split up buffers for processing calculation streams.
     */
    var MAX_OBJECTS: number;
    var MAX_CALCULATIONS_PER_PIPELINE_BUFFER: number;
    var enablePostMathProcessing: boolean;
    var enableCollisions: boolean;
    /**
     * Types and routines for processing calculations on piped float-based data streams.
     */
    namespace MathPipelines {
        /** Supported math pipeline types. */
        enum Types {
            GravityCalculation = 0,
        }
        enum GravityCalculationInputs {
            /** Object requesting the calculation. */
            objectID = 0,
            /** An ID for the requesting object to identify where to apply the response. */
            calcID = 1,
            /** Mass of object 1. */
            m1 = 2,
            /** Mass of object 2. */
            m2 = 3,
            /** X position of object 1. */
            x1 = 4,
            /** Y position of object 1. */
            y1 = 5,
            /** X position of object 2. */
            x2 = 6,
            /** Y position of object 2. */
            y2 = 7,
            /** The current X velocity to be updated. */
            vx = 8,
            /** The current Y velocity to be updated. */
            vy = 9,
            blockSize = 10,
        }
        enum GravityCalculationOutputs {
            /** Object requesting the calculation. */
            objectID = 0,
            /** An ID for the requesting object to identify where to apply the response. */
            calcID = 1,
            /** The distance between the two points. */
            d = 2,
            /** The force of attraction.*/
            f = 3,
            /** The force in the X direction. */
            fx = 4,
            /** The force in the Y direction. */
            fy = 5,
            /** The velocity X step due to the force and velocity scale. */
            vstepx = 6,
            /** The velocity Y step due to the force and velocity scale. */
            vstepy = 7,
            /** The new X velocity. */
            vx = 8,
            /** The new Y velocity. */
            vy = 9,
        }
        enum CollisionCalculationInputs {
            /** Object requesting the calculation. */
            objectID = 0,
            /** An ID for the requesting object to identify where to apply the response. */
            calcID = 1,
            /** Mass of object 1. */
            m1 = 2,
            /** Mass of object 2. */
            m2 = 3,
            /** X velocity of object 1. */
            vx1 = 4,
            /** Y velocity of object 1. */
            vy1 = 5,
            /** X velocity of object 2. */
            vx2 = 6,
            /** Y velocity of object 2. */
            vy2 = 7,
            blockSize = 8,
        }
        interface IMathPipelineInternal {
            bufferWriteIndex: number;
            blockLength: number;
            stride: number;
        }
        class MathPipeline implements IMathPipelineInternal {
            readonly processor: MathProcessor;
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
            readonly bufferWriteIndex: number;
            /** The required length to store all buffer data for this pipeline.  The total of all buffer counts are added together and returned (each float entry is one count). */
            readonly length: number;
            /** The number of items (floats) in a block of data. */
            readonly blockLength: number;
            /** The size of a block of object data in the buffer (in bytes). Read indexes should always increment by this value. */
            readonly stride: number;
            /** This must be set to true in order to update buffers on the target system (usually GPU, to prevent having to upload it over and over). */
            changed: boolean;
            constructor(processor: MathProcessor, program: MathProgram);
            /**
             * Go to the next buffer to get ready to store more values for calculations.
             */
            nextBuffer(): void;
            /**
             * Reset the math pipeline for calculation math run.
             */
            reset(): void;
        }
        interface IMathPipelines extends Array<MathPipeline> {
        }
        enum ProcessorTypes {
            CPU = 0,
            GPU = 1,
        }
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
        abstract class MathProgram {
            readonly processor: MathProcessor;
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
            static readonly inVariablePrefix: string;
            /** A prefix to add to the output variables when generating the shader code (such as 'v_' for varying [the default]). */
            static readonly outVariablePrefix: string;
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
            static getEnumNames(enumRef: {}): string[];
            constructor(processor: MathProcessor);
            buildShaderProgram(mathCode: string): GL.ShaderProgram;
            buildJSProgram(jsCode: string): Function;
            /** Returns the shader program to use for calculations. If not specified then 'getGLSLMainCode()' must be implemented. */
            getGPUProgram(): GL.ShaderProgram;
            /** Returns the JS function to use for calculations.  This function is injected into a thread for this operation.
            * If not specified then 'getGLSLMainCode()' must be implemented.
            */
            getCPUProgram(): Function;
            /** Returns the shader program main code to use for calculations. If not specified then 'getGPUProgram()' must be implemented. */
            abstract getGLSLMainCode(): string;
            /** Returns the JavaScript program main code to use for calculations. If not specified then 'getCPUProgram()' must be implemented. */
            abstract getJSMainCode(): string;
        }
        /**
         * Calculates force of attraction between two points.
         */
        class GravityMathProgram extends MathProgram {
            static readonly inputs: string[];
            static readonly outputs: string[];
            static readonly globals: string[];
            constructor(processor: MathProcessor);
            getGLSLMainCode(): string;
            getJSMainCode(): string;
        }
        /**
        * A processor for running calculations that are either GPU or CPU-thread accelerated.
        * If the GPU is not supported, the instance will fall-back to running routines within the normal CPU using worker threads instead.
        * In the world simulator there may be both modes used: CPU for more complex data where responses are needed back more quickly, and
        * GPU for period math intensive calculations (such as calculating gravity between a list of objects with a list of planetary objects).
        */
        class MathProcessor {
            readonly owner: object;
            readonly processorType: ProcessorTypes;
            readonly maxCalculationsPerBuffer: number;
            private _numberOfInputBuffersOrCores;
            /** Multiple registered math pipelines for streaming arguments for accelerated calculations. */
            readonly mathPipelines: IMathPipelines;
            readonly gl: WebGL;
            readonly cpu: CPU;
            readonly _glBuffer: GL.Buffer;
            readonly _glBufferSegmentBlockCounts: IArrayBuffer<number>;
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
            registerPipeline<T extends typeof MathProgram>(mathProgram: T, piplineIndex: Types): this;
            counter: number;
            execute(unitBlockSize: number, metersPerBlockSize: number, worldMass: number, gravitationalScale: number, maxGravitationalForce: number, velocityScale: number, pixelSize: number, width: number, height: number): void;
            /**
            * Reset the state of the manager to get ready for a new run.
            */
            reset(): void;
        }
    }
}
