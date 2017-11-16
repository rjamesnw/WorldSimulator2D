﻿// ============================================================================================================================
// Some polyfills needed

if (!Number['isInteger']) // (for GPU.JS)
    Number['isInteger'] = Number['isInteger'] || function (value: any) {
        return typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value;
    };
interface Number {
    isInteger(x: number): boolean;
}

if (!Math['sign'])
    Math['sign'] = function (x: number): number {
        // If x is NaN, the result is NaN.
        // If x is -0, the result is -0.
        // If x is +0, the result is +0.
        // If x is negative and not -0, the result is -1.
        // If x is positive and not +0, the result is +1.
        return (<any>(x > 0) - <any>(x < 0)) || +x;
        // A more aesthetical persuado-representation is shown below
        //
        // ( (x > 0) ? 0 : 1 )  // if x is negative then negative one
        //          +           // else (because you cant be both - and +)
        // ( (x < 0) ? 0 : -1 ) // if x is positive then positive one
        //         ||           // if x is 0, -0, or NaN, or not a number,
        //         +x           // Then the result will be x, (or) if x is
        //                      // not a number, then x converts to number
    };
interface Math {
    sign(x: number): number;
}

// ============================================================================================================================

namespace WorldSimulator2D {
    // =======================================================================================================================
    // Integrate native types

    export interface IIndexableObject { [index: string]: any }

    export declare module NativeTypes {
        export interface IFunction extends Function { }
        export interface IObject extends Object, IIndexableObject { }
        export interface IArray<T> extends Array<T> { }
        export interface IString extends String { }
        export interface INumber extends Number { }
        export interface IBoolean extends Boolean { }
        export interface IRegExp extends RegExp { }
        export interface IDate extends Date { }
        export interface IIMath extends Math { }
        export interface IError extends Error { }
        export interface IXMLHttpRequest extends XMLHttpRequest { }
        export interface IHTMLElement extends HTMLElement { }
        export interface IWindow extends Window { }
    }

    export declare module NativeStaticTypes {
        export var StaticFunction: FunctionConstructor;
        export var StaticObject: ObjectConstructor;
        export var StaticArray: ArrayConstructor;
        export var StaticString: StringConstructor;
        export var StaticNumber: NumberConstructor;
        export var StaticBoolean: BooleanConstructor;
        export var StaticRegExp: RegExpConstructor;
        export var StaticDate: DateConstructor;
        export var StaticMath: typeof Math;
        export var StaticError: ErrorConstructor;
        export var StaticXMLHttpRequest: typeof XMLHttpRequest;
        export var StaticHTMLElement: typeof HTMLElement;
        export var StaticWindow: typeof Window;
    }

    export interface IStaticGlobals extends Window {
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
    export interface IArrayBuffer<T> extends Array<T> {
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
    export function createArrayBuffer<T = number>() {
        var a: IArrayBuffer<T> = <any>[];
        a.count = 0;
        return a;
    }

    /** A simple strongly-typed array that allows adding a 'count' property so that 'length' can be used as the capacity while allowing to manually added to index [count-1]. */
    export interface IFloat32ArrayBuffer extends Float32Array {
        /** Number of items in the array (can be less than total array capacity [length]). */
        count: number;
        /** The capacity of this array.  Fixed arrays cannot change length.
        */
        length: number;
    }

    /** Create a new IFloat32ArrayBuffer instance. */
    export function createFloat32ArrayBuffer(length: number): IFloat32ArrayBuffer;
    /** Create a new IFloat32ArrayBuffer instance. */
    export function createFloat32ArrayBuffer(array: ArrayLike<number>): IFloat32ArrayBuffer;
    /** Create a new IFloat32ArrayBuffer instance. */
    export function createFloat32ArrayBuffer(buffer: ArrayBufferLike, byteOffset?: number, length?: number): IFloat32ArrayBuffer;
    export function createFloat32ArrayBuffer() {
        var a: IFloat32ArrayBuffer = <any>(arguments.length == 1 ? new Float32Array(arguments[0]) : new Float32Array(arguments[0], arguments[1], arguments[2]));
        a.count = 0;
        return a;
    }

