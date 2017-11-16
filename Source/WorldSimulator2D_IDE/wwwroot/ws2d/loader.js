var WorldSimulator2D;
(function (WorldSimulator2D) {
    var Loader;
    (function (Loader) {
        if (!XMLHttpRequest.DONE) {
            XMLHttpRequest.UNSENT = 0;
            XMLHttpRequest.OPENED = 1;
            XMLHttpRequest.HEADERS_RECEIVED = 2;
            XMLHttpRequest.LOADING = 3;
            XMLHttpRequest.DONE = 4;
        }
        var ResourceTypes;
        (function (ResourceTypes) {
            ResourceTypes["Unknown"] = "";
            ResourceTypes["Application_Script"] = "application/javascript";
            ResourceTypes["Application_ECMAScript"] = "application/ecmascript";
            ResourceTypes["Application_JSON"] = "application/json";
            ResourceTypes["Application_ZIP"] = "application/zip";
            ResourceTypes["Application_GZIP"] = "application/gzip";
            ResourceTypes["Application_PDF"] = "application/pdf";
            ResourceTypes["Application_DefaultFormPost"] = "application/x-www-form-urlencoded";
            ResourceTypes["Application_TTF"] = "application/x-font-ttf";
            ResourceTypes["Multipart_BinaryFormPost"] = "multipart/form-data";
            ResourceTypes["Audio_MP4"] = "audio/mp4";
            ResourceTypes["Audio_MPEG"] = "audio/mpeg";
            ResourceTypes["Audio_OGG"] = "audio/ogg";
            ResourceTypes["Audio_MIDI"] = "audio/midi";
            ResourceTypes["Audio_WEBM"] = "audio/webm";
            ResourceTypes["Audio_WAV"] = "audio/wav";
            ResourceTypes["Audio_AAC"] = "audio/x-aac";
            ResourceTypes["Audio_CAF"] = "audio/x-caf";
            ResourceTypes["Image_GIF"] = "image/gif";
            ResourceTypes["Image_JPEG"] = "image/jpeg";
            ResourceTypes["Image_PNG"] = "image/png";
            ResourceTypes["Image_BMP"] = "image/bmp";
            ResourceTypes["Image_WEBP"] = "image/webp";
            ResourceTypes["Image_SVG"] = "image/svg+xml";
            ResourceTypes["Image_GIMP"] = "image/x-xcf";
            ResourceTypes["Text_CSS"] = "text/css";
            ResourceTypes["Text_CSV"] = "text/csv";
            ResourceTypes["Text_HTML"] = "text/html";
            ResourceTypes["Text_JavaScript"] = "text/javascript";
            ResourceTypes["Text_Plain"] = "text/plain";
            ResourceTypes["Text_RTF"] = "text/rtf";
            ResourceTypes["Text_XML"] = "text/xml";
            ResourceTypes["Text_JQueryTemplate"] = "text/x-jquery-tmpl";
            ResourceTypes["Text_MarkDown"] = "text/x-markdown";
            ResourceTypes["Video_AVI"] = "video/avi";
            ResourceTypes["Video_MPEG"] = "video/mpeg";
            ResourceTypes["Video_MP4"] = "video/mp4";
            ResourceTypes["Video_OGG"] = "video/ogg";
            ResourceTypes["Video_MOV"] = "video/quicktime";
            ResourceTypes["Video_WMV"] = "video/x-ms-wmv";
            ResourceTypes["Video_FLV"] = "video/x-flv";
            ResourceTypes["Video_WEBM"] = "video/webm";
        })(ResourceTypes = Loader.ResourceTypes || (Loader.ResourceTypes = {}));
        WorldSimulator2D.InternalUtilities.doEnumReverseMapping(ResourceTypes);
        var ResourceExtensions;
        (function (ResourceExtensions) {
            ResourceExtensions["Application_Script"] = ".js";
            ResourceExtensions["Application_ECMAScript"] = ".es";
            ResourceExtensions["Application_JSON"] = ".json";
            ResourceExtensions["Application_ZIP"] = ".zip";
            ResourceExtensions["Application_GZIP"] = ".gz";
            ResourceExtensions["Application_PDF"] = ".pdf";
            ResourceExtensions["Application_TTF"] = ".ttf";
            ResourceExtensions["Audio_MP4"] = ".mp4";
            ResourceExtensions["Audio_MPEG"] = ".mpeg";
            ResourceExtensions["Audio_OGG"] = ".ogg";
            ResourceExtensions["Audio_MIDI"] = ".midi";
            ResourceExtensions["Audio_WEBM"] = ".webm";
            ResourceExtensions["Audio_WAV"] = ".wav";
            ResourceExtensions["Audio_AAC"] = ".aac";
            ResourceExtensions["Audio_CAF"] = ".caf";
            ResourceExtensions["Image_GIF"] = ".gif";
            ResourceExtensions["Image_JPEG"] = ".jpeg";
            ResourceExtensions["Image_PNG"] = ".png";
            ResourceExtensions["Image_BMP"] = ".bmp";
            ResourceExtensions["Image_WEBP"] = ".webp";
            ResourceExtensions["Image_SVG"] = ".svg";
            ResourceExtensions["Image_GIMP"] = ".xcf";
            ResourceExtensions["Text_CSS"] = ".css";
            ResourceExtensions["Text_CSV"] = ".csv";
            ResourceExtensions["Text_HTML"] = ".html";
            ResourceExtensions["Text_Plain"] = ".txt";
            ResourceExtensions["Text_RTF"] = ".rtf";
            ResourceExtensions["Text_XML"] = ".xml";
            ResourceExtensions["Text_JQueryTemplate"] = ".tpl.htm";
            ResourceExtensions["Text_MarkDown"] = ".markdown";
            ResourceExtensions["Video_AVI"] = ".avi";
            ResourceExtensions["Video_MPEG"] = ".mpeg";
            ResourceExtensions["Video_MP4"] = ".mp4";
            ResourceExtensions["Video_MOV"] = ".qt";
            ResourceExtensions["Video_WMV"] = ".wmv";
            ResourceExtensions["Video_FLV"] = ".flv";
            ResourceExtensions["Video_WEBM"] = ".webm";
            ResourceExtensions["Video_OGG"] = ".ogv";
        })(ResourceExtensions = Loader.ResourceExtensions || (Loader.ResourceExtensions = {}));
        WorldSimulator2D.InternalUtilities.doEnumReverseMapping(ResourceExtensions);
        ResourceExtensions['.tpl'] = ResourceExtensions[ResourceExtensions.Text_JQueryTemplate];
        function getResourceTypeFromExtension(ext) {
            if (ext === void 0 || ext === null)
                return void 0;
            var _ext = "" + ext;
            if (_ext.charAt(0) != '.')
                _ext = '.' + _ext;
            return ResourceTypes[ResourceExtensions[ext]];
        }
        Loader.getResourceTypeFromExtension = getResourceTypeFromExtension;
        function getFileExtensionFromURL(url) {
            if (!url)
                return "";
            return (url.match(/(\.[A-Za-z0-9]+)(?:[\?\#]|$)/i) || []).pop() || "";
        }
        Loader.getFileExtensionFromURL = getFileExtensionFromURL;
        var RequestStatuses;
        (function (RequestStatuses) {
            RequestStatuses[RequestStatuses["Pending"] = 0] = "Pending";
            RequestStatuses[RequestStatuses["Error"] = 1] = "Error";
            RequestStatuses[RequestStatuses["Loading"] = 2] = "Loading";
            RequestStatuses[RequestStatuses["Loaded"] = 3] = "Loaded";
            RequestStatuses[RequestStatuses["Waiting"] = 4] = "Waiting";
            RequestStatuses[RequestStatuses["Ready"] = 5] = "Ready";
            RequestStatuses[RequestStatuses["Executed"] = 6] = "Executed";
        })(RequestStatuses = Loader.RequestStatuses || (Loader.RequestStatuses = {}));
        var ResourceRequest = (function () {
            function ResourceRequest(url, type, async) {
                if (async === void 0) { async = true; }
                this.$__transformedData = WorldSimulator2D.noop;
                this.responseCode = 0;
                this.responseMessage = "";
                this.status = RequestStatuses.Pending;
                this.messages = [];
                this._promiseChain = [];
                this._promiseChainIndex = 0;
                this._dependentCompletedCount = 0;
                this._paused = false;
                if (url === void 0 || url === null)
                    throw "A resource URL is required.";
                if (type === void 0)
                    throw "The resource type is required.";
                if (_resourceRequestByURL[url])
                    return _resourceRequestByURL[url];
                this.url = url;
                this.type = type;
                this.async = async;
                this.$__index = _resourceRequests.length;
                _resourceRequests.push(this);
                _resourceRequestByURL[this.url] = this;
            }
            Object.defineProperty(ResourceRequest.prototype, "transformedData", {
                get: function () {
                    return this.$__transformedData === WorldSimulator2D.noop ? this.data : this.$__transformedData;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResourceRequest.prototype, "message", {
                get: function () {
                    return this.$__message;
                },
                set: function (value) {
                    this.$__message = value;
                    this.messages.push(this.$__message);
                    if (console && console.log)
                        console.log(this.$__message);
                },
                enumerable: true,
                configurable: true
            });
            ResourceRequest.prototype._queueDoNext = function (data) {
                var _this = this;
                setTimeout(function () {
                    _this._doNext();
                }, 0);
            };
            ResourceRequest.prototype._queueDoError = function () {
                var _this = this;
                setTimeout(function () { _this._doError(); }, 0);
            };
            ResourceRequest.prototype._requeueHandlersIfNeeded = function () {
                if (this.status == RequestStatuses.Error)
                    this._queueDoError();
                else if (this.status >= RequestStatuses.Waiting) {
                    this._queueDoNext(this.data);
                }
            };
            ResourceRequest.prototype.then = function (success, error) {
                if (success !== void 0 && success !== null && typeof success != WorldSimulator2D.FUNCTION || error !== void 0 && error !== null && typeof error !== WorldSimulator2D.FUNCTION)
                    throw "A handler function given is not a function.";
                else {
                    this._promiseChain.push({ onLoaded: success, onError: error });
                    this._requeueHandlersIfNeeded();
                }
                if (this.status == RequestStatuses.Waiting || this.status == RequestStatuses.Ready) {
                    this.status = RequestStatuses.Loaded;
                    this.message = "New 'then' handler added.";
                }
                return this;
            };
            ResourceRequest.prototype.include = function (request) {
                if (!request._dependents)
                    request._dependents = [];
                if (!this._dependants)
                    this._dependants = [];
                request._dependents.push(this);
                this._dependants.push(request);
                return request;
            };
            ResourceRequest.prototype.ready = function (handler) {
                if (typeof handler == WorldSimulator2D.FUNCTION) {
                    if (!this._onReady)
                        this._onReady = [];
                    this._onReady.push(handler);
                    this._requeueHandlersIfNeeded();
                }
                else
                    throw "Handler is not a function.";
                return this;
            };
            ResourceRequest.prototype.while = function (progressHandler) {
                if (typeof progressHandler == WorldSimulator2D.FUNCTION) {
                    if (!this._onProgress)
                        this._onProgress = [];
                    this._onProgress.push(progressHandler);
                    this._requeueHandlersIfNeeded();
                }
                else
                    throw "Handler is not a function.";
                return this;
            };
            ResourceRequest.prototype.abort = function () {
                if (this._xhr.readyState > XMLHttpRequest.UNSENT && this._xhr.readyState < XMLHttpRequest.DONE) {
                    this._xhr.abort();
                }
            };
            ResourceRequest.prototype.catch = function (errorHandler) {
                if (typeof errorHandler == WorldSimulator2D.FUNCTION) {
                    this._promiseChain.push({ onError: errorHandler });
                    this._requeueHandlersIfNeeded();
                }
                else
                    throw "Handler is not a function.";
                return this;
            };
            ResourceRequest.prototype.finally = function (cleanupHandler) {
                if (typeof cleanupHandler == WorldSimulator2D.FUNCTION) {
                    this._promiseChain.push({ onFinally: cleanupHandler });
                    this._requeueHandlersIfNeeded();
                }
                else
                    throw "Handler is not a function.";
                return this;
            };
            ResourceRequest.prototype.start = function () {
                var _this = this;
                if (this.async)
                    setTimeout(function () { _this._Start(); }, 0);
                else
                    this._Start();
                return this;
            };
            ResourceRequest.prototype._Start = function () {
                var _this = this;
                if (this._dependents)
                    for (var i = 0, n = this._dependents.length; i < n; ++i)
                        this._dependents[i].start();
                if (this.status == RequestStatuses.Pending) {
                    this.status = RequestStatuses.Loading;
                    this.message = "Loading resource '" + this.url + "' ...";
                    if (typeof Storage !== WorldSimulator2D.UNDEFINED)
                        try {
                            this.data = localStorage.getItem("resource:" + this.url);
                            if (this.data !== null && this.data !== void 0) {
                                this.status = RequestStatuses.Loaded;
                                this._doNext();
                                return;
                            }
                        }
                        catch (e) {
                        }
                    if (!this._xhr) {
                        this._xhr = new XMLHttpRequest();
                        var xhr = this._xhr;
                        var loaded = function () {
                            if (xhr.status == 200 || xhr.status == 304) {
                                _this.data = xhr.response;
                                _this.status == RequestStatuses.Loaded;
                                _this.message = "Loading completed.";
                                if (_this.type != xhr.responseType) {
                                    _this.setError("Resource type mismatch: expected type was '" + _this.type + "', but received '" + xhr.responseType + "'.\r\n");
                                }
                                else {
                                    if (typeof Storage !== WorldSimulator2D.UNDEFINED)
                                        try {
                                            localStorage.setItem("resource:" + _this.url, _this.data);
                                            _this.message = "Resource '" + _this.url + "' loaded from local storage.";
                                        }
                                        catch (e) {
                                        }
                                    _this._doNext();
                                }
                            }
                            else {
                                _this.setError("There was a problem loading the resource '" + _this.url + "' (status code " + xhr.status + ": " + xhr.statusText + ").\r\n");
                            }
                        };
                        xhr.onreadystatechange = function () {
                            switch (xhr.readyState) {
                                case XMLHttpRequest.UNSENT: break;
                                case XMLHttpRequest.OPENED:
                                    _this.message = "Opened connection to '" + _this.url + "'.";
                                    break;
                                case XMLHttpRequest.HEADERS_RECEIVED:
                                    _this.message = "Headers received for '" + _this.url + "'.";
                                    break;
                                case XMLHttpRequest.LOADING: break;
                                case XMLHttpRequest.DONE:
                                    loaded();
                                    break;
                            }
                        };
                        xhr.onerror = function (ev) { _this.setError(void 0, ev); _this._doError(); };
                        xhr.onabort = function () { _this.setError("Request aborted"); };
                        xhr.ontimeout = function () { _this.setError("Request timed out."); };
                        xhr.onprogress = function (evt) {
                            _this.message = "Loaded " + Math.round(evt.loaded / evt.total * 100) + "%.";
                            if (_this._onProgress && _this._onProgress.length)
                                _this._doOnProgress(evt.loaded / evt.total * 100);
                        };
                    }
                }
                else {
                    return;
                }
                if (xhr.readyState != 0)
                    xhr.abort();
                xhr.open("get", this.url, this.async);
            };
            ResourceRequest.prototype.pause = function () {
                if (this.status >= RequestStatuses.Pending && this.status < RequestStatuses.Ready
                    || this.status == RequestStatuses.Ready && this._onReady.length)
                    this._paused = true;
                return this;
            };
            ResourceRequest.prototype.continue = function () {
                if (this._paused) {
                    this._paused = false;
                    this._requeueHandlersIfNeeded();
                }
                return this;
            };
            ResourceRequest.prototype._doOnProgress = function (percent) {
                if (this._onProgress) {
                    for (var i = 0, n = this._onProgress.length; i < n; ++i)
                        try {
                            var cb = this._onProgress[i];
                            if (cb)
                                cb.call(this, this);
                        }
                        catch (e) {
                            this._onProgress[i] = null;
                            this.setError("'on progress' callback #" + i + " has thrown an error:", e);
                        }
                }
            };
            ResourceRequest.prototype.setError = function (message, error) {
                var msg = message;
                if (error) {
                    if (msg)
                        msg += " ";
                    if (error.name)
                        msg = "(" + error.name + ") " + msg;
                    message += error.message || "";
                    if (error.stack)
                        msg += "\r\nStack: \r\n" + error.stack + "\r\n";
                }
                this.message = msg;
                this.messages.push(this.message);
                this.status = RequestStatuses.Error;
                if (console)
                    if (console.error)
                        console.error(msg);
                    else if (console.log)
                        console.log(msg);
            };
            ResourceRequest.prototype._doNext = function () {
                var _this = this;
                if (this.status == RequestStatuses.Error) {
                    this._doError();
                    return;
                }
                if (this._onProgress && this._onProgress.length) {
                    this._doOnProgress(100);
                    this._onProgress.length = 0;
                }
                for (var n = this._promiseChain.length; this._promiseChainIndex < n; ++this._promiseChainIndex) {
                    if (this._paused)
                        return;
                    var handlers = this._promiseChain[this._promiseChainIndex];
                    if (handlers.onLoaded) {
                        try {
                            var data = handlers.onLoaded.call(this, this.transformedData);
                        }
                        catch (e) {
                            this.setError("Success handler failed:", e);
                            ++this._promiseChainIndex;
                            this._doError();
                            return;
                        }
                        if (typeof data === WorldSimulator2D.OBJECT && data instanceof ResourceRequest) {
                            if (data.status == RequestStatuses.Error) {
                                this.setError("Rejected request returned.");
                                ++this._promiseChainIndex;
                                this._doError();
                                return;
                            }
                            else {
                                var newResReq = data;
                                if (newResReq.status >= RequestStatuses.Ready) {
                                    if (newResReq === this)
                                        continue;
                                    data = newResReq.transformedData;
                                }
                                else {
                                    newResReq.ready(function (sender) { _this.$__transformedData = sender.transformedData; _this._doNext(); })
                                        .catch(function (sender) { _this.setError("Resource returned from next handler has failed to load:", sender); _this._doError(); });
                                    return;
                                }
                            }
                        }
                        this.$__transformedData = data;
                    }
                    else if (handlers.onFinally) {
                        try {
                            handlers.onFinally.call(this);
                        }
                        catch (e) {
                            this.setError("Cleanup handler failed:", e);
                            ++this._promiseChainIndex;
                            this._doError();
                        }
                    }
                }
                this._promiseChain.length = 0;
                this._promiseChainIndex = 0;
                if (this.status < RequestStatuses.Waiting)
                    this.status = RequestStatuses.Waiting;
                this._doReady();
            };
            ResourceRequest.prototype._doReady = function () {
                if (this._paused)
                    return;
                if (this.status < RequestStatuses.Waiting)
                    return;
                if (this.status == RequestStatuses.Waiting)
                    if (!this._dependents || !this._dependents.length) {
                        this.status = RequestStatuses.Ready;
                        this.message = "Resource '" + this.url + "' has no dependencies, and is now ready.";
                    }
                    else if (this._dependentCompletedCount == this._dependents.length) {
                        this.status = RequestStatuses.Ready;
                        this.message = "All dependencies for resource '" + this.url + "' have loaded, and are now ready.";
                    }
                    else {
                        this.message = "Resource '" + this.url + "' is waiting on dependencies (" + this._dependentCompletedCount + "/" + this._dependents.length + " ready so far)...";
                        return;
                    }
                if (this.status == RequestStatuses.Ready) {
                    if (this._onReady && this._onReady.length) {
                        try {
                            this._onReady.shift().call(this, this);
                            if (this._paused)
                                return;
                        }
                        catch (e) {
                            this.setError("Error in ready handler:", e);
                        }
                    }
                    for (var i = 0, n = this._dependants.length; i < n; ++i) {
                        ++this._dependants[i]._dependentCompletedCount;
                        this._dependants[i]._doReady();
                    }
                }
            };
            ResourceRequest.prototype._doError = function () {
                var _this = this;
                if (this._paused)
                    return;
                if (this.status != RequestStatuses.Error) {
                    this._doNext();
                    return;
                }
                for (var n = this._promiseChain.length; this._promiseChainIndex < n; ++this._promiseChainIndex) {
                    if (this._paused)
                        return;
                    var handlers = this._promiseChain[this._promiseChainIndex];
                    if (handlers.onError) {
                        try {
                            var newData = handlers.onError.call(this, this, this.message);
                        }
                        catch (e) {
                            this.setError("Error handler failed:", e);
                        }
                        if (typeof newData === WorldSimulator2D.OBJECT && newData instanceof ResourceRequest) {
                            if (newData.status == RequestStatuses.Error)
                                return;
                            else {
                                var newResReq = newData;
                                if (newResReq.status >= RequestStatuses.Ready)
                                    newData = newResReq.transformedData;
                                else {
                                    newResReq.ready(function (sender) { _this.$__transformedData = sender.transformedData; _this._doNext(); })
                                        .catch(function (sender) { _this.setError("Resource returned from error handler has failed to load:", sender); _this._doError(); });
                                    return;
                                }
                            }
                        }
                        this.status = RequestStatuses.Loaded;
                        this.$__message = void 0;
                        ++this._promiseChainIndex;
                        this.$__transformedData = newData;
                        this._doNext();
                        return;
                    }
                    else if (handlers.onFinally) {
                        try {
                            handlers.onFinally.call(this);
                        }
                        catch (e) {
                            this.setError("Cleanup handler failed:", e);
                        }
                    }
                }
                if (this.status == RequestStatuses.Error) {
                    var msgs = this.messages.join("\r\n· ");
                    if (msgs)
                        msgs = ":\r\n· " + msgs;
                    else
                        msgs = ".";
                    throw new Error("Unhandled error loading resource " + ResourceTypes[this.type] + " from '" + this.url + "'" + msgs + "\r\n");
                }
            };
            ResourceRequest.prototype.reload = function (includeDependentResources) {
                if (includeDependentResources === void 0) { includeDependentResources = true; }
                if (this.status == RequestStatuses.Error || this.status >= RequestStatuses.Ready) {
                    this.data = void 0;
                    this.status = RequestStatuses.Pending;
                    this.responseCode = 0;
                    this.responseMessage = "";
                    this.$__message = "";
                    this.messages = [];
                    if (includeDependentResources)
                        for (var i = 0, n = this._dependents.length; i < n; ++i)
                            this._dependents[i].reload(includeDependentResources);
                    if (this._onProgress)
                        this._onProgress.length = 0;
                    if (this._onReady)
                        this._onReady.length = 0;
                    if (this._promiseChain)
                        this._promiseChain.length = 0;
                    this.start();
                }
                return this;
            };
            return ResourceRequest;
        }());
        Loader.ResourceRequest = ResourceRequest;
        var _resourceRequests = [];
        var _resourceRequestByURL = {};
        function get(url, type) {
            if (url === void 0 || url === null)
                throw "A resource URL is required.";
            url = "" + url;
            if (type === void 0 || type === null) {
                var ext = getFileExtensionFromURL(url);
                type = getResourceTypeFromExtension(ext);
                if (!type)
                    type = ResourceTypes.Unknown;
            }
            var request = _resourceRequestByURL[url];
            if (!request)
                request = new ResourceRequest(url, type);
            return request;
        }
        Loader.get = get;
    })(Loader = WorldSimulator2D.Loader || (WorldSimulator2D.Loader = {}));
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=loader.js.map