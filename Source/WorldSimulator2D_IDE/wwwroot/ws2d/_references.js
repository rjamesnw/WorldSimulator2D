var WorldSimulator2D;
(function (WorldSimulator2D) {
    for (var p in WorldSimulator2D)
        if (typeof WorldSimulator2D[p] == 'function')
            WorldSimulator2D.getTypeName(WorldSimulator2D[p]);
    var RenderTypes;
    (function (RenderTypes) {
        RenderTypes[RenderTypes["SpatialObect"] = 1] = "SpatialObect";
        RenderTypes[RenderTypes["PhysicObject"] = 2] = "PhysicObject";
        RenderTypes[RenderTypes["Matter"] = 3] = "Matter";
    })(RenderTypes = WorldSimulator2D.RenderTypes || (WorldSimulator2D.RenderTypes = {}));
    var version = "0.0.1";
    if (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0)
        console.log("-=< World Simulator 2D - v" + version + " >=- ");
    else
        console.log("%c -=< %cWorld Simulator 2D - v" + version + " %c>=- ", "background: #000; color: lightblue; font-weight:bold", "background: #000; color: yellow; font-style:italic; font-weight:bold", "background: #000; color: lightblue; font-weight:bold");
})(WorldSimulator2D || (WorldSimulator2D = {}));
var WS2D = WorldSimulator2D;
//# sourceMappingURL=_references.js.map