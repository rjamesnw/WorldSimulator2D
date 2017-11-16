declare namespace WebWorkerScope {

    export interface Algorithm {
        name: string;
    }

    export interface CacheQueryOptions {
        cacheName?: string;
        ignoreMethod?: boolean;
        ignoreSearch?: boolean;
        ignoreVary?: boolean;
    }

    export interface CloseEventInit extends EventInit {
        code?: number;
        reason?: string;
        wasClean?: boolean;
    }

    export interface EventInit {
        scoped?: boolean;
        bubbles?: boolean;
        cancelable?: boolean;
    }

    export interface GetNotificationOptions {
        tag?: string;
    }

    export interface IDBIndexParameters {
        multiEntry?: boolean;
        unique?: boolean;
    }

    export interface IDBObjectStoreParameters {
        autoIncrement?: boolean;
        keyPath?: IDBKeyPath;
    }

    export interface KeyAlgorithm {
        name?: string;
    }

    export interface MessageEventInit extends EventInit {
        lastEventId?: string;
        channel?: string;
        data?: any;
        origin?: string;
        ports?: MessagePort[];
        source?: any;
    }

    export interface NotificationOptions {
        body?: string;
        dir?: NotificationDirection;
        icon?: string;
        lang?: string;
        tag?: string;
    }

    export interface ObjectURLOptions {
        oneTimeOnly?: boolean;
    }

    export interface PushSubscriptionOptionsInit {
        applicationServerKey?: any;
        userVisibleOnly?: boolean;
    }

    export interface RequestInit {
        body?: any;
        cache?: RequestCache;
        credentials?: RequestCredentials;
        headers?: any;
        integrity?: string;
        keepalive?: boolean;
        method?: string;
        mode?: RequestMode;
        redirect?: RequestRedirect;
        referrer?: string;
        referrerPolicy?: ReferrerPolicy;
        window?: any;
    }

    export interface ResponseInit {
        headers?: any;
        status?: number;
        statusText?: string;
    }

    export interface ClientQueryOptions {
        includeUncontrolled?: boolean;
        type?: ClientType;
    }

    export interface ExtendableEventInit extends EventInit {
    }

    export interface ExtendableMessageEventInit extends ExtendableEventInit {
        data?: any;
        origin?: string;
        lastEventId?: string;
        source?: Client | ServiceWorker | MessagePort;
        ports?: MessagePort[];
    }

    export interface FetchEventInit extends ExtendableEventInit {
        request?: Request;
        clientId?: string;
        isReload?: boolean;
    }

    export interface NotificationEventInit extends ExtendableEventInit {
        notification?: Notification;
        action?: string;
    }

    export interface PushEventInit extends ExtendableEventInit {
        data?: any;
    }

    export interface SyncEventInit extends ExtendableEventInit {
        tag?: string;
        lastChance?: boolean;
    }

    export interface EventListener {
        (evt: Event): void;
    }

    export interface WebKitEntriesCallback {
        (evt: Event): void;
    }

    export interface WebKitErrorCallback {
        (evt: Event): void;
    }

    export interface WebKitFileCallback {
        (evt: Event): void;
    }

    export interface AudioBuffer {
        readonly duration: number;
        readonly length: number;
        readonly numberOfChannels: number;
        readonly sampleRate: number;
        copyFromChannel(destination: Float32Array, channelNumber: number, startInChannel?: number): void;
        copyToChannel(source: Float32Array, channelNumber: number, startInChannel?: number): void;
        getChannelData(channel: number): Float32Array;
    }

    export var AudioBuffer: {
        prototype: AudioBuffer;
        new(): AudioBuffer;
    };

    export interface Blob {
        readonly size: number;
        readonly type: string;
        msClose(): void;
        msDetachStream(): any;
        slice(start?: number, end?: number, contentType?: string): Blob;
    }

    export var Blob: {
        prototype: Blob;
        new(blobParts?: any[], options?: BlobPropertyBag): Blob;
    };

    export interface Cache {
        add(request: RequestInfo): Promise<void>;
        addAll(requests: RequestInfo[]): Promise<void>;
        delete(request: RequestInfo, options?: CacheQueryOptions): Promise<boolean>;
        keys(request?: RequestInfo, options?: CacheQueryOptions): any;
        match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response>;
        matchAll(request?: RequestInfo, options?: CacheQueryOptions): any;
        put(request: RequestInfo, response: Response): Promise<void>;
    }

    export var Cache: {
        prototype: Cache;
        new(): Cache;
    };

    export interface CacheStorage {
        delete(cacheName: string): Promise<boolean>;
        has(cacheName: string): Promise<boolean>;
        keys(): any;
        match(request: RequestInfo, options?: CacheQueryOptions): Promise<any>;
        open(cacheName: string): Promise<Cache>;
    }

    export var CacheStorage: {
        prototype: CacheStorage;
        new(): CacheStorage;
    };

    export interface CloseEvent extends Event {
        readonly code: number;
        readonly reason: string;
        readonly wasClean: boolean;
        initCloseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, wasCleanArg: boolean, codeArg: number, reasonArg: string): void;
    }

    export var CloseEvent: {
        prototype: CloseEvent;
        new(typeArg: string, eventInitDict?: CloseEventInit): CloseEvent;
    };

    export interface Console {
        assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
        clear(): void;
        count(countTitle?: string): void;
        debug(message?: any, ...optionalParams: any[]): void;
        dir(value?: any, ...optionalParams: any[]): void;
        dirxml(value: any): void;
        error(message?: any, ...optionalParams: any[]): void;
        exception(message?: string, ...optionalParams: any[]): void;
        group(groupTitle?: string, ...optionalParams: any[]): void;
        groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void;
        groupEnd(): void;
        info(message?: any, ...optionalParams: any[]): void;
        log(message?: any, ...optionalParams: any[]): void;
        msIsIndependentlyComposed(element: any): boolean;
        profile(reportName?: string): void;
        profileEnd(): void;
        select(element: any): void;
        table(...data: any[]): void;
        time(timerName?: string): void;
        timeEnd(timerName?: string): void;
        trace(message?: any, ...optionalParams: any[]): void;
        warn(message?: any, ...optionalParams: any[]): void;
    }

    export var Console: {
        prototype: Console;
        new(): Console;
    };

    export interface Coordinates {
        readonly accuracy: number;
        readonly altitude: number | null;
        readonly altitudeAccuracy: number | null;
        readonly heading: number | null;
        readonly latitude: number;
        readonly longitude: number;
        readonly speed: number | null;
    }

    export var Coordinates: {
        prototype: Coordinates;
        new(): Coordinates;
    };

    export interface CryptoKey {
        readonly algorithm: KeyAlgorithm;
        readonly extractable: boolean;
        readonly type: string;
        readonly usages: string[];
    }

    export var CryptoKey: {
        prototype: CryptoKey;
        new(): CryptoKey;
    };

    export interface DOMError {
        readonly name: string;
        toString(): string;
    }

    export var DOMError: {
        prototype: DOMError;
        new(): DOMError;
    };

    export interface DOMException {
        readonly code: number;
        readonly message: string;
        readonly name: string;
        toString(): string;
        readonly ABORT_ERR: number;
        readonly DATA_CLONE_ERR: number;
        readonly DOMSTRING_SIZE_ERR: number;
        readonly HIERARCHY_REQUEST_ERR: number;
        readonly INDEX_SIZE_ERR: number;
        readonly INUSE_ATTRIBUTE_ERR: number;
        readonly INVALID_ACCESS_ERR: number;
        readonly INVALID_CHARACTER_ERR: number;
        readonly INVALID_MODIFICATION_ERR: number;
        readonly INVALID_NODE_TYPE_ERR: number;
        readonly INVALID_STATE_ERR: number;
        readonly NAMESPACE_ERR: number;
        readonly NETWORK_ERR: number;
        readonly NO_DATA_ALLOWED_ERR: number;
        readonly NO_MODIFICATION_ALLOWED_ERR: number;
        readonly NOT_FOUND_ERR: number;
        readonly NOT_SUPPORTED_ERR: number;
        readonly PARSE_ERR: number;
        readonly QUOTA_EXCEEDED_ERR: number;
        readonly SECURITY_ERR: number;
        readonly SERIALIZE_ERR: number;
        readonly SYNTAX_ERR: number;
        readonly TIMEOUT_ERR: number;
        readonly TYPE_MISMATCH_ERR: number;
        readonly URL_MISMATCH_ERR: number;
        readonly VALIDATION_ERR: number;
        readonly WRONG_DOCUMENT_ERR: number;
    }

    export var DOMException: {
        prototype: DOMException;
        new(): DOMException;
        readonly ABORT_ERR: number;
        readonly DATA_CLONE_ERR: number;
        readonly DOMSTRING_SIZE_ERR: number;
        readonly HIERARCHY_REQUEST_ERR: number;
        readonly INDEX_SIZE_ERR: number;
        readonly INUSE_ATTRIBUTE_ERR: number;
        readonly INVALID_ACCESS_ERR: number;
        readonly INVALID_CHARACTER_ERR: number;
        readonly INVALID_MODIFICATION_ERR: number;
        readonly INVALID_NODE_TYPE_ERR: number;
        readonly INVALID_STATE_ERR: number;
        readonly NAMESPACE_ERR: number;
        readonly NETWORK_ERR: number;
        readonly NO_DATA_ALLOWED_ERR: number;
        readonly NO_MODIFICATION_ALLOWED_ERR: number;
        readonly NOT_FOUND_ERR: number;
        readonly NOT_SUPPORTED_ERR: number;
        readonly PARSE_ERR: number;
        readonly QUOTA_EXCEEDED_ERR: number;
        readonly SECURITY_ERR: number;
        readonly SERIALIZE_ERR: number;
        readonly SYNTAX_ERR: number;
        readonly TIMEOUT_ERR: number;
        readonly TYPE_MISMATCH_ERR: number;
        readonly URL_MISMATCH_ERR: number;
        readonly VALIDATION_ERR: number;
        readonly WRONG_DOCUMENT_ERR: number;
    };

    export interface DOMStringList {
        readonly length: number;
        contains(str: string): boolean;
        item(index: number): string | null;
        [index: number]: string;
    }

    export var DOMStringList: {
        prototype: DOMStringList;
        new(): DOMStringList;
    };

    export interface ErrorEvent extends Event {
        readonly colno: number;
        readonly error: any;
        readonly filename: string;
        readonly lineno: number;
        readonly message: string;
        initErrorEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, messageArg: string, filenameArg: string, linenoArg: number): void;
    }

    export var ErrorEvent: {
        prototype: ErrorEvent;
        new(type: string, errorEventInitDict?: ErrorEventInit): ErrorEvent;
    };

    export interface Event {
        readonly bubbles: boolean;
        readonly cancelable: boolean;
        cancelBubble: boolean;
        readonly currentTarget: EventTarget;
        readonly defaultPrevented: boolean;
        readonly eventPhase: number;
        readonly isTrusted: boolean;
        returnValue: boolean;
        readonly srcElement: any;
        readonly target: EventTarget;
        readonly timeStamp: number;
        readonly type: string;
        readonly scoped: boolean;
        initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void;
        preventDefault(): void;
        stopImmediatePropagation(): void;
        stopPropagation(): void;
        deepPath(): EventTarget[];
        readonly AT_TARGET: number;
        readonly BUBBLING_PHASE: number;
        readonly CAPTURING_PHASE: number;
    }

    export var Event: {
        prototype: Event;
        new(typeArg: string, eventInitDict?: EventInit): Event;
        readonly AT_TARGET: number;
        readonly BUBBLING_PHASE: number;
        readonly CAPTURING_PHASE: number;
    };

    export interface EventTarget {
        addEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        dispatchEvent(evt: Event): boolean;
        removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }

    export var EventTarget: {
        prototype: EventTarget;
        new(): EventTarget;
    };

    export interface File extends Blob {
        readonly lastModifiedDate: any;
        readonly name: string;
        readonly webkitRelativePath: string;
    }

    export var File: {
        prototype: File;
        new(parts: (ArrayBuffer | ArrayBufferView | Blob | string)[], filename: string, properties?: FilePropertyBag): File;
    };

    export interface FileList {
        readonly length: number;
        item(index: number): File;
        [index: number]: File;
    }

    export var FileList: {
        prototype: FileList;
        new(): FileList;
    };

    export interface FileReader extends EventTarget, MSBaseReader {
        readonly error: DOMError;
        readAsArrayBuffer(blob: Blob): void;
        readAsBinaryString(blob: Blob): void;
        readAsDataURL(blob: Blob): void;
        readAsText(blob: Blob, encoding?: string): void;
        addEventListener<K extends keyof MSBaseReaderEventMap>(type: K, listener: (this: FileReader, ev: MSBaseReaderEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var FileReader: {
        prototype: FileReader;
        new(): FileReader;
    };

    export interface FormData {
        append(name: string, value: string | Blob, fileName?: string): void;
    }

    export var FormData: {
        prototype: FormData;
        new(): FormData;
    };

    export interface Headers {
        append(name: string, value: string): void;
        delete(name: string): void;
        forEach(callback: ForEachCallback): void;
        get(name: string): string | null;
        has(name: string): boolean;
        set(name: string, value: string): void;
    }

    export var Headers: {
        prototype: Headers;
        new(init?: any): Headers;
    };

    export interface IDBCursor {
        readonly direction: IDBCursorDirection;
        key: IDBKeyRange | IDBValidKey;
        readonly primaryKey: any;
        source: IDBObjectStore | IDBIndex;
        advance(count: number): void;
        continue(key?: IDBKeyRange | IDBValidKey): void;
        delete(): IDBRequest;
        update(value: any): IDBRequest;
        readonly NEXT: string;
        readonly NEXT_NO_DUPLICATE: string;
        readonly PREV: string;
        readonly PREV_NO_DUPLICATE: string;
    }

    export var IDBCursor: {
        prototype: IDBCursor;
        new(): IDBCursor;
        readonly NEXT: string;
        readonly NEXT_NO_DUPLICATE: string;
        readonly PREV: string;
        readonly PREV_NO_DUPLICATE: string;
    };

    export interface IDBCursorWithValue extends IDBCursor {
        readonly value: any;
    }

    export var IDBCursorWithValue: {
        prototype: IDBCursorWithValue;
        new(): IDBCursorWithValue;
    };

    export interface IDBDatabaseEventMap {
        "abort": Event;
        "error": Event;
    }

    export interface IDBDatabase extends EventTarget {
        readonly name: string;
        readonly objectStoreNames: DOMStringList;
        onabort: (this: IDBDatabase, ev: Event) => any;
        onerror: (this: IDBDatabase, ev: Event) => any;
        version: number;
        onversionchange: (ev: IDBVersionChangeEvent) => any;
        close(): void;
        createObjectStore(name: string, optionalParameters?: IDBObjectStoreParameters): IDBObjectStore;
        deleteObjectStore(name: string): void;
        transaction(storeNames: string | string[], mode?: IDBTransactionMode): IDBTransaction;
        addEventListener(type: "versionchange", listener: (ev: IDBVersionChangeEvent) => any, useCapture?: boolean): void;
        addEventListener<K extends keyof IDBDatabaseEventMap>(type: K, listener: (this: IDBDatabase, ev: IDBDatabaseEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var IDBDatabase: {
        prototype: IDBDatabase;
        new(): IDBDatabase;
    };

    export interface IDBFactory {
        cmp(first: any, second: any): number;
        deleteDatabase(name: string): IDBOpenDBRequest;
        open(name: string, version?: number): IDBOpenDBRequest;
    }

    export var IDBFactory: {
        prototype: IDBFactory;
        new(): IDBFactory;
    };

    export interface IDBIndex {
        keyPath: string | string[];
        readonly name: string;
        readonly objectStore: IDBObjectStore;
        readonly unique: boolean;
        multiEntry: boolean;
        count(key?: IDBKeyRange | IDBValidKey): IDBRequest;
        get(key: IDBKeyRange | IDBValidKey): IDBRequest;
        getKey(key: IDBKeyRange | IDBValidKey): IDBRequest;
        openCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection): IDBRequest;
        openKeyCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection): IDBRequest;
    }

    export var IDBIndex: {
        prototype: IDBIndex;
        new(): IDBIndex;
    };

    export interface IDBKeyRange {
        readonly lower: any;
        readonly lowerOpen: boolean;
        readonly upper: any;
        readonly upperOpen: boolean;
    }

    export var IDBKeyRange: {
        prototype: IDBKeyRange;
        new(): IDBKeyRange;
        bound(lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean): IDBKeyRange;
        lowerBound(lower: any, open?: boolean): IDBKeyRange;
        only(value: any): IDBKeyRange;
        upperBound(upper: any, open?: boolean): IDBKeyRange;
    };

    export interface IDBObjectStore {
        readonly indexNames: DOMStringList;
        keyPath: string | string[];
        readonly name: string;
        readonly transaction: IDBTransaction;
        autoIncrement: boolean;
        add(value: any, key?: IDBKeyRange | IDBValidKey): IDBRequest;
        clear(): IDBRequest;
        count(key?: IDBKeyRange | IDBValidKey): IDBRequest;
        createIndex(name: string, keyPath: string | string[], optionalParameters?: IDBIndexParameters): IDBIndex;
        delete(key: IDBKeyRange | IDBValidKey): IDBRequest;
        deleteIndex(indexName: string): void;
        get(key: any): IDBRequest;
        index(name: string): IDBIndex;
        openCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection): IDBRequest;
        put(value: any, key?: IDBKeyRange | IDBValidKey): IDBRequest;
    }

    export var IDBObjectStore: {
        prototype: IDBObjectStore;
        new(): IDBObjectStore;
    };

    export interface IDBOpenDBRequestEventMap extends IDBRequestEventMap {
        "blocked": Event;
        "upgradeneeded": IDBVersionChangeEvent;
    }

    export interface IDBOpenDBRequest extends IDBRequest {
        onblocked: (this: IDBOpenDBRequest, ev: Event) => any;
        onupgradeneeded: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any;
        addEventListener<K extends keyof IDBOpenDBRequestEventMap>(type: K, listener: (this: IDBOpenDBRequest, ev: IDBOpenDBRequestEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var IDBOpenDBRequest: {
        prototype: IDBOpenDBRequest;
        new(): IDBOpenDBRequest;
    };

    export interface IDBRequestEventMap {
        "error": Event;
        "success": Event;
    }

    export interface IDBRequest extends EventTarget {
        readonly error: DOMException;
        onerror: (this: IDBRequest, ev: Event) => any;
        onsuccess: (this: IDBRequest, ev: Event) => any;
        readonly readyState: IDBRequestReadyState;
        readonly result: any;
        source: IDBObjectStore | IDBIndex | IDBCursor;
        readonly transaction: IDBTransaction;
        addEventListener<K extends keyof IDBRequestEventMap>(type: K, listener: (this: IDBRequest, ev: IDBRequestEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var IDBRequest: {
        prototype: IDBRequest;
        new(): IDBRequest;
    };

    export interface IDBTransactionEventMap {
        "abort": Event;
        "complete": Event;
        "error": Event;
    }

    export interface IDBTransaction extends EventTarget {
        readonly db: IDBDatabase;
        readonly error: DOMException;
        readonly mode: IDBTransactionMode;
        onabort: (this: IDBTransaction, ev: Event) => any;
        oncomplete: (this: IDBTransaction, ev: Event) => any;
        onerror: (this: IDBTransaction, ev: Event) => any;
        abort(): void;
        objectStore(name: string): IDBObjectStore;
        readonly READ_ONLY: string;
        readonly READ_WRITE: string;
        readonly VERSION_CHANGE: string;
        addEventListener<K extends keyof IDBTransactionEventMap>(type: K, listener: (this: IDBTransaction, ev: IDBTransactionEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var IDBTransaction: {
        prototype: IDBTransaction;
        new(): IDBTransaction;
        readonly READ_ONLY: string;
        readonly READ_WRITE: string;
        readonly VERSION_CHANGE: string;
    };

    export interface IDBVersionChangeEvent extends Event {
        readonly newVersion: number | null;
        readonly oldVersion: number;
    }

    export var IDBVersionChangeEvent: {
        prototype: IDBVersionChangeEvent;
        new(): IDBVersionChangeEvent;
    };

    export interface ImageData {
        data: Uint8ClampedArray;
        readonly height: number;
        readonly width: number;
    }

    export var ImageData: {
        prototype: ImageData;
        new(width: number, height: number): ImageData;
        new(array: Uint8ClampedArray, width: number, height: number): ImageData;
    };

    export interface MessageChannel {
        readonly port1: MessagePort;
        readonly port2: MessagePort;
    }

    export var MessageChannel: {
        prototype: MessageChannel;
        new(): MessageChannel;
    };

    export interface MessageEvent extends Event {
        readonly data: any;
        readonly origin: string;
        readonly ports: any;
        readonly source: any;
        initMessageEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, dataArg: any, originArg: string, lastEventIdArg: string, sourceArg: any): void;
    }

    export var MessageEvent: {
        prototype: MessageEvent;
        new(type: string, eventInitDict?: MessageEventInit): MessageEvent;
    };

    export interface MessagePortEventMap {
        "message": MessageEvent;
    }

    export interface MessagePort extends EventTarget {
        onmessage: (this: MessagePort, ev: MessageEvent) => any;
        close(): void;
        postMessage(message?: any, transfer?: any[]): void;
        start(): void;
        addEventListener<K extends keyof MessagePortEventMap>(type: K, listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var MessagePort: {
        prototype: MessagePort;
        new(): MessagePort;
    };

    export interface NotificationEventMap {
        "click": Event;
        "close": Event;
        "error": Event;
        "show": Event;
    }

    export interface Notification extends EventTarget {
        readonly body: string;
        readonly dir: NotificationDirection;
        readonly icon: string;
        readonly lang: string;
        onclick: (this: Notification, ev: Event) => any;
        onclose: (this: Notification, ev: Event) => any;
        onerror: (this: Notification, ev: Event) => any;
        onshow: (this: Notification, ev: Event) => any;
        readonly permission: NotificationPermission;
        readonly tag: string;
        readonly title: string;
        close(): void;
        addEventListener<K extends keyof NotificationEventMap>(type: K, listener: (this: Notification, ev: NotificationEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var Notification: {
        prototype: Notification;
        new(title: string, options?: NotificationOptions): Notification;
        requestPermission(callback?: NotificationPermissionCallback): Promise<NotificationPermission>;
    };

    export interface Performance {
        readonly navigation: PerformanceNavigation;
        readonly timing: PerformanceTiming;
        clearMarks(markName?: string): void;
        clearMeasures(measureName?: string): void;
        clearResourceTimings(): void;
        getEntries(): any;
        getEntriesByName(name: string, entryType?: string): any;
        getEntriesByType(entryType: string): any;
        getMarks(markName?: string): any;
        getMeasures(measureName?: string): any;
        mark(markName: string): void;
        measure(measureName: string, startMarkName?: string, endMarkName?: string): void;
        now(): number;
        setResourceTimingBufferSize(maxSize: number): void;
        toJSON(): any;
    }

    export var Performance: {
        prototype: Performance;
        new(): Performance;
    };

    export interface PerformanceNavigation {
        readonly redirectCount: number;
        readonly type: number;
        toJSON(): any;
        readonly TYPE_BACK_FORWARD: number;
        readonly TYPE_NAVIGATE: number;
        readonly TYPE_RELOAD: number;
        readonly TYPE_RESERVED: number;
    }

    export var PerformanceNavigation: {
        prototype: PerformanceNavigation;
        new(): PerformanceNavigation;
        readonly TYPE_BACK_FORWARD: number;
        readonly TYPE_NAVIGATE: number;
        readonly TYPE_RELOAD: number;
        readonly TYPE_RESERVED: number;
    };

    export interface PerformanceTiming {
        readonly connectEnd: number;
        readonly connectStart: number;
        readonly domainLookupEnd: number;
        readonly domainLookupStart: number;
        readonly domComplete: number;
        readonly domContentLoadedEventEnd: number;
        readonly domContentLoadedEventStart: number;
        readonly domInteractive: number;
        readonly domLoading: number;
        readonly fetchStart: number;
        readonly loadEventEnd: number;
        readonly loadEventStart: number;
        readonly msFirstPaint: number;
        readonly navigationStart: number;
        readonly redirectEnd: number;
        readonly redirectStart: number;
        readonly requestStart: number;
        readonly responseEnd: number;
        readonly responseStart: number;
        readonly unloadEventEnd: number;
        readonly unloadEventStart: number;
        readonly secureConnectionStart: number;
        toJSON(): any;
    }

    export var PerformanceTiming: {
        prototype: PerformanceTiming;
        new(): PerformanceTiming;
    };

    export interface Position {
        readonly coords: Coordinates;
        readonly timestamp: number;
    }

    export var Position: {
        prototype: Position;
        new(): Position;
    };

    export interface PositionError {
        readonly code: number;
        readonly message: string;
        toString(): string;
        readonly PERMISSION_DENIED: number;
        readonly POSITION_UNAVAILABLE: number;
        readonly TIMEOUT: number;
    }

    export var PositionError: {
        prototype: PositionError;
        new(): PositionError;
        readonly PERMISSION_DENIED: number;
        readonly POSITION_UNAVAILABLE: number;
        readonly TIMEOUT: number;
    };

    export interface ProgressEvent extends Event {
        readonly lengthComputable: boolean;
        readonly loaded: number;
        readonly total: number;
        initProgressEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, lengthComputableArg: boolean, loadedArg: number, totalArg: number): void;
    }

    export var ProgressEvent: {
        prototype: ProgressEvent;
        new(type: string, eventInitDict?: ProgressEventInit): ProgressEvent;
    };

    export interface PushManager {
        getSubscription(): Promise<PushSubscription>;
        permissionState(options?: PushSubscriptionOptionsInit): Promise<PushPermissionState>;
        subscribe(options?: PushSubscriptionOptionsInit): Promise<PushSubscription>;
    }

    export var PushManager: {
        prototype: PushManager;
        new(): PushManager;
    };

    export interface PushSubscription {
        readonly endpoint: USVString;
        readonly options: PushSubscriptionOptions;
        getKey(name: PushEncryptionKeyName): ArrayBuffer | null;
        toJSON(): any;
        unsubscribe(): Promise<boolean>;
    }

    export var PushSubscription: {
        prototype: PushSubscription;
        new(): PushSubscription;
    };

    export interface PushSubscriptionOptions {
        readonly applicationServerKey: ArrayBuffer | null;
        readonly userVisibleOnly: boolean;
    }

    export var PushSubscriptionOptions: {
        prototype: PushSubscriptionOptions;
        new(): PushSubscriptionOptions;
    };

    export interface ReadableStream {
        readonly locked: boolean;
        cancel(): Promise<void>;
        getReader(): ReadableStreamReader;
    }

    export var ReadableStream: {
        prototype: ReadableStream;
        new(): ReadableStream;
    };

    export interface ReadableStreamReader {
        cancel(): Promise<void>;
        read(): Promise<any>;
        releaseLock(): void;
    }

    export var ReadableStreamReader: {
        prototype: ReadableStreamReader;
        new(): ReadableStreamReader;
    };

    export interface Request extends Object, Body {
        readonly cache: RequestCache;
        readonly credentials: RequestCredentials;
        readonly destination: RequestDestination;
        readonly headers: Headers;
        readonly integrity: string;
        readonly keepalive: boolean;
        readonly method: string;
        readonly mode: RequestMode;
        readonly redirect: RequestRedirect;
        readonly referrer: string;
        readonly referrerPolicy: ReferrerPolicy;
        readonly type: RequestType;
        readonly url: string;
        clone(): Request;
    }

    export var Request: {
        prototype: Request;
        new(input: Request | string, init?: RequestInit): Request;
    };

    export interface Response extends Object, Body {
        readonly body: ReadableStream | null;
        readonly headers: Headers;
        readonly ok: boolean;
        readonly status: number;
        readonly statusText: string;
        readonly type: ResponseType;
        readonly url: string;
        clone(): Response;
    }

    export var Response: {
        prototype: Response;
        new(body?: any, init?: ResponseInit): Response;
        error: () => Response;
        redirect: (url: string, status?: number) => Response;
    };

    export interface ServiceWorkerEventMap extends AbstractWorkerEventMap {
        "statechange": Event;
    }

    export interface ServiceWorker extends EventTarget, AbstractWorker {
        onstatechange: (this: ServiceWorker, ev: Event) => any;
        readonly scriptURL: USVString;
        readonly state: ServiceWorkerState;
        postMessage(message: any, transfer?: any[]): void;
        addEventListener<K extends keyof ServiceWorkerEventMap>(type: K, listener: (this: ServiceWorker, ev: ServiceWorkerEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var ServiceWorker: {
        prototype: ServiceWorker;
        new(): ServiceWorker;
    };

    export interface ServiceWorkerRegistrationEventMap {
        "updatefound": Event;
    }

    export interface ServiceWorkerRegistration extends EventTarget {
        readonly active: ServiceWorker | null;
        readonly installing: ServiceWorker | null;
        onupdatefound: (this: ServiceWorkerRegistration, ev: Event) => any;
        readonly pushManager: PushManager;
        readonly scope: USVString;
        readonly sync: SyncManager;
        readonly waiting: ServiceWorker | null;
        getNotifications(filter?: GetNotificationOptions): any;
        showNotification(title: string, options?: NotificationOptions): Promise<void>;
        unregister(): Promise<boolean>;
        update(): Promise<void>;
        addEventListener<K extends keyof ServiceWorkerRegistrationEventMap>(type: K, listener: (this: ServiceWorkerRegistration, ev: ServiceWorkerRegistrationEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var ServiceWorkerRegistration: {
        prototype: ServiceWorkerRegistration;
        new(): ServiceWorkerRegistration;
    };

    export interface SyncManager {
        getTags(): any;
        register(tag: string): Promise<void>;
    }

    export var SyncManager: {
        prototype: SyncManager;
        new(): SyncManager;
    };

    export interface URL {
        hash: string;
        host: string;
        hostname: string;
        href: string;
        readonly origin: string;
        password: string;
        pathname: string;
        port: string;
        protocol: string;
        search: string;
        username: string;
        readonly searchParams: URLSearchParams;
        toString(): string;
    }

    export var URL: {
        prototype: URL;
        new(url: string, base?: string): URL;
        createObjectURL(object: any, options?: ObjectURLOptions): string;
        revokeObjectURL(url: string): void;
    };

    export interface WebSocketEventMap {
        "close": CloseEvent;
        "error": Event;
        "message": MessageEvent;
        "open": Event;
    }

    export interface WebSocket extends EventTarget {
        binaryType: string;
        readonly bufferedAmount: number;
        readonly extensions: string;
        onclose: (this: WebSocket, ev: CloseEvent) => any;
        onerror: (this: WebSocket, ev: Event) => any;
        onmessage: (this: WebSocket, ev: MessageEvent) => any;
        onopen: (this: WebSocket, ev: Event) => any;
        readonly protocol: string;
        readonly readyState: number;
        readonly url: string;
        close(code?: number, reason?: string): void;
        send(data: any): void;
        readonly CLOSED: number;
        readonly CLOSING: number;
        readonly CONNECTING: number;
        readonly OPEN: number;
        addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var WebSocket: {
        prototype: WebSocket;
        new(url: string, protocols?: string | string[]): WebSocket;
        readonly CLOSED: number;
        readonly CLOSING: number;
        readonly CONNECTING: number;
        readonly OPEN: number;
    };

    export interface WorkerEventMap extends AbstractWorkerEventMap {
        "message": MessageEvent;
    }

    export interface Worker extends EventTarget, AbstractWorker {
        onmessage: (this: Worker, ev: MessageEvent) => any;
        postMessage(message: any, transfer?: any[]): void;
        terminate(): void;
        addEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var Worker: {
        prototype: Worker;
        new(stringUrl: string): Worker;
    };

    export interface XMLHttpRequestEventMap extends XMLHttpRequestEventTargetEventMap {
        "readystatechange": Event;
    }

    export interface XMLHttpRequest extends EventTarget, XMLHttpRequestEventTarget {
        onreadystatechange: (this: XMLHttpRequest, ev: Event) => any;
        readonly readyState: number;
        readonly response: any;
        readonly responseText: string;
        responseType: XMLHttpRequestResponseType;
        readonly responseURL: string;
        readonly responseXML: any;
        readonly status: number;
        readonly statusText: string;
        timeout: number;
        readonly upload: XMLHttpRequestUpload;
        withCredentials: boolean;
        msCaching?: string;
        abort(): void;
        getAllResponseHeaders(): string;
        getResponseHeader(header: string): string | null;
        msCachingEnabled(): boolean;
        open(method: string, url: string, async?: boolean, user?: string, password?: string): void;
        overrideMimeType(mime: string): void;
        send(data?: string): void;
        send(data?: any): void;
        setRequestHeader(header: string, value: string): void;
        readonly DONE: number;
        readonly HEADERS_RECEIVED: number;
        readonly LOADING: number;
        readonly OPENED: number;
        readonly UNSENT: number;
        addEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var XMLHttpRequest: {
        prototype: XMLHttpRequest;
        new(): XMLHttpRequest;
        readonly DONE: number;
        readonly HEADERS_RECEIVED: number;
        readonly LOADING: number;
        readonly OPENED: number;
        readonly UNSENT: number;
    };

    export interface XMLHttpRequestUpload extends EventTarget, XMLHttpRequestEventTarget {
        addEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestUpload, ev: XMLHttpRequestEventTargetEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var XMLHttpRequestUpload: {
        prototype: XMLHttpRequestUpload;
        new(): XMLHttpRequestUpload;
    };

    export interface AbstractWorkerEventMap {
        "error": ErrorEvent;
    }

    export interface AbstractWorker {
        onerror: (this: AbstractWorker, ev: ErrorEvent) => any;
        addEventListener<K extends keyof AbstractWorkerEventMap>(type: K, listener: (this: AbstractWorker, ev: AbstractWorkerEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export interface Body {
        readonly bodyUsed: boolean;
        arrayBuffer(): Promise<ArrayBuffer>;
        blob(): Promise<Blob>;
        json(): Promise<any>;
        text(): Promise<string>;
    }

    export interface GlobalFetch {
        fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
    }

    export interface MSBaseReaderEventMap {
        "abort": Event;
        "error": ErrorEvent;
        "load": Event;
        "loadend": ProgressEvent;
        "loadstart": Event;
        "progress": ProgressEvent;
    }

    export interface MSBaseReader {
        onabort: (this: MSBaseReader, ev: Event) => any;
        onerror: (this: MSBaseReader, ev: ErrorEvent) => any;
        onload: (this: MSBaseReader, ev: Event) => any;
        onloadend: (this: MSBaseReader, ev: ProgressEvent) => any;
        onloadstart: (this: MSBaseReader, ev: Event) => any;
        onprogress: (this: MSBaseReader, ev: ProgressEvent) => any;
        readonly readyState: number;
        readonly result: any;
        abort(): void;
        readonly DONE: number;
        readonly EMPTY: number;
        readonly LOADING: number;
        addEventListener<K extends keyof MSBaseReaderEventMap>(type: K, listener: (this: MSBaseReader, ev: MSBaseReaderEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export interface NavigatorBeacon {
        sendBeacon(url: USVString, data?: BodyInit): boolean;
    }

    export interface NavigatorConcurrentHardware {
        readonly hardwareConcurrency: number;
    }

    export interface NavigatorID {
        readonly appCodeName: string;
        readonly appName: string;
        readonly appVersion: string;
        readonly platform: string;
        readonly product: string;
        readonly productSub: string;
        readonly userAgent: string;
        readonly vendor: string;
        readonly vendorSub: string;
    }

    export interface NavigatorOnLine {
        readonly onLine: boolean;
    }

    export interface WindowBase64 {
        atob(encodedString: string): string;
        btoa(rawString: string): string;
    }

    export interface WindowConsole {
        readonly console: Console;
    }

    export interface XMLHttpRequestEventTargetEventMap {
        "abort": Event;
        "error": ErrorEvent;
        "load": Event;
        "loadend": ProgressEvent;
        "loadstart": Event;
        "progress": ProgressEvent;
        "timeout": ProgressEvent;
    }

    export interface XMLHttpRequestEventTarget {
        onabort: (this: XMLHttpRequestEventTarget, ev: Event) => any;
        onerror: (this: XMLHttpRequestEventTarget, ev: ErrorEvent) => any;
        onload: (this: XMLHttpRequestEventTarget, ev: Event) => any;
        onloadend: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
        onloadstart: (this: XMLHttpRequestEventTarget, ev: Event) => any;
        onprogress: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
        ontimeout: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
        addEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestEventTarget, ev: XMLHttpRequestEventTargetEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export interface Client {
        readonly frameType: FrameType;
        readonly id: string;
        readonly url: USVString;
        postMessage(message: any, transfer?: any[]): void;
    }

    export var Client: {
        prototype: Client;
        new(): Client;
    };

    export interface Clients {
        claim(): Promise<void>;
        get(id: string): Promise<any>;
        matchAll(options?: ClientQueryOptions): any;
        openWindow(url: USVString): Promise<WindowClient>;
    }

    export var Clients: {
        prototype: Clients;
        new(): Clients;
    };

    export interface DedicatedWorkerGlobalScopeEventMap extends WorkerGlobalScopeEventMap {
        "message": MessageEvent;
    }

    export interface DedicatedWorkerGlobalScope extends WorkerGlobalScope {
        onmessage: (this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any;
        close(): void;
        postMessage(message: any, transfer?: any[]): void;
        addEventListener<K extends keyof DedicatedWorkerGlobalScopeEventMap>(type: K, listener: (this: DedicatedWorkerGlobalScope, ev: DedicatedWorkerGlobalScopeEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var DedicatedWorkerGlobalScope: {
        prototype: DedicatedWorkerGlobalScope;
        new(): DedicatedWorkerGlobalScope;
    };

    export interface ExtendableEvent extends Event {
        waitUntil(f: Promise<any>): void;
    }

    export var ExtendableEvent: {
        prototype: ExtendableEvent;
        new(type: string, eventInitDict?: ExtendableEventInit): ExtendableEvent;
    };

    export interface ExtendableMessageEvent extends ExtendableEvent {
        readonly data: any;
        readonly lastEventId: string;
        readonly origin: string;
        readonly ports: MessagePort[] | null;
        readonly source: Client | ServiceWorker | MessagePort | null;
    }

    export var ExtendableMessageEvent: {
        prototype: ExtendableMessageEvent;
        new(type: string, eventInitDict?: ExtendableMessageEventInit): ExtendableMessageEvent;
    };

    export interface FetchEvent extends ExtendableEvent {
        readonly clientId: string | null;
        readonly isReload: boolean;
        readonly request: Request;
        respondWith(r: Promise<Response>): void;
    }

    export var FetchEvent: {
        prototype: FetchEvent;
        new(type: string, eventInitDict: FetchEventInit): FetchEvent;
    };

    export interface FileReaderSync {
        readAsArrayBuffer(blob: Blob): any;
        readAsBinaryString(blob: Blob): void;
        readAsDataURL(blob: Blob): string;
        readAsText(blob: Blob, encoding?: string): string;
    }

    export var FileReaderSync: {
        prototype: FileReaderSync;
        new(): FileReaderSync;
    };

    export interface NotificationEvent extends ExtendableEvent {
        readonly action: string;
        readonly notification: Notification;
    }

    export var NotificationEvent: {
        prototype: NotificationEvent;
        new(type: string, eventInitDict: NotificationEventInit): NotificationEvent;
    };

    export interface PushEvent extends ExtendableEvent {
        readonly data: PushMessageData | null;
    }

    export var PushEvent: {
        prototype: PushEvent;
        new(type: string, eventInitDict?: PushEventInit): PushEvent;
    };

    export interface PushMessageData {
        arrayBuffer(): ArrayBuffer;
        blob(): Blob;
        json(): JSON;
        text(): USVString;
    }

    export var PushMessageData: {
        prototype: PushMessageData;
        new(): PushMessageData;
    };

    export interface ServiceWorkerGlobalScopeEventMap extends WorkerGlobalScopeEventMap {
        "activate": ExtendableEvent;
        "fetch": FetchEvent;
        "install": ExtendableEvent;
        "message": ExtendableMessageEvent;
        "notificationclick": NotificationEvent;
        "notificationclose": NotificationEvent;
        "push": PushEvent;
        "pushsubscriptionchange": ExtendableEvent;
        "sync": SyncEvent;
    }

    export interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
        readonly clients: Clients;
        onactivate: (this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any;
        onfetch: (this: ServiceWorkerGlobalScope, ev: FetchEvent) => any;
        oninstall: (this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any;
        onmessage: (this: ServiceWorkerGlobalScope, ev: ExtendableMessageEvent) => any;
        onnotificationclick: (this: ServiceWorkerGlobalScope, ev: NotificationEvent) => any;
        onnotificationclose: (this: ServiceWorkerGlobalScope, ev: NotificationEvent) => any;
        onpush: (this: ServiceWorkerGlobalScope, ev: PushEvent) => any;
        onpushsubscriptionchange: (this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any;
        onsync: (this: ServiceWorkerGlobalScope, ev: SyncEvent) => any;
        readonly registration: ServiceWorkerRegistration;
        skipWaiting(): Promise<void>;
        addEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(type: K, listener: (this: ServiceWorkerGlobalScope, ev: ServiceWorkerGlobalScopeEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var ServiceWorkerGlobalScope: {
        prototype: ServiceWorkerGlobalScope;
        new(): ServiceWorkerGlobalScope;
    };

    export interface SyncEvent extends ExtendableEvent {
        readonly lastChance: boolean;
        readonly tag: string;
    }

    export var SyncEvent: {
        prototype: SyncEvent;
        new(type: string, init: SyncEventInit): SyncEvent;
    };

    export interface WindowClient extends Client {
        readonly focused: boolean;
        readonly visibilityState: VisibilityState;
        focus(): Promise<WindowClient>;
        navigate(url: USVString): Promise<WindowClient>;
    }

    export var WindowClient: {
        prototype: WindowClient;
        new(): WindowClient;
    };

    export interface WorkerGlobalScopeEventMap {
        "error": ErrorEvent;
    }

    export interface WorkerGlobalScope extends EventTarget, WorkerUtils, WindowConsole, GlobalFetch {
        readonly caches: CacheStorage;
        readonly isSecureContext: boolean;
        readonly location: WorkerLocation;
        onerror: (this: WorkerGlobalScope, ev: ErrorEvent) => any;
        readonly performance: Performance;
        readonly self: WorkerGlobalScope;
        msWriteProfilerMark(profilerMarkName: string): void;
        createImageBitmap(image: ImageBitmap | ImageData | Blob, options?: ImageBitmapOptions): Promise<ImageBitmap>;
        createImageBitmap(image: ImageBitmap | ImageData | Blob, sx: number, sy: number, sw: number, sh: number, options?: ImageBitmapOptions): Promise<ImageBitmap>;
        addEventListener<K extends keyof WorkerGlobalScopeEventMap>(type: K, listener: (this: WorkerGlobalScope, ev: WorkerGlobalScopeEventMap[K]) => any, useCapture?: boolean): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    }

    export var WorkerGlobalScope: {
        prototype: WorkerGlobalScope;
        new(): WorkerGlobalScope;
    };

    export interface WorkerLocation {
        readonly hash: string;
        readonly host: string;
        readonly hostname: string;
        readonly href: string;
        readonly origin: string;
        readonly pathname: string;
        readonly port: string;
        readonly protocol: string;
        readonly search: string;
        toString(): string;
    }

    export var WorkerLocation: {
        prototype: WorkerLocation;
        new(): WorkerLocation;
    };

    export interface WorkerNavigator extends Object, NavigatorID, NavigatorOnLine, NavigatorBeacon, NavigatorConcurrentHardware {
        readonly hardwareConcurrency: number;
    }

    export var WorkerNavigator: {
        prototype: WorkerNavigator;
        new(): WorkerNavigator;
    };

    export interface WorkerUtils extends Object, WindowBase64 {
        readonly indexedDB: IDBFactory;
        readonly msIndexedDB: IDBFactory;
        readonly navigator: WorkerNavigator;
        clearImmediate(handle: number): void;
        clearInterval(handle: number): void;
        clearTimeout(handle: number): void;
        importScripts(...urls: string[]): void;
        setImmediate(handler: (...args: any[]) => void): number;
        setImmediate(handler: any, ...args: any[]): number;
        setInterval(handler: (...args: any[]) => void, timeout: number): number;
        setInterval(handler: any, timeout?: any, ...args: any[]): number;
        setTimeout(handler: (...args: any[]) => void, timeout: number): number;
        setTimeout(handler: any, timeout?: any, ...args: any[]): number;
    }

    export interface ErrorEventInit {
        message?: string;
        filename?: string;
        lineno?: number;
        conlno?: number;
        error?: any;
    }

    export interface ImageBitmapOptions {
        imageOrientation?: "none" | "flipY";
        premultiplyAlpha?: "none" | "premultiply" | "default";
        colorSpaceConversion?: "none" | "default";
        resizeWidth?: number;
        resizeHeight?: number;
        resizeQuality?: "pixelated" | "low" | "medium" | "high";
    }

    export interface ImageBitmap {
        readonly width: number;
        readonly height: number;
        close(): void;
    }

    export interface URLSearchParams {
        /**
         * Appends a specified key/value pair as a new search parameter.
         */
        append(name: string, value: string): void;
        /**
         * Deletes the given search parameter, and its associated value, from the list of all search parameters.
         */
        delete(name: string): void;
        /**
         * Returns the first value associated to the given search parameter.
         */
        get(name: string): string | null;
        /**
         * Returns all the values association with a given search parameter.
         */
        getAll(name: string): string[];
        /**
         * Returns a Boolean indicating if such a search parameter exists.
         */
        has(name: string): boolean;
        /**
         * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
         */
        set(name: string, value: string): void;
    }

    export var URLSearchParams: {
        prototype: URLSearchParams;
        /**
         * Constructor returning a URLSearchParams object.
         */
        new(init?: string | URLSearchParams): URLSearchParams;
    };

    export interface BlobPropertyBag {
        type?: string;
        endings?: string;
    }

    export interface FilePropertyBag {
        type?: string;
        lastModified?: number;
    }

    export interface EventListenerObject {
        handleEvent(evt: Event): void;
    }

    export interface ProgressEventInit extends EventInit {
        lengthComputable?: boolean;
        loaded?: number;
        total?: number;
    }

    export interface IDBArrayKey extends Array<IDBValidKey> {
    }

    export interface RsaKeyGenParams extends Algorithm {
        modulusLength: number;
        publicExponent: Uint8Array;
    }

    export interface RsaHashedKeyGenParams extends RsaKeyGenParams {
        hash: AlgorithmIdentifier;
    }

    export interface RsaKeyAlgorithm extends KeyAlgorithm {
        modulusLength: number;
        publicExponent: Uint8Array;
    }

    export interface RsaHashedKeyAlgorithm extends RsaKeyAlgorithm {
        hash: AlgorithmIdentifier;
    }

    export interface RsaHashedImportParams {
        hash: AlgorithmIdentifier;
    }

    export interface RsaPssParams {
        saltLength: number;
    }

    export interface RsaOaepParams extends Algorithm {
        label?: BufferSource;
    }

    export interface EcdsaParams extends Algorithm {
        hash: AlgorithmIdentifier;
    }

    export interface EcKeyGenParams extends Algorithm {
        namedCurve: string;
    }

    export interface EcKeyAlgorithm extends KeyAlgorithm {
        typedCurve: string;
    }

    export interface EcKeyImportParams {
        namedCurve: string;
    }

    export interface EcdhKeyDeriveParams extends Algorithm {
        public: CryptoKey;
    }

    export interface AesCtrParams extends Algorithm {
        counter: BufferSource;
        length: number;
    }

    export interface AesKeyAlgorithm extends KeyAlgorithm {
        length: number;
    }

    export interface AesKeyGenParams extends Algorithm {
        length: number;
    }

    export interface AesDerivedKeyParams extends Algorithm {
        length: number;
    }

    export interface AesCbcParams extends Algorithm {
        iv: BufferSource;
    }

    export interface AesCmacParams extends Algorithm {
        length: number;
    }

    export interface AesGcmParams extends Algorithm {
        iv: BufferSource;
        additionalData?: BufferSource;
        tagLength?: number;
    }

    export interface AesCfbParams extends Algorithm {
        iv: BufferSource;
    }

    export interface HmacImportParams extends Algorithm {
        hash?: AlgorithmIdentifier;
        length?: number;
    }

    export interface HmacKeyAlgorithm extends KeyAlgorithm {
        hash: AlgorithmIdentifier;
        length: number;
    }

    export interface HmacKeyGenParams extends Algorithm {
        hash: AlgorithmIdentifier;
        length?: number;
    }

    export interface DhKeyGenParams extends Algorithm {
        prime: Uint8Array;
        generator: Uint8Array;
    }

    export interface DhKeyAlgorithm extends KeyAlgorithm {
        prime: Uint8Array;
        generator: Uint8Array;
    }

    export interface DhKeyDeriveParams extends Algorithm {
        public: CryptoKey;
    }

    export interface DhImportKeyParams extends Algorithm {
        prime: Uint8Array;
        generator: Uint8Array;
    }

    export interface ConcatParams extends Algorithm {
        hash?: AlgorithmIdentifier;
        algorithmId: Uint8Array;
        partyUInfo: Uint8Array;
        partyVInfo: Uint8Array;
        publicInfo?: Uint8Array;
        privateInfo?: Uint8Array;
    }

    export interface HkdfCtrParams extends Algorithm {
        hash: AlgorithmIdentifier;
        label: BufferSource;
        context: BufferSource;
    }

    export interface Pbkdf2Params extends Algorithm {
        salt: BufferSource;
        iterations: number;
        hash: AlgorithmIdentifier;
    }

    export interface RsaOtherPrimesInfo {
        r: string;
        d: string;
        t: string;
    }

    export interface JsonWebKey {
        kty: string;
        use?: string;
        key_ops?: string[];
        alg?: string;
        kid?: string;
        x5u?: string;
        x5c?: string;
        x5t?: string;
        ext?: boolean;
        crv?: string;
        x?: string;
        y?: string;
        d?: string;
        n?: string;
        e?: string;
        p?: string;
        q?: string;
        dp?: string;
        dq?: string;
        qi?: string;
        oth?: RsaOtherPrimesInfo[];
        k?: string;
    }

    export interface EventListenerOptions {
        capture?: boolean;
    }

    export interface AddEventListenerOptions extends EventListenerOptions {
        passive?: boolean;
        once?: boolean;
    }

    export type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

    export interface DecodeErrorCallback {
        (error: DOMException): void;
    }
    export interface DecodeSuccessCallback {
        (decodedData: AudioBuffer): void;
    }
    export interface ErrorEventHandler {
        (message: string, filename?: string, lineno?: number, colno?: number, error?: Error): void;
    }
    export interface ForEachCallback {
        (keyId: any, status: MediaKeyStatus): void;
    }
    export interface FunctionStringCallback {
        (data: string): void;
    }
    export interface NotificationPermissionCallback {
        (permission: NotificationPermission): void;
    }
    export interface PositionCallback {
        (position: Position): void;
    }
    export interface PositionErrorCallback {
        (error: PositionError): void;
    }
    export var onmessage: (this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any;
    export function close(): void;
    export function postMessage(message: any, transfer?: any[]): void;
    export var caches: CacheStorage;
    export var isSecureContext: boolean;
    export var location: WorkerLocation;
    export var onerror: (this: DedicatedWorkerGlobalScope, ev: ErrorEvent) => any;
    export var performance: Performance;
    export var self: WorkerGlobalScope;
    export function msWriteProfilerMark(profilerMarkName: string): void;
    export function createImageBitmap(image: ImageBitmap | ImageData | Blob, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    export function createImageBitmap(image: ImageBitmap | ImageData | Blob, sx: number, sy: number, sw: number, sh: number, options?: ImageBitmapOptions): Promise<ImageBitmap>;
    export function dispatchEvent(evt: Event): boolean;
    export function removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    export var indexedDB: IDBFactory;
    export var msIndexedDB: IDBFactory;
    export var navigator: WorkerNavigator;
    export function clearImmediate(handle: number): void;
    export function clearInterval(handle: number): void;
    export function clearTimeout(handle: number): void;
    export function importScripts(...urls: string[]): void;
    export function setImmediate(handler: (...args: any[]) => void): number;
    export function setImmediate(handler: any, ...args: any[]): number;
    export function setInterval(handler: (...args: any[]) => void, timeout: number): number;
    export function setInterval(handler: any, timeout?: any, ...args: any[]): number;
    export function setTimeout(handler: (...args: any[]) => void, timeout: number): number;
    export function setTimeout(handler: any, timeout?: any, ...args: any[]): number;
    export function atob(encodedString: string): string;
    export function btoa(rawString: string): string;
    export var console: Console;
    export function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
    export function dispatchEvent(evt: Event): boolean;
    export function removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    export function addEventListener<K extends keyof DedicatedWorkerGlobalScopeEventMap>(type: K, listener: (this: DedicatedWorkerGlobalScope, ev: DedicatedWorkerGlobalScopeEventMap[K]) => any, useCapture?: boolean): void;
    export function addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;

    export type AlgorithmIdentifier = string | Algorithm;
    export type BodyInit = any;
    export type IDBKeyPath = string;
    export type RequestInfo = Request | string;
    export type USVString = string;
    export type IDBValidKey = number | string | Date | IDBArrayKey;
    export type BufferSource = ArrayBuffer | ArrayBufferView;
    export type FormDataEntryValue = string | File;
    export type IDBCursorDirection = "next" | "nextunique" | "prev" | "prevunique";
    export type IDBRequestReadyState = "pending" | "done";
    export type IDBTransactionMode = "readonly" | "readwrite" | "versionchange";
    export type MediaKeyStatus = "usable" | "expired" | "output-downscaled" | "output-not-allowed" | "status-pending" | "internal-error";
    export type NotificationDirection = "auto" | "ltr" | "rtl";
    export type NotificationPermission = "default" | "denied" | "granted";
    export type PushEncryptionKeyName = "p256dh" | "auth";
    export type PushPermissionState = "granted" | "denied" | "prompt";
    export type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin-only" | "origin-when-cross-origin" | "unsafe-url";
    export type RequestCache = "default" | "no-store" | "reload" | "no-cache" | "force-cache";
    export type RequestCredentials = "omit" | "same-origin" | "include";
    export type RequestDestination = "" | "document" | "sharedworker" | "subresource" | "unknown" | "worker";
    export type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors";
    export type RequestRedirect = "follow" | "error" | "manual";
    export type RequestType = "" | "audio" | "font" | "image" | "script" | "style" | "track" | "video";
    export type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
    export type ServiceWorkerState = "installing" | "installed" | "activating" | "activated" | "redundant";
    export type VisibilityState = "hidden" | "visible" | "prerender" | "unloaded";
    export type XMLHttpRequestResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text";
    export type ClientType = "window" | "worker" | "sharedworker" | "all";
    export type FrameType = "auxiliary" | "top-level" | "nested" | "none";
}

// Regex Used to convert: (interface[^\r]*\r\n(?:[^}]*\r\n)*};?\r\n)
// TODO: Share this file with others. ;)