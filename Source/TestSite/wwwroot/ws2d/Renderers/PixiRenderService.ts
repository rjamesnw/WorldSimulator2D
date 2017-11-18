namespace WorldSimulator2D {
    /**
     * Represents a base class to be used to render output from the engine.
     * This allows any number of output sources, such as PixiJS (default), simple DOM elements, etc. (wherever your imagination takes you!).
     */
    export class PixiRenderService extends ResourceManager {
        // --------------------------------------------------------------------------------------------------------------------

        readonly loader = new PIXI.loaders.Loader();

        renderer: PIXI.SystemRenderer;

        constructor() {
            super();
        }

        // --------------------------------------------------------------------------------------------------------------------

        configure(element: HTMLElement, width: number, height: number, options?: PIXI.IRendererOptions): this {
            super.configure(element, width, height);
            var elementIsCanvas = this.element && typeof this.element == 'object' && this.element instanceof HTMLCanvasElement;
            this.renderer = PIXI.autoDetectRenderer(width, height, options || {
                transparent: true,
                resolution: 1,
                antialias: true,
                autoResize: true,
                view: elementIsCanvas && <HTMLCanvasElement>this.element || void 0
            })
            if (!elementIsCanvas && this.element && this.element.appendChild)
                this.element.appendChild(this.renderer.view);
            return this;
        }

        // PIXI.loader.on('progress', function (loader, loadedResource) {    console.log('Progress:', loader.progress + '%');});

        loadResources(): void {
            var loader = this.loader;
            for (var i = 0, n = ResourceManager.resources.length; i < n; ++i)
                if (ResourceManager.resources[i].state == LoadingStates.NotLoaded) {
                    loader = loader.add(ResourceManager.resources[i]);
                    ResourceManager.resources[i].state = LoadingStates.Loading;
                }
            loader.load((loader: PIXI.loaders.Loader, resources: PIXI.loaders.IResourceDictionary) => {
                for (var p in resources) this.registerLoadedResource(resources[p].url, resources[p]);
            });
        }

        // --------------------------------------------------------------------------------------------------------------------

        createGraphObject(): PIXI.Container {
            return new PIXI.Container();
        }

        addToGraphObject(graphObject: PIXI.Container, childObject: PIXI.Container): PIXI.Container {
            return graphObject.addChild(childObject);
        }

        removeFromGraphObject(graphObject: PIXI.Container, childObjectOrIndex: PIXI.Container | number): object {
            if (typeof childObjectOrIndex == "number")
                return graphObject.removeChildAt(childObjectOrIndex);
            else
                return graphObject.removeChild(childObjectOrIndex);
        }

        cacheGraphObject(graphObject: PIXI.Container, enable: boolean): PIXI.Container {
            graphObject.cacheAsBitmap = enable;
            return graphObject;
        }

        // --------------------------------------------------------------------------------------------------------------------

        getTexture(resourcePathOrID?: string): PIXI.Texture {
            if (resourcePathOrID === null || resourcePathOrID === void 0) resourcePathOrID = '';
            else if (typeof resourcePathOrID != STRING) resourcePathOrID = '' + resourcePathOrID;
            var res = resourcePathOrID && this.getResource<PIXI.loaders.Resource>(resourcePathOrID);
            return res instanceof PIXI.Texture ? res : (res && res.texture);
        }

        createRenderTexture(width: number, height: number, color?: string, alpha = 1.0): PIXI.Texture {
            if (!color)
                return PIXI.RenderTexture.create(width, height);
            else {
                if (typeof color != 'string') color = '' + color;
                if (color.length > 6)
                    color = color.slice(-6); // (perhaps alpha was given, which is not supported here)
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                ctx.beginPath();
                ctx.rect(0, 0, width, height);
                ctx.fillStyle = '#' + color;
                ctx.globalAlpha = alpha;
                ctx.fill();
                return PIXI.RenderTexture.fromCanvas(canvas);
            }
        }

        renderToTexture(graphObject: PIXI.Container, texture: PIXI.RenderTexture): PIXI.RenderTexture {
            this.renderer.render(graphObject, texture);
            return texture;
        }

        // --------------------------------------------------------------------------------------------------------------------

        createSprite(resourcePathOrID?: string, texture?: PIXI.Texture, tint = 0xFFFFFF, alpha = 1): PIXI.Sprite {
            if (resourcePathOrID === null || resourcePathOrID === void 0) resourcePathOrID = '';
            if (!resourcePathOrID && (texture === null || texture === void 0 || !(texture instanceof PIXI.Texture)))
                throw this.error("A valid resource path/ID or texture is required.");
            var sprite = new PIXI.Sprite(texture || this.getTexture(resourcePathOrID));
            sprite.tint = tint;
            sprite.alpha = alpha;
            return sprite;
        }

        setSpriteScale(sprite: PIXI.Sprite, scalex: number, scaley: number): PIXI.Sprite {
            sprite.scale.set(scalex, scaley);
            return sprite;
        }

        setSpriteTint(sprite: PIXI.Sprite, tint: number): PIXI.Sprite {
            sprite.tint = tint;
            return sprite;
        }

        setSpriteAlpha(sprite: PIXI.Sprite, alpha: number): PIXI.Sprite {
            sprite.alpha = alpha;
            return sprite;
        }

        setSpritePosition(sprite: PIXI.Sprite, x: number, y: number): PIXI.Sprite {
            if (x !== void 0 && x !== null)
                sprite.x = x;
            if (y !== void 0 && y !== null)
                sprite.y = y;
            return sprite;
        }

        // --------------------------------------------------------------------------------------------------------------------

        render(graphObejct: PIXI.Container): void {
            this.renderer.render(graphObejct);
        }

        // --------------------------------------------------------------------------------------------------------------------
    }
}

// PixiJS Demos: https://goo.gl/E1KJES
