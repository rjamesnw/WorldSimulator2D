namespace WorldSimulator2D {

    var buf = new ArrayBuffer(4),
        f32 = new Float32Array(buf),
        u32 = new Uint32Array(buf);

    export class Vector2D implements IClonable, IDisposable, IInitializable {
        static readonly Up: Vector2D = new Vector2D(0, 1);
        static readonly Down: Vector2D = new Vector2D(0, -1);
        static readonly Left: Vector2D = new Vector2D(-1, 0);
        static readonly Right: Vector2D = new Vector2D(1, 0);
        static readonly Zero: Vector2D = new Vector2D();

        x: number = 0;
        y: number = 0;

        /** Normalized 'x' after 'updateNormals()' is called. */
        nx: number = 0;
        /** Normalized 'y' after 'updateNormals()' is called. */
        ny: number = 0;

        constructor(x?: number, y?: number) {
            this.x = x || 0;
            this.y = y || 0;
        }

        initialize?(isnew: boolean, autoReset?: boolean, autoResetProperties?: boolean): void {
            if (autoReset) {
                this.x = 0;
                this.y = 0;
                this.nx = 0;
                this.ny = 0;
            }
        }

        isDisposed?: boolean;
        dispose?(): void { this.x = void 0; this.y = void 0; Engine.dispose(this); }
        clone(): this {
            return <this>Engine.create(<typeof Vector2D>this.constructor, false, null, this.x, this.y);
        }

        updateNormals(): void {
            var mag = Math.sqrt(this.x * this.x + this.y * this.y);
            if (mag) {
                this.nx = this.x / mag;
                this.ny = this.y / mag;
            } else { this.nx = 0; this.ny = 0; }
        }

        ///**
        // * Uses "Approximation with Polynomial Curves", which is sort of like interpolation between given values if x and y are already close to 1.
        // */
        //? fastUpdateNormalsNearOne(): void { // (src: http://allenchou.net/2014/02/game-math-fast-re-normalization-of-unit-vectors/)
        //    var x = this.x, y = this.y;
        //    var n = x * x + y * y;

        //    // ... square by interpolation ...
        //    var a0 = 15.0 / 8.0;
        //    var a1 = -5.0 / 4.0;
        //    var a2 = 3.0 / 8.0;
        //    n = a0 + a1 * n + a2 * n * n;

        //    this.nx = x * n;
        //    this.nx = y * n;
        //}
    }
}