    /** A reference to the host's global environment (convenient for nested TypeScript code, or when using strict mode [where this=undefined]).
    * This provides a faster, cleaner, consistent, and reliable method of referencing the global environment scope without having to resort to workarounds.
    */
    export var global: IStaticGlobals = (function () { return function () { }.constructor("return this"); })(); // (note: this is named as 'global' to support the NodeJS "global" object as well [for compatibility, or to ease portability])

    // =======================================================================================================================
    // TODO: Test if this actually impedes performance.
    /** A constant value for 'undefined' (eg. if (typeof value == UNDEFINED)...). */
    export const UNDEFINED = 'undefined';
    /** A constant value for 'function' (eg. if (typeof value == FUNCTION)...). */
    export const FUNCTION = 'function';
    /** A constant value for 'object' (eg. if (typeof value == OBJECT)...). */
    export const OBJECT = 'object';
    /** A constant value for 'string' (eg. if (typeof value == STRING)...). */
    export const STRING = 'string';
    /** A constant value for 'number' (eg. if (typeof value == NUMBER)...). */
    export const NUMBER = 'number';
    /** A constant value for 'boolean' (eg. if (typeof value == BOOLEAN)...). */
    export const BOOLEAN = 'boolean';

    /** The root namespace name as the string constant. */
    export const ROOT_NAMESPACE = "WorldSimulator2D";

    /** A simple function that does nothing (no operation).
    * This is used to clear certain function properties to prevent being called again.
    */
    export function noop(): void { }

    /**
     * Evaluates a string within a Function scope at the GLOBAL level. This is more secure for executing scripts without exposing
     * private/protected variables wrapped in closures.
     */
    export declare function safeEval(x: string, ...args: any[]): any;

    /**
     * Evaluates a string directly at the GLOBAL level. This is more secure for executing scripts without exposing
     * private/protected variables wrapped in closures.
     */
    export declare function globalEval(x: string, ...args: any[]): any;

    // ========================================================================================================================

