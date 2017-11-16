var engine: WorldSimulator2D.Engine;

//var testLength = (10000);
//const gpu = new GPU();
//const testGpu = gpu.createKernel(function (a) {
//    var r = 0;
//    for (var i = 0; i < this.constants.count; i++) {
//        r = a[this.thread.x + i] * 2;
//        r = a[this.thread.x + i] / 2;
//        r = a[this.thread.x + i] + 1;
//    }
//    return r;
//}, {
//        constants: { count: testLength },
//        output: [testLength]
//    });
//var input: number[] = new Array(testLength);
//for (var i = testLength - 1; i >= 0; --i) {
//    input[i] = Math.random() * i;
//}

function startYourEngines() {
    //WorldSimulator2D.inlineSuperCalls();

    engine = new WorldSimulator2D.Engine();
    engine.createPeriodicTableElements();

    var world = engine.createWorld().configure('mainCanvas');
    var layer = world.createLayer();

    var m1 = engine.createMatterParticle(WorldSimulator2D.PeriodicTable.Iron);
    var m2 = engine.createMatterParticle(WorldSimulator2D.PeriodicTable.Copper);
    var m3 = engine.createMatterParticle(WorldSimulator2D.PeriodicTable.Tin);
    var m4 = engine.createMatterParticle(WorldSimulator2D.PeriodicTable.Aluminum);
    var m5 = engine.createMatter("Water")
        .addElement(WorldSimulator2D.PeriodicTable.Hydrogen, 2)
        .addElement(WorldSimulator2D.PeriodicTable.Oxygen);
    m5.color = "0000FF";

    var initMatterList = [m1, m2, m3, m4, m5];

    for (var i = WS2D.MAX_OBJECTS / 4; i > 0; --i) {
        var m = initMatterList[Math.floor(Math.random() * initMatterList.length)].clone();
        m.x = 800 - Math.random() * 1600;
        m.y = 800 - Math.random() * 1600;
        m.velocity.x = 2 - Math.random() * 4;
        m.velocity.y = 2 - Math.random() * 4;
        var cell = layer.getGridCell(m);
        if (!cell || cell.lastIndex >= 0) { --i; continue; /*something is already here, or cell is out of bounds somehow; skip and try again*/ }
        layer.add(m);
    }

    /**
     * Update the game calculations.  This should be done BETWEEN render frames, started immediately after the first render.
     */
    var update = () => {
        //var physicsUpdateCount = 60 / world.velocityScale;
        //if (physicsUpdateCount < 1) physicsUpdateCount = 1;
        //for (var i = 0; i < physicsUpdateCount; ++i)
        engine.update();
    };

    var fpsLast = Date.now(), fpsCount = 0, fps = 0, gpujsSupported = true;
    var fpsList = new Array(3), fpsTotal = 0;
    var render = () => {
        requestAnimationFrame(render);
        // clearInterval(handle); // (once only)

        var now = Date.now();
        var dateDiff = now - fpsLast;
        if (dateDiff >= 1000) {
            fpsLast += 1000; // (don't reset, just subtract in case it went over, so we stay more precise)
            fpsTotal += -(fpsList.shift() || 0) + fpsCount;
            fpsList.push(fpsCount);
            fps = fpsTotal / fpsList.length;
            fpsCount = 0;
        }

        document.getElementById('objectCount').innerText = (world.flattenedItems && world.flattenedItems.count || 0).toString();
        document.getElementById('fps').innerText = fps.toString();

        engine.render();

        //if (fps > 20 && layer.children.count + 3 < WorldSimulator2D.MAX_OBJECTS) { // (fps is 0 on start, but will grow, then particles will be added each frame until the min FPS is reached)
        //    var m = initMatterList[Math.floor(Math.random() * initMatterList.length)].clone();
        //    m.x = 500 - Math.random() * 1000;
        //    m.y = 500 - Math.random() * 1000;
        //    m.currentState.velocity.x = 1 - Math.random() * 2;
        //    m.currentState.velocity.y = 1 - Math.random() * 2;
        //    layer.add(m);
        //    m.startup();
        //}

        ++fpsCount;

        //if (gpujsSupported)
        //    try {
        //        var result = testGpu(input);
        //        input = result;
        //    } catch (e) {
        //        gpujsSupported = false;
        //        alert(e + '\r\nCheck the console for any extra details.');
        //        if (confirm("Stop execution?"))
        //            clearInterval(handle);
        //    }

        WS2D.setImmediate(update); // (after screen render, immediately begin the next update)
        // (this function allows the browser to update the view and immediately trigger the next
        //  update within the following 16.67ms time window before the next render)
    };

    if (!self.requestAnimationFrame)
        self['requestAnimationFrame'] = self.webkitRequestAnimationFrame || function (callback: FrameRequestCallback) { return setInterval(callback, 1000 / 60); };

    update(); // TODO: Need to StartUp config the buffers and render before updates!

    requestAnimationFrame(render);
}

//namespace Loader {

//    /** Used by the bootstrapper in applying system scripts as they become ready.
//      * Applications should normally never use this, and instead use the 'modules' system in the 'CoreXT.Scripts' namespace for
//      * script loading.
//      */
//    export function _SystemScript_onReady_Handler(request: WS2D.Loader.IResourceRequest) {
//        try {
//            eval(request.transformedData); // ('CoreXT.eval' is used for system scripts because some core scripts need initialize in the global scope [mostly due to TypeScript limitations])
//            request.status = WS2D.Loader.RequestStatuses.Executed;
//            request.message = "The script has been executed.";
//        } catch (e) {
//            request.setError("There was an error executing script '" + request.url + "':", e);
//        }
//    }

//    export function bootstrap() {
//        // (note: the request order is the dependency order)

//        var onReady = _SystemScript_onReady_Handler;
//        var get = WS2D.Loader.get;

//        get("/lib/modernizr/modernizr.jsScripts/site.js").ready(onReady)
//            .include(get("/lib/jquery/dist/jquery.js")).ready(onReady)
//            .include(get("CoreXT.Browser.js")).ready(onReady) // (in case some polyfills are needed after this point)
//            .include(get("CoreXT.Scripts.js").ready(onReady))
//            // ... load the rest of the core system next ...
//            .include(get("System/CoreXT.System.js").ready(onReady))
//            .include(get("System/CoreXT.System.PrimitiveTypes.js").ready(onReady))
//            .include(get("System/CoreXT.System.AppDomain.js").ready(onReady))
//            .include(get("System/CoreXT.System.Time.ts")).ready(onReady)
//            .include(get("System/CoreXT.System.IO.js").ready(onReady))
//            .include(get("System/CoreXT.System.Data.js").ready(onReady))
//            .include(get("System/CoreXT.System.Diagnostics.js").ready(onReady))
//            .include(get("System/CoreXT.System.Exception.js").ready(onReady))
//            .include(get("System/CoreXT.System.Events.js").ready(onReady))
//            .ready(() => {
//                // ... all core system scripts loaded, load the default manifests next ...
//                Scripts.getManifest() // (load the default manifest in the current path [defaults to 'manifest.js'])
//                    .include(Scripts.getManifest("app.manifest")) // (load a custom named manifest; application launching begins here)
//                    .ready((mod) => {
//                        CoreXT.onReady.dispatch();
//                        Scripts._tryRunApp();
//                    }) // (triggered when 'app.manifest' is executed and ready)
//                    .start();
//            })
//            .start(); // (note: while all requests are loaded in parallel [regardless of dependencies], all 'ready' events are fired in proper order)

//        CoreXT.Loader.bootstrap = <any>noop(); // (prevent this function from being called again)
//    }
//}