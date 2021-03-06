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
    /**
     * The world simulator engine, which is the root level object for the whole simulation system.
     * Create an instance of this object, then add worlds, layers, and world objects as required.
     */
    var Engine = /** @class */ (function (_super) {
        __extends(Engine, _super);
        function Engine() {
            var _this = _super.call(this) || this;
            /**
            * All the objects used in the engine. The array does not shrink. Instead another array keeps track of the disposed
            * object indexes and reuses those entries for new objects. For this reason, disposed object IDs are set to -1 to
            * be safe, and are assigned a new ID from the new index.
            */
            _this.objects = new WorldSimulator2D.IndexedCollection();
            _this.objectsByUniqueName = {};
            /**
            * Prefabrications used to generated copies.
            * The list allows separating out a list of objects that are only templates and not to be used as runtime objects.
            */
            _this.prefabs = [];
            _this.engine = _this;
            _this.initialize(true, false);
            return _this;
        }
        Engine.prototype._OnObjectUniqueNameChanged = function (obj, oldName) {
            this.objectsByUniqueName[oldName] = void 0;
            this.objectsByUniqueName[obj.uniqueName] = obj;
        };
        /**
         * Creates an object of the specified type.  The type is either pulled from the static disposed objects cache, or else a new instance it created.
         * @param type The type of object to create.
         * @param initialize If true (default) then the 'initialize()' function is called, if found.
         * @param engine The engine instance to associate when creating engine instance specific objects. For static or non-engine specific objects (such as Vector2D), this can be null/undefined.
         * @param args The arguments to pass to the constructor when creating the type (if any).
         * Please try not to do this, but instead create a 'configure()' method as a convention to configure objects.  This may better support dependency injection in the future.
         */
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
        /**
         * Creates an object of the specified type.  The type is either pulled from the static disposed objects cache, or else a new instance it created.
         * @param type The type of object to create for this engine instance.
         * @param initialize If true (default) then the 'initialize()' function is called, if found.
         * @param args The arguments to pass to the constructor when creating the type (if any).
         * Please try not to do this, but instead create a 'configure()' method as a convention to configure objects.  This may better support dependency injection in the future.
         */
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
        /**
         * A global dispose function to release objects back into the global disposed objects cache.
         * Since disposed objects are no longer engine specific, they can be reused in any engine instance (especially handy since engines can also be nested!).
         * @param objectOrObjectArray An object or array of objects to release back into the global disposed objects cache.
         * WARNING: All disposed items are removed from the given array, including any disposable objects in nested arrays.
         * @param reduceArrays If true (default is false), and an array of objects are given, any disposable objects in the array are removed. If false, the positions are simple set to 'undefined' (void 0).
         */
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
            //if (object.engine != this)
            //    throw this.error("The given object was not created by this engine. Make sure to call 'Engine.create({Type})' when creating new instances.");
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
                // ... called based on the overridden function to save SELF as prefab, which is not supported on the engine (yet, if ever) ...
                throw this.error("The engine cannot be saved as a prefab.");
            }
        };
        /**
         * Creates a new empty matter entry in the engine. If one already exists with the same name, it is returned instead.
         * Update the returned object to set the various properties for the matter you wish to construct.
         * @param name A name for this matter.
         */
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
        /**
         * Returns a default matter entry from the engine. If the matter doesn't exist, 'undefined' is returned.
         * WARNIG: Changing the properties of the returned instance affects all new future matter particles.
         * @param name A name (or Matter or Element object with the name) for the matter you wish to retrieve.
         */
        Engine.prototype.getDefaultMatter = function (name) {
            if (name instanceof WorldSimulator2D.Matter)
                name = name.name;
            else if (name instanceof WorldSimulator2D.Element)
                name = name.name;
            return this.objectsByUniqueName["$__matter_" + name];
        };
        /**
         * Returns a cloned matter entry from the engine. If the matter doesn't exist, 'undefined' is returned.
         * Use this method to create particles for putting on world layers or in world objects (as bonded particles).
         * @param name A name (or Matter or Element object with the name) for the matter you wish to retrieve.
         */
        Engine.prototype.createMatterParticle = function (name) {
            var m = this.getDefaultMatter(name);
            return m && m.clone();
        };
        /**
         * Creates and returns the default air matter entry.
         */
        Engine.prototype.createAirMatter = function () {
            // ... create some default matter types ...
            var _m = this.createMatter("air");
            _m.addAtomicWeight(1.008, 2).addAtomicWeight(15.99); // https://goo.gl/HEAEN
            _m.freezingPoint = 58;
            _m.boilingPoint = 78.8;
            return _m;
        };
        /**
         * Creates the whole periodic table of elements in the engine.
         */
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
            // Note: Periodic table of the elements: https://goo.gl/axLiFD
            this.createAirMatter();
            this.createPeriodicTableElements();
        };
        /**
         * Creates and returns a new world for this world engine.
         */
        Engine.prototype.createWorld = function () {
            var world = this.create(WorldSimulator2D.World);
            this.add(world);
            return world;
        };
        /**
         * Creates an object that can be placed on a world layer.
         */
        Engine.prototype.createWorldObject = function () {
            var wo = this.create(WorldSimulator2D.WorldObject);
            return wo;
        };
        /**
         * Creates a layer that can be placed on a world.
         */
        Engine.prototype.createLayer = function () {
            var layer = this.engine.create(WorldSimulator2D.Layer);
            return layer;
        };
        // --------------------------------------------------------------------------------------------------------------------
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
            // .. first make sure all render routines are called on the child objects ...
            // ... iterate over tree objects using a stack, which is many times faster than the overhead of function calls ...
            //var stack = this._iterationStack;
            //var indexes = this._iterationStackIndexes;
            //var sp = 0;
            //var o: IGraphObject = this;
            //var i = 0;
            //while (o) {
            //    if (!o.children || !o.children.count || i >= o.children.items.length) {
            //        if (o != this)
            //            o.render();
            //        if (stack.length)
            //            o = stack[--sp], i = indexes[sp]; // ('i' is always the NEXT object index, if any)
            //    } else {
            //             var co = o.children && o.children.items[i++]; // (warning: deleted items make this a number entry instead of null/undefined!)
            //             if (co && co.id !== void 0) // (if there's a child, change the current object context to it, pushing previous on stack)
            //            indexes[sp] = i, stack[sp++] = o, o = co, i = 0;
            //    }
            //};
            //return this;
        };
        Engine.type = WorldSimulator2D.GraphObject.type | WorldSimulator2D.ObjectTypes.Engine;
        /** Holds a list of disposed objects, indexed by their type. */
        Engine.disposedObjectsByType = {};
        /** Holds a list of object instances as templates for initializing new objects (default if not overridden by developers). */
        Engine.templateInstancesByType = {};
        return Engine;
    }(WorldSimulator2D.GraphObject));
    WorldSimulator2D.Engine = Engine;
    //!compile(WorldSimulator2D.GraphObject, 'update');
    //!compile(WorldSimulator2D.SpatialObject, 'update');
    /**
     * Scans the core types in the system and inlines 'super' calls for fastest speed (mostly for key runtime functions, such as 'update' and 'render').
     * The engine types use inheritance, and as such many functions are overridden at many levels in the hierarchy.  This results
     * in many sub-type function overrides calling into the super type to continue the call chain towards the base, which is a
     * lot of overhead.  A built-in light-weight JavaScript compiler is used to flatten the calls.
     * This should be called BEFORE updating and rendering operations.
     */
    function inlineSuperCalls() {
        // ... precompile the hierarchical method calls to speed things up ...
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
// Notes:
// * Normal and contact forces: https://goo.gl/PhkyEO
// * Collision Physics in Video Games: https://goo.gl/gpBsEn
// * Center of mass of multiple objects: https://goo.gl/SH2zCf
// * Possibly create own physics engine: https://goo.gl/oDfYXV
// * Particle fluid idea: https://goo.gl/bFZaWj
// * PixiJS Bunny Mark: https://pixijs.github.io/bunny-mark/
//# sourceMappingURL=engine.js.map