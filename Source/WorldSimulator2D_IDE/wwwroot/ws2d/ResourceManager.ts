namespace WorldSimulator2D {

    export namespace Loader {

        /** Some additional WS2D specific resource types. */
        export enum ResourceTypes {
            /** The resource represents texture data from WebGLJS. */
            Texture = "Texture",
            /** The resource represents an image object. */
            ImageObject = "Image",
            /** The resource represents an audio object. */
            AudioObject = "Audio",
            /** The resource is a DOM object. */
            DomObject = "DomObject",
            /** The resource is an array (such as Array(), [], Float32Array, Int32Array, etc.). */
            DataArray = "DataArray"
        }
    }

    InternalUtilities.doEnumReverseMapping(Loader.ResourceTypes);

    export enum LoadingStates { NotLoaded, Loading, Loaded }

    export interface IResourceEntry {
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
    export interface IResourceLoadedCallback extends IResultCallback<ResourceManager, IResourceEntry> { }
    /** This signature is called when all resources have loaded. */
    export interface IResourcesLoadedCallback extends ICallback<ResourceManager> { }

    /**
     * Represents a base class to be used to render output from the engine. This allows any number of output sources, such as
     * PixiJS (default), simple DOM elements, etc. (wherever your imagination takes you!).
     * The base class also contains some properties and methods to help manage resource tracking and loading.
     */
    export class ResourceManager extends EngineObject implements IResourceManager {
        // --------------------------------------------------------------------------------------------------------------------

        /** A list of resource paths. */
        static resources: IResourceEntry[];

        /** A list of resource paths indexed by BOTH a path AND an ID string (if supplied). */
        static resourceIndexes: { [path: string]: number };

        // --------------------------------------------------------------------------------------------------------------------

        /** A local list of resource paths indexed by BOTH a path AND an ID string (if supplied). */
        resourceIndexes: { [idOrPath: string]: number };

        /** Called when a single resource has loaded. */
        readonly onResourceLoaded: IResourceLoadedCallback[] = [];

        /** Called when all resources have loaded. */
        readonly onResourcesLoaded: IResourcesLoadedCallback[] = [];

        /** The element being render to (typically the canvas element). */
        readonly element: HTMLElement;

        /** The desired render output width being rendered to (typically the desired canvas element width). */
        get width() { return this._width; }
        set width(value: number) { this._width = value; }
        private _width: number;
        /** The desired render output height being rendered to (typically the desired canvas element width). */
        get height() { return this._height; }
        set height(value: number) { this._height = value; }
        private _height: number;

        /** Returns true if all resources tracked by this resource manager are loaded. */
        get allResourcesLoaded(): boolean {
            if (this.resourceIndexes)
                for (var p in this.resourceIndexes)
                    if (p[0] == '*')
                        if (ResourceManager.resources[this.resourceIndexes[p]].state != LoadingStates.Loaded)
                            return false;
            return true;
        }

        // --------------------------------------------------------------------------------------------------------------------

        constructor() {
            super();
            this.resourceIndexes = {};
        }

        /**
         * Called to configure the render service. Derived types can add additional parameters if required.
         * @param width The desired width of the target rendering to.
         * @param height The desired height of the target rendering to.
         */
        configure(element: HTMLElement, width: number, height: number, ...args: any[]): this {
            (<{ element: HTMLElement }>this).element = element;
            this._width = width;
            this._height = height;
            return this;
        }

        // --------------------------------------------------------------------------------------------------------------------

        /**
         * Called when the width or height changes.
         * The event is not triggered on start up, as it is assumed the derived type has already set this when 'configure()' is called.
         */
        protected onResize() { }

        /**
         * Starts loading all the resources where the 'state' property equals 'NotLoaded'.
         */
        start(): void {
            var get = Loader.get;
            for (var p in this.resourceIndexes)
                if (p[0] == '*') {
                    var resource = ResourceManager.resources[this.resourceIndexes[p]];
                    if (resource && resource.state == LoadingStates.NotLoaded) {
                        resource.state = LoadingStates.Loading;
                        var request = get(resource.path, resource.type).ready((r) => {
                            this.registerLoadedResource(resource.path, r.data);
                        });
                        request.start(); // (start loading right away)
                    }
                }
        }

        // --------------------------------------------------------------------------------------------------------------------

        ///**
        // * Gets a texture from an existing resource. Should return undefined if not found.
        // * @param resourcePathOrID A resource path or ID. If empty, a blank texture object is assumed.
        // */
        //abstract getTexture(resourcePathOrID?: string): object;

        // --------------------------------------------------------------------------------------------------------------------
        // Resource Management

        /**
         * Register a resource path (a URI or relative path) to be loaded later.
         * @param path The path to the resource.
         * @param type The type of resource. The type is taken from the filename extension if present, otherwise it can be expressed here.
         * @param id The ID of the resource (defaults to the path if not specified). The ID should be globally unique within the engine scope.
         * @returns The trimmed ID of the added resource (same as the path if no ID was given).
         */
        registerResourcePath(path: string, type?: Loader.ResourceTypes, id?: string): string {
            path = path !== void 0 && path !== null ? ('' + path).trim() : null;
            if (!path) throw this.error("A valid path value is required for this resource.");
            if (!type)
                type = Loader.getResourceTypeFromExtension(Loader.getFileExtensionFromURL(path));

            if (id) id = ('' + id).trim(); // (note: trim may clear the string if all whitespace)
            if (!id) id = path;

            // ... seem if it exists globally already ...

            var entry = this.getResourceEntry(path, true);

            if (!entry) {
                entry = { path: path, type: type, resource: null, state: LoadingStates.NotLoaded };
                var i = ResourceManager.resources.length;
                ResourceManager.resources.push(entry);
                ResourceManager.resourceIndexes[path] = i;
            }
            else i = ResourceManager.resourceIndexes[path];

            // ... update the local entry to track it ...

            this.resourceIndexes[path] = i;
            this.resourceIndexes['*' + id] = i; // (' * ' is normally an invalid path character, so we'll use that to separate IDs from the path named indexes)

            return id;
        }

        /**
         * Get the entry of a resource.
         * @param pathOrID A resource path or ID.  Global searches can only be done on path, since IDs are local only.
         * @param global If true, then the search is done globally.  If false (the default) only locally tracked resources are returned.
         */
        getResourceEntry(pathOrID: string, global = false): IResourceEntry {
            var i = global ? ResourceManager.resourceIndexes && ResourceManager.resourceIndexes[pathOrID] : this.resourceIndexes && this.resourceIndexes['*' + pathOrID];
            if (i < 0 || i === void 0) return void 0;
            return ResourceManager.resources[i];
        }

        /**
        * Sets a resource entry with the given loaded resource object.
         * There must already be a pending resource entry for this to work.
        * @param pathOrID The resource path or ID.
        * @param resource The resource to set.
        */
        registerLoadedResource(pathOrID: string, resource: object): void {
            if (!resource) throw this.error("No resource was given to register.");

            var entry = this.getResourceEntry(pathOrID);
            if (entry) {
                entry.resource = resource;
                entry.state = LoadingStates.Loaded;

                if (this.onResourceLoaded)
                    for (var i = 0, n = this.onResourceLoaded.length; i < n; ++i)
                        this.onResourceLoaded[i](this, entry);
                this.onResourceLoaded.length = 0; // (don't call again)
            }

            if (this.allResourcesLoaded && this.onResourcesLoaded) {
                for (var i = 0, n = this.onResourcesLoaded.length; i < n; ++i)
                    this.onResourcesLoaded[i](this);
                this.onResourcesLoaded.length = 0; // (don't call again)
            }
        }

        /**
        * Register a resource entry with the given resource object.
        * Use this to register resources that are dynamically created and not loaded.
        * @param id An ID for to register this resource under.
        * @param resource The resource to register.
        * @param type The type of resource. The type is taken from the filename, if present, otherwise it can be expressed here.
        */
        registerResource(id: string, resource: object, type?: Loader.ResourceTypes): void { // TODO: Add resource types!
            if (!resource) throw this.error("No resource was given to register.");
            var entry = this.getResourceEntry(id);
            if (entry) throw Error("A resource by ID '" + id + "' is already registered.");
            id = this.registerResourcePath("*", type, id); // ('*' is an invalid path character, and just allows bypassing the empty path check)
            var entry = this.getResourceEntry(id); // (get the entry - will be in a "not loaded" state by default)
            entry.resource = resource;
            entry.state = LoadingStates.Loaded; // (dynamic resource given, so immediately loaded)
            // ... detect some resource types ...
            if (resource instanceof WebGLJS.Texture)
                entry.type = Loader.ResourceTypes.Texture;
            else if (resource instanceof Node)
                entry.type = Loader.ResourceTypes.DomObject;
            else if (resource instanceof Image || resource instanceof ImageBitmap || resource instanceof ImageData)
                entry.type = Loader.ResourceTypes.ImageObject;
            else if (resource instanceof Audio || resource instanceof AudioBuffer || resource instanceof AudioContext || resource instanceof HTMLAudioElement)
                entry.type = Loader.ResourceTypes.AudioObject;
            else if (Array.isArray(resource) || isTypedArray(resource))
                entry.type = Loader.ResourceTypes.DataArray;
        }

        /**
        * Get a resource.
        * @param pathOrID A resource path or ID.
        * @param throwOnNotLoaded If true, and the resource is not loaded, an error will be thrown. Default is true.
         * @param global If true, then the search is done globally.  If false (the default) only locally tracked resources are returned.
        */
        getResource<T = object>(pathOrID: string, throwOnNotLoaded = true, global = false): T {
            var entry = this.getResourceEntry(pathOrID, global);
            if (!entry) return void 0;
            if (throwOnNotLoaded && entry.state != LoadingStates.Loaded)
                throw this.error("Resource '" + pathOrID + "' is not loaded yet!");
            return <T><any>entry.resource;
        }

        /**
         * Returns the locally tracked resources.
         */
        getResources(): IResourceEntry[] {
            var r: IResourceEntry[] = [];
            for (var p in this.resourceIndexes)
                if (p[0] == '*') {
                    var i = this.resourceIndexes[p];
                    var entry = i !== void 0 ? ResourceManager.resources[i] : void 0;
                    if (entry)
                        r.push(entry);
                    else // ... somehow was removed from the global list, so remove this entry ...
                        delete this.resourceIndexes[p];
                }
            return r;
        }

        /**
        * Get all resources by type, regardless of loaded status.
        * @param type The type of resource.
         * @param global If true, then the search is done globally.  If false (the default) only locally tracked resources are returned.
        */
        getResourcesByType(type: Loader.ResourceTypes, global = false): IResourceEntry[] {
            var entries: IResourceEntry[] = [];
            var resource = global ? ResourceManager.resources : this.getResources();
            for (var i = resource.length - 1; i >= 0; --i)
                if (!resource[i])
                    delete resource[i]; // (clean up - seems someone removed it by setting the entry to undefined/null/0/false)
                else if (resource[i].type == type)
                    entries.push(resource[i]);
            return entries.reverse(); // (since it is being added backwards)
        }

        // --------------------------------------------------------------------------------------------------------------------
    }

    ResourceManager.resources = [];
    ResourceManager.resourceIndexes = <any>ResourceManager.resources;

    export interface IResourceManager extends ResourceManager { }
}