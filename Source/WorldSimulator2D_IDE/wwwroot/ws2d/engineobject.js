var WorldSimulator2D;
(function (WorldSimulator2D) {
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
    var EngineObject = (function () {
        function EngineObject() {
            this.engine = null;
        }
        Object.defineProperty(EngineObject, "typeName", {
            get: function () {
                return this.$__name || WorldSimulator2D.getTypeName(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineObject.prototype, "typeName", {
            get: function () {
                return this.constructor['$__name'] || WorldSimulator2D.getTypeName(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineObject.prototype, "uniqueName", {
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
            get: function () { return this._uniqueName || this.id; },
            enumerable: true,
            configurable: true
        });
        EngineObject.prototype.autoReset = function (includeAddedProperties) {
            if (includeAddedProperties === void 0) { includeAddedProperties = false; }
            var typeindex = this.typeName;
            var templateValues = WorldSimulator2D.Engine.templateInstancesByType[typeindex];
            if (!templateValues)
                WorldSimulator2D.Engine.templateInstancesByType[typeindex] = templateValues = new this.constructor();
            for (var p in templateValues)
                if (!(p in this.constructor._nonClonableProperties) && typeof this[p] != 'object' && Object.prototype.hasOwnProperty.call(this, p))
                    this[p] = templateValues[p];
            if (includeAddedProperties)
                for (var p in this)
                    if (typeof this[p] != WorldSimulator2D.OBJECT && typeof templateValues[p] === void 0)
                        this[p] = void 0;
        };
        EngineObject.prototype.initialize = function (isnew, autoReset, autoResetProperties) {
            if (autoReset === void 0) { autoReset = true; }
            if (autoResetProperties === void 0) { autoResetProperties = true; }
            if (!this.isInitialized) {
                if (!isnew && autoReset)
                    this.autoReset();
                this.isInitialized = true;
                for (var p in this) {
                    var existingValue = this[p];
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
        EngineObject.prototype.save = function () {
            return JSON.stringify(this, function (key, value) {
                if (key == 'engine' && value instanceof WorldSimulator2D.Engine)
                    return value && value.id;
                else if (typeof value.save == WorldSimulator2D.FUNCTION)
                    return value.save();
            });
        };
        EngineObject.prototype.saveAsPrefab = function () {
            return this.engine.saveAsPrefab(this);
        };
        EngineObject.type = ObjectTypes.EngineObject;
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