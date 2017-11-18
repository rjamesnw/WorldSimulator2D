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
    /**
     * Represents a single layer in the world which spatial objects are placed on.
     */
    var Layer = /** @class */ (function (_super) {
        __extends(Layer, _super);
        // --------------------------------------------------------------------------------------------------------------------
        function Layer() {
            var _this = _super.call(this) || this;
            /** The minimum particles and objects can go to the left of grid center (from 0,0). Default is -1000.
            * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
            */
            _this.minX = -999;
            /** The maximum particles and objects can go to the right of grid center (from 0,0). Default is 1000.
            * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
            */
            _this.maxX = 999;
            /** The minimum particles and objects can go up from grid center (from 0,0). Default is 1000 (positive is up in this system).
            * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
            */
            _this.minY = -999;
            /** The maximum particles and objects can go down from grid center (from 0,0). Default is -1000 (negative is down in this system).
            * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
            */
            _this.maxY = 999;
            _this.layer = _this;
            return _this;
        }
        Layer.prototype.initialize = function (isnew, autoReset) {
            _super.prototype.initialize.call(this, isnew, autoReset);
            //if (this.grid)
            //    this.grid.length = 0;
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
            var gh = 1 + -this.minY + this.maxY, gw = 1 + -this.minX + this.maxX; // (always assume 0,0 is the center cell, so there must always be a middle at 0 outwards in all directions)
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
            var gOfsX = -this.minX + (gridx | 0), gOfsY = -this.minY - (gridy | 0); // (translate grid x and y to grid array space)
            var hCell = this.grid[gOfsY];
            return hCell && hCell[gOfsX];
        };
        /**
        * Stores the specified object in the dynamic grid system.  Valid 'gridX' and 'gridY' values must be set first, otherwise the request is ignored.
        * @param obj The object to set in the grid.
        * @returns The layer instance.
        */
        Layer.prototype._OnObjectGridPositionChanged = function (obj) {
            // ... get the cell where the object will be going ...
            var gx = obj.currentState.position.x | 0, gy = obj.currentState.position.y | 0;
            var cell = this.getGridCell(gx, gy) || void 0; // (if either grid location is undefined, the object will be removed only)
            // ... if it's the same then ignore, otherwise make the change ...
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
        /**
        * Removes the specified object from the dynamic grid system.  If the object is not in the grid, the request is ignored.
        * @param obj The object to removed from the grid.
        * @returns The layer instance.
        */
        Layer.prototype._removeObjectFromGrid = function (obj) {
            var cell = obj._gridCell;
            if (cell) {
                cell.objects[obj._gridItemsIndex] = cell.objects[cell.lastIndex--];
                obj._gridCell = void 0;
                obj._gridItemsIndex = -1;
            }
        };
        // --------------------------------------------------------------------------------------------------------------------
        Layer.prototype.startup = function () {
            if (!this.grid)
                this.configure(); // (was not configured yet; use defaults)
            return _super.prototype.startup.call(this);
        };
        //addGridDebugParticles(processor: MathPiplines.MathProcessor, includeChildren?: boolean, includeNext?: boolean): this {
        //    var groupItem = processor.currentChannel, i = groupItem.length, w = this.world;
        //    // ... add static entries for where objects are in grid locations ...
        //    for (var y = 0; y < this.grid.length; ++y)
        //        for (var x = 0; x < this.grid[y].length; ++x) {
        //            var cell = this.grid[y][x];
        //            if (cell && cell.lastIndex >= 0) {
        //                // ... clear this block first ...
        //                //for (var i2 = 0; i2 < MathPiplines.DataBufferOffsets.blockSize; ++i2)
        //                //    groupItem.buffer[i + i2] = 0;
        //                // ... set static properties (if mass is 0, it won't move) ...
        //                groupItem.buffer[i + MathPiplines.GravityCalculationInputs.id] = -1; // (not an object)
        //                groupItem.buffer[i + MathPiplines.GravityCalculationInputs.colorRGB] = (0xf0 << 16) | (0xf0 << 8) | (0xf0 - cell.lastIndex * 8);
        //                groupItem.buffer[i + MathPiplines.GravityCalculationInputs.alpha] = 0.25;
        //                groupItem.buffer[i + MathPiplines.GravityCalculationInputs.mass] = 0;
        //                groupItem.buffer[i + MathPiplines.GravityCalculationInputs.x] = (this.minX + x) * w.pixelSize;
        //                groupItem.buffer[i + MathPiplines.GravityCalculationInputs.y] = (-this.minY - y) * w.pixelSize;
        //                i = groupItem.length += MathPiplines.GravityCalculationInputs.blockSize;
        //                if (i + MathPiplines.GravityCalculationInputs.blockSize > groupItem.buffer.length)
        //                    throw this.error("Out of buffer space for setting layer grid debug view.");
        //                w.resend = true;
        //            }
        //        }
        //    return this;
        //}
        Layer.prototype.update = function (processor) {
            return _super.prototype.update.call(this, processor);
        };
        Layer.prototype.postUpdate = function (buffer, index, piplineIndex) {
            return _super.prototype.postUpdate.call(this, buffer, index, piplineIndex);
        };
        Layer.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        // --------------------------------------------------------------------------------------------------------------------
        Layer.type = WorldSimulator2D.SpatialObject.type | WorldSimulator2D.ObjectTypes.Layer;
        Layer._nonClonableProperties = (Layer._nonClonableProperties['grid'] = void 0,
            Layer._nonClonableProperties);
        return Layer;
    }(WorldSimulator2D.SpatialObject));
    WorldSimulator2D.Layer = Layer;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=layer.js.map