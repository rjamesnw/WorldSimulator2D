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
