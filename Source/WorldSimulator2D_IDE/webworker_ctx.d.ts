interface EventTarget {
    addEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

//declare var EventTarget: {
//    prototype: EventTarget;
//    new(): EventTarget;
//};

interface WindowBase64 {
    atob(encodedString: string): string;
    btoa(rawString: string): string;
}

interface WorkerGlobalScopeEventMap {
    "error": ErrorEvent;
}

interface WorkerGlobalScope extends EventTarget, WorkerUtils, WindowConsole, GlobalFetch {
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

interface WorkerLocation {
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

declare var WorkerLocation: {
    prototype: WorkerLocation;
    new(): WorkerLocation;
};

interface WorkerNavigator extends Object, NavigatorID, NavigatorOnLine, NavigatorBeacon, NavigatorConcurrentHardware {
    readonly hardwareConcurrency: number;
}

declare var WorkerNavigator: {
    prototype: WorkerNavigator;
    new(): WorkerNavigator;
};

interface WorkerUtils extends Object, WindowBase64 {
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

declare function postMessage(message: any, transfer?: any[]): void;
