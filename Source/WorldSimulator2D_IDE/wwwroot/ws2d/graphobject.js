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
    var GraphObject = (function (_super) {
        __extends(GraphObject, _super);
        function GraphObject() {
            var _this = _super.call(this) || this;
            _this._updateCount = 0;
            return _this;
        }
        Object.defineProperty(GraphObject.prototype, "children", {
            get: function () {
                var children = this._children;
                if (this.childrenUpdated || !children) {
                    if (!children)
                        this._children = children = WorldSimulator2D.createArrayBuffer();
                    children.count = 0;
                    var o = this.firstChild;
                    while (o) {
                        o.index = children.count;
                        children[children.count++] = o;
                        o = o.next;
                    }
                    this.childrenUpdated = false;
                }
                return children;
            },
            enumerable: true,
            configurable: true
        });
        GraphObject.prototype.onParentChanged = function (source) {
            this.world = source.world;
            this.layer = source.layer;
            if (this.firstChild)
                this.firstChild.onParentChanged(source);
            if (this.next)
                this.next.onParentChanged(source);
        };
        Object.defineProperty(GraphObject.prototype, "updateCount", {
            get: function () { return this._updateCount; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GraphObject.prototype, "running", {
            get: function () { return this._updateCount > 0; },
            enumerable: true,
            configurable: true
        });
        GraphObject.prototype.error = function (msg) {
            return _super.prototype.error.call(this, msg, this.world, this.layer);
        };
        GraphObject.prototype.initialize = function (isnew, autoReset) {
            _super.prototype.initialize.call(this, isnew, autoReset);
        };
        GraphObject.prototype.configure = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this;
        };
        GraphObject.prototype.dispose = function () {
            this.clear();
            this.remove();
            _super.prototype.dispose.call(this);
        };
        GraphObject.prototype.clear = function () {
            while (this.lastChild)
                this.lastChild.dispose();
        };
        GraphObject.prototype.add = function (obj) {
            if (typeof obj != WorldSimulator2D.OBJECT || obj === null)
                throw this.error("No object was given to add.");
            var o = obj, $this = this, fc = this.firstChild, lc = this.lastChild;
            if (o.parent == this)
                return obj;
            var parentChanged = false;
            if (o.parent && o.parent != this) {
                debugger;
                obj.remove();
                parentChanged = true;
            }
            if (fc || lc) {
                if (!fc)
                    $this.firstChild = fc = lc;
                if (!lc)
                    $this.lastChild = lc = fc;
                lc.next = o;
                o.previous = lc;
                $this.lastChild = o;
            }
            else {
                this.firstChild = obj;
                this.lastChild = obj;
            }
            $this.childrenUpdated = true;
            o.parent = this;
            if (this != this.engine) {
                o.world = this instanceof WorldSimulator2D.World ? this : this.world;
                if (this != this.world)
                    o.layer = this instanceof WorldSimulator2D.Layer ? this : this.layer;
            }
            var _ = $this;
            while (_) {
                _.graphUpdated = true;
                _ = _.parent;
            }
            if (parentChanged && obj.onParentChanged)
                obj.onParentChanged(this);
            return obj;
        };
        GraphObject.prototype._updateWorldAndLayer = function (world, layer) {
            this.world = world;
            this.layer = layer;
        };
        GraphObject.prototype.remove = function () {
            var $this = this, parent = this.parent, prev = this.previous, next = this.next;
            if (parent) {
                if (parent.firstChild == $this)
                    parent.firstChild = $this.next;
                if (parent.lastChild == $this)
                    parent.lastChild = $this.previous;
                parent.childrenUpdated = true;
                var o = parent;
                while (o) {
                    o.graphUpdated = true;
                    o = o.parent;
                }
            }
            if (prev || next) {
                if (prev)
                    prev.next = $this.next;
                if (next)
                    next.previous = $this.previous;
                $this.next = null;
                $this.previous = null;
            }
            $this.world = void 0;
            $this.layer = void 0;
            $this.index = void 0;
            $this.parent = void 0;
            return this;
        };
        GraphObject.prototype.startup = function () {
            if (!(this instanceof WorldSimulator2D.Engine))
                if (!this.world)
                    throw this.error("This object is not associated with a world.  An associated world is required to render objects.  Put the object into a world first.");
            this._updateCount = 0;
            return this;
        };
        GraphObject.prototype.update = function (processor) {
            if (!(this._updateCount > 0))
                this._updateCount = 1;
            else
                ++this._updateCount;
            return this;
        };
        GraphObject.prototype.render = function (includeNext) {
            if (includeNext === void 0) { includeNext = false; }
            if (this.firstChild)
                this.firstChild.render(true);
        };
        GraphObject.prototype.flatten = function (includethis) {
            if (includethis === void 0) { includethis = true; }
            var i = 0, o = this, fc = o.firstChild, out = this.flattenedItems;
            if (!this.graphUpdated && out)
                return out;
            if (!out)
                o.flattenedItems = out = WorldSimulator2D.createArrayBuffer();
            out.count = 0;
            if (fc)
                do {
                    if (fc) {
                        o = fc;
                        fc = o.firstChild;
                        i = 0;
                        o.index = i;
                    }
                    else {
                        out[out.count++] = o;
                        if (o.next) {
                            o = o.next;
                            o.index = ++i;
                            fc = o.firstChild;
                        }
                        else {
                            o = o.parent;
                            if (o == this)
                                break;
                            i = o.index;
                            fc = null;
                        }
                    }
                } while (true);
            if (includethis)
                out[out.count++] = o;
            this.graphUpdated = false;
            return out;
        };
        GraphObject.prototype.count = function () {
            var count = 1;
            if (this.firstChild)
                count += this.firstChild.count();
            if (this.next)
                count += this.next.count();
            return count;
        };
        GraphObject.type = WorldSimulator2D.EngineObject.type | WorldSimulator2D.ObjectTypes.GraphObject;
        GraphObject._nonClonableProperties = (GraphObject._nonClonableProperties['index'] = void 0,
            GraphObject._nonClonableProperties['world'] = void 0,
            GraphObject._nonClonableProperties['layer'] = void 0,
            GraphObject._nonClonableProperties['parent'] = void 0,
            GraphObject._nonClonableProperties['previous'] = void 0,
            GraphObject._nonClonableProperties['next'] = void 0,
            GraphObject._nonClonableProperties['firstChild'] = void 0,
            GraphObject._nonClonableProperties['lastChild'] = void 0,
            GraphObject._nonClonableProperties['updateCounter'] = void 0,
            GraphObject._nonClonableProperties['_updateCounter'] = void 0,
            GraphObject._nonClonableProperties);
        return GraphObject;
    }(WorldSimulator2D.EngineObject));
    WorldSimulator2D.GraphObject = GraphObject;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=graphobject.js.map