    export var FUNC_NAME_REGEX = /^function\s*(\S+)\s*\(/i; // (note: never use the 'g' flag here, or '{regex}.exec()' will only work once every two calls [attempts to traverse])

    /** Attempts to pull the function name from the function text, and returns 'undefined' for anonymous functions. */
    export function getFunctionName(func: Function): string {
        var name = func['name']; // try the build-in way; usually supported)
        if (name == void 0) {
            // ... try to 
            var fstr = func.toString();
            var results = (FUNC_NAME_REGEX).exec(fstr); // (note: for function expression object contexts, the constructor (type) name is always 'Function')
            name = (results && results.length > 1) ? results[1] : "";
        }
        return name;

    }

    // ========================================================================================================================

    /** This locates names of properties where only a reference and the object context is known.
    * If a reference match is found, the property name is returned, otherwise the result is 'undefined'.
    */
    export function getReferenceName(obj: {}, reference: object): string {
        for (var p in obj)
            if (obj[p] === reference) return p;
        return UNDEFINED;
    }

    // ========================================================================================================================

    /** Erases all properties on the object, instead of deleting them (which takes longer).
    * @param {boolean} release If false, then care is taken not to erase any object property that contains a 'dispose()' function.
    * If true (default) then such objects are also disposed.
    */
    export function erase(obj: {}, release = true): {} {
        for (var p in obj)
            if ((p != "__proto__" && p != 'constructor' && <NativeTypes.IObject>obj).hasOwnProperty(p)) {
                var hasDispose = typeof obj[p] == OBJECT && typeof (<IDisposable>obj[p]).dispose == FUNCTION;
                if (release && hasDispose)
                    (<IDisposable>obj[p]).dispose();
                else if (!hasDispose)
                    obj[p] = void 0;
            }
        return obj;
    }

    /** Makes a deep copy of the specified value and returns it. If the value is not an object, it is returned immediately.
    * For objects, the deep copy is made by */
    export function clone(value: any) {
        if (typeof value !== 'object') return value;
        var newObject: {}, p: string, rcCount: number, v: any;
        if (clone.arguments.length > 1) {
            rcCount = clone.arguments[clone.arguments.length - 1];
            if (value['@__recursiveCheck'] === rcCount) return value; // (this object has already been cloned for this request, which makes it a cyclical reference, so skip)
        }
        else rcCount = (value['@__recursiveCheck'] || 0) + 1; // (initially, rcCount will be set to the root __recursiveCheck value, +1, rather than re-creating all properties over and over for each clone request [much faster]) 
        value['@__recursiveCheck'] = rcCount;
        newObject = {};
        for (p in value) { // (note: not using "hasOwnProperty()" here because replicating any inheritance is not supported (nor usually needed), so all properties will be flattened for the new object instance)
            v = value[p];
            if (typeof v !== 'object')
                newObject[p] = v; // (faster to test and set than to call a function)
            else
                newObject[p] = (<Function>clone)(v, rcCount);
        }
        return newObject;
    };

    // ========================================================================================================================

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
    export function dereferencePropertyPath(path: string, origin?: {}, unsafe = false): {} {
        if (unsafe) return safeEval('p1.' + path, origin); // (note: this is 'WorldSimulator2D.eval()', not a direct call to the global 'eval()')
        if (origin === void 0 || origin === null) origin = this !== global ? this : global;
        if (typeof path !== 'string') path = '' + path;
        var o = origin, c = '', pc: string, i = 0, n = path.length, name = '';
        if (n)
            ((c = path[i++]) == '.' || c == '[' || c == ']' || c == void 0)
                ? (name ? <any>(o = o[name], name = '') : <any>(pc == '.' || pc == '[' || pc == ']' && c == ']' ? i = n + 2 : void 0), pc = c)
                : name += c;
        if (i == n + 2) throw this.error("Invalid path: " + path);
        return o;
    } // (performance: http://jsperf.com/ways-to-dereference-a-delimited-property-string)

    // ========================================================================================================================

    /** Waits until a property of an object becomes available (i.e. is no longer 'undefined').
      * @param {Object} obj The object for the property.
      * @param {string} propertyName The object property.
      * @param {number} timeout The general amount of timeout to wait before failing, or a negative value to wait indefinitely.
      */
    export function waitReady(obj: {}, propertyName: string, callback: Function, timeout: number = 60000, timeoutCallback?: Function) {
        if (!callback) throw "'callback' is required.";
        if (!obj) throw "'obj' is required.";
        if (obj[propertyName] !== void 0)
            callback();
        else {
            if (timeout != 0) {
                if (timeout > 0) timeout--;
                setTimeout(() => {
                    waitReady(obj, propertyName, callback);
                }, 1);
            }
            else if (timeoutCallback)
                timeoutCallback();
        }
    }

    // ========================================================================================================================

    /** Helps support cases where 'apply' is missing for a host function object (i.e. IE7 'setTimeout', etc.).  This function
    * will attempt to call '.apply()' on the specified function, and fall back to a work around if missing.
    * @param {Function} func The function to call '.apply()' on.
    * @param {Object} _this The calling object, which is the 'this' reference in the called function (the 'func' argument).
    * Note: This must be null for special host functions, such as 'setTimeout' in IE7.
    * @param {any} args The arguments to apply to given function reference (the 'func' argument).
    */
    export function apply(func: Function, _this: NativeTypes.IObject, args: any[]): any {
        if (func.apply) {
            return func.apply(_this, args);
        } else {
            return Function.prototype.apply.apply(func, [_this, args]);
        }
    }

    // ========================================================================================================================

    var _guidSeed = (function () { // (used in 'createGUID()')
        var text = navigator.userAgent + location.href; // TODO: This may need fixing on the server side.
        for (var i = 0, n = text.length, randseed = 0; i < n; ++i)
            randseed += navigator.userAgent.charCodeAt(i);
        return randseed;
    })();

    var _guidCounter = 0;

    /** Creates and returns a new version-4 (randomized) GUID/UUID (unique identifier). The uniqueness of the result 
      * is enforced by locking the first part down to the current local date/time (not UTC) in milliseconds, along with
      * a counter value in case of fast repetitive calls. The rest of the ID is also randomized with the current local
      * time, along with a checksum of the browser's "agent" string and the current document URL.
      * This function is also supported server side; however, the "agent" string and document location are fixed values.
      */
    export function createGUID(hyphens: boolean = true): string {
        var time = (Date.now ? Date.now() : new Date().getTime()) + (new Date()).getTimezoneOffset(); // (use current local time [not UTC] to offset the random number [there was a bug in Chrome, not sure if it was fixed yet])
        var randseed = time + _guidSeed;
        var hexTime = time.toString(16) + (_guidCounter <= 0xffffffff ? _guidCounter++ : _guidCounter = 0).toString(16), i = hexTime.length, pi = 0;
        var pattern = hyphens ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx', len = pattern.length, result = "", c: string, r: number;
        while (pi < len)
            c = pattern[pi++], result += c != 'x' && c != 'y' ? c : i > 0 ? hexTime[--i] : (r = Math.random() * randseed % 16 | 0, c == 'x' ? r : r & 0x3 | 0x8).toString(16);
        return result;
    }

    // ========================================================================================================================

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
    export function getTypeName(obj: object, cacheTypeName = true): string {
        if (obj === void 0 || obj === null) return void 0;

        var typeFunc = typeof obj == FUNCTION ? obj : typeof obj == OBJECT ? obj.constructor : void 0;

        if (!typeFunc) return void 0;

        var typename = typeFunc['$__name']; // (get function name)

        if (typename)
            return typename;
        else
            if (cacheTypeName) {
                var name = getFunctionName(obj as Function);
                if (name) setTypeName(obj, name); // (cache the name for faster lookup in the future and return the extracted function name; MUST NOT BE EMPTY or a cyclical error will occur)
                return name;
            } else
                return getFunctionName(obj as Function); // (return extracted function name without caching it)
    }

    /**
     * Sets a type name for an function or object constructor.
     * @param obj The object to set a name for.
     * @param name The type name to use.  If not specified, the type name is detected based on the function or constructor function name.
     */
    export function setTypeName(obj: object, name?: string): string {
        if (obj === void 0 || obj === null)
            throw this.error("'obj' parameter is required.");

        if (!name)
            return getTypeName(obj);

        var typeFunc = typeof obj == FUNCTION ? obj : typeof obj == OBJECT ? obj.constructor : null;

        return typeFunc['$__name'] = name;
    }

    /** Returns true if the given object is empty, or an invalid value (eg. NaN, or an empty object, array, or string). */
    export function isEmpty(obj: any): boolean {
        if (obj === void 0 || obj === null) return true;
        // (note 'DontEnum flag' enumeration bug in IE<9 [on toString, valueOf, etc.])
        if (typeof obj == STRING || Array.isArray(obj)) return !obj.length;
        if (typeof obj != OBJECT) return isNaN(obj);
        for (var key in obj)
            if (global.Object.prototype.hasOwnProperty.call(obj, key)) return false;
        return true;
    }

    // =======================================================================================================================
    // Atomic Weights = Number of grams per 1 mole (6.02214179*10^23 atoms).

    /** Converts Celsius to Kelvins. */
    export function celsiusToKelvins(c: number) { return c + 273.15; }


    /** Converts Fahrenheit to Celsius. */
    export function fahrenheitToCelsius(f: number) { return (f - 32) * 5 / 9; }

    /**
    * Returns the weight of a single atom based on an atomic weight.
    * @param w Atomic weight (typically taken from the periodic table of elements).
    */
    export function atomicWeightToAtomWeight(w: number) { return w / (6.02214179 * 100000000000000000000); }

    /**
    * Converts the atomic weight to kilograms.
    * @param w Atomic weight (typically taken from the periodic table of elements).
    */
    export function atomicWeightToKg(w: number) { return w * 1000; } // (just convert from grams to kilograms)

    // =======================================================================================================================

    export function distance2D(x1: number, y1: number, x2: number, y2: number): number {
        // ... use 2D distance formula that works with very large numbers (source: https://goo.gl/b7zwN5) ...
        var dx = x2 - x1, dy = y2 - y1;
        var absdx = dx < 0 ? -dx : dx, absdy = dy < 0 ? -dy : dy;
        var max = absdx > absdy ? absdx : absdy, min = absdx < absdy ? absdx : absdy;
        var r = min / max
        return max * Math.sqrt(1 + r * r)
    }

    // =======================================================================================================================

    /**
     * A regex used to parse names, comments, strings, and symbols.  Used by 'compile()'.
     */
    export const jsParseRegex = /\s+|\/\/.*|\/[\*]+[^*]*?\*\/|"(?:\\.|[^"])*?"|\d+(?:\.\d*)?(?:e\d*)?|[$_A-Za-z]+[$_A-Za-z0-9]*|\S/g;

