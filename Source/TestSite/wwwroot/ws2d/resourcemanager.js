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
    var Loader;
    (function (Loader) {
        /** Some additional WS2D specific resource types. */
        var ResourceTypes;
        (function (ResourceTypes) {
            /** The resource represents texture data from WebGLJS. */
            ResourceTypes["Texture"] = "Texture";
            /** The resource represents an image object. */
            ResourceTypes["ImageObject"] = "Image";
            /** The resource represents an audio object. */
            ResourceTypes["AudioObject"] = "Audio";
            /** The resource is a DOM object. */
            ResourceTypes["DomObject"] = "DomObject";
            /** The resource is an array (such as Array(), [], Float32Array, Int32Array, etc.). */
            ResourceTypes["DataArray"] = "DataArray";
        })(ResourceTypes = Loader.ResourceTypes || (Loader.ResourceTypes = {}));
    })(Loader = WorldSimulator2D.Loader || (WorldSimulator2D.Loader = {}));
    WorldSimulator2D.InternalUtilities.doEnumReverseMapping(Loader.ResourceTypes);
    var LoadingStates;
    (function (LoadingStates) {
        LoadingStates[LoadingStates["NotLoaded"] = 0] = "NotLoaded";
        LoadingStates[LoadingStates["Loading"] = 1] = "Loading";
        LoadingStates[LoadingStates["Loaded"] = 2] = "Loaded";
    })(LoadingStates = WorldSimulator2D.LoadingStates || (WorldSimulator2D.LoadingStates = {}));
    /**
     * Represents a base class to be used to render output from the engine. This allows any number of output sources, such as
     * PixiJS (default), simple DOM elements, etc. (wherever your imagination takes you!).
     * The base class also contains some properties and methods to help manage resource tracking and loading.
     */
    var ResourceManager = /** @class */ (function (_super) {
        __extends(ResourceManager, _super);
        // --------------------------------------------------------------------------------------------------------------------
        function ResourceManager() {
            var _this = _super.call(this) || this;
            /** Called when a single resource has loaded. */
            _this.onResourceLoaded = [];
            /** Called when all resources have loaded. */
            _this.onResourcesLoaded = [];
            _this.resourceIndexes = {};
            return _this;
        }
        Object.defineProperty(ResourceManager.prototype, "width", {
            /** The desired render output width being rendered to (typically the desired canvas element width). */
            get: function () { return this._width; },
            set: function (value) { this._width = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceManager.prototype, "height", {
            /** The desired render output height being rendered to (typically the desired canvas element width). */
            get: function () { return this._height; },
            set: function (value) { this._height = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceManager.prototype, "allResourcesLoaded", {
            /** Returns true if all resources tracked by this resource manager are loaded. */
            get: function () {
                if (this.resourceIndexes)
                    for (var p in this.resourceIndexes)
                        if (p[0] == '*')
                            if (ResourceManager.resources[this.resourceIndexes[p]].state != LoadingStates.Loaded)
                                return false;
                return true;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Called to configure the render service. Derived types can add additional parameters if required.
         * @param width The desired width of the target rendering to.
         * @param height The desired height of the target rendering to.
         */
        ResourceManager.prototype.configure = function (element, width, height) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this.element = element;
            this._width = width;
            this._height = height;
            return this;
        };
        // --------------------------------------------------------------------------------------------------------------------
        /**
         * Called when the width or height changes.
         * The event is not triggered on start up, as it is assumed the derived type has already set this when 'configure()' is called.
         */
        ResourceManager.prototype.onResize = function () { };
        /**
         * Starts loading all the resources where the 'state' property equals 'NotLoaded'.
         */
        ResourceManager.prototype.start = function () {
            var _this = this;
            var get = Loader.get;
            for (var p in this.resourceIndexes)
                if (p[0] == '*') {
                    var resource = ResourceManager.resources[this.resourceIndexes[p]];
                    if (resource && resource.state == LoadingStates.NotLoaded) {
                        resource.state = LoadingStates.Loading;
                        var request = get(resource.path, resource.type).ready(function (r) {
                            _this.registerLoadedResource(resource.path, r.data);
                        });
                        request.start(); // (start loading right away)
                    }
                }
        };
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
        ResourceManager.prototype.registerResourcePath = function (path, type, id) {
            path = path !== void 0 && path !== null ? ('' + path).trim() : null;
            if (!path)
                throw this.error("A valid path value is required for this resource.");
            if (!type)
                type = Loader.getResourceTypeFromExtension(Loader.getFileExtensionFromURL(path));
            if (id)
                id = ('' + id).trim(); // (note: trim may clear the string if all whitespace)
            if (!id)
                id = path;
            // ... seem if it exists globally already ...
            var entry = this.getResourceEntry(path, true);
            if (!entry) {
                entry = { path: path, type: type, resource: null, state: LoadingStates.NotLoaded };
                var i = ResourceManager.resources.length;
                ResourceManager.resources.push(entry);
                ResourceManager.resourceIndexes[path] = i;
            }
            else
                i = ResourceManager.resourceIndexes[path];
            // ... update the local entry to track it ...
            this.resourceIndexes[path] = i;
            this.resourceIndexes['*' + id] = i; // (' * ' is normally an invalid path character, so we'll use that to separate IDs from the path named indexes)
            return id;
        };
        /**
         * Get the entry of a resource.
         * @param pathOrID A resource path or ID.  Global searches can only be done on path, since IDs are local only.
         * @param global If true, then the search is done globally.  If false (the default) only locally tracked resources are returned.
         */
        ResourceManager.prototype.getResourceEntry = function (pathOrID, global) {
            if (global === void 0) { global = false; }
            var i = global ? ResourceManager.resourceIndexes && ResourceManager.resourceIndexes[pathOrID] : this.resourceIndexes && this.resourceIndexes['*' + pathOrID];
            if (i < 0 || i === void 0)
                return void 0;
            return ResourceManager.resources[i];
        };
        /**
        * Sets a resource entry with the given loaded resource object.
         * There must already be a pending resource entry for this to work.
        * @param pathOrID The resource path or ID.
        * @param resource The resource to set.
        */
        ResourceManager.prototype.registerLoadedResource = function (pathOrID, resource) {
            if (!resource)
                throw this.error("No resource was given to register.");
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
        };
        /**
        * Register a resource entry with the given resource object.
        * Use this to register resources that are dynamically created and not loaded.
        * @param id An ID for to register this resource under.
        * @param resource The resource to register.
        * @param type The type of resource. The type is taken from the filename, if present, otherwise it can be expressed here.
        */
        ResourceManager.prototype.registerResource = function (id, resource, type) {
            if (!resource)
                throw this.error("No resource was given to register.");
            var entry = this.getResourceEntry(id);
            if (entry)
                throw Error("A resource by ID '" + id + "' is already registered.");
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
            else if (Array.isArray(resource) || WorldSimulator2D.isTypedArray(resource))
                entry.type = Loader.ResourceTypes.DataArray;
        };
        /**
        * Get a resource.
        * @param pathOrID A resource path or ID.
        * @param throwOnNotLoaded If true, and the resource is not loaded, an error will be thrown. Default is true.
         * @param global If true, then the search is done globally.  If false (the default) only locally tracked resources are returned.
        */
        ResourceManager.prototype.getResource = function (pathOrID, throwOnNotLoaded, global) {
            if (throwOnNotLoaded === void 0) { throwOnNotLoaded = true; }
            if (global === void 0) { global = false; }
            var entry = this.getResourceEntry(pathOrID, global);
            if (!entry)
                return void 0;
            if (throwOnNotLoaded && entry.state != LoadingStates.Loaded)
                throw this.error("Resource '" + pathOrID + "' is not loaded yet!");
            return entry.resource;
        };
        /**
         * Returns the locally tracked resources.
         */
        ResourceManager.prototype.getResources = function () {
            var r = [];
            for (var p in this.resourceIndexes)
                if (p[0] == '*') {
                    var i = this.resourceIndexes[p];
                    var entry = i !== void 0 ? ResourceManager.resources[i] : void 0;
                    if (entry)
                        r.push(entry);
                    else
                        delete this.resourceIndexes[p];
                }
            return r;
        };
        /**
        * Get all resources by type, regardless of loaded status.
        * @param type The type of resource.
         * @param global If true, then the search is done globally.  If false (the default) only locally tracked resources are returned.
        */
        ResourceManager.prototype.getResourcesByType = function (type, global) {
            if (global === void 0) { global = false; }
            var entries = [];
            var resource = global ? ResourceManager.resources : this.getResources();
            for (var i = resource.length - 1; i >= 0; --i)
                if (!resource[i])
                    delete resource[i]; // (clean up - seems someone removed it by setting the entry to undefined/null/0/false)
                else if (resource[i].type == type)
                    entries.push(resource[i]);
            return entries.reverse(); // (since it is being added backwards)
        };
        return ResourceManager;
    }(WorldSimulator2D.EngineObject));
    WorldSimulator2D.ResourceManager = ResourceManager;
    ResourceManager.resources = [];
    ResourceManager.resourceIndexes = ResourceManager.resources;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=resourcemanager.js.map