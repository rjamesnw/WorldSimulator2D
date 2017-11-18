namespace WorldSimulator2D {
    // =======================================================================================================================

    export interface ICallback<TSender> { (sender?: TSender): void }
    export interface IResultCallback<TSender, TResult> { (sender?: TSender, result?: TResult): void }
    export interface IErrorCallback<TSender> { (sender?: TSender, error?: any): void }

    /** The loader namespace contains low level functions for loading resources.
    * In most cases you can simply just call 'WorldSimulator2D.Loader.get()', or use an instance of the 'ResourceManager' class.
    */
    export namespace Loader {

        // ... polyfill some XHR 'readyState' constants ...

        if (!XMLHttpRequest.DONE) {
            (<any>XMLHttpRequest).UNSENT = 0;
            (<any>XMLHttpRequest).OPENED = 1;
            (<any>XMLHttpRequest).HEADERS_RECEIVED = 2;
            (<any>XMLHttpRequest).LOADING = 3;
            (<any>XMLHttpRequest).DONE = 4;
        }

        /** The most common mime types.  You can easily extend this enum with custom types, or force-cast strings to this type also. */
        /* NOTE: The enums entries MUST be prefixed with '<any>' in order for this mapping to work with 'ResourceExtensions' as well implicitly. */
        export enum ResourceTypes { // (http://en.wikipedia.org/wiki/Internet_media_type)
            /** The resource type is not known. */
            Unknown = "", // (maps to the empty string return type returned from 'getFileExtensionFromURL()' when used with 'getResourceTypeFromExtension()')
            // Application
            Application_Script = "application/javascript", // (note: 'text/javascript' is most common, but is obsolete)
            Application_ECMAScript = "application/ecmascript",
            Application_JSON = "application/json",
            Application_ZIP = "application/zip",
            Application_GZIP = "application/gzip",
            Application_PDF = "application/pdf",
            Application_DefaultFormPost = "application/x-www-form-urlencoded",
            Application_TTF = "application/x-font-ttf",
            // Multipart
            Multipart_BinaryFormPost = "multipart/form-data",
            // Audio
            Audio_MP4 = "audio/mp4",
            Audio_MPEG = "audio/mpeg",
            Audio_OGG = "audio/ogg",
            Audio_MIDI = "audio/midi",
            Audio_WEBM = "audio/webm",
            Audio_WAV = "audio/wav",
            Audio_AAC = "audio/x-aac",
            Audio_CAF = "audio/x-caf",
            // Image
            Image_GIF = "image/gif",
            Image_JPEG = "image/jpeg",
            Image_PNG = "image/png",
            Image_BMP = "image/bmp",
            Image_WEBP = "image/webp",
            Image_SVG = "image/svg+xml",
            Image_GIMP = "image/x-xcf",
            // Text
            Text_CSS = "text/css",
            Text_CSV = "text/csv",
            Text_HTML = "text/html",
            Text_JavaScript = "text/javascript",
            Text_Plain = "text/plain",
            Text_RTF = "text/rtf",
            Text_XML = "text/xml",
            Text_JQueryTemplate = "text/x-jquery-tmpl",
            Text_MarkDown = "text/x-markdown",
            // Video
            Video_AVI = "video/avi",
            Video_MPEG = "video/mpeg",
            Video_MP4 = "video/mp4",
            Video_OGG = "video/ogg",
            Video_MOV = "video/quicktime",
            Video_WMV = "video/x-ms-wmv",
            Video_FLV = "video/x-flv",
            Video_WEBM = "video/webm",
        }

        InternalUtilities.doEnumReverseMapping(ResourceTypes);

        /** A map of popular resource extensions to resource enum type names.
          * Example 1: ResourceTypes[ResourceExtensions[ResourceExtensions.Application_Script]] === "application/javascript"
          * Example 2: ResourceTypes[ResourceExtensions[<ResourceExtensions><any>'.JS']] === "application/javascript"
          * Example 3: CoreXT.Loader.getResourceTypeFromExtension(ResourceExtensions.Application_Script);
          * Example 4: CoreXT.Loader.getResourceTypeFromExtension(".js");
          */
        /* NOTE: The enums entries MUST be prefixed with '<any>' in order for this mapping to work with 'ResourceTypes' as well implicitly. */
        export enum ResourceExtensions { // (http://tools.ietf.org/html/rfc4329#page-12)
            Application_Script = ".js", // (note: 'text/javascript' is most common, but is obsolete)
            Application_ECMAScript = ".es",
            Application_JSON = ".json",
            Application_ZIP = ".zip",
            Application_GZIP = ".gz",
            Application_PDF = ".pdf",
            Application_TTF = ".ttf",
            // Audio
            Audio_MP4 = ".mp4",
            Audio_MPEG = ".mpeg",
            Audio_OGG = ".ogg",
            Audio_MIDI = ".midi",
            Audio_WEBM = ".webm",
            Audio_WAV = ".wav",
            Audio_AAC = ".aac",
            Audio_CAF = ".caf",
            // Image
            Image_GIF = ".gif",
            Image_JPEG = ".jpeg",
            Image_PNG = ".png",
            Image_BMP = ".bmp",
            Image_WEBP = ".webp",
            Image_SVG = ".svg",
            Image_GIMP = ".xcf",
            // Text
            Text_CSS = ".css",
            Text_CSV = ".csv",
            Text_HTML = ".html",
            Text_Plain = ".txt",
            Text_RTF = ".rtf",
            Text_XML = ".xml",
            Text_JQueryTemplate = ".tpl.htm", // (http://encosia.com/using-external-templates-with-jquery-templates/) Note: Not standard!
            Text_MarkDown = ".markdown", // (http://daringfireball.net/linked/2014/01/08/markdown-extension)
            // Video
            Video_AVI = ".avi",
            Video_MPEG = ".mpeg",
            Video_MP4 = ".mp4",
            Video_MOV = ".qt",
            Video_WMV = ".wmv",
            Video_FLV = ".flv",
            Video_WEBM = ".webm",
            Video_OGG = ".ogv",
        }

        InternalUtilities.doEnumReverseMapping(ResourceExtensions);

        (<any>ResourceExtensions)[<any>'.tpl'] = ResourceExtensions[ResourceExtensions.Text_JQueryTemplate]; // (map to the same 'Text_JQueryTemplate' target)

        /** Return the resource (MIME) type of a given extension (with or without the period). */
        export function getResourceTypeFromExtension(ext: string): ResourceTypes;
        /** Return the resource (MIME) type of a given extension type. */
        export function getResourceTypeFromExtension(ext: ResourceExtensions): ResourceTypes;
        export function getResourceTypeFromExtension(ext: any): ResourceTypes {
            if (ext === void 0 || ext === null) return void 0;
            var _ext = "" + ext; // (make sure it's a string)
            if (_ext.charAt(0) != '.') _ext = '.' + _ext; // (a period is required)
            return ResourceTypes[ResourceExtensions[ext]];
        }
        export function getFileExtensionFromURL(url: string): string {
            if (!url) return "";
            return (url.match(/(\.[A-Za-z0-9]+)(?:[\?\#]|$)/i) || []).pop() || "";
        }

        export enum RequestStatuses {
            /** The request has not been executed yet. */
            Pending,
            /** The resource failed to load.  Check the request object for the error details. */
            Error,
            /** The requested resource is loading. */
            Loading,
            /** The requested resource has loaded (nothing more). */
            Loaded,
            /** The requested resource is waiting on parent resources to complete. */
            Waiting,
            /** The requested resource is ready to be used. */
            Ready,
            /** The source is a script, and was executed (this only occurs on demand [not automatic]). */
            Executed,
        }

        // ====================================================================================================================

        /** Creates a new resource request object, which allows loading resources using a "promise" style pattern (this is a custom
          * implementation designed to work better with the CoreXT system specifically, and to support parallel loading).
          * Note: It is advised to use 'CoreXT.Loader.loadResource()' to load resources instead of directly creating resource request objects.
          * Inheritance note: When creating via the 'new' operator, any already existing instance with the same URL will be returned,
          * and NOT the new object instance.  For this reason, you should call 'loadResource()' instead.
          */
        export class ResourceRequest { // (inspired by the "promises" methodology: http://www.html5rocks.com/en/tutorials/es6/promises/, http://making.change.org/post/69613524472/promises-and-error-handling, http://goo.gl/9HeBrN)
            private $__index: number;

            /** The requested resource URL. */
            url: string;
            /** The requested resource type (to match against the server returned MIME type for data type verification). */
            type: ResourceTypes;

            /** The XMLHttpRequest object used for this request.  It's marked private to discourage access, but experienced
              * developers should be able to use it if necessary to further configure the request for advanced reasons.
              */
            _xhr: XMLHttpRequest; // (for parallel loading, each request has its own connection)

            /** The raw data returned from the HTTP request.
              * Note: This does not change with new data returned from callback handlers (new data is passed on as the first argument to
              * the next call [see 'transformedData']).
              */
            data: any; // (The response entity body according to responseType, as an ArrayBuffer, Blob, Document, JavaScript object (from JSON), or string. This is null if the request is not complete or was not successful.)

            /** Set to data returned from callback handlers as the 'data' property value gets transformed.
              * If no transformations were made, then the value in 'data' is returned.
              */
            get transformedData(): any {
                return this.$__transformedData === noop ? this.data : this.$__transformedData;
            }
            private $__transformedData: any = noop;

            /** The response code from the XHR response. */
            responseCode: number = 0; // (the response code returned)
            /** The response code message from the XHR response. */
            responseMessage: string = ""; // (the response code message)

            /** The current request status. */
            status: RequestStatuses = RequestStatuses.Pending;

            /** A progress/error message related to the status (may not be the same as the response message). */
            get message(): string { // (for errors, aborts, timeouts, etc.)
                return this.$__message;
            }
            set message(value: string) {
                this.$__message = value;
                this.messages.push(this.$__message);
                if (console && console.log)
                    console.log(this.$__message);
            }
            private $__message: string;

            /** Includes the current message and all previous messages. Use this to trace any silenced errors in the request process. */
            messages: string[] = [];

            /** If true (default), them this request is non-blocking, otherwise the calling script will be blocked until the request
              * completes loading.  Please note that no progress callbacks can occur during blocked operations (since the thread is
              * effectively 'paused' in this scenario).
              */
            async: boolean;

            private _onProgress: ICallback<ResourceRequest>[];
            private _onReady: ICallback<ResourceRequest>[]; // ('onReady' is triggered in order of request made, and only when all included dependencies have completed successfully)

            /** This is a list of all the callbacks waiting on the status of this request (such as on loaded or error).
            * There's also an 'on finally' which should execute on success OR failure, regardless.
            * For each entry, only ONE of any callback type will be set.
            */
            private _promiseChain: {
                onLoaded?: ICallback<ResourceRequest>; // (resource is loaded, but may not be ready [i.e. previous scripts may not have executed yet])
                onError?: ICallback<ResourceRequest>; // (there is one error entry [defined or not] for every 'onLoaded' event entry, and vice versa)
                onFinally?: ICallback<ResourceRequest>;
            }[] = [];
            private _promiseChainIndex: number = 0; // (the current position in the event chain)

            _dependents: ResourceRequest[]; // (parent resources dependant upon)
            private _dependentCompletedCount = 0; // (when this equals the # of 'dependents', the all parent resources have loaded [just faster than iterating over them])
            _dependants: ResourceRequest[]; // (dependant child resources)

            private _paused = false;

            private _queueDoNext(data: any) {
                setTimeout(() => {
                    // ... before this, fire any handlers that would execute before this ...
                    this._doNext();
                }, 0);
            } // (simulate an async response, in case more handlers need to be added next)
            private _queueDoError() { setTimeout(() => { this._doError(); }, 0); } // (simulate an async response, in case more handlers need to be added next)
            private _requeueHandlersIfNeeded() {
                if (this.status == RequestStatuses.Error)
                    this._queueDoError();
                else if (this.status >= RequestStatuses.Waiting) {
                    this._queueDoNext(this.data);
                }
                // ... else, not needed, as the chain is still being traversed, so anything added will get run as expected ...
            }

            then(success: ICallback<IResourceRequest>, error?: IErrorCallback<IResourceRequest>) {
                if (success !== void 0 && success !== null && typeof success != FUNCTION || error !== void 0 && error !== null && typeof error !== FUNCTION)
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
            }

            /** Adds another request and makes it dependent on the current 'parent' request.  When all parent requests have completed,
              * the dependant request fires its 'onReady' event.
              * Note: The given request is returned, and not the current context, so be sure to complete configurations before hand.
              */
            include(request: IResourceRequest) {
                if (!request._dependents)
                    request._dependents = [];
                if (!this._dependants)
                    this._dependants = [];
                request._dependents.push(this);
                this._dependants.push(request);
                return request;
            }

            /**
             * Add a call-back handler for when the request completes successfully.
             * @param handler
             */
            ready(handler: ICallback<IResourceRequest>) {
                if (typeof handler == FUNCTION) {
                    if (!this._onReady)
                        this._onReady = [];
                    this._onReady.push(handler);
                    this._requeueHandlersIfNeeded();
                } else throw "Handler is not a function.";
                return this;
            }

            /** Adds a hook into the resource load progress event. */
            while(progressHandler: ICallback<IResourceRequest>) {
                if (typeof progressHandler == FUNCTION) {
                    if (!this._onProgress)
                        this._onProgress = [];
                    this._onProgress.push(progressHandler);
                    this._requeueHandlersIfNeeded();
                } else throw "Handler is not a function.";
                return this;
            }

            /** Call this anytime while loading is in progress to terminate the request early. An error event will be triggered as well. */
            abort(): void {
                if (this._xhr.readyState > XMLHttpRequest.UNSENT && this._xhr.readyState < XMLHttpRequest.DONE) {
                    this._xhr.abort();
                }
            }

            /**
             * Provide a handler to catch any errors from this request.
             */
            catch(errorHandler: IErrorCallback<IResourceRequest>) {
                if (typeof errorHandler == FUNCTION) {
                    this._promiseChain.push({ onError: errorHandler });
                    this._requeueHandlersIfNeeded();
                } else
                    throw "Handler is not a function.";
                return this;
            }

            /**
             * Provide a handler which should execute on success OR failure, regardless.
             */
            finally(cleanupHandler: ICallback<IResourceRequest>) {
                if (typeof cleanupHandler == FUNCTION) {
                    this._promiseChain.push({ onFinally: cleanupHandler });
                    this._requeueHandlersIfNeeded();
                } else
                    throw "Handler is not a function.";
                return this;
            }

            /** Starts loading the current resource.  If the current resource has dependencies, they are triggered to load first (in proper
              * order).  Regardless of the start order, all scripts are loaded in parallel.
              * Note: This call queues the start request in 'async' mode, which begins only after the current script execution is completed.
              */
            start(): this { if (this.async) setTimeout(() => { this._Start(); }, 0); else this._Start(); return this; }

            private _Start() {
                // ... start at the top most parent first, and work down ...
                if (this._dependents)
                    for (var i = 0, n = this._dependents.length; i < n; ++i)
                        this._dependents[i].start();

                if (this.status == RequestStatuses.Pending) {
                    this.status = RequestStatuses.Loading; // (do this first to protect against any possible cyclical calls)

                    this.message = "Loading resource '" + this.url + "' ...";

                    // ... this request has not been started yet; attempt to load the resource ...
                    // ... 1. see first if this file is cached in the web storage, then load it from there instead ...

                    if (typeof Storage !== UNDEFINED)
                        try {
                            this.data = localStorage.getItem("resource:" + this.url); // (should return 'null' if not found)
                            if (this.data !== null && this.data !== void 0) {
                                this.status = RequestStatuses.Loaded;
                                this._doNext();
                                return;
                            }
                        } catch (e) {
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

                        var loaded = () => {
                            if (xhr.status == 200 || xhr.status == 304) {
                                this.data = xhr.response;
                                this.status == RequestStatuses.Loaded;
                                this.message = "Loading completed.";

                                // ... check if the expected mime type matches, otherwise throw an error to be safe ...

                                if (<string><any>this.type != xhr.responseType) {
                                    this.setError("Resource type mismatch: expected type was '" + this.type + "', but received '" + xhr.responseType + "'.\r\n");
                                }
                                else {
                                    if (typeof Storage !== UNDEFINED)
                                        try {
                                            localStorage.setItem("resource:" + this.url, this.data);
                                            this.message = "Resource '" + this.url + "' loaded from local storage.";
                                        } catch (e) {
                                            // .. failed: out of space? ...
                                            // TODO: consider saving to web SQL as well, or on failure (as a backup; perhaps create a storage class with this support). //?
                                        }

                                    this._doNext();
                                }
                            }
                            else {
                                this.setError("There was a problem loading the resource '" + this.url + "' (status code " + xhr.status + ": " + xhr.statusText + ").\r\n");
                            }
                        };

                        // ... this script is not cached, so load it ...

                        xhr.onreadystatechange = () => { // (onreadystatechange is supported by all browsers)
                            switch (xhr.readyState) {
                                case XMLHttpRequest.UNSENT: break;
                                case XMLHttpRequest.OPENED: this.message = "Opened connection to '" + this.url + "'."; break;
                                case XMLHttpRequest.HEADERS_RECEIVED: this.message = "Headers received for '" + this.url + "'."; break;
                                case XMLHttpRequest.LOADING: break; // (this will be handled by the progress event)
                                case XMLHttpRequest.DONE: loaded(); break;
                            }
                        };

                        xhr.onerror = (ev: ErrorEvent) => { this.setError(void 0, ev); this._doError(); };
                        xhr.onabort = () => { this.setError("Request aborted"); };
                        xhr.ontimeout = () => { this.setError("Request timed out."); };
                        xhr.onprogress = (evt: ProgressEvent) => {
                            this.message = "Loaded " + Math.round(evt.loaded / evt.total * 100) + "%.";
                            if (this._onProgress && this._onProgress.length)
                                this._doOnProgress(evt.loaded / evt.total * 100);
                        };

                        // (note: all event 'on...' properties only available in IE10+)
                    }

                }
                else { // (this request was already started)
                    return;
                }

                if (xhr.readyState != 0)
                    xhr.abort(); // (just in case)

                xhr.open("get", this.url, this.async);

                //?if (!this.async && (xhr.status)) doSuccess();
            }

            /** Upon return, the 'then' or 'ready' event chain will pause until 'continue()' is called. */
            pause() {
                if (this.status >= RequestStatuses.Pending && this.status < RequestStatuses.Ready
                    || this.status == RequestStatuses.Ready && this._onReady.length)
                    this._paused = true;
                return this;
            }

            /** After calling 'pause()', use this function to re-queue the 'then' or 'ready' even chain for continuation.
              * Note: This queues on a timer with a 0 ms delay, and does not call any events before returning to the caller.
              */
            continue() {
                if (this._paused) {
                    this._paused = false;
                    this._requeueHandlersIfNeeded();
                }
                return this;
            }

            private _doOnProgress(percent: number) {
                // ... notify any handlers as well ...
                if (this._onProgress) {
                    for (var i = 0, n = this._onProgress.length; i < n; ++i)
                        try {
                            var cb = this._onProgress[i];
                            if (cb)
                                cb.call(this, this);
                        } catch (e) {
                            this._onProgress[i] = null; // (won't be called again)
                            this.setError("'on progress' callback #" + i + " has thrown an error:", e);
                            // ... do nothing, not important ...
                        }
                }
            }

            setError(message: string, error?: { name?: string; message: string; stack?: string }): void { // TODO: Make this better, perhaps with a class to handle error objects (see 'Error' AND 'ErrorEvent'). //?
                var msg = message;

                if (error) {
                    if (msg) msg += " ";
                    if (error.name)
                        msg = "(" + error.name + ") " + msg;
                    message += error.message || "";
                    if (error.stack) msg += "\r\nStack: \r\n" + error.stack + "\r\n";
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
            }

            private _doNext(): void { // (note: because this is a pseudo promise-like implementation on a single object instance, return values from handlers are not wrapped in new request instances [partially against specifications: http://goo.gl/igCsnS])
                if (this.status == RequestStatuses.Error) {
                    this._doError(); // (still in an error state, so pass on to trigger error handlers in case new ones were added)
                    return;
                }

                if (this._onProgress && this._onProgress.length) {
                    this._doOnProgress(100);
                    this._onProgress.length = 0;
                }

                for (var n = this._promiseChain.length; this._promiseChainIndex < n; ++this._promiseChainIndex) {
                    if (this._paused) return;

                    var handlers = this._promiseChain[this._promiseChainIndex]; // (get all the handlers waiting for the result of this request)

                    if (handlers.onLoaded) {
                        try {
                            var data = handlers.onLoaded.call(this, this.transformedData); // (call the handler with the current data and get the resulting data, if any)
                        } catch (e) {
                            this.setError("Success handler failed:", e);
                            ++this._promiseChainIndex; // (the success callback failed, so trigger the error chain starting at next index)
                            this._doError();
                            return;
                        }
                        if (typeof data === OBJECT && data instanceof ResourceRequest) {
                            // ... a 'LoadRequest' was returned (see end of post http://goo.gl/9HeBrN#20715224, and also http://goo.gl/qKpcR3), so check it's status ...
                            if ((<ResourceRequest>data).status == RequestStatuses.Error) {
                                this.setError("Rejected request returned.");
                                ++this._promiseChainIndex;
                                this._doError();
                                return;
                            } else {
                                // ... get the data from the request object ...
                                var newResReq = <ResourceRequest>data;
                                if (newResReq.status >= RequestStatuses.Ready) {
                                    if (newResReq === this) continue; // ('self' [this] was returned, so go directly to the next item)
                                    data = newResReq.transformedData; // (the data is ready, so read now)
                                } else { // (loading is started, or still in progress, so wait; we simply hook into the request object to get notified when the data is ready)
                                    newResReq.ready((sender) => { this.$__transformedData = sender.transformedData; this._doNext(); })
                                        .catch((sender) => { this.setError("Resource returned from next handler has failed to load:", sender); this._doError(); });
                                    return;
                                }
                            }
                        }
                        this.$__transformedData = data;
                    } else if (handlers.onFinally) {
                        try {
                            handlers.onFinally.call(this);
                        } catch (e) {
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
            }

            private _doReady(): void {
                if (this._paused) return;

                if (this.status < RequestStatuses.Waiting) return; // (the 'ready' event must only trigger after the resource loads, AND all handlers have been called)

                // ... check parent dependencies first ...

                if (this.status == RequestStatuses.Waiting)
                    if (!this._dependents || !this._dependents.length) {
                        this.status = RequestStatuses.Ready; // (no parent resource dependencies, so this resource is 'ready' by default)
                        this.message = "Resource '" + this.url + "' has no dependencies, and is now ready.";
                    } else // ...need to determine if all parent (dependent) resources are completed first ...
                        if (this._dependentCompletedCount == this._dependents.length) {
                            this.status = RequestStatuses.Ready; // (all parent resource dependencies are now 'ready')
                            this.message = "All dependencies for resource '" + this.url + "' have loaded, and are now ready.";
                        } else {
                            this.message = "Resource '" + this.url + "' is waiting on dependencies (" + this._dependentCompletedCount + "/" + this._dependents.length + " ready so far)...";
                            return; // (nothing more to do yet)
                        }

                // ... call the local 'onReady' event, and then trigger the call on the children as required.

                if (this.status == RequestStatuses.Ready) {
                    if (this._onReady && this._onReady.length) {
                        try {
                            this._onReady.shift().call(this, this);
                            if (this._paused) return;
                        } catch (e) {
                            this.setError("Error in ready handler:", e);
                        }
                    }

                    for (var i = 0, n = this._dependants.length; i < n; ++i) {
                        ++this._dependants[i]._dependentCompletedCount;
                        this._dependants[i]._doReady(); // (notify all children that this resource is now 'ready' for use [all events have been run, as opposed to just being loaded])
                    }
                }
            }

            private _doError(): void { // (note: the following event link handles the preceding error, skipping first any and all 'finally' handlers)
                if (this._paused) return;

                if (this.status != RequestStatuses.Error) {
                    this._doNext(); // (still in an error state, so pass on to trigger error handlers in case new ones were added)
                    return;
                }

                for (var n = this._promiseChain.length; this._promiseChainIndex < n; ++this._promiseChainIndex) {
                    if (this._paused) return;

                    var handlers = this._promiseChain[this._promiseChainIndex];

                    if (handlers.onError) {
                        try {
                            var newData = handlers.onError.call(this, this, this.message); // (this handler should "fix" the situation and return valid data)
                        } catch (e) {
                            this.setError("Error handler failed:", e);
                        }
                        if (typeof newData === OBJECT && newData instanceof ResourceRequest) {
                            // ... a 'LoadRequest' was returned (see end of post http://goo.gl/9HeBrN#20715224, and also http://goo.gl/qKpcR3), so check it's status ...
                            if ((<ResourceRequest>newData).status == RequestStatuses.Error)
                                return; // (no correction made, still in error; terminate the event chain here)
                            else {
                                var newResReq = <ResourceRequest>newData;
                                if (newResReq.status >= RequestStatuses.Ready)
                                    newData = newResReq.transformedData;
                                else { // (loading is started, or still in progress, so wait)
                                    newResReq.ready((sender) => { this.$__transformedData = sender.transformedData; this._doNext(); })
                                        .catch((sender) => { this.setError("Resource returned from error handler has failed to load:", sender); this._doError(); });
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
                    } else if (handlers.onFinally) {
                        try {
                            handlers.onFinally.call(this);
                        } catch (e) {
                            this.setError("Cleanup handler failed:", e);
                        }
                    }
                }

                // ... if this is reached, then there are no following error handlers, so throw the existing message ...

                if (this.status == RequestStatuses.Error) {
                    var msgs = this.messages.join("\r\n· ");
                    if (msgs) msgs = ":\r\n· " + msgs; else msgs = ".";
                    throw new Error("Unhandled error loading resource " + ResourceTypes[this.type] + " from '" + this.url + "'" + msgs + "\r\n");
                }
            }

            /** Resets the current resource data, and optionally all dependencies, and restarts the whole loading process.
              * Note: All handlers (including the 'progress' and 'ready' handlers) are cleared and will have to be reapplied (clean slate).
              * @param {boolean} includeDependentResources Reload all resource dependencies as well.
              */
            reload(includeDependentResources: boolean = true) {
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
            }

            // ----------------------------------------------------------------------------------------------------------------

            /** Constructs a load request promise-type object for a resource loading operation.
            * @param url The resource URL relative to the current browser page location.
            * @param type The resource type expected.
            * @param asyc If the main thread should be blocked while loading the resource. This is depreciated in some/most browsers and should normally not be used.
            */
            constructor(url: string, type: ResourceTypes, async = true) {
                if (url === void 0 || url === null) throw "A resource URL is required.";
                if (type === void 0) throw "The resource type is required.";

                if (_resourceRequestByURL[url])
                    return _resourceRequestByURL[url]; // (abandon this new object instance in favor of the one already existing and returned it)

                this.url = url;
                this.type = type;
                this.async = async;

                this.$__index = _resourceRequests.length;

                _resourceRequests.push(this);
                _resourceRequestByURL[this.url] = this;
            }

            // ----------------------------------------------------------------------------------------------------------------
        }

        export interface IResourceRequest extends ResourceRequest { }

        // ====================================================================================================================

        var _resourceRequests: IResourceRequest[] = []; // (requests are loaded in parallel, but executed in order of request)
        var _resourceRequestByURL: { [url: string]: IResourceRequest } = {}; // (a quick named index lookup into '__loadRequests')

        /** Returns a load request promise-type object for a resource loading operation.
        * @param url The resource URL relative to the current browser page location.
        * @param type The resource type expected. If not specified, the type will be detected from the URL if possible (this assumes the filename extension is part of the end of the URL).
        */
        export function get(url: string, type?: ResourceTypes): IResourceRequest {
            if (url === void 0 || url === null) throw "A resource URL is required.";
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
    }

    // =======================================================================================================================
}