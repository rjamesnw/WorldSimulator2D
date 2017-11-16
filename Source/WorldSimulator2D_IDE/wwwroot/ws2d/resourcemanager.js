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
        var ResourceTypes;
        (function (ResourceTypes) {
            ResourceTypes["Texture"] = "Texture";
            ResourceTypes["ImageObject"] = "Image";
            ResourceTypes["AudioObject"] = "Audio";
            ResourceTypes["DomObject"] = "DomObject";
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
    var ResourceManager = (function (_super) {
        __extends(ResourceManager, _super);
        function ResourceManager() {
            var _this = _super.call(this) || this;
            _this.onResourceLoaded = [];
            _this.onResourcesLoaded = [];
            _this.resourceIndexes = {};
            return _this;
        }
        Object.defineProperty(ResourceManager.prototype, "width", {
            get: function () { return this._width; },
            set: function (value) { this._width = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceManager.prototype, "height", {
            get: function () { return this._height; },
            set: function (value) { this._height = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceManager.prototype, "allResourcesLoaded", {
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
        ResourceManager.prototype.onResize = function () { };
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
                        request.start();
                    }
                }
        };
        ResourceManager.prototype.registerResourcePath = function (path, type, id) {
            path = path !== void 0 && path !== null ? ('' + path).trim() : null;
            if (!path)
                throw this.error("A valid path value is required for this resource.");
            if (!type)
                type = Loader.getResourceTypeFromExtension(Loader.getFileExtensionFromURL(path));
            if (id)
                id = ('' + id).trim();
            if (!id)
                id = path;
            var entry = this.getResourceEntry(path, true);
            if (!entry) {
                entry = { path: path, type: type, resource: null, state: LoadingStates.NotLoaded };
                var i = ResourceManager.resources.length;
                ResourceManager.resources.push(entry);
                ResourceManager.resourceIndexes[path] = i;
            }
            else
                i = ResourceManager.resourceIndexes[path];
            this.resourceIndexes[path] = i;
            this.resourceIndexes['*' + id] = i;
            return id;
        };
        ResourceManager.prototype.getResourceEntry = function (pathOrID, global) {
            if (global === void 0) { global = false; }
            var i = global ? ResourceManager.resourceIndexes && ResourceManager.resourceIndexes[pathOrID] : this.resourceIndexes && this.resourceIndexes['*' + pathOrID];
            if (i < 0 || i === void 0)
                return void 0;
            return ResourceManager.resources[i];
        };
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
                this.onResourceLoaded.length = 0;
            }
            if (this.allResourcesLoaded && this.onResourcesLoaded) {
                for (var i = 0, n = this.onResourcesLoaded.length; i < n; ++i)
                    this.onResourcesLoaded[i](this);
                this.onResourcesLoaded.length = 0;
            }
        };
        ResourceManager.prototype.registerResource = function (id, resource, type) {
            if (!resource)
                throw this.error("No resource was given to register.");
            var entry = this.getResourceEntry(id);
            if (entry)
                throw Error("A resource by ID '" + id + "' is already registered.");
            id = this.registerResourcePath("*", type, id);
            var entry = this.getResourceEntry(id);
            entry.resource = resource;
            entry.state = LoadingStates.Loaded;
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
        ResourceManager.prototype.getResourcesByType = function (type, global) {
            if (global === void 0) { global = false; }
            var entries = [];
            var resource = global ? ResourceManager.resources : this.getResources();
            for (var i = resource.length - 1; i >= 0; --i)
                if (!resource[i])
                    delete resource[i];
                else if (resource[i].type == type)
                    entries.push(resource[i]);
            return entries.reverse();
        };
        return ResourceManager;
    }(WorldSimulator2D.EngineObject));
    WorldSimulator2D.ResourceManager = ResourceManager;
    ResourceManager.resources = [];
    ResourceManager.resourceIndexes = ResourceManager.resources;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=resourcemanager.js.map