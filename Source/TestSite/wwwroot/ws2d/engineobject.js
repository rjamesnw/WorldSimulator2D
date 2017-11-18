var WorldSimulator2D;
(function (WorldSimulator2D) {
    /** Internal objects type flags use to identify internal object hierarchy - especially in case they are inherited by 3rd parties. */
    var ObjectTypes;
    (function (ObjectTypes) {
        ObjectTypes[ObjectTypes["EngineObject"] = 1] = "EngineObject";
        ObjectTypes[ObjectTypes["GraphObject"] = 2] = "GraphObject";
        ObjectTypes[ObjectTypes["SpacialObject"] = 4] = "SpacialObject";
        ObjectTypes[ObjectTypes["PhysicsObject"] = 8] = "PhysicsObject";
        ObjectTypes[ObjectTypes["Engine"] = 16] = "Engine";
        ObjectTypes[ObjectTypes["World"] = 32] = "World";
        ObjectTypes[ObjectTypes["Layer"] = 64] = "Layer";
        ObjectTypes[ObjectTypes["Matter"] = 128] = "Matter";
        ObjectTypes[ObjectTypes["WorldObject"] = 256] = "WorldObject";
    })(ObjectTypes = WorldSimulator2D.ObjectTypes || (WorldSimulator2D.ObjectTypes = {}));
    /**
     * Holds the position of an object on a specific layer.
     * Note to developers: When creating derived types, DO NOT require constructor parameters. ALL such parameters MUST be
     * optional, since the system will need to deserialize or clone to new empty instances.
     */
    var EngineObject = /** @class */ (function () {
        // --------------------------------------------------------------------------------------------------------------------
        function EngineObject() {
            // --------------------------------------------------------------------------------------------------------------------
            this.engine = null;
        }
        Object.defineProperty(EngineObject, "typeName", {
            /** Returns the type name for this class, or the name of a derived class.
            * Custom types should make sure to call 'WorldSimulator2D.getTypeName(CustomeType);' at least once before using the type with the engine.
            */
            get: function () {
                return this.$__name || WorldSimulator2D.getTypeName(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineObject.prototype, "typeName", {
            /** Returns the type name for this object.
            * Custom types should make sure to call 'WorldSimulator2D.getTypeName(CustomeType);' at least once before using the type with the engine.
            */
            get: function () {
                return this.constructor['$__name'] || WorldSimulator2D.getTypeName(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineObject.prototype, "uniqueName", {
            /** A unique name for this object in the system (undefined by default, in which case the 'id' property is assumed). */
            get: function () { return this._uniqueName; },
            set: function (value) {
                var oldName = this._uniqueName;
                this._uniqueName = value;
                this.engine['_OnObjectUniqueNameChanged'](this, oldName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineObject.prototype, "uniqueNameOrID", {
            /** Returns the unique name for this object, or it's ID, whichever is available in that order. */
            get: function () { return this._uniqueName || this.id; },
            enumerable: true,
            configurable: true
        });
        /**
         * Pulls properties from an unmodified instance of this type to re-initialize the properties back to their *constructor*
         * defaults (NOT configuration defaults).  This works because of the "injection" nature of the engine's type system.
         * NOTE: ONLY primitive values are restored.  Object references are left as is.  Developers will have to implement
         * IInitializable in the objects or handled object properties within an Initialization function on the wrapping object.
         * @param includeAddedProperties If true, any properties added are set to undefined.
         * This causes a second loop to check the current object properties, and thus to be faster this is false by default.
         * In such cases it might be faster to make sure such properties are dealt with in the 'initialize()' function instead.
         */
        EngineObject.prototype.autoReset = function (includeAddedProperties) {
            if (includeAddedProperties === void 0) { includeAddedProperties = false; }
            var typeindex = this.typeName;
            var templateValues = WorldSimulator2D.Engine.templateInstancesByType[typeindex];
            if (!templateValues)
                WorldSimulator2D.Engine.templateInstancesByType[typeindex] = templateValues = new this.constructor();
            for (var p in templateValues)
                // (Note: NEVER copy objects from the template, since only the reference will move; objects will have to implement IInitializable or be handled by an Initialization function)
                if (!(p in this.constructor._nonClonableProperties) && typeof this[p] != 'object' && Object.prototype.hasOwnProperty.call(this, p))
                    this[p] = templateValues[p];
            if (includeAddedProperties)
                for (var p in this)
                    if (typeof this[p] != WorldSimulator2D.OBJECT && typeof templateValues[p] === void 0)
                        this[p] = void 0;
        };
        /**
         * Called by the engine when creating a new type, or pulling from the cache (optional, and thus may be undefined).
         * NOTE: Any properties that have
         * @param isnew True if the type is brand new, and false if it was pulled from the cache of disposed objects.
         * @param autoReset If true (the default), the base 'EngineObject' type will detect and auto reset the properties
         * set by the constructor the first time the object was constructed.
         * @param autoResetProperties If true (the default), the base 'EngineObject' type will auto reset any object
         * properties that also implement IInitializable (that contain an 'initialize' function).
         */
        EngineObject.prototype.initialize = function (isnew, autoReset, autoResetProperties) {
            if (autoReset === void 0) { autoReset = true; }
            if (autoResetProperties === void 0) { autoResetProperties = true; }
            if (!this.isInitialized) {
                if (!isnew && autoReset)
                    this.autoReset(); // (reset first just in case before setting anything)
                this.isInitialized = true; // (make sure this doesn't get called again in case of cyclical references)
                // ... initialize also any property objects that have this same function ...
                for (var p in this) {
                    var existingValue = this[p]; // TODO: Perhaps a "map" of valid properties, minus getters & setters, can be stored statically instead of using for-in.
                    if (existingValue && existingValue.initialize && typeof existingValue.initialize == WorldSimulator2D.FUNCTION && !existingValue.isInitialized)
                        existingValue.initialize(isnew, autoResetProperties);
                }
            }
        };
        EngineObject.prototype.dispose = function () {
            if (this.engine == null)
                throw Error("This object is not associated with an engine instance.");
            if (!this.isDisposed)
                WorldSimulator2D.Engine.dispose(this);
        };
        /**
         * Returns a new Error instance with added information to identify the object.
         * @param msg The error message.
         * @param world An optional world reference associated with the error, if applicable.
         * @param msg An optional layer reference associated with the error, if applicable.
         */
        EngineObject.prototype.error = function (msg, world, layer) {
            var worldID = world.world && world.layer.uniqueNameOrID;
            var layerID = layer.layer && layer.layer.uniqueNameOrID;
            var thisID = this.uniqueName ? this.uniqueName + "(" + this.id + ")" : this.id;
            var infoTag = "(object " + thisID + ", type: " + this.typeName;
            if (layerID)
                infoTag += ", on layer " + layerID;
            if (worldID)
                infoTag += ", in world " + worldID;
            infoTag += ")\r\n";
            return new Error(infoTag + msg);
        };
        /**
         * Makes a copy of this object by creating a new object of the same type and setting ONLY the primitive values from this instance.
         * If any object property has an object with a 'clone()' method (implements IClonable), it is called also.
         * NOTE: Object properties that don't contain a 'clone()' function are INGORED.   Developers overriding types will have
         * to override this function also to handle such cases 'manually' (or implement IClonable).
         */
        EngineObject.prototype.clone = function () {
            var obj = this.engine.create(this.constructor);
            obj.createdFrom = this;
            for (var p in this)
                if (!(p in this.constructor._nonClonableProperties) && Object.prototype.hasOwnProperty.call(this, p)) {
                    var value = this[p];
                    if (typeof value != WorldSimulator2D.OBJECT)
                        obj[p] = this[p];
                    else if (value && typeof value.clone == WorldSimulator2D.FUNCTION)
                        obj[p] = value.clone();
                }
            return obj;
        };
        // --------------------------------------------------------------------------------------------------------------------
        /**
         * Override this to customize saving the object type and state into a JSON string.
         * If any object property also has an object with a 'save()' method, it is called as well.
         */
        EngineObject.prototype.save = function () {
            return JSON.stringify(this, function (key, value) {
                if (key == 'engine' && value instanceof WorldSimulator2D.Engine)
                    return value && value.id;
                else if (typeof value.save == WorldSimulator2D.FUNCTION)
                    return value.save();
            });
        };
        /**
         * Save this engine object as a prefab (template) in the engine.
         */
        EngineObject.prototype.saveAsPrefab = function () {
            return this.engine.saveAsPrefab(this);
        };
        /** Inheritance type flags showing which internal super-types were used to create the current sub-type.
        * @see ObjectTypes
        */
        EngineObject.type = ObjectTypes.EngineObject;
        // --------------------------------------------------------------------------------------------------------------------
        EngineObject._nonClonableProperties = {
            "id": void 0,
            "engine": void 0,
            "uniqueName": void 0,
            "_uniqueName": void 0,
            "isInitialized": void 0,
            "isDisposed": void 0
        };
        return EngineObject;
    }());
    WorldSimulator2D.EngineObject = EngineObject;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=engineobject.js.map