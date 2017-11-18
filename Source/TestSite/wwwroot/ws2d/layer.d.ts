declare namespace WorldSimulator2D {
    interface IGridCell {
        objects: ISpatialObject[];
        lastIndex: number;
    }
    interface IHGrid extends Array<IGridCell> {
    }
    interface IVGrid extends Array<IHGrid> {
    }
    interface IGrid extends IVGrid {
    }
    interface ILayerInternals {
        grid: IGrid;
    }
    /**
     * Represents a single layer in the world which spatial objects are placed on.
     */
    class Layer extends SpatialObject<IWorld, ISpatialObject> implements ILayer, ILayerInternals {
        static readonly type: number;
        static _nonClonableProperties: I_nonClonableProperties;
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
        minX: number;
        /** The maximum particles and objects can go to the right of grid center (from 0,0). Default is 1000.
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        maxX: number;
        /** The minimum particles and objects can go up from grid center (from 0,0). Default is 1000 (positive is up in this system).
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        minY: number;
        /** The maximum particles and objects can go down from grid center (from 0,0). Default is -1000 (negative is down in this system).
        * This puts a cap on the collision grid only, which is not preallocated and normally could expand forever.
        */
        maxY: number;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(minX?: number, minY?: number, maxX?: number, maxY?: number, ...args: any[]): this;
        private _buildGrid();
        dispose(): void;
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
        /**
        * Stores the specified object in the dynamic grid system.  Valid 'gridX' and 'gridY' values must be set first, otherwise the request is ignored.
        * @param obj The object to set in the grid.
        * @returns The layer instance.
        */
        private _OnObjectGridPositionChanged(obj);
        /**
        * Removes the specified object from the dynamic grid system.  If the object is not in the grid, the request is ignored.
        * @param obj The object to removed from the grid.
        * @returns The layer instance.
        */
        private _removeObjectFromGrid(obj);
        startup(): this;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
    }
    interface ILayer extends Layer {
    }
}