    var _inlineNameCounter = 0;

    export interface IInlineInfo { funcName: string, inlineCode: string, varsFound: string[], params: string[], returnVarName: string }

    export class Scope {
        functionName = ""; // (function name for this scope)
        paramsFound: string[] = [];
        varsFound: string[] = [];
        isFunctionRootLevel = false;
        varMode = 0; // (1 = get ident, 2 = get comma or semicolon)
        functionMode = 0; // (1 = get func name, 2 = get left bracket for params, 3 = get param name or close bracket, 4 = get next param or close bracket, 5 = get left brace [start block])
        superProtoMode = 0; // (1 = '_super' found, get dot next, 2 = dot found, get  'prototype', 3 = 'prototype' found, get dot, 4 = dot found, get func name)
        superStartIndex = -1;
        previousLineInsertIndex = 0; // (this is place where a "previous" line can be inserted before the current one)
        currentInline: IInlineInfo;
        braceCount = 0;
        bracketCount = 0;
        squareBacketCount = 0;
        forMode = 0;
    }

    /**
     * In-lines a function (function keyword, parameters, and body) and returns it as a block scope with 'let' vars are the root.
     * Note: The syntax is only checked in areas required for this function;  No other errors are looked for.
     * @param funcStr A function to convert into an in-line block (using 'let's at the root scope only). The string should include the whole function declaration (not just the body).
     * @returns An object with the in-line code and list of parameter vars to set when inserting to replace calls.
     */
    export function inlineFunction(funcStr: string | Function, inlineFuncName = "", ...superCallDetails: IInlineInfo[]): IInlineInfo {
        if (funcStr === void 0 || funcStr === null) funcStr = "";
        if (typeof funcStr != 'string') funcStr = '' + funcStr;
        var parts = funcStr.match(jsParseRegex) || [], inlineFuncPrefix = "$__inlined", newBody = "", returnVarName = "";
        var scopes: Scope[] = [new Scope()]; // (all scopes reached for every brace)
        var scopeIndex = 0;
        var functionScopes: Scope[] = []; // (scopes for function levels only)
        var functionScopeIndex = -1;
        function error(msg: string) {
            throw new Error(msg + " (" + i + ": " + part + "):\r\n" + funcStr)
        }
        function getInlineInfo(funcName: string): IInlineInfo {
            if (superCallDetails) {
                for (var i = 0, n = superCallDetails.length; i < n; ++i)
                    if (superCallDetails[i] && superCallDetails[i].funcName == funcName)
                        return superCallDetails[i];
            } else return void 0;
        }
        for (var i = 0, n = parts.length; i < n; ++i) {
            var part = parts[i];
            var scope = scopes[scopeIndex];
            var funcScope: Scope = functionScopes[functionScopeIndex] || <any>{};
            switch (part) {
                case "{":
                    if (!funcScope) error("Cannot have braces outside the function being inlined");
                    ++funcScope.braceCount;
                    scope.previousLineInsertIndex = newBody.length + 1; // TODO: Not accurate for object literals as expressions.
                    if (funcScope.functionMode == 0 || funcScope.functionMode === void 0) scopes[++scopeIndex] = scope = new Scope(); // (only push a scope if the start of a block that was not start using the 'function' keyword, which already starts the function block)
                    else if (funcScope.functionMode == 1 || funcScope.functionMode == 2) error("Function is missing parameter brackets");
                    else if (funcScope.functionMode == 3) error("Function is missing a parameter name");
                    else if (funcScope.functionMode == 5) {
                        funcScope.functionMode = 0;
                        part = ""; // (the first brace is the root scope, which will be added later on, so don't add now)
                        if (scopes.length == 2) {
                            if (!inlineFuncName)
                                inlineFuncName = '' + (++_inlineNameCounter);
                            inlineFuncPrefix += "_" + inlineFuncName; // (no function name found, so use the generated one for unique input and return vars for this inline function)
                        }
                    }
                    break;
                case "}":
                    if (!funcScope) error("Cannot have braces outside the function being inlined");
                    --funcScope.braceCount;
                    if (funcScope.braceCount < 0) error("Brace count does not match up");
                    scope.previousLineInsertIndex = newBody.length + 1;
                    if (scope.isFunctionRootLevel)
                        --functionScopeIndex; // (moving out of a root function level scope)
                    --scopeIndex;
                    if (scopeIndex >= 0)
                        scopes[scopeIndex].previousLineInsertIndex = scope.previousLineInsertIndex; // (let the next scope know the new insert point also to continue off)
                    break;
                case "(":
                    ++scope.bracketCount;
                    if (funcScope.functionMode == 1 || funcScope.functionMode == 2) funcScope.functionMode = 3;
                    if (scope.superProtoMode == 7) scope.superProtoMode = 8;
                    break;
                case ")":
                    --scope.bracketCount;
                    if (scope.bracketCount < 0) error("Bracket count does not match up");
                    if (scope.forMode == 1) scope.forMode = 0;
                    if (funcScope.functionMode == 3 || funcScope.functionMode == 4) funcScope.functionMode = 5;
                    if (scope.superProtoMode == 8) {
                        if (scope.currentInline) {
                            //if (!scope.currentInline.inlineCode)
                            //    error("A super function was called, but the inline code is empty.");
                            // ... we have inline information for this function, so convert this entry ...
                            newBody = newBody.substring(0, scope.superStartIndex) + scope.currentInline.returnVarName;
                            if (scope.currentInline.inlineCode) {
                                if (!scope.previousLineInsertIndex) error("There is no previous insert location");
                                var params = "";
                                if (scope.currentInline.params && scope.currentInline.params.length)
                                    params = "let " + scope.currentInline.params.join(",") + ";\r\n"; // TODO: (we are not yet supporting passing of parameters)
                                newBody = newBody.substring(0, scope.previousLineInsertIndex) + "\r\n" + params + scope.currentInline.inlineCode + "\r\n" + newBody.substring(scope.previousLineInsertIndex);
                            }
                            part = "";
                        }
                        scope.superProtoMode = 0;
                    }
                    break;
                case "[": ++scope.squareBacketCount; break;
                case "]": --scope.squareBacketCount; if (scope.squareBacketCount < 0) error("Square bracket count does not match up"); break;
                case ",":
                    if (funcScope && (scope.bracketCount == 0 || scope.bracketCount == 1 && scope.forMode == 1)) // (scope.bracketCount must be 0 to make sure we are not in a function call or comma expression list)
                        if (funcScope.varMode == 1) error("A 'var' identifier was expected");
                        else if (funcScope.varMode == 2) funcScope.varMode = 1;
                    if (funcScope.functionMode == 4) funcScope.functionMode = 3;
                    break;
                case ";":
                    scope.previousLineInsertIndex = newBody.length + 1;
                    if (funcScope.functionMode) error("Brace found in function declaration before the block started");
                    if (funcScope)
                        if (funcScope.varMode == 1) error("A 'var' identifier was expected");
                        else if (funcScope.varMode == 2) funcScope.varMode = 0;
                    break;
                case "function":
                    scopes[++scopeIndex] = scope = new Scope()
                    functionScopes[++functionScopeIndex] = funcScope = scope;
                    scope.isFunctionRootLevel = true;
                    if (functionScopeIndex > 0)
                        funcScope.functionMode = 1;
                    else if (inlineFuncName) {
                        funcScope.functionName = inlineFuncName;
                        funcScope.functionMode = 2; // (skip, as a name was already given)
                    } else
                        funcScope.functionMode = 1;
                    break;
                case "var":
                    if (functionScopeIndex < 0)
                        error("You cannot have variables outside the root function body for inlining.");
                    funcScope.varMode = 1;
                    if (functionScopeIndex == 0)
                        part = ""; // (clear 'var', these as root level will be moved into 'let' declarations instead)
                    break; // TODO: Handle "var" in for loops (or better yet, do "proper" js parsing :P)
                case "return":
                    if (functionScopeIndex == 0) {
                        // ... function is returning the following expression, to make it an output result var instead ...
                        returnVarName = inlineFuncPrefix + "_return";
                        part = "var " + returnVarName + " = ";
                    }
                    else if (functionScopeIndex < 0)
                        error("A return statement is not valid outside the function being inlined.");
                    break;
                case "=": break;
                case ".":
                    if (scope.superProtoMode == 1) scope.superProtoMode = 2;
                    else if (scope.superProtoMode == 3) scope.superProtoMode = 4;
                    else if (scope.superProtoMode == 5) scope.superProtoMode = 6;
                    break;
                case "_super":
                    if (scope.superProtoMode == 0) {
                        scope.superProtoMode = 1;
                        scope.superStartIndex = newBody.length;
                    }
                    break;
                case "prototype": if (scope.superProtoMode = 2) scope.superProtoMode = 3; break;
                case "call": if (scope.superProtoMode = 6) scope.superProtoMode = 7; break;
                case "for": if (scope.forMode == 0) scope.forMode = 1; break;
                default:
                    if ((part[0] != '/' || part[1] != '/' && part[1] != '*') && part.trim()) {
                        if (funcScope && funcScope.varMode == 1) {
                            if (/^\$__inlined.*return$/.test(part)) {
                                newBody += "var ";
                                funcScope.varMode = 0; // (skip return vars)
                            } else {
                                if (funcScope.varsFound.indexOf(part) < 0)
                                    funcScope.varsFound.push(part);
                                funcScope.varMode = 2;
                            }
                        }
                        else if (funcScope.functionMode == 1) {
                            scope.functionName = part;
                            if (scopes.length == 2)
                                inlineFuncPrefix += "_" + scope.functionName;
                            funcScope.functionMode = 2;
                        } else if (funcScope.functionMode == 3) {
                            if (scope.paramsFound.indexOf(part) < 0)
                                scope.paramsFound.push(part);
                            funcScope.functionMode = 4;
                        } else if (scope.superProtoMode == 4) {
                            scope.currentInline = getInlineInfo(part);
                            if (!scope.currentInline) {
                                scope.superStartIndex = 0;
                                scope.superProtoMode = 0;
                            }
                            else scope.superProtoMode = 5;
                        } else if (scope.superProtoMode < 8) {
                            scope.superStartIndex = 0;
                            scope.superProtoMode = 0;
                        }
                    }
            }
            if (functionScopeIndex >= 0 && funcScope.functionMode == 0)
                newBody += part;
        }

        var rootFunction = functionScopes[0];
        if (rootFunction && rootFunction.braceCount) error("Function is missing a closing brace");
        var paramsFound = rootFunction && rootFunction.paramsFound || [], varsFound = rootFunction && rootFunction.varsFound || [];

        // ... convert any function parameters into "in" variables for the inline code ...

        for (var i = 0, n = paramsFound.length; i < n; ++i) {
            var inVar = inlineFuncPrefix + "_" + paramsFound[i];
            varsFound.push(paramsFound[i] + " = " + inVar);
            paramsFound[i] = inVar;
        }

        var letDeclarations = varsFound.length && "let " + varsFound.join(', ') + ";\r\n" || "";
        var finalCode = (letDeclarations + newBody).trim();
        var finalScopeCode = finalCode && "{\r\n" + finalCode + "\r\n}" || "";

        return {
            funcName: inlineFuncName,
            inlineCode: finalScopeCode,
            varsFound: varsFound,
            params: paramsFound,
            returnVarName: returnVarName
        };
    }

