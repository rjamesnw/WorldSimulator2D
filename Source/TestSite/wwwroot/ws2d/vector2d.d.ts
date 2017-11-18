declare namespace WorldSimulator2D {
    class Vector2D implements IClonable, IDisposable, IInitializable {
        static readonly Up: Vector2D;
        static readonly Down: Vector2D;
        static readonly Left: Vector2D;
        static readonly Right: Vector2D;
        static readonly Zero: Vector2D;
        x: number;
        y: number;
        /** Normalized 'x' after 'updateNormals()' is called. */
        nx: number;
        /** Normalized 'y' after 'updateNormals()' is called. */
        ny: number;
        constructor(x?: number, y?: number);
        initialize?(isnew: boolean, autoReset?: boolean, autoResetProperties?: boolean): void;
        isDisposed?: boolean;
        dispose?(): void;
        clone(): this;
        updateNormals(): void;
    }
}
