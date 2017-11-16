namespace WorldSimulator2D {

    /**
     * The world simulator engine, which is the root level object for the whole simulation system.
     * Create an instance of this object, then add worlds, layers, and world objects as required.
     */
    export class Engine extends GraphObject<null, IWorld> {
        static readonly type = GraphObject.type | ObjectTypes.Engine;

        /** Holds a list of disposed objects, indexed by their type. */
        static readonly disposedObjectsByType: { [index: string]: IDisposable[] } = {};
        /** Holds a list of object instances as templates for initializing new objects (default if not overridden by developers). */
        static readonly templateInstancesByType: { [index: string]: IDisposable } = {};

        /**
        * All the objects used in the engine. The array does not shrink. Instead another array keeps track of the disposed
        * object indexes and reuses those entries for new objects. For this reason, disposed object IDs are set to -1 to
        * be safe, and are assigned a new ID from the new index.
        */
        readonly objects: IndexedCollection<IEngineObject> = new IndexedCollection();
        readonly objectsByUniqueName: { [name: string]: IEngineObject } = {};

        /**
        * Prefabrications used to generated copies.
        * The list allows separating out a list of objects that are only templates and not to be used as runtime objects.
        */
        readonly prefabs: IEngineObject[] = [];

        constructor() {
            super();
            (<IInternalEngineObject>this).engine = this;
            this.initialize(true, false);
        }

        private _OnObjectUniqueNameChanged(obj: IEngineObject, oldName: string): void {
            this.objectsByUniqueName[oldName] = void 0;
            this.objectsByUniqueName[obj.uniqueName] = obj;
        }

        /**
         * Creates an object of the specified type.  The type is either pulled from the static disposed objects cache, or else a new instance it created.
         * @param type The type of object to create.
         * @param initialize If true (default) then the 'initialize()' function is called, if found.
         * @param engine The engine instance to associate when creating engine instance specific objects. For static or non-engine specific objects (such as Vector2D), this can be null/undefined.
         * @param args The arguments to pass to the constructor when creating the type (if any).
         * Please try not to do this, but instead create a 'configure()' method as a convention to configure objects.  This may better support dependency injection in the future.
         */
        static create<T extends object>(type: { new(...args: any[]): T }, initialize = true, engine: Engine = null, ...args: any[]): T {
            if (!type || typeof type != 'function')
                throw Error("Engine.create(): This given type is not a valid function object type.")
            var typeindex = getTypeName(type);
            var dispoasedObjects = Engine.disposedObjectsByType[typeindex];
            var isnew, obj: IInternalEngineObject = <any>(dispoasedObjects && dispoasedObjects.length && (isnew = false, dispoasedObjects.pop()) || (isnew = true, new type(...args)));
            obj.isDisposed = false;
            if (engine && (obj instanceof EngineObject || 'engine' in obj && 'id' in obj)) {
                obj.engine = engine;
                if (typeof obj.id != NUMBER || obj.id < 0)
                    obj.id = engine.objects.add(<any>obj);
                engine.objects[obj.id] = obj;
            }
            if (initialize && obj.initialize)
                obj.initialize(isnew);
            return <any>obj;
        }

        /**
         * Creates an object of the specified type.  The type is either pulled from the static disposed objects cache, or else a new instance it created.
         * @param type The type of object to create for this engine instance.
         * @param initialize If true (default) then the 'initialize()' function is called, if found.
         * @param args The arguments to pass to the constructor when creating the type (if any).
         * Please try not to do this, but instead create a 'configure()' method as a convention to configure objects.  This may better support dependency injection in the future.
         */
        create<T extends IEngineObject>(type: { new(...args: any[]): T }, initialize = true, ...args: any[]): T {
            return Engine.create(type, initialize, this, args);
        }

        dispose(): void {
            super.dispose();
        }

        getObject(id: number): IEngineObject {
            return this.objects[id];
        }

        /**
         * A global dispose function to release objects back into the global disposed objects cache.
         * Since disposed objects are no longer engine specific, they can be reused in any engine instance (especially handy since engines can also be nested!).
         * @param objectOrObjectArray An object or array of objects to release back into the global disposed objects cache.
         * WARNING: All disposed items are removed from the given array, including any disposable objects in nested arrays.
         * @param reduceArrays If true (default is false), and an array of objects are given, any disposable objects in the array are removed. If false, the positions are simple set to 'undefined' (void 0).
         */
        static dispose(objectOrObjectArray: IDisposable | IDisposable[], reduceArrays = false): void {
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
            var object: IDisposable = objectOrObjectArray;
            if (object == null || object == void 0 || object.isDisposed) return;
            if (object.isDisposed === void 0) {
                (<IDisposable>object).isDisposed = false;
                if (object.dispose) {
                    object.dispose();
                    return;
                }
            }
            //if (object.engine != this)
            //    throw this.error("The given object was not created by this engine. Make sure to call 'Engine.create({Type})' when creating new instances.");
            var typeindex = getTypeName(object);
            var dispoasedObjects = this.disposedObjectsByType[typeindex];
            if (!dispoasedObjects) this.disposedObjectsByType[typeindex] = dispoasedObjects = [];
            dispoasedObjects.push(object);
            var obj: IInternalEngineObject = <any>object;
            var engine = obj.engine;
            if (engine && engine instanceof Engine) {
                engine.objects.removeAt(obj.id)
                if (obj.uniqueName)
                    engine.objectsByUniqueName[obj.uniqueName] = void 0;
            }
            obj.id = void 0;
            obj.engine = null;
            (<IDisposable>object).isDisposed = true;
            (<IInitializable>object).isInitialized = false;
        }

        /**
         * Creates a prefab and returns the prefab ID (NOT object ID) for future reference.
         * @param obj The object to make a copy from to use as a prefabrication template.
         */
        saveAsPrefab(obj: IEngineObject): number;
        saveAsPrefab(): number;
        saveAsPrefab(obj?: IEngineObject): number {
            if (arguments.length) {
                var copy = obj.clone();
                this.prefabs.push(copy);
                return this.prefabs.length - 1;
            } else {
                // ... called based on the overridden function to save SELF as prefab, which is not supported on the engine (yet, if ever) ...
                throw this.error("The engine cannot be saved as a prefab.");
            }
        }

        /**
         * Creates a new empty matter entry in the engine. If one already exists with the same name, it is returned instead.
         * Update the returned object to set the various properties for the matter you wish to construct.
         * @param name A name for this matter.
         */
        createMatter(name: string, defaultElement?: Element): Matter {
            if (!name && defaultElement) name = defaultElement.name;
            var m = this.getDefaultMatter(name);
            if (m) return m;
            m = this.create(Matter).setElement(defaultElement);
            m.name = name;
            m.uniqueName = "$__matter_" + name;
            return m;
        }

        /**
         * Returns a default matter entry from the engine. If the matter doesn't exist, 'undefined' is returned.
         * WARNIG: Changing the properties of the returned instance affects all new future matter particles.
         * @param name A name (or Matter or Element object with the name) for the matter you wish to retrieve.
         */
        getDefaultMatter(name: string | Matter | Element): IMatter {
            if (name instanceof Matter)
                name = name.name;
            else if (name instanceof Element)
                name = name.name;
            return <IMatter>this.objectsByUniqueName["$__matter_" + name];
        }

        /**
         * Returns a cloned matter entry from the engine. If the matter doesn't exist, 'undefined' is returned.
         * Use this method to create particles for putting on world layers or in world objects (as bonded particles).
         * @param name A name (or Matter or Element object with the name) for the matter you wish to retrieve.
         */
        createMatterParticle(name: string | Matter | Element): IMatter {
            var m = this.getDefaultMatter(name);
            return m && m.clone();
        }

        /**
         * Creates and returns the default air matter entry.
         */
        createAirMatter(): Matter {
            // ... create some default matter types ...
            var _m = this.createMatter("air");
            _m.addAtomicWeight(1.008, 2).addAtomicWeight(15.99);  // https://goo.gl/HEAEN
            _m.freezingPoint = 58;
            _m.boilingPoint = 78.8;
            return _m;
        }

        /**
         * Creates the whole periodic table of elements in the engine.
         */
        createPeriodicTableElements(): void {
            if (!PeriodicTable)
                throw this.error("'PeridocTable' not found - PeridocTable.js must not be loaded.");
            else
                for (var p in PeriodicTable)
                    if (PeriodicTable[p] instanceof Element) {
                        var _m = this.createMatter(p);
                        _m.setElement(PeriodicTable[p]);
                    }
        }

        createDefaulyMatter(): void {
            // Note: Periodic table of the elements: https://goo.gl/axLiFD
            this.createAirMatter();
            this.createPeriodicTableElements();
        }

        /**
         * Creates and returns a new world for this world engine.
         */
        createWorld(): World {
            var world = this.create(World);
            this.add(world);
            return world;
        }

        /**
         * Creates an object that can be placed on a world layer.
         */
        createWorldObject(): WorldObject {
            var wo = this.create(WorldObject);
            return wo;
        }

        /**
         * Creates a layer that can be placed on a world.
         */
        createLayer(): Layer {
            var layer = this.engine.create(Layer);
            return layer;
        }

        // --------------------------------------------------------------------------------------------------------------------

        startup(): this {
            var w = this.firstChild;
            while (w) w.startup(), w = w.next;
            return super.startup();
        }

        update() {
            if (this.updateCount == 0)
                this.startup();
            var w = this.firstChild;
            while (w) w.update(), w = w.next;
            return super.update();
        }

        render(): void {
            var w = this.firstChild;
            while (w) w.render(), w = w.next;

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
        }

        // --------------------------------------------------------------------------------------------------------------------
    }

    //!compile(WorldSimulator2D.GraphObject, 'update');
    //!compile(WorldSimulator2D.SpatialObject, 'update');

    /**
     * Scans the core types in the system and inlines 'super' calls for fastest speed (mostly for key runtime functions, such as 'update' and 'render').
     * The engine types use inheritance, and as such many functions are overridden at many levels in the hierarchy.  This results
     * in many sub-type function overrides calling into the super type to continue the call chain towards the base, which is a
     * lot of overhead.  A built-in light-weight JavaScript compiler is used to flatten the calls.
     * This should be called BEFORE updating and rendering operations.
     */
    export function inlineSuperCalls() {
        // ... precompile the hierarchical method calls to speed things up ...
        for (var p in WorldSimulator2D)
            if (typeof WorldSimulator2D[p] == 'function') {
                var proto = WorldSimulator2D[p].prototype;
                if (proto instanceof EngineObject) {
                    if (Object.prototype.hasOwnProperty.call(proto, "update"))
                        compile(WorldSimulator2D[p], 'update');
                    if (Object.prototype.hasOwnProperty.call(proto, "render"))
                        compile(WorldSimulator2D[p], 'render');
                }
            }
    }

    for (var p in WorldSimulator2D)
        if (typeof WorldSimulator2D[p] == 'function')
            getTypeName(WorldSimulator2D[p]);
}

// Notes:
// * Normal and contact forces: https://goo.gl/PhkyEO
// * Collision Physics in Video Games: https://goo.gl/gpBsEn
// * Center of mass of multiple objects: https://goo.gl/SH2zCf
// * Possibly create own physics engine: https://goo.gl/oDfYXV
// * Particle fluid idea: https://goo.gl/bFZaWj
// * PixiJS Bunny Mark: https://pixijs.github.io/bunny-mark/
