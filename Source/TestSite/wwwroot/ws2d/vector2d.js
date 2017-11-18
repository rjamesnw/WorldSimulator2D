var WorldSimulator2D;
(function (WorldSimulator2D) {
    var buf = new ArrayBuffer(4), f32 = new Float32Array(buf), u32 = new Uint32Array(buf);
    var Vector2D = /** @class */ (function () {
        function Vector2D(x, y) {
            this.x = 0;
            this.y = 0;
            /** Normalized 'x' after 'updateNormals()' is called. */
            this.nx = 0;
            /** Normalized 'y' after 'updateNormals()' is called. */
            this.ny = 0;
            this.x = x || 0;
            this.y = y || 0;
        }
        Vector2D.prototype.initialize = function (isnew, autoReset, autoResetProperties) {
            if (autoReset) {
                this.x = 0;
                this.y = 0;
                this.nx = 0;
                this.ny = 0;
            }
        };
        Vector2D.prototype.dispose = function () { this.x = void 0; this.y = void 0; WorldSimulator2D.Engine.dispose(this); };
        Vector2D.prototype.clone = function () {
            return WorldSimulator2D.Engine.create(this.constructor, false, null, this.x, this.y);
        };
        Vector2D.prototype.updateNormals = function () {
            var mag = Math.sqrt(this.x * this.x + this.y * this.y);
            if (mag) {
                this.nx = this.x / mag;
                this.ny = this.y / mag;
            }
            else {
                this.nx = 0;
                this.ny = 0;
            }
        };
        Vector2D.Up = new Vector2D(0, 1);
        Vector2D.Down = new Vector2D(0, -1);
        Vector2D.Left = new Vector2D(-1, 0);
        Vector2D.Right = new Vector2D(1, 0);
        Vector2D.Zero = new Vector2D();
        return Vector2D;
    }());
    WorldSimulator2D.Vector2D = Vector2D;
})(WorldSimulator2D || (WorldSimulator2D = {}));
//# sourceMappingURL=vector2d.js.map