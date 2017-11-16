if (!Number['isInteger'])
    Number['isInteger'] = Number['isInteger'] || function (value) {
        return typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value;
    };
if (!Math['sign'])
    Math['sign'] = function (x) {
        return ((x > 0) - (x < 0)) || +x;
    };
var WorldSimulator2D;
(function (WorldSimulator2D) {
    function createArrayBuffer() {
        var a = [];
        a.count = 0;
        return a;
    }
    WorldSimulator2D.createArrayBuffer = createArrayBuffer;
    function createFloat32ArrayBuffer() {
        var a = (arguments.length == 1 ? new Float32Array(arguments[0]) : new Float32Array(arguments[0], arguments[1], arguments[2]));
        a.count = 0;
        return a;
    }
    WorldSimulator2D.createFloat32ArrayBuffer = createFloat32ArrayBuffer;
    WorldSimulator2D.global = (function () { return function () { }.constructor("return this"); })();
    WorldSimulator2D.UNDEFINED = 'undefined';
    WorldSimulator2D.FUNCTION = 'function';
    WorldSimulator2D.OBJECT = 'object';
    WorldSimulator2D.STRING = 'string';
    WorldSimulator2D.NUMBER = 'number';
    WorldSimulator2D.BOOLEAN = 'boolean';
    WorldSimulator2D.ROOT_NAMESPACE = "WorldSimulator2D";
    function noop() { }
    WorldSimulator2D.noop = noop;
    WorldSimulator2D.FUNC_NAME_REGEX = /^function\s*(\S+)\s*\(/i;
    function getFunctionName(func) {
        var name = func['name'];
        if (name == void 0) {
            var fstr = func.toString();
            var results = (WorldSimulator2D.FUNC_NAME_REGEX).exec(fstr);
            name = (results && results.length > 1) ? results[1] : "";
        }
        return name;
    }
    WorldSimulator2D.getFunctionName = getFunctionName;
    function getReferenceName(obj, reference) {
        for (var p in obj)
            if (obj[p] === reference)
                return p;
        return WorldSimulator2D.UNDEFINED;
    }
    WorldSimulator2D.getReferenceName = getReferenceName;
    function erase(obj, release) {
        if (release === void 0) { release = true; }
        for (var p in obj)
            if ((p != "__proto__" && p != 'constructor' && obj).hasOwnProperty(p)) {
                var hasDispose = typeof obj[p] == WorldSimulator2D.OBJECT && typeof obj[p].dispose == WorldSimulator2D.FUNCTION;
                if (release && hasDispose)
                    obj[p].dispose();
                else if (!hasDispose)
                    obj[p] = void 0;
            }
        return obj;
    }
    WorldSimulator2D.erase = erase;
    function clone(value) {
        if (typeof value !== 'object')
            return value;
        var newObject, p, rcCount, v;
        if (clone.arguments.length > 1) {
            rcCount = clone.arguments[clone.arguments.length - 1];
            if (value['@__recursiveCheck'] === rcCount)
                return value;
        }
        else
            rcCount = (value['@__recursiveCheck'] || 0) + 1;
        value['@__recursiveCheck'] = rcCount;
        newObject = {};
        for (p in value) {
            v = value[p];
            if (typeof v !== 'object')
                newObject[p] = v;
            else
                newObject[p] = clone(v, rcCount);
        }
        return newObject;
    }
    WorldSimulator2D.clone = clone;
    ;
    function dereferencePropertyPath(path, origin, unsafe) {
        if (unsafe === void 0) { unsafe = false; }
        if (unsafe)
            return safeEval('p1.' + path, origin);
        if (origin === void 0 || origin === null)
            origin = this !== WorldSimulator2D.global ? this : WorldSimulator2D.global;
        if (typeof path !== 'string')
            path = '' + path;
        var o = origin, c = '', pc, i = 0, n = path.length, name = '';
        if (n)
            ((c = path[i++]) == '.' || c == '[' || c == ']' || c == void 0)
                ? (name ? (o = o[name], name = '') : (pc == '.' || pc == '[' || pc == ']' && c == ']' ? i = n + 2 : void 0), pc = c)
                : name += c;
        if (i == n + 2)
            throw this.error("Invalid path: " + path);
        return o;
    }
    WorldSimulator2D.dereferencePropertyPath = dereferencePropertyPath;
    function waitReady(obj, propertyName, callback, timeout, timeoutCallback) {
        if (timeout === void 0) { timeout = 60000; }
        if (!callback)
            throw "'callback' is required.";
        if (!obj)
            throw "'obj' is required.";
        if (obj[propertyName] !== void 0)
            callback();
        else {
            if (timeout != 0) {
                if (timeout > 0)
                    timeout--;
                setTimeout(function () {
                    waitReady(obj, propertyName, callback);
                }, 1);
            }
            else if (timeoutCallback)
                timeoutCallback();
        }
    }
    WorldSimulator2D.waitReady = waitReady;
    function apply(func, _this, args) {
        if (func.apply) {
            return func.apply(_this, args);
        }
        else {
            return Function.prototype.apply.apply(func, [_this, args]);
        }
    }
    WorldSimulator2D.apply = apply;
    var _guidSeed = (function () {
        var text = navigator.userAgent + location.href;
        for (var i = 0, n = text.length, randseed = 0; i < n; ++i)
            randseed += navigator.userAgent.charCodeAt(i);
        return randseed;
    })();
    var _guidCounter = 0;
    function createGUID(hyphens) {
        if (hyphens === void 0) { hyphens = true; }
        var time = (Date.now ? Date.now() : new Date().getTime()) + (new Date()).getTimezoneOffset();
        var randseed = time + _guidSeed;
        var hexTime = time.toString(16) + (_guidCounter <= 0xffffffff ? _guidCounter++ : _guidCounter = 0).toString(16), i = hexTime.length, pi = 0;
        var pattern = hyphens ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx', len = pattern.length, result = "", c, r;
        while (pi < len)
            c = pattern[pi++], result += c != 'x' && c != 'y' ? c : i > 0 ? hexTime[--i] : (r = Math.random() * randseed % 16 | 0, c == 'x' ? r : r & 0x3 | 0x8).toString(16);
        return result;
    }
    WorldSimulator2D.createGUID = createGUID;
    function getTypeName(obj, cacheTypeName) {
        if (cacheTypeName === void 0) { cacheTypeName = true; }
        if (obj === void 0 || obj === null)
            return void 0;
        var typeFunc = typeof obj == WorldSimulator2D.FUNCTION ? obj : typeof obj == WorldSimulator2D.OBJECT ? obj.constructor : void 0;
        if (!typeFunc)
            return void 0;
        var typename = typeFunc['$__name'];
        if (typename)
            return typename;
        else if (cacheTypeName) {
            var name = getFunctionName(obj);
            if (name)
                setTypeName(obj, name);
            return name;
        }
        else
            return getFunctionName(obj);
    }
    WorldSimulator2D.getTypeName = getTypeName;
    function setTypeName(obj, name) {
        if (obj === void 0 || obj === null)
            throw this.error("'obj' parameter is required.");
        if (!name)
            return getTypeName(obj);
        var typeFunc = typeof obj == WorldSimulator2D.FUNCTION ? obj : typeof obj == WorldSimulator2D.OBJECT ? obj.constructor : null;
        return typeFunc['$__name'] = name;
    }
    WorldSimulator2D.setTypeName = setTypeName;
    function isEmpty(obj) {
        if (obj === void 0 || obj === null)
            return true;
        if (typeof obj == WorldSimulator2D.STRING || Array.isArray(obj))
            return !obj.length;
        if (typeof obj != WorldSimulator2D.OBJECT)
            return isNaN(obj);
        for (var key in obj)
            if (WorldSimulator2D.global.Object.prototype.hasOwnProperty.call(obj, key))
                return false;
        return true;
    }
    WorldSimulator2D.isEmpty = isEmpty;
    function celsiusToKelvins(c) { return c + 273.15; }
    WorldSimulator2D.celsiusToKelvins = celsiusToKelvins;
    function fahrenheitToCelsius(f) { return (f - 32) * 5 / 9; }
    WorldSimulator2D.fahrenheitToCelsius = fahrenheitToCelsius;
    function atomicWeightToAtomWeight(w) { return w / (6.02214179 * 100000000000000000000); }
    WorldSimulator2D.atomicWeightToAtomWeight = atomicWeightToAtomWeight;
    function atomicWeightToKg(w) { return w * 1000; }
    WorldSimulator2D.atomicWeightToKg = atomicWeightToKg;
    function distance2D(x1, y1, x2, y2) {
        var dx = x2 - x1, dy = y2 - y1;
        var absdx = dx < 0 ? -dx : dx, absdy = dy < 0 ? -dy : dy;
        var max = absdx > absdy ? absdx : absdy, min = absdx < absdy ? absdx : absdy;
        var r = min / max;
        return max * Math.sqrt(1 + r * r);
    }
    WorldSimulator2D.distance2D = distance2D;
    WorldSimulator2D.jsParseRegex = /\s+|\/\/.*|\/[\*]+[^*]*?\*\/|"(?:\\.|[^"])*?"|\d+(?:\.\d*)?(?:e\d*)?|[$_A-Za-z]+[$_A-Za-z0-9]*|\S/g;
    var _inlineNameCounter = 0;
    var Scope = (function () {
        function Scope() {
            this.functionName = "";
            this.paramsFound = [];
            this.varsFound = [];
            this.isFunctionRootLevel = false;
            this.varMode = 0;
            this.functionMode = 0;
            this.superProtoMode = 0;
            this.superStartIndex = -1;
            this.previousLineInsertIndex = 0;
            this.braceCount = 0;
            this.bracketCount = 0;
            this.squareBacketCount = 0;
            this.forMode = 0;
        }
        return Scope;
    }());
    WorldSimulator2D.Scope = Scope;
    function inlineFunction(funcStr, inlineFuncName) {
        if (inlineFuncName === void 0) { inlineFuncName = ""; }
        var superCallDetails = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            superCallDetails[_i - 2] = arguments[_i];
        }
        if (funcStr === void 0 || funcStr === null)
            funcStr = "";
        if (typeof funcStr != 'string')
            funcStr = '' + funcStr;
        var parts = funcStr.match(WorldSimulator2D.jsParseRegex) || [], inlineFuncPrefix = "$__inlined", newBody = "", returnVarName = "";
        var scopes = [new Scope()];
        var scopeIndex = 0;
        var functionScopes = [];
        var functionScopeIndex = -1;
        function error(msg) {
            throw new Error(msg + " (" + i + ": " + part + "):\r\n" + funcStr);
        }
        function getInlineInfo(funcName) {
            if (superCallDetails) {
                for (var i = 0, n = superCallDetails.length; i < n; ++i)
                    if (superCallDetails[i] && superCallDetails[i].funcName == funcName)
                        return superCallDetails[i];
            }
            else
                return void 0;
        }
        for (var i = 0, n = parts.length; i < n; ++i) {
            var part = parts[i];
            var scope = scopes[scopeIndex];
            var funcScope = functionScopes[functionScopeIndex] || {};
            switch (part) {
                case "{":
                    if (!funcScope)
                        error("Cannot have braces outside the function being inlined");
                    ++funcScope.braceCount;
                    scope.previousLineInsertIndex = newBody.length + 1;
                    if (funcScope.functionMode == 0 || funcScope.functionMode === void 0)
                        scopes[++scopeIndex] = scope = new Scope();
                    else if (funcScope.functionMode == 1 || funcScope.functionMode == 2)
                        error("Function is missing parameter brackets");
                    else if (funcScope.functionMode == 3)
                        error("Function is missing a parameter name");
                    else if (funcScope.functionMode == 5) {
                        funcScope.functionMode = 0;
                        part = "";
                        if (scopes.length == 2) {
                            if (!inlineFuncName)
                                inlineFuncName = '' + (++_inlineNameCounter);
                            inlineFuncPrefix += "_" + inlineFuncName;
                        }
                    }
                    break;
                case "}":
                    if (!funcScope)
                        error("Cannot have braces outside the function being inlined");
                    --funcScope.braceCount;
                    if (funcScope.braceCount < 0)
                        error("Brace count does not match up");
                    scope.previousLineInsertIndex = newBody.length + 1;
                    if (scope.isFunctionRootLevel)
                        --functionScopeIndex;
                    --scopeIndex;
                    if (scopeIndex >= 0)
                        scopes[scopeIndex].previousLineInsertIndex = scope.previousLineInsertIndex;
                    break;
                case "(":
                    ++scope.bracketCount;
                    if (funcScope.functionMode == 1 || funcScope.functionMode == 2)
                        funcScope.functionMode = 3;
                    if (scope.superProtoMode == 7)
                        scope.superProtoMode = 8;
                    break;
                case ")":
                    --scope.bracketCount;
                    if (scope.bracketCount < 0)
                        error("Bracket count does not match up");
                    if (scope.forMode == 1)
                        scope.forMode = 0;
                    if (funcScope.functionMode == 3 || funcScope.functionMode == 4)
                        funcScope.functionMode = 5;
                    if (scope.superProtoMode == 8) {
                        if (scope.currentInline) {
                            newBody = newBody.substring(0, scope.superStartIndex) + scope.currentInline.returnVarName;
                            if (scope.currentInline.inlineCode) {
                                if (!scope.previousLineInsertIndex)
                                    error("There is no previous insert location");
                                var params = "";
                                if (scope.currentInline.params && scope.currentInline.params.length)
                                    params = "let " + scope.currentInline.params.join(",") + ";\r\n";
                                newBody = newBody.substring(0, scope.previousLineInsertIndex) + "\r\n" + params + scope.currentInline.inlineCode + "\r\n" + newBody.substring(scope.previousLineInsertIndex);
                            }
                            part = "";
                        }
                        scope.superProtoMode = 0;
                    }
                    break;
                case "[":
                    ++scope.squareBacketCount;
                    break;
                case "]":
                    --scope.squareBacketCount;
                    if (scope.squareBacketCount < 0)
                        error("Square bracket count does not match up");
                    break;
                case ",":
                    if (funcScope && (scope.bracketCount == 0 || scope.bracketCount == 1 && scope.forMode == 1))
                        if (funcScope.varMode == 1)
                            error("A 'var' identifier was expected");
                        else if (funcScope.varMode == 2)
                            funcScope.varMode = 1;
                    if (funcScope.functionMode == 4)
                        funcScope.functionMode = 3;
                    break;
                case ";":
                    scope.previousLineInsertIndex = newBody.length + 1;
                    if (funcScope.functionMode)
                        error("Brace found in function declaration before the block started");
                    if (funcScope)
                        if (funcScope.varMode == 1)
                            error("A 'var' identifier was expected");
                        else if (funcScope.varMode == 2)
                            funcScope.varMode = 0;
                    break;
                case "function":
                    scopes[++scopeIndex] = scope = new Scope();
                    functionScopes[++functionScopeIndex] = funcScope = scope;
                    scope.isFunctionRootLevel = true;
                    if (functionScopeIndex > 0)
                        funcScope.functionMode = 1;
                    else if (inlineFuncName) {
                        funcScope.functionName = inlineFuncName;
                        funcScope.functionMode = 2;
                    }
                    else
                        funcScope.functionMode = 1;
                    break;
                case "var":
                    if (functionScopeIndex < 0)
                        error("You cannot have variables outside the root function body for inlining.");
                    funcScope.varMode = 1;
                    if (functionScopeIndex == 0)
                        part = "";
                    break;
                case "return":
                    if (functionScopeIndex == 0) {
                        returnVarName = inlineFuncPrefix + "_return";
                        part = "var " + returnVarName + " = ";
                    }
                    else if (functionScopeIndex < 0)
                        error("A return statement is not valid outside the function being inlined.");
                    break;
                case "=": break;
                case ".":
                    if (scope.superProtoMode == 1)
                        scope.superProtoMode = 2;
                    else if (scope.superProtoMode == 3)
                        scope.superProtoMode = 4;
                    else if (scope.superProtoMode == 5)
                        scope.superProtoMode = 6;
                    break;
                case "_super":
                    if (scope.superProtoMode == 0) {
                        scope.superProtoMode = 1;
                        scope.superStartIndex = newBody.length;
                    }
                    break;
                case "prototype":
                    if (scope.superProtoMode = 2)
                        scope.superProtoMode = 3;
                    break;
                case "call":
                    if (scope.superProtoMode = 6)
                        scope.superProtoMode = 7;
                    break;
                case "for":
                    if (scope.forMode == 0)
                        scope.forMode = 1;
                    break;
                default:
                    if ((part[0] != '/' || part[1] != '/' && part[1] != '*') && part.trim()) {
                        if (funcScope && funcScope.varMode == 1) {
                            if (/^\$__inlined.*return$/.test(part)) {
                                newBody += "var ";
                                funcScope.varMode = 0;
                            }
                            else {
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
                        }
                        else if (funcScope.functionMode == 3) {
                            if (scope.paramsFound.indexOf(part) < 0)
                                scope.paramsFound.push(part);
                            funcScope.functionMode = 4;
                        }
                        else if (scope.superProtoMode == 4) {
                            scope.currentInline = getInlineInfo(part);
                            if (!scope.currentInline) {
                                scope.superStartIndex = 0;
                                scope.superProtoMode = 0;
                            }
                            else
                                scope.superProtoMode = 5;
                        }
                        else if (scope.superProtoMode < 8) {
                            scope.superStartIndex = 0;
                            scope.superProtoMode = 0;
                        }
                    }
            }
            if (functionScopeIndex >= 0 && funcScope.functionMode == 0)
                newBody += part;
        }
        var rootFunction = functionScopes[0];
        if (rootFunction && rootFunction.braceCount)
            error("Function is missing a closing brace");
        var paramsFound = rootFunction && rootFunction.paramsFound || [], varsFound = rootFunction && rootFunction.varsFound || [];
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
    WorldSimulator2D.inlineFunction = inlineFunction;
    function compile(type, funcOrName, replace) {
        if (replace === void 0) { replace = true; }
        if (typeof type != 'function' || type === null)
            throw Error("A function object was expected.");
        var name = typeof funcOrName == "string" ? funcOrName : typeof funcOrName == "function" ? getFunctionName(funcOrName) : null;
        if (!name)
            throw Error("No function name could be determined.");
        var allProtos = [], inlineList = [];
        for (var o = type.prototype; o != Object.prototype; o = Object.getPrototypeOf(o))
            allProtos.push(o);
        var finalBody = "";
        for (var i = allProtos.length - 1; i >= 0; --i) {
            var proto = allProtos[i];
            var func = proto[name];
            if (func && typeof func != 'function')
                throw Error("Property '" + name + "' in prototype for object type '" + getTypeName(type) + "' is not a function.");
            var inlineDetails = inlineFunction(func, name, inlineList[i + 1]);
            inlineList[i] = inlineDetails;
        }
        var thisInlineInfo = inlineList[0];
        var inlineCode = inlineList.length && thisInlineInfo.inlineCode || "";
        var returnCode = inlineList.length && thisInlineInfo.returnVarName && ("\r\n    return " + thisInlineInfo.returnVarName) + ";" || "";
        if (thisInlineInfo.params.length)
            var newFunc = new (Function.bind.apply(Function, [void 0].concat(thisInlineInfo.params, [inlineList.length ? inlineCode + returnCode : void 0])))();
        else
            var newFunc = new Function(inlineList.length ? inlineCode + returnCode : void 0);
        if (replace)
            type.prototype[name] = newFunc;
        return newFunc;
    }
    WorldSimulator2D.compile = compile;
    function isTypedArray(a) { return !!(a.buffer instanceof ArrayBuffer && a.BYTES_PER_ELEMENT); }
    WorldSimulator2D.isTypedArray = isTypedArray;
    var _zeroDelayCallbacks;
    var _zeroDelayMessageName = "ws2d-zero-delay-message";
    function handleMessage(event) {
        if (event.source == window && event.data == _zeroDelayMessageName) {
            event.stopPropagation();
            if (_zeroDelayCallbacks.length)
                _zeroDelayCallbacks.pop()();
        }
    }
    function setImmediate(handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (self.setImmediate)
            return self.setImmediate.apply(self, [handler].concat(args));
        else {
            if (!_zeroDelayCallbacks) {
                _zeroDelayCallbacks = [];
                self.addEventListener("message", handleMessage, true);
            }
            var id = _zeroDelayCallbacks.unshift(handler);
            window.postMessage(_zeroDelayMessageName, "*");
            return id;
        }
    }
    WorldSimulator2D.setImmediate = setImmediate;
    function clearImmediate(handle) {
        if (self.clearImmediate)
            self.clearImmediate(handle);
        else
            _zeroDelayCallbacks.splice(handle, 1);
    }
    WorldSimulator2D.clearImmediate = clearImmediate;
    var InternalUtilities;
    (function (InternalUtilities) {
        function doEnumReverseMapping(enumObject) {
            if (enumObject)
                for (var p in enumObject)
                    enumObject[enumObject[p]] = p;
        }
        InternalUtilities.doEnumReverseMapping = doEnumReverseMapping;
    })(InternalUtilities = WorldSimulator2D.InternalUtilities || (WorldSimulator2D.InternalUtilities = {}));
    function copyArray(a) {
        var i = a.length, b = [];
        while (i--) {
            b[i] = a[i];
        }
        return b;
    }
    WorldSimulator2D.copyArray = copyArray;
    function getEnumNames(enumRef) {
        var except = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            except[_i - 1] = arguments[_i];
        }
        var v = [], keys = [], name, key;
        for (var p in enumRef)
            if ((key = +p) >= 0)
                keys.push(key);
        if (keys.length) {
            keys.sort(function (a, b) { return a - b; });
            for (var i = 0, n = keys.length; i < n; ++i)
                if ((name = enumRef[keys[i]]) && (!except || except.indexOf(name) < 0))
                    v.push(name);
        }
        return v;
    }
    WorldSimulator2D.getEnumNames = getEnumNames;
})(WorldSimulator2D || (WorldSimulator2D = {}));
WorldSimulator2D.safeEval = function (exp, p1, p2, p3) { return eval(exp); };
WorldSimulator2D.globalEval = function (exp, p1, p2, p3) { return (0, eval)(exp); };
//# sourceMappingURL=utilities.js.map