    /**
     * In-lines all the overridden methods that use 'super' to continue calls to the base level.
     * After calling this, by default, the function in the prototype of the specified object is replaced with in inline version, which is many times faster.
     * @param type The object to in-line functions for.
     * @param funcOrName The function to inline.
     */
    export function compile(type: { new(...args: any[]): any; prototype: {} }, funcOrName: Function | string, replace = true): Function {
        if (typeof type != 'function' || type === null) throw Error("A function object was expected.");
        var name = typeof funcOrName == "string" ? funcOrName : typeof funcOrName == "function" ? getFunctionName(funcOrName) : null;
        if (!name) throw Error("No function name could be determined.");
        // ... get all prototypes and build from the bottom up ...
        var allProtos: {}[] = [], inlineList: IInlineInfo[] = [];
        for (let o = type.prototype; o != Object.prototype; o = Object.getPrototypeOf(o))
            allProtos.push(o);

        var finalBody = "";

        for (var i = allProtos.length - 1; i >= 0; --i) { // (go in reverse to start at the base level)
            var proto = allProtos[i];
            var func: Function = proto[name];
            if (func && typeof func != 'function') throw Error("Property '" + name + "' in prototype for object type '" + getTypeName(type) + "' is not a function.");
            var inlineDetails = inlineFunction(func, name, inlineList[i + 1]);
            inlineList[i] = inlineDetails;
        }

        var thisInlineInfo = inlineList[0];
        var inlineCode = inlineList.length && thisInlineInfo.inlineCode || "";
        var returnCode = inlineList.length && thisInlineInfo.returnVarName && ("\r\n    return " + thisInlineInfo.returnVarName) + ";" || "";

        if (thisInlineInfo.params.length)
            var newFunc = new Function(...thisInlineInfo.params, inlineList.length ? inlineCode + returnCode : void 0);
        else
            var newFunc = new Function(inlineList.length ? inlineCode + returnCode : void 0);

        if (replace)
            type.prototype[name] = newFunc;

        return newFunc;
    }

