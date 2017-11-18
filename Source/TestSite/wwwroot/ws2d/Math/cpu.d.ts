declare namespace WorldSimulator2D {
    namespace MathPipelines {
        interface IThreadProgramWorker extends Worker {
            _threadProgram: ThreadProgram;
        }
        interface IThreadProgramInternal {
            active: boolean;
            data: IThreadData;
        }
        interface IThreadData {
            [name: string]: any;
            buffer: Float32Array;
            /** Typically 'buffer.length', but can be less to limit to actual written data when using fixed size buffers. */
            length: number;
            blockLength: number;
            /** An externally given ID to identify the data for callbacks.*/
            id?: number;
            pixelSize?: number;
            width?: number;
            height?: number;
            unitBlockSize?: number;
            metersPerBlockSize?: number;
            worldMass?: number;
            gravitationalScale?: number;
            maxGravitationalForce?: number;
            velocityScale?: number;
        }
        class ThreadProgram implements IThreadProgramInternal {
            readonly cpu: CPU;
            readonly index: number;
            /** The worker that will be called to process a buffer of data. */
            readonly worker: IThreadProgramWorker;
            private _ready;
            private _start;
            /** True if the thread is processing a buffer of data, and false when done. */
            readonly active: boolean;
            readonly data: IThreadData;
            readonly onCompleted: {
                (thread: ThreadProgram, cpu: CPU): void;
            }[];
            /**
             * Construct a new thread program wrapper for processing calculations.
             * @param cpu The owning CPUProcessor instance.
             * @param index The buffer processing sequence number.
             */
            constructor(cpu: CPU, index: number);
            private _doError(this, ev);
            private _doCompleted(this, ev);
            /**
             * Set a buffer to get ready for processing.
             * @param buffer The buffer to set.  No copy is made, and all references will become invalid once processing starts.
             */
            setBuffer(buffer: Float32Array, id?: number, length?: number, blockLength?: number): this;
            start(): this;
            stop(): this;
        }
        /**
         * This is the CPU version of the GPU class that handles threaded processing.
         */
        class CPU {
            readonly mathProcessor: MathProcessor;
            readonly bufferSize: number;
            readonly cores: number;
            readonly threads: ThreadProgram[];
            private _bufferInputCount;
            private _activeThreadsCount;
            /** Triggered when the results are completed. */
            readonly onCompleted: {
                (cpu: CPU, inputCount: number): void;
            }[];
            /** Triggered when the results are completed for a single thread. */
            readonly onThreadCompleted: {
                (thread: ThreadProgram): void;
            }[];
            /** Set to true when there are no more active threads processing data. */
            readonly completed: boolean;
            readonly transferableObjectsSupported: boolean;
            private _transferableObjectsSupported;
            /**
            * Initialize an instance of the GPU processor to handle calculations on the GPU.
            * @param bufferSize The desired length of the data to send per thread. This is rounded up to the nearest 'ThreadBufferOffsets.blockCount' divisible size.
            * The given size is made divisible by 8 in case a system is able to optimize such cases for 64-bit systems.
            * Once created the sizes CANNOT be changed. Simply resize the arrays being sent in and add to a new CPUProcessor instance.
            * @param cores The number of cores detected by the system.   You can pass in a different value to the constructor to override the detected value.
            * The number of workers is useful to a point based on the number of logical processors, so this helps the system to be more efficient.
            */
            constructor(mathProcessor: MathProcessor, bufferSize: number, cores?: number);
            /**
             * Create and return a buffer sized to a single buffer segment size used with calls to 'processInputs()'.
             */
            createBufferSegment(): Float32Array;
            /**
             * Set the inputs for thread processing.
             * Warning: When 'start()' is called, all the data arrays passed in will become invalid until competed.  Hook into
             * the 'onCompleted()' event to safely retrieve the processed data arrays and reset local references.
             *
             * @param segments Either an array of data to be processed, or an array of buffer group items (which supports a custom size per data array).
             */
            setInputs(segments: Float32Array[]): void;
            setGlobal(name: string, value: any): this;
            start(): this;
            private _doThreadCompleted(threadProgram);
        }
    }
}
