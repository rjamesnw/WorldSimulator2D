/// <reference path="renderers/webgljs.ts" />
/// <reference path="indexedcollection.ts" />
/// <reference path="utilities.ts" />
/// <reference path="loader.ts" />
/// <reference path="vector2d.ts" />
/// <reference path="engineobject.ts" />
/// <reference path="graphobject.ts" />
/// <reference path="spatialobject.ts" />
/// <reference path="physicsobject.ts" />
/// <reference path="layer.ts" />
/// <reference path="matter.ts" />
/// <reference path="Math/gpuprocessing.ts" />
/// <reference path="Math/cpu.ts" />
/// <reference path="Math/mathprocessor.ts" />
/// <reference path="world.ts" />
/// <reference path="worldobject.ts" />
/// <reference path="resourcemanager.ts" />
/// <reference path="periodictable.ts" />
/// <reference path="engine.ts" />

namespace WorldSimulator2D {
    // ... some type initializations required before the system can be used ...

    for (var p in WorldSimulator2D)
        if (typeof WorldSimulator2D[p] == 'function')
            getTypeName(WorldSimulator2D[p]);

    export enum RenderTypes {
        SpatialObect = 1,
        PhysicObject = 2,
        Matter = 3
    }

    var version = "0.0.1"
    if (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0)
        console.log("-=< World Simulator 2D - v" + version + " >=- ");
    else
        console.log("%c -=< %cWorld Simulator 2D - v" + version + " %c>=- ", "background: #000; color: lightblue; font-weight:bold", "background: #000; color: yellow; font-style:italic; font-weight:bold", "background: #000; color: lightblue; font-weight:bold");
}

import WS2D = WorldSimulator2D;