interface Number {
    isInteger(x: number): boolean;
}
interface Math {
    sign(x: number): number;
}
declare namespace WorldSimulator2D {
    interface IIndexableObject {
        [index: string]: any;
    }
    module NativeTypes {
        interface IFunction extends Function {
        }
        interface IObject extends Object, IIndexableObject {
        }
        interface IArray<T> extends Array<T> {
        }
        interface IString extends String {
        }
        interface INumber extends Number {
        }
        interface IBoolean extends Boolean {
        }
        interface IRegExp extends RegExp {
        }
        interface IDate extends Date {
        }
        interface IIMath extends Math {
        }
        interface IError extends Error {
        }
        interface IXMLHttpRequest extends XMLHttpRequest {
        }
        interface IHTMLElement extends HTMLElement {
        }
        interface IWindow extends Window {
        }
    }
    module NativeStaticTypes {
        var StaticFunction: FunctionConstructor;
        var StaticObject: ObjectConstructor;
        var StaticArray: ArrayConstructor;
        var StaticString: StringConstructor;
        var StaticNumber: NumberConstructor;
        var StaticBoolean: BooleanConstructor;
        var StaticRegExp: RegExpConstructor;
        var StaticDate: DateConstructor;
        var StaticMath: typeof Math;
        var StaticError: ErrorConstructor;
        var StaticXMLHttpRequest: typeof XMLHttpRequest;
        var StaticHTMLElement: typeof HTMLElement;
        var StaticWindow: typeof Window;
    }
    interface IStaticGlobals extends Window {
        [index: string]: any;
        Function: typeof NativeStaticTypes.StaticFunction;
        Object: typeof NativeStaticTypes.StaticObject;
        Array: typeof NativeStaticTypes.StaticArray;
        String: typeof NativeStaticTypes.StaticString;
        Number: typeof NativeStaticTypes.StaticNumber;
        Boolean: typeof NativeStaticTypes.StaticBoolean;
        RegExp: typeof NativeStaticTypes.StaticRegExp;
        Date: typeof NativeStaticTypes.StaticDate;
        Math: typeof NativeStaticTypes.StaticMath;
        Error: typeof NativeStaticTypes.StaticError;
        XMLHttpRequest: typeof NativeStaticTypes.StaticXMLHttpRequest;
        HTMLElement: typeof NativeStaticTypes.StaticHTMLElement;
        Window: typeof NativeStaticTypes.StaticWindow;
    }
    /** A simple type that allows adding a 'count' property to arrays to use 'length' as the capacity, while allowing to manually added to index [count-1]. */
    interface IArrayBuffer<T> extends Array<T> {
        /** Number of items in the array (can be less than total array capacity [length]). */
        count: number;
        /** The capacity of this array.  Set the length the initial capacity and use the 'count' property ('count++') to add
        * items to the end. There are some things to consider when adding or removing items within this array:
        * 1. To remove an item from the end simply do '--count'. The overall benefit is fast adding and removing items from the
        * end (LIFO) without causing the array to resize as items are removed.
        * 2. Any items removed before the end via 'splice()' must still remember to do '--count' as well.
        * 3. Any items inserted (before or at end) must remember to do '++count'. Add the last item using '[count++]=item'.
        */
        length: number;
    }
    /**
     * Create a new IArrayBuffer<T> instance.
     */
    function createArrayBuffer<T = number>(): IArrayBuffer<T>;
    /** A simple strongly-typed array that allows adding a 'count' property so that 'length' can be used as the capacity while allowing to manually added to index [count-1]. */
    interface IFloat32ArrayBuffer extends Float32Array {
        /** Number of items in the array (can be less than total array capacity [length]). */
        count: number;
        /** The capacity of this array.  Fixed arrays cannot change length.
        */
        length: number;
    }
    /** Create a new IFloat32ArrayBuffer instance. */
    function createFloat32ArrayBuffer(length: number): IFloat32ArrayBuffer;
    /** Create a new IFloat32ArrayBuffer instance. */
    function createFloat32ArrayBuffer(array: ArrayLike<number>): IFloat32ArrayBuffer;
    /** Create a new IFloat32ArrayBuffer instance. */
    function createFloat32ArrayBuffer(buffer: ArrayBufferLike, byteOffset?: number, length?: number): IFloat32ArrayBuffer;
    /** A reference to the host's global environment (convenient for nested TypeScript code, or when using strict mode [where this=undefined]).
    * This provides a faster, cleaner, consistent, and reliable method of referencing the global environment scope without having to resort to workarounds.
    */
    var global: IStaticGlobals;
    /** A constant value for 'undefined' (eg. if (typeof value == UNDEFINED)...). */
    const UNDEFINED = "undefined";
    /** A constant value for 'function' (eg. if (typeof value == FUNCTION)...). */
    const FUNCTION = "function";
    /** A constant value for 'object' (eg. if (typeof value == OBJECT)...). */
    const OBJECT = "object";
    /** A constant value for 'string' (eg. if (typeof value == STRING)...). */
    const STRING = "string";
    /** A constant value for 'number' (eg. if (typeof value == NUMBER)...). */
    const NUMBER = "number";
    /** A constant value for 'boolean' (eg. if (typeof value == BOOLEAN)...). */
    const BOOLEAN = "boolean";
    /** The root namespace name as the string constant. */
    const ROOT_NAMESPACE = "WorldSimulator2D";
    /** A simple function that does nothing (no operation).
    * This is used to clear certain function properties to prevent being called again.
    */
    function noop(): void;
    /**
     * Evaluates a string within a Function scope at the GLOBAL level. This is more secure for executing scripts without exposing
     * private/protected variables wrapped in closures.
     */
    function safeEval(x: string, ...args: any[]): any;
    /**
     * Evaluates a string directly at the GLOBAL level. This is more secure for executing scripts without exposing
     * private/protected variables wrapped in closures.
     */
    function globalEval(x: string, ...args: any[]): any;
    var FUNC_NAME_REGEX: RegExp;
    /** Attempts to pull the function name from the function text, and returns 'undefined' for anonymous functions. */
    function getFunctionName(func: Function): string;
    /** This locates names of properties where only a reference and the object context is known.
    * If a reference match is found, the property name is returned, otherwise the result is 'undefined'.
    */
    function getReferenceName(obj: {}, reference: object): string;
    /** Erases all properties on the object, instead of deleting them (which takes longer).
    * @param {boolean} release If false, then care is taken not to erase any object property that contains a 'dispose()' function.
    * If true (default) then such objects are also disposed.
    */
    function erase(obj: {}, release?: boolean): {};
    /** Makes a deep copy of the specified value and returns it. If the value is not an object, it is returned immediately.
    * For objects, the deep copy is made by */
    function clone(value: any): any;
    /** Dereferences a property path in the form "A.B.C[*].D..." and returns the right most property value, if exists, otherwise
    * 'undefined' is returned.  If path is invalid, an exception will be thrown.
    * @param {string} path The delimited property path to parse.
    * @param {object} origin The object to begin dereferencing with.  If this is null or undefined then it defaults to the global scope.
    * @param {boolean} unsafe If false (default) a fast algorithm is used to parse the path.  If true, then the expression is evaluated at the host global scope (faster).
    *                         The reason for the option is that 'eval' is up to 4x faster, and is best used only if the path is guaranteed not to contain user entered
    *                         values, or ANY text transmitted insecurely.
    *                         Note: The 'eval' used is 'WorldSimulator2D.eval()', which is closed over the global scope (and not the WorldSimulator2D namespace's private scope).
    *                         'window.eval()' is not called directly in this function.
    */
    function dereferencePropertyPath(path: string, origin?: {}, unsafe?: boolean): {};
    /** Waits until a property of an object becomes available (i.e. is no longer 'undefined').
      * @param {Object} obj The object for the property.
      * @param {string} propertyName The object property.
      * @param {number} timeout The general amount of timeout to wait before failing, or a negative value to wait indefinitely.
      */
    function waitReady(obj: {}, propertyName: string, callback: Function, timeout?: number, timeoutCallback?: Function): void;
    /** Helps support cases where 'apply' is missing for a host function object (i.e. IE7 'setTimeout', etc.).  This function
    * will attempt to call '.apply()' on the specified function, and fall back to a work around if missing.
    * @param {Function} func The function to call '.apply()' on.
    * @param {Object} _this The calling object, which is the 'this' reference in the called function (the 'func' argument).
    * Note: This must be null for special host functions, such as 'setTimeout' in IE7.
    * @param {any} args The arguments to apply to given function reference (the 'func' argument).
    */
    function apply(func: Function, _this: NativeTypes.IObject, args: any[]): any;
    /** Creates and returns a new version-4 (randomized) GUID/UUID (unique identifier). The uniqueness of the result
      * is enforced by locking the first part down to the current local date/time (not UTC) in milliseconds, along with
      * a counter value in case of fast repetitive calls. The rest of the ID is also randomized with the current local
      * time, along with a checksum of the browser's "agent" string and the current document URL.
      * This function is also supported server side; however, the "agent" string and document location are fixed values.
      */
    function createGUID(hyphens?: boolean): string;
    /** Returns the type name for an object instance registered with 'AppDomain.registerType()'.  If the object does not have
    * type information, and the object is a function, then an attempt is made to pull the function name (if one exists).
    * Note: This function returns the type name ONLY (not the FULL type name [no namespace path]).
    * Note: The name will be undefined if a type name cannot be determined.
    * @param {object} obj The object to determine a type name for.  If the object type was not registered using 'AppDomain.registerType()',
    * and the object is not a function, no type information will be available. Unregistered function objects simply
    * return the function's name.
    * @param {boolean} cacheTypeName (optional) If true (default), the name is cached using the 'ITypeInfo' interface via the '$__name' property.
    * This helps to speed up future calls.
    */
    function getTypeName(obj: object, cacheTypeName?: boolean): string;
    /**
     * Sets a type name for an function or object constructor.
     * @param obj The object to set a name for.
     * @param name The type name to use.  If not specified, the type name is detected based on the function or constructor function name.
     */
    function setTypeName(obj: object, name?: string): string;
    /** Returns true if the given object is empty, or an invalid value (eg. NaN, or an empty object, array, or string). */
    function isEmpty(obj: any): boolean;
    /** Converts Celsius to Kelvins. */
    function celsiusToKelvins(c: number): number;
    /** Converts Fahrenheit to Celsius. */
    function fahrenheitToCelsius(f: number): number;
    /**
    * Returns the weight of a single atom based on an atomic weight.
    * @param w Atomic weight (typically taken from the periodic table of elements).
    */
    function atomicWeightToAtomWeight(w: number): number;
    /**
    * Converts the atomic weight to kilograms.
    * @param w Atomic weight (typically taken from the periodic table of elements).
    */
    function atomicWeightToKg(w: number): number;
    function distance2D(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * A regex used to parse names, comments, strings, and symbols.  Used by 'compile()'.
     */
    const jsParseRegex: RegExp;
    interface IInlineInfo {
        funcName: string;
        inlineCode: string;
        varsFound: string[];
        params: string[];
        returnVarName: string;
    }
    class Scope {
        functionName: string;
        paramsFound: string[];
        varsFound: string[];
        isFunctionRootLevel: boolean;
        varMode: number;
        functionMode: number;
        superProtoMode: number;
        superStartIndex: number;
        previousLineInsertIndex: number;
        currentInline: IInlineInfo;
        braceCount: number;
        bracketCount: number;
        squareBacketCount: number;
        forMode: number;
    }
    /**
     * In-lines a function (function keyword, parameters, and body) and returns it as a block scope with 'let' vars are the root.
     * Note: The syntax is only checked in areas required for this function;  No other errors are looked for.
     * @param funcStr A function to convert into an in-line block (using 'let's at the root scope only). The string should include the whole function declaration (not just the body).
     * @returns An object with the in-line code and list of parameter vars to set when inserting to replace calls.
     */
    function inlineFunction(funcStr: string | Function, inlineFuncName?: string, ...superCallDetails: IInlineInfo[]): IInlineInfo;
    /**
     * In-lines all the overridden methods that use 'super' to continue calls to the base level.
     * After calling this, by default, the function in the prototype of the specified object is replaced with in inline version, which is many times faster.
     * @param type The object to in-line functions for.
     * @param funcOrName The function to inline.
     */
    function compile(type: {
        new (...args: any[]): any;
        prototype: {};
    }, funcOrName: Function | string, replace?: boolean): Function;
    function isTypedArray(a: any): boolean;
    /**
     * Queues a handler function to be called with as close to 0 delay as possible.
     * Use 'clearImmediate()' to remove a queued handler.
     */
    function setImmediate(handler: Function, ...args: any[]): number;
    /**
     * Clears a function queued by calling 'setImmediate()'.
     */
    function clearImmediate(handle: number): void;
    namespace InternalUtilities {
        function doEnumReverseMapping(enumObject: {}): void;
    }
    /**
     * Copies an array using the fastest technique possible that consistently works best across most browsers.
     * This is especially faster than 'slice()' in FireFox and IE.
     */
    function copyArray<T>(a: T[]): T[];
    /**
     * Gets name values from an enum object in ascending numerical value order and returns the names as an array of strings.
     * @param enumRef A reference to the enum object.
     * @param except A list of names to exclude from the list.
     */
    function getEnumNames(enumRef: {}, ...except: string[]): string[];
}
