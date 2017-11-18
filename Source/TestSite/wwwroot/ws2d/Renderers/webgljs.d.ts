declare namespace WebGLJS {
    interface ExtensionsMap {
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
    interface IBufferArrayType extends ArrayBufferView {
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
    interface RenderOption extends Number {
    }
    interface ComponentSize extends Number {
    }
    interface ComponentType extends Number {
    }
    interface UsageType extends Number {
    }
    interface BufferTarget extends Number {
    }
    interface ShaderDataType extends Number {
    }
    interface PrimitiveTypeMode extends Number {
    }
    interface FeedbackMode extends Number {
    }
    interface TextureTarget extends Number {
    }
    /**
     * Scans the GL enum values and categorizes them to make code completion more structured.
     */
    class GLEnums {
        private static _IsValid(value);
        /** WebGL capabilities that can enabled or disabled. */
        readonly RenderOptions: {
            IsValid: (value: number | Number) => boolean;
            BLEND: RenderOption;
            CULL_FACE: RenderOption;
            DEPTH_TEST: RenderOption;
            DITHER: RenderOption;
            POLYGON_OFFSET_FILL: RenderOption;
            SAMPLE_ALPHA_TO_COVERAGE: RenderOption;
            SAMPLE_COVERAGE: RenderOption;
            SCISSOR_TEST: RenderOption;
            STENCIL_TEST: RenderOption;
            WebGL2: {
                IsValid: (value: number | Number) => boolean;
                RASTERIZER_DISCARD: RenderOption;
            };
        };
        /** For specifying the number of components per vertex attribute, which must be 1, 2, 3, or 4. */
        readonly ArrayComponentSizes: {
            IsValid: (value: number | Number) => boolean;
            One: ComponentSize;
            Two: ComponentSize;
            Three: ComponentSize;
            Four: ComponentSize;
        };
        /** The data type of each component in an array of buffer data. */
        readonly ArrayComponentTypes: {
            IsValid: (value: number | Number) => boolean;
            BYTE: ComponentType;
            SHORT: ComponentType;
            UNSIGNED_BYTE: ComponentType;
            UNSIGNED_SHORT: ComponentType;
            FLOAT: ComponentType;
            WebGL2: {
                IsValid: (value: number | Number) => boolean;
                HALF_FLOAT: ComponentType;
            };
        };
        /** Specifies the usage pattern of a data store. This helps the GL driver decide how best to allocate and use stored data (typically used for buffer data). */
        readonly UsageTypes: {
            IsValid: (value: number | Number) => boolean;
            STATIC_DRAW: UsageType;
            DYNAMIC_DRAW: UsageType;
            STREAM_DRAW: UsageType;
            WebGL2: {
                IsValid: (value: number | Number) => boolean;
                STATIC_READ: UsageType;
                DYNAMIC_READ: UsageType;
                STREAM_READ: UsageType;
                STATIC_COPY: UsageType;
                DYNAMIC_COPY: UsageType;
                STREAM_COPY: UsageType;
            };
        };
        /** WebGL buffer bind targets. */
        readonly BufferTargets: {
            IsValid: (value: number | Number) => boolean;
            ARRAY_BUFFER: BufferTarget;
            ELEMENT_ARRAY_BUFFER: BufferTarget;
            WebGL2: {
                IsValid: (value: number | Number) => boolean;
                COPY_READ_BUFFER: BufferTarget;
                COPY_WRITE_BUFFER: BufferTarget;
                TRANSFORM_FEEDBACK_BUFFER: BufferTarget;
                UNIFORM_BUFFER: BufferTarget;
                PIXEL_PACK_BUFFER: BufferTarget;
                PIXEL_UNPACK_BUFFER: BufferTarget;
            };
        };
        /** WebGL texture bind targets. */
        readonly TextureTargets: {
            IsValid: (value: number | Number) => boolean;
            TEXTURE_2D: TextureTarget;
            TEXTURE_CUBE_MAP: TextureTarget;
            WebGL2: {
                IsValid: (value: number | Number) => boolean;
                TEXTURE_3D: TextureTarget;
                TEXTURE_2D_ARRAY: TextureTarget;
            };
        };
        /** WebGL shader data types. The root types are for both WebGL 1 and 2.  See 'ShaderDataTypes.WebGL2' for WebGL2 supported enums. */
        readonly ShaderDataTypes: {
            IsValid: (value: number | Number) => boolean;
            FLOAT: ShaderDataType;
            FLOAT_VEC2: ShaderDataType;
            FLOAT_VEC3: ShaderDataType;
            FLOAT_VEC4: ShaderDataType;
            INT: ShaderDataType;
            INT_VEC2: ShaderDataType;
            INT_VEC3: ShaderDataType;
            INT_VEC4: ShaderDataType;
            BOOL: ShaderDataType;
            BOOL_VEC2: ShaderDataType;
            BOOL_VEC3: ShaderDataType;
            BOOL_VEC4: ShaderDataType;
            FLOAT_MAT2: ShaderDataType;
            FLOAT_MAT3: ShaderDataType;
            FLOAT_MAT4: ShaderDataType;
            SAMPLER_2D: ShaderDataType;
            SAMPLER_CUBE: ShaderDataType;
            WebGL2: {
                IsValid: (value: number | Number) => boolean;
                UNSIGNED_INT: ShaderDataType;
                UNSIGNED_INT_VEC2: ShaderDataType;
                UNSIGNED_INT_VEC3: ShaderDataType;
                UNSIGNED_INT_VEC4: ShaderDataType;
                SAMPLER_3D: ShaderDataType;
                SAMPLER_2D_SHADOW: ShaderDataType;
                SAMPLER_2D_ARRAY: ShaderDataType;
                SAMPLER_2D_ARRAY_SHADOW: ShaderDataType;
                SAMPLER_CUBE_SHADOW: ShaderDataType;
                INT_SAMPLER_2D: ShaderDataType;
                INT_SAMPLER_3D: ShaderDataType;
                INT_SAMPLER_CUBE: ShaderDataType;
                INT_SAMPLER_2D_ARRAY: ShaderDataType;
                UNSIGNED_INT_SAMPLER_2D: ShaderDataType;
                UNSIGNED_INT_SAMPLER_3D: ShaderDataType;
                UNSIGNED_INT_SAMPLER_CUBE: ShaderDataType;
                UNSIGNED_INT_SAMPLER_2D_ARRAY: ShaderDataType;
            };
        };
        /** Primitive types that can be rendered. */
        readonly PrimitiveTypeModes: {
            IsValid: (value: number | Number) => boolean;
            POINTS: PrimitiveTypeMode;
            LINE_STRIP: PrimitiveTypeMode;
            LINE_LOOP: PrimitiveTypeMode;
            LINES: PrimitiveTypeMode;
            TRIANGLE_STRIP: PrimitiveTypeMode;
            TRIANGLE_FAN: PrimitiveTypeMode;
            TRIANGLES: PrimitiveTypeMode;
        };
        /** (WebGL 2) The mode to use when capturing varying outputs from vertex shaders. */
        readonly FeedbackModes: {
            IsValid: (value: number | Number) => boolean;
            INTERLEAVED_ATTRIBS: PrimitiveTypeMode;
            SEPARATE_ATTRIBS: PrimitiveTypeMode;
        };
        private _updateEnums(ctx, enumObject);
        constructor(ctx: Context);
        private _updateEnumsForScope(ctx, scopeObj);
    }
    /** An interface for objects that can be bound to a WebGL context. */
    interface IBindable {
        /** Bind the underlying WebGL object to the context. */
        bind(...args: any[]): this;
        /** Unbind the underlying WebGL object from the context (typically sets an entry to null/0). */
        unbind(...args: any[]): this;
    }
    class ShaderProperty {
        readonly shader: ShaderProgram;
        readonly name: string;
        type: ShaderDataType;
        readonly location: number | WebGLUniformLocation;
        readonly count: number;
        constructor(shader: ShaderProgram, name: string, type: ShaderDataType, location?: number | WebGLUniformLocation, count?: number);
    }
    class ShaderVarying extends ShaderProperty implements IBindable {
        readonly location: number;
        /** The buffer, if any, associated with this varying (typically for transform feedback).
        * If no buffer exists, 'shader.feedbackBuffer' will be used instead, if set.
        */
        readonly buffer: Buffer<IBufferArrayType>;
        private _buffer;
        /**
         * Constructs a new shader uniform descriptor object.
         * @param shader The shader to associate this uniform info with.
         * @param index The index of the binding point for binding target.
         * @param name The uniform name.
         * @param type A shader supported data type.
         * @param buffer An optional buffer to associate with this uniform. If not specified, then 'shader.sharedBuffer' will be used instead, if set.
         */
        constructor(shader: ShaderProgram, index: number, name: string, type?: ShaderDataType, buffer?: Buffer<IBufferArrayType>);
        private _error(msg);
        private _warn(msg);
        bind(): this;
        unbind(): this;
    }
    class ShaderAttribute extends ShaderProperty implements IBindable {
        count: number;
        readonly pointer: VertexAttributePointer;
        readonly location: number;
        /** The buffer, if any, associated with this attribute.  A buffer is required in order to define pointers for the attribute.
        * If no buffer exists, 'shader.sharedBuffer' will be used instead, if set.
        */
        readonly buffer: Buffer<IBufferArrayType>;
        private _buffer;
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
        constructor(shader: ShaderProgram, location: number, name: string, type?: ShaderDataType, buffer?: Buffer<IBufferArrayType>, count?: number);
        private _error(msg);
        toString(): string;
        /**
         * Change the index assigned to this attribute for the underlying shader program.
         * You can call this as a convention to make sure certain names (like "position", "normal", "color"m etc.) are always in the same index.
         * @param newIndex The new attribute index to assign to an attribute specified by it's name.
         * By default, when a shader is compiled and linked, the attribute locations are determined automatically so this is usually not required.
         */
        setIndex(newIndex: number): this;
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
        definePointer(componentSize?: ComponentSize, normalized?: boolean, offset?: number, stride?: number, type?: ComponentType): this;
        /**
         * Assign a buffer to be read from for this attribute.
         * You must assign a buffer before defining a pointer to read from it.
         */
        setBuffer(buffer: Buffer): this;
        /**
         * Enable this shader attribute at it's currently defined index position.
         */
        enable(): this;
        /**
         * Disable this shader attribute at it's currently defined index position.
         */
        disable(): this;
        bind(): this;
        unbind(): this;
    }
    class ShaderUniform extends ShaderProperty implements IBindable {
        buffer: Buffer<IBufferArrayType>;
        value: number | number[] | Float32Array | WebGLTexture;
        componentSize: ComponentSize;
        textureIndex: number;
        count: number;
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
        constructor(shader: ShaderProgram, location: WebGLUniformLocation, name: string, type?: ShaderDataType, buffer?: Buffer<IBufferArrayType>, value?: number | number[] | Float32Array | WebGLTexture, componentSize?: ComponentSize, textureIndex?: number, count?: number);
        private _error(msg);
        toString(): string;
        bind(value?: any): this;
        unbind(): this;
    }
    /**
      * Describes how to read components from a buffer for a given shader attribute location.
      * Typically you should call '{Buffer}.createPointer()' to create pointers for buffers.
      */
    class VertexAttributePointer {
        readonly attribute: ShaderAttribute;
        attributeLocation: number;
        componentSize: ComponentSize;
        type: ComponentType;
        normalized: boolean;
        stride: number;
        offset: number;
        /** Returns the buffer associated with this pointer. When 'bind()' is called this reference will become set to the current reference in 'attribute.buffer'. */
        readonly buffer: Buffer<IBufferArrayType>;
        /** Set the first time 'Bind()' is called because 'gl.vertexAttribPointer()' takes the current buffer reference set in 'ARRAY_BUFFER' and holds onto it, so this helps keep track of it.  */
        private _buffer;
        private _strideMismatchError;
        constructor(attribute: ShaderAttribute, attributeLocation: number, componentSize?: ComponentSize, type?: ComponentType, normalized?: boolean, stride?: number, offset?: number);
        private _error(msg);
        toString(): string;
        /**
         * Binds the pointer to the underlying attribute location.
         * This also implicitly binds the associated buffer to the 'ARRAY_BUFFER' global state in order to set the pointer.
         * If a Vertex Array Object (VAO) is bound beforehand, the buffer and pointer will be associated with it automatically.
         */
        bind(): this;
    }
    /**
     * Buffers are used to manage data stores on the WebGL side (such as "arrays" of data to send to shader programs).
     */
    class Buffer<T extends IBufferArrayType = IBufferArrayType> implements IBindable {
        readonly ctx: Context;
        readonly usage: UsageType;
        readonly type: ComponentType;
        readonly componentSize: ComponentSize;
        readonly stride: number;
        private _buffer;
        private _bufferSize;
        private _lastTarget;
        private _lastTargetID;
        private _varying;
        private _transformFeedbackIndex;
        private _lastTransformFeedbackIndex;
        private _newData;
        private _newDataOffset;
        private _newCopyLength;
        private _dstDataOffset;
        private _ofsAndLenWarning;
        private _reallocate;
        /** A reference to the given array for the buffer's data. To change, call 'setData()'. */
        private _data;
        readonly data: T;
        /** The WebGL buffer. */
        readonly buffer: WebGLBuffer;
        /** The offset to where the new data resides in the given data array. */
        readonly offset: number;
        /** The byte offset where to begin copying data to for the underlying WebGL buffer. */
        readonly destinationOffset: number;
        /**
         * The number of data items to copy to the underlying WebGL buffer (in case the data size is larger than the actual
         * number of items stored in it).
         * If undefined, then 'data.length' is assumed.
         * Note: Using offset greater than 0 or length less than the total data array size is only supported in WebGL 2.  Anything
         * else will required slicing the array to create a copy of sub-items before transferring it, which may be slower.
         */
        readonly length: number;
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
        constructor(ctx: Context, usage?: UsageType, type?: ComponentType, componentSize?: ComponentSize, stride?: number);
        private _error(msg);
        private _warn(msg);
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
        setProperties(usage: UsageType, type?: ComponentType, componentSize?: ComponentSize, stride?: number): this;
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
        setData(data?: T, length?: number, copyStartIndex?: number, dstByteOffset?: number, resize?: boolean): this;
        /**
         * Uploads data to the underlying WebGL buffer.
         * Data is transfered at the last possible moment so there's no need to waste time if it's never used.  This also allows for local updates until binding.
         */
        transferData(): void;
        /**
         * (WebGL 2) Get data from the underlying WebGL buffer. The data will be copied back into any array set when 'setData()' was last called.
         * Note: Downloading data from the GPU is usually a much slower operation than uploading it.
         * @param data (optional) An array to receive the data from the WebGL buffer.  If not specified, the one passed to the last call to 'setData()' will be used.
         */
        getData(data?: T, srcByteOffset?: number, dstOffset?: number, length?: number): this;
        bind(target: BufferTarget): this;
        unbind(): this;
    }
    class FrameBuffer implements IBindable {
        readonly ctx: Context;
        readonly width: number;
        readonly height: number;
        readonly textureCount: number;
        readonly buffer: WebGLFramebuffer;
        private _readBuffer;
        readonly textures: WebGLTexture[];
        readonly data: Float32Array[];
        readonly attachments: number[];
        readonly isValid: boolean;
        private _isValid;
        constructor(ctx: Context, width: number, height: number, textureCount: number);
        checkComplete(): string;
        /**
         * Copy values to one of the texture buffers.
         * @param data The data to update with.
         */
        updateTextureData(data: Float32Array, index: number): this;
        testBuffer: WebGLBuffer;
        /**
         * Copy values from one of the texture buffers.
         * @param data An array to receive the data.
         */
        getTextureData(data: Float32Array, index: number): this;
        bind(): this;
        unbind(): this;
    }
    class ShaderProgram implements IBindable {
        readonly ctx: Context;
        private _vertCode;
        private _vertShader;
        private _fragCode;
        private _fragShader;
        private _built;
        private _disableRasterizer;
        private _disableRasterizer_Warning;
        private _feedbackBufferMode;
        private _attributesBound;
        private _uniformsBound;
        private _varyingsBound;
        readonly program: WebGLProgram;
        /** A list of attributes to use when executing the shader. */
        attributes: ShaderAttribute[] & {
            [internalname: string]: ShaderAttribute;
        };
        /** Get a single attribute by name. If the attribute doesn't exist (perhaps the compiler optimized it out) then 'undefined' is returned. */
        attribute(name: string): ShaderAttribute;
        /** A list of uniforms to use when executing the shader. */
        uniforms: ShaderUniform[] & {
            [internalname: string]: ShaderUniform;
        };
        /** Get a single uniform by name. If the uniform doesn't exist (perhaps the compiler optimized it out) then 'undefined' is returned. */
        uniform(name: string): ShaderUniform;
        /** A list of varyings, if any, given when building the shader program. */
        varyings: ShaderVarying[] & {
            [internalname: string]: ShaderVarying;
        };
        /** Get a single varying (transform output) by name. */
        varying(name: string): ShaderVarying;
        /** An interleaved data buffer that can be shared by multiple attributes. Setting this means not having to set the same buffer for every attribute.
        * If every attribute reads from a different buffer, then this setting is not very useful.
        * Setting a buffer on an attribute overrides this reference.
        */
        sharedBuffer: Buffer;
        private _sharedBuffer;
        /** (WebL 2) When rendering with transform feedback, this is the buffer to receive the results. */
        feedbackBuffer: Buffer;
        private _feedbackBuffer;
        constructor(ctx: Context);
        private _error(msg);
        private _warn(msg);
        setVertexCode(code: string | string[]): this;
        setFragmentCode(code: string | string[]): this;
        /**
         * Compile and link the shader code.  Any attributes and uniforms found will be detected and updated locally.
         * Any shader compiling errors will be dumped to the console with line numbers for easier debugging.
         * @param keepShaderObjects If false (default) the shader objects and deleted and only the shader program is left after building.
         * @param feedbackBufferMode (WebGL 2) A 'enum.FeedbackModes' value specifying the mode to use when capturing the varying variables; either 'INTERLEAVED_ATTRIBS' or 'SEPARATE_ATTRIBS'.
         * Should be undefined, unless 'feedbackVaryings' values are specified.
         * @param feedbackVaryings (WebGL 2) An optional list of outputs that should be linked when using transform feedback buffers.
         * If not specified, the linker will treat all 'out' declarations as inputs for the fragment shader instead of outputs targeting feedback buffers.
         */
        build(keepShaderObjects?: boolean, feedbackBufferMode?: FeedbackMode, ...feedbackVaryings: (string | ShaderVarying)[]): this;
        /**
         * Dispose only the shader objects - good to do after compiling if no longer needed for recompiling.
         */
        disposeShaders(): this;
        /**
         * Deletes the shader program and any associated shader objects.
         */
        dispose(): void;
        /**
         * Set a uniform value to send to the shader.
         * @param name The name of the uniform identifier expected by the shader.
         * @param value The value to set for the uniform identifier in the shader.
         * @param required If no uniform exists (perhaps the driver optimized it out) then normally an exception will be thrown.  Set this to false to ignore missing uniforms.
         * By default all uniforms are assumed to be required. This serves to help prevent running a program with incorrectly named uniforms.
         */
        setUniform(name: string, value: number, required?: boolean): this;
        /**
         * Disable the rasterization process involving fragment shaders when rendering with this program.
         * It's typically used with vertex feedback buffers on shader programs that do not render any color outputs, which helps speed things up.
         */
        disableRasterizer(): this;
        /**
        * Enable the rasterization process involving fragment shaders when rendering with this program.
        * It's enabled by default so there's no need to call this unless 'disableRasterizer()' was called previously.
        */
        enableRasterizer(): this;
        /**
         * Swap the shared buffer and the feedback buffer.
         * This is a convenient way to reprocess transformed data as input.
         */
        swapBuffers(): this;
        /**
         * Bind this shader program for rendering.
         */
        bind(): this;
        /**
         * Unbinds the shader program and disables the attributes.
         */
        unbind(): this;
    }
    class VertexArrayObject {
        readonly ctx: Context;
        vertex_arrays: Buffer<IBufferArrayType>[];
        constructor(ctx: Context);
        /**
         *
         * @param buffer
         * @param attribute
         */
        addBuffer(buffer: Buffer<IBufferArrayType>, attribute?: ShaderAttribute): this;
    }
    /**
     * A root wrapper class for working with WebGL.
     */
    class Context {
        owner: object;
        canvasWidth: number;
        canvasHeight: number;
        readonly canvas: HTMLCanvasElement;
        /** If WebGL is supported, this will contain a structured layout of supported WebGL enums to be used for the GPU instance. */
        readonly enums: GLEnums;
        readonly _globalOptionStates: {
            [enumValue: number]: boolean;
        };
        /** Keeps track of objects bound to various target points. This helps to make sure the same object isn't bound more than once unnecessarily. */
        private _bindings;
        private _canvas;
        private _fullscreenQuad;
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
        readonly isWebGL1Supported: boolean;
        private _WebGL1Supported;
        /** Returns true if the WebGL2 context is supported, otherwise returns false. */
        readonly isWebGL2Supported: boolean;
        private _WebGL2Supported;
        /** Returns true ANY WebGL context is supported, otherwise returns false. */
        readonly isWebGLSupported: boolean;
        /** The maximum value that width and hight can be. For (Width,Height) it can only be (MAX,1), (1,MAX), or (MAX,MAX).*/
        readonly maxTextureDimension: any;
        readonly webGLVersion: string;
        readonly webGLSLVersion: string;
        readonly webGLVendor: string;
        readonly maxCombinedTextures: number;
        readonly maxFeedbackBuffers: number;
        readonly maxUniformBuffers: number;
        /** The function to receive all logging messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.log' object. */
        log: (message?: any, ...optionalParams: any[]) => string;
        /** The function to receive all informational messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.info' object. */
        info: (message?: any, ...optionalParams: any[]) => string;
        /** The function to receive all debug messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.debug' object. */
        debug: (message?: any, ...optionalParams: any[]) => string;
        /** The function to receive all warning messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.warn' object. */
        warn: (message?: any, ...optionalParams: any[]) => string;
        /** The function to receive all error messages. Returns the arguments joined as strings using a space delimiter. Defaults to using the global 'console.error' object.
        * If exceptions are desired then substitute your own function here and throw the messages instead.
        */
        error: (message?: any, ...optionalParams: any[]) => string;
        /** If true disables the error checking, which can speed things up during production releases (default is false). */
        disableErrorChecking: boolean;
        /** On a successful first render, the 'disableErrorChecking' property will be set to 'true' automatically to speed
        * things up (error checking can lower performance a bit). Default is true.
        */
        disableErrorCheckingOnSuccessfulRender: boolean;
        /**
         * Creates an instance of the WebGLJS WebGL Context wrapper.
         * @param owner An optional owner to keep track of where this instance belongs.
         * @param canvasWidth The width of the canvas to create.
         * @param canvasHeight The height of the canvas to create.
         * @param canvas An optional HTMLCanvasElement instance to use for the WebGL context.  If not specified, one will be created.
         */
        constructor(owner?: object, canvasWidth?: number, canvasHeight?: number, canvas?: HTMLCanvasElement);
        createQuad(): Buffer;
        /**
         * Enabled a WebGL extension to be used for this context.
         * @param name A supported extension for the context being used.
         */
        enabledExtension<K extends keyof ExtensionsMap>(name: K, required?: boolean): ExtensionsMap[K];
        /**
         * Get a list of supported extensions by this browser.
         */
        getSupportedExtensions(): string[];
        /**
         * Updates the local render options list and other states with the current WebGL context states.
         * Normally this call is not required; however, if manipulating the WebGL context externally this call may be required.
         * States are cached in the current GPU instance for faster lookups to increase efficiency. It is not advised to
         * change states outside of the GPU class functions.
         */
        updateStateFromWebGLContext(): this;
        /**
         * Enable some render options.
         * @param options One or more options to enable.
         */
        enableRenderOptions(...options: RenderOption[]): this;
        /**
         * Disable some render options.
         * @param options One or more options to disable.
         */
        disableRenderOptions(...options: RenderOption[]): this;
        /**
         * Returns whether or not the given render option is enabled.
         * This method relies on a local list of states to track for the current context.  As such, if any render options are
         * changed directly in the underlying canvas 'webgl' context, 'updateStateFromWebGLContext()' needs to be called to
         * sync those options with this wrapper instance.  Keeping options local means a fast array lookup instead of a
         * function call to get options (which can also trigger errors if the option is invalid).
         * @param optionEnum The option to lookup.
         */
        isEnabled(optionEnum: RenderOption): boolean;
        /**
         * Creates and returns a new shader object for use in the current context.
         */
        createShader(): ShaderProgram;
        /**
        * Creates and returns a new WebGL buffer wrapper.
        * Use 'setProperties()' and 'setData()' on the returned object to setup the buffer.
        */
        createBuffer<T extends IBufferArrayType>(): Buffer<T>;
        /**
         * Renders the given shader program.
         * It is assumed the shader attributes and uniform values are already set before calling this function.
         * @param shaderProgram The shader program to use for rendering.
         * @param mode The type of rendering mode.  This is one of the 'enums.PrimitiveTypeModes' values. The default is 'TRIANGLES' mode.
         * @param start The first item to render.  This is the first item to begin rendering. If using element indexes, this is
         * the first index position, otherwise this is multiplied by 'stride' by WebGL to select the first item to render.
         * @param count The number of items to render.  This is typically 'buffer length / buffer stride'.
         */
        render(shaderProgram: ShaderProgram, mode?: PrimitiveTypeMode, start?: number, count?: number): this;
        checkForError(): {
            code: number;
            message: string;
        };
        /**
         * Throw if there is any existing error state.
         */
        throwOnError(): void;
        /**
        * Creates a new texture instance for this context.
        * @param ctx The WebGL wrapper context to associated with this instance.
        * @param width The width of this texture.
        * @param height The height of this texture.
        * @param clearColor The color to use when clearing the texture. If no color is given, then white is assumed.
        * @param clearAlpha The alpha value to use when clearing the texture (from 0.0, transparent, to 1.0, opaque) . If not specified, 1.0 is assumed.
        */
        createTexture(width: number, height: number, clearColor?: string, clearAlpha?: number): Texture;
    }
    class Texture extends CanvasRenderingContext2D implements IBindable {
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
        canvas: HTMLCanvasElement;
        private _canvas;
        /** Gets or sets a reference to a 2D context used by this texture. Setting this also updates the 'canvas' property. By default this is undefined until needed.
        * Note: You should never need to use methods on this property.  All methods are also available via this 'WebGLJS.Texture' object.
        */
        ctx2d: CanvasRenderingContext2D;
        private _ctx2d;
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
        constructor(ctx: Context, width: number, height: number, clearColor?: string, clearAlpha?: number);
        private _error(msg);
        private _warn(msg);
        /**
         * Ensures a new 2D context for drawing operations exists.  This is called automatically by some functions when needed.
         * Feel free to call this to make sure a context exists, as it won't be re-created every time (unless 'forceNew' is true).
         */
        ensure2DContext(forceNew?: boolean): this;
        /**
         * Resizes the underlying canvas element associated with this texture.
         * Note: No attempt is made to reside the pixels as well - only the canvas is resized.
         * @param width A new canvas width.
         * @param height A new canvas height.
         */
        resizeCanvas(width: number, height: number): this;
        clear(color?: string, alpha?: number): this;
        /**
         * Creates a WebGL texture for this texture instance if not already created.  No image pixels are added, only the underlying WebGL texture is created.
         */
        createWebGLTexture(): this;
        /**
         * Copies the current canvas drawing to the underlying WebGL texture instance.
         * @param force Ignore the state of the 'changed' property and force another update.
         * This is required if drawing directly on the canvas instead of using 'Texture' functions.
         */
        updateGLTexture(force?: boolean): this;
        /**
         * Bind this texture to the associated WebGL context.
         * @param target A texture target to bind the underlying WebGL texture to.
         * @param checkCanvasChanged If true, and changes are detected, the changes are copied to the associated WebGL texture.
         * Change detection only works when using functions on this texture object.  If drawing directly on the canvas using the
         * 2D context, then call 'updateGLTexture()' instead.
         */
        bind(target?: TextureTarget, checkCanvasChanged?: boolean): this;
        unbind(): this;
    }
}
import GL = WebGLJS;
declare class WebGL extends WebGLJS.Context {
}
