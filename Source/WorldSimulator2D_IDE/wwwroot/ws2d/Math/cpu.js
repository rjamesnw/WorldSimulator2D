var WorldSimulator2D;
(function (WorldSimulator2D) {
    var MathPiplines;
    (function (MathPiplines) {
        var ThreadProgram = (function () {
            function ThreadProgram(cpu, index) {
                this.cpu = cpu;
                this.index = index;
                this._ready = false;
                this._start = false;
                this.active = false;
                this.data = { buffer: null, length: 0, blockLength: 1 };
                this.onCompleted = [];
                this.worker = _createWebWorkerProcessor();
                this.worker._threadProgram = this;
                this.worker.onmessage = this._doCompleted;
                this.worker.onerror = this._doError;
            }
            ThreadProgram.prototype._doError = function (ev) {
                debugger;
                var threadProgram = this._threadProgram, cpu = threadProgram.cpu;
                throw Error("Error processing thread program " + threadProgram.index + ": " + ev.message);
            };
            ThreadProgram.prototype._doCompleted = function (ev) {
                var threadProgram = this._threadProgram, cpu = threadProgram.cpu;
                if (ev.data === true) {
                    threadProgram._ready = true;
                    console.log("Thread program " + threadProgram.index + " is ready.");
                    if (threadProgram._start) {
                        console.log("A start request is pending for thread program " + threadProgram.index + ", running it now.");
                        threadProgram.start();
                    }
                }
                else {
                    threadProgram.active = false;
                    threadProgram.data.buffer = ev.data.buffer;
                    if (threadProgram.onCompleted.length)
                        for (var i = 0, n = threadProgram.onCompleted.length; i < n; ++i)
                            threadProgram.onCompleted[i](threadProgram, cpu);
                    cpu['_doThreadCompleted'](threadProgram);
                }
            };
            ThreadProgram.prototype.setBuffer = function (buffer, id, length, blockLength) {
                this.data.buffer = buffer;
                this.data.length = buffer.length || this.data.buffer.length;
                this.data.id = id;
                this.data.blockLength = blockLength;
                return this;
            };
            ThreadProgram.prototype.start = function () {
                if (!this.data.buffer && !this._start)
                    throw Error("A buffer is required first.  Please call 'setBuffer()'.");
                if (this._ready && !this.active) {
                    this._start = false;
                    this.active = true;
                    if (this.data.buffer.buffer)
                        this.worker.postMessage(this.data, [this.data.buffer.buffer]);
                    else
                        this.worker.postMessage(this.data);
                    this.cpu['_transferableObjectsSupported'] = !this.data.buffer.byteLength;
                    this.data.buffer = null;
                }
                else if (!this._ready) {
                    this._start = true;
                    console.log("Start requested for thread program " + this.index + ", but the worker is not ready yet; waiting...");
                }
                return this;
            };
            ThreadProgram.prototype.stop = function () {
                if (this.active) {
                    this.worker.terminate();
                    this.active = false;
                }
                return this;
            };
            return ThreadProgram;
        }());
        MathPiplines.ThreadProgram = ThreadProgram;
        var CPU = (function () {
            function CPU(mathProcessor, bufferSize, cores) {
                if (cores === void 0) { cores = navigator.hardwareConcurrency || 4; }
                this.mathProcessor = mathProcessor;
                this.bufferSize = bufferSize;
                this.cores = cores;
                this.threads = [];
                this.onCompleted = [];
                this.onThreadCompleted = [];
                if (bufferSize < MathPiplines.GravityCalculationInputs.blockSize)
                    bufferSize = MathPiplines.GravityCalculationInputs.blockSize;
                var size = Math.ceil(bufferSize / 2) * 2;
                if (size > bufferSize)
                    this.bufferSize = size;
                console.log("CPUProcessor created - optimal buffer size set to " + this.bufferSize + " (floats).");
            }
            Object.defineProperty(CPU.prototype, "completed", {
                get: function () { return !this._activeThreadsCount; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CPU.prototype, "transferableObjectsSupported", {
                get: function () { return !!this._transferableObjectsSupported; },
                enumerable: true,
                configurable: true
            });
            CPU.prototype.createBufferSegment = function () {
                return new Float32Array(this.bufferSize);
            };
            CPU.prototype.setInputs = function (segments) {
                if (!segments)
                    throw Error("A buffer array was expected.");
                if (this._bufferInputCount) {
                    for (var i = 0, n = this._bufferInputCount; i < n; ++i)
                        this.threads[i].stop();
                }
                this._bufferInputCount = 0;
                this._activeThreadsCount = 0;
                var lengthDiff = segments.length - this.threads.length;
                if (lengthDiff > 0)
                    while (lengthDiff--)
                        this.threads.push(new ThreadProgram(this, this.threads.length));
                for (var i = 0, n = segments.length, ti = 0; i < n; ++i) {
                    var buffer = segments[i];
                    if (!buffer.length)
                        continue;
                    this.threads[ti++].setBuffer(buffer, i);
                    ++this._bufferInputCount;
                    ++this._activeThreadsCount;
                }
            };
            CPU.prototype.setGlobal = function (name, value) {
                if (!this._bufferInputCount)
                    throw Error("You must call 'setInputs()' first before setting globals. This prevents having to set globals for threads that won't be used.");
                for (var i = 0, n = this._bufferInputCount; i < n; ++i) {
                    var thread = this.threads[i];
                    if (thread.active)
                        throw Error("You cannot set globals for a thread that is currently active.");
                    thread.data[name] = value;
                }
                return this;
            };
            CPU.prototype.start = function () {
                if (!this._bufferInputCount)
                    throw Error("You must call 'setInputs()' first before starting the process.");
                for (var i = 0, n = this._bufferInputCount; i < n; ++i) {
                    var thread = this.threads[i];
                    if (!thread.active)
                        thread.start();
                }
                return this;
            };
            CPU.prototype._doThreadCompleted = function (threadProgram) {
                --this._activeThreadsCount;
                if (this.onThreadCompleted.length)
                    for (var i = 0, n = this.onThreadCompleted.length; i < n; ++i)
                        this.onThreadCompleted[i](threadProgram);
                if (!this._activeThreadsCount) {
                    var inputCount = this._bufferInputCount;
                    this._bufferInputCount = 0;
                    if (this.onCompleted.length)
                        for (var i = 0, n = this.onCompleted.length; i < n; ++i)
                            this.onCompleted[i](this, inputCount);
                }
            };
            return CPU;
        }());
        MathPiplines.CPU = CPU;
        function _createWebWorkerProcessor() {
            var blobURL = URL.createObjectURL(new Blob(['(',
                function (self) {
                    self.console.log("Hooking up worker 'onmessage'...");
                    var DataBufferOffsets;
                    (function (DataBufferOffsets) {
                        DataBufferOffsets[DataBufferOffsets["type"] = 0] = "type";
                        DataBufferOffsets[DataBufferOffsets["id"] = 1] = "id";
                        DataBufferOffsets[DataBufferOffsets["x"] = 2] = "x";
                        DataBufferOffsets[DataBufferOffsets["y"] = 3] = "y";
                        DataBufferOffsets[DataBufferOffsets["gridX"] = 4] = "gridX";
                        DataBufferOffsets[DataBufferOffsets["gridY"] = 5] = "gridY";
                        DataBufferOffsets[DataBufferOffsets["velocityX"] = 6] = "velocityX";
                        DataBufferOffsets[DataBufferOffsets["velocityY"] = 7] = "velocityY";
                        DataBufferOffsets[DataBufferOffsets["stepVelocityX"] = 8] = "stepVelocityX";
                        DataBufferOffsets[DataBufferOffsets["stepVelocityY"] = 9] = "stepVelocityY";
                        DataBufferOffsets[DataBufferOffsets["mass"] = 10] = "mass";
                    })(DataBufferOffsets || (DataBufferOffsets = {}));
                    self.onerror = function (ev) { throw Error(ev.message); };
                    self.onmessage = function (ev) {
                        var data = ev.data, buffer = data.buffer;
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
                            var type = buffer[i + DataBufferOffsets.type];
                            var id = buffer[i + DataBufferOffsets.id];
                            var x = buffer[i + DataBufferOffsets.x];
                            var y = buffer[i + DataBufferOffsets.y];
                            var unmovable = 0;
                            var mass = buffer[i + DataBufferOffsets.mass];
                            var netForceX = 0;
                            var netForceY = 0;
                            var velocityX = buffer[i + DataBufferOffsets.velocityX];
                            var velocityY = buffer[i + DataBufferOffsets.velocityY];
                            var momentumX = 0;
                            var momentumY = 0;
                            var nx, ny, f, stepvx = 0, stepvy = 0;
                            if (type == 2) {
                                if (unmovable == 0) {
                                    var fx, fy, d = Math.sqrt(x * x + y * y) / unitBlockSize * metersPerBlockSize / 2;
                                    if (d != 0) {
                                        nx = x / d;
                                        ny = y / d;
                                        f = (6.67408e-11 * mass * worldMass) / (d * d) / gravitationalScale;
                                        if (f > maxGravitationalForce)
                                            f = maxGravitationalForce;
                                        fx = nx * f;
                                        fy = ny * f;
                                    }
                                    else {
                                        nx = 0;
                                        ny = 0;
                                        f = 0;
                                        fx = 0;
                                        fy = 0;
                                    }
                                    stepvx = (velocityX -= fx) / velocityScale;
                                    stepvy = (velocityY -= fy) / velocityScale;
                                    if (stepvx <= -pixelSize)
                                        stepvx = -pixelSize;
                                    else if (stepvx >= pixelSize)
                                        stepvx = pixelSize;
                                    if (stepvy <= -pixelSize)
                                        stepvy = -pixelSize;
                                    else if (stepvy >= pixelSize)
                                        stepvy = pixelSize;
                                    x += stepvx;
                                    y += stepvy;
                                }
                            }
                            var gridX = buffer[i + DataBufferOffsets.gridX];
                            var gridY = buffer[i + DataBufferOffsets.gridY];
                            var halfParticleSize = pixelSize / 2;
                            if (halfParticleSize < 1)
                                halfParticleSize = 0;
                            var gx = x / pixelSize;
                            if (gx >= 0)
                                gx = (gx) | 0;
                            else
                                gx = Math.ceil(gx) - 1;
                            var gy = y / pixelSize;
                            if (gy >= 0)
                                gy = (gy) | 0;
                            else
                                gy = Math.ceil(gy) - 1;
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
                    self.postMessage(true);
                    self.console.log("Worker initialized.");
                }.toString(),
                ').call(self, self)'], { type: 'application/javascript' })), worker = new Worker(blobURL);
            return worker;
        }
    })(MathPiplines = WorldSimulator2D.MathPiplines || (WorldSimulator2D.MathPiplines = {}));
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=cpu.js.map