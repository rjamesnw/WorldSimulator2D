/// <reference path="renderers/webgljs.d.ts" />
/// <reference path="indexedcollection.d.ts" />
/// <reference path="utilities.d.ts" />
/// <reference path="loader.d.ts" />
/// <reference path="vector2d.d.ts" />
/// <reference path="engineobject.d.ts" />
/// <reference path="graphobject.d.ts" />
/// <reference path="spatialobject.d.ts" />
/// <reference path="physicsobject.d.ts" />
/// <reference path="layer.d.ts" />
/// <reference path="matter.d.ts" />
/// <reference path="Math/gpuprocessing.d.ts" />
/// <reference path="Math/cpu.d.ts" />
/// <reference path="Math/mathprocessor.d.ts" />
/// <reference path="world.d.ts" />
/// <reference path="worldobject.d.ts" />
/// <reference path="resourcemanager.d.ts" />
/// <reference path="periodictable.d.ts" />
/// <reference path="engine.d.ts" />
declare namespace WorldSimulator2D {
    enum RenderTypes {
        SpatialObect = 1,
        PhysicObject = 2,
        Matter = 3,
    }
}
import WS2D = WorldSimulator2D;
