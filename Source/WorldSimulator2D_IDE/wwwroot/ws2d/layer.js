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
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            var _this = _super.call(this) || this;
            _this.minX = -999;
            _this.maxX = 999;
            _this.minY = -999;
            _this.maxY = 999;
            _this.layer = _this;
            return _this;
        }
        Layer.prototype.initialize = function (isnew, autoReset) {
            _super.prototype.initialize.call(this, isnew, autoReset);
        };
        Layer.prototype.configure = function (minX, minY, maxX, maxY) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            _super.prototype.configure.call(this);
            if (minX !== void 0)
                this.minX = minX;
            if (minY !== void 0)
                this.minY = minY;
            if (maxX !== void 0)
                this.maxX = maxX;
            if (maxY !== void 0)
                this.maxY = maxY;
            this._buildGrid();
            return this;
        };
        Layer.prototype._buildGrid = function () {
            var errors = [];
            if (this.minY > 0)
                errors.push("'minY' (" + this.minY + ") cannot be greater than 0 (grid center).");
            if (this.maxY < 0)
                errors.push("'maxY' (" + this.maxY + ") cannot be less than 0 (grid center).");
            if (this.minX > 0)
                errors.push("'minX' (" + this.minX + ") cannot be greater than 0 (grid center).");
            if (this.maxX < 0)
                errors.push("'maxX' (" + this.maxX + ") cannot be less than 0 (grid center).");
            if (errors.length)
                throw this.error("Error creating grid:" + errors.join("\r\n"));
            var gh = 1 + -this.minY + this.maxY, gw = 1 + -this.minX + this.maxX;
            if (!this.grid)
                this.grid = Array(gh);
            else
                this.grid.length = gh;
            for (var y = 0; y < gh; ++y) {
                var hCells = this.grid[y];
                if (hCells)
                    hCells.length = gw;
                else
                    this.grid[y] = hCells = Array(gw);
                for (var x = 0; x < gw; ++x) {
                    var cell = hCells[x];
                    if (cell) {
                        cell.objects.length = 0;
                        cell.lastIndex = -1;
                    }
                    else
                        hCells[x] = { objects: [], lastIndex: -1 };
                }
            }
        };
        Layer.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        Layer.prototype.getGridCell = function (gridx, gridy) {
            if (!this.grid)
                this.configure();
            if (gridx === void 0)
                return void 0;
            if (gridx['currentState']) {
                var state = gridx.currentState;
                gridy = state.position.y;
                gridx = state.position.x;
            }
            if (gridy === void 0)
                return void 0;
            var gOfsX = -this.minX + (gridx | 0), gOfsY = -this.minY - (gridy | 0);
            var hCell = this.grid[gOfsY];
            return hCell && hCell[gOfsX];
        };
        Layer.prototype._OnObjectGridPositionChanged = function (obj) {
            var gx = obj.currentState.position.x | 0, gy = obj.currentState.position.y | 0;
            var cell = this.getGridCell(gx, gy) || void 0;
            if (obj._gridCell != cell) {
                if (obj._gridCell) {
                    var oldCell = obj._gridCell;
                    oldCell.objects[obj._gridItemsIndex] = oldCell.objects[oldCell.lastIndex--];
                }
                if (cell) {
                    cell.objects[++cell.lastIndex] = obj;
                    obj._gridCell = cell;
                    obj._gridItemsIndex = cell.lastIndex;
                }
                else {
                    obj._gridCell = void 0;
                    obj._gridItemsIndex = -1;
                    if ((gx < this.minX || gx > this.maxX || gy < this.minY || gy > this.maxY) && obj.onOutsideGrid)
                        obj.onOutsideGrid(this);
                }
            }
        };
        Layer.prototype._removeObjectFromGrid = function (obj) {
            var cell = obj._gridCell;
            if (cell) {
                cell.objects[obj._gridItemsIndex] = cell.objects[cell.lastIndex--];
                obj._gridCell = void 0;
                obj._gridItemsIndex = -1;
            }
        };
        Layer.prototype.startup = function () {
            if (!this.grid)
                this.configure();
            return _super.prototype.startup.call(this);
        };
        Layer.prototype.update = function (processor) {
            return _super.prototype.update.call(this, processor);
        };
        Layer.prototype.postUpdate = function (buffer, index, piplineIndex) {
            return _super.prototype.postUpdate.call(this, buffer, index, piplineIndex);
        };
        Layer.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        Layer.type = WorldSimulator2D.SpatialObject.type | WorldSimulator2D.ObjectTypes.Layer;
        Layer._nonClonableProperties = (Layer._nonClonableProperties['grid'] = void 0,
            Layer._nonClonableProperties);
        return Layer;
    }(WorldSimulator2D.SpatialObject));
    WorldSimulator2D.Layer = Layer;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=layer.js.map