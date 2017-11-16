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
var WebGLJS;
(function (WebGLJS) {
    var GLEnums = (function () {
        function GLEnums(ctx) {
            this.RenderOptions = {
                BLEND: void 0,
                CULL_FACE: void 0,
                DEPTH_TEST: void 0,
                DITHER: void 0,
                POLYGON_OFFSET_FILL: void 0,
                SAMPLE_ALPHA_TO_COVERAGE: void 0,
                SAMPLE_COVERAGE: void 0,
                SCISSOR_TEST: void 0,
                STENCIL_TEST: void 0,
                WebGL2: {
                    RASTERIZER_DISCARD: void 0
                }
            };
            this.ArrayComponentSizes = {
                One: 1,
                Two: 2,
                Three: 3,
                Four: 4
            };
            this.ArrayComponentTypes = {
                BYTE: void 0,
                SHORT: void 0,
                UNSIGNED_BYTE: void 0,
                UNSIGNED_SHORT: void 0,
                FLOAT: void 0,
                WebGL2: {
                    HALF_FLOAT: void 0
                }
            };
            this.UsageTypes = {
                STATIC_DRAW: void 0,
                DYNAMIC_DRAW: void 0,
                STREAM_DRAW: void 0,
                WebGL2: {
                    STATIC_READ: void 0,
                    DYNAMIC_READ: void 0,
                    STREAM_READ: void 0,
                    STATIC_COPY: void 0,
                    DYNAMIC_COPY: void 0,
                    STREAM_COPY: void 0
                }
            };
            this.BufferTargets = {
                ARRAY_BUFFER: void 0,
                ELEMENT_ARRAY_BUFFER: void 0,
                WebGL2: {
                    COPY_READ_BUFFER: void 0,
                    COPY_WRITE_BUFFER: void 0,
                    TRANSFORM_FEEDBACK_BUFFER: void 0,
                    UNIFORM_BUFFER: void 0,
                    PIXEL_PACK_BUFFER: void 0,
                    PIXEL_UNPACK_BUFFER: void 0
                }
            };
            this.TextureTargets = {
                TEXTURE_2D: void 0,
                TEXTURE_CUBE_MAP: void 0,
                WebGL2: {
                    TEXTURE_3D: void 0,
                    TEXTURE_2D_ARRAY: void 0,
                }
            };
            this.ShaderDataTypes = {
                FLOAT: void 0,
                FLOAT_VEC2: void 0,
                FLOAT_VEC3: void 0,
                FLOAT_VEC4: void 0,
                INT: void 0,
                INT_VEC2: void 0,
                INT_VEC3: void 0,
                INT_VEC4: void 0,
                BOOL: void 0,
                BOOL_VEC2: void 0,
                BOOL_VEC3: void 0,
                BOOL_VEC4: void 0,
                FLOAT_MAT2: void 0,
                FLOAT_MAT3: void 0,
                FLOAT_MAT4: void 0,
                SAMPLER_2D: void 0,
                SAMPLER_CUBE: void 0,
                WebGL2: {
                    UNSIGNED_INT: void 0,
                    UNSIGNED_INT_VEC2: void 0,
                    UNSIGNED_INT_VEC3: void 0,
                    UNSIGNED_INT_VEC4: void 0,
                    SAMPLER_3D: void 0,
                    SAMPLER_2D_SHADOW: void 0,
                    SAMPLER_2D_ARRAY: void 0,
                    SAMPLER_2D_ARRAY_SHADOW: void 0,
                    SAMPLER_CUBE_SHADOW: void 0,
                    INT_SAMPLER_2D: void 0,
                    INT_SAMPLER_3D: void 0,
                    INT_SAMPLER_CUBE: void 0,
                    INT_SAMPLER_2D_ARRAY: void 0,
                    UNSIGNED_INT_SAMPLER_2D: void 0,
                    UNSIGNED_INT_SAMPLER_3D: void 0,
                    UNSIGNED_INT_SAMPLER_CUBE: void 0,
                    UNSIGNED_INT_SAMPLER_2D_ARRAY: void 0,
                }
            };
            this.PrimitiveTypeModes = {
                POINTS: void 0,
                LINE_STRIP: void 0,
                LINE_LOOP: void 0,
                LINES: void 0,
                TRIANGLE_STRIP: void 0,
                TRIANGLE_FAN: void 0,
                TRIANGLES: void 0
            };
            this.FeedbackModes = {
                INTERLEAVED_ATTRIBS: void 0,
                SEPARATE_ATTRIBS: void 0
            };
            if (!ctx)
                throw Error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            if (!ctx.webgl)
                throw Error("WebGL is not supported.");
            this._updateEnumsForScope(ctx, this);
        }
        GLEnums.prototype._updateEnums = function (ctx, enumObject) {
            var gl = ctx.webgl;
            for (var p in enumObject)
                if (gl[p] !== void 0)
                    enumObject[p] = gl[p];
        };
        GLEnums.prototype._updateEnumsForScope = function (ctx, scopeObj) {
            for (var p in scopeObj)
                if (Object.prototype.hasOwnProperty.call(scopeObj, p)) {
                    var o = scopeObj[p], t = typeof o;
                    if (t == 'object') {
                        this._updateEnums(ctx, o);
                        this._updateEnumsForScope(ctx, o);
                    }
                }
        };
        return GLEnums;
    }());
    WebGLJS.GLEnums = GLEnums;
    var ShaderProperty = (function () {
        function ShaderProperty(shader, name, type, location, count) {
            this.shader = shader;
            this.name = name;
            this.type = type;
            this.location = location;
            this.count = count;
            if (!shader)
                throw Error("'shader' is required - cannot create a shader property definition without a shader program reference.");
        }
        return ShaderProperty;
    }());
    WebGLJS.ShaderProperty = ShaderProperty;
    var ShaderVarying = (function (_super) {
        __extends(ShaderVarying, _super);
        function ShaderVarying(shader, index, name, type, buffer) {
            var _this = _super.call(this, shader, name, +type, index, void 0) || this;
            if (!_this.shader)
                throw _this._error("'shader' is required.");
            var ctx = shader.ctx, gl = ctx.webgl2;
            if (!gl)
                throw _this._error("WebGL 2 and up is required for vertex shader output varyings.");
            var i = _this.shader['_feedbackBufferMode'] == gl.INTERLEAVED_ATTRIBS ? 0 : index;
            if (i >= ctx.maxFeedbackBuffers)
                ctx.warn(_this._warn("Index " + i + " exceeds maximum supported feedback buffers of " + ctx.maxFeedbackBuffers + " for this browser. \r\nIf using feedback buffers make sure to build the shader program using the 'INTERLEAVED_ATTRIBS' feedback buffer mode."));
            _this._buffer = buffer;
            return _this;
        }
        Object.defineProperty(ShaderVarying.prototype, "buffer", {
            get: function () { return this._buffer || this.shader['_feedbackBuffer']; },
            enumerable: true,
            configurable: true
        });
        ShaderVarying.prototype._error = function (msg) { return Error("Varying " + this.name + " (index " + this.location + ") error: " + msg); };
        ShaderVarying.prototype._warn = function (msg) { return "Varying " + this.name + " (index " + this.location + ") warning: " + msg; };
        ShaderVarying.prototype.bind = function () {
            var ctx = this.shader.ctx, gl = ctx.webgl2;
            if (!gl)
                throw this._error("WebGL 2 and up is required for vertex shader output varyings.");
            if (!this.buffer)
                throw this._error("A buffer is required. Assign a buffer to this varying, or 'shader.feedbackBuffer'.");
            if (!(this.location >= 0))
                throw this._error("The index '" + this.location + "' value is not valid.");
            var index = this.shader['_feedbackBufferMode'] == gl.INTERLEAVED_ATTRIBS ? 0 : this.location;
            if (index >= ctx.maxFeedbackBuffers)
                throw this._error("Index " + index + " exceeds maximum supported feedback buffers of " + ctx.maxFeedbackBuffers + " for this browser.");
            this.buffer['_varying'] = this;
            this.buffer['_transformFeedbackIndex'] = index;
            this.buffer.bind(gl.TRANSFORM_FEEDBACK_BUFFER);
            return this;
        };
        ShaderVarying.prototype.unbind = function () {
            this.buffer.unbind();
            var ctx = this.shader.ctx;
            return this;
        };
        return ShaderVarying;
    }(ShaderProperty));
    WebGLJS.ShaderVarying = ShaderVarying;
    var ShaderAttribute = (function (_super) {
        __extends(ShaderAttribute, _super);
        function ShaderAttribute(shader, location, name, type, buffer, count) {
            var _this = _super.call(this, shader, name.name || name, typeof name.type == 'number' ? name.type : +type, location, typeof name.size == 'number' ? name.size : count) || this;
            _this.count = count;
            if (!_this.shader)
                throw _this._error("'shader' is required.");
            _this._buffer = buffer;
            return _this;
        }
        Object.defineProperty(ShaderAttribute.prototype, "buffer", {
            get: function () { return this._buffer || this.shader['_sharedBuffer']; },
            enumerable: true,
            configurable: true
        });
        ShaderAttribute.prototype._error = function (msg) { return Error("Attribute " + this.name + " (location=" + this.location + ") error: " + msg); };
        ShaderAttribute.prototype.setIndex = function (newIndex) {
            if (!this.shader)
                throw this._error("No shader program is associated.");
            if (!this.shader.program)
                throw this._error("No shader program was created yet.");
            if (!this.shader.ctx)
                throw this._error("Shader program is missing a 'ctx' reference. This is required to get a WebGL context.");
            if (!this.shader.ctx.webgl)
                throw this._error("WebGL is not supported.");
            this.shader.ctx.webgl.bindAttribLocation(this.shader.program, this.location, this.name);
            return this;
        };
        ShaderAttribute.prototype.definePointer = function (componentSize, normalized, offset, stride, type) {
            if (normalized === void 0) { normalized = false; }
            if (offset === void 0) { offset = 0; }
            if (componentSize === void 0)
                componentSize = this.buffer.componentSize;
            if (!componentSize || componentSize < 1 || componentSize > 4)
                throw this._error("Since a valid 'componentSize' was not specified for an underlying buffer, a 'componentSize' value is required here, and should be a value from 1 to 4.");
            if (!this.shader)
                throw this._error("No shader program is associated.");
            if (!this.shader.program)
                throw this._error("No shader program was created yet.");
            if (!this.shader.ctx)
                throw this._error("Shader program is missing a 'ctx' reference. This is required to get a WebGL context.");
            if (!this.shader.ctx.webgl)
                throw this._error("WebGL is not supported.");
            if (type === void 0)
                type = this.shader.ctx.enums.ArrayComponentTypes.FLOAT;
            this.pointer = new VertexAttributePointer(this, this.location, componentSize, type, normalized, stride, offset);
            return this;
        };
        ShaderAttribute.prototype.setBuffer = function (buffer) {
            if (!(buffer instanceof Buffer))
                throw this._error("'buffer' is not a 'Buffer' type. ");
            if (buffer.ctx != this.shader.ctx)
                throw Error("Cannot assign a buffer from a different context.  This is mainly a restriction on the WebGL side, where each context must manage it's own separate resources.");
            this._buffer = buffer;
            return this;
        };
        ShaderAttribute.prototype.enable = function () {
            var ctx = this.shader.ctx, gl = ctx.webgl;
            gl.enableVertexAttribArray(this.location);
            if (!ctx.disableErrorChecking)
                ctx.throwOnError();
            return;
        };
        ShaderAttribute.prototype.disable = function () {
            var ctx = this.shader.ctx, gl = ctx.webgl;
            gl.disableVertexAttribArray(this.location);
            return;
        };
        ShaderAttribute.prototype.bind = function () {
            var ctx = this.shader.ctx, gl = ctx.webgl;
            this.enable();
            if (!this.pointer)
                throw this._error("No pointer was defined for this attribute.");
            this.pointer.bind();
            return this;
        };
        ShaderAttribute.prototype.unbind = function () {
            this.buffer.unbind();
            this.disable();
            return this;
        };
        return ShaderAttribute;
    }(ShaderProperty));
    WebGLJS.ShaderAttribute = ShaderAttribute;
    var ShaderUniform = (function (_super) {
        __extends(ShaderUniform, _super);
        function ShaderUniform(shader, location, name, type, buffer, value, componentSize, textureIndex, count) {
            var _this = _super.call(this, shader, name.name || name, typeof name.type == 'number' ? name.type : +type, location, typeof name.size == 'number' ? name.size : count) || this;
            _this.buffer = buffer;
            _this.value = value;
            _this.componentSize = componentSize;
            _this.textureIndex = textureIndex;
            _this.count = count;
            if (!_this.shader)
                throw _this._error("'shader' is required.");
            return _this;
        }
        ShaderUniform.prototype._error = function (msg) { return Error("Uniform '" + this.name + "' error: " + msg); };
        ShaderUniform.prototype.bind = function (value) {
            var ctx = this.shader.ctx, gl = ctx.webgl;
            if (!gl)
                throw this._error("WebGL not supported.");
            if (value === void 0)
                value = this.value;
            if (typeof this.value == 'number') {
                if (this.type == gl.INT)
                    gl.uniform1i(this.location, this.value);
                else
                    gl.uniform1f(this.location, this.value);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
            }
            else {
                if (this.value instanceof WebGLTexture) {
                    gl.activeTexture(gl['TEXTURE' + this.textureIndex]);
                    if (!ctx.disableErrorChecking)
                        ctx.throwOnError();
                    gl.bindTexture(gl.TEXTURE_2D, this.value);
                    if (!ctx.disableErrorChecking)
                        ctx.throwOnError();
                    gl.uniform1i(this.location, this.textureIndex);
                }
                else if (!this.componentSize || this.componentSize == 1)
                    gl.uniform1fv(this.location, this.value);
                else if (this.componentSize == 2)
                    gl.uniform2fv(this.location, this.value);
                else if (this.componentSize == 3)
                    gl.uniform3fv(this.location, this.value);
                else if (this.componentSize > 3)
                    gl.uniform4fv(this.location, this.value);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
            }
            return this;
        };
        ShaderUniform.prototype.unbind = function () {
            return this;
        };
        return ShaderUniform;
    }(ShaderProperty));
    WebGLJS.ShaderUniform = ShaderUniform;
    var VertexAttributePointer = (function () {
        function VertexAttributePointer(attribute, attributeLocation, componentSize, type, normalized, stride, offset) {
            this.attribute = attribute;
            this.attributeLocation = attributeLocation;
            this.componentSize = componentSize;
            this.type = type;
            this.normalized = normalized;
            this.stride = stride;
            this.offset = offset;
            if (!attribute)
                throw Error("'attribute' is required.");
            if (!attribute.shader)
                throw Error("'attribute.shader' is required.");
            if (!attribute.shader.ctx)
                throw Error("'attribute.shader.ctx' is required.");
            var shader = attribute.shader, ctx = shader.ctx;
            if (componentSize === void 0 && attribute.buffer)
                componentSize = attribute.buffer.componentSize;
            if (!componentSize || componentSize < 1 || componentSize > 4)
                throw Error("Since a valid 'componentSize' was not specified for an underlying buffer, a 'componentSize' value is required here, and should be a value from 1 to 4.");
            if (type === void 0)
                componentSize = ctx.enums.ArrayComponentTypes.FLOAT;
            if (normalized === void 0)
                normalized = false;
        }
        Object.defineProperty(VertexAttributePointer.prototype, "buffer", {
            get: function () { return this._buffer || this.attribute.buffer; },
            enumerable: true,
            configurable: true
        });
        VertexAttributePointer.prototype.bind = function () {
            var attr = this.attribute, ctx = attr.shader.ctx, gl = ctx.webgl, buffer = this.attribute.buffer;
            if (!gl)
                throw Error("WebGL not supported.");
            if (!buffer)
                throw Error("A buffer is required in order to set an attribute pointer for it. Call 'setBuffer()' on the attribute, or set the 'sharedBuffer' property on the shader program.");
            buffer.bind(gl.ARRAY_BUFFER);
            var stride = this.stride || buffer.stride || 0;
            var offset = this.offset || buffer.stride || 0;
            if (this.stride && this.stride != stride) {
                if (!this._strideMismatchError)
                    ctx.warn("You defined a pointer for attribute '" + this.attribute.name + "' (index " + this.attribute.location + ") with a stride of " + this.stride + " that does not match the stride of " + stride + " for the underlying attribute buffer.");
                this._strideMismatchError = true;
            }
            else
                this._strideMismatchError = false;
            gl.vertexAttribPointer(this.attributeLocation, +this.componentSize, +this.type, this.normalized, stride, offset);
            if (!ctx.disableErrorChecking)
                ctx.throwOnError();
            this._buffer = buffer;
            return this;
        };
        return VertexAttributePointer;
    }());
    WebGLJS.VertexAttributePointer = VertexAttributePointer;
    var Buffer = (function () {
        function Buffer(ctx, usage, type, componentSize, stride) {
            this.ctx = ctx;
            this.usage = usage;
            this.type = type;
            this.componentSize = componentSize;
            this.stride = stride;
            this.offset = 0;
            this.destinationOffset = 0;
            this.length = 0;
            if (!ctx)
                throw this._error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            this._bufferSize = 0;
            this.setProperties(usage, type, componentSize, stride);
        }
        Object.defineProperty(Buffer.prototype, "data", {
            get: function () { return this._newData || this._data; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Buffer.prototype, "buffer", {
            get: function () { return this._buffer; },
            enumerable: true,
            configurable: true
        });
        Buffer.prototype._error = function (msg) { return Error("Buffer error: " + msg); };
        Buffer.prototype._warn = function (msg) { this.ctx.warn("Buffer warning: " + msg); };
        Buffer.prototype.setProperties = function (usage, type, componentSize, stride) {
            if (type === void 0)
                type = this.type === void 0 ? this.ctx.enums.ArrayComponentTypes.FLOAT : this.type;
            else if (!(type >= 0))
                throw this._error("A valid type is required (see 'enums.ComponentTypes').");
            if (stride === void 0)
                stride = this.stride || 0;
            if (typeof stride != 'number' || stride < 0 || stride > 255)
                throw this._error("'stride' must be a numeric value from 0 to 255.");
            if (componentSize === void 0)
                componentSize = this.componentSize || 1;
            if (typeof componentSize != 'number' || componentSize < 1 || componentSize > 4)
                throw this._error("'componentSize' must be a numeric value from 1 to 4.");
            if (this.usage != usage)
                this._reallocate = true;
            this.type = +type | 0;
            this.stride = +stride | 0;
            this.usage = +usage | 0;
            this.componentSize = +componentSize | 0;
            return this;
        };
        Buffer.prototype.setData = function (data, length, copyStartIndex, dstByteOffset, resize) {
            if (copyStartIndex === void 0) { copyStartIndex = 0; }
            if (dstByteOffset === void 0) { dstByteOffset = 0; }
            if (resize === void 0) { resize = false; }
            var usingSameData = false;
            if (!data) {
                data = this.data;
                usingSameData = true;
            }
            if (!data)
                throw this._error("The 'data' parameter is required when the 'data' property for this buffer does not yet reference an array.");
            if (copyStartIndex === void 0 || copyStartIndex === null)
                copyStartIndex = 0;
            if (length === void 0 || length === null)
                length = data.length;
            if (copyStartIndex < 0)
                throw this._error("'offset' cannot be less than zero.");
            if (length < 0)
                throw this._error("'length' cannot be less than zero.");
            if (copyStartIndex + length > data.length)
                throw this._error("'offset + length' is greater than 'data.length'.");
            if ((copyStartIndex > 0 || length != data.length) && !this.ctx.webgl2 && !this._ofsAndLenWarning) {
                this.ctx.warn("You've supplied an offset or length less than the array size, however WebGL 2 is not supported.  This may result in the need to copy to a temp array in order to transfer the data, which would not be as efficient.");
                this._ofsAndLenWarning = true;
            }
            if (usingSameData && copyStartIndex == this.offset && dstByteOffset == this.destinationOffset && (length == this.length || length < this.length && !resize))
                this.length = length;
            else {
                this._newData = data;
                this._newDataOffset = copyStartIndex;
                this._newCopyLength = length;
                this._dstDataOffset = dstByteOffset;
                if (resize && dstByteOffset + length < this._bufferSize)
                    this._reallocate = true;
            }
            return this;
        };
        Buffer.prototype.transferData = function () {
            if (this._newData) {
                var data = this._newData, copyOffset = this._newDataOffset, copyLength = this._newCopyLength, dstOfs = this._dstDataOffset;
            }
            else {
                data = this._data, copyOffset = this.offset, copyLength = this.length, dstOfs = this.destinationOffset;
            }
            var ctx = this.ctx, gl = ctx.webgl1;
            if (!this._buffer) {
                this._buffer = ctx.webgl.createBuffer();
                this._bufferSize = 0;
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
            }
            if (data) {
                var existingBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                if (dstOfs + copyLength * data.BYTES_PER_ELEMENT > this._bufferSize)
                    this._reallocate = true;
                if (this._reallocate) {
                    if (copyLength == 0)
                        gl.bufferData(gl.ARRAY_BUFFER, data.constructor.of(0), +this.usage);
                    else if (ctx.webgl2)
                        ctx.webgl2.bufferData(gl.ARRAY_BUFFER, data, +this.usage, copyOffset, copyLength);
                    else if (copyOffset == 0 && copyLength == data.length)
                        gl.bufferData(gl.ARRAY_BUFFER, data, +this.usage);
                    else if (!data.slice)
                        throw this._error("When WebGL 2 is not supported, which requires the given data object to contain a 'slice()' function.");
                    else
                        gl.bufferData(gl.ARRAY_BUFFER, data.slice(copyOffset, copyLength), +this.usage);
                    this._bufferSize = copyLength * data.BYTES_PER_ELEMENT;
                    this._dstDataOffset = dstOfs = 0;
                    this._reallocate = false;
                }
                else {
                    if (copyLength > 0)
                        if (copyOffset == 0 && copyLength == this._bufferSize)
                            gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
                        else if (ctx.webgl2)
                            ctx.webgl2.bufferSubData(gl.ARRAY_BUFFER, dstOfs, data, copyOffset, copyLength);
                        else if (!data.slice)
                            throw this._error("When WebGL 2 is not supported, which requires the given data object to contain a 'slice()' function.");
                        else
                            gl.bufferSubData(gl.ARRAY_BUFFER, dstOfs, data.slice(copyOffset, copyLength));
                }
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                gl.bindBuffer(gl.ARRAY_BUFFER, existingBuffer);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
            }
            this._data = data;
            this._newData = null;
            if (copyOffset !== void 0) {
                this.offset = copyOffset || 0;
                this._newDataOffset = void 0;
            }
            if (copyLength !== void 0) {
                this.length = copyLength || 0;
                this._newCopyLength = void 0;
            }
            if (dstOfs !== void 0) {
                this.destinationOffset = dstOfs || 0;
                this._dstDataOffset = void 0;
            }
        };
        Buffer.prototype.getData = function (data, srcByteOffset, dstOffset, length) {
            if (srcByteOffset === void 0) { srcByteOffset = 0; }
            if (dstOffset === void 0) { dstOffset = 0; }
            var ctx = this.ctx, gl = ctx.webgl2;
            if (!gl)
                throw this._error("WebGL 2 is required to read data back from buffers.");
            if (!this._buffer)
                return this;
            this.bind(gl.COPY_READ_BUFFER);
            gl.getBufferSubData(gl.COPY_READ_BUFFER, srcByteOffset, data || this._data, dstOffset, length);
            if (!ctx.disableErrorChecking)
                ctx.throwOnError();
            return this;
        };
        Buffer.prototype.bind = function (target) {
            if (typeof target != 'number')
                throw Error("Invalid target");
            var ctx = this.ctx, gl = ctx.webgl, gl2 = ctx.webgl2, _target = +target, targetID = '' + _target;
            if (target === gl2.TRANSFORM_FEEDBACK_BUFFER && this._transformFeedbackIndex !== void 0)
                targetID = _target + "_" + this._transformFeedbackIndex;
            var boundObject = ctx['_bindings'][targetID];
            if (boundObject != this) {
                if (boundObject)
                    boundObject.unbind();
                if (this._lastTarget && this._lastTarget == ctx.enums.BufferTargets.WebGL2.TRANSFORM_FEEDBACK_BUFFER)
                    this.unbind();
                if (!this._buffer || this._newData)
                    this.transferData();
                if (_target === gl2.TRANSFORM_FEEDBACK_BUFFER && this._transformFeedbackIndex !== void 0) {
                    gl2.bindBufferBase(_target, this._transformFeedbackIndex, this._buffer);
                    if (!ctx.disableErrorChecking)
                        ctx.throwOnError();
                    this._lastTransformFeedbackIndex = this._transformFeedbackIndex;
                }
                else {
                    gl.bindBuffer(_target, this._buffer);
                    if (!ctx.disableErrorChecking)
                        ctx.throwOnError();
                }
                ctx['_bindings'][targetID] = this;
                this._lastTarget = _target;
                this._lastTargetID = targetID;
            }
            return this;
        };
        Buffer.prototype.unbind = function () {
            var ctx = this.ctx, boundObject = ctx['_bindings'][this._lastTargetID];
            if (boundObject == this) {
                if (this._lastTransformFeedbackIndex !== void 0) {
                    ctx.webgl2.bindBufferBase(this._lastTarget, this._lastTransformFeedbackIndex, null);
                    this._lastTransformFeedbackIndex = void 0;
                    this._varying = null;
                }
                else
                    ctx.webgl.bindBuffer(this._lastTarget, null);
                ctx['_bindings'][this._lastTargetID] = null;
                this._lastTarget = void 0;
                this._lastTargetID = void 0;
            }
            return this;
        };
        return Buffer;
    }());
    WebGLJS.Buffer = Buffer;
    var FrameBuffer = (function () {
        function FrameBuffer(ctx, width, height, textureCount) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.textureCount = textureCount;
            this._isValid = false;
            if (!ctx)
                throw Error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            var ctx = this.ctx;
            var gl = this.ctx.webgl;
            if (textureCount < 1)
                this.textureCount = textureCount = 1;
            else {
                var maxAttachments = ctx.maxCombinedTextures;
                if (textureCount > maxAttachments)
                    throw Error("Only " + maxAttachments + " color attachment" + (maxAttachments == 1 ? " is" : "s are") + " supported.");
            }
            this.buffer = gl.createFramebuffer();
            this._readBuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
            this.textures = [];
            this.data = [];
            this.attachments = [];
            var attachmentIndex = 0;
            while (textureCount-- > 0) {
                var t = gl.createTexture();
                this.textures.push(t);
                this.data.push(new Int32Array(width * height));
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                gl.bindTexture(gl.TEXTURE_2D, t);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                if (ctx.isWebGL1Supported)
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.FLOAT, null);
                else
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.width, this.height, 0, gl.RGBA, gl.FLOAT, null);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                var attachmentConst = gl['COLOR_ATTACHMENT' + attachmentIndex++];
                this.attachments.push(attachmentConst);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentConst, gl.TEXTURE_2D, t, 0);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
            }
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
            gl.drawBuffers(this.attachments);
            if (!ctx.disableErrorChecking)
                ctx.throwOnError();
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            var errMsg = this.checkComplete();
            if (errMsg) {
                throw Error(errMsg);
            }
            else
                ctx.log("Frame buffer initialized");
            ctx.log(this);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        Object.defineProperty(FrameBuffer.prototype, "isValid", {
            get: function () { return this._isValid; },
            enumerable: true,
            configurable: true
        });
        FrameBuffer.prototype.checkComplete = function () {
            this._isValid = false;
            var gl = this.ctx.webgl;
            if (!gl.isFramebuffer(this.buffer))
                return "Framebuffer is not valid.";
            var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            switch (status) {
                case gl.FRAMEBUFFER_COMPLETE:
                    this._isValid = true;
                    return void 0;
                case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT: return "Not all framebuffer attachment points are framebuffer attachment complete.";
                case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS: return "Not all attached images have the same width and height.";
                case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: return "No images are attached to the framebuffer.";
                case gl.FRAMEBUFFER_UNSUPPORTED: return "The combination of internal formats of the attached images violates an implementation-dependent set of restrictions.";
            }
        };
        FrameBuffer.prototype.updateTextureData = function (data, index) {
            var ctx = this.ctx;
            var gl = ctx.webgl;
            if (index < 0)
                throw Error("'index' cannot be less than 0.");
            if (index >= this.textures.length)
                throw Error("'index' is out of bounds - the number of inputs is " + this.textures.length + ".");
            gl.bindTexture(gl.TEXTURE_2D, this.textures[index]);
            if (!ctx.disableErrorChecking)
                ctx.throwOnError();
            if (ctx.isWebGL1Supported)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.FLOAT, data);
            else
                gl.texImage2D(gl.TEXTURE_2D, 0, ctx.webgl2.RGBA32F, this.width, this.height, 0, gl.RGBA, gl.FLOAT, data);
            if (!ctx.disableErrorChecking)
                ctx.throwOnError();
            gl.bindTexture(gl.TEXTURE_2D, null);
            return this;
        };
        FrameBuffer.prototype.getTextureData = function (data, index) {
            var ctx = this.ctx;
            var gl = ctx.webgl;
            if (index < 0)
                throw Error("'index' cannot be less than 0.");
            if (index >= this.textures.length)
                throw Error("'index' is out of bounds - the number of inputs is " + this.textures.length + ".");
            if (ctx.isWebGL2Supported) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
                var attachmentConst = gl['COLOR_ATTACHMENT' + index];
                ctx.webgl2.readBuffer(attachmentConst);
                ctx.throwOnError();
                ctx.webgl2.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.FLOAT, data);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
            }
            else {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
                gl.activeTexture(gl['TEXTURE' + index]);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                gl.bindTexture(gl.TEXTURE_2D, this.textures[index]);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                ctx.webgl1.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.FLOAT, data);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            return this;
        };
        FrameBuffer.prototype.bind = function () {
            var ctx = this.ctx;
            var gl = ctx.webgl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
            if (!ctx.disableErrorChecking)
                ctx.throwOnError();
            return this;
        };
        FrameBuffer.prototype.unbind = function () {
            var gl = this.ctx.webgl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            return this;
        };
        return FrameBuffer;
    }());
    WebGLJS.FrameBuffer = FrameBuffer;
    var ShaderProgram = (function () {
        function ShaderProgram(ctx) {
            this.ctx = ctx;
            if (!ctx)
                throw this._error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            if (!ctx.webgl)
                throw this._error("WebGL is not supported.");
            this.program = ctx.webgl.createProgram();
        }
        ShaderProgram.prototype.attribute = function (name) { return this.attributes['$' + name]; };
        ShaderProgram.prototype.uniform = function (name) { return this.uniforms['$' + name]; };
        ShaderProgram.prototype.varying = function (name) { return this.varyings['$' + name]; };
        Object.defineProperty(ShaderProgram.prototype, "sharedBuffer", {
            get: function () { return this._sharedBuffer; },
            set: function (b) {
                if (b.ctx != this.ctx)
                    throw this._error("Cannot assign a buffer from a different context.  This is mainly a restriction on the WebGL side, where each context must manage it's own separate resources.");
                this._sharedBuffer = b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShaderProgram.prototype, "feedbackBuffer", {
            get: function () { return this._feedbackBuffer; },
            set: function (b) {
                if (b.ctx != this.ctx)
                    throw this._error("Cannot assign a buffer from a different context.  This is mainly a restriction on the WebGL side, where each context must manage it's own separate resources.");
                this._feedbackBuffer = b;
            },
            enumerable: true,
            configurable: true
        });
        ShaderProgram.prototype._error = function (msg) { return Error("Shader program error: " + msg); };
        ShaderProgram.prototype._warn = function (msg) { this.ctx.warn("Shader program warning: " + msg); };
        ShaderProgram.prototype.setVertexCode = function (code) {
            if (Array.isArray(code))
                code = code.join("\r\n");
            else if (typeof code != 'string')
                code = '' + code;
            code = code.trim();
            if (!code && !this._vertCode)
                code = "void main() { gl_Position = gl_Vertex; }";
            if (code)
                this._vertCode = code;
            return this;
        };
        ShaderProgram.prototype.setFragmentCode = function (code) {
            if (Array.isArray(code))
                code = code.join("\r\n");
            else if (typeof code != 'string')
                code = '' + code;
            code = code.trim();
            if (!code && !this._fragCode)
                code = "void main() { gl_FragColor = gl_Color; }";
            if (code)
                this._fragCode = code;
            return this;
        };
        ShaderProgram.prototype.build = function (keepShaderObjects, feedbackBufferMode) {
            if (keepShaderObjects === void 0) { keepShaderObjects = false; }
            var feedbackVaryings = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                feedbackVaryings[_i - 2] = arguments[_i];
            }
            if (this._built)
                return;
            var ctx = this.ctx;
            var gl = ctx.webgl;
            if (!this._vertShader)
                this._vertShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(this._vertShader, this._vertCode);
            gl.compileShader(this._vertShader);
            if (!gl.getShaderParameter(this._vertShader, gl.COMPILE_STATUS)) {
                var errMsg = "Vertex Shader Compiler Error: " + gl.getShaderInfoLog(this._vertShader);
                var lines = this._vertCode.split("\n");
                for (var i = 0; i < lines.length; ++i)
                    lines[i] = (1 + i) + ". " + lines[i];
                throw this._error(errMsg + "\r\n" + lines.join("\n"));
            }
            gl.attachShader(this.program, this._vertShader);
            if (!this._fragShader)
                this._fragShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(this._fragShader, this._fragCode);
            gl.compileShader(this._fragShader);
            if (!gl.getShaderParameter(this._fragShader, gl.COMPILE_STATUS)) {
                var errMsg = "Fragment Shader Compiler Error: " + gl.getShaderInfoLog(this._fragShader);
                var lines = this._fragCode.split("\n");
                for (var i = 0; i < lines.length; ++i)
                    lines[i] = (1 + i) + ". " + lines[i];
                throw this._error(errMsg + "\r\n" + lines.join("\n"));
            }
            gl.attachShader(this.program, this._fragShader);
            if (feedbackBufferMode) {
                if (!ctx.isWebGL2Supported)
                    throw this._error("Vertex transform feedback is only in WebGL 2+.");
                if (!feedbackVaryings || !feedbackVaryings.length)
                    throw this._error("If you specify a feedback mode you must also specify a list of varyings (outputs) expected from the vertex shader.");
                this._feedbackBufferMode = +feedbackBufferMode;
                var tfbvaryings = [];
                if (!this.varyings)
                    this.varyings = [];
                else if (this.varyings.length > 0)
                    this.varyings.length = 0;
                for (var i = 0, n = feedbackVaryings.length; i < n; ++i) {
                    var fbvarying = feedbackVaryings[i];
                    var v = fbvarying instanceof ShaderVarying ? fbvarying : new ShaderVarying(this, i, fbvarying);
                    this.varyings.push(v);
                    this.varyings['$' + v.name] = v;
                    tfbvaryings.push(v.name);
                }
                ctx.webgl2.transformFeedbackVaryings(this.program, tfbvaryings, +feedbackBufferMode);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
            }
            else if (feedbackVaryings && feedbackVaryings.length)
                throw this._error("If you specify a list of varyings (outputs) you must also specify a feedback mode.");
            gl.linkProgram(this.program);
            if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
                var errMsg = "Shader Linking Error: " + gl.getProgramInfoLog(this.program);
                this.ctx.log(errMsg);
                throw this._error(errMsg);
            }
            if (!this.attributes)
                this.attributes = [];
            else {
                for (var i = 0, n = this.attributes.length; i < n; ++i)
                    this.attributes[i].unbind();
                this.attributes.length = 0;
            }
            if (!this.uniforms)
                this.uniforms = [];
            else {
                for (var i = 0, n = this.uniforms.length; i < n; ++i)
                    this.uniforms[i].unbind();
                this.uniforms.length = 0;
            }
            var prog = this.program, attribCount = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
            for (var i = 0, n = attribCount; i < n; ++i) {
                var info = gl.getActiveAttrib(prog, i);
                var aLocation = gl.getAttribLocation(prog, info.name);
                var a = new ShaderAttribute(this, aLocation, info);
                this.attributes.push(a);
                this.attributes['$' + a.name] = a;
            }
            var uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
            for (var i = 0, n = uniformCount; i < n; ++i) {
                var info = gl.getActiveUniform(prog, i);
                var uLocation = gl.getUniformLocation(prog, info.name);
                var u = new ShaderUniform(this, uLocation, info);
                this.uniforms.push(u);
                this.uniforms['$' + u.name] = u;
            }
            if (!keepShaderObjects)
                this.disposeShaders();
            this._built = true;
            return this;
        };
        ShaderProgram.prototype.disposeShaders = function () {
            if (this._vertShader) {
                this.ctx.webgl.deleteShader(this._vertShader);
                this._vertShader = void 0;
            }
            if (this._fragShader) {
                this.ctx.webgl.deleteShader(this._fragShader);
                this._fragShader = void 0;
            }
            return this;
        };
        ShaderProgram.prototype.dispose = function () {
            this.disposeShaders();
            this.unbind();
            if (this.program) {
                this.ctx.webgl.deleteProgram(this.program);
                this.program = null;
            }
        };
        ShaderProgram.prototype.setUniform = function (name, value, required) {
            if (required === void 0) { required = true; }
            if (!this.program)
                throw this._error("A shader program must be compiled and linked before this function can be called;  Call 'compileScripts()' first.");
            var u = this.uniforms['$' + name];
            if (u)
                u.value = value;
            else if (required)
                throw this._error("The uniform '" + name + "' does not exist on the shader program. It could be the webgl driver optimized out unused uniforms.  Check that this uniform is actually being used.");
            return this;
        };
        ShaderProgram.prototype.disableRasterizer = function () {
            var ctx = this.ctx;
            if (!ctx.webgl2)
                throw this._error("'disableRasterizer' is only supported in WebGL 2+.");
            this._disableRasterizer = true;
            return this;
        };
        ShaderProgram.prototype.enableRasterizer = function () {
            var ctx = this.ctx;
            if (!ctx.webgl2)
                throw this._error("'disableRasterizer' is only supported in WebGL 2+.");
            this._disableRasterizer = false;
            return this;
        };
        ShaderProgram.prototype.swapBuffers = function () {
            if (!this._sharedBuffer)
                throw this._error("There is no shared buffer to swap with.");
            if (!this._feedbackBuffer)
                throw this._error("There is no feedback buffer to swap with.");
            if (this._sharedBuffer.stride != this._feedbackBuffer.stride)
                throw this._error("Cannot swap buffers with different strides.");
            this._sharedBuffer.unbind();
            this._feedbackBuffer.unbind();
            var tmp = this._sharedBuffer;
            this._sharedBuffer = this._feedbackBuffer;
            this._feedbackBuffer = tmp;
            this._varyingsBound = false;
            this._attributesBound = false;
            return this;
        };
        ShaderProgram.prototype.bind = function () {
            var ctx = this.ctx, gl = ctx.webgl, boundObject = ctx['_bindings']["SHADER"];
            if (boundObject != this) {
                if (boundObject)
                    boundObject.unbind();
                gl.useProgram(this.program);
                ctx['_bindings']["SHADER"] = this;
            }
            if (!this._varyingsBound && this.varyings && this.varyings.length) {
                if (!this._feedbackBuffer)
                    throw this._error("There are output varyings specified, but no feedback buffer was assigned to capture the values.");
                if (!this._disableRasterizer && !this._disableRasterizer_Warning) {
                    this._warn("When using transform feedback buffers you may wish to call 'disableRasterizer()' if you don't need to run the fragment shader, which may be more efficient.");
                    this._disableRasterizer_Warning = true;
                }
                for (var i = 0, n = this.varyings.length; i < n; ++i) {
                    var v = this.varyings[i];
                    v.bind();
                }
                this._varyingsBound = true;
            }
            if (!this._attributesBound && this.attributes && this.attributes.length) {
                for (var i = 0, n = this.attributes.length; i < n; ++i) {
                    var a = this.attributes[i];
                    a.bind();
                }
                this._attributesBound = true;
            }
            if (!this._uniformsBound && this.uniforms && this.uniforms.length) {
                for (var i = 0, n = this.uniforms.length; i < n; ++i) {
                    var u = this.uniforms[i];
                    u.bind();
                }
                this._uniformsBound = true;
            }
            if (ctx.webgl2)
                if (this._disableRasterizer === true)
                    ctx.enableRenderOptions(ctx.webgl2.RASTERIZER_DISCARD);
                else if (ctx._globalOptionStates[ctx.webgl2.RASTERIZER_DISCARD])
                    ctx.disableRenderOptions(ctx.webgl2.RASTERIZER_DISCARD);
            return this;
        };
        ShaderProgram.prototype.unbind = function () {
            var ctx = this.ctx, gl = ctx.webgl, boundObject = ctx['_bindings']["SHADER"];
            if (boundObject == this) {
                if (this.attributes)
                    for (var i = 0, n = this.attributes.length; i < n; ++i)
                        if (this.attributes[i].location >= 0)
                            this.attributes[i].unbind();
                if (this.varyings)
                    for (var i = 0, n = this.varyings.length; i < n; ++i)
                        this.varyings[i].unbind();
                if (ctx.webgl2 && this._disableRasterizer === true)
                    ctx.disableRenderOptions(ctx.webgl2.RASTERIZER_DISCARD);
                gl.useProgram(null);
                ctx['_bindings']["SHADER"] = null;
                this._varyingsBound = false;
                this._attributesBound = false;
                this._uniformsBound = false;
            }
            return this;
        };
        return ShaderProgram;
    }());
    WebGLJS.ShaderProgram = ShaderProgram;
    var VertexArrayObject = (function () {
        function VertexArrayObject(ctx) {
            this.ctx = ctx;
            if (!ctx)
                throw Error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
        }
        VertexArrayObject.prototype.addBuffer = function (buffer, attribute) {
            var ctx = this.ctx, gl = ctx.webgl;
            return this;
        };
        return VertexArrayObject;
    }());
    WebGLJS.VertexArrayObject = VertexArrayObject;
    var Context = (function () {
        function Context(owner, canvasWidth, canvasHeight, canvas) {
            this.owner = owner;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.canvas = canvas;
            this._globalOptionStates = {};
            this._bindings = {};
            this._fullscreenQuad = {
                componentSize: 3,
                vertices: new Float32Array([
                    -1.0, -1.0, 0.0,
                    1.0, 1.0, 0.0,
                    -1.0, 1.0, 0.0,
                    -1.0, -1.0, 0.0,
                    1.0, -1.0, 0.0,
                    1.0, 1.0, 0.0,
                ])
            };
            this.log = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                return console.log.apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : "";
            };
            this.info = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                return (console.info || console.log).apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : "";
            };
            this.debug = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                return (console.debug || console.info || console.log).apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : "";
            };
            this.warn = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                return (console.warn || console.log).apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : "";
            };
            this.error = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                return (console.error || console.warn || console.log).apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : "";
            };
            this.disableErrorChecking = false;
            this.disableErrorCheckingOnSuccessfulRender = true;
            this.log("Creating new WebGL wrapper context ...");
            if (canvas === void 0 || canvas === null)
                canvas = document.createElement("canvas");
            if (!(canvas instanceof HTMLCanvasElement))
                throw Error("'canvas' is not an HTMLCanvasElement object.");
            if (typeof canvasWidth != 'number')
                canvasWidth = canvas.width;
            else
                canvas.width = canvasWidth;
            if (typeof canvasHeight != 'number')
                canvasHeight = canvas.height;
            else
                canvas.height = canvasHeight;
            if (!(canvasWidth > 0))
                throw Error("No valid canvas width is defined.");
            if (!(canvasHeight > 0))
                throw Error("No valid canvas height is defined.");
            this._canvas = canvas;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.log("Canvas width and height: " + canvasWidth + "x" + canvasHeight);
            var gl;
            if (canvas) {
                gl = canvas.getContext("webgl2");
                if (gl) {
                    this.log("WebGL 2 is supported.");
                    this._WebGL2Supported = true;
                    this.webgl2 = gl;
                    this.webgl1 = gl;
                }
                else {
                    this.warn("WebGL 2 is not supported.");
                    this._WebGL2Supported = false;
                    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                    this._WebGL1Supported = !!gl;
                    if (gl) {
                        this.log("WebGL 1 is supported.");
                        this.webgl1 = gl;
                    }
                }
                if (gl) {
                    this.webgl = gl;
                    this.enums = new GLEnums(this);
                }
                else
                    this.warn("Unable to get a WebGL 1 or 2 context as it seems it is not supported in this browser.");
            }
            else
                this.warn("Unable to get a WebGL context as it seems your browser does not support the canvas element.");
            this.updateStateFromWebGLContext();
            var gl = this.webgl;
            if (gl) {
                this.webGLVersion = gl.getParameter(gl.VERSION);
                this.webGLSLVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
                this.webGLVendor = gl.getParameter(gl.VENDOR);
                this.maxCombinedTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
                if (this._WebGL1Supported) {
                    this.maxFeedbackBuffers = 0;
                    this.maxUniformBuffers = 0;
                }
                else {
                    this.maxFeedbackBuffers = gl.getParameter(this.webgl2.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS);
                    this.maxUniformBuffers = gl.getParameter(this.webgl2.MAX_UNIFORM_BUFFER_BINDINGS);
                }
            }
            else {
                this.webGLVersion = "WebGL Not Supported";
                this.webGLSLVersion = this.webGLVersion;
                this.webGLVendor = this.webGLVersion;
            }
            if (this.isWebGLSupported) {
                this.info("Supported WebGL extensions in this context: " + this.getSupportedExtensions().join(", "));
                gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
                this.throwOnError();
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                this.throwOnError();
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
                this.throwOnError();
            }
        }
        Object.defineProperty(Context.prototype, "isWebGL1Supported", {
            get: function () { return this._WebGL1Supported; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "isWebGL2Supported", {
            get: function () { return this._WebGL2Supported; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "isWebGLSupported", {
            get: function () { return this._WebGL1Supported || this._WebGL2Supported; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "maxTextureDimension", {
            get: function () { return this.webgl.getParameter(this.webgl.MAX_TEXTURE_SIZE); },
            enumerable: true,
            configurable: true
        });
        Context.prototype.createQuad = function () {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            return this.createBuffer()
                .setProperties(this.enums.UsageTypes.STATIC_DRAW, this.enums.ArrayComponentTypes.FLOAT, this.enums.ArrayComponentSizes.Three)
                .setData(this._fullscreenQuad.vertices);
        };
        Context.prototype.enabledExtension = function (name, required) {
            if (required === void 0) { required = true; }
            if (!this.webgl)
                throw Error("WebGL is not supported.");
            var gl = this.webgl;
            var ext = gl.getExtension(name);
            if (!ext)
                if (required)
                    throw Error("The WebGL extension '" + name + "' is not supported in the current context.");
                else
                    return null;
            var prefix = name.split("_")[0];
            for (var p in ext)
                if (p.slice(-1 - prefix.length).toLocaleUpperCase() == "_" + prefix)
                    gl[p] = ext[p = p.slice(0, -4)];
                else if (p.slice(-prefix.length).toLocaleUpperCase() == prefix)
                    gl[p] = ext[p = p.slice(0, -3)];
            return ext;
        };
        Context.prototype.getSupportedExtensions = function () {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            return this.webgl.getSupportedExtensions();
        };
        Context.prototype.updateStateFromWebGLContext = function () {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            var gl = this.webgl;
            for (var p in this.enums.RenderOptions)
                if (typeof this.enums.RenderOptions[p] == 'number') {
                    this._globalOptionStates[p] = gl.isEnabled(this.enums.RenderOptions[p]);
                    if (gl.getError() != gl.NO_ERROR)
                        this._globalOptionStates[p] = void 0;
                }
            for (var p in this.enums.RenderOptions.WebGL2)
                if (typeof this.enums.RenderOptions.WebGL2[p] == 'number') {
                    this._globalOptionStates[p] = gl.isEnabled(this.enums.RenderOptions.WebGL2[p]);
                    if (gl.getError() != gl.NO_ERROR)
                        this._globalOptionStates[p] = void 0;
                }
            return this;
        };
        Context.prototype.enableRenderOptions = function () {
            var options = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                options[_i] = arguments[_i];
            }
            if (options) {
                var gl = this.webgl;
                for (var i = options.length - 1; i >= 0; --i) {
                    var optionEnum = +options[i];
                    this._globalOptionStates[optionEnum] = true;
                    gl.enable(+options[i]);
                }
            }
            return this;
        };
        Context.prototype.disableRenderOptions = function () {
            var options = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                options[_i] = arguments[_i];
            }
            if (options) {
                var gl = this.webgl;
                for (var i = options.length - 1; i >= 0; --i) {
                    var optionEnum = +options[i];
                    this._globalOptionStates[optionEnum] = false;
                    gl.disable(+options[i]);
                }
            }
            return this;
        };
        Context.prototype.isEnabled = function (optionEnum) {
            return this._globalOptionStates[+optionEnum] || false;
        };
        Context.prototype.createShader = function () {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            return new ShaderProgram(this);
        };
        Context.prototype.createBuffer = function () {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            return new Buffer(this);
        };
        Context.prototype.render = function (shaderProgram, mode, start, count) {
            if (start === void 0) { start = 0; }
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            if (!shaderProgram)
                throw Error("A shader program is required to process this input.");
            var gl = this.webgl, gl2 = this.webgl2;
            if (shaderProgram.ctx != this)
                throw this.error("The given shader program was not created by this GPU processor context.");
            if (!shaderProgram['_built'])
                shaderProgram.build();
            shaderProgram.bind();
            if (mode === void 0)
                if (shaderProgram['_feedbackBuffer'] && shaderProgram['_disableRasterizer'])
                    mode = gl.POINTS;
                else
                    mode = gl.TRIANGLES;
            if (count == void 0) {
                var attribute = shaderProgram.attributes[0];
                if (!attribute)
                    throw Error("'count' is required - could not be detected as there are no attributes in the specified shader program (is it built yet?).");
                var buffer = attribute.buffer;
                count = buffer.data.length / (buffer.stride || attribute.pointer && attribute.pointer.stride || 1);
            }
            if (shaderProgram['_feedbackBuffer'] && gl2) {
                gl2.beginTransformFeedback(+mode);
                if (!this.disableErrorChecking)
                    this.throwOnError();
            }
            if (!shaderProgram['_disableRasterizer']) {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            }
            gl.drawArrays(+mode, start, count);
            if (!this.disableErrorChecking)
                this.throwOnError();
            if (shaderProgram['_feedbackBuffer'] && gl2) {
                gl2.endTransformFeedback();
                if (!this.disableErrorChecking)
                    this.throwOnError();
            }
            if (this.disableErrorCheckingOnSuccessfulRender)
                this.disableErrorChecking = true;
            return this;
        };
        Context.prototype.checkForError = function () {
            var gl = this.webgl;
            if (this.disableErrorChecking)
                return void 0;
            var code = gl.getError();
            if (!code)
                return void 0;
            var msg = "";
            switch (code) {
                case gl.INVALID_ENUM:
                    msg += "Invalid enum value.";
                    break;
                case gl.INVALID_VALUE:
                    msg += "A specified parameter value is not valid.";
                    break;
                case gl.INVALID_OPERATION:
                    msg += "The current state for the specified command is not valid, or the combination of parameter values is not allowed/supported.";
                    break;
                case gl.OUT_OF_MEMORY:
                    msg += "Out of memory.";
                    break;
                case gl.INVALID_FRAMEBUFFER_OPERATION:
                    msg += "Attempt to read from or write to the framebuffer failed. Make sure the framebuffer is valid/complete first.";
                    break;
                case gl.CONTEXT_LOST_WEBGL:
                    msg += "The context was lost - usually due to a graphics card reset.";
                    break;
                default:
                    msg += "Code " + code + " was returned.";
                    break;
            }
            return { code: code, message: msg };
        };
        Context.prototype.throwOnError = function () {
            if (this.disableErrorChecking)
                return;
            var error = this.checkForError();
            if (error) {
                var msg = this.error("WebGL Error (" + error.code + "): " + error.message);
                throw Error(msg);
            }
        };
        Context.prototype.createTexture = function (width, height, clearColor, clearAlpha) {
            if (clearColor === void 0) { clearColor = "FFFFFF"; }
            if (clearAlpha === void 0) { clearAlpha = 1; }
            return new Texture(this, width, height, clearColor, clearAlpha);
        };
        return Context;
    }());
    WebGLJS.Context = Context;
    var Texture = (function (_super) {
        __extends(Texture, _super);
        function Texture(ctx, width, height, clearColor, clearAlpha) {
            var _this = this;
            eval("var _super = function() { return void 0; };");
            _this = _super.call(this) || this;
            if (!ctx)
                throw Error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            if (width < 0)
                throw _this._error("The width cannot be negative.");
            if (height < 0)
                throw _this._error("The height cannot be negative.");
            _this.ctx = ctx;
            _this.width = width;
            _this.height = height;
            clearColor || (clearColor = "FFFFFF");
            (typeof clearAlpha == 'number') || (clearAlpha = 1);
            return _this;
        }
        Object.defineProperty(Texture.prototype, "canvas", {
            get: function () { return this._canvas; },
            set: function (v) { if (v) {
                this._canvas = v;
                this._ctx2d = v.getContext('2d');
            } },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "ctx2d", {
            get: function () { return this._ctx2d; },
            set: function (v) { if (v) {
                this._ctx2d = v;
                this._canvas = v.canvas;
            } },
            enumerable: true,
            configurable: true
        });
        Texture.prototype._error = function (msg) { return Error("Texture error: " + msg); };
        Texture.prototype._warn = function (msg) { return "Texture warning: " + msg; };
        Texture.prototype.ensure2DContext = function (forceNew) {
            if (!forceNew && !this._canvas && this._ctx2d)
                this._canvas = this._ctx2d.canvas;
            this._canvas = !forceNew && this._canvas || document.createElement('canvas');
            if (!this._canvas)
                throw this._error("The canvas element is not supported in this environment.");
            this.ctx2d = !forceNew && this._ctx2d || this._canvas.getContext('2d');
            if (!this.ctx2d)
                throw this._error("The canvas element is not supported in this environment.");
            return this;
        };
        Texture.prototype.resizeCanvas = function (width, height) {
            this.ensure2DContext();
            this.canvas.width = width;
            this.canvas.height = height;
            this.width = width;
            this.height = height;
            this.changed = true;
            return this;
        };
        Texture.prototype.clear = function (color, alpha) {
            if (alpha === void 0) { alpha = 1.0; }
            if (color === void 0)
                color = typeof this.clearColor == 'string' && this.clearColor || "FFFFFF";
            if (alpha === void 0)
                alpha = typeof this.clearAlpha == 'number' ? this.clearAlpha : 1;
            this.ensure2DContext();
            if (typeof color != 'string')
                color = '' + color;
            if (color.length > 6)
                color = color.slice(-6);
            this.ctx2d.save();
            this.ctx2d.beginPath();
            this.ctx2d.rect(0, 0, this.width, this.height);
            this.ctx2d.fillStyle = '#' + color;
            this.ctx2d.globalAlpha = alpha;
            this.ctx2d.fill();
            this.ctx2d.restore();
            this.changed = true;
            return this;
        };
        Texture.prototype.createWebGLTexture = function () {
            var gl = this.ctx.webgl;
            if (!gl)
                throw this._error("WebGL not supported.");
            if (!this.glTexture) {
                this.glTexture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            }
            return this;
        };
        Texture.prototype.updateGLTexture = function (force) {
            if (force === void 0) { force = false; }
            this.ensure2DContext();
            var ctx = this.ctx, gl = ctx.webgl;
            if (!gl)
                throw this._error("WebGL not supported.");
            if (this.changed || force) {
                var boundTexture = ctx['_bindings'][gl.TEXTURE_2D];
                if (boundTexture != this)
                    this.bind(gl.TEXTURE_2D, false);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                this.changed = false;
                if (boundTexture)
                    boundTexture.bind();
            }
            return this;
        };
        Texture.prototype.bind = function (target, checkCanvasChanged) {
            if (checkCanvasChanged === void 0) { checkCanvasChanged = true; }
            var ctx = this.ctx, gl = ctx.webgl;
            if (!gl)
                throw this._error("WebGL not supported.");
            var boundTexture = ctx['_bindings'][gl.TEXTURE_2D];
            if (boundTexture != this) {
                if (boundTexture)
                    boundTexture.unbind();
                if (!this.glTexture)
                    this.createWebGLTexture();
                else
                    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
                if (!ctx.disableErrorChecking)
                    ctx.throwOnError();
                ctx['_bindings'][gl.TEXTURE_2D] = this;
            }
            if (checkCanvasChanged && this.changed && !this.disableUpdateOnBind)
                this.updateGLTexture();
            return this;
        };
        Texture.prototype.unbind = function () {
            var gl = this.ctx.webgl;
            gl && gl.bindTexture(gl.TEXTURE_2D, null);
            return this;
        };
        return Texture;
    }(CanvasRenderingContext2D));
    WebGLJS.Texture = Texture;
    var changeTriggerFunctions = [
        "arc",
        "arcTo",
        "bezierCurveTo",
        "closePath",
        "ellipse",
        "lineTo",
        "moveTo",
        "quadraticCurveTo",
        "rect",
        "clearRect",
        "createLinearGradient",
        "createPattern",
        "createRadialGradient",
        "drawFocusIfNeeded",
        "drawImage",
        "fill",
        "fillRect",
        "fillText",
        "putImageData",
        "rotate",
        "scale",
        "setLineDash",
        "setTransform",
        "stroke",
        "strokeRect",
        "strokeText",
        "transform",
        "translate",
        "scrollPathIntoView",
    ];
    for (var p in CanvasRenderingContext2D.prototype)
        try {
            if (Object.prototype.hasOwnProperty.call(CanvasRenderingContext2D.prototype, p)) {
                var value = CanvasRenderingContext2D.prototype[p];
                if (typeof value == 'function')
                    if (changeTriggerFunctions.indexOf(p) >= 0)
                        Texture.prototype[p] = (function (p) { return function () { this.changed = true; return CanvasRenderingContext2D.prototype[p].apply(this.ensure2DContext().ctx2d, arguments); }; })(p);
                    else
                        Texture.prototype[p] = (function (p) { return function () { return CanvasRenderingContext2D.prototype[p].apply(this.ensure2DContext().ctx2d, arguments); }; })(p);
            }
        }
        catch (e) { }
    WebGLJS['__prevGL'] = GL;
})(WebGLJS || (WebGLJS = {}));
var GL = WebGLJS;
if (!this['WebGL'])
    this['WebGL'] = WebGLJS.Context;
if (WebGLJS['__prevGL'] !== void 0)
    this['GL'] = WebGLJS['__prevGL'];
//# sourceMappingURL=webgljs.js.map