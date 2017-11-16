namespace WebGLJS {

    export interface ExtensionsMap {
        "ANGLE_instanced_arrays": ANGLEInstancedArrays;

        "EXT_blend_minmax": EXTBlendMinMax;
        "EXT_color_buffer_half_float": EXTColorBufferHalfFloat;
        "EXT_frag_depth": EXTFragDepth;
        "EXT_sRGB": EXTsRGB;
        "EXT_shader_texture_lod": EXTShaderTextureLOD;
        "EXT_texture_filter_anisotropic": EXTTextureFilterAnisotropic;
        "EXT_color_buffer_float": object;

        "OES_element_index_uint": OESElementIndexUint;
        "OES_standard_derivatives": OESStandardDerivatives;
        "OES_texture_float": OESTextureFloat;
        "OES_texture_float_linear": OESTextureFloatLinear;
        "OES_texture_half_float": OESTextureHalfFloat;
        "OES_texture_half_float_linear": OESTextureHalfFloatLinear;
        "OES_vertex_array_object": OESVertexArrayObject;

        "WEBGL_color_buffer_float": WebGLColorBufferFloat;
        "WEBGL_compressed_texture_astc": object;
        "WEBGL_compressed_texture_atc": WebGLCompressedTextureATC;
        "WEBGL_compressed_texture_etc": object;
        "WEBGL_compressed_texture_etc1": WebGLCompressedTextureETC1;
        "WEBGL_compressed_texture_pvrtc": WebGLCompressedTexturePVRTC;
        "WEBGL_compressed_texture_s3tc": WebGLCompressedTextureS3TC;
        "WEBGL_compressed_texture_s3tc_srgb": object;
        "WEBGL_debug_renderer_info": WebGLDebugRendererInfo;
        "WEBGL_debug_shaders": WebGLDebugShaders;
        "WEBGL_depth_texture": WebGLDepthTexture;
        "WEBGL_draw_buffers": WebGLDrawBuffers;
        "WEBGL_lose_context": WebGLLoseContext;

        // Prefixed versions appearing in the wild as per September 2015

        "WEBKIT_EXT_texture_filter_anisotropic": EXTTextureFilterAnisotropic;
        "WEBKIT_WEBGL_compressed_texture_atc": WebGLCompressedTextureATC;
        "WEBKIT_WEBGL_compressed_texture_pvrtc": WebGLCompressedTexturePVRTC;
        "WEBKIT_WEBGL_compressed_texture_s3tc": WebGLCompressedTextureS3TC;
        "WEBKIT_WEBGL_depth_texture": WebGLDepthTexture;
        "WEBKIT_WEBGL_lose_context": WebGLLoseContext;

        "MOZ_WEBGL_compressed_texture_s3tc": WebGLCompressedTextureS3TC;
        "MOZ_WEBGL_depth_texture": WebGLDepthTexture;
        "MOZ_WEBGL_lose_context": WebGLLoseContext;
    }

    export interface IBufferArrayType extends ArrayBufferView {
        [index: number]: number;

        /**
          * The size in bytes of each element in the array.
          */
        readonly BYTES_PER_ELEMENT: number;

        /**
          * Returns a section of an array.
          * @param start The beginning of the specified portion of the array.
          * @param end The end of the specified portion of the array.
          */
        slice?(start?: number, end?: number): Float32Array;

        /**
         * The length of the array.
         */
        readonly length: number;
    }

    export interface RenderOption extends Number { }
    export interface ComponentSize extends Number { }
    export interface ComponentType extends Number { }
    export interface UsageType extends Number { }
    export interface BufferTarget extends Number { }
    export interface ShaderDataType extends Number { }
    export interface PrimitiveTypeMode extends Number { }
    export interface FeedbackMode extends Number { }
    export interface TextureTarget extends Number { }

    /**
     * Scans the GL enum values and categorizes them to make code completion more structured.
     */
    export class GLEnums {
        /** WebGL capabilities that can enabled or disabled. */
        readonly RenderOptions = {
            /** Activates blending of the computed fragment color values. See WebGLRenderingContext.blendFunc(). */
            BLEND: <RenderOption>void 0,
            /** Activates culling of polygons. See WebGLRenderingContext.cullFace(). */
            CULL_FACE: <RenderOption>void 0,
            /** Activates depth comparisons and updates to the depth buffer. See WebGLRenderingContext.depthFunc(). */
            DEPTH_TEST: <RenderOption>void 0,
            /** Activates dithering of color components before they get written to the color buffer. */
            DITHER: <RenderOption>void 0,
            /** Activates adding an offset to depth values of polygon's fragments. See WebGLRenderingContext.polygonOffset(). */
            POLYGON_OFFSET_FILL: <RenderOption>void 0,
            /** Activates the computation of a temporary coverage value determined by the alpha value. */
            SAMPLE_ALPHA_TO_COVERAGE: <RenderOption>void 0,
            /** Activates ANDing the fragment's coverage with the temporary coverage value. See WebGLRenderingContext.sampleCoverage(). */
            SAMPLE_COVERAGE: <RenderOption>void 0,
            /** Activates the scissor test that discards fragments that are outside of the scissor rectangle. See WebGLRenderingContext.scissor(). */
            SCISSOR_TEST: <RenderOption>void 0,
            /** Activates stencil testing and updates to the stencil buffer. See WebGLRenderingContext.stencilFunc(). */
            STENCIL_TEST: <RenderOption>void 0,
            /** Open ES 3 (WebGL 2) supported render options. */
            WebGL2: {
                /** (WebGL 2): Primitives are discarded immediately before the rasterization stage, but after the optional transform feedback stage. gl.clear() commands are ignored. */
                RASTERIZER_DISCARD: <RenderOption>void 0
            }
        };

        /** For specifying the number of components per vertex attribute, which must be 1, 2, 3, or 4. */
        readonly ArrayComponentSizes = {
            /** Used for single value types, such as float or int only.*/
            One: <ComponentSize>1,
            /** Typically used with shader type 'vec2'. */
            Two: <ComponentSize>2,
            /** Typically used with shader type 'vec3'. */
            Three: <ComponentSize>3,
            /** Typically used with shader type 'vec4'. */
            Four: <ComponentSize>4
        };

        /** The data type of each component in an array of buffer data. */
        readonly ArrayComponentTypes = {
            /** A signed 8-bit integer, with values in [-128, 127]. */
            BYTE: <ComponentType>void 0,
            /** A signed 16-bit integer, with values in [-32768, 32767]. */
            SHORT: <ComponentType>void 0,
            /** An unsigned 8-bit integer, with values in [0, 255]. */
            UNSIGNED_BYTE: <ComponentType>void 0,
            /** An unsigned 16-bit integer, with values in [0, 65535]. */
            UNSIGNED_SHORT: <ComponentType>void 0,
            /** A 32-bit floating point number. */
            FLOAT: <ComponentType>void 0,
            /** Open ES 3 (WebGL 2) supported component types. */
            WebGL2: {
                /** (WebGL 2): A 16-bit floating point number. */
                HALF_FLOAT: <ComponentType>void 0
            }
        };

        /** Specifies the usage pattern of a data store. This helps the GL driver decide how best to allocate and use stored data (typically used for buffer data). */
        readonly UsageTypes = {
            /** Contents of the buffer are likely to be used often and not change often. Contents are written to the buffer, but not read. */
            STATIC_DRAW: <UsageType>void 0,
            /** Contents of the buffer are likely to be used often and change often. Contents are written to the buffer, but not read. */
            DYNAMIC_DRAW: <UsageType>void 0,
            /** Contents of the buffer are likely to not be used often. Contents are written to the buffer, but not read. */
            STREAM_DRAW: <UsageType>void 0,
            /** Open ES 3 (WebGL 2) supported usage types. */
            WebGL2: {
                /** (WebGL 2): Contents of the buffer are likely to be used often and not change often. Contents are read from the buffer, but not written. */
                STATIC_READ: <UsageType>void 0,
                /** (WebGL 2): Contents of the buffer are likely to be used often and change often. Contents are read from the buffer, but not written. */
                DYNAMIC_READ: <UsageType>void 0,
                /** (WebGL 2): Contents of the buffer are likely to not be used often. Contents are read from the buffer, but not written. */
                STREAM_READ: <UsageType>void 0,
                /** (WebGL 2): Contents of the buffer are likely to be used often and not change often. Contents are neither written or read by the user. */
                STATIC_COPY: <UsageType>void 0,
                /** (WebGL 2): Contents of the buffer are likely to be used often and change often. Contents are neither written or read by the user. */
                DYNAMIC_COPY: <UsageType>void 0,
                /** (WebGL 2): Contents of the buffer are likely to be used often and not change often. Contents are neither written or read by the user. */
                STREAM_COPY: <UsageType>void 0
            }
        };

        /** WebGL buffer bind targets. */
        readonly BufferTargets = {
            /** Buffer containing vertex attributes, such as vertex coordinates, texture coordinate data, or vertex color data. */
            ARRAY_BUFFER: <BufferTarget>void 0,
            /** Buffer used for element indices (indexes into array vertices). */
            ELEMENT_ARRAY_BUFFER: <BufferTarget>void 0,
            /** Open ES 3 (WebGL 2) supported buffer targets. */
            WebGL2: {
                /**  (Web GL 2): Buffer for copying from one buffer object to another. */
                COPY_READ_BUFFER: <BufferTarget>void 0,
                /**  (Web GL 2): Buffer for copying from one buffer object to another. */
                COPY_WRITE_BUFFER: <BufferTarget>void 0,
                /**  (Web GL 2): Buffer for transform feedback operations. */
                TRANSFORM_FEEDBACK_BUFFER: <BufferTarget>void 0,
                /**  (Web GL 2): Buffer used for storing uniform blocks. */
                UNIFORM_BUFFER: <BufferTarget>void 0,
                /**  (Web GL 2): Buffer used for pixel transfer operations (download operations). */
                PIXEL_PACK_BUFFER: <BufferTarget>void 0,
                /**  (Web GL 2): Buffer used for pixel transfer operations (upload operations). */
                PIXEL_UNPACK_BUFFER: <BufferTarget>void 0
            }
        };

        /** WebGL texture bind targets. */
        readonly TextureTargets = {
            /** A two-dimensional texture. */
            TEXTURE_2D: <TextureTarget>void 0,
            /** A cube-mapped texture. */
            TEXTURE_CUBE_MAP: <TextureTarget>void 0,
            /** Open ES 3 (WebGL 2) supported texture targets. */
            WebGL2: {
                /**  (Web GL 2): A three-dimensional texture. */
                TEXTURE_3D: <TextureTarget>void 0,
                /**  (Web GL 2): A two-dimensional array texture. */
                TEXTURE_2D_ARRAY: <TextureTarget>void 0,
            }
        };

        /** WebGL shader data types. The root types are for both WebGL 1 and 2.  See 'ShaderDataTypes.WebGL2' for WebGL2 supported enums. */
        readonly ShaderDataTypes = {
            /** WebGL float data type. */
            FLOAT: <ShaderDataType>void 0,
            /** WebGL float based 'vec2' data type. */
            FLOAT_VEC2: <ShaderDataType>void 0,
            /** WebGL float based 'vec3' data type. */
            FLOAT_VEC3: <ShaderDataType>void 0,
            /** WebGL float based 'vec4' data type. */
            FLOAT_VEC4: <ShaderDataType>void 0,
            /** WebGL integer based data type. */
            INT: <ShaderDataType>void 0,
            /** WebGL integer based 'vec2' data type. */
            INT_VEC2: <ShaderDataType>void 0,
            /** WebGL integer based 'vec3' data type. */
            INT_VEC3: <ShaderDataType>void 0,
            /** WebGL integer based 'vec4' data type. */
            INT_VEC4: <ShaderDataType>void 0,
            /** WebGL boolean based data type. */
            BOOL: <ShaderDataType>void 0,
            /** WebGL boolean based 'vec2' data type. */
            BOOL_VEC2: <ShaderDataType>void 0,
            /** WebGL boolean based 'vec3' data type. */
            BOOL_VEC3: <ShaderDataType>void 0,
            /** WebGL boolean based 'vec4' data type. */
            BOOL_VEC4: <ShaderDataType>void 0,
            /** WebGL float based 2x2 matrix data type. */
            FLOAT_MAT2: <ShaderDataType>void 0,
            /** WebGL float based 3x3 matrix data type. */
            FLOAT_MAT3: <ShaderDataType>void 0,
            /** WebGL float based 4x4 matrix data type. */
            FLOAT_MAT4: <ShaderDataType>void 0,
            /** WebGL 2D sampler (aka texture) data type. */
            SAMPLER_2D: <ShaderDataType>void 0,
            /** WebGL cube sampler (aka skybox textures) data type. */
            SAMPLER_CUBE: <ShaderDataType>void 0,

            /** Open ES 3 (WebGL 2) supported data types. */
            WebGL2: {
                /** WebGL 2+ unsigned integer based data type. */
                UNSIGNED_INT: <ShaderDataType>void 0,
                /** WebGL 2+ unsigned integer based 'vec2' data type. */
                UNSIGNED_INT_VEC2: <ShaderDataType>void 0,
                /** WebGL 2+ unsigned integer based 'vec3' data type. */
                UNSIGNED_INT_VEC3: <ShaderDataType>void 0,
                /** WebGL 2+ unsigned integer based 'vec4' data type. */
                UNSIGNED_INT_VEC4: <ShaderDataType>void 0,
                /** WebGL 2+ 3D sampler (aka 3D texture) data type. */
                SAMPLER_3D: <ShaderDataType>void 0,
                /** WebGL 2+ 2D shadow sampler data type. */
                SAMPLER_2D_SHADOW: <ShaderDataType>void 0,
                /** WebGL 2+ 2D array sampler data type. */
                SAMPLER_2D_ARRAY: <ShaderDataType>void 0,
                /** WebGL 2+ 2D shadow array sampler data type. */
                SAMPLER_2D_ARRAY_SHADOW: <ShaderDataType>void 0,
                /** WebGL 2+ cube shadow sampler data type. */
                SAMPLER_CUBE_SHADOW: <ShaderDataType>void 0,
                /** WebGL 2+ integer based 2D sampler (texture) data type. */
                INT_SAMPLER_2D: <ShaderDataType>void 0,
                /** WebGL 2+ integer based 3D sampler (texture) data type. */
                INT_SAMPLER_3D: <ShaderDataType>void 0,
                /** WebGL 2+ integer based cube sampler (skybox) data type. */
                INT_SAMPLER_CUBE: <ShaderDataType>void 0,
                /** WebGL 2+ integer based 2D sampler array data type. */
                INT_SAMPLER_2D_ARRAY: <ShaderDataType>void 0,
                /** WebGL 2+ unsigned integer based 2D sampler (texture) data type. */
                UNSIGNED_INT_SAMPLER_2D: <ShaderDataType>void 0,
                /** WebGL 2+ unsigned integer based 3D sampler (texture) data type. */
                UNSIGNED_INT_SAMPLER_3D: <ShaderDataType>void 0,
                /** WebGL 2+ unsigned integer based cube sampler (skybox) data type. */
                UNSIGNED_INT_SAMPLER_CUBE: <ShaderDataType>void 0,
                /** WebGL 2+ unsigned integer based 2D sampler array data type. */
                UNSIGNED_INT_SAMPLER_2D_ARRAY: <ShaderDataType>void 0,
            }
        }

        /** Primitive types that can be rendered. */
        readonly PrimitiveTypeModes = {
            /** Draws a single dot. */
            POINTS: <PrimitiveTypeMode>void 0,
            /** Draws a straight line to the next vertex. */
            LINE_STRIP: <PrimitiveTypeMode>void 0,
            /** Draws a straight line to the next vertex, and connects the last vertex back to the first. */
            LINE_LOOP: <PrimitiveTypeMode>void 0,
            /** Draws a line between a pair of vertices. */
            LINES: <PrimitiveTypeMode>void 0,
            /** A series of connected triangles, sharing vertices. */
            TRIANGLE_STRIP: <PrimitiveTypeMode>void 0,
            /** A set of connected triangles that share one central vertex. */
            TRIANGLE_FAN: <PrimitiveTypeMode>void 0,
            /** Draws triangles for groups of three vertices per triangle. */
            TRIANGLES: <PrimitiveTypeMode>void 0
        };

        /** (WebGL 2) The mode to use when capturing varying outputs from vertex shaders. */
        readonly FeedbackModes = {
            /** The outputs are placed in order, which is then repeated, for a single buffer. */
            INTERLEAVED_ATTRIBS: <PrimitiveTypeMode>void 0,
            /** Each output is sent to a different buffer. */
            SEPARATE_ATTRIBS: <PrimitiveTypeMode>void 0
        };

        private _updateEnums(ctx: Context, enumObject: {}): void {
            var gl = ctx.webgl;
            for (var p in enumObject)
                if (gl[p] !== void 0)
                    enumObject[p] = gl[p];
        }

        constructor(ctx: Context) {
            if (!ctx) throw Error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            if (!ctx.webgl) throw Error("WebGL is not supported.");
            this._updateEnumsForScope(ctx, this);
        }

        private _updateEnumsForScope(ctx: Context, scopeObj: {}): void {
            for (var p in scopeObj)
                if (Object.prototype.hasOwnProperty.call(scopeObj, p)) { // (just in case - only immediate properties wanted)
                    var o = scopeObj[p], t = typeof o;
                    if (t == 'object') {
                        this._updateEnums(ctx, o); // (update the enums here)
                        this._updateEnumsForScope(ctx, o); // (check of there are nested objects that also need updating)
                    }
                }
        }
    }

    /** An interface for objects that can be bound to a WebGL context. */
    export interface IBindable {
        /** Bind the underlying WebGL object to the context. */
        bind(...args: any[]): this;
        /** Unbind the underlying WebGL object from the context (typically sets an entry to null/0). */
        unbind(...args: any[]): this;
    }

    export class ShaderProperty {
        constructor(public readonly shader: ShaderProgram, public readonly name: string, public type: ShaderDataType, public readonly location?: number | WebGLUniformLocation, public readonly count?: number) {
            if (!shader) throw Error("'shader' is required - cannot create a shader property definition without a shader program reference.");
        }
    }
    export class ShaderVarying extends ShaderProperty implements IBindable {
        readonly location: number;

        /** The buffer, if any, associated with this varying (typically for transform feedback).
        * If no buffer exists, 'shader.feedbackBuffer' will be used instead, if set.
        */
        get buffer() { return this._buffer || this.shader['_feedbackBuffer']; }
        private _buffer: Buffer<IBufferArrayType>;

        /**
         * Constructs a new shader uniform descriptor object.
         * @param shader The shader to associate this uniform info with.
         * @param index The index of the binding point for binding target.
         * @param name The uniform name.
         * @param type A shader supported data type.
         * @param buffer An optional buffer to associate with this uniform. If not specified, then 'shader.sharedBuffer' will be used instead, if set.
         */
        //x * @param target The binding target for this varying, which is used to bind the associated buffer.
        //x * The two supported targets are 'enums.Targets.WebGL2.TRANSFORM_FEEDBACK_BUFFER' and 'enums.Targets.WebGL2.UNIFORM_BUFFER';
        //x * however.
        constructor(shader: ShaderProgram, index: number, name: string, type?: ShaderDataType, buffer?: Buffer<IBufferArrayType>) {
            super(shader, name, +type, index, void 0);
            if (!this.shader) throw this._error("'shader' is required.");
            var ctx = shader.ctx, gl = ctx.webgl2;
            if (!gl) throw this._error("WebGL 2 and up is required for vertex shader output varyings.");
            //x if (target != ctx.enums.Targets.WebGL2.TRANSFORM_FEEDBACK_BUFFER && target != ctx.enums.Targets.WebGL2.UNIFORM_BUFFER)
            //x    throw this._error("Invalid target. Supported targets are 'enums.Targets.WebGL2.TRANSFORM_FEEDBACK_BUFFER' and 'enums.Targets.WebGL2.UNIFORM_BUFFER'.");
            var i = this.shader['_feedbackBufferMode'] == gl.INTERLEAVED_ATTRIBS ? 0 : index; // ('INTERLEAVED_ATTRIBS' puts all outputs in a single buffer, not multiple ones [which can be quite limited!])
            if (i >= ctx.maxFeedbackBuffers)
                ctx.warn(this._warn("Index " + i + " exceeds maximum supported feedback buffers of " + ctx.maxFeedbackBuffers + " for this browser. \r\nIf using feedback buffers make sure to build the shader program using the 'INTERLEAVED_ATTRIBS' feedback buffer mode."));
            this._buffer = buffer;
        }

        private _error(msg: string) { return Error("Varying " + this.name + " (index " + this.location + ") error: " + msg); }
        private _warn(msg: string) { return "Varying " + this.name + " (index " + this.location + ") warning: " + msg; }

        bind(): this {
            var ctx = this.shader.ctx, gl = ctx.webgl2;
            if (!gl) throw this._error("WebGL 2 and up is required for vertex shader output varyings.");
            if (!this.buffer) throw this._error("A buffer is required. Assign a buffer to this varying, or 'shader.feedbackBuffer'.");
            if (!(this.location >= 0)) throw this._error("The index '" + this.location + "' value is not valid.");
            var index = this.shader['_feedbackBufferMode'] == gl.INTERLEAVED_ATTRIBS ? 0 : this.location; // ('INTERLEAVED_ATTRIBS' puts all outputs in a single buffer, not multiple ones [which can be quite limited!])
            if (index >= ctx.maxFeedbackBuffers)
                throw this._error("Index " + index + " exceeds maximum supported feedback buffers of " + ctx.maxFeedbackBuffers + " for this browser.");
            this.buffer['_varying'] = this;
            this.buffer['_transformFeedbackIndex'] = index;
            this.buffer.bind(gl.TRANSFORM_FEEDBACK_BUFFER);
            return this;
        }

        unbind(): this {
            this.buffer.unbind();
            var ctx = this.shader.ctx;
            return this;
        }
    }

    export class ShaderAttribute extends ShaderProperty implements IBindable {
        readonly pointer: VertexAttributePointer;
        readonly location: number;

        /** The buffer, if any, associated with this attribute.  A buffer is required in order to define pointers for the attribute.
        * If no buffer exists, 'shader.sharedBuffer' will be used instead, if set.
        */
        get buffer() { return this._buffer || this.shader['_sharedBuffer']; }
        private _buffer: Buffer<IBufferArrayType>;

        /**
         * Constructs a new shader uniform descriptor object.
         * Normally this is the constructor used by shader programs when reading attributes after building them.
         * @param shader The shader to associate this uniform info with.
         * @param location The index of the attribute in a built shader. This can be specified in shaders using the location modifier: "layout(location = #)", where '#' is the location for the attribute.
         * @param info Information returned by calling 'gl.getActiveUniform()'.
         */
        constructor(shader: ShaderProgram, location: number, info: WebGLActiveInfo);

        /**
         * Constructs a new shader uniform descriptor object.
         * @param shader The shader to associate this uniform info with.
         * @param location The index of the attribute in a built shader. This can be specified in shaders using the location modifier: "layout(location = #)", where '#' is the location for the attribute.
         * @param name The uniform name.
         * @param type A shader supported data type.
         * @param buffer An optional buffer to associate with this uniform. If not specified, then 'shader.sharedBuffer' will be used instead, if set.
         * @param count The number of uniforms (for arrays).  Everything else is usually 1.
         */
        constructor(shader: ShaderProgram, location: number, name: string, type?: ShaderDataType,
            buffer?: Buffer<IBufferArrayType>, count?: number);

        constructor(shader: ShaderProgram, location: WebGLUniformLocation, name: string | WebGLActiveInfo, type?: ShaderDataType, buffer?: Buffer<IBufferArrayType>, public count?: number) {
            super(shader, (<WebGLActiveInfo>name).name || <string>name,
                typeof (<WebGLActiveInfo>name).type == 'number' ? (<WebGLActiveInfo>name).type : +type,
                location,
                typeof (<WebGLActiveInfo>name).size == 'number' ? (<WebGLActiveInfo>name).size : count);
            if (!this.shader) throw this._error("'shader' is required.");
            this._buffer = buffer;
        }

        private _error(msg: string) { return Error("Attribute " + this.name + " (location=" + this.location + ") error: " + msg); }

        /**
         * Change the index assigned to this attribute for the underlying shader program.
         * You can call this as a convention to make sure certain names (like "position", "normal", "color"m etc.) are always in the same index.
         * @param newIndex The new attribute index to assign to an attribute specified by it's name.
         * By default, when a shader is compiled and linked, the attribute locations are determined automatically so this is usually not required.
         */
        setIndex(newIndex: number): this {
            if (!this.shader) throw this._error("No shader program is associated.");
            if (!this.shader.program) throw this._error("No shader program was created yet.");
            if (!this.shader.ctx) throw this._error("Shader program is missing a 'ctx' reference. This is required to get a WebGL context.");
            if (!this.shader.ctx.webgl) throw this._error("WebGL is not supported.");
            this.shader.ctx.webgl.bindAttribLocation(this.shader.program, this.location, this.name);
            return this;
        }

        /**
         * Defines a pointer that describes how to read data in the underlying buffer (requires a buffer to be set first).
         * No actual WebGL calls are made until the attributes are bound later.
         * Since all pointers should obey the same componentSize, type, and strides for reading data, those values should be passed into the Buffer constructor.
         * @param componentSize The size of individual components of the underlying data array (from 'enums.ArrayComponentSizes)', or simply a value from 1 to 4.
         * @param offset Specifies an offset, in bytes, of the first component in the vertex attribute array. This is usually 0 (the default).
         * @param normalized A boolean specifying whether integer data values should be normalized when being cast to a float types (if the attribute is a float type).
         * @param stride The offset, in bytes, between the beginning of consecutive vertex attributes. Cannot be larger than 255.
         * Optional, since defaults will be taken from any underlying buffer.
         * WARNING: Normally this should NEVER be touched when using shared buffers (such as {ShaderProgram}.sharedBuffer), since it is expected that all other pointers to the
         * the same buffer need the same stride to locate their consecutive values.
         * @param type The type of each item (component) in the array buffer associated with the underlying attribute. The default is assumed to be float.
         */
        definePointer(componentSize?: ComponentSize, normalized = false, offset = 0, stride?: number, type?: ComponentType): this {
            if (componentSize === void 0) componentSize = this.buffer.componentSize;
            if (!componentSize || componentSize < 1 || componentSize > 4) throw this._error("Since a valid 'componentSize' was not specified for an underlying buffer, a 'componentSize' value is required here, and should be a value from 1 to 4.");
            if (!this.shader) throw this._error("No shader program is associated.");
            if (!this.shader.program) throw this._error("No shader program was created yet.");
            if (!this.shader.ctx) throw this._error("Shader program is missing a 'ctx' reference. This is required to get a WebGL context.");
            if (!this.shader.ctx.webgl) throw this._error("WebGL is not supported.");
            if (type === void 0) type = this.shader.ctx.enums.ArrayComponentTypes.FLOAT; // TODO: Detect from 'this.type' (float vs int vs byte, etc.)
            (<{ pointer: object }>this).pointer = new VertexAttributePointer(this, this.location, componentSize, type, normalized, stride, offset);
            return this;
        }

        /**
         * Assign a buffer to be read from for this attribute.
         * You must assign a buffer before defining a pointer to read from it.
         */
        setBuffer(buffer: Buffer): this {
            if (!(buffer instanceof Buffer))
                throw this._error("'buffer' is not a 'Buffer' type. ");
            if (buffer.ctx != this.shader.ctx)
                throw Error("Cannot assign a buffer from a different context.  This is mainly a restriction on the WebGL side, where each context must manage it's own separate resources.");
            this._buffer = buffer;
            return this;
        }

        /**
         * Enable this shader attribute at it's currently defined index position.
         */
        enable(): this {
            var ctx = this.shader.ctx, gl = ctx.webgl;
            // ... turns on (enable) this attribute position (may have to do this last to make sure there is bound data first) ...
            gl.enableVertexAttribArray(this.location);
            if (!ctx.disableErrorChecking) ctx.throwOnError();
            return;
        }

        /**
         * Disable this shader attribute at it's currently defined index position.
         */
        disable(): this {
            var ctx = this.shader.ctx, gl = ctx.webgl;
            gl.disableVertexAttribArray(this.location);
            return;
        }

        bind(): this {
            var ctx = this.shader.ctx, gl = ctx.webgl;
            this.enable();
            if (!this.pointer)
                throw this._error("No pointer was defined for this attribute.");
            this.pointer.bind();
            return this;
        }

        unbind(): this {
            this.buffer.unbind();
            this.disable();
            return this;
        }
    }

    export class ShaderUniform extends ShaderProperty implements IBindable {
        readonly location: WebGLUniformLocation;

        /**
         * Constructs a new shader uniform descriptor object.
         * @param shader The shader to associate this uniform info with.
         * @param info Information returned by calling 'gl.getActiveUniform()'.
         */
        constructor(shader: ShaderProgram, location: WebGLUniformLocation, info: WebGLActiveInfo);

        /**
         * Constructs a new shader uniform descriptor object.
         * @param shader The shader to associate this uniform info with.
         * @param location The location of the uniform in a built shader.
         * @param name The uniform name.
         * @param type A shader supported data type.
         * @param buffer An optional buffer to associate with this uniform.
         * @param value The value for this uniform property.
         * @param componentSize The size of the vector expected to receive the data. This should be 1-4 floats (vec1-vec4) per entry. Anything else is an error.
         * This only applies to arrays.  If a single number value is given, it is assumed a single numerical value for the uniform position.
         * @param textureIndex If associated with a sampler, this is the texture index to the sampler.
         * @param count The number of uniforms (for arrays).  Everything else is usually 1.
         */
        constructor(shader: ShaderProgram, location: WebGLUniformLocation, name: string, type?: ShaderDataType,
            buffer?: Buffer<IBufferArrayType>, value?: number | number[] | Float32Array | WebGLTexture,
            componentSize?: ComponentSize, textureIndex?: number, count?: number);

        constructor(shader: ShaderProgram, location: WebGLUniformLocation, name: string | WebGLActiveInfo, type?: ShaderDataType,
            public buffer?: Buffer<IBufferArrayType>, public value?: number | number[] | Float32Array | WebGLTexture,
            public componentSize?: ComponentSize, public textureIndex?: number, public count?: number) {
            super(shader, (<WebGLActiveInfo>name).name || <string>name,
                typeof (<WebGLActiveInfo>name).type == 'number' ? (<WebGLActiveInfo>name).type : +type,
                location,
                typeof (<WebGLActiveInfo>name).size == 'number' ? (<WebGLActiveInfo>name).size : count);
            if (!this.shader) throw this._error("'shader' is required.");
        }

        private _error(msg: string) { return Error("Uniform '" + this.name + "' error: " + msg); }

        bind(value?: any): this {
            var ctx = this.shader.ctx, gl = ctx.webgl;
            if (!gl) throw this._error("WebGL not supported.");
            if (value === void 0) value = this.value;

            if (typeof this.value == 'number') {
                if (this.type == gl.INT)
                    gl.uniform1i(this.location, this.value);
                else
                    gl.uniform1f(this.location, this.value);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
            }
            else {
                if (this.value instanceof WebGLTexture) {
                    gl.activeTexture(gl['TEXTURE' + this.textureIndex]); // (active a texture unit)
                    if (!ctx.disableErrorChecking) ctx.throwOnError();
                    gl.bindTexture(gl.TEXTURE_2D, this.value);
                    if (!ctx.disableErrorChecking) ctx.throwOnError();
                    gl.uniform1i(this.location, this.textureIndex); // (set the INTEGER value to select the texture unit for this uniform location)
                }
                else if (!this.componentSize || this.componentSize == 1)
                    gl.uniform1fv(this.location, this.value);
                else if (this.componentSize == 2)
                    gl.uniform2fv(this.location, this.value);
                else if (this.componentSize == 3)
                    gl.uniform3fv(this.location, this.value);
                else if (this.componentSize > 3)
                    gl.uniform4fv(this.location, this.value);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
            }
            return this;
        }

        unbind(): this {
            return this;
        }
    }

    /**
      * Describes how to read components from a buffer for a given shader attribute location.
      * Typically you should call '{Buffer}.createPointer()' to create pointers for buffers.
      */
    export class VertexAttributePointer {
        /** Returns the buffer associated with this pointer. When 'bind()' is called this reference will become set to the current reference in 'attribute.buffer'. */
        get buffer() { return this._buffer || this.attribute.buffer; }
        /** Set the first time 'Bind()' is called because 'gl.vertexAttribPointer()' takes the current buffer reference set in 'ARRAY_BUFFER' and holds onto it, so this helps keep track of it.  */
        private _buffer: Buffer;
        private _strideMismatchError: boolean;

        constructor(public readonly attribute: ShaderAttribute, public attributeLocation: number, public componentSize?: ComponentSize, public type?: ComponentType, public normalized?: boolean, public stride?: number, public offset?: number) {
            if (!attribute) throw Error("'attribute' is required.");
            if (!attribute.shader) throw Error("'attribute.shader' is required.");
            if (!attribute.shader.ctx) throw Error("'attribute.shader.ctx' is required.");
            var shader = attribute.shader, ctx = shader.ctx;
            if (componentSize === void 0 && attribute.buffer) componentSize = attribute.buffer.componentSize;
            if (!componentSize || componentSize < 1 || componentSize > 4) throw Error("Since a valid 'componentSize' was not specified for an underlying buffer, a 'componentSize' value is required here, and should be a value from 1 to 4.");
            if (type === void 0) componentSize = ctx.enums.ArrayComponentTypes.FLOAT;
            if (normalized === void 0) normalized = false;
        }

        /**
         * Binds the pointer to the underlying attribute location.
         * This also implicitly binds the associated buffer to the 'ARRAY_BUFFER' global state in order to set the pointer.
         * If a Vertex Array Object (VAO) is bound beforehand, the buffer and pointer will be associated with it automatically.
         */
        bind(): this {
            var attr = this.attribute, ctx = attr.shader.ctx, gl = ctx.webgl, buffer = this.attribute.buffer;
            if (!gl) throw Error("WebGL not supported.");
            if (!buffer) throw Error("A buffer is required in order to set an attribute pointer for it. Call 'setBuffer()' on the attribute, or set the 'sharedBuffer' property on the shader program.");

            // ... bind the buffer to the "buffer containing vertex attributes" location ...
            buffer.bind(gl.ARRAY_BUFFER);

            // ... configure how to get data out of the buffer for this attribute position ...

            var stride = this.stride || buffer.stride || 0;
            var offset = this.offset || buffer.stride || 0;

            if (this.stride && this.stride != stride) {
                if (!this._strideMismatchError)
                    ctx.warn("You defined a pointer for attribute '" + this.attribute.name + "' (index " + this.attribute.location + ") with a stride of " + this.stride + " that does not match the stride of " + stride + " for the underlying attribute buffer.");
                this._strideMismatchError = true; // (only set the warning once in case the user wants this for some reason, otherwise things will slow down)
            } else this._strideMismatchError = false;

            // (IMPORTANT!!! Associates whatever buffer is currently *bound* to "ARRAY_BUFFER" to this attribute)
            gl.vertexAttribPointer(this.attributeLocation,
                +this.componentSize, // (number of floats)
                +this.type, // (only dealing with float types [the side of a single float is 4 bytes])
                this.normalized, // (nothing to normalize)
                stride, // (number of floats * sizeof(float32) [0 defaults to calculating based on the previous supplied arguments])
                offset // (data starts at 0 in the buffer)
            );
            if (!ctx.disableErrorChecking) ctx.throwOnError();

            this._buffer = buffer; // (keep a reference to the buffer, just like 'vertexAttribPointer()' does with the current reference in 'ARRAY_BUFFER')

            return this;
        }
    }

    /**
     * Buffers are used to manage data stores on the WebGL side (such as "arrays" of data to send to shader programs).
     */
    export class Buffer<T extends IBufferArrayType = IBufferArrayType> implements IBindable {
        private _buffer: WebGLBuffer;
        private _bufferSize: number; // (webgl buffer size, in bytes)
        private _lastTarget: number; // (the last target bound to)
        private _lastTargetID: string; // (the index key used for the target - for example, when a target binding as other binding points which need to be added as a suffix)
        private _varying: ShaderVarying; // (if set, the buffer is bound to a varying for vertex shader feedback; need to get the details from there in order to read any results)
        private _transformFeedbackIndex: number; // (set when the buffer is bound to a transform target)
        private _lastTransformFeedbackIndex: number; // (the last binding point used during the last call to 'bind()')
        private _newData: T; // (if set will be transfered to the WebGL buffer on next bind)
        private _newDataOffset: number; // (where to begin copying the source data)
        private _newCopyLength: number; // (number of items to copy to the webgl buffer)
        private _dstDataOffset: number; // (target byte offset where to begin copying data to)
        private _ofsAndLenWarning: boolean; // (do this once only)
        private _reallocate: boolean; // (if true, something changed that requires webgl buffer reallocation)

        /** A reference to the given array for the buffer's data. To change, call 'setData()'. */
        private _data: T;
        get data() { return this._newData || this._data; } // (if new data was set that is returned instead, but the previous is still remembered until replaced on bind)

        /** The WebGL buffer. */
        get buffer() { return this._buffer; }

        /** The offset to where the new data resides in the given data array. */
        readonly offset = 0;

        /** The byte offset where to begin copying data to for the underlying WebGL buffer. */
        readonly destinationOffset = 0;

        /**
         * The number of data items to copy to the underlying WebGL buffer (in case the data size is larger than the actual
         * number of items stored in it).
         * If undefined, then 'data.length' is assumed.
         * Note: Using offset greater than 0 or length less than the total data array size is only supported in WebGL 2.  Anything
         * else will required slicing the array to create a copy of sub-items before transferring it, which may be slower.
         */
        readonly length = 0;

        /**
         * Creates a new WebGL buffer.
         * @param ctx The GPU context associated with this buffer.
         * @param data The optional data array to associate with the buffer.
         * @param usage Describes how the buffer will be used. GL drivers rely on this as a hint on how to be efficient with the underlying data store.
         * @param type The type of individual components of the data array (from 'enums.ArrayComponentTypes').
         * @param componentSize Typically the size of the vector expected to receive the data. This should be 1-4 floats (vec1-vec4) per entry. Anything else is an error.
         * If a 1 is given, it is assumed a single numerical value, such as a float or int type.
         * This value can also be specified when creating pointers on attributes. Specifying it here is a handy shortcut if the buffer will only be used with pointers expecting the same component size.
         * Specifying a value when creating pointers will override this value.
         * @param stride Specifies the offset, in bytes, between the beginning of consecutive vertex attributes. Cannot be larger than 255.
         * The stride can be specified here instead of when creating attribute pointers, since the data being set is typically in an
         * expected stride format for ALL pointers.
         * For example, if the underlying buffer type is a float, and the component size is 1 (a single float), and two shader attributes
         * will be expecting float values, then the stride will be 2 - as in, increment the pointer by 2 to get to the next attribute value.
        */
        constructor(public readonly ctx: Context, public readonly usage?: UsageType, public readonly type?: ComponentType, public readonly componentSize?: ComponentSize, public readonly stride?: number) {
            if (!ctx) throw this._error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            this._bufferSize = 0;
            this.setProperties(usage, type, componentSize, stride);
        }

        private _error(msg: string) { return Error("Buffer error: " + msg); }
        private _warn(msg: string) { this.ctx.warn("Buffer warning: " + msg); }

        /**
         * Set properties for this buffer.
         * @param usage Describes how the buffer will be used. GL drivers rely on this as a hint on how to be efficient with the underlying data store.
         * @param type The type of individual components of the data array (from 'enums.ArrayComponentTypes'). This is used only as a default when defining attribute pointers.
         * @param componentSize Typically the size of the vector expected to receive the data. This should be 1-4 floats (vec1-vec4) per entry. Anything else is an error.
         * If a 1 is given, it is assumed a single numerical value, such as a float or int type.
         * This value can also be specified when creating pointers on attributes. Specifying it here is a handy shortcut if the buffer will only be used with pointers expecting the same component size.
         * Specifying a value when creating pointers will override this value.
         * @param stride Specifies the offset, in bytes, between the beginning of consecutive vertex attributes. Cannot be larger than 255.
         * The stride can be specified here instead of when creating attribute pointers, since the data being set is typically in an
         * expected stride format for ALL pointers.
         * For example, if the underlying buffer type is a float, and the component size is 1 (a single float), and two shader attributes
         * will be expecting float values, then the stride will be 2 - as in, increment the pointer by 2 to get to the next attribute value.
         */
        setProperties(usage: UsageType, type?: ComponentType, componentSize?: ComponentSize, stride?: number): this {
            if (type === void 0) type = this.type === void 0 ? this.ctx.enums.ArrayComponentTypes.FLOAT : this.type;
            else if (!(type >= 0)) throw this._error("A valid type is required (see 'enums.ComponentTypes').");

            if (stride === void 0) stride = this.stride || 0; // (keep any current setting)
            if (typeof stride != 'number' || stride < 0 || stride > 255) throw this._error("'stride' must be a numeric value from 0 to 255.");

            if (componentSize === void 0) componentSize = this.componentSize || 1; // (keep any current setting)
            if (typeof componentSize != 'number' || componentSize < 1 || componentSize > 4) throw this._error("'componentSize' must be a numeric value from 1 to 4.");

            if (this.usage != usage) this._reallocate = true; // (if a different usage is specified then it requires reallocating the buffer)

            (<{ type: ComponentType }>this).type = +type | 0; // (make sure it's an integer)
            (<{ stride: number }>this).stride = +stride | 0; // (make sure it's an integer)
            (<{ usage: UsageType }>this).usage = +usage | 0; // (make sure it's an integer)
            (<{ componentSize: ComponentSize }>this).componentSize = +componentSize | 0; // (make sure it's an integer)

            return this;
        }

        /**
         * Specify new data for this buffer. The supplied data and copy parameters are queued ONLY. They take affect next time the buffer is bound.
         * To force the new data to take affect, call 'transferData()'.
         * @param data The new data to set.  If the size is the same as before, no buffer re-allocation is required, and only the contents are copied.
         * If not specified, the previously specified data array is used, if any, otherwise an error will occur.
         * @param length The number of data items to copy to the underlying WebGL buffer (in case the data array size is larger than the actual number of items stored in it).
         * If undefined, then 'data.length' is assumed. If the 'data' parameter is undefined, the given length will become the new virtual length of any previously set buffer.
         * @param copyStartIndex The index where to begin copying from in the given data array (defaults to 0).
         * @param dstByteOffset A byte offset into the underlying WebGL buffer where the data will be copied into (defaults to 0).
         * Note: This is a BYTE offset, and not an array item index.
         * @param resize If true, the underlying WebGL buffer is resized if 'dstByteOffset+length' is less than the WebGL buffer's current length.
         * If false (the default) the WebGL buffer is not reduced in size when only given virtual 'length' is less, since no new data was given to copy.
         * Forcing a buffer to constantly resize instead of using a fixed large buffer may cause performance loss.
         */
        setData(data?: T, length?: number, copyStartIndex = 0, dstByteOffset = 0, resize = false): this {
            var usingSameData = false;

            if (!data) { data = this.data; usingSameData = true; }
            if (!data) throw this._error("The 'data' parameter is required when the 'data' property for this buffer does not yet reference an array.");

            if (copyStartIndex === void 0 || copyStartIndex === null) copyStartIndex = 0;
            if (length === void 0 || length === null) length = data.length;

            if (copyStartIndex < 0) throw this._error("'offset' cannot be less than zero.");
            if (length < 0) throw this._error("'length' cannot be less than zero.");
            if (copyStartIndex + length > data.length) throw this._error("'offset + length' is greater than 'data.length'.");

            if ((copyStartIndex > 0 || length != data.length) && !this.ctx.webgl2 && !this._ofsAndLenWarning) {
                this.ctx.warn("You've supplied an offset or length less than the array size, however WebGL 2 is not supported.  This may result in the need to copy to a temp array in order to transfer the data, which would not be as efficient.");
                this._ofsAndLenWarning = true;
            }

            if (usingSameData && copyStartIndex == this.offset && dstByteOffset == this.destinationOffset && (length == this.length || length < this.length && !resize))
                (<{ length: number }>this).length = length; // (everything is exactly the same, only the length is reduced, but no need to resend data that is only truncated [virtually])
            else {
                this._newData = data;
                this._newDataOffset = copyStartIndex;
                this._newCopyLength = length;
                this._dstDataOffset = dstByteOffset;
                if (resize && dstByteOffset + length < this._bufferSize) this._reallocate = true;
            }

            return this;
        }

        /**
         * Uploads data to the underlying WebGL buffer.
         * Data is transfered at the last possible moment so there's no need to waste time if it's never used.  This also allows for local updates until binding.
         */
        transferData() {
            if (this._newData) {
                // ... prepare for new data transfer ...
                var data = this._newData, copyOffset = this._newDataOffset, copyLength = this._newCopyLength, dstOfs = this._dstDataOffset;
            } else {
                // ... nothing new, so use existing parameters ...
                data = this._data, copyOffset = this.offset, copyLength = this.length, dstOfs = this.destinationOffset;
            }

            var ctx = this.ctx, gl = ctx.webgl1;

            // ... create a WebGL buffer if not done yet ...

            if (!this._buffer) {
                this._buffer = ctx.webgl.createBuffer();
                this._bufferSize = 0;
                if (!ctx.disableErrorChecking) ctx.throwOnError();
            }

            if (data) {
                // ... since we are transferring only when needed we may be interrupting another process that has but a binding in place, so put make sure to restore it ...

                var existingBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
                if (!ctx.disableErrorChecking) ctx.throwOnError();

                // ... bind the buffer ...

                gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
                if (!ctx.disableErrorChecking) ctx.throwOnError();

                // ... transfer the data ...

                if (dstOfs + copyLength * data.BYTES_PER_ELEMENT > this._bufferSize) this._reallocate = true;

                if (this._reallocate) {
                    // (hopefully we only need to set this the first time, then use 'bufferSubData()' every other time, which is more efficient)
                    if (copyLength == 0) // TODO: test if 0 size is allowed in most browsers when calling 'bufferData', etc.
                        gl.bufferData(gl.ARRAY_BUFFER, (<typeof Float32Array>data.constructor).of(0), +this.usage); // (note: TypeScript type cast 'typeof Float32Array' is not important, just calling 'of()' is to get the same expected type with one element since we can't set a 0 size)
                    else if (ctx.webgl2)
                        ctx.webgl2.bufferData(gl.ARRAY_BUFFER, data, +this.usage, copyOffset, copyLength);
                    else
                        if (copyOffset == 0 && copyLength == data.length)
                            gl.bufferData(gl.ARRAY_BUFFER, data, +this.usage);
                        else if (!data.slice)
                            throw this._error("When WebGL 2 is not supported, which requires the given data object to contain a 'slice()' function.");
                        else
                            gl.bufferData(gl.ARRAY_BUFFER, data.slice(copyOffset, copyLength), +this.usage);

                    this._bufferSize = copyLength * data.BYTES_PER_ELEMENT;
                    this._dstDataOffset = dstOfs = 0; // (new buffer create, so offset is always zero in this case)
                    this._reallocate = false;
                } else {
                    // ... was already allocated before ...
                    if (copyLength > 0)
                        if (copyOffset == 0 && copyLength == this._bufferSize)
                            gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
                        else
                            if (ctx.webgl2)
                                ctx.webgl2.bufferSubData(gl.ARRAY_BUFFER, dstOfs, data, copyOffset, copyLength); // TODO: (size is different so need to reallocate, but perhaps we can allow sub-copy small-to-larger buffer size?)
                            else if (!data.slice)
                                throw this._error("When WebGL 2 is not supported, which requires the given data object to contain a 'slice()' function.");
                            else
                                gl.bufferSubData(gl.ARRAY_BUFFER, dstOfs, data.slice(copyOffset, copyLength));
                }

                if (!ctx.disableErrorChecking) ctx.throwOnError();

                gl.bindBuffer(gl.ARRAY_BUFFER, existingBuffer); // (put it back [might be null, which is ok])
                if (!ctx.disableErrorChecking) ctx.throwOnError();
            }

            this._data = data;
            this._newData = null;

            if (copyOffset !== void 0) {
                (<{ offset: number }>this).offset = copyOffset || 0;
                this._newDataOffset = void 0;
            }

            if (copyLength !== void 0) {
                (<{ length: number }>this).length = copyLength || 0;
                this._newCopyLength = void 0;
            }

            if (dstOfs !== void 0) {
                (<{ destinationOffset: number }>this).destinationOffset = dstOfs || 0;
                this._dstDataOffset = void 0;
            }
        }

        /**
         * (WebGL 2) Get data from the underlying WebGL buffer. The data will be copied back into any array set when 'setData()' was last called.
         * Note: Downloading data from the GPU is usually a much slower operation than uploading it.
         * @param data (optional) An array to receive the data from the WebGL buffer.  If not specified, the one passed to the last call to 'setData()' will be used.
         */
        getData(data?: T, srcByteOffset = 0, dstOffset = 0, length?: number): this {
            var ctx = this.ctx, gl = ctx.webgl2;
            if (!gl) throw this._error("WebGL 2 is required to read data back from buffers.");
            if (!this._buffer) return this;
            this.bind(gl.COPY_READ_BUFFER);
            gl.getBufferSubData(gl.COPY_READ_BUFFER, srcByteOffset, data || this._data, dstOffset, length);
            if (!ctx.disableErrorChecking) ctx.throwOnError();
            return this;
        }

        bind(target: BufferTarget): this {
            if (typeof target != 'number') throw Error("Invalid target");

            var ctx = this.ctx, gl = ctx.webgl, gl2 = ctx.webgl2, _target = +target, targetID = '' + _target; // TODO: Validate target values.

            if (target === gl2.TRANSFORM_FEEDBACK_BUFFER && this._transformFeedbackIndex !== void 0)
                targetID = _target + "_" + this._transformFeedbackIndex;

            var boundObject: IBindable = ctx['_bindings'][targetID];

            if (boundObject != this) {
                if (boundObject) boundObject.unbind();

                // ... unbind the buffer first if it was used as a transform feedback target ...

                if (this._lastTarget && this._lastTarget == ctx.enums.BufferTargets.WebGL2.TRANSFORM_FEEDBACK_BUFFER)
                    this.unbind();

                // ... transfer data to the buffer, if not done so already ...

                if (!this._buffer || this._newData)
                    this.transferData();

                // ... finally, bind it to the requested target ...

                if (_target === gl2.TRANSFORM_FEEDBACK_BUFFER && this._transformFeedbackIndex !== void 0) {
                    gl2.bindBufferBase(_target, this._transformFeedbackIndex, this._buffer); // (note: where 'gl.bindBuffer()' binds only to index 0 of a binding point, this function can bind to multiple indexes within supported binding points)
                    if (!ctx.disableErrorChecking) ctx.throwOnError();
                    this._lastTransformFeedbackIndex = this._transformFeedbackIndex;
                }
                else {
                    gl.bindBuffer(_target, this._buffer);
                    if (!ctx.disableErrorChecking) ctx.throwOnError();
                }

                ctx['_bindings'][targetID] = this;
                this._lastTarget = _target;
                this._lastTargetID = targetID;
            }
            return this;
        }

        unbind(): this {
            var ctx = this.ctx, boundObject = ctx['_bindings'][this._lastTargetID];
            if (boundObject == this) {
                if (this._lastTransformFeedbackIndex !== void 0) {
                    ctx.webgl2.bindBufferBase(this._lastTarget, this._lastTransformFeedbackIndex, null); // (this buffer was bound to a transform target binding point and needs to be removed from there)
                    this._lastTransformFeedbackIndex = void 0;
                    this._varying = null;
                } else
                    ctx.webgl.bindBuffer(this._lastTarget, null); // (simple unbind from a global state)
                ctx['_bindings'][this._lastTargetID] = null;
                this._lastTarget = void 0;
                this._lastTargetID = void 0;
            }
            return this;
        }
    }

    export class FrameBuffer implements IBindable {
        readonly buffer: WebGLFramebuffer;
        private _readBuffer: WebGLFramebuffer; // (used for reading from framebuffer textures)
        readonly textures: WebGLTexture[];
        readonly data: Float32Array[];
        readonly attachments: number[];

        get isValid() { return this._isValid; }
        private _isValid = false;

        constructor(public readonly ctx: Context, public readonly width: number, public readonly height: number, public readonly textureCount: number) {
            if (!ctx) throw Error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            var ctx = this.ctx;
            var gl = <WebGL2RenderingContext>this.ctx.webgl;

            if (textureCount < 1)
                this.textureCount = textureCount = 1;
            else {
                var maxAttachments = ctx.maxCombinedTextures;
                if (textureCount > maxAttachments)
                    throw Error("Only " + maxAttachments + " color attachment" + (maxAttachments == 1 ? " is" : "s are") + " supported.");
            }

            this.buffer = gl.createFramebuffer();
            this._readBuffer = gl.createFramebuffer();

            // ... make this frame buffer active in the context ...

            gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);

            // ... create the frame buffer textures ...

            this.textures = [];
            this.data = [];
            this.attachments = [];
            var attachmentIndex = 0;
            while (textureCount-- > 0) {
                // ... create texture ...
                var t = gl.createTexture();
                this.textures.push(t);
                this.data.push(new Int32Array(width * height));
                if (!ctx.disableErrorChecking) ctx.throwOnError();
                gl.bindTexture(gl.TEXTURE_2D, t); // (bind the texture to the unit)
                if (!ctx.disableErrorChecking) ctx.throwOnError();
                // ... set the filtering so we don't need mips ...
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
                // ... define the size and format of texture at mipmap level 0 ...
                if (ctx.isWebGL1Supported)
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.FLOAT, null /* no data; this will receive it */);
                else
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.width, this.height, 0, gl.RGBA, gl.FLOAT, null /* no data; this will receive it */);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
                // ... bind it to the frame buffer ...
                var attachmentConst = gl['COLOR_ATTACHMENT' + attachmentIndex++];
                this.attachments.push(attachmentConst);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, // (https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferTexture2D)
                    attachmentConst, // (attaches the texture to the framebuffer's color buffer)
                    gl.TEXTURE_2D, t, 0 /* mipmap level [must be 0 in this case] */);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
            }

            gl.bindTexture(gl.TEXTURE_2D, null); // (always unset the global state when done just in case)

            // ... let the frame buffer know the texture attachments we are using ...

            gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
            gl.drawBuffers(this.attachments);
            if (!ctx.disableErrorChecking) ctx.throwOnError();
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            var errMsg = this.checkComplete();
            if (errMsg) {
                throw Error(errMsg);
                //?ctx['_gpuAccelerationReady'] = false;
            }
            else ctx.log("Frame buffer initialized");

            ctx.log(this);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null); // (always unset the global state when done just in case)
        }

        checkComplete(): string {
            this._isValid = false;
            var gl = this.ctx.webgl;
            if (!gl.isFramebuffer(this.buffer)) return "Framebuffer is not valid.";
            var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            switch (status) {
                case gl.FRAMEBUFFER_COMPLETE: this._isValid = true; return void 0;
                case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT: return "Not all framebuffer attachment points are framebuffer attachment complete.";
                // Not all framebuffer attachment points are framebuffer attachment complete.This means that at least one attachment point with
                // a renderbuffer or texture attached has its attached object no longer in existence or has an attached image with a width or height
                // of zero, or the color attachment point has a non-color-renderable image attached, or the depth attachment point has a
                // non-depth-renderable image attached, or the stencil attachment point has a non-stencil-renderable image attached.
                case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS: return "Not all attached images have the same width and height.";
                case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: return "No images are attached to the framebuffer.";
                case gl.FRAMEBUFFER_UNSUPPORTED: return "The combination of internal formats of the attached images violates an implementation-dependent set of restrictions.";
            }
        }

        /**
         * Copy values to one of the texture buffers.
         * @param data The data to update with.
         */
        updateTextureData(data: Float32Array, index: number): this {
            var ctx = this.ctx;
            var gl = ctx.webgl;
            if (index < 0)
                throw Error("'index' cannot be less than 0.");
            if (index >= this.textures.length)
                throw Error("'index' is out of bounds - the number of inputs is " + this.textures.length + ".");
            gl.bindTexture(gl.TEXTURE_2D, this.textures[index]);
            if (!ctx.disableErrorChecking) ctx.throwOnError();
            if (ctx.isWebGL1Supported)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.FLOAT, data);
            else
                gl.texImage2D(gl.TEXTURE_2D, 0, ctx.webgl2.RGBA32F, this.width, this.height, 0, gl.RGBA, gl.FLOAT, data); //? Or copyTexImage2D?
            if (!ctx.disableErrorChecking) ctx.throwOnError();
            gl.bindTexture(gl.TEXTURE_2D, null); // (always unset the global state when done, just in case)
            return this;
        }

        testBuffer: WebGLBuffer;

        /**
         * Copy values from one of the texture buffers.
         * @param data An array to receive the data.
         */
        getTextureData(data: Float32Array, index: number): this {
            var ctx = this.ctx;
            var gl = ctx.webgl;
            if (index < 0)
                throw Error("'index' cannot be less than 0.");
            if (index >= this.textures.length)
                throw Error("'index' is out of bounds - the number of inputs is " + this.textures.length + ".");

            // ... need to bind the texture to another framebuffer for reading (otherwise it will read combined results) ...

            if (ctx.isWebGL2Supported) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
                var attachmentConst = gl['COLOR_ATTACHMENT' + index];
                ctx.webgl2.readBuffer(attachmentConst);
                ctx.throwOnError();

                //if (!this.testBuffer) {
                //    this.testBuffer = gl.createBuffer();
                //    gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.testBuffer);
                //    gl.bufferData(gl.PIXEL_PACK_BUFFER, this.width * this.height * 4 * 4, gl.DYNAMIC_READ);
                //}
                //else gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.testBuffer);
                //ctx.throwOnError();

                //var canRead = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE);
                //if (canRead) {
                ctx.webgl2.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.FLOAT, data);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
                //gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, data);
                //ctx.throwOnError();
                //}
            } else {
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
                gl.activeTexture(gl['TEXTURE' + index]); // (active a texture unit)
                if (!ctx.disableErrorChecking) ctx.throwOnError();

                gl.bindTexture(gl.TEXTURE_2D, this.textures[index]);
                if (!ctx.disableErrorChecking) ctx.throwOnError();

                //var canRead = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE);
                //if (canRead) {
                ctx.webgl1.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.FLOAT, data);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
                //}

                // ... put the texture back? ...

                //gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
                //var attachmentConst = gl['COLOR_ATTACHMENT' + index];
                //this.attachments.push(attachmentConst);
                //gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentConst, gl.TEXTURE_2D, t, 0);
                //ctx.throwOnError();

                gl.bindTexture(gl.TEXTURE_2D, null); // (always unset the global state when done, just in case)
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            return this;
        }

        bind(): this {
            var ctx = this.ctx;
            var gl = ctx.webgl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
            if (!ctx.disableErrorChecking) ctx.throwOnError();
            //? gl.clear(gl.COLOR_BUFFER_BIT); // (how to clear)
            return this;
        }

        unbind(): this {
            var gl = this.ctx.webgl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            return this;
        }
    }

    export class ShaderProgram implements IBindable {
        private _vertCode: string;
        private _vertShader: WebGLShader;
        private _fragCode: string;
        private _fragShader: WebGLShader;
        private _built: boolean;
        private _disableRasterizer: boolean;
        private _disableRasterizer_Warning: boolean; // (one time warning that '_disableRasterizer' perhaps should be set)
        private _feedbackBufferMode: number;
        private _attributesBound: boolean; // (true if something requires attributes to re-bind their configurations)
        private _uniformsBound: boolean; // (true if uniforms needs updating also)
        private _varyingsBound: boolean; // (true if varyings need updating)

        readonly program: WebGLProgram;

        /** A list of attributes to use when executing the shader. */
        attributes: ShaderAttribute[] & { [internalname: string]: ShaderAttribute };
        /** Get a single attribute by name. If the attribute doesn't exist (perhaps the compiler optimized it out) then 'undefined' is returned. */
        attribute(name: string) { return this.attributes['$' + name]; }

        /** A list of uniforms to use when executing the shader. */
        uniforms: ShaderUniform[] & { [internalname: string]: ShaderUniform };
        /** Get a single uniform by name. If the uniform doesn't exist (perhaps the compiler optimized it out) then 'undefined' is returned. */
        uniform(name: string) { return this.uniforms['$' + name]; }

        /** A list of varyings, if any, given when building the shader program. */
        varyings: ShaderVarying[] & { [internalname: string]: ShaderVarying };
        /** Get a single varying (transform output) by name. */
        varying(name: string) { return this.varyings['$' + name]; }

        /** An interleaved data buffer that can be shared by multiple attributes. Setting this means not having to set the same buffer for every attribute.
        * If every attribute reads from a different buffer, then this setting is not very useful.
        * Setting a buffer on an attribute overrides this reference.
        */
        get sharedBuffer() { return this._sharedBuffer; }
        set sharedBuffer(b: Buffer) {
            if (b.ctx != this.ctx)
                throw this._error("Cannot assign a buffer from a different context.  This is mainly a restriction on the WebGL side, where each context must manage it's own separate resources.");
            this._sharedBuffer = b;
        }
        private _sharedBuffer: Buffer;

        /** (WebL 2) When rendering with transform feedback, this is the buffer to receive the results. */
        get feedbackBuffer() { return this._feedbackBuffer; }
        set feedbackBuffer(b: Buffer) {
            if (b.ctx != this.ctx)
                throw this._error("Cannot assign a buffer from a different context.  This is mainly a restriction on the WebGL side, where each context must manage it's own separate resources.");
            this._feedbackBuffer = b;
        }
        private _feedbackBuffer: Buffer;

        constructor(public readonly ctx: Context) {
            if (!ctx) throw this._error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            if (!ctx.webgl) throw this._error("WebGL is not supported.");
            this.program = ctx.webgl.createProgram();
        }

        private _error(msg: string) { return Error("Shader program error: " + msg); }
        private _warn(msg: string) { this.ctx.warn("Shader program warning: " + msg); }

        setVertexCode(code: string | string[]): this {
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
        }

        setFragmentCode(code: string | string[]): this {
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
        }

        /**
         * Compile and link the shader code.  Any attributes and uniforms found will be detected and updated locally.
         * Any shader compiling errors will be dumped to the console with line numbers for easier debugging.
         * @param keepShaderObjects If false (default) the shader objects and deleted and only the shader program is left after building.
         * @param feedbackBufferMode (WebGL 2) A 'enum.FeedbackModes' value specifying the mode to use when capturing the varying variables; either 'INTERLEAVED_ATTRIBS' or 'SEPARATE_ATTRIBS'.
         * Should be undefined, unless 'feedbackVaryings' values are specified.
         * @param feedbackVaryings (WebGL 2) An optional list of outputs that should be linked when using transform feedback buffers.
         * If not specified, the linker will treat all 'out' declarations as inputs for the fragment shader instead of outputs targeting feedback buffers.
         */
        build(keepShaderObjects = false, feedbackBufferMode?: FeedbackMode, ...feedbackVaryings: (string | ShaderVarying)[]): this { // TODO: create 'feedbackBufferMode' enums.
            if (this._built) return;

            var ctx = this.ctx;
            var gl = ctx.webgl;

            // (intro: https://www.opengl.org/sdk/docs/tutorials/ClockworkCoders/index.php)
            // (uniforms: https://www.opengl.org/sdk/docs/tutorials/ClockworkCoders/uniform.php)
            // (attributes: https://www.opengl.org/sdk/docs/tutorials/ClockworkCoders/attributes.php)
            // (varyings: https://www.opengl.org/sdk/docs/tutorials/ClockworkCoders/varying.php)

            // ... compile and link the shader code, and report any errors ...

            if (!this._vertShader)
                this._vertShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(this._vertShader, this._vertCode);
            gl.compileShader(this._vertShader);
            // ... check compile status ...
            if (!gl.getShaderParameter(this._vertShader, gl.COMPILE_STATUS)) {
                var errMsg = "Vertex Shader Compiler Error: " + gl.getShaderInfoLog(this._vertShader);

                var lines = this._vertCode.split("\n"); // (show the line numbers)
                for (var i = 0; i < lines.length; ++i)
                    lines[i] = (1 + i) + ". " + lines[i];

                throw this._error(errMsg + "\r\n" + lines.join("\n"));
            }
            // ... attach compiled shader ...
            gl.attachShader(this.program, this._vertShader);

            if (!this._fragShader)
                this._fragShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(this._fragShader, this._fragCode);
            gl.compileShader(this._fragShader);
            // ... check compile status ...
            if (!gl.getShaderParameter(this._fragShader, gl.COMPILE_STATUS)) {
                var errMsg = "Fragment Shader Compiler Error: " + gl.getShaderInfoLog(this._fragShader);

                var lines = this._fragCode.split("\n"); // (show the line numbers)
                for (var i = 0; i < lines.length; ++i)
                    lines[i] = (1 + i) + ". " + lines[i];

                throw this._error(errMsg + "\r\n" + lines.join("\n"));
            }
            // ... attach compiled shader ...
            gl.attachShader(this.program, this._fragShader);

            // ... before linking we need to specify the vertex shader varyings, if any ...

            if (feedbackBufferMode) {
                if (!ctx.isWebGL2Supported) throw this._error("Vertex transform feedback is only in WebGL 2+.");

                if (!feedbackVaryings || !feedbackVaryings.length)
                    throw this._error("If you specify a feedback mode you must also specify a list of varyings (outputs) expected from the vertex shader.");

                this._feedbackBufferMode = +feedbackBufferMode; // (needs to be first to prevent warnings during 'new ShaderVarying()')

                var tfbvaryings: string[] = []; // (need a proper array of strings to use when calling 'transformFeedbackVaryings()')

                // ... init/reset the local varyings list ...

                if (!this.varyings)
                    this.varyings = <any>[];
                else if (this.varyings.length > 0)
                    this.varyings.length = 0;

                // ... process the given varyings in the "rest" param ...

                for (var i = 0, n = feedbackVaryings.length; i < n; ++i) {
                    var fbvarying = feedbackVaryings[i];
                    var v = fbvarying instanceof ShaderVarying ? fbvarying : new ShaderVarying(this, i, fbvarying);
                    this.varyings.push(v);
                    this.varyings['$' + v.name] = v;
                    tfbvaryings.push(v.name);
                }

                ctx.webgl2.transformFeedbackVaryings(this.program, tfbvaryings, +feedbackBufferMode);
                if (!ctx.disableErrorChecking) ctx.throwOnError();
            }
            else if (feedbackVaryings && feedbackVaryings.length)
                throw this._error("If you specify a list of varyings (outputs) you must also specify a feedback mode.");

            // ... attach and link Shaders to the shader program ...

            gl.linkProgram(this.program);
            // ... check link status ...
            if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
                var errMsg = "Shader Linking Error: " + gl.getProgramInfoLog(this.program);
                this.ctx.log(errMsg);
                throw this._error(errMsg);
            }

            // ... detect attributes and uniforms ...

            if (!this.attributes)
                this.attributes = <any>[];
            else {
                for (var i = 0, n = this.attributes.length; i < n; ++i)
                    this.attributes[i].unbind();
                this.attributes.length = 0;
            }
            if (!this.uniforms)
                this.uniforms = <any>[];
            else {
                for (var i = 0, n = this.uniforms.length; i < n; ++i)
                    this.uniforms[i].unbind();
                this.uniforms.length = 0;
            }

            var prog = this.program, attribCount: number = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);

            for (var i = 0, n = attribCount; i < n; ++i) {
                var info = gl.getActiveAttrib(prog, i);
                var aLocation = gl.getAttribLocation(prog, info.name); // (the attribute location is not the same as it's index)
                var a = new ShaderAttribute(this, aLocation, info);
                this.attributes.push(a);
                this.attributes['$' + a.name] = a;
            }

            var uniformCount: number = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
            for (var i = 0, n = uniformCount; i < n; ++i) {
                var info = gl.getActiveUniform(prog, i);
                var uLocation = gl.getUniformLocation(prog, info.name); // (the uniform location is not the same as it's index)
                var u = new ShaderUniform(this, uLocation, info);
                this.uniforms.push(u);
                this.uniforms['$' + u.name] = u;
            }

            if (!keepShaderObjects)
                this.disposeShaders();

            this._built = true;

            return this;
        }

        /**
         * Dispose only the shader objects - good to do after compiling if no longer needed for recompiling.
         */
        disposeShaders(): this {
            if (this._vertShader) {
                this.ctx.webgl.deleteShader(this._vertShader);
                this._vertShader = void 0;
            }
            if (this._fragShader) {
                this.ctx.webgl.deleteShader(this._fragShader);
                this._fragShader = void 0;
            }
            return this;
        }

        /**
         * Deletes the shader program and any associated shader objects.
         */
        dispose(): void {
            this.disposeShaders();
            this.unbind();
            if (this.program) {
                this.ctx.webgl.deleteProgram(this.program);
                (<{ program: object }>this).program = null;
            }
        }

        ///**
        //* Set an attribute to get it ready to be sent to the shader.
        //* @param name The name of the attribute expected by the shader.
        //* @param buffer The buffer to attach to the attribute for processing.
        //*/
        //?setAttribute(name: string, buffer: Buffer<IBufferArrayType>): this {
        //    if (!this.program) {
        //        var msg = this.ctx.error("A shader program must be compiled and linked before this function can be called;  Call 'compileScripts()' first.");
        //        throw this._error(msg);
        //    }
        //    var attr = this.attributes['$' + name];
        //    if (!attr) {
        //        var msg = this.ctx.error("The attribute '" + name + "' does not exist on the shader program.");
        //        throw this._error(msg);
        //    }
        //    attr.buffer = buffer;
        //    return this;
        //}

        /**
         * Set a uniform value to send to the shader.
         * @param name The name of the uniform identifier expected by the shader.
         * @param value The value to set for the uniform identifier in the shader.
         * @param required If no uniform exists (perhaps the driver optimized it out) then normally an exception will be thrown.  Set this to false to ignore missing uniforms.
         * By default all uniforms are assumed to be required. This serves to help prevent running a program with incorrectly named uniforms.
         */
        setUniform(name: string, value: number, required = true): this {
            if (!this.program)
                throw this._error("A shader program must be compiled and linked before this function can be called;  Call 'compileScripts()' first.");
            var u = this.uniforms['$' + name];
            if (u) u.value = value;
            else if (required)
                throw this._error("The uniform '" + name + "' does not exist on the shader program. It could be the webgl driver optimized out unused uniforms.  Check that this uniform is actually being used.");
            return this;
        }

        /**
         * Disable the rasterization process involving fragment shaders when rendering with this program.
         * It's typically used with vertex feedback buffers on shader programs that do not render any color outputs, which helps speed things up.
         */
        disableRasterizer(): this {
            var ctx = this.ctx;
            if (!ctx.webgl2) throw this._error("'disableRasterizer' is only supported in WebGL 2+.")
            this._disableRasterizer = true;
            return this;
        }

        /**
        * Enable the rasterization process involving fragment shaders when rendering with this program.
        * It's enabled by default so there's no need to call this unless 'disableRasterizer()' was called previously.
        */
        enableRasterizer(): this {
            var ctx = this.ctx;
            if (!ctx.webgl2) throw this._error("'disableRasterizer' is only supported in WebGL 2+.")
            this._disableRasterizer = false;
            return this;
        }

        /**
         * Swap the shared buffer and the feedback buffer.
         * This is a convenient way to reprocess transformed data as input.
         */
        swapBuffers(): this {
            // ... make sure the buffers are not bound ...

            if (!this._sharedBuffer) throw this._error("There is no shared buffer to swap with.");
            if (!this._feedbackBuffer) throw this._error("There is no feedback buffer to swap with.");

            if (this._sharedBuffer.stride != this._feedbackBuffer.stride)
                throw this._error("Cannot swap buffers with different strides.");

            this._sharedBuffer.unbind();
            this._feedbackBuffer.unbind();

            var tmp = this._sharedBuffer;
            this._sharedBuffer = this._feedbackBuffer;
            this._feedbackBuffer = tmp;

            // ... make sure varyings and attributes rebind so the buffer references get updated ...

            this._varyingsBound = false;
            this._attributesBound = false;

            return this;
        }

        /**
         * Bind this shader program for rendering.
         */
        bind(): this {
            var ctx = this.ctx, gl = ctx.webgl, boundObject = ctx['_bindings']["SHADER"];

            if (boundObject != this) {
                if (boundObject) boundObject.unbind();

                gl.useProgram(this.program);

                ctx['_bindings']["SHADER"] = this;
            }

            // ... bind the feedback buffer if set (any registered transform varyings of the vertex shader will be written here) ...

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

            // ... bind the attributes, if any ...

            if (!this._attributesBound && this.attributes && this.attributes.length) {
                for (var i = 0, n = this.attributes.length; i < n; ++i) {
                    var a = this.attributes[i];
                    a.bind();
                }
                this._attributesBound = true;
            }

            // ... bind the uniforms, if any ...

            if (!this._uniformsBound && this.uniforms && this.uniforms.length) {
                for (var i = 0, n = this.uniforms.length; i < n; ++i) {
                    var u = this.uniforms[i];
                    u.bind(); // TODO: Uniforms and attributes needs to refresh if the sh
                }
                this._uniformsBound = true;
            }

            if (ctx.webgl2)
                if (this._disableRasterizer === true) // (make sure it is explicitly set)
                    ctx.enableRenderOptions(ctx.webgl2.RASTERIZER_DISCARD);
                else if (ctx._globalOptionStates[ctx.webgl2.RASTERIZER_DISCARD]) // ... else ALWAYS disable it if enabled, just in case, otherwise many shaders won't show anything ...
                    ctx.disableRenderOptions(ctx.webgl2.RASTERIZER_DISCARD);

            return this;
        }

        /**
         * Unbinds the shader program and disables the attributes.
         */
        unbind(): this {
            var ctx = this.ctx, gl = ctx.webgl, boundObject = ctx['_bindings']["SHADER"];
            if (boundObject == this) {

                if (this.attributes)
                    for (var i = 0, n = this.attributes.length; i < n; ++i)
                        if (this.attributes[i].location >= 0)
                            this.attributes[i].unbind();

                if (this.varyings)
                    for (var i = 0, n = this.varyings.length; i < n; ++i)
                        this.varyings[i].unbind(); // (these are usually bound to feedback buffer binding points and need to be unset)

                if (ctx.webgl2 && this._disableRasterizer === true) // (make sure it was explicitly set)
                    ctx.disableRenderOptions(ctx.webgl2.RASTERIZER_DISCARD); // (always disable this just in case - should only be on if requested on a shader [it's a special case])

                gl.useProgram(null);
                ctx['_bindings']["SHADER"] = null;
                this._varyingsBound = false;
                this._attributesBound = false;
                this._uniformsBound = false;
            }
            return this;
        }
    }

    export class VertexArrayObject { // https://gpfault.net/posts/webgl2-particles.txt.html; https://www.opengl.org/discussion_boards/showthread.php/185088-Vertex-Array-Object-vs-Vertex-Buffer-Object
        // Specifically, the state stored in a VAO is, for each vertex array:
        //    The size, type, stride, and normalized flag as set by glVertexAttribPointer.
        //        The "pointer" (i.e.offset) as set by glVertexAttribPointer.
        //The buffer holding the data, i.e.that bound to GL_ARRAY_BUFFER at the time of the last glVertexAttribPointer call.
        //Whether the array contains integers (glVertexAttribIPointer) or fixed/ floating point values (glVertexAttribPointer).
        //the divisor, as set by glVertexAttribDivisor.
        //whether the array is enabled (glEnableVertexAttribArray, glDisableVertexAttribArray).
        //In addition to the above per- array data, the buffer currently bound to GL_ELEMENT_ARRAY_BUFFER is stored in the VAO.

        vertex_arrays: Buffer<IBufferArrayType>[];

        constructor(public readonly ctx: Context) {
            if (!ctx) throw Error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
        }

        /**
         * 
         * @param buffer
         * @param attribute
         */
        addBuffer(buffer: Buffer<IBufferArrayType>, attribute?: ShaderAttribute): this {
            var ctx = this.ctx, gl = ctx.webgl;
            return this;
        }
    }

    /**
     * A root wrapper class for working with WebGL.
     */
    export class Context {
        /** If WebGL is supported, this will contain a structured layout of supported WebGL enums to be used for the GPU instance. */
        readonly enums: GLEnums;

        readonly _globalOptionStates: { [enumValue: number]: boolean } = {};

        /** Keeps track of objects bound to various target points. This helps to make sure the same object isn't bound more than once unnecessarily. */
        private _bindings: { [enumValue: number]: IBindable } = {};

        private _canvas: HTMLCanvasElement;
        private _fullscreenQuad = {
            componentSize: 3, // (3 floats)
            vertices: new Float32Array([
                -1.0, -1.0, 0.0,
                1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, 1.0, 0.0,
            ])
        };

        /** Set for both WebGL 1 and WebGL 2. Undefined if WebGL is supported. This is handy to access functions and properties the same in both contexts.
        * Warning: Change states directly on this context may put the wrapper out of sync with the expected states, which are cached locally for efficiency.
        * Please use the functions on the wrapper context and associated objects instead of directly via this reference whenever possible.  It is ok, however,
        * to reference the enums on these for use within this system.
        */
        readonly webgl: WebGLRenderingContext | WebGL2RenderingContext;

        /** Set if in WebGL 1 mode, otherwise this is undefined. This is handy to reference WebGL-1-only specific properties and function signatures.
        * Warning: Change states directly on this context may put the wrapper out of sync with the expected states, which are cached locally for efficiency.
        * Please use the functions on the wrapper context and associated objects instead of directly via this reference whenever possible.  It is ok, however,
        * to reference the enums on these for use within this system.
        */
        readonly webgl1: WebGLRenderingContext;

        /** Set if in WebGL 2 (or above) mode, otherwise this is undefined. This is handy to reference WebGL 2 specific properties and function signatures.
        * Warning: Change states directly on this context may put the wrapper out of sync with the expected states, which are cached locally for efficiency.
        * Please use the functions on the wrapper context and associated objects instead of directly via this reference whenever possible.  It is ok, however,
        * to reference the enums on these for use within this system.
        */
        readonly webgl2: WebGL2RenderingContext;

        /** Returns true if the WebGL1 context is supported, otherwise returns false. */
        get isWebGL1Supported() { return this._WebGL1Supported; }
        private _WebGL1Supported: boolean;

        /** Returns true if the WebGL2 context is supported, otherwise returns false. */
        get isWebGL2Supported() { return this._WebGL2Supported; }
        private _WebGL2Supported: boolean;

        /** Returns true ANY WebGL context is supported, otherwise returns false. */
        get isWebGLSupported() { return this._WebGL1Supported || this._WebGL2Supported; }

        /** The maximum value that width and hight can be. For (Width,Height) it can only be (MAX,1), (1,MAX), or (MAX,MAX).*/
        get maxTextureDimension() { return this.webgl.getParameter(this.webgl.MAX_TEXTURE_SIZE); } // (note: https://stackoverflow.com/questions/29975743/is-it-possible-to-use-webgl-max-texture-size)

        readonly webGLVersion: string;
        readonly webGLSLVersion: string;
        readonly webGLVendor: string;

        readonly maxCombinedTextures: number;
        readonly maxFeedbackBuffers: number;
        readonly maxUniformBuffers: number;

        /** The function to receive all logging messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.log' object. */
        log = function (message?: any, ...optionalParams: any[]): string { return console.log.apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : ""; };
        /** The function to receive all informational messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.info' object. */
        info = function (message?: any, ...optionalParams: any[]): string { return (console.info || console.log).apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : ""; };
        /** The function to receive all debug messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.debug' object. */
        debug = function (message?: any, ...optionalParams: any[]): string { return (console.debug || console.info || console.log).apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : ""; };
        /** The function to receive all warning messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.warn' object. */
        warn = function (message?: any, ...optionalParams: any[]): string { return (console.warn || console.log).apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : ""; };
        /** The function to receive all error messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.error' object.
        * If exceptions are desired then substitute your own function here and throw the messages instead.
        */
        error = function (message?: any, ...optionalParams: any[]): string { return (console.error || console.warn || console.log).apply(console, arguments), message !== void 0 && message !== null ? ((optionalParams = optionalParams || []).push(message), optionalParams.join(" ")) : ""; };

        /** If true disables the error checking, which can speed things up during production releases (default is false). */
        disableErrorChecking = false;
        /** On a successful first render, the 'disableErrorChecking' property will be set to 'true' automatically to speed
        * things up (error checking can lower performance a bit). Default is true.
        */
        disableErrorCheckingOnSuccessfulRender = true;

        /**
         * Creates an instance of the WebGLJS WebGL Context wrapper.
         * @param owner An optional owner to keep track of where this instance belongs.
         * @param canvasWidth The width of the canvas to create.
         * @param canvasHeight The height of the canvas to create.
         * @param canvas An optional HTMLCanvasElement instance to use for the WebGL context.  If not specified, one will be created.
         */
        constructor(public owner?: object, public canvasWidth?: number, public canvasHeight?: number, public readonly canvas?: HTMLCanvasElement) {
            this.log("Creating new WebGL wrapper context ...");

            if (canvas === void 0 || canvas === null) canvas = document.createElement("canvas");
            if (!(canvas instanceof HTMLCanvasElement)) throw Error("'canvas' is not an HTMLCanvasElement object.");

            if (typeof canvasWidth != 'number')
                canvasWidth = canvas.width;
            else
                canvas.width = canvasWidth;

            if (typeof canvasHeight != 'number')
                canvasHeight = canvas.height;
            else
                canvas.height = canvasHeight;

            if (!(canvasWidth > 0)) throw Error("No valid canvas width is defined.");
            if (!(canvasHeight > 0)) throw Error("No valid canvas height is defined.");

            this._canvas = canvas;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;

            this.log("Canvas width and height: " + canvasWidth + "x" + canvasHeight);

            var gl: WebGLRenderingContext | WebGL2RenderingContext;

            if (canvas) {
                gl = canvas.getContext("webgl2"); // (get a webgl2 context if possible)
                if (gl) {
                    this.log("WebGL 2 is supported.");
                    this._WebGL2Supported = true;
                    this.webgl2 = <WebGL2RenderingContext>gl;
                    this.webgl1 = <WebGLRenderingContext>gl; // (since it's backwards compatible for the most part)
                } else {
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
                } else
                    this.warn("Unable to get a WebGL 1 or 2 context as it seems it is not supported in this browser.");
            }
            else this.warn("Unable to get a WebGL context as it seems your browser does not support the canvas element.");

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
            } else {
                this.webGLVersion = "WebGL Not Supported";
                this.webGLSLVersion = this.webGLVersion;
                this.webGLVendor = this.webGLVersion;
            }

            if (this.isWebGLSupported) {
                this.info("Supported WebGL extensions in this context: " + this.getSupportedExtensions().join(", "));
                gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
                this.throwOnError();
                gl.clearColor(0.0, 0.0, 0.0, 1.0); // (just sets the clear color)
                this.throwOnError();
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT); // (clear it for the first time, just in case; note: this is one bit for each buffer type to clear: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear)
                this.throwOnError();
            }
        }

        createQuad(): Buffer {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            return this.createBuffer()
                .setProperties(this.enums.UsageTypes.STATIC_DRAW, this.enums.ArrayComponentTypes.FLOAT, this.enums.ArrayComponentSizes.Three)
                .setData(this._fullscreenQuad.vertices);
        }

        /**
         * Enabled a WebGL extension to be used for this context.
         * @param name A supported extension for the context being used.
         */
        enabledExtension<K extends keyof ExtensionsMap>(name: K, required = true): ExtensionsMap[K] { // (https://www.khronos.org/registry/webgl/extensions/)
            if (!this.webgl) throw Error("WebGL is not supported.");
            var gl = this.webgl;
            var ext = gl.getExtension(name); // (these are enabled by default on 2.0; also, many constants are moved into the render context)
            if (!ext)
                if (required) throw Error("The WebGL extension '" + name + "' is not supported in the current context.");
                else return null;
            // ... merge extension constants and functions into the global rendering context ...
            var prefix = name.split("_")[0];
            for (var p in ext)
                if (p.slice(-1 - prefix.length).toLocaleUpperCase() == "_" + prefix)
                    gl[p] = ext[p = p.slice(0, -4)];
                else if (p.slice(-prefix.length).toLocaleUpperCase() == prefix)
                    gl[p] = ext[p = p.slice(0, -3)];
            return ext;
        }

        /**
         * Get a list of supported extensions by this browser.
         */
        getSupportedExtensions(): string[] {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            return this.webgl.getSupportedExtensions();
        }

        /**
         * Updates the local render options list and other states with the current WebGL context states.
         * Normally this call is not required; however, if manipulating the WebGL context externally this call may be required.
         * States are cached in the current GPU instance for faster lookups to increase efficiency. It is not advised to
         * change states outside of the GPU class functions.
         */
        updateStateFromWebGLContext(): this {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            var gl = this.webgl;
            for (var p in this.enums.RenderOptions)
                if (typeof this.enums.RenderOptions[p] == 'number') {
                    this._globalOptionStates[p] = gl.isEnabled(this.enums.RenderOptions[p]);
                    if (gl.getError() != gl.NO_ERROR) this._globalOptionStates[p] = void 0; // (error set for unsupported settings, so set to undefined)
                }
            for (var p in this.enums.RenderOptions.WebGL2)
                if (typeof this.enums.RenderOptions.WebGL2[p] == 'number') {
                    this._globalOptionStates[p] = gl.isEnabled(this.enums.RenderOptions.WebGL2[p]);
                    if (gl.getError() != gl.NO_ERROR) this._globalOptionStates[p] = void 0; // (error set for unsupported settings, so set to undefined)
                }
            return this;
        }

        /**
         * Enable some render options.
         * @param options One or more options to enable.
         */
        enableRenderOptions(...options: RenderOption[]): this {
            if (options) {
                var gl = this.webgl;
                for (var i = options.length - 1; i >= 0; --i) {
                    var optionEnum = +options[i];
                    this._globalOptionStates[optionEnum] = true; // TODO: Test if it's better to leave as is, or not call into the GL.
                    gl.enable(+options[i]);
                }
            }
            return this;
        }

        /**
         * Disable some render options.
         * @param options One or more options to disable.
         */
        disableRenderOptions(...options: RenderOption[]): this {
            if (options) {
                var gl = this.webgl;
                for (var i = options.length - 1; i >= 0; --i) {
                    var optionEnum = +options[i];
                    this._globalOptionStates[optionEnum] = false; // TODO: Test if it's better to leave as is, or not call into the GL.
                    gl.disable(+options[i]);
                }
            }
            return this;
        }

        /**
         * Returns whether or not the given render option is enabled.
         * This method relies on a local list of states to track for the current context.  As such, if any render options are
         * changed directly in the underlying canvas 'webgl' context, 'updateStateFromWebGLContext()' needs to be called to
         * sync those options with this wrapper instance.  Keeping options local means a fast array lookup instead of a
         * function call to get options (which can also trigger errors if the option is invalid).
         * @param optionEnum The option to lookup.
         */
        isEnabled(optionEnum: RenderOption): boolean {
            return this._globalOptionStates[+optionEnum] || false; // ('|| false' in case the code is invalid)
        }

        /**
         * Creates and returns a new shader object for use in the current context.
         */
        createShader(): ShaderProgram {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            return new ShaderProgram(this);
        }

        /**
        * Creates and returns a new WebGL buffer wrapper.
        * Use 'setProperties()' and 'setData()' on the returned object to setup the buffer.
        */
        createBuffer<T extends IBufferArrayType>(): Buffer<T> {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");
            return new Buffer(this);
        }

        /**
         * Renders the given shader program.
         * It is assumed the shader attributes and uniform values are already set before calling this function.
         * @param shaderProgram The shader program to use for rendering.
         * @param mode The type of rendering mode.  This is one of the 'enums.PrimitiveTypeModes' values. The default is 'TRIANGLES' mode.
         * @param start The first item to render.  This is the first item to begin rendering. If using element indexes, this is
         * the first index position, otherwise this is multiplied by 'stride' by WebGL to select the first item to render.
         * @param count The number of items to render.  This is typically 'buffer length / buffer stride'.
         */
        render(shaderProgram: ShaderProgram, mode?: PrimitiveTypeMode, start = 0, count?: number): this {
            if (!this.isWebGLSupported)
                throw Error("WebGL is not supported.");

            if (!shaderProgram)
                throw Error("A shader program is required to process this input.");

            var gl = this.webgl, gl2 = this.webgl2;

            if (shaderProgram.ctx != this)
                throw this.error("The given shader program was not created by this GPU processor context.");

            if (!shaderProgram['_built'])
                shaderProgram.build();

            // ... select the shader and run it ...

            shaderProgram.bind(); // (will only bind if not already bound)

            if (mode === void 0)
                if (shaderProgram['_feedbackBuffer'] && shaderProgram['_disableRasterizer'])
                    mode = gl.POINTS; // (default to this for feedback processing without rasterization)
                else
                    mode = gl.TRIANGLES; // (default to this for normal rendering)

            if (count == void 0) {
                // ... try to assume this based on the shader setup ...
                var attribute = shaderProgram.attributes[0];
                if (!attribute) throw Error("'count' is required - could not be detected as there are no attributes in the specified shader program (is it built yet?).");
                var buffer = attribute.buffer;
                count = buffer.data.length / (buffer.stride || attribute.pointer && attribute.pointer.stride || 1);
            }

            if (shaderProgram['_feedbackBuffer'] && gl2) {
                //?if (!this._bindings[gl2.TRANSFORM_FEEDBACK_BUFFER + "_0"]) // All feedback buffer binding indices that have outputs assigned to the by the current program must have valid bindings. If they do not, 'beginTransformFeedback()' will fail with an OpenGL Error.
                //    throw Error("If using feedback buffers at least one has to be bound first.");

                gl2.beginTransformFeedback(+mode);
                if (!this.disableErrorChecking) this.throwOnError();
            }

            if (!shaderProgram['_disableRasterizer']) {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            }

            gl.drawArrays(+mode, start, count);
            if (!this.disableErrorChecking) this.throwOnError(); // TODO: error checking flag should be program based.

            if (shaderProgram['_feedbackBuffer'] && gl2) {
                // ... the feedback buffer now has the results ...
                gl2.endTransformFeedback();
                if (!this.disableErrorChecking) this.throwOnError();
            }

            //? shaderProgram.unbind(); - No need to unbind!!! If a different shader was used it will unbind automatically!

            if (this.disableErrorCheckingOnSuccessfulRender)
                this.disableErrorChecking = true; // (no errors, good to go! [auto disable on first successful run to speed things up])

            return this;
        }

        // --------------------------------------------------------------------------------------------------------------------

        checkForError(): { code: number, message: string } {
            var gl = this.webgl;
            if (this.disableErrorChecking) return void 0;
            var code = gl.getError();
            if (!code) return void 0;
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
        }

        /**
         * Throw if there is any existing error state.
         */
        throwOnError(): void {
            if (this.disableErrorChecking) return;
            var error = this.checkForError();
            if (error) {
                var msg = this.error("WebGL Error (" + error.code + "): " + error.message);
                throw Error(msg);
            }
        }

        // --------------------------------------------------------------------------------------------------------------------

        /**
        * Creates a new texture instance for this context.
        * @param ctx The WebGL wrapper context to associated with this instance.
        * @param width The width of this texture.
        * @param height The height of this texture.
        * @param clearColor The color to use when clearing the texture. If no color is given, then white is assumed.
        * @param clearAlpha The alpha value to use when clearing the texture (from 0.0, transparent, to 1.0, opaque) . If not specified, 1.0 is assumed.
        */
        createTexture(width: number, height: number, clearColor = "FFFFFF", clearAlpha = 1): Texture {
            return new Texture(this, width, height, clearColor, clearAlpha);
        }

        // --------------------------------------------------------------------------------------------------------------------
    }


    export class Texture extends CanvasRenderingContext2D implements IBindable {
        /** The WebGL wrapper context to associated with this instance. */
        readonly ctx: Context;

        /** The width of this texture. To change, call 'resizeCanvas()'. */
        readonly width: number;
        /** The height of this texture. To change, call 'resizeCanvas()'. */
        readonly height: number;
        /** The color to use when clearing the texture. If no color is given, then white is assumed. */
        clearColor: string;
        /** The alpha value to use when clearing the texture (from 0.0, transparent, to 1.0, opaque). If not specified, 1.0 is assumed. */
        clearAlpha: number;

        /** Gets or sets a canvas element for manipulating this texture. Setting this also sets 'ctx2d'. By default this is undefined until needed. */
        get canvas() { return this._canvas; }
        set canvas(v: HTMLCanvasElement) { if (v) { this._canvas = v; this._ctx2d = v.getContext('2d'); } }
        private _canvas: HTMLCanvasElement;

        /** Gets or sets a reference to a 2D context used by this texture. Setting this also updates the 'canvas' property. By default this is undefined until needed.
        * Note: You should never need to use methods on this property.  All methods are also available via this 'WebGLJS.Texture' object.
        */
        get ctx2d() { return this._ctx2d; }
        set ctx2d(v: CanvasRenderingContext2D) { if (v) { this._ctx2d = v; this._canvas = v.canvas; } }
        private _ctx2d: CanvasRenderingContext2D;

        /** A reference to the WebGL texture, if any, associated with this texture. One is only created and set at time of need. */
        glTexture: WebGLTexture;

        /** This is set when drawing on the texture.  If true, this causes the underlying WebGL texture to update on next bind. */
        changed: boolean;

        /** If true, any drawing changes to the associated canvas do not resend the pixels to the WebGL context when 'bind()' is called. Default is false.
        * Note: Any drawing based updates will still set 'changed' to true. If such is the case, setting 'disableUpdateOnBind' to false will still allow
        * changes to be applied to the WebGL texture.
        */
        disableUpdateOnBind: boolean;

        /**
         * Creates a new texture instance.
         * @param ctx The WebGL wrapper context to associated with this instance.
         * @param width The width of this texture.
         * @param height The height of this texture.
         * @param clearColor The color to use when clearing the texture. If no color is given, then white is assumed.
         * @param clearAlpha The alpha value to use when clearing the texture (from 0.0, transparent, to 1.0, opaque) . If not specified, 1.0 is assumed.
         */
        constructor(ctx: Context, width: number, height: number, clearColor?: string, clearAlpha?: number) {
            eval("var _super = function() { return void 0; };"); // (since we are inheriting from 'CanvasRenderingContext2D' the TS generated 'super' call may return a different 'new' instance than the current one and mess things up)
            super();
            if (!ctx) throw Error("'ctx' is required - please pass in a valid 'WebGL.Context' instance.");
            if (width < 0) throw this._error("The width cannot be negative.");
            if (height < 0) throw this._error("The height cannot be negative.");
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            clearColor || (clearColor = "FFFFFF");
            (typeof clearAlpha == 'number') || (clearAlpha = 1);
        }

        private _error(msg: string) { return Error("Texture error: " + msg); }
        private _warn(msg: string) { return "Texture warning: " + msg; }

        /**
         * Ensures a new 2D context for drawing operations exists.  This is called automatically by some functions when needed.
         * Feel free to call this to make sure a context exists, as it won't be re-created every time (unless 'forceNew' is true).
         */
        ensure2DContext(forceNew?: boolean): this {
            if (!forceNew && !this._canvas && this._ctx2d)
                this._canvas = this._ctx2d.canvas;
            this._canvas = !forceNew && this._canvas || document.createElement('canvas');
            if (!this._canvas) throw this._error("The canvas element is not supported in this environment.");
            this.ctx2d = !forceNew && this._ctx2d || this._canvas.getContext('2d');
            if (!this.ctx2d) throw this._error("The canvas element is not supported in this environment.");
            return this;
        }

        /**
         * Resizes the underlying canvas element associated with this texture.
         * Note: No attempt is made to reside the pixels as well - only the canvas is resized.
         * @param width A new canvas width.
         * @param height A new canvas height.
         */
        resizeCanvas(width: number, height: number): this {
            this.ensure2DContext();
            this.canvas.width = width;
            this.canvas.height = height;
            (<{ width: number }>this).width = width;
            (<{ height: number }>this).height = height;
            this.changed = true;
            return this;
        }

        clear(color?: string, alpha = 1.0): this {
            if (color === void 0) color = typeof this.clearColor == 'string' && this.clearColor || "FFFFFF";
            if (alpha === void 0) alpha = typeof this.clearAlpha == 'number' ? this.clearAlpha : 1;

            this.ensure2DContext();

            if (typeof color != 'string') color = '' + color;
            if (color.length > 6)
                color = color.slice(-6); // (perhaps alpha was given, which is not supported here)

            this.ctx2d.save();

            this.ctx2d.beginPath();
            this.ctx2d.rect(0, 0, this.width, this.height);
            this.ctx2d.fillStyle = '#' + color;
            this.ctx2d.globalAlpha = alpha;
            this.ctx2d.fill();

            this.ctx2d.restore();

            this.changed = true;

            return this;
        }

        /**
         * Creates a WebGL texture for this texture instance if not already created.  No image pixels are added, only the underlying WebGL texture is created.
         */
        createWebGLTexture(): this {
            var gl = this.ctx.webgl;
            if (!gl) throw this._error("WebGL not supported.");

            if (!this.glTexture) {
                this.glTexture = gl.createTexture();

                gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

                // Set up texture defaults so we can render any size image, and so we are
                // working with pixels. (https://webglfundamentals.org/webgl/lessons/webgl-image-processing-continued.html)

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // TODO: Look into making Texture class functions for these instead.
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // TODO: Look into making Texture class functions for these instead.
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); // TODO: Look into making Texture class functions for these instead.
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); // TODO: Look into making Texture class functions for these instead.
            }

            return this;
        }

        /**
         * Copies the current canvas drawing to the underlying WebGL texture instance.
         * @param force Ignore the state of the 'changed' property and force another update.
         * This is required if drawing directly on the canvas instead of using 'Texture' functions.
         */
        updateGLTexture(force = false): this {
            this.ensure2DContext();

            var ctx = this.ctx, gl = ctx.webgl;
            if (!gl) throw this._error("WebGL not supported.")

            if (this.changed || force) {
                var boundTexture = ctx['_bindings'][gl.TEXTURE_2D];
                if (boundTexture != this)
                    this.bind(gl.TEXTURE_2D, false);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas);
                if (!ctx.disableErrorChecking) ctx.throwOnError();

                this.changed = false;

                if (boundTexture)
                    boundTexture.bind(); // (restore any previous binding just in case)
            }
            return this;
        }

        /**
         * Bind this texture to the associated WebGL context.
         * @param target A texture target to bind the underlying WebGL texture to.
         * @param checkCanvasChanged If true, and changes are detected, the changes are copied to the associated WebGL texture.
         * Change detection only works when using functions on this texture object.  If drawing directly on the canvas using the
         * 2D context, then call 'updateGLTexture()' instead.
         */
        bind(target?: TextureTarget, checkCanvasChanged = true): this {
            var ctx = this.ctx, gl = ctx.webgl;
            if (!gl) throw this._error("WebGL not supported.");

            var boundTexture = ctx['_bindings'][gl.TEXTURE_2D];

            if (boundTexture != this) {
                if (boundTexture)
                    boundTexture.unbind();

                if (!this.glTexture)
                    this.createWebGLTexture(); // (already binds the texture also)
                else
                    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

                if (!ctx.disableErrorChecking) ctx.throwOnError();

                ctx['_bindings'][gl.TEXTURE_2D] = this;
            }

            if (checkCanvasChanged && this.changed && !this.disableUpdateOnBind)
                this.updateGLTexture();

            return this;
        }

        unbind(): this {
            var gl = this.ctx.webgl;
            gl && gl.bindTexture(gl.TEXTURE_2D, null);
            return this;
        }
    }

    // ... get a list of functions that can cause changes to the canvas pixels, then hook into them ...

    var changeTriggerFunctions = [
        // CanvasPathMethods
        "arc",
        "arcTo",
        "bezierCurveTo",
        "closePath",
        "ellipse",
        "lineTo",
        "moveTo",
        "quadraticCurveTo",
        "rect",
        // CanvasRenderingContext2D
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

    // ... first just set everything ...

    for (let p in CanvasRenderingContext2D.prototype)
        try {
            if (Object.prototype.hasOwnProperty.call(CanvasRenderingContext2D.prototype, p)) {
                let value = CanvasRenderingContext2D.prototype[p]; // (this will throw an exception for getters that get triggered for this, even on 'typeof')
                if (typeof value == 'function')
                    if (changeTriggerFunctions.indexOf(p) >= 0)
                        Texture.prototype[p] = ((p: string) => { return function (this: Texture) { this.changed = true; return CanvasRenderingContext2D.prototype[p].apply(this.ensure2DContext().ctx2d, arguments); }; })(p);
                    else
                        Texture.prototype[p] = ((p: string) => { return function (this: Texture) { return CanvasRenderingContext2D.prototype[p].apply(this.ensure2DContext().ctx2d, arguments); }; })(p);
            }
        }
        catch (e) { } // (ignore errors on any getters and just skip them ['typeof' doesn't work either])
    // TODO: Perhaps there's a better way...

    WebGLJS['__prevGL'] = GL;
}

