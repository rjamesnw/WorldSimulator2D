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
var WorldSimulator2D;
(function (WorldSimulator2D) {
    var Engine = (function (_super) {
        __extends(Engine, _super);
        function Engine() {
            var _this = _super.call(this) || this;
            _this.objects = new WorldSimulator2D.IndexedCollection();
            _this.objectsByUniqueName = {};
            _this.prefabs = [];
            _this.engine = _this;
            _this.initialize(true, false);
            return _this;
        }
        Engine.prototype._OnObjectUniqueNameChanged = function (obj, oldName) {
            this.objectsByUniqueName[oldName] = void 0;
            this.objectsByUniqueName[obj.uniqueName] = obj;
        };
        Engine.create = function (type, initialize, engine) {
            if (initialize === void 0) { initialize = true; }
            if (engine === void 0) { engine = null; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            if (!type || typeof type != 'function')
                throw Error("Engine.create(): This given type is not a valid function object type.");
            var typeindex = WorldSimulator2D.getTypeName(type);
            var dispoasedObjects = Engine.disposedObjectsByType[typeindex];
            var isnew, obj = (dispoasedObjects && dispoasedObjects.length && (isnew = false, dispoasedObjects.pop()) || (isnew = true, new (type.bind.apply(type, [void 0].concat(args)))()));
            obj.isDisposed = false;
            if (engine && (obj instanceof WorldSimulator2D.EngineObject || 'engine' in obj && 'id' in obj)) {
                obj.engine = engine;
                if (typeof obj.id != WorldSimulator2D.NUMBER || obj.id < 0)
                    obj.id = engine.objects.add(obj);
                engine.objects[obj.id] = obj;
            }
            if (initialize && obj.initialize)
                obj.initialize(isnew);
            return obj;
        };
        Engine.prototype.create = function (type, initialize) {
            if (initialize === void 0) { initialize = true; }
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return Engine.create(type, initialize, this, args);
        };
        Engine.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        Engine.prototype.getObject = function (id) {
            return this.objects[id];
        };
        Engine.dispose = function (objectOrObjectArray, reduceArrays) {
            if (reduceArrays === void 0) { reduceArrays = false; }
            if (typeof objectOrObjectArray !== "object")
                throw Error("Cannot dispose a non-object value.");
            if (Array.isArray(objectOrObjectArray)) {
                for (var i = objectOrObjectArray.length - 1; i >= 0; --i) {
                    var object = objectOrObjectArray[i];
                    if (object.dispose)
                        if (reduceArrays)
                            Engine.dispose(objectOrObjectArray.splice(i, 1)[0]);
                        else {
                            Engine.dispose(object);
                            objectOrObjectArray[i] = void 0;
                        }
                }
                return;
            }
            var object = objectOrObjectArray;
            if (object == null || object == void 0 || object.isDisposed)
                return;
            if (object.isDisposed === void 0) {
                object.isDisposed = false;
                if (object.dispose) {
                    object.dispose();
                    return;
                }
            }
            var typeindex = WorldSimulator2D.getTypeName(object);
            var dispoasedObjects = this.disposedObjectsByType[typeindex];
            if (!dispoasedObjects)
                this.disposedObjectsByType[typeindex] = dispoasedObjects = [];
            dispoasedObjects.push(object);
            var obj = object;
            var engine = obj.engine;
            if (engine && engine instanceof Engine) {
                engine.objects.removeAt(obj.id);
                if (obj.uniqueName)
                    engine.objectsByUniqueName[obj.uniqueName] = void 0;
            }
            obj.id = void 0;
            obj.engine = null;
            object.isDisposed = true;
            object.isInitialized = false;
        };
        Engine.prototype.saveAsPrefab = function (obj) {
            if (arguments.length) {
                var copy = obj.clone();
                this.prefabs.push(copy);
                return this.prefabs.length - 1;
            }
            else {
                throw this.error("The engine cannot be saved as a prefab.");
            }
        };
        Engine.prototype.createMatter = function (name, defaultElement) {
            if (!name && defaultElement)
                name = defaultElement.name;
            var m = this.getDefaultMatter(name);
            if (m)
                return m;
            m = this.create(WorldSimulator2D.Matter).setElement(defaultElement);
            m.name = name;
            m.uniqueName = "$__matter_" + name;
            return m;
        };
        Engine.prototype.getDefaultMatter = function (name) {
            if (name instanceof WorldSimulator2D.Matter)
                name = name.name;
            else if (name instanceof WorldSimulator2D.Element)
                name = name.name;
            return this.objectsByUniqueName["$__matter_" + name];
        };
        Engine.prototype.createMatterParticle = function (name) {
            var m = this.getDefaultMatter(name);
            return m && m.clone();
        };
        Engine.prototype.createAirMatter = function () {
            var _m = this.createMatter("air");
            _m.addAtomicWeight(1.008, 2).addAtomicWeight(15.99);
            _m.freezingPoint = 58;
            _m.boilingPoint = 78.8;
            return _m;
        };
        Engine.prototype.createPeriodicTableElements = function () {
            if (!WorldSimulator2D.PeriodicTable)
                throw this.error("'PeridocTable' not found - PeridocTable.js must not be loaded.");
            else
                for (var p in WorldSimulator2D.PeriodicTable)
                    if (WorldSimulator2D.PeriodicTable[p] instanceof WorldSimulator2D.Element) {
                        var _m = this.createMatter(p);
                        _m.setElement(WorldSimulator2D.PeriodicTable[p]);
                    }
        };
        Engine.prototype.createDefaulyMatter = function () {
            this.createAirMatter();
            this.createPeriodicTableElements();
        };
        Engine.prototype.createWorld = function () {
            var world = this.create(WorldSimulator2D.World);
            this.add(world);
            return world;
        };
        Engine.prototype.createWorldObject = function () {
            var wo = this.create(WorldSimulator2D.WorldObject);
            return wo;
        };
        Engine.prototype.createLayer = function () {
            var layer = this.engine.create(WorldSimulator2D.Layer);
            return layer;
        };
        Engine.prototype.startup = function () {
            var w = this.firstChild;
            while (w)
                w.startup(), w = w.next;
            return _super.prototype.startup.call(this);
        };
        Engine.prototype.update = function () {
            if (this.updateCount == 0)
                this.startup();
            var w = this.firstChild;
            while (w)
                w.update(), w = w.next;
            return _super.prototype.update.call(this);
        };
        Engine.prototype.render = function () {
            var w = this.firstChild;
            while (w)
                w.render(), w = w.next;
        };
        Engine.type = WorldSimulator2D.GraphObject.type | WorldSimulator2D.ObjectTypes.Engine;
        Engine.disposedObjectsByType = {};
        Engine.templateInstancesByType = {};
        return Engine;
    }(WorldSimulator2D.GraphObject));
    WorldSimulator2D.Engine = Engine;
    function inlineSuperCalls() {
        for (var p in WorldSimulator2D)
            if (typeof WorldSimulator2D[p] == 'function') {
                var proto = WorldSimulator2D[p].prototype;
                if (proto instanceof WorldSimulator2D.EngineObject) {
                    if (Object.prototype.hasOwnProperty.call(proto, "update"))
                        WorldSimulator2D.compile(WorldSimulator2D[p], 'update');
                    if (Object.prototype.hasOwnProperty.call(proto, "render"))
                        WorldSimulator2D.compile(WorldSimulator2D[p], 'render');
                }
            }
    }
    WorldSimulator2D.inlineSuperCalls = inlineSuperCalls;
    for (var p in WorldSimulator2D)
        if (typeof WorldSimulator2D[p] == 'function')
            WorldSimulator2D.getTypeName(WorldSimulator2D[p]);
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=engine.js.map