var WorldSimulator2D;
(function (WorldSimulator2D) {
    // =======================================================================================================================
    /** The loader namespace contains low level functions for loading resources.
    * In most cases you can simply just call 'WorldSimulator2D.Loader.get()', or use an instance of the 'ResourceManager' class.
    */
    var Loader;
    (function (Loader) {
        // ... polyfill some XHR 'readyState' constants ...
        if (!XMLHttpRequest.DONE) {
            XMLHttpRequest.UNSENT = 0;
            XMLHttpRequest.OPENED = 1;
            XMLHttpRequest.HEADERS_RECEIVED = 2;
            XMLHttpRequest.LOADING = 3;
            XMLHttpRequest.DONE = 4;
        }
        /** The most common mime types.  You can easily extend this enum with custom types, or force-cast strings to this type also. */
        /* NOTE: The enums entries MUST be prefixed with '<any>' in order for this mapping to work with 'ResourceExtensions' as well implicitly. */
        var ResourceTypes;
        (function (ResourceTypes) {
            /** The resource type is not known. */
            ResourceTypes["Unknown"] = "";
            // Application
            ResourceTypes["Application_Script"] = "application/javascript";
            ResourceTypes["Application_ECMAScript"] = "application/ecmascript";
            ResourceTypes["Application_JSON"] = "application/json";
            ResourceTypes["Application_ZIP"] = "application/zip";
            ResourceTypes["Application_GZIP"] = "application/gzip";
            ResourceTypes["Application_PDF"] = "application/pdf";
            ResourceTypes["Application_DefaultFormPost"] = "application/x-www-form-urlencoded";
            ResourceTypes["Application_TTF"] = "application/x-font-ttf";
            // Multipart
            ResourceTypes["Multipart_BinaryFormPost"] = "multipart/form-data";
            // Audio
            ResourceTypes["Audio_MP4"] = "audio/mp4";
            ResourceTypes["Audio_MPEG"] = "audio/mpeg";
            ResourceTypes["Audio_OGG"] = "audio/ogg";
            ResourceTypes["Audio_MIDI"] = "audio/midi";
            ResourceTypes["Audio_WEBM"] = "audio/webm";
            ResourceTypes["Audio_WAV"] = "audio/wav";
            ResourceTypes["Audio_AAC"] = "audio/x-aac";
            ResourceTypes["Audio_CAF"] = "audio/x-caf";
            // Image
            ResourceTypes["Image_GIF"] = "image/gif";
            ResourceTypes["Image_JPEG"] = "image/jpeg";
            ResourceTypes["Image_PNG"] = "image/png";
            ResourceTypes["Image_BMP"] = "image/bmp";
            ResourceTypes["Image_WEBP"] = "image/webp";
            ResourceTypes["Image_SVG"] = "image/svg+xml";
            ResourceTypes["Image_GIMP"] = "image/x-xcf";
            // Text
            ResourceTypes["Text_CSS"] = "text/css";
            ResourceTypes["Text_CSV"] = "text/csv";
            ResourceTypes["Text_HTML"] = "text/html";
            ResourceTypes["Text_JavaScript"] = "text/javascript";
            ResourceTypes["Text_Plain"] = "text/plain";
            ResourceTypes["Text_RTF"] = "text/rtf";
            ResourceTypes["Text_XML"] = "text/xml";
            ResourceTypes["Text_JQueryTemplate"] = "text/x-jquery-tmpl";
            ResourceTypes["Text_MarkDown"] = "text/x-markdown";
            // Video
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
        /** A map of popular resource extensions to resource enum type names.
          * Example 1: ResourceTypes[ResourceExtensions[ResourceExtensions.Application_Script]] === "application/javascript"
          * Example 2: ResourceTypes[ResourceExtensions[<ResourceExtensions><any>'.JS']] === "application/javascript"
          * Example 3: CoreXT.Loader.getResourceTypeFromExtension(ResourceExtensions.Application_Script);
          * Example 4: CoreXT.Loader.getResourceTypeFromExtension(".js");
          */
        /* NOTE: The enums entries MUST be prefixed with '<any>' in order for this mapping to work with 'ResourceTypes' as well implicitly. */
        var ResourceExtensions;
        (function (ResourceExtensions) {
            ResourceExtensions["Application_Script"] = ".js";
            ResourceExtensions["Application_ECMAScript"] = ".es";
            ResourceExtensions["Application_JSON"] = ".json";
            ResourceExtensions["Application_ZIP"] = ".zip";
            ResourceExtensions["Application_GZIP"] = ".gz";
            ResourceExtensions["Application_PDF"] = ".pdf";
            ResourceExtensions["Application_TTF"] = ".ttf";
            // Audio
            ResourceExtensions["Audio_MP4"] = ".mp4";
            ResourceExtensions["Audio_MPEG"] = ".mpeg";
            ResourceExtensions["Audio_OGG"] = ".ogg";
            ResourceExtensions["Audio_MIDI"] = ".midi";
            ResourceExtensions["Audio_WEBM"] = ".webm";
            ResourceExtensions["Audio_WAV"] = ".wav";
            ResourceExtensions["Audio_AAC"] = ".aac";
            ResourceExtensions["Audio_CAF"] = ".caf";
            // Image
            ResourceExtensions["Image_GIF"] = ".gif";
            ResourceExtensions["Image_JPEG"] = ".jpeg";
            ResourceExtensions["Image_PNG"] = ".png";
            ResourceExtensions["Image_BMP"] = ".bmp";
            ResourceExtensions["Image_WEBP"] = ".webp";
            ResourceExtensions["Image_SVG"] = ".svg";
            ResourceExtensions["Image_GIMP"] = ".xcf";
            // Text
            ResourceExtensions["Text_CSS"] = ".css";
            ResourceExtensions["Text_CSV"] = ".csv";
            ResourceExtensions["Text_HTML"] = ".html";
            ResourceExtensions["Text_Plain"] = ".txt";
            ResourceExtensions["Text_RTF"] = ".rtf";
            ResourceExtensions["Text_XML"] = ".xml";
            ResourceExtensions["Text_JQueryTemplate"] = ".tpl.htm";
            ResourceExtensions["Text_MarkDown"] = ".markdown";
            // Video
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
        ResourceExtensions['.tpl'] = ResourceExtensions[ResourceExtensions.Text_JQueryTemplate]; // (map to the same 'Text_JQueryTemplate' target)
        function getResourceTypeFromExtension(ext) {
            if (ext === void 0 || ext === null)
                return void 0;
            var _ext = "" + ext; // (make sure it's a string)
            if (_ext.charAt(0) != '.')
                _ext = '.' + _ext; // (a period is required)
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
            /** The request has not been executed yet. */
            RequestStatuses[RequestStatuses["Pending"] = 0] = "Pending";
            /** The resource failed to load.  Check the request object for the error details. */
            RequestStatuses[RequestStatuses["Error"] = 1] = "Error";
            /** The requested resource is loading. */
            RequestStatuses[RequestStatuses["Loading"] = 2] = "Loading";
            /** The requested resource has loaded (nothing more). */
            RequestStatuses[RequestStatuses["Loaded"] = 3] = "Loaded";
            /** The requested resource is waiting on parent resources to complete. */
            RequestStatuses[RequestStatuses["Waiting"] = 4] = "Waiting";
            /** The requested resource is ready to be used. */
            RequestStatuses[RequestStatuses["Ready"] = 5] = "Ready";
            /** The source is a script, and was executed (this only occurs on demand [not automatic]). */
            RequestStatuses[RequestStatuses["Executed"] = 6] = "Executed";
        })(RequestStatuses = Loader.RequestStatuses || (Loader.RequestStatuses = {}));
        // ====================================================================================================================
        /** Creates a new resource request object, which allows loading resources using a "promise" style pattern (this is a custom
          * implementation designed to work better with the CoreXT system specifically, and to support parallel loading).
          * Note: It is advised to use 'CoreXT.Loader.loadResource()' to load resources instead of directly creating resource request objects.
          * Inheritance note: When creating via the 'new' operator, any already existing instance with the same URL will be returned,
          * and NOT the new object instance.  For this reason, you should call 'loadResource()' instead.
          */
        var ResourceRequest = /** @class */ (function () {
            // ----------------------------------------------------------------------------------------------------------------
            /** Constructs a load request promise-type object for a resource loading operation.
            * @param url The resource URL relative to the current browser page location.
            * @param type The resource type expected.
            * @param asyc If the main thread should be blocked while loading the resource. This is depreciated in some/most browsers and should normally not be used.
            */
            function ResourceRequest(url, type, async) {
                if (async === void 0) { async = true; }
                this.$__transformedData = WorldSimulator2D.noop;
                /** The response code from the XHR response. */
                this.responseCode = 0; // (the response code returned)
                /** The response code message from the XHR response. */
                this.responseMessage = ""; // (the response code message)
                /** The current request status. */
                this.status = RequestStatuses.Pending;
                /** Includes the current message and all previous messages. Use this to trace any silenced errors in the request process. */
                this.messages = [];
                /** This is a list of all the callbacks waiting on the status of this request (such as on loaded or error).
                * There's also an 'on finally' which should execute on success OR failure, regardless.
                * For each entry, only ONE of any callback type will be set.
                */
                this._promiseChain = [];
                this._promiseChainIndex = 0; // (the current position in the event chain)
                this._dependentCompletedCount = 0; // (when this equals the # of 'dependents', the all parent resources have loaded [just faster than iterating over them])
                this._paused = false;
                if (url === void 0 || url === null)
                    throw "A resource URL is required.";
                if (type === void 0)
                    throw "The resource type is required.";
                if (_resourceRequestByURL[url])
                    return _resourceRequestByURL[url]; // (abandon this new object instance in favor of the one already existing and returned it)
                this.url = url;
                this.type = type;
                this.async = async;
                this.$__index = _resourceRequests.length;
                _resourceRequests.push(this);
                _resourceRequestByURL[this.url] = this;
            }
            Object.defineProperty(ResourceRequest.prototype, "transformedData", {
                /** Set to data returned from callback handlers as the 'data' property value gets transformed.
                  * If no transformations were made, then the value in 'data' is returned.
                  */
                get: function () {
                    return this.$__transformedData === WorldSimulator2D.noop ? this.data : this.$__transformedData;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResourceRequest.prototype, "message", {
                /** A progress/error message related to the status (may not be the same as the response message). */
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
                    // ... before this, fire any handlers that would execute before this ...
                    _this._doNext();
                }, 0);
            }; // (simulate an async response, in case more handlers need to be added next)
            ResourceRequest.prototype._queueDoError = function () {
                var _this = this;
                setTimeout(function () { _this._doError(); }, 0);
            }; // (simulate an async response, in case more handlers need to be added next)
            ResourceRequest.prototype._requeueHandlersIfNeeded = function () {
                if (this.status == RequestStatuses.Error)
                    this._queueDoError();
                else if (this.status >= RequestStatuses.Waiting) {
                    this._queueDoNext(this.data);
                }
                // ... else, not needed, as the chain is still being traversed, so anything added will get run as expected ...
            };
            ResourceRequest.prototype.then = function (success, error) {
                if (success !== void 0 && success !== null && typeof success != WorldSimulator2D.FUNCTION || error !== void 0 && error !== null && typeof error !== WorldSimulator2D.FUNCTION)
                    throw "A handler function given is not a function.";
                else {
                    this._promiseChain.push({ onLoaded: success, onError: error });
                    this._requeueHandlersIfNeeded();
                }
                if (this.status == RequestStatuses.Waiting || this.status == RequestStatuses.Ready) {
                    this.status = RequestStatuses.Loaded; // (back up)
                    this.message = "New 'then' handler added.";
                }
                return this;
            };
            /** Adds another request and makes it dependent on the current 'parent' request.  When all parent requests have completed,
              * the dependant request fires its 'onReady' event.
              * Note: The given request is returned, and not the current context, so be sure to complete configurations before hand.
              */
            ResourceRequest.prototype.include = function (request) {
                if (!request._dependents)
                    request._dependents = [];
                if (!this._dependants)
                    this._dependants = [];
                request._dependents.push(this);
                this._dependants.push(request);
                return request;
            };
            /**
             * Add a call-back handler for when the request completes successfully.
             * @param handler
             */
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
            /** Adds a hook into the resource load progress event. */
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
            /** Call this anytime while loading is in progress to terminate the request early. An error event will be triggered as well. */
            ResourceRequest.prototype.abort = function () {
                if (this._xhr.readyState > XMLHttpRequest.UNSENT && this._xhr.readyState < XMLHttpRequest.DONE) {
                    this._xhr.abort();
                }
            };
            /**
             * Provide a handler to catch any errors from this request.
             */
            ResourceRequest.prototype.catch = function (errorHandler) {
                if (typeof errorHandler == WorldSimulator2D.FUNCTION) {
                    this._promiseChain.push({ onError: errorHandler });
                    this._requeueHandlersIfNeeded();
                }
                else
                    throw "Handler is not a function.";
                return this;
            };
            /**
             * Provide a handler which should execute on success OR failure, regardless.
             */
            ResourceRequest.prototype.finally = function (cleanupHandler) {
                if (typeof cleanupHandler == WorldSimulator2D.FUNCTION) {
                    this._promiseChain.push({ onFinally: cleanupHandler });
                    this._requeueHandlersIfNeeded();
                }
                else
                    throw "Handler is not a function.";
                return this;
            };
            /** Starts loading the current resource.  If the current resource has dependencies, they are triggered to load first (in proper
              * order).  Regardless of the start order, all scripts are loaded in parallel.
              * Note: This call queues the start request in 'async' mode, which begins only after the current script execution is completed.
              */
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
                // ... start at the top most parent first, and work down ...
                if (this._dependents)
                    for (var i = 0, n = this._dependents.length; i < n; ++i)
                        this._dependents[i].start();
                if (this.status == RequestStatuses.Pending) {
                    this.status = RequestStatuses.Loading; // (do this first to protect against any possible cyclical calls)
                    this.message = "Loading resource '" + this.url + "' ...";
                    // ... this request has not been started yet; attempt to load the resource ...
                    // ... 1. see first if this file is cached in the web storage, then load it from there instead ...
                    if (typeof Storage !== WorldSimulator2D.UNDEFINED)
                        try {
                            this.data = localStorage.getItem("resource:" + this.url); // (should return 'null' if not found)
                            if (this.data !== null && this.data !== void 0) {
                                this.status = RequestStatuses.Loaded;
                                this._doNext();
                                return;
                            }
                        }
                        catch (e) {
                            // ... not supported? ...
                        }
                    // ... 2. check web SQL for the resource ...
                    // TODO: Consider Web SQL Database as well. (though not supported by IE yet, as usual, but could help greatly on the others) //?
                    // ... 3. if not in web storage, try loading from a CoreXT core system, if available ...
                    // TODO: Message CoreXT core system for resource data. // TODO: need to build the bridge class first.
                    // ... next, create an XHR object and try to load the resource ...
                    if (!this._xhr) {
                        this._xhr = new XMLHttpRequest();
                        var xhr = this._xhr;
                        var loaded = function () {
                            if (xhr.status == 200 || xhr.status == 304) {
                                _this.data = xhr.response;
                                _this.status == RequestStatuses.Loaded;
                                _this.message = "Loading completed.";
                                // ... check if the expected mime type matches, otherwise throw an error to be safe ...
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
                                            // .. failed: out of space? ...
                                            // TODO: consider saving to web SQL as well, or on failure (as a backup; perhaps create a storage class with this support). //?
                                        }
                                    _this._doNext();
                                }
                            }
                            else {
                                _this.setError("There was a problem loading the resource '" + _this.url + "' (status code " + xhr.status + ": " + xhr.statusText + ").\r\n");
                            }
                        };
                        // ... this script is not cached, so load it ...
                        xhr.onreadystatechange = function () {
                            switch (xhr.readyState) {
                                case XMLHttpRequest.UNSENT: break;
                                case XMLHttpRequest.OPENED:
                                    _this.message = "Opened connection to '" + _this.url + "'.";
                                    break;
                                case XMLHttpRequest.HEADERS_RECEIVED:
                                    _this.message = "Headers received for '" + _this.url + "'.";
                                    break;
                                case XMLHttpRequest.LOADING: break; // (this will be handled by the progress event)
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
                        // (note: all event 'on...' properties only available in IE10+)
                    }
                }
                else {
                    return;
                }
                if (xhr.readyState != 0)
                    xhr.abort(); // (just in case)
                xhr.open("get", this.url, this.async);
                //?if (!this.async && (xhr.status)) doSuccess();
            };
            /** Upon return, the 'then' or 'ready' event chain will pause until 'continue()' is called. */
            ResourceRequest.prototype.pause = function () {
                if (this.status >= RequestStatuses.Pending && this.status < RequestStatuses.Ready
                    || this.status == RequestStatuses.Ready && this._onReady.length)
                    this._paused = true;
                return this;
            };
            /** After calling 'pause()', use this function to re-queue the 'then' or 'ready' even chain for continuation.
              * Note: This queues on a timer with a 0 ms delay, and does not call any events before returning to the caller.
              */
            ResourceRequest.prototype.continue = function () {
                if (this._paused) {
                    this._paused = false;
                    this._requeueHandlersIfNeeded();
                }
                return this;
            };
            ResourceRequest.prototype._doOnProgress = function (percent) {
                // ... notify any handlers as well ...
                if (this._onProgress) {
                    for (var i = 0, n = this._onProgress.length; i < n; ++i)
                        try {
                            var cb = this._onProgress[i];
                            if (cb)
                                cb.call(this, this);
                        }
                        catch (e) {
                            this._onProgress[i] = null; // (won't be called again)
                            this.setError("'on progress' callback #" + i + " has thrown an error:", e);
                            // ... do nothing, not important ...
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
                // ... send resource loading error messages to the console to aid debugging ...
                if (console)
                    if (console.error)
                        console.error(msg);
                    else if (console.log)
                        console.log(msg);
            };
            ResourceRequest.prototype._doNext = function () {
                var _this = this;
                if (this.status == RequestStatuses.Error) {
                    this._doError(); // (still in an error state, so pass on to trigger error handlers in case new ones were added)
                    return;
                }
                if (this._onProgress && this._onProgress.length) {
                    this._doOnProgress(100);
                    this._onProgress.length = 0;
                }
                for (var n = this._promiseChain.length; this._promiseChainIndex < n; ++this._promiseChainIndex) {
                    if (this._paused)
                        return;
                    var handlers = this._promiseChain[this._promiseChainIndex]; // (get all the handlers waiting for the result of this request)
                    if (handlers.onLoaded) {
                        try {
                            var data = handlers.onLoaded.call(this, this.transformedData); // (call the handler with the current data and get the resulting data, if any)
                        }
                        catch (e) {
                            this.setError("Success handler failed:", e);
                            ++this._promiseChainIndex; // (the success callback failed, so trigger the error chain starting at next index)
                            this._doError();
                            return;
                        }
                        if (typeof data === WorldSimulator2D.OBJECT && data instanceof ResourceRequest) {
                            // ... a 'LoadRequest' was returned (see end of post http://goo.gl/9HeBrN#20715224, and also http://goo.gl/qKpcR3), so check it's status ...
                            if (data.status == RequestStatuses.Error) {
                                this.setError("Rejected request returned.");
                                ++this._promiseChainIndex;
                                this._doError();
                                return;
                            }
                            else {
                                // ... get the data from the request object ...
                                var newResReq = data;
                                if (newResReq.status >= RequestStatuses.Ready) {
                                    if (newResReq === this)
                                        continue; // ('self' [this] was returned, so go directly to the next item)
                                    data = newResReq.transformedData; // (the data is ready, so read now)
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
                            ++this._promiseChainIndex; // (the finally callback failed, so trigger the error chain starting at next index)
                            this._doError();
                        }
                    }
                }
                this._promiseChain.length = 0;
                this._promiseChainIndex = 0;
                // ... finished: now trigger any "ready" handlers ...
                if (this.status < RequestStatuses.Waiting)
                    this.status = RequestStatuses.Waiting; // (default to this next before being 'ready')
                this._doReady(); // (this triggers in dependency order)
            };
            ResourceRequest.prototype._doReady = function () {
                if (this._paused)
                    return;
                if (this.status < RequestStatuses.Waiting)
                    return; // (the 'ready' event must only trigger after the resource loads, AND all handlers have been called)
                // ... check parent dependencies first ...
                if (this.status == RequestStatuses.Waiting)
                    if (!this._dependents || !this._dependents.length) {
                        this.status = RequestStatuses.Ready; // (no parent resource dependencies, so this resource is 'ready' by default)
                        this.message = "Resource '" + this.url + "' has no dependencies, and is now ready.";
                    }
                    else if (this._dependentCompletedCount == this._dependents.length) {
                        this.status = RequestStatuses.Ready; // (all parent resource dependencies are now 'ready')
                        this.message = "All dependencies for resource '" + this.url + "' have loaded, and are now ready.";
                    }
                    else {
                        this.message = "Resource '" + this.url + "' is waiting on dependencies (" + this._dependentCompletedCount + "/" + this._dependents.length + " ready so far)...";
                        return; // (nothing more to do yet)
                    }
                // ... call the local 'onReady' event, and then trigger the call on the children as required.
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
                        this._dependants[i]._doReady(); // (notify all children that this resource is now 'ready' for use [all events have been run, as opposed to just being loaded])
                    }
                }
            };
            ResourceRequest.prototype._doError = function () {
                var _this = this;
                if (this._paused)
                    return;
                if (this.status != RequestStatuses.Error) {
                    this._doNext(); // (still in an error state, so pass on to trigger error handlers in case new ones were added)
                    return;
                }
                for (var n = this._promiseChain.length; this._promiseChainIndex < n; ++this._promiseChainIndex) {
                    if (this._paused)
                        return;
                    var handlers = this._promiseChain[this._promiseChainIndex];
                    if (handlers.onError) {
                        try {
                            var newData = handlers.onError.call(this, this, this.message); // (this handler should "fix" the situation and return valid data)
                        }
                        catch (e) {
                            this.setError("Error handler failed:", e);
                        }
                        if (typeof newData === WorldSimulator2D.OBJECT && newData instanceof ResourceRequest) {
                            // ... a 'LoadRequest' was returned (see end of post http://goo.gl/9HeBrN#20715224, and also http://goo.gl/qKpcR3), so check it's status ...
                            if (newData.status == RequestStatuses.Error)
                                return; // (no correction made, still in error; terminate the event chain here)
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
                        // ... continue with the value from the error handler (even if none) ...
                        this.status = RequestStatuses.Loaded;
                        this.$__message = void 0; // (clear the current message [but keep history])
                        ++this._promiseChainIndex; // (pass on to next handler in the chain)
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
                // ... if this is reached, then there are no following error handlers, so throw the existing message ...
                if (this.status == RequestStatuses.Error) {
                    var msgs = this.messages.join("\r\n· ");
                    if (msgs)
                        msgs = ":\r\n· " + msgs;
                    else
                        msgs = ".";
                    throw new Error("Unhandled error loading resource " + ResourceTypes[this.type] + " from '" + this.url + "'" + msgs + "\r\n");
                }
            };
            /** Resets the current resource data, and optionally all dependencies, and restarts the whole loading process.
              * Note: All handlers (including the 'progress' and 'ready' handlers) are cleared and will have to be reapplied (clean slate).
              * @param {boolean} includeDependentResources Reload all resource dependencies as well.
              */
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
        // ====================================================================================================================
        var _resourceRequests = []; // (requests are loaded in parallel, but executed in order of request)
        var _resourceRequestByURL = {}; // (a quick named index lookup into '__loadRequests')
        /** Returns a load request promise-type object for a resource loading operation.
        * @param url The resource URL relative to the current browser page location.
        * @param type The resource type expected. If not specified, the type will be detected from the URL if possible (this assumes the filename extension is part of the end of the URL).
        */
        function get(url, type) {
            if (url === void 0 || url === null)
                throw "A resource URL is required.";
            url = "" + url;
            if (type === void 0 || type === null) {
                // (make sure it's a string)
                // ... a valid type is required, but try to detect first ...
                var ext = getFileExtensionFromURL(url);
                type = getResourceTypeFromExtension(ext);
                if (!type)
                    type = ResourceTypes.Unknown;
            }
            var request = _resourceRequestByURL[url]; // (try to load any already existing requests)
            if (!request)
                request = new ResourceRequest(url, type);
            return request;
        }
        Loader.get = get;
    })(Loader = WorldSimulator2D.Loader || (WorldSimulator2D.Loader = {}));
    // =======================================================================================================================
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=loader.js.map