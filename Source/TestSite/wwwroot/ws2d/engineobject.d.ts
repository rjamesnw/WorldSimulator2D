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