    // =======================================================================================================================

    export function isTypedArray(a: any): boolean { return !!(a.buffer instanceof ArrayBuffer && a.BYTES_PER_ELEMENT); }

    // =======================================================================================================================

    var _zeroDelayCallbacks: Function[]; // (polyfill)
    var _zeroDelayMessageName = "ws2d-zero-delay-message"; // (polyfill)

    function handleMessage(event: MessageEvent) {
        if (event.source == window && event.data == _zeroDelayMessageName) {
            event.stopPropagation();
            if (_zeroDelayCallbacks.length)
                _zeroDelayCallbacks.pop()();
        }
    }

    /**
     * Queues a handler function to be called with as close to 0 delay as possible.
     * Use 'clearImmediate()' to remove a queued handler.
     */
    export function setImmediate(handler: Function, ...args: any[]): number {
        if (self.setImmediate)
            return self.setImmediate(handler, ...args);
        else {
            if (!_zeroDelayCallbacks) {
                // ... setup only on the first time used ...
                _zeroDelayCallbacks = [];
                self.addEventListener("message", handleMessage, true);
            }

            var id = _zeroDelayCallbacks.unshift(handler);
            window.postMessage(_zeroDelayMessageName, "*");
            return id;
        }
    }

    /**
     * Clears a function queued by calling 'setImmediate()'.
     */
    export function clearImmediate(handle: number): void {
        if (self.clearImmediate)
            self.clearImmediate(handle);
        else
            _zeroDelayCallbacks.splice(handle, 1);
    }

