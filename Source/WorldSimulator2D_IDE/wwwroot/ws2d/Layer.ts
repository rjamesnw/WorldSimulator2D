namespace WorldSimulator2D {

    export interface IGridCell {
        objects: ISpatialObject[];
        lastIndex: number; // (faster to use this instead of 'objects.length' when adding/removing objects for this special case: https://jsperf.com/testing-item-swap-instead-of-deletion-or-splice)
        // (how to remove: objects[replaceIndex] = objects[lastIndex--]; how to add: objects[++lastIndex] = newItem)
    }
    export interface IHGrid extends Array<IGridCell> { }
    export interface IVGrid extends Array<IHGrid> { }
    export interface IGrid extends IVGrid { }

    export interface ILayerInternals {
        grid: IGrid;
    }

    /**
     * Represents a single layer in the world which spatial objects are placed on.
     */
    export class Layer extends SpatialObject<IWorld, ISpatialObject> implements ILayer, ILayerInternals {
        // --------------------------------------------------------------------------------------------------------------------

        static readonly type = SpatialObject.type | ObjectTypes.Layer;

        static _nonClonableProperties: I_nonClonableProperties = (
            Layer._nonClonableProperties['grid'] = void 0,
            Layer._nonClonableProperties
        );

        // --------------------------------------------------------------------------------------------------------------------

        /** The previous layer object. */
        readonly previous: ILayer;

        /** The next layer object. */
        readonly next: ILayer;

        /**
        * A layer grid is an array of active objects, typically representing the grid-scaled location of a special object.
        * The grid allows for fast lookups of surrounding objects without needing to test every single object.
        */
        readonly grid: IGrid;

        /** The minimum particles and objects can go to the left of grid center (from 0,0). Default is -1000.
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        minX: number = -999;

        /** The maximum particles and objects can go to the right of grid center (from 0,0). Default is 1000.
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        maxX: number = 999;

        /** The minimum particles and objects can go up from grid center (from 0,0). Default is 1000 (positive is up in this system).
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        minY: number = -999;

        /** The maximum particles and objects can go down from grid center (from 0,0). Default is -1000 (negative is down in this system).
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        maxY: number = 999;

        // --------------------------------------------------------------------------------------------------------------------

        constructor() {
            super();
            (<IGraphObjectInternal>this).layer = this;
        }

        initialize(isnew: boolean, autoReset?: boolean) {
            super.initialize(isnew, autoReset);

            //if (this.grid)
            //    this.grid.length = 0;
        }

        configure(minX?: number, minY?: number, maxX?: number, maxY?: number, ...args: any[]): this {
            super.configure();

            if (minX !== void 0) this.minX = minX;
            if (minY !== void 0) this.minY = minY;
            if (maxX !== void 0) this.maxX = maxX;
            if (maxY !== void 0) this.maxY = maxY;

            this._buildGrid();

            return this;
        }

        private _buildGrid() { // TODO: Consider ICacheArray here.
            var errors: string[] = [];
            if (this.minY > 0) errors.push("'minY' (" + this.minY + ") cannot be greater than 0 (grid center).");
            if (this.maxY < 0) errors.push("'maxY' (" + this.maxY + ") cannot be less than 0 (grid center).");
            if (this.minX > 0) errors.push("'minX' (" + this.minX + ") cannot be greater than 0 (grid center).");
            if (this.maxX < 0) errors.push("'maxX' (" + this.maxX + ") cannot be less than 0 (grid center).");
            if (errors.length) throw this.error("Error creating grid:" + errors.join("\r\n"));

            var gh = 1 + -this.minY + this.maxY, gw = 1 + -this.minX + this.maxX; // (always assume 0,0 is the center cell, so there must always be a middle at 0 outwards in all directions)

            if (!this.grid)
                (<ILayerInternals>this).grid = Array(gh);
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
                    else hCells[x] = { objects: [], lastIndex: -1 };
                }
            }
        }

        dispose(): void {
            super.dispose();
        }

        // --------------------------------------------------------------------------------------------------------------------

        /**
         * The grid cell items at the specific grid location.
         * @param gridx The grid X cell location (integer only).
         * @param gridy The grid Y cell location (integer only).
         */
        getGridCell(gridx: number, gridy: number): IGridCell;
        /**
         * The grid cell items at the specific grid location the specified object is in.
         * @param obj The object to get grid items for.
         * @param createIfNone If true (default is false) and no array of items exists, one is created and returned.
         */
        getGridCell(obj: ISpatialObject): IGridCell;
        getGridCell(gridx: any, gridy?: any): IGridCell {
            if (!this.grid) this.configure();
            if (gridx === void 0) return void 0;
            if (gridx['currentState']) {
                var state = (<ISpatialObject>gridx).currentState;
                gridy = state.position.y;
                gridx = state.position.x;
            }
            if (gridy === void 0) return void 0;
            var gOfsX = -this.minX + (gridx | 0), gOfsY = -this.minY - (gridy | 0); // (translate grid x and y to grid array space)
            var hCell = this.grid[gOfsY];
            return hCell && hCell[gOfsX];
        }

        /**
        * Stores the specified object in the dynamic grid system.  Valid 'gridX' and 'gridY' values must be set first, otherwise the request is ignored.
        * @param obj The object to set in the grid.
        * @returns The layer instance.
        */
        private _OnObjectGridPositionChanged(obj: ISpatialObject): void {
            // ... get the cell where the object will be going ...
            var gx = obj.currentState.position.x | 0, gy = obj.currentState.position.y | 0;
            var cell = this.getGridCell(gx, gy) || void 0; // (if either grid location is undefined, the object will be removed only)
            // ... if it's the same then ignore, otherwise make the change ...
            if (obj._gridCell != cell) { // (note: first time for many objects '_gridCell' may be undefined, thus causing 'cell' to be undefined, and will be ignored until valid values are set)
                if (obj._gridCell) {
                    let oldCell = obj._gridCell;
                    oldCell.objects[obj._gridItemsIndex] = oldCell.objects[oldCell.lastIndex--];
                }
                if (cell) { // (if cell is undefined, then the object is out of bounds and will remain outside the grid)
                    cell.objects[++cell.lastIndex] = obj;
                    (<ISpatialObjectInternal>obj)._gridCell = cell;
                    (<ISpatialObjectInternal>obj)._gridItemsIndex = cell.lastIndex;
                } else {
                    (<ISpatialObjectInternal>obj)._gridCell = void 0;
                    (<ISpatialObjectInternal>obj)._gridItemsIndex = -1;
                    if ((gx < this.minX || gx > this.maxX || gy < this.minY || gy > this.maxY) && obj.onOutsideGrid)
                        obj.onOutsideGrid(this);
                }
            }
        }

        /**
        * Removes the specified object from the dynamic grid system.  If the object is not in the grid, the request is ignored.
        * @param obj The object to removed from the grid.
        * @returns The layer instance.
        */
        private _removeObjectFromGrid(obj: ISpatialObject): void {
            var cell = obj._gridCell;
            if (cell) { // (if cell is undefined, then the object is removed only)
                cell.objects[obj._gridItemsIndex] = cell.objects[cell.lastIndex--];
                (<ISpatialObjectInternal>obj)._gridCell = void 0;
                (<ISpatialObjectInternal>obj)._gridItemsIndex = -1;
            }
        }

        // --------------------------------------------------------------------------------------------------------------------

        startup(): this {
            if (!this.grid)
                this.configure(); // (was not configured yet; use defaults)
            return super.startup();
        }

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

        update(processor: MathPipelines.MathProcessor) {
            return super.update(processor);
        }

        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this {
            return super.postUpdate(buffer, index, piplineIndex);
        }

       render(): void {
            super.render();
        }

        // --------------------------------------------------------------------------------------------------------------------
    }

    export interface ILayer extends Layer { }
}