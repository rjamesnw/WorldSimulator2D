declare namespace WorldSimulator2D {
    interface ICallback<TSender> {
        (sender?: TSender): void;
    }
    interface IResultCallback<TSender, TResult> {
        (sender?: TSender, result?: TResult): void;
    }
    interface IErrorCallback<TSender> {
        (sender?: TSender, error?: any): void;
    }
    /** The loader namespace contains low level functions for loading resources.
    * In most cases you can simply just call 'WorldSimulator2D.Loader.get()', or use an instance of the 'ResourceManager' class.
    */
    namespace Loader {
        /** The most common mime types.  You can easily extend this enum with custom types, or force-cast strings to this type also. */
        enum ResourceTypes {
            /** The resource type is not known. */
            Unknown = "",
            Application_Script = "application/javascript",
            Application_ECMAScript = "application/ecmascript",
            Application_JSON = "application/json",
            Application_ZIP = "application/zip",
            Application_GZIP = "application/gzip",
            Application_PDF = "application/pdf",
            Application_DefaultFormPost = "application/x-www-form-urlencoded",
            Application_TTF = "application/x-font-ttf",
            Multipart_BinaryFormPost = "multipart/form-data",
            Audio_MP4 = "audio/mp4",
            Audio_MPEG = "audio/mpeg",
            Audio_OGG = "audio/ogg",
            Audio_MIDI = "audio/midi",
            Audio_WEBM = "audio/webm",
            Audio_WAV = "audio/wav",
            Audio_AAC = "audio/x-aac",
            Audio_CAF = "audio/x-caf",
            Image_GIF = "image/gif",
            Image_JPEG = "image/jpeg",
            Image_PNG = "image/png",
            Image_BMP = "image/bmp",
            Image_WEBP = "image/webp",
            Image_SVG = "image/svg+xml",
            Image_GIMP = "image/x-xcf",
            Text_CSS = "text/css",
            Text_CSV = "text/csv",
            Text_HTML = "text/html",
            Text_JavaScript = "text/javascript",
            Text_Plain = "text/plain",
            Text_RTF = "text/rtf",
            Text_XML = "text/xml",
            Text_JQueryTemplate = "text/x-jquery-tmpl",
            Text_MarkDown = "text/x-markdown",
            Video_AVI = "video/avi",
            Video_MPEG = "video/mpeg",
            Video_MP4 = "video/mp4",
            Video_OGG = "video/ogg",
            Video_MOV = "video/quicktime",
            Video_WMV = "video/x-ms-wmv",
            Video_FLV = "video/x-flv",
            Video_WEBM = "video/webm",
        }
        /** A map of popular resource extensions to resource enum type names.
          * Example 1: ResourceTypes[ResourceExtensions[ResourceExtensions.Application_Script]] === "application/javascript"
          * Example 2: ResourceTypes[ResourceExtensions[<ResourceExtensions><any>'.JS']] === "application/javascript"
          * Example 3: CoreXT.Loader.getResourceTypeFromExtension(ResourceExtensions.Application_Script);
          * Example 4: CoreXT.Loader.getResourceTypeFromExtension(".js");
          */
        enum ResourceExtensions {
            Application_Script = ".js",
            Application_ECMAScript = ".es",
            Application_JSON = ".json",
            Application_ZIP = ".zip",
            Application_GZIP = ".gz",
            Application_PDF = ".pdf",
            Application_TTF = ".ttf",
            Audio_MP4 = ".mp4",
            Audio_MPEG = ".mpeg",
            Audio_OGG = ".ogg",
            Audio_MIDI = ".midi",
            Audio_WEBM = ".webm",
            Audio_WAV = ".wav",
            Audio_AAC = ".aac",
            Audio_CAF = ".caf",
            Image_GIF = ".gif",
            Image_JPEG = ".jpeg",
            Image_PNG = ".png",
            Image_BMP = ".bmp",
            Image_WEBP = ".webp",
            Image_SVG = ".svg",
            Image_GIMP = ".xcf",
            Text_CSS = ".css",
            Text_CSV = ".csv",
            Text_HTML = ".html",
            Text_Plain = ".txt",
            Text_RTF = ".rtf",
            Text_XML = ".xml",
            Text_JQueryTemplate = ".tpl.htm",
            Text_MarkDown = ".markdown",
            Video_AVI = ".avi",
            Video_MPEG = ".mpeg",
            Video_MP4 = ".mp4",
            Video_MOV = ".qt",
            Video_WMV = ".wmv",
            Video_FLV = ".flv",
            Video_WEBM = ".webm",
            Video_OGG = ".ogv",
        }
        /** Return the resource (MIME) type of a given extension (with or without the period). */
        function getResourceTypeFromExtension(ext: string): ResourceTypes;
        /** Return the resource (MIME) type of a given extension type. */
        function getResourceTypeFromExtension(ext: ResourceExtensions): ResourceTypes;
        function getFileExtensionFromURL(url: string): string;
        enum RequestStatuses {
            /** The request has not been executed yet. */
            Pending = 0,
            /** The resource failed to load.  Check the request object for the error details. */
            Error = 1,
            /** The requested resource is loading. */
            Loading = 2,
            /** The requested resource has loaded (nothing more). */
            Loaded = 3,
            /** The requested resource is waiting on parent resources to complete. */
            Waiting = 4,
            /** The requested resource is ready to be used. */
            Ready = 5,
            /** The source is a script, and was executed (this only occurs on demand [not automatic]). */
            Executed = 6,
        }
        /** Creates a new resource request object, which allows loading resources using a "promise" style pattern (this is a custom
          * implementation designed to work better with the CoreXT system specifically, and to support parallel loading).
          * Note: It is advised to use 'CoreXT.Loader.loadResource()' to load resources instead of directly creating resource request objects.
          * Inheritance note: When creating via the 'new' operator, any already existing instance with the same URL will be returned,
          * and NOT the new object instance.  For this reason, you should call 'loadResource()' instead.
          */
        class ResourceRequest {
            private $__index;
            /** The requested resource URL. */
            url: string;
            /** The requested resource type (to match against the server returned MIME type for data type verification). */
            type: ResourceTypes;
            /** The XMLHttpRequest object used for this request.  It's marked private to discourage access, but experienced
              * developers should be able to use it if necessary to further configure the request for advanced reasons.
              */
            _xhr: XMLHttpRequest;
            /** The raw data returned from the HTTP request.
              * Note: This does not change with new data returned from callback handlers (new data is passed on as the first argument to
              * the next call [see 'transformedData']).
              */
            data: any;
            /** Set to data returned from callback handlers as the 'data' property value gets transformed.
              * If no transformations were made, then the value in 'data' is returned.
              */
            readonly transformedData: any;
            private $__transformedData;
            /** The response code from the XHR response. */
            responseCode: number;
            /** The response code message from the XHR response. */
            responseMessage: string;
            /** The current request status. */
            status: RequestStatuses;
            /** A progress/error message related to the status (may not be the same as the response message). */
            message: string;
            private $__message;
            /** Includes the current message and all previous messages. Use this to trace any silenced errors in the request process. */
            messages: string[];
            /** If true (default), them this request is non-blocking, otherwise the calling script will be blocked until the request
              * completes loading.  Please note that no progress callbacks can occur during blocked operations (since the thread is
              * effectively 'paused' in this scenario).
              */
            async: boolean;
            private _onProgress;
            private _onReady;
            /** This is a list of all the callbacks waiting on the status of this request (such as on loaded or error).
            * There's also an 'on finally' which should execute on success OR failure, regardless.
            * For each entry, only ONE of any callback type will be set.
            */
            private _promiseChain;
            private _promiseChainIndex;
            _dependents: ResourceRequest[];
            private _dependentCompletedCount;
            _dependants: ResourceRequest[];
            private _paused;
            private _queueDoNext(data);
            private _queueDoError();
            private _requeueHandlersIfNeeded();
            then(success: ICallback<IResourceRequest>, error?: IErrorCallback<IResourceRequest>): this;
            /** Adds another request and makes it dependent on the current 'parent' request.  When all parent requests have completed,
              * the dependant request fires its 'onReady' event.
              * Note: The given request is returned, and not the current context, so be sure to complete configurations before hand.
              */
            include(request: IResourceRequest): IResourceRequest;
            /**
             * Add a call-back handler for when the request completes successfully.
             * @param handler
             */
            ready(handler: ICallback<IResourceRequest>): this;
            /** Adds a hook into the resource load progress event. */
            while(progressHandler: ICallback<IResourceRequest>): this;
            /** Call this anytime while loading is in progress to terminate the request early. An error event will be triggered as well. */
            abort(): void;
            /**
             * Provide a handler to catch any errors from this request.
             */
            catch(errorHandler: IErrorCallback<IResourceRequest>): this;
            /**
             * Provide a handler which should execute on success OR failure, regardless.
             */
            finally(cleanupHandler: ICallback<IResourceRequest>): this;
            /** Starts loading the current resource.  If the current resource has dependencies, they are triggered to load first (in proper
              * order).  Regardless of the start order, all scripts are loaded in parallel.
              * Note: This call queues the start request in 'async' mode, which begins only after the current script execution is completed.
              */
            start(): this;
            private _Start();
            /** Upon return, the 'then' or 'ready' event chain will pause until 'continue()' is called. */
            pause(): this;
            /** After calling 'pause()', use this function to re-queue the 'then' or 'ready' even chain for continuation.
              * Note: This queues on a timer with a 0 ms delay, and does not call any events before returning to the caller.
              */
            continue(): this;
            private _doOnProgress(percent);
            setError(message: string, error?: {
                name?: string;
                message: string;
                stack?: string;
            }): void;
            private _doNext();
            private _doReady();
            private _doError();
            /** Resets the current resource data, and optionally all dependencies, and restarts the whole loading process.
              * Note: All handlers (including the 'progress' and 'ready' handlers) are cleared and will have to be reapplied (clean slate).
              * @param {boolean} includeDependentResources Reload all resource dependencies as well.
              */
            reload(includeDependentResources?: boolean): this;
            /** Constructs a load request promise-type object for a resource loading operation.
            * @param url The resource URL relative to the current browser page location.
            * @param type The resource type expected.
            * @param asyc If the main thread should be blocked while loading the resource. This is depreciated in some/most browsers and should normally not be used.
            */
            constructor(url: string, type: ResourceTypes, async?: boolean);
        }
        interface IResourceRequest extends ResourceRequest {
        }
        /** Returns a load request promise-type object for a resource loading operation.
        * @param url The resource URL relative to the current browser page location.
        * @param type The resource type expected. If not specified, the type will be detected from the URL if possible (this assumes the filename extension is part of the end of the URL).
        */
        function get(url: string, type?: ResourceTypes): IResourceRequest;
    }
}
