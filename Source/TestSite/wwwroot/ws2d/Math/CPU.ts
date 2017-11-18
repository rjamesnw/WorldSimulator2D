namespace WorldSimulator2D {
    export namespace MathPipelines {

        export interface IThreadProgramWorker extends Worker {
            _threadProgram: ThreadProgram;
        }

        export interface IThreadProgramInternal {
            active: boolean;
            data: IThreadData;
        }

        export interface IThreadData {
            [name: string]: any;
            buffer: Float32Array;
            /** Typically 'buffer.length', but can be less to limit to actual written data when using fixed size buffers. */
            length: number;
            blockLength: number;
            /** An externally given ID to identify the data for callbacks.*/
            id?: number;
            // (Globals)
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

        export class ThreadProgram implements IThreadProgramInternal {
            /** The worker that will be called to process a buffer of data. */
            readonly worker: IThreadProgramWorker;

            private _ready = false; // (true when the thread is ready to be used)
            private _start = false; // (true when 'start()' is called, and false upon completion; this is used to detect if 'start()' was called before the worker was ready)

            /** True if the thread is processing a buffer of data, and false when done. */
            readonly active = false;

            readonly data: IThreadData = { buffer: null, length: 0, blockLength: 1 };

            readonly onCompleted: { (thread: ThreadProgram, cpu: CPU): void }[] = [];

            /**
             * Construct a new thread program wrapper for processing calculations.
             * @param cpu The owning CPUProcessor instance.
             * @param index The buffer processing sequence number.
             */
            constructor(public readonly cpu: CPU, public readonly index: number) {
                this.worker = <any>_createWebWorkerProcessor();
                this.worker._threadProgram = this;
                this.worker.onmessage = this._doCompleted;
                this.worker.onerror = this._doError
            }

            private _doError(this: IThreadProgramWorker, ev: ErrorEvent): void {
                debugger;
                var threadProgram = this._threadProgram, cpu = threadProgram.cpu;
                throw Error("Error processing thread program " + threadProgram.index + ": " + ev.message);
            }

            private _doCompleted(this: IThreadProgramWorker, ev: MessageEvent): void {
                var threadProgram = this._threadProgram, cpu = threadProgram.cpu;

                if (ev.data === true) {
                    threadProgram._ready = true;
                    console.log("Thread program " + threadProgram.index + " is ready.");
                    if (threadProgram._start) {
                        console.log("A start request is pending for thread program " + threadProgram.index + ", running it now.");
                        threadProgram.start(); // ('start()' was called, but the thread was not ready, so run it now)
                    }
                } else {
                    (<IThreadProgramInternal>threadProgram).active = false;

                    threadProgram.data.buffer = ev.data.buffer;

                    if (threadProgram.onCompleted.length)
                        for (var i = 0, n = threadProgram.onCompleted.length; i < n; ++i)
                            threadProgram.onCompleted[i](threadProgram, cpu);

                    cpu['_doThreadCompleted'](threadProgram);
                }
            }

            /**
             * Set a buffer to get ready for processing.
             * @param buffer The buffer to set.  No copy is made, and all references will become invalid once processing starts.
             */
            setBuffer(buffer: Float32Array, id?: number, length?: number, blockLength?: number): this {
                this.data.buffer = buffer;
                this.data.length = buffer.length || this.data.buffer.length;
                this.data.id = id;
                this.data.blockLength = blockLength;
                return this;
            }

            start(): this {
                if (!this.data.buffer && !this._start) throw Error("A buffer is required first.  Please call 'setBuffer()'.");

                if (this._ready && !this.active) {
                    this._start = false;
                    (<IThreadProgramInternal>this).active = true;

                    if (this.data.buffer.buffer)
                        this.worker.postMessage(this.data, [this.data.buffer.buffer]);
                    else
                        this.worker.postMessage(this.data);

                    this.cpu['_transferableObjectsSupported'] = !this.data.buffer.byteLength;
                    this.data.buffer = null; // (nullify until we get a response)
                }
                else if (!this._ready) {
                    this._start = true;
                    console.log("Start requested for thread program " + this.index + ", but the worker is not ready yet; waiting...");
                }

                return this;
            }

            stop(): this {
                if (this.active) {
                    this.worker.terminate();
                    (<IThreadProgramInternal>this).active = false;
                }
                return this;
            }
        }

        /**
         * This is the CPU version of the GPU class that handles threaded processing.
         */
        export class CPU {

            readonly threads: ThreadProgram[] = [];
            private _bufferInputCount: number; // (total being used for a single call to 'processInputs()')
            private _activeThreadsCount: number; // (total threads still processing input buffers)

            /** Triggered when the results are completed. */
            readonly onCompleted: { (cpu: CPU, inputCount: number): void }[] = [];

            /** Triggered when the results are completed for a single thread. */
            readonly onThreadCompleted: { (thread: ThreadProgram): void }[] = [];

            /** Set to true when there are no more active threads processing data. */
            get completed() { return !this._activeThreadsCount; }

            get transferableObjectsSupported() { return !!this._transferableObjectsSupported; }
            private _transferableObjectsSupported: boolean;

            /**
            * Initialize an instance of the GPU processor to handle calculations on the GPU.
            * @param bufferSize The desired length of the data to send per thread. This is rounded up to the nearest 'ThreadBufferOffsets.blockCount' divisible size.
            * The given size is made divisible by 8 in case a system is able to optimize such cases for 64-bit systems.
            * Once created the sizes CANNOT be changed. Simply resize the arrays being sent in and add to a new CPUProcessor instance.
            * @param cores The number of cores detected by the system.   You can pass in a different value to the constructor to override the detected value.
            * The number of workers is useful to a point based on the number of logical processors, so this helps the system to be more efficient.
            */
            //* @param maxInputBuffers The maximum number of buffers before queuing requests, where each buffer is processed by a single thread.Typically data
            //    * is arrayed in multiple buffers as "segments" to be calculated, and each segment is passed to a different thread for processing.
            //* If too many buffers need processing,
            // (, public readonly maxInputBuffers = 1)
            constructor(public readonly mathProcessor: MathProcessor, public readonly bufferSize: number, public readonly cores = navigator.hardwareConcurrency || 4) {
                if (bufferSize < GravityCalculationInputs.blockSize)
                    bufferSize = GravityCalculationInputs.blockSize;
                var size = Math.ceil(bufferSize / 2) * 2; // (make divisible by 8 in case it helps with some 64-bit memory-copy instructions [2 * 4 bytes/float])
                if (size > bufferSize)
                    this.bufferSize = size;
                console.log("CPUProcessor created - optimal buffer size set to " + this.bufferSize + " (floats).");
            }

            /**
             * Create and return a buffer sized to a single buffer segment size used with calls to 'processInputs()'.
             */
            createBufferSegment(): Float32Array {
                return new Float32Array(this.bufferSize);
            }

            /**
             * Set the inputs for thread processing.
             * Warning: When 'start()' is called, all the data arrays passed in will become invalid until competed.  Hook into
             * the 'onCompleted()' event to safely retrieve the processed data arrays and reset local references.
             * 
             * @param segments Either an array of data to be processed, or an array of buffer group items (which supports a custom size per data array).
             */
            setInputs(segments: Float32Array[]): void {
                if (!segments) throw Error("A buffer array was expected.");

                // ... if a previous call is still in progress, terminate it ...

                if (this._bufferInputCount) {
                    for (var i = 0, n = this._bufferInputCount; i < n; ++i)
                        this.threads[i].stop();
                }

                this._bufferInputCount = 0;
                this._activeThreadsCount = 0;

                // ... expand thread program count to handle any increased number of buffers ...

                var lengthDiff = segments.length - this.threads.length;
                if (lengthDiff > 0)
                    while (lengthDiff--)
                        this.threads.push(new ThreadProgram(this, this.threads.length));

                for (var i = 0, n = segments.length, ti = 0; i < n; ++i) {
                    var buffer = segments[i];
                    if (!buffer.length) continue; // (there's nothing to do for this buffer)
                    this.threads[ti++].setBuffer(buffer, i);
                    ++this._bufferInputCount;
                    ++this._activeThreadsCount;
                }
            }

            setGlobal(name: string, value: any): this {
                if (!this._bufferInputCount)
                    throw Error("You must call 'setInputs()' first before setting globals. This prevents having to set globals for threads that won't be used.");

                for (var i = 0, n = this._bufferInputCount; i < n; ++i) {
                    var thread = this.threads[i];
                    if (thread.active)
                        throw Error("You cannot set globals for a thread that is currently active.");
                    thread.data[name] = value;
                }

                return this;
            }

            start(): this {
                if (!this._bufferInputCount)
                    throw Error("You must call 'setInputs()' first before starting the process.");

                for (var i = 0, n = this._bufferInputCount; i < n; ++i) {
                    var thread = this.threads[i];
                    if (!thread.active)
                        thread.start();
                }

                return this;
            }

            private _doThreadCompleted(threadProgram: ThreadProgram): void {
                --this._activeThreadsCount; // (when this is 0, all threads are completed)

                if (this.onThreadCompleted.length)
                    for (var i = 0, n = this.onThreadCompleted.length; i < n; ++i)
                        this.onThreadCompleted[i](threadProgram);

                if (!this._activeThreadsCount) {
                    var inputCount = this._bufferInputCount;
                    this._bufferInputCount = 0; // (do this first in case 'processInputs()' is called again)
                    // ... all threads completed ...
                    if (this.onCompleted.length)
                        for (var i = 0, n = this.onCompleted.length; i < n; ++i)
                            this.onCompleted[i](this, inputCount);
                }
            }
        }

        /**
           * Creates a worker for processing a single data buffer matrix.
           * It is used by 'KernalBufferManager' to process
           */
        function _createWebWorkerProcessor() {
            // Build a worker from an anonymous function body
            var blobURL = URL.createObjectURL(new Blob(['(',

                function (this: typeof WebWorkerScope, self: typeof WebWorkerScope) { // Dedicated WebWorker Global Scope: https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope
                    // TODO: Share the 'WebWorkerScope' solution on SO. ;)

                    self.console.log("Hooking up worker 'onmessage'...");

                    enum DataBufferOffsets {
                        type, // (1 = spatial [don't calculate physics], 2 = physics + spacial)
                        id,
                        x,
                        y,
                        gridX,
                        gridY,
                        velocityX,
                        velocityY,
                        stepVelocityX,
                        stepVelocityY,
                        mass
                    }

                    self.onerror = (ev) => { throw Error(ev.message); }
                    self.onmessage = (ev) => {
                        var data = <IThreadData>ev.data, buffer = data.buffer;
                        //debugger;

                        // ... do calculations, etc ...

                        var pixelSize = data.pixelSize;
                        var width = data.width;
                        var height = data.height;
                        var unitBlockSize = data.unitBlockSize;
                        var metersPerBlockSize = data.metersPerBlockSize;
                        var worldMass = data.worldMass;
                        var gravitationalScale = data.gravitationalScale;
                        var maxGravitationalForce = data.maxGravitationalForce;
                        var velocityScale = data.velocityScale;

                        for (var i = 0, n = data.length; i < n; i += data.blockLength) {
                            // (Object Data)

                            var type = buffer[i + DataBufferOffsets.type]; // (1 = spatial object, 2 = physics object)
                            var id = buffer[i + DataBufferOffsets.id]; // (1 = spatial object, 2 = physics object)

                            var x = buffer[i + DataBufferOffsets.x];
                            var y = buffer[i + DataBufferOffsets.y];

                            var unmovable = 0; //buffer[i+ThreadBufferOffsets.unmovable];
                            var mass = buffer[i + DataBufferOffsets.mass];
                            var netForceX = 0; //buffer[i+ThreadBufferOffsets.netForceX];
                            var netForceY = 0; //buffer[i+ThreadBufferOffsets.netForceY];
                            var velocityX = buffer[i + DataBufferOffsets.velocityX];
                            var velocityY = buffer[i + DataBufferOffsets.velocityY];
                            var momentumX = 0; //buffer[i+ThreadBufferOffsets.momentumX];
                            var momentumY = 0; //buffer[i+ThreadBufferOffsets.momentumY];
                            var nx: number, ny: number, f: number, stepvx = 0, stepvy = 0;

                            if (type == 2) {

                                if (unmovable == 0) {

                                    // (Note: when 'this.unmovable' is true, other objects can still update the forces; the object just won't move due to it.)

                                    // ... get world force on this object based on distance from world center ...

                                    var fx, fy, d = Math.sqrt(x * x + y * y) / unitBlockSize * metersPerBlockSize / 2; // (make sure it's in meters: d in world particles / particles per 1.75 meters * 1.75 to get the meters)
                                    if (d != 0) {
                                        nx = x / d;
                                        ny = y / d; // (get normals for the offset between objects)
                                        f = (6.67408e-11 * mass * worldMass) / (d * d) / gravitationalScale; // (constant 6.67e-11 scaled to 6.67e-6 because mass is also scaled by half the exponent)
                                        if (f > maxGravitationalForce) f = maxGravitationalForce;
                                        fx = nx * f;
                                        fy = ny * f;
                                    } else {
                                        nx = 0;
                                        ny = 0;
                                        f = 0; // (get normals for the offset between objects)
                                        fx = 0;
                                        fy = 0;
                                    }

                                    //?netForceX += fx; // (scale the force down so the updates can be called many times per render frame)
                                    //?netForceY += fy; // (scale the force down so the updates can be called many times per render frame)

                                    // ... get the velocity of this object ...

                                    stepvx = (velocityX -= fx) / velocityScale;
                                    stepvy = (velocityY -= fy) / velocityScale;
                                    //var vx = this.velocity.x; 
                                    //var vy = this.velocity.y;

                                    // ... make sure the velocity cannot "skip" grid locations ...
                                    // (Each particle exists in a grid location, but high velocities can skip grid locations causing missed interactions.
                                    //  For this reason the velocity MUST be clamped a max of 1 grid jump only. To have particles seem to "skip" ahead,
                                    //  the 'update()' process can be called many times to more rapidly speed up the movement process [physics time])

                                    if (stepvx <= -pixelSize) stepvx = -pixelSize;
                                    else if (stepvx >= pixelSize) stepvx = pixelSize;
                                    if (stepvy <= -pixelSize) stepvy = -pixelSize;
                                    else if (stepvy >= pixelSize) stepvy = pixelSize;

                                    x += stepvx;
                                    y += stepvy;

                                    // ... also calculate the force of momentum based on the mass and this velocity ...

                                    //momentumX = mass * stepvx;
                                    //momentumY = mass * stepvy;

                                    //        // ... normalize vectors ...

                                    //        //state.netForce.updateNormals();
                                    //        //state.velocity.updateNormals();
                                    //        //state.stepVelocity.updateNormals();
                                    //        //state.momentum.updateNormals();
                                }
                            }

                            // (Object Data)

                            var gridX = buffer[i + DataBufferOffsets.gridX];
                            var gridY = buffer[i + DataBufferOffsets.gridY];

                            // ... update movement stats ...

                            var halfParticleSize = pixelSize / 2;
                            if (halfParticleSize < 1) halfParticleSize = 0; // (ignore this at the 1x1 pixel level)

                            // ... get grid stats also for this object if we are not the layer object itself, which owns the grid! ...

                            var gx = x / pixelSize; //? (perhaps use '0.00000000001' to fix float-point math issues [such as 2.3*100])
                            // (when negative x and y are divided and floored the negative can be 0 for the right array instead of the left so this corrects it)
                            if (gx >= 0) gx = (gx) | 0; else gx = Math.ceil(gx) - 1;
                            //var gridXDiff = gx - gridX; // (gridX was the previous value, gx is the new one)
                            //var gridDirX = (<any>(gridXDiff > 0) - <any>(gridXDiff < 0));

                            var gy = y / pixelSize; //? (perhaps use '0.00000000001' to fix float-point math issues [such as 2.3*100])
                            if (gy >= 0) gy = (gy) | 0; else gy = Math.ceil(gy) - 1;
                            //var gridYDiff = gy - gridY; // (gridY was the previous value, gy is the new one)
                            //var gridDirY = (<any>(gridYDiff > 0) - <any>(gridYDiff < 0));

                            //var gridMoved: number;
                            //if (gridXDiff != 0 || gridYDiff != 0) gridMoved = 1; else gridMoved = 0;
                            //if (outIndex == 16) return gridMoved;

                            buffer[i + DataBufferOffsets.x] = x;
                            buffer[i + DataBufferOffsets.y] = y;
                            buffer[i + DataBufferOffsets.gridX] = gx;
                            buffer[i + DataBufferOffsets.gridY] = gy;
                            buffer[i + DataBufferOffsets.velocityX] = velocityX;
                            buffer[i + DataBufferOffsets.velocityY] = velocityY;
                            buffer[i + DataBufferOffsets.stepVelocityX] = stepvx;
                            buffer[i + DataBufferOffsets.stepVelocityY] = stepvy;
                        }

                        self.postMessage(data, [buffer.buffer]);
                    };

                    self.postMessage(true); // (ready)

                    self.console.log("Worker initialized.");
                }.toString(),

                ').call(self, self)'], { type: 'application/javascript' })),

                worker = new Worker(blobURL);

            // URL.revokeObjectURL(blobURL); // (cleanup) // BAD IN IE!!!! The worker is not loaded immediately. :/

            return worker;
        }
    }
}

// Testing for transferable objects: http://html5-demos.appspot.com/static/workers/transferables/index.html
