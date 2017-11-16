# 2D World Particle-Based Simulator
#### _(WARNING: Work In Progress, very early stages currently)_

A 2D WebGL-based world particle simulator library using TypeScript, and an optional IDE written in .Net Core ASP.Net/MVC. The system uses the GPU and/or Web Workers to run accelerated math calculations called "Math Pipelines".

The system comes in 2 parts:

## Part 1: Game Engine

The game engine is comprised of mostly TypeScript files that transpile to  `worldsimulator2d.js`, `worldsimulator2d.js.map`, and `worldsimulator2d.d.ts` files, where only `worldsimulator2d.js` is needed to load the engine on the client side (it does not rely on any other library).

The system is currently in beta, so the only way to load the file into your project is to download the `worldsimulator2d.js` file an included it as normal:

`<script src='[path_to_scripts/]worldsimulator2d.js'></script>`

The follow code is in TypeScript (which will look like regular JavaScript for the most part).  You begin by loading the engine first, like this:

`var engine = new WorldSimulator2D.Engine();` or `var engine = new WS2D.Engine();` (whichever is preferred).

Next, you need to create a world instance, and a layer on the world, then at least one particle of matter in order to see anything:

```
var world = engine.createWorld().configure('yourCanvasOrDivElementID');
var layer = world.createLayer();
var particle = engine.createMatterParticle(WS2D.PeriodicTable.Iron);
particle.x = 100 - Math.random() * 200; // (just put it in a random spot)
particle.y = 100 - Math.random() * 200; // (just put it in a random spot)
particle.velocity.x = 1 - Math.random() * 2; // (randomize velocity)
particle.velocity.y = 1 - Math.random() * 2; // (randomize velocity)
layer.add(particle);
```

How to run the engine loop is still under construction, but at the moment I'm doing this:

```
    var update = () => {
        engine.update();
    };

    var render = () => {
        requestAnimationFrame(render);
        engine.render();
        WS2D.setImmediate(update); // (after screen render, immediately begin the next update)
        // (this function allows the browser to update the view and immediately trigger the next
        //  update within the following 16.67ms time window before the next render)
    };

    // (simple polyfill just in case)
    if (!self.requestAnimationFrame)
        self['requestAnimationFrame'] = self.webkitRequestAnimationFrame 
        || function (callback: FrameRequestCallback) { return setInterval(callback, 1000 / 60); };

    requestAnimationFrame(render);
```

## Part 2: The IDE

The Integrated Development Environment (IDE) is the .Net Core Website used to create new WS2D simulations.