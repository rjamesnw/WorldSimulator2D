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