import GL = WebGLJS;

declare class WebGL extends WebGLJS.Context { }
if (!this['WebGL']) // (only if undefined - in case some else is using it for something; if this was set, put it back)
    this['WebGL'] = WebGLJS.Context;

if (WebGLJS['__prevGL'] !== void 0) // (only if undefined - in case some else is using it for something; if this was set, put it back)
    this['GL'] = WebGLJS['__prevGL'];

// *** Stats: https://webglstats.com; Compatibility: http://webglreport.com ***
// TODO: See if we can get on this^!!!!!!
// AND THIS: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
// Help fix up some definitions on MDN, like this: https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/transformFeedbackVaryings

// Inspired by: https://wolftype.github.io/200c/tutorials/2016/09/18/webGL-2-shaders-and-buffers.html
// Good info on shaders: https://www.html5rocks.com/en/tutorials/webgl/shaders/
// Kernels and examples (great for filters!): https://docs.gimp.org/en/plug-in-convmatrix.html
// WebGL Fundamentals: https://www.slideshare.net/senchainc/webgl-fundamentals-10013633
// Notable vector handling functions: distance(p1, p2), normalize(vec), and length(norm_vec)
// Good refresher on buffers: https://webglfundamentals.org/webgl/lessons/webgl-data-textures.html
// Impressive inspiration: http://nopjia.blogspot.com/2014/06/webgl-ctx-particles.html
// IE Platform Status: https://developer.microsoft.com/en-us/microsoft-edge/platform/status/
// NVidia Core Warps: https://developer.nvidia.com/content/life-triangle-nvidias-logical-pipeline
// New WebGL 2 Features: https://github.com/shrekshao/MoveWebGL1EngineToWebGL2/blob/master/Move-a-WebGL-1-Engine-To-WebGL-2-Blog-2.md
// Awesome particle simulator (webGL 1): http://toji.github.io/webgl2-particles-2/ (https://github.com/toji/webgl2-particles-2)
// Perhaps try using vertex shaders with transform feedbacks and instances: https://gpfault.net/posts/webgl2-particles.txt.html
// Vertex-Array-Object-vs-Vertex-Buffer-Object: https://www.opengl.org/discussion_boards/showthread.php/185088-Vertex-Array-Object-vs-Vertex-Buffer-Object