    // =======================================================================================================================

    export namespace InternalUtilities {
        export function doEnumReverseMapping(enumObject: {}) {
            if (enumObject)
                for (var p in enumObject)
                    enumObject[enumObject[p]] = p;
        }
    }

    // =======================================================================================================================

    /**
     * Copies an array using the fastest technique possible that consistently works best across most browsers.
     * This is especially faster than 'slice()' in FireFox and IE.
     */
    export function copyArray<T>(a: T[]): T[] { // (https://jsperf.com/new-array-vs-splice-vs-slice/19)
        var i = a.length, b: T[] = [];
        while (i--) { b[i] = a[i]; }
        return b;
    } // TODO: Bench this. For that matter, write WS2D bench routines to help test stuff.

    // =======================================================================================================================

    /**
     * Gets name values from an enum object in ascending numerical value order and returns the names as an array of strings.
     * @param enumRef A reference to the enum object.
     * @param except A list of names to exclude from the list.
     */
    export function getEnumNames(enumRef: {}, ...except: string[]): string[] {
        var v: string[] = [], keys: number[] = [], name: string, key: number;
        for (var p in enumRef)
            if ((key = +p) >= 0) keys.push(key);
        if (keys.length) {
            keys.sort((a, b) => a - b);
            for (var i = 0, n = keys.length; i < n; ++i)
                if ((name = enumRef[keys[i]]) && (!except || except.indexOf(name) < 0))
                    v.push(name);
        }
        return v;
    }

    // =======================================================================================================================
}

WorldSimulator2D.safeEval = function (exp: string, p1?: any, p2?: any, p3?: any): any { return eval(exp); };
// (note: this allows executing 'eval' outside the private WorldSimulator2D scope, but still within a function scope to prevent polluting the global scope,
//  and also allows passing arguments scoped only to the request).

WorldSimulator2D.globalEval = function (exp: string, p1?: any, p2?: any, p3?: any): any { return (<any>0, eval)(exp); };
// (note: indirect 'eval' calls are always globally scoped; see more: http://perfectionkills.com/global-eval-what-are-the-options/#windoweval)
