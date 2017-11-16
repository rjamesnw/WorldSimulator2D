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
        /** WebGL capabilities that can enabled or disabled. */
        readonly RenderOptions: {
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
                RASTERIZER_DISCARD: RenderOption;
            };
        };
        /** For specifying the number of components per vertex attribute, which must be 1, 2, 3, or 4. */
        readonly ArrayComponentSizes: {
            One: ComponentSize;
            Two: ComponentSize;
            Three: ComponentSize;
            Four: ComponentSize;
        };
        /** The data type of each component in an array of buffer data. */
        readonly ArrayComponentTypes: {
            BYTE: ComponentType;
            SHORT: ComponentType;
            UNSIGNED_BYTE: ComponentType;
            UNSIGNED_SHORT: ComponentType;
            FLOAT: ComponentType;
            WebGL2: {
                HALF_FLOAT: ComponentType;
            };
        };
        /** Specifies the usage pattern of a data store. This helps the GL driver decide how best to allocate and use stored data (typically used for buffer data). */
        readonly UsageTypes: {
            STATIC_DRAW: UsageType;
            DYNAMIC_DRAW: UsageType;
            STREAM_DRAW: UsageType;
            WebGL2: {
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
            ARRAY_BUFFER: BufferTarget;
            ELEMENT_ARRAY_BUFFER: BufferTarget;
            WebGL2: {
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
            TEXTURE_2D: TextureTarget;
            TEXTURE_CUBE_MAP: TextureTarget;
            WebGL2: {
                TEXTURE_3D: TextureTarget;
                TEXTURE_2D_ARRAY: TextureTarget;
            };
        };
        /** WebGL shader data types. The root types are for both WebGL 1 and 2.  See 'ShaderDataTypes.WebGL2' for WebGL2 supported enums. */
        readonly ShaderDataTypes: {
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
declare namespace WorldSimulator2D {
    /**
     * A special collection that never shortens the internal array, and keeps track of empty index locations for fast adding
     * and removing of items.  As items are removed from the end, a special 'last index' pointer is reduced.
     * This collection mainly exists to use indexes as object IDs for quick add, lookup, and removal using those IDs.  Objects
     * added to this collection are not kept in order.
     * Note: When adding objects, to make removing more efficient, make sure they have a unique 'id' property, otherwise
     * 'indexOf()' on the items list is used to find the item to be removed, which is an O(n) operation.
     */
    class IndexedCollection<T> implements IDisposable {
        readonly items: T[];
        private _lastItemIndex;
        private _emptyIndexes;
        private _IdObjectsIndex;
        readonly capactity: number;
        readonly count: number;
        /** Returns true of the collection is locked and cannot be changed (however, the collection can still be disposed). */
        readonly isLocked: boolean;
        private _locked;
        /** Returns true of the collection is locked and cannot be expanded beyond the initial capacity*/
        readonly isCapacityLocked: boolean;
        private _capacityLocked;
        /**
         * Sets the new capacity for the collection.
         * If the new size is less than the items array length, the request is ignored (the items will not be truncated).
         * @param size The new size of the items array.
         */
        setCapacity(size: number, locked?: boolean): this;
        setItem(index: number, item: T): this;
        /**
         * Adds a new item and returns it's index.
         */
        add(item: T): number;
        /**
         * Adds a range of items. The items are added one by one to make sure any empty indexes are used. As such, the additions
         * may not be sequential.
         */
        addRange(...items: T[]): this;
        /**
         * Adds a range of items and returns the index of the first item.
         * Note: For speed purposes, adding ranges ALWAYS appends and never uses empty index positions.
         */
        fastAddRange(...items: T[]): number;
        /**
         * Find and return the index of the given item.
         */
        indexOf(item: T): number;
        /**
         * Removes and returns the item at the specific index.
         * @param index The index of the item to remove.
         * @param ignoreIndexErrors If true, and the index is out of bounds, no error is thrown and 'undefined' is returned.
         */
        removeAt(index: number, ignoreIndexErrors?: boolean): T;
        /**
         * Removes and returns the specified item.
         * @param item The item to remove.
         * @param ignoreErrors If true, and the item does not exist, no error is thrown, and the given item is just returned.
         */
        remove(item: T, ignoreErrors?: boolean): T;
        /**
         * Clears the collection and optionally disposes the individual items as well (if applicable).
         * @param includeItems If true (default) will call the 'dispose()' functions existing on any objects in the collection.
         */
        dispose(includeItems?: boolean): void;
    }
}
interface Number {
    isInteger(x: number): boolean;
}
interface Math {
    sign(x: number): number;
}
declare namespace WorldSimulator2D {
    interface IIndexableObject {
        [index: string]: any;
    }
    module NativeTypes {
        interface IFunction extends Function {
        }
        interface IObject extends Object, IIndexableObject {
        }
        interface IArray<T> extends Array<T> {
        }
        interface IString extends String {
        }
        interface INumber extends Number {
        }
        interface IBoolean extends Boolean {
        }
        interface IRegExp extends RegExp {
        }
        interface IDate extends Date {
        }
        interface IIMath extends Math {
        }
        interface IError extends Error {
        }
        interface IXMLHttpRequest extends XMLHttpRequest {
        }
        interface IHTMLElement extends HTMLElement {
        }
        interface IWindow extends Window {
        }
    }
    module NativeStaticTypes {
        var StaticFunction: FunctionConstructor;
        var StaticObject: ObjectConstructor;
        var StaticArray: ArrayConstructor;
        var StaticString: StringConstructor;
        var StaticNumber: NumberConstructor;
        var StaticBoolean: BooleanConstructor;
        var StaticRegExp: RegExpConstructor;
        var StaticDate: DateConstructor;
        var StaticMath: typeof Math;
        var StaticError: ErrorConstructor;
        var StaticXMLHttpRequest: typeof XMLHttpRequest;
        var StaticHTMLElement: typeof HTMLElement;
        var StaticWindow: typeof Window;
    }
    interface IStaticGlobals extends Window {
        [index: string]: any;
        Function: typeof NativeStaticTypes.StaticFunction;
        Object: typeof NativeStaticTypes.StaticObject;
        Array: typeof NativeStaticTypes.StaticArray;
        String: typeof NativeStaticTypes.StaticString;
        Number: typeof NativeStaticTypes.StaticNumber;
        Boolean: typeof NativeStaticTypes.StaticBoolean;
        RegExp: typeof NativeStaticTypes.StaticRegExp;
        Date: typeof NativeStaticTypes.StaticDate;
        Math: typeof NativeStaticTypes.StaticMath;
        Error: typeof NativeStaticTypes.StaticError;
        XMLHttpRequest: typeof NativeStaticTypes.StaticXMLHttpRequest;
        HTMLElement: typeof NativeStaticTypes.StaticHTMLElement;
        Window: typeof NativeStaticTypes.StaticWindow;
    }
    /** A simple type that allows adding a 'count' property to arrays to use 'length' as the capacity, while allowing to manually added to index [count-1]. */
    interface IArrayBuffer<T> extends Array<T> {
        /** Number of items in the array (can be less than total array capacity [length]). */
        count: number;
        /** The capacity of this array.  Set the length the initial capacity and use the 'count' property ('count++') to add
        * items to the end. There are some things to consider when adding or removing items within this array:
        * 1. To remove an item from the end simply do '--count'. The overall benefit is fast adding and removing items from the
        * end (LIFO) without causing the array to resize as items are removed.
        * 2. Any items removed before the end via 'splice()' must still remember to do '--count' as well.
        * 3. Any items inserted (before or at end) must remember to do '++count'. Add the last item using '[count++]=item'.
        */
        length: number;
    }
    /**
     * Create a new IArrayBuffer<T> instance.
     */
    function createArrayBuffer<T = number>(): IArrayBuffer<T>;
    /** A simple strongly-typed array that allows adding a 'count' property so that 'length' can be used as the capacity while allowing to manually added to index [count-1]. */
    interface IFloat32ArrayBuffer extends Float32Array {
        /** Number of items in the array (can be less than total array capacity [length]). */
        count: number;
        /** The capacity of this array.  Fixed arrays cannot change length.
        */
        length: number;
    }
    /** Create a new IFloat32ArrayBuffer instance. */
    function createFloat32ArrayBuffer(length: number): IFloat32ArrayBuffer;
    /** Create a new IFloat32ArrayBuffer instance. */
    function createFloat32ArrayBuffer(array: ArrayLike<number>): IFloat32ArrayBuffer;
    /** Create a new IFloat32ArrayBuffer instance. */
    function createFloat32ArrayBuffer(buffer: ArrayBufferLike, byteOffset?: number, length?: number): IFloat32ArrayBuffer;
    /** A reference to the host's global environment (convenient for nested TypeScript code, or when using strict mode [where this=undefined]).
    * This provides a faster, cleaner, consistent, and reliable method of referencing the global environment scope without having to resort to workarounds.
    */
    var global: IStaticGlobals;
    /** A constant value for 'undefined' (eg. if (typeof value == UNDEFINED)...). */
    const UNDEFINED = "undefined";
    /** A constant value for 'function' (eg. if (typeof value == FUNCTION)...). */
    const FUNCTION = "function";
    /** A constant value for 'object' (eg. if (typeof value == OBJECT)...). */
    const OBJECT = "object";
    /** A constant value for 'string' (eg. if (typeof value == STRING)...). */
    const STRING = "string";
    /** A constant value for 'number' (eg. if (typeof value == NUMBER)...). */
    const NUMBER = "number";
    /** A constant value for 'boolean' (eg. if (typeof value == BOOLEAN)...). */
    const BOOLEAN = "boolean";
    /** The root namespace name as the string constant. */
    const ROOT_NAMESPACE = "WorldSimulator2D";
    /** A simple function that does nothing (no operation).
    * This is used to clear certain function properties to prevent being called again.
    */
    function noop(): void;
    /**
     * Evaluates a string within a Function scope at the GLOBAL level. This is more secure for executing scripts without exposing
     * private/protected variables wrapped in closures.
     */
    function safeEval(x: string, ...args: any[]): any;
    /**
     * Evaluates a string directly at the GLOBAL level. This is more secure for executing scripts without exposing
     * private/protected variables wrapped in closures.
     */
    function globalEval(x: string, ...args: any[]): any;
    var FUNC_NAME_REGEX: RegExp;
    /** Attempts to pull the function name from the function text, and returns 'undefined' for anonymous functions. */
    function getFunctionName(func: Function): string;
    /** This locates names of properties where only a reference and the object context is known.
    * If a reference match is found, the property name is returned, otherwise the result is 'undefined'.
    */
    function getReferenceName(obj: {}, reference: object): string;
    /** Erases all properties on the object, instead of deleting them (which takes longer).
    * @param {boolean} release If false, then care is taken not to erase any object property that contains a 'dispose()' function.
    * If true (default) then such objects are also disposed.
    */
    function erase(obj: {}, release?: boolean): {};
    /** Makes a deep copy of the specified value and returns it. If the value is not an object, it is returned immediately.
    * For objects, the deep copy is made by */
    function clone(value: any): any;
    /** Dereferences a property path in the form "A.B.C[*].D..." and returns the right most property value, if exists, otherwise
    * 'undefined' is returned.  If path is invalid, an exception will be thrown.
    * @param {string} path The delimited property path to parse.
    * @param {object} origin The object to begin dereferencing with.  If this is null or undefined then it defaults to the global scope.
    * @param {boolean} unsafe If false (default) a fast algorithm is used to parse the path.  If true, then the expression is evaluated at the host global scope (faster).
    *                         The reason for the option is that 'eval' is up to 4x faster, and is best used only if the path is guaranteed not to contain user entered
    *                         values, or ANY text transmitted insecurely.
    *                         Note: The 'eval' used is 'WorldSimulator2D.eval()', which is closed over the global scope (and not the WorldSimulator2D namespace's private scope).
    *                         'window.eval()' is not called directly in this function.
    */
    function dereferencePropertyPath(path: string, origin?: {}, unsafe?: boolean): {};
    /** Waits until a property of an object becomes available (i.e. is no longer 'undefined').
      * @param {Object} obj The object for the property.
      * @param {string} propertyName The object property.
      * @param {number} timeout The general amount of timeout to wait before failing, or a negative value to wait indefinitely.
      */
    function waitReady(obj: {}, propertyName: string, callback: Function, timeout?: number, timeoutCallback?: Function): void;
    /** Helps support cases where 'apply' is missing for a host function object (i.e. IE7 'setTimeout', etc.).  This function
    * will attempt to call '.apply()' on the specified function, and fall back to a work around if missing.
    * @param {Function} func The function to call '.apply()' on.
    * @param {Object} _this The calling object, which is the 'this' reference in the called function (the 'func' argument).
    * Note: This must be null for special host functions, such as 'setTimeout' in IE7.
    * @param {any} args The arguments to apply to given function reference (the 'func' argument).
    */
    function apply(func: Function, _this: NativeTypes.IObject, args: any[]): any;
    /** Creates and returns a new version-4 (randomized) GUID/UUID (unique identifier). The uniqueness of the result
      * is enforced by locking the first part down to the current local date/time (not UTC) in milliseconds, along with
      * a counter value in case of fast repetitive calls. The rest of the ID is also randomized with the current local
      * time, along with a checksum of the browser's "agent" string and the current document URL.
      * This function is also supported server side; however, the "agent" string and document location are fixed values.
      */
    function createGUID(hyphens?: boolean): string;
    /** Returns the type name for an object instance registered with 'AppDomain.registerType()'.  If the object does not have
    * type information, and the object is a function, then an attempt is made to pull the function name (if one exists).
    * Note: This function returns the type name ONLY (not the FULL type name [no namespace path]).
    * Note: The name will be undefined if a type name cannot be determined.
    * @param {object} obj The object to determine a type name for.  If the object type was not registered using 'AppDomain.registerType()',
    * and the object is not a function, no type information will be available. Unregistered function objects simply
    * return the function's name.
    * @param {boolean} cacheTypeName (optional) If true (default), the name is cached using the 'ITypeInfo' interface via the '$__name' property.
    * This helps to speed up future calls.
    */
    function getTypeName(obj: object, cacheTypeName?: boolean): string;
    /**
     * Sets a type name for an function or object constructor.
     * @param obj The object to set a name for.
     * @param name The type name to use.  If not specified, the type name is detected based on the function or constructor function name.
     */
    function setTypeName(obj: object, name?: string): string;
    /** Returns true if the given object is empty, or an invalid value (eg. NaN, or an empty object, array, or string). */
    function isEmpty(obj: any): boolean;
    /** Converts Celsius to Kelvins. */
    function celsiusToKelvins(c: number): number;
    /** Converts Fahrenheit to Celsius. */
    function fahrenheitToCelsius(f: number): number;
    /**
    * Returns the weight of a single atom based on an atomic weight.
    * @param w Atomic weight (typically taken from the periodic table of elements).
    */
    function atomicWeightToAtomWeight(w: number): number;
    /**
    * Converts the atomic weight to kilograms.
    * @param w Atomic weight (typically taken from the periodic table of elements).
    */
    function atomicWeightToKg(w: number): number;
    function distance2D(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * A regex used to parse names, comments, strings, and symbols.  Used by 'compile()'.
     */
    const jsParseRegex: RegExp;
    interface IInlineInfo {
        funcName: string;
        inlineCode: string;
        varsFound: string[];
        params: string[];
        returnVarName: string;
    }
    class Scope {
        functionName: string;
        paramsFound: string[];
        varsFound: string[];
        isFunctionRootLevel: boolean;
        varMode: number;
        functionMode: number;
        superProtoMode: number;
        superStartIndex: number;
        previousLineInsertIndex: number;
        currentInline: IInlineInfo;
        braceCount: number;
        bracketCount: number;
        squareBacketCount: number;
        forMode: number;
    }
    /**
     * In-lines a function (function keyword, parameters, and body) and returns it as a block scope with 'let' vars are the root.
     * Note: The syntax is only checked in areas required for this function;  No other errors are looked for.
     * @param funcStr A function to convert into an in-line block (using 'let's at the root scope only). The string should include the whole function declaration (not just the body).
     * @returns An object with the in-line code and list of parameter vars to set when inserting to replace calls.
     */
    function inlineFunction(funcStr: string | Function, inlineFuncName?: string, ...superCallDetails: IInlineInfo[]): IInlineInfo;
    /**
     * In-lines all the overridden methods that use 'super' to continue calls to the base level.
     * After calling this, by default, the function in the prototype of the specified object is replaced with in inline version, which is many times faster.
     * @param type The object to in-line functions for.
     * @param funcOrName The function to inline.
     */
    function compile(type: {
        new (...args: any[]): any;
        prototype: {};
    }, funcOrName: Function | string, replace?: boolean): Function;
    function isTypedArray(a: any): boolean;
    /**
     * Queues a handler function to be called with as close to 0 delay as possible.
     * Use 'clearImmediate()' to remove a queued handler.
     */
    function setImmediate(handler: Function, ...args: any[]): number;
    /**
     * Clears a function queued by calling 'setImmediate()'.
     */
    function clearImmediate(handle: number): void;
    namespace InternalUtilities {
        function doEnumReverseMapping(enumObject: {}): void;
    }
    /**
     * Copies an array using the fastest technique possible that consistently works best across most browsers.
     * This is especially faster than 'slice()' in FireFox and IE.
     */
    function copyArray<T>(a: T[]): T[];
    /**
     * Gets name values from an enum object in ascending numerical value order and returns the names as an array of strings.
     * @param enumRef A reference to the enum object.
     * @param except A list of names to exclude from the list.
     */
    function getEnumNames(enumRef: {}, ...except: string[]): string[];
}
declare namespace WorldSimulator2D {
    interface ICallback<TSender> {
        (sender?: TSender): void;
    }
    interface IResultCallback<TSender, TResult> {
        (sender?: TSender, result?: TResult): void;
    }
    interface IErrorCallback<TSender> {
        (sender?: TSender, error?: any): void;
    }
    /** The loader namespace contains low level functions for loading resources.
    * In most cases you can simply just call 'WorldSimulator2D.Loader.get()', or use an instance of the 'ResourceManager' class.
    */
    namespace Loader {
        /** The most common mime types.  You can easily extend this enum with custom types, or force-cast strings to this type also. */
        enum ResourceTypes {
            /** The resource type is not known. */
            Unknown = "",
            Application_Script = "application/javascript",
            Application_ECMAScript = "application/ecmascript",
            Application_JSON = "application/json",
            Application_ZIP = "application/zip",
            Application_GZIP = "application/gzip",
            Application_PDF = "application/pdf",
            Application_DefaultFormPost = "application/x-www-form-urlencoded",
            Application_TTF = "application/x-font-ttf",
            Multipart_BinaryFormPost = "multipart/form-data",
            Audio_MP4 = "audio/mp4",
            Audio_MPEG = "audio/mpeg",
            Audio_OGG = "audio/ogg",
            Audio_MIDI = "audio/midi",
            Audio_WEBM = "audio/webm",
            Audio_WAV = "audio/wav",
            Audio_AAC = "audio/x-aac",
            Audio_CAF = "audio/x-caf",
            Image_GIF = "image/gif",
            Image_JPEG = "image/jpeg",
            Image_PNG = "image/png",
            Image_BMP = "image/bmp",
            Image_WEBP = "image/webp",
            Image_SVG = "image/svg+xml",
            Image_GIMP = "image/x-xcf",
            Text_CSS = "text/css",
            Text_CSV = "text/csv",
            Text_HTML = "text/html",
            Text_JavaScript = "text/javascript",
            Text_Plain = "text/plain",
            Text_RTF = "text/rtf",
            Text_XML = "text/xml",
            Text_JQueryTemplate = "text/x-jquery-tmpl",
            Text_MarkDown = "text/x-markdown",
            Video_AVI = "video/avi",
            Video_MPEG = "video/mpeg",
            Video_MP4 = "video/mp4",
            Video_OGG = "video/ogg",
            Video_MOV = "video/quicktime",
            Video_WMV = "video/x-ms-wmv",
            Video_FLV = "video/x-flv",
            Video_WEBM = "video/webm",
        }
        /** A map of popular resource extensions to resource enum type names.
          * Example 1: ResourceTypes[ResourceExtensions[ResourceExtensions.Application_Script]] === "application/javascript"
          * Example 2: ResourceTypes[ResourceExtensions[<ResourceExtensions><any>'.JS']] === "application/javascript"
          * Example 3: CoreXT.Loader.getResourceTypeFromExtension(ResourceExtensions.Application_Script);
          * Example 4: CoreXT.Loader.getResourceTypeFromExtension(".js");
          */
        enum ResourceExtensions {
            Application_Script = ".js",
            Application_ECMAScript = ".es",
            Application_JSON = ".json",
            Application_ZIP = ".zip",
            Application_GZIP = ".gz",
            Application_PDF = ".pdf",
            Application_TTF = ".ttf",
            Audio_MP4 = ".mp4",
            Audio_MPEG = ".mpeg",
            Audio_OGG = ".ogg",
            Audio_MIDI = ".midi",
            Audio_WEBM = ".webm",
            Audio_WAV = ".wav",
            Audio_AAC = ".aac",
            Audio_CAF = ".caf",
            Image_GIF = ".gif",
            Image_JPEG = ".jpeg",
            Image_PNG = ".png",
            Image_BMP = ".bmp",
            Image_WEBP = ".webp",
            Image_SVG = ".svg",
            Image_GIMP = ".xcf",
            Text_CSS = ".css",
            Text_CSV = ".csv",
            Text_HTML = ".html",
            Text_Plain = ".txt",
            Text_RTF = ".rtf",
            Text_XML = ".xml",
            Text_JQueryTemplate = ".tpl.htm",
            Text_MarkDown = ".markdown",
            Video_AVI = ".avi",
            Video_MPEG = ".mpeg",
            Video_MP4 = ".mp4",
            Video_MOV = ".qt",
            Video_WMV = ".wmv",
            Video_FLV = ".flv",
            Video_WEBM = ".webm",
            Video_OGG = ".ogv",
        }
        /** Return the resource (MIME) type of a given extension (with or without the period). */
        function getResourceTypeFromExtension(ext: string): ResourceTypes;
        /** Return the resource (MIME) type of a given extension type. */
        function getResourceTypeFromExtension(ext: ResourceExtensions): ResourceTypes;
        function getFileExtensionFromURL(url: string): string;
        enum RequestStatuses {
            /** The request has not been executed yet. */
            Pending = 0,
            /** The resource failed to load.  Check the request object for the error details. */
            Error = 1,
            /** The requested resource is loading. */
            Loading = 2,
            /** The requested resource has loaded (nothing more). */
            Loaded = 3,
            /** The requested resource is waiting on parent resources to complete. */
            Waiting = 4,
            /** The requested resource is ready to be used. */
            Ready = 5,
            /** The source is a script, and was executed (this only occurs on demand [not automatic]). */
            Executed = 6,
        }
        /** Creates a new resource request object, which allows loading resources using a "promise" style pattern (this is a custom
          * implementation designed to work better with the CoreXT system specifically, and to support parallel loading).
          * Note: It is advised to use 'CoreXT.Loader.loadResource()' to load resources instead of directly creating resource request objects.
          * Inheritance note: When creating via the 'new' operator, any already existing instance with the same URL will be returned,
          * and NOT the new object instance.  For this reason, you should call 'loadResource()' instead.
          */
        class ResourceRequest {
            private $__index;
            /** The requested resource URL. */
            url: string;
            /** The requested resource type (to match against the server returned MIME type for data type verification). */
            type: ResourceTypes;
            /** The XMLHttpRequest object used for this request.  It's marked private to discourage access, but experienced
              * developers should be able to use it if necessary to further configure the request for advanced reasons.
              */
            _xhr: XMLHttpRequest;
            /** The raw data returned from the HTTP request.
              * Note: This does not change with new data returned from callback handlers (new data is passed on as the first argument to
              * the next call [see 'transformedData']).
              */
            data: any;
            /** Set to data returned from callback handlers as the 'data' property value gets transformed.
              * If no transformations were made, then the value in 'data' is returned.
              */
            readonly transformedData: any;
            private $__transformedData;
            /** The response code from the XHR response. */
            responseCode: number;
            /** The response code message from the XHR response. */
            responseMessage: string;
            /** The current request status. */
            status: RequestStatuses;
            /** A progress/error message related to the status (may not be the same as the response message). */
            message: string;
            private $__message;
            /** Includes the current message and all previous messages. Use this to trace any silenced errors in the request process. */
            messages: string[];
            /** If true (default), them this request is non-blocking, otherwise the calling script will be blocked until the request
              * completes loading.  Please note that no progress callbacks can occur during blocked operations (since the thread is
              * effectively 'paused' in this scenario).
              */
            async: boolean;
            private _onProgress;
            private _onReady;
            /** This is a list of all the callbacks waiting on the status of this request (such as on loaded or error).
            * There's also an 'on finally' which should execute on success OR failure, regardless.
            * For each entry, only ONE of any callback type will be set.
            */
            private _promiseChain;
            private _promiseChainIndex;
            _dependents: ResourceRequest[];
            private _dependentCompletedCount;
            _dependants: ResourceRequest[];
            private _paused;
            private _queueDoNext(data);
            private _queueDoError();
            private _requeueHandlersIfNeeded();
            then(success: ICallback<IResourceRequest>, error?: IErrorCallback<IResourceRequest>): this;
            /** Adds another request and makes it dependent on the current 'parent' request.  When all parent requests have completed,
              * the dependant request fires its 'onReady' event.
              * Note: The given request is returned, and not the current context, so be sure to complete configurations before hand.
              */
            include(request: IResourceRequest): IResourceRequest;
            /**
             * Add a call-back handler for when the request completes successfully.
             * @param handler
             */
            ready(handler: ICallback<IResourceRequest>): this;
            /** Adds a hook into the resource load progress event. */
            while(progressHandler: ICallback<IResourceRequest>): this;
            /** Call this anytime while loading is in progress to terminate the request early. An error event will be triggered as well. */
            abort(): void;
            /**
             * Provide a handler to catch any errors from this request.
             */
            catch(errorHandler: IErrorCallback<IResourceRequest>): this;
            /**
             * Provide a handler which should execute on success OR failure, regardless.
             */
            finally(cleanupHandler: ICallback<IResourceRequest>): this;
            /** Starts loading the current resource.  If the current resource has dependencies, they are triggered to load first (in proper
              * order).  Regardless of the start order, all scripts are loaded in parallel.
              * Note: This call queues the start request in 'async' mode, which begins only after the current script execution is completed.
              */
            start(): this;
            private _Start();
            /** Upon return, the 'then' or 'ready' event chain will pause until 'continue()' is called. */
            pause(): this;
            /** After calling 'pause()', use this function to re-queue the 'then' or 'ready' even chain for continuation.
              * Note: This queues on a timer with a 0 ms delay, and does not call any events before returning to the caller.
              */
            continue(): this;
            private _doOnProgress(percent);
            setError(message: string, error?: {
                name?: string;
                message: string;
                stack?: string;
            }): void;
            private _doNext();
            private _doReady();
            private _doError();
            /** Resets the current resource data, and optionally all dependencies, and restarts the whole loading process.
              * Note: All handlers (including the 'progress' and 'ready' handlers) are cleared and will have to be reapplied (clean slate).
              * @param {boolean} includeDependentResources Reload all resource dependencies as well.
              */
            reload(includeDependentResources?: boolean): this;
            /** Constructs a load request promise-type object for a resource loading operation.
            * @param url The resource URL relative to the current browser page location.
            * @param type The resource type expected.
            * @param asyc If the main thread should be blocked while loading the resource. This is depreciated in some/most browsers and should normally not be used.
            */
            constructor(url: string, type: ResourceTypes, async?: boolean);
        }
        interface IResourceRequest extends ResourceRequest {
        }
        /** Returns a load request promise-type object for a resource loading operation.
        * @param url The resource URL relative to the current browser page location.
        * @param type The resource type expected. If not specified, the type will be detected from the URL if possible (this assumes the filename extension is part of the end of the URL).
        */
        function get(url: string, type?: ResourceTypes): IResourceRequest;
    }
}
declare namespace WorldSimulator2D {
    class Vector2D implements IClonable, IDisposable, IInitializable {
        static readonly Up: Vector2D;
        static readonly Down: Vector2D;
        static readonly Left: Vector2D;
        static readonly Right: Vector2D;
        static readonly Zero: Vector2D;
        x: number;
        y: number;
        /** Normalized 'x' after 'updateNormals()' is called. */
        nx: number;
        /** Normalized 'y' after 'updateNormals()' is called. */
        ny: number;
        constructor(x?: number, y?: number);
        initialize?(isnew: boolean, autoReset?: boolean, autoResetProperties?: boolean): void;
        isDisposed?: boolean;
        dispose?(): void;
        clone(): this;
        updateNormals(): void;
    }
}
declare namespace WorldSimulator2D {
    /** Internal objects type flags use to identify internal object hierarchy - especially in case they are inherited by 3rd parties. */
    enum ObjectTypes {
        EngineObject = 1,
        GraphObject = 2,
        SpacialObject = 4,
        PhysicsObject = 8,
        Engine = 16,
        World = 32,
        Layer = 64,
        Matter = 128,
        WorldObject = 256,
    }
    /** Allows objects to be disposable in the system by allowing cached items to be re-initialized and re-configured. */
    interface IInitializable {
        /**
         * Called by the engine when creating a new type, or pulling from the cache (optional, and thus may be undefined).
         * @param isnew True if the type is brand new, and false if it was pulled from the cache of disposed objects.
         */
        initialize?(isnew: boolean, autoReset?: boolean, autoResetProperties?: boolean): void;
        /** Set to true once an object is initialized, and false when disposed. */
        isInitialized?: boolean;
        /**
         * Replaces the constructor, and is used to configure/reconfigure the object (optional, and thus may be undefined).
         * @param args This is defined, if used, by derived types.
         */
        configure?(...args: any[]): this;
    }
    /** Allows objects to be disposable in the system. */
    interface IDisposable {
        /** The property has 3 states: undefined = disposal not started, false = disposal started, and true = disposed. */
        isDisposed?: boolean;
        /** If exists, the function is called to dispose the object if 'isDisposed' is not true. */
        dispose?(): void;
    }
    interface IClonable {
        clone(): this;
    }
    interface IInternalEngineObject extends IDisposable, IInitializable, IClonable {
        engine: Engine;
        id: number;
        uniqueName: string;
    }
    /**
     * Holds the position of an object on a specific layer.
     * Note to developers: When creating derived types, DO NOT require constructor parameters. ALL such parameters MUST be
     * optional, since the system will need to deserialize or clone to new empty instances.
     */
    class EngineObject implements IEngineObject, IInternalEngineObject, IDisposable, IInitializable {
        /** The type name for this class. The name is prefilled for all engine object types.
        * Custom types should make sure to call 'WorldSimulator2D.getTypeName(CustomeType);' at least once before using the type with the engine.
        */
        protected static readonly $__name?: string;
        /** Returns the type name for this class, or the name of a derived class.
        * Custom types should make sure to call 'WorldSimulator2D.getTypeName(CustomeType);' at least once before using the type with the engine.
        */
        static readonly typeName: string;
        /** Returns the type name for this object.
        * Custom types should make sure to call 'WorldSimulator2D.getTypeName(CustomeType);' at least once before using the type with the engine.
        */
        readonly typeName: any;
        /** Inheritance type flags showing which internal super-types were used to create the current sub-type.
        * @see ObjectTypes
        */
        static readonly type: ObjectTypes;
        readonly engine: Engine;
        /** An ID for this object, which is unique for every object in a single engine instance only. */
        readonly id: number;
        /** A unique name for this object in the system (undefined by default, in which case the 'id' property is assumed). */
        uniqueName: string;
        private _uniqueName;
        /** Returns the unique name for this object, or it's ID, whichever is available in that order. */
        readonly uniqueNameOrID: string | number;
        readonly isInitialized?: boolean;
        readonly isDisposed?: boolean;
        /** Set only if the object was created from a prefab template. */
        createdFrom?: IEngineObject;
        constructor();
        /**
         * Pulls properties from an unmodified instance of this type to re-initialize the properties back to their *constructor*
         * defaults (NOT configuration defaults).  This works because of the "injection" nature of the engine's type system.
         * NOTE: ONLY primitive values are restored.  Object references are left as is.  Developers will have to implement
         * IInitializable in the objects or handled object properties within an Initialization function on the wrapping object.
         * @param includeAddedProperties If true, any properties added are set to undefined.
         * This causes a second loop to check the current object properties, and thus to be faster this is false by default.
         * In such cases it might be faster to make sure such properties are dealt with in the 'initialize()' function instead.
         */
        autoReset(includeAddedProperties?: boolean): void;
        /**
         * Called by the engine when creating a new type, or pulling from the cache (optional, and thus may be undefined).
         * NOTE: Any properties that have
         * @param isnew True if the type is brand new, and false if it was pulled from the cache of disposed objects.
         * @param autoReset If true (the default), the base 'EngineObject' type will detect and auto reset the properties
         * set by the constructor the first time the object was constructed.
         * @param autoResetProperties If true (the default), the base 'EngineObject' type will auto reset any object
         * properties that also implement IInitializable (that contain an 'initialize' function).
         */
        initialize(isnew: boolean, autoReset?: boolean, autoResetProperties?: boolean): void;
        /**
         * Replaces the constructor, and is used to configure the object (optional, and thus may be undefined).
         * @param args This is defined, if used, by derived types.
         */
        configure?(...args: any[]): this;
        dispose(): void;
        /**
         * Returns a new Error instance with added information to identify the object.
         * @param msg The error message.
         * @param world An optional world reference associated with the error, if applicable.
         * @param msg An optional layer reference associated with the error, if applicable.
         */
        error(msg: string, world?: IWorld, layer?: ILayer): Error;
        protected static _nonClonableProperties: I_nonClonableProperties;
        /**
         * Makes a copy of this object by creating a new object of the same type and setting ONLY the primitive values from this instance.
         * If any object property has an object with a 'clone()' method (implements IClonable), it is called also.
         * NOTE: Object properties that don't contain a 'clone()' function are INGORED.   Developers overriding types will have
         * to override this function also to handle such cases 'manually' (or implement IClonable).
         */
        clone(): this;
        /**
         * Override this to customize saving the object type and state into a JSON string.
         * If any object property also has an object with a 'save()' method, it is called as well.
         */
        save(): string;
        /**
         * An optional function that can be implemented to support serializing this object.
         * When 'save()' is called, 'JSON.stringify()' is used to serialize this object and any object properties.
         * 'JSON.stringify()' is supported in most (if not all) modern browsers.
         * Warning: This is NOT defined by default.  If defined, 'JSON.stringify()' will reply on it completely to serialize this specific object.
         * @param nameOrIndex Property name, array index, or empty string for objects (see the 'JSON.stringify()' specification for more details).
         */
        toJSON?(nameOrIndex: string): string;
        /**
         * Save this engine object as a prefab (template) in the engine.
         */
        saveAsPrefab(): number;
    }
    /** Represents an object instance within an engine instance. */
    interface IEngineObject extends EngineObject {
    }
    interface I_nonClonableProperties {
        [name: string]: undefined;
    }
}
declare namespace WorldSimulator2D {
    interface IGraphObjectInternal {
        index: number;
        world: IWorld;
        layer: ILayer;
        parent: IGraphObject;
        previous: IGraphObject;
        next: IGraphObject;
        firstChild: IGraphObject;
        lastChild: IGraphObject;
        flattenedItems: IArrayBuffer<IGraphObject>;
        graphUpdated: boolean;
        childrenUpdated: boolean;
        children: IArrayBuffer<IGraphObject>;
    }
    /**
     * Holds a collection of nested objects.
     * A graph is a comment nested-layout-based construct used by most layout engines (example: the browser DOM).
     */
    class GraphObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends EngineObject implements IGraphObjectInternal {
        static readonly type: number;
        protected static _nonClonableProperties: I_nonClonableProperties;
        /** The index of this object in the parent child collection. */
        readonly index: number;
        /** The world in which this graph object resides. */
        readonly world: IWorld;
        /** The layer in the world in which this graph object resides. */
        readonly layer: ILayer;
        /** The parent object to this object. */
        readonly parent: TParent;
        /** The previous sibling graph object. */
        readonly previous: IGraphObject;
        /** The next sibling graph object. */
        readonly next: IGraphObject;
        /** The first graph object child under this graph object (linked-list). */
        readonly firstChild: TChildren;
        /** The last graph object child under this graph object (linked-list). */
        readonly lastChild: TChildren;
        /** All child items under this graph object. */
        readonly children: IArrayBuffer<TChildren>;
        private _children;
        /** Set to true when the graph under this object has changed (not including this object).
        * This is especially used by the world instance to know when to re-flatten the hierarchy for processing.
        */
        readonly graphUpdated: boolean;
        /** Set to true when any immediate child was added or removed under this object.
        * This is especially used to speed up flattening the graph hierarchy.
        */
        readonly childrenUpdated: boolean;
        /**
        * Triggered every time the parent reference changes.
        * @param source The source of the event. This is used mainly to update the local world and layer references when a parent changes.
        */
        protected onParentChanged(source: IGraphObject): void;
        /** The number of updates made to this object. The update increments each time 'update()' is called.  This is 0 when the update is being called for the first time. */
        readonly updateCount: number;
        protected _updateCount: number;
        /** This is false before 'update()' is called, then true for every call thereafter. */
        readonly running: boolean;
        constructor();
        /**
       * Returns a new Error instance with added information to identify the graph object.
       * @param msg The error message.
       */
        error(msg: string): Error;
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(...args: any[]): this;
        dispose(): void;
        /**
         * Remove all the child objects from this graph object.
         */
        clear(): void;
        /**
         * Adds the specified object and returns it's position in the collection.
         * @param obj The object to add.
         */
        add(obj: TChildren): TChildren;
        private _updateWorldAndLayer(world, layer);
        /**
         * Removes and returns the current object from the parent and returns it.
         */
        remove(): this;
        /**
         * Called once ONLY when '{Engine}.update()' is called the first time.
         */
        startup(): this;
        /**
         * Call to update this object and copy the results to the buffer for accelerated processing.
         * @param buffer The buffer that will receive the updated values from this object.
         * @param index The index where to copy the values.
         * @returns True if values were written to the buffer, and false otherwise.
         */
        update(processor?: MathPipelines.MathProcessor): this;
        /**
         * Process calculations.
         * @param buffer The buffer with the results.
         * @param index The index into the buffer with the result block.
         * @param calcID
         */
        postUpdate?(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        /**
         * Called during the render process, before the world gets rendered.
         */
        render(includeNext?: boolean): void;
        /** Call 'flatten()' to build/update this list.
        * 'flattenedItems.count' will be the actual number of items stored. 'flattenedItems.length' is capacity only (to limit any resizing).
        */
        readonly flattenedItems: IArrayBuffer<IGraphObject>;
        /**
         * Flattens the graph hierarchy (this object and all children) as an array and returns the array.
         * If 'graphUpdated' is true, then no changes where made to the hierarchy, and the previous list is returned as is.
         * Calling this function will set 'graphUpdated' to false on this object (only).
         * The array returned is cached in the current instance and reused.  If you wish to modify the array, be aware calling this function
         * will update the same array.  Make sure to make a copy of the array returned if you wish to persist any changes to it.
         * You can use 'WS2D.copyArray()' for a fast cross-browser solution.
         * Note: The array returned is of type 'WS2D.IArrayBuffer', and has a 'count' property for the number of items, not
         * 'length'. The array length is the "capacity" of the array, not the number of items.
         * WARNING: This should only be called on a root object of a tree (like the world).  Calling this on every object would create a
         * flattened array on every object in the tree for all objects under it, taking up way too much memory than really needed.
         * @param includethis If true (default) then the current object is included in the flattened list.
         */
        flatten(includethis?: boolean): IArrayBuffer<IGraphObject>;
        /**
         * Traverse the tree in real-time to count this instance and all child instances.
         * Note: 'flattenedItems.count' can also be used to get a count of all objects when 'flatten()' is called.
         */
        count(): number;
    }
    interface IGraphObject extends GraphObject {
    }
}
declare namespace WorldSimulator2D {
    class SpacialState implements IClonable {
        /** The position of the object (in world particles). By default convention, every 32 units is considered 1.75 meters. */
        position: Vector2D;
        /** After calling 'update()', this stores the direction of travel (-1, 0, or 1 for 'x' and 'y')  for this object, if any.
        */
        direction: Vector2D;
        /** A flag that is set per update frame when the object's position changed since the last update.
        * Since this is calculated when 'update()' is called, movements made after the method is called won't be detected until the next frame.  To prevent this, make movements BEFORE calling 'super.update()' from derived types.
        */
        moved: boolean;
        /** A flag that is set per update frame when the object's grid location changed since the last update.
        * Since this is calculated when 'update()' is called, movements made after the method is called won't be detected until the next frame.  To prevent this, make movements BEFORE calling 'super.update()' from derived types.
        */
        gridMoved: boolean;
        /** A flag that is set when the object position is not the same as the last position.
        * This flag is never cleared once set and must be manually cleared.
        */
        hasMoved: boolean;
        /** A flag that is set when the object position has NEVER changed. Once set, the flag is never cleared.
        * This flag is used to figure out which objects have remained unmoved since the simulation started.
        */
        readonly neverMoved: boolean;
        /**
         * Update the current state with values from another state.
         */
        copyFrom(state: ISpacialState): this;
        /**
         * Update the given state with values from the current state.
         */
        copyTo(targetState: ISpacialState): this;
        clone(): this;
    }
    interface ISpacialState extends SpacialState {
    }
    interface ISpatialObjectInternal {
        _gridCell: IGridCell;
        _gridItemsIndex: number;
        isPhysicsObject: boolean;
    }
    /**
     * Holds the position of an object on a specific layer.
     * The position of an object is based on world particles and NOT graphic pixels.
     * A world particle is a group of one or more display pixels. Since matter is processed per particle, this allows scaling for better performance.
     * NOTE: Positive "Y" is UP.  This is to keep consistent with most 3D contexts
     */
    class SpatialObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends GraphObject<TParent, TChildren> implements ISpatialObject, ISpatialObjectInternal {
        static readonly type: number;
        protected static _nonClonableProperties: I_nonClonableProperties;
        /** The type to use when creating states objects for storing calculated properties for this object.
        * Every object contains a type of state for data storage.
        */
        protected static _StateType: typeof SpacialState;
        /** A quick reference to the array container at the grid location where this object was last placed. */
        readonly _gridCell: IGridCell;
        readonly _gridItemsIndex: number;
        /** This is true if this object implements physics based routines (an IPhysicsObject type with mass, velocity, etc.). */
        readonly isPhysicsObject: boolean;
        /** If true then this object can collide. If not it is ignored in all collisions. */
        canCollide: boolean;
        /** If false/undefined (default) then this object can move when collided with.
        * If not, it is stationary and the force of impact is applied 100% back to the impacting object's velocity based on it's travel direction.
        */
        unmovable: boolean;
        /** History of states for the object. Enabling states allows to track previous states (position, velocity, etc.) for the object - but this can
        * be an expensive operation to do to many times, so it's important to limit this only to a few objects.
        */
        history: SpacialState[];
        /** The maximum history length (default is 0). */
        historyMax: number;
        /** The current state of calculated data. A default instance is set after initialization and remains for the lifetime of the object.
        * After movement, the current state is copied to the history.  If no movement, there won't be any history (for better efficiency).
        */
        currentState: SpacialState;
        /** The previous state of calculated data. This is undefined until new calculations are received.
        * After movement, the current state is copied to the history.  If no movement, there won't be any history (for better efficiency).
        */
        previousState: SpacialState;
        /** Gets/sets 'currentState.x'. */
        x: number;
        /** Gets/sets 'currentState.y'. */
        y: number;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(...args: any[]): this;
        clone(): this;
        dispose(): void;
        startup(): this;
        /**
         * This is called first by the startup to calculate initial values, and by 'update()' to continue the process.
         * This function does not update any child objects, and only applies to the current object itself.
         */
        protected _updateGridWithPosition(): void;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
        /**
         * This is an event that is triggered when two objects are detected as colliding within a layer.
         * By default the physics system picks up on this event and does the following:
         * 1. Gets the 'force' of the two objects.
         * 2. Determines of one particle "destroys" another due to low density.
         * 3. Determines the net rebound force based on current inertia forces.
         * @param source The object in the collision that was moved when the collision occurred. Typical reactions are to
         * move the source back to its last position and apply impact forces to both objects.
         * @param target The object the source collided with. This object did not move yet!
         */
        onCollided?(source: ISpatialObject, target: ISpatialObject): void;
        /**
         * Triggers when an objects falls outside the grid (once only).
         * The default implementation deletes objects flying outside the grid zone (which is required for particle collisions).
         * They become lost in infinite travel outwards from grid center at 0,0, thus it is not considered a collision or destruction event.
         * @param source The layer that had the object before it went outside the bounds.
         */
        onOutsideGrid(source: ILayer): void;
    }
    interface ISpatialObject extends SpatialObject {
    }
}
declare namespace WorldSimulator2D {
    class PhysicsState extends SpacialState {
        /**
         * In Kilograms, which is also used to determine the density and gravitational force of attraction.
         **/
        mass: number;
        /** The sum of all directional forces being applied to this object (not normalized). */
        netForce: Vector2D;
        /** This is calculated based on the mass and current velocity after 'update()' is called. */
        momentum: Vector2D;
        /** The calculated speed of the object. This is what the object should be before any dampening is applied for game purposes. */
        velocity: Vector2D;
        /** The speed of the object after 'update()' is called (one physics calculation pass, or one "step"). */
        stepVelocity: Vector2D;
        copyFrom(state: SpacialState): this;
        clone(): this;
    }
    /**
     * Holds physics properties for this object in regards to speed, velocity, mass, and gravity. It also takes into account the gravity of the world as well.
     */
    class PhysicsObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends SpatialObject<TParent, TChildren> implements IPhysicsObject {
        static readonly type: number;
        protected static _nonClonableProperties: I_nonClonableProperties;
        protected static _StateType: typeof PhysicsState;
        readonly history: PhysicsState[];
        readonly currentState: PhysicsState;
        readonly previousState: PhysicsState;
        /** Gets 'currentState.velocity'. */
        readonly velocity: Vector2D;
        /** Gets/sets 'currentState.mass'. */
        mass: number;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(...args: any[]): this;
        dispose(): void;
        startup(): this;
        static gpuKernal(a: number[], typeIndex: number, dataIndex: number, outIndex: number, __this: {
            thread: {
                x: number;
            };
        }, result: number): number;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
        /** Set the mass on this object to a scaled version of the real world kilogram value. */
        setMass(kg: number): this;
        /** Set the mass on this object to a scaled version of the real world gram value. */
        setMassInGrams(g: number): this;
        /**
         * Converts and adds the given atomic weight to this matter.
         * The return value is the matter object itself so more than one weight can be added.
         * @param w An atomic weight (typically taken from the periodic table).
         * @param count An optional value to use as a convenient multiplier. This is typically the subscript of an element in a formula (i.e. the 2 in H2O).
         */
        addAtomicWeight(w: number, count?: number): this;
    }
    interface IPhysicsObject extends PhysicsObject {
    }
}
declare namespace WorldSimulator2D {
    interface IGridCell {
        objects: ISpatialObject[];
        lastIndex: number;
    }
    interface IHGrid extends Array<IGridCell> {
    }
    interface IVGrid extends Array<IHGrid> {
    }
    interface IGrid extends IVGrid {
    }
    interface ILayerInternals {
        grid: IGrid;
    }
    /**
     * Represents a single layer in the world which spatial objects are placed on.
     */
    class Layer extends SpatialObject<IWorld, ISpatialObject> implements ILayer, ILayerInternals {
        static readonly type: number;
        static _nonClonableProperties: I_nonClonableProperties;
        /** The previous layer object. */
        readonly previous: ILayer;
        /** The next layer object. */
        readonly next: ILayer;
        /**
        * A layer grid is an array of active objects, typically representing the grid-scaled location of a special object.
        * The grid allows for fast lookups of surrounding objects without needing to test every single object.
        */
        readonly grid: IGrid;
        /** The minimum particles and objects can go to the left of grid center (from 0,0). Default is -1000.
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        minX: number;
        /** The maximum particles and objects can go to the right of grid center (from 0,0). Default is 1000.
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        maxX: number;
        /** The minimum particles and objects can go up from grid center (from 0,0). Default is 1000 (positive is up in this system).
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        minY: number;
        /** The maximum particles and objects can go down from grid center (from 0,0). Default is -1000 (negative is down in this system).
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        maxY: number;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(minX?: number, minY?: number, maxX?: number, maxY?: number, ...args: any[]): this;
        private _buildGrid();
        dispose(): void;
        /**
         * The grid cell items at the specific grid location.
         * @param gridx The grid X cell location (integer only).
         * @param gridy The grid Y cell location (integer only).
         */
        getGridCell(gridx: number, gridy: number): IGridCell;
        /**
         * The grid cell items at the specific grid location the specified object is in.
         * @param obj The object to get grid items for.
         * @param createIfNone If true (default is false) and no array of items exists, one is created and returned.
         */
        getGridCell(obj: ISpatialObject): IGridCell;
        /**
        * Stores the specified object in the dynamic grid system.  Valid 'gridX' and 'gridY' values must be set first, otherwise the request is ignored.
        * @param obj The object to set in the grid.
        * @returns The layer instance.
        */
        private _OnObjectGridPositionChanged(obj);
        /**
        * Removes the specified object from the dynamic grid system.  If the object is not in the grid, the request is ignored.
        * @param obj The object to removed from the grid.
        * @returns The layer instance.
        */
        private _removeObjectFromGrid(obj);
        startup(): this;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
    }
    interface ILayer extends Layer {
    }
}
declare namespace WorldSimulator2D {
    enum States {
        Air = 0,
        Water = 1,
        Rock = 2,
        Metal = 3,
    }
    /**
     * Records binding properties between matter.
     * Matter "breaks off" from groups when the surrounding attraction is no longer adequate to hold onto it.
     */
    class Binding {
        source: Matter;
        target: Matter;
        magnitude: number;
        constraint: number;
        /** The current angle between the source and target particles. */
        angle: number;
        /** The amount of angular force exerted by the source particle. */
        angularForce: number;
        /** The amount of angular velocity as a result of the angularForce. */
        angularVelocity: number;
        /** The amount of resistance to change in angular motion for this binding. Vales range from 0.0 (no resistance) to 1.0 (fully locked, no motion). */
        angularResistence: number;
        /**
         * Constructs an object to
         * @param source The owner of this instance.
         * @param target The target bound to.
         * @param magnitude The amount of force attraction between the two matter particles.
         * @param constraint An angular
         */
        constructor(source: Matter, target: Matter, magnitude?: number, constraint?: number);
    }
    /**
     * The most basic element in the world simulator is particle matter.  It has properties that defined its behavior in the world simulator.
     * It's important to remember that most values in the simulator are not designed to be "real world" for better "playability".
     * Matter exists as the smallest unit - so each world "pixel" (may be more than one screen pixel) is a piece of matter.
     * No two matter particles can occupy the same space.
     * Note: Don't defined a property if it is not applicable (it should be left undefined, or set to undefined is no longer in use).
     */
    class Matter extends PhysicsObject implements IMatter {
        static readonly type: number;
        /** Used to scale the mass in relation to the mass of earth (defaults to 10^24). */
        static readonly MASS_SCALE: number;
        static readonly AU_SCALE: number;
        static readonly LIGHT_YEAR_SCALE: number;
        static _nonClonableProperties: I_nonClonableProperties;
        /**
        * Bindings to any matter surrounding this matter, or joined by some force.
        * This is usually set for matter that is part of a group of connected matter in a world object, but could also be used in
        * fluid simulations to create elastic/magnetic/surface tension attractions, or by joint systems.
        * @see Binding for more details.
        */
        bindings: Binding[];
        name: string;
        /** The coefficient from 0.0 (inelastic) to 1.0 (elastic) used to calculate how much bounce the matter has. */
        bounciness: number;
        /** A color to use for this matter.  */
        color: string;
        /**
        * How bright the matter is when not emitting it's own light (if any).
        * Valid values are 0.0 (dark) to 1.0 (fully lit). Values higher than 1 will start to overexpose the color and turn it towards white.
        * The luminosity is calculated based on other surrounding light sources.
        */
        luminosity: number;
        /** How dense the matter is (in g/cm3 [but used as g/cm2 for the 2D simulation]; typical values are taken from the periodic table). */
        density: number;
        /**
         * Liquids boil when their vapor pressure is equal to the pressure exerted on the liquid by its surroundings.
         * 0.0 is no pressure (solid, no molecular movement), whereas 1.0 is full pressure (great molecular movement) turning the
         * matter into gas (assuming the surrounding pressure is less).
         * For liquids, the vapor pressure (as a function of temperature) has an exponential behavior.
         */
        readonly vaporPressure: number;
        /**
         * The temperature in kelvins at which the matter freezes (turns solid).
         * To convert from Celsius simply add 273.15.
         */
        freezingPoint: number;
        /**
         * The temperature in kelvins at which the matter boils (turns to gas).
         * To convert from Celsius simply add 273.15.
         */
        boilingPoint: number;
        /**
         * The current temperature of the matter, in kelvins. The default is the world temperature contained in the engine.
         * To convert from Celsius simply add 273.15.
         */
        temperature: number;
        /** A value from -1.0 (solid/frozen) to 0.0 (liquid) and 1.0 (gas). */
        /** A simple pseudo coefficient-type value from 0.0 (no friction) to 1.0 (very adhesive). */
        frictionCoefficient: number;
        static solidFrictionTempuratureExponent: number;
        static viscousFrictionTempuratureExponent: number;
        readonly friction: number;
        /**
         * Determines resistance to gradual deformation by outside forces.
         * The value is 0.0-1.0, which, in centipoise/millipascal units, is 1 (Water) - 200000 ().
         * 0.0 is none (space), and 1.0 is solid.
         */
        viscosity: number;
        /** A value from 0.0 (not magnetic) to 1.0 (fully magnetic).
         * Note that fully magnetic (1.0) is a force that will likely apply to most objects, even at far distances.
         */
        magnetic: number;
        /** The direction of magnetic north.  Only used if the magnetic factor is grater than zero. */
        magneticNorth: Vector2D;
        /** A value from 0.0 (completely stable) to 1.0 (explodes instantly).
         * Note that when matter explodes into pieces, those smaller pieces can be attracted again if the mass is large enough.
         */
        volatility: number;
        /** The rotation of this matter (affects magnetic north, collisions, etc.). */
        rotation: number;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(element?: Element): this;
        clone(): this;
        /** Gets or sets a single element.  If there are more than one element, only the first element is changed. */
        element: Element;
        private _element;
        /** A list of elements when 'addElement()' is used. When calling 'setElement()' or setting the 'element' property, any existing items are replaced by the one new one.
        * Note: Updating this array does NOT change the matter properties;  It is here for reference only.  Use the various functions for modifying matter properties instead.
        */
        _elements: Element[];
        setElement(element: Element): Matter;
        /**
         * Converts and adds the properties of the given element to this matter.
         * The return value is the matter object itself so more than one element can be added.
         * @param w An atomic weight (typically taken from the periodic table).
         * @param count An optional value to use as a convenient multiplier. This is typically the subscript of an element in a formula (i.e. the 2 in H2O).
         */
        addElement(element: Element, count?: number): Matter;
        startup(): this;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
        onCollided?(source: ISpatialObject, target: ISpatialObject): void;
    }
    interface IMatter extends Matter {
    }
}
declare namespace WorldSimulator2D {
    /**
     * Types and routines
     */
    namespace MathPipelines {
        var GPU_KERNAL_MAX_DATA_PER_OBJECT: number;
        /**
         * The vertex shader code to use when processing objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         * @param varyings One ore more varyings for feedback buffers.
         */
        var processCode_vs: (gl: WebGL, varyings: string[]) => string;
        /**
         * The fragment shader code to use when processing objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         */
        var processCode_fs: (gl: WebGL) => string;
        enum ParticleRenderInputs {
            /** X Position of the particle. */
            x = 0,
            /** Y Position of the particle. */
            y = 1,
            /** RGB color 8-bit colors encoded into a float (bottom 24 bits). */
            colorRGB = 2,
            /** Transparency (0.0 to 1.0). */
            alpha = 3,
            /** Keep as the last enum to know the size of the float block required. */
            blockSize = 4,
        }
        /**
         * The vertex shader code to use when rendering objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         */
        var renderCode_vs: (gl: WebGL) => string;
        /**
         * The fragment shader code to use when rendering objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         */
        var renderCode_fs: (gl: WebGL) => string;
    }
}
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
            blockSize = 8,
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
declare namespace WorldSimulator2D {
    interface IInternalWorldProperties {
        gl: WebGL;
        particleRenderProgram: GL.ShaderProgram;
        element: HTMLElement;
        resourceManager: ResourceManager;
        pixelSize: number;
        currentTemperature: number;
        atmosphericPressure: number;
    }
    /**
     * Represents a single simulated world to render to an output.
     * While calling '{Engine}.render()' is enough, the simulation output is on a per-world basis.  Also, each world has its
     * own render service. This has an interesting benefit of allowing for multiple output screens per world on a single
     * browser! This could be useful for allowing people to move from one world to another while keeping the simulation of
     * the worlds separated.
     * Unit definitions: A "World Pixel" is a pixel in the simulated world.  A "Graphics Pixel" or "Display Pixel" is considered
     * a pixel on the graphics card display output.  By default, 32 graphics display pixels is treated as 1.75 meters.
     */
    class World extends PhysicsObject<Engine, Layer> implements IWorld, IInternalWorldProperties {
        static readonly type: number;
        static readonly DEFAULT_EARTH_MASS: number;
        static readonly DEFAULT_EARTH_RADIUS: number;
        static DefaultPixelSize: number;
        static _nonClonableProperties: I_nonClonableProperties;
        /** The previous world object. */
        readonly previous: IWorld;
        /** The next world object. */
        readonly next: IWorld;
        /** The internal WebGL wrapper context used for math and graphics processing. */
        readonly gl: WebGL;
        readonly particleRenderProgram: GL.ShaderProgram;
        /** The target element to receive the output from the render service. */
        readonly element: HTMLElement;
        readonly resourceManager: ResourceManager;
        /**
        * The size in graphics display pixels for a single "pixel" in the simulated world.
        * For example, if this is 2 (the default) then each pixel on a world layer is equal to a 2x2 graphics display pixel.
        * Note: This also dictates the layer grid cell size (width and hight).  Because of the particle grouping by grid cell, it
        * also has the effect of acting as the "collision radius" of a particle, since collisions only check in colliding grid cells.
        */
        readonly pixelSize: number;
        /** The current temperature of the world in Kelvins. The default starts at 20C/68F (converted to Kelvins). */
        readonly currentTemperature: number;
        /** The radius of the world (in km) to the world center. */
        radius: number;
        /** The size of a world grid block in world pixels (not graphics display pixels, as defined by 'pixelSize). The default is 32. */
        unitBlockSize: number;
        /** The number of meters in a unit block size.  The default is 1.75/ */
        metersPerBlockSize: number;
        /** When two particles occupy the same space (which is not possible in real life) the force of attraction due to gravity
        * can cause and explosive force pushing objects apart.  This number is a cap to make sure this doesn't happen.
        * The default is the same size as the pixel size.
        */
        maxGravitationalForce: number;
        /** The physics velocity is scaled by this factor to prevent skipping particle grid locations at high velocities.
        * In the system, the force of gravity is treated like m/s^2 (a unit/s each second). This is applied to velocities which are in units/s.
        * Since the velocities are in units/s at a given point, the velocities are scaled by the second using this property. This
        * helps to prevent skipping grid locations, however it also means that the update loop should be called more than once each
        * frame.  For 60 frames/second, the times to update objects should also be scaled at '60 / velocityScale'.
        */
        velocityScale: number;
        /** Scales gravitational forces to be within the desired parameters of the world.  This allows visualizing large mass objects using small visual sprite objects. */
        gravitationalScale: number;
        /** Pressure of the atmosphere at altitude 0 (in kPa). */
        atmosphericPressure: number;
        /** The X offset required to make the center of the render output at 0,0. */
        viewCenterXOffset: number;
        /** The Y offset required to make the center of the render output at 0,0. */
        viewCenterYOffset: number;
        /** Data to be input for processing using either GPU.JS or web workers. */
        private _inputdata;
        /** The math processor to use for calculations in this world. */
        private processor;
        private _renderData;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(element: string | HTMLElement, width?: number, height?: number, pixelSize?: number): this;
        clone(): this;
        /**
         * Creates and adds a layer to this world.
         * A layer is used to place world objects at world-pixel locations.
         */
        createLayer(): Layer;
        private _threadCompleted(this, thread);
        private _threadsCompleted(this, cpu, inputCount);
        private _processResults(processor);
        /**
         * Startup this world.
         */
        startup(): this;
        /**
         * Update this world.
         */
        update(): this;
        /**
         * Render this world.
         */
        render(): void;
    }
    interface IWorld extends World {
    }
}
declare namespace WorldSimulator2D {
    /**
     * A world object is a single grouping of matter particles.  These particles have bonds created between them that try to hold
     * the particles together.  When the object gets hit, the collision point is "unwound" to get the affected matter particle.
     * This allows the particles of this object to be broken off given enough force.
     * World objects GREATLY reduce the rendering speed by rendering the individual particles to a group sprite.  This also
     * allows for rotation and sprite-based 2D physics simulations (since most of the world will be made from large blocks and
     * not small particles, which would be WAY too slow [at least in a browser using JS]).
     */
    class WorldObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends PhysicsObject<TParent, TChildren> {
        static readonly type: number;
        /** The matter "particles" for this object. */
        particlesRoot: GraphObject<WorldObject, Matter>;
        /**  The sprite texture resource (by ID) used to render the particle sprites to make the system simulation rendering more efficient. */
        protected _SpriteTextureResourceID: string;
        /** Horizontal width in world particles. Each particle represents one cm^2 unit. */
        width: number;
        /** Vertical height in world particles. Each particle represents one cm^2 unit. */
        height: number;
        updateMass(): number;
        /** In cm^2, which is used to determine the density as well. */
        readonly volume: number;
        /** How dense the matter is. */
        density(): number;
        _cacheEnabled: boolean;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(width: number, height: number, ...args: any[]): this;
        dispose(): void;
        clear(): void;
        /**
         * Rebuild the texture used by this world object that is painted by all the bound child particles.
         */
        updateTexture(): this;
        startup(): this;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
    }
}
declare namespace WorldSimulator2D {
    namespace Loader {
        /** Some additional WS2D specific resource types. */
        enum ResourceTypes {
            /** The resource represents texture data from WebGLJS. */
            Texture = "Texture",
            /** The resource represents an image object. */
            ImageObject = "Image",
            /** The resource represents an audio object. */
            AudioObject = "Audio",
            /** The resource is a DOM object. */
            DomObject = "DomObject",
            /** The resource is an array (such as Array(), [], Float32Array, Int32Array, etc.). */
            DataArray = "DataArray",
        }
    }
    enum LoadingStates {
        NotLoaded = 0,
        Loading = 1,
        Loaded = 2,
    }
    interface IResourceEntry {
        /** The path to the resource to load. */
        path: string;
        /** The loaded resource. */
        resource: object;
        /** An error message or object if there is an error loading a resource. */
        type: Loader.ResourceTypes;
        /** The loaded state of this resource. It is important to make sure to set the 'Loading' state within a custom render service when 'loadResources()' is called. */
        state: LoadingStates;
        /** An error message or object if there is an error loading a resource. */
        error?: any;
    }
    /** This signature is called when a single resource has loaded. */
    interface IResourceLoadedCallback extends IResultCallback<ResourceManager, IResourceEntry> {
    }
    /** This signature is called when all resources have loaded. */
    interface IResourcesLoadedCallback extends ICallback<ResourceManager> {
    }
    /**
     * Represents a base class to be used to render output from the engine. This allows any number of output sources, such as
     * PixiJS (default), simple DOM elements, etc. (wherever your imagination takes you!).
     * The base class also contains some properties and methods to help manage resource tracking and loading.
     */
    class ResourceManager extends EngineObject implements IResourceManager {
        /** A list of resource paths. */
        static resources: IResourceEntry[];
        /** A list of resource paths indexed by BOTH a path AND an ID string (if supplied). */
        static resourceIndexes: {
            [path: string]: number;
        };
        /** A local list of resource paths indexed by BOTH a path AND an ID string (if supplied). */
        resourceIndexes: {
            [idOrPath: string]: number;
        };
        /** Called when a single resource has loaded. */
        readonly onResourceLoaded: IResourceLoadedCallback[];
        /** Called when all resources have loaded. */
        readonly onResourcesLoaded: IResourcesLoadedCallback[];
        /** The element being render to (typically the canvas element). */
        readonly element: HTMLElement;
        /** The desired render output width being rendered to (typically the desired canvas element width). */
        width: number;
        private _width;
        /** The desired render output height being rendered to (typically the desired canvas element width). */
        height: number;
        private _height;
        /** Returns true if all resources tracked by this resource manager are loaded. */
        readonly allResourcesLoaded: boolean;
        constructor();
        /**
         * Called to configure the render service. Derived types can add additional parameters if required.
         * @param width The desired width of the target rendering to.
         * @param height The desired height of the target rendering to.
         */
        configure(element: HTMLElement, width: number, height: number, ...args: any[]): this;
        /**
         * Called when the width or height changes.
         * The event is not triggered on start up, as it is assumed the derived type has already set this when 'configure()' is called.
         */
        protected onResize(): void;
        /**
         * Starts loading all the resources where the 'state' property equals 'NotLoaded'.
         */
        start(): void;
        /**
         * Register a resource path (a URI or relative path) to be loaded later.
         * @param path The path to the resource.
         * @param type The type of resource. The type is taken from the filename extension if present, otherwise it can be expressed here.
         * @param id The ID of the resource (defaults to the path if not specified). The ID should be globally unique within the engine scope.
         * @returns The trimmed ID of the added resource (same as the path if no ID was given).
         */
        registerResourcePath(path: string, type?: Loader.ResourceTypes, id?: string): string;
        /**
         * Get the entry of a resource.
         * @param pathOrID A resource path or ID.  Global searches can only be done on path, since IDs are local only.
         * @param global If true, then the search is done globally.  If false (the default) only locally tracked resources are returned.
         */
        getResourceEntry(pathOrID: string, global?: boolean): IResourceEntry;
        /**
        * Sets a resource entry with the given loaded resource object.
         * There must already be a pending resource entry for this to work.
        * @param pathOrID The resource path or ID.
        * @param resource The resource to set.
        */
        registerLoadedResource(pathOrID: string, resource: object): void;
        /**
        * Register a resource entry with the given resource object.
        * Use this to register resources that are dynamically created and not loaded.
        * @param id An ID for to register this resource under.
        * @param resource The resource to register.
        * @param type The type of resource. The type is taken from the filename, if present, otherwise it can be expressed here.
        */
        registerResource(id: string, resource: object, type?: Loader.ResourceTypes): void;
        /**
        * Get a resource.
        * @param pathOrID A resource path or ID.
        * @param throwOnNotLoaded If true, and the resource is not loaded, an error will be thrown. Default is true.
         * @param global If true, then the search is done globally.  If false (the default) only locally tracked resources are returned.
        */
        getResource<T = object>(pathOrID: string, throwOnNotLoaded?: boolean, global?: boolean): T;
        /**
         * Returns the locally tracked resources.
         */
        getResources(): IResourceEntry[];
        /**
        * Get all resources by type, regardless of loaded status.
        * @param type The type of resource.
         * @param global If true, then the search is done globally.  If false (the default) only locally tracked resources are returned.
        */
        getResourcesByType(type: Loader.ResourceTypes, global?: boolean): IResourceEntry[];
    }
    interface IResourceManager extends ResourceManager {
    }
}
declare namespace WorldSimulator2D {
    /**
     * An element definition, typically taken from the periodic table.
     */
    class Element implements IClonable {
        readonly number: number;
        readonly symbol: string;
        readonly name: string;
        readonly color: string;
        readonly standardState: string;
        readonly weight: number;
        readonly density: number;
        readonly boilingPoint: number;
        readonly meltingPoint: number;
        readonly atomicRadius: number;
        readonly ionRadius: number;
        readonly electronAffinity: number;
        readonly electronegativity: number;
        readonly ionizationEnergy: number;
        readonly groupBlock: string;
        readonly freezingPointDepression: number;
        /**
         * Constructs a single element (typically with parameters from the periodic table).
         * @param number The element number in the periodic table (leave this 0 for custom elements).
         * @param name
         * @param weight
         * @param heatCapacity
         * @param boilingPoint
         * @param meltingPoint
         * @param freezingPointDepression
         */
        constructor(number: number, symbol: string, name: string, color: string, standardState: string, weight: number, density: number, boilingPoint: number, meltingPoint: number, atomicRadius: number, ionRadius: number, electronAffinity: number, electronegativity: number, ionizationEnergy: number, groupBlock: string, freezingPointDepression?: number);
        clone(): this;
    }
    namespace PeriodicTable {
        var elements: Element[];
        var Hydrogen: Element;
        var Helium: Element;
        var Lithium: Element;
        var Beryllium: Element;
        var Boron: Element;
        var Carbon: Element;
        var Nitrogen: Element;
        var Oxygen: Element;
        var Fluorine: Element;
        var Neon: Element;
        var Sodium: Element;
        var Magnesium: Element;
        var Aluminum: Element;
        var Silicon: Element;
        var Phosphorus: Element;
        var Sulfur: Element;
        var Chlorine: Element;
        var Argon: Element;
        var Potassium: Element;
        var Calcium: Element;
        var Scandium: Element;
        var Titanium: Element;
        var Vanadium: Element;
        var Chromium: Element;
        var Manganese: Element;
        var Iron: Element;
        var Cobalt: Element;
        var Nickel: Element;
        var Copper: Element;
        var Zinc: Element;
        var Gallium: Element;
        var Germanium: Element;
        var Arsenic: Element;
        var Selenium: Element;
        var Bromine: Element;
        var Krypton: Element;
        var Rubidium: Element;
        var Strontium: Element;
        var Yttrium: Element;
        var Zirconium: Element;
        var Niobium: Element;
        var Molybdenum: Element;
        var Technetium: Element;
        var Ruthenium: Element;
        var Rhodium: Element;
        var Palladium: Element;
        var Silver: Element;
        var Cadmium: Element;
        var Indium: Element;
        var Tin: Element;
        var Antimony: Element;
        var Tellurium: Element;
        var Iodine: Element;
        var Xenon: Element;
        var Cesium: Element;
        var Barium: Element;
        var Lanthanum: Element;
        var Cerium: Element;
        var Praseodymium: Element;
        var Neodymium: Element;
        var Promethium: Element;
        var Samarium: Element;
        var Europium: Element;
        var Gadolinium: Element;
        var Terbium: Element;
        var Dysprosium: Element;
        var Holmium: Element;
        var Erbium: Element;
        var Thulium: Element;
        var Ytterbium: Element;
        var Lutetium: Element;
        var Hafnium: Element;
        var Tantalum: Element;
        var Tungsten: Element;
        var Rhenium: Element;
        var Osmium: Element;
        var Iridium: Element;
        var Platinum: Element;
        var Gold: Element;
        var Mercury: Element;
        var Thallium: Element;
        var Lead: Element;
        var Bismuth: Element;
        var Polonium: Element;
        var Astatine: Element;
        var Radon: Element;
        var Francium: Element;
        var Radium: Element;
        var Actinium: Element;
        var Thorium: Element;
        var Protactinium: Element;
        var Uranium: Element;
        var Neptunium: Element;
        var Plutonium: Element;
        var Americium: Element;
        var Curium: Element;
        var Berkelium: Element;
        var Californium: Element;
        var Einsteinium: Element;
        var Fermium: Element;
        var Mendelevium: Element;
        var Nobelium: Element;
        var Lawrencium: Element;
        var Rutherfordium: Element;
        var Dubnium: Element;
        var Seaborgium: Element;
        var Bohrium: Element;
        var Hassium: Element;
        var Meitnerium: Element;
        var Darmstadtium: Element;
        var Roentgenium: Element;
        var Copernicium: Element;
        var Nihonium: Element;
        var Flerovium: Element;
        var Moscovium: Element;
        var Livermorium: Element;
        var Tennessine: Element;
        var Oganesson: Element;
    }
}
declare namespace WorldSimulator2D {
    /**
     * The world simulator engine, which is the root level object for the whole simulation system.
     * Create an instance of this object, then add worlds, layers, and world objects as required.
     */
    class Engine extends GraphObject<null, IWorld> {
        static readonly type: number;
        /** Holds a list of disposed objects, indexed by their type. */
        static readonly disposedObjectsByType: {
            [index: string]: IDisposable[];
        };
        /** Holds a list of object instances as templates for initializing new objects (default if not overridden by developers). */
        static readonly templateInstancesByType: {
            [index: string]: IDisposable;
        };
        /**
        * All the objects used in the engine. The array does not shrink. Instead another array keeps track of the disposed
        * object indexes and reuses those entries for new objects. For this reason, disposed object IDs are set to -1 to
        * be safe, and are assigned a new ID from the new index.
        */
        readonly objects: IndexedCollection<IEngineObject>;
        readonly objectsByUniqueName: {
            [name: string]: IEngineObject;
        };
        /**
        * Prefabrications used to generated copies.
        * The list allows separating out a list of objects that are only templates and not to be used as runtime objects.
        */
        readonly prefabs: IEngineObject[];
        constructor();
        private _OnObjectUniqueNameChanged(obj, oldName);
        /**
         * Creates an object of the specified type.  The type is either pulled from the static disposed objects cache, or else a new instance it created.
         * @param type The type of object to create.
         * @param initialize If true (default) then the 'initialize()' function is called, if found.
         * @param engine The engine instance to associate when creating engine instance specific objects. For static or non-engine specific objects (such as Vector2D), this can be null/undefined.
         * @param args The arguments to pass to the constructor when creating the type (if any).
         * Please try not to do this, but instead create a 'configure()' method as a convention to configure objects.  This may better support dependency injection in the future.
         */
        static create<T extends object>(type: {
            new (...args: any[]): T;
        }, initialize?: boolean, engine?: Engine, ...args: any[]): T;
        /**
         * Creates an object of the specified type.  The type is either pulled from the static disposed objects cache, or else a new instance it created.
         * @param type The type of object to create for this engine instance.
         * @param initialize If true (default) then the 'initialize()' function is called, if found.
         * @param args The arguments to pass to the constructor when creating the type (if any).
         * Please try not to do this, but instead create a 'configure()' method as a convention to configure objects.  This may better support dependency injection in the future.
         */
        create<T extends IEngineObject>(type: {
            new (...args: any[]): T;
        }, initialize?: boolean, ...args: any[]): T;
        dispose(): void;
        getObject(id: number): IEngineObject;
        /**
         * A global dispose function to release objects back into the global disposed objects cache.
         * Since disposed objects are no longer engine specific, they can be reused in any engine instance (especially handy since engines can also be nested!).
         * @param objectOrObjectArray An object or array of objects to release back into the global disposed objects cache.
         * WARNING: All disposed items are removed from the given array, including any disposable objects in nested arrays.
         * @param reduceArrays If true (default is false), and an array of objects are given, any disposable objects in the array are removed. If false, the positions are simple set to 'undefined' (void 0).
         */
        static dispose(objectOrObjectArray: IDisposable | IDisposable[], reduceArrays?: boolean): void;
        /**
         * Creates a prefab and returns the prefab ID (NOT object ID) for future reference.
         * @param obj The object to make a copy from to use as a prefabrication template.
         */
        saveAsPrefab(obj: IEngineObject): number;
        saveAsPrefab(): number;
        /**
         * Creates a new empty matter entry in the engine. If one already exists with the same name, it is returned instead.
         * Update the returned object to set the various properties for the matter you wish to construct.
         * @param name A name for this matter.
         */
        createMatter(name: string, defaultElement?: Element): Matter;
        /**
         * Returns a default matter entry from the engine. If the matter doesn't exist, 'undefined' is returned.
         * WARNIG: Changing the properties of the returned instance affects all new future matter particles.
         * @param name A name (or Matter or Element object with the name) for the matter you wish to retrieve.
         */
        getDefaultMatter(name: string | Matter | Element): IMatter;
        /**
         * Returns a cloned matter entry from the engine. If the matter doesn't exist, 'undefined' is returned.
         * Use this method to create particles for putting on world layers or in world objects (as bonded particles).
         * @param name A name (or Matter or Element object with the name) for the matter you wish to retrieve.
         */
        createMatterParticle(name: string | Matter | Element): IMatter;
        /**
         * Creates and returns the default air matter entry.
         */
        createAirMatter(): Matter;
        /**
         * Creates the whole periodic table of elements in the engine.
         */
        createPeriodicTableElements(): void;
        createDefaulyMatter(): void;
        /**
         * Creates and returns a new world for this world engine.
         */
        createWorld(): World;
        /**
         * Creates an object that can be placed on a world layer.
         */
        createWorldObject(): WorldObject;
        /**
         * Creates a layer that can be placed on a world.
         */
        createLayer(): Layer;
        startup(): this;
        update(): this;
        render(): void;
    }
    /**
     * Scans the core types in the system and inlines 'super' calls for fastest speed (mostly for key runtime functions, such as 'update' and 'render').
     * The engine types use inheritance, and as such many functions are overridden at many levels in the hierarchy.  This results
     * in many sub-type function overrides calling into the super type to continue the call chain towards the base, which is a
     * lot of overhead.  A built-in light-weight JavaScript compiler is used to flatten the calls.
     * This should be called BEFORE updating and rendering operations.
     */
    function inlineSuperCalls(): void;
}
declare namespace WorldSimulator2D {
    enum RenderTypes {
        SpatialObect = 1,
        PhysicObject = 2,
        Matter = 3,
    }
}
import WS2D = WorldSimulator2D;
