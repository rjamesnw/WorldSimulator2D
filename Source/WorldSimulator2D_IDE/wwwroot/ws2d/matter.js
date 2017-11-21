var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WorldSimulator2D;
(function (WorldSimulator2D) {
    var States;
    (function (States) {
        States[States["Air"] = 0] = "Air";
        States[States["Water"] = 1] = "Water";
        States[States["Rock"] = 2] = "Rock";
        States[States["Metal"] = 3] = "Metal";
    })(States = WorldSimulator2D.States || (WorldSimulator2D.States = {}));
    ;
    /**
     * Records binding properties between matter.
     * Matter "breaks off" from groups when the surrounding attraction is no longer adequate to hold onto it.
     */
    var Binding = /** @class */ (function () {
        /**
         * Constructs an object to
         * @param source The owner of this instance.
         * @param target The target bound to.
         * @param magnitude The amount of force attraction between the two matter particles.
         * @param constraint An angular
         */
        function Binding(source, target, magnitude, constraint) {
            if (magnitude === void 0) { magnitude = 1; }
            if (constraint === void 0) { constraint = 0; }
            this.source = source;
            this.target = target;
            this.magnitude = magnitude;
            this.constraint = constraint;
        }
        return Binding;
    }());
    WorldSimulator2D.Binding = Binding;
    /**
     * The most basic element in the world simulator is particle matter.  It has properties that defined its behavior in the world simulator.
     * It's important to remember that most values in the simulator are not designed to be "real world" for better "playability".
     * Matter exists as the smallest unit - so each world "pixel" (may be more than one screen pixel) is a piece of matter.
     * No two matter particles can occupy the same space.
     * Note: Don't defined a property if it is not applicable (it should be left undefined, or set to undefined is no longer in use).
     */
    var Matter = /** @class */ (function (_super) {
        __extends(Matter, _super);
        // --------------------------------------------------------------------------------------------------------------------
        function Matter() {
            var _this = _super.call(this) || this;
            /** A color to use for this matter.  */
            _this.color = 'FF808080';
            /** The direction of magnetic north.  Only used if the magnetic factor is grater than zero. */
            _this.magneticNorth = WorldSimulator2D.Vector2D.Up;
            _this.canCollide = true; // (default for matter particles)
            return _this;
        }
        Object.defineProperty(Matter.prototype, "vaporPressure", {
            /**
             * Liquids boil when their vapor pressure is equal to the pressure exerted on the liquid by its surroundings.
             * 0.0 is no pressure (solid, no molecular movement), whereas 1.0 is full pressure (great molecular movement) turning the
             * matter into gas (assuming the surrounding pressure is less).
             * For liquids, the vapor pressure (as a function of temperature) has an exponential behavior.
             */
            get: function () {
                return this.boilingPoint > 0 ? this.temperature / this.boilingPoint : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matter.prototype, "friction", {
            get: function () {
                var heatingOffsetFactor = this.freezingPoint > 0 ? this.temperature / this.freezingPoint : 0;
                var friction = this.frictionCoefficient + Math.pow(heatingOffsetFactor > 1 ? 1 : heatingOffsetFactor, Matter.solidFrictionTempuratureExponent); // (based on solid state)
                if (heatingOffsetFactor <= 1)
                    return friction;
                // ... beyond the melting point (or freezing point) heat affects viscosity instead ...
                var liquidTempSpan = this.boilingPoint - this.freezingPoint;
                heatingOffsetFactor = liquidTempSpan != 0 ? (this.temperature - this.freezingPoint) / liquidTempSpan : 0;
                friction -= Math.pow(1 - heatingOffsetFactor, Matter.solidFrictionTempuratureExponent); // (based on liquid state)
                return friction < 0 ? 0 : friction; // (0=space [friction is gone])
            },
            enumerable: true,
            configurable: true
        });
        Matter.prototype.initialize = function (isnew, autoReset) {
            _super.prototype.initialize.call(this, isnew, autoReset);
            if (this.bindings) {
                for (var i = this.bindings.length - 1; i >= 0; --i)
                    this.bindings[i] = null;
                this.bindings.length = 0;
            }
        };
        Matter.prototype.configure = function (element) {
            this.element = element;
            return this;
        };
        Matter.prototype.clone = function () {
            var c = _super.prototype.clone.call(this);
            c._element = this._element; // (reference the same element, which usually never changes)
            return c;
        };
        Object.defineProperty(Matter.prototype, "element", {
            // --------------------------------------------------------------------------------------------------------------------
            /** Gets or sets a single element.  If there are more than one element, only the first element is changed. */
            get: function () { return this._element; },
            set: function (value) {
                this._element = value;
                if (value) {
                    this.color = value.color;
                    this.density = value.density;
                    this.freezingPoint = value.meltingPoint;
                    this.boilingPoint = value.boilingPoint;
                    this.setMassInGrams(value.weight);
                }
                if (this._elements)
                    this._elements[0] = value;
            },
            enumerable: true,
            configurable: true
        });
        Matter.prototype.setElement = function (element) {
            if (element && typeof element == WorldSimulator2D.OBJECT)
                this.element = element;
            if (!this._elements)
                this._elements = [];
            if (this._elements) {
                this._elements.length = 1;
                this._elements[0] = element;
            }
            return this;
        };
        // --------------------------------------------------------------------------------------------------------------------
        /**
         * Converts and adds the properties of the given element to this matter.
         * The return value is the matter object itself so more than one element can be added.
         * @param w An atomic weight (typically taken from the periodic table).
         * @param count An optional value to use as a convenient multiplier. This is typically the subscript of an element in a formula (i.e. the 2 in H2O).
         */
        Matter.prototype.addElement = function (element, count) {
            if (count === void 0) { count = 1; }
            if (!this.color && element.color)
                this.color = element.color; // (if the there is no current color, take the color of the first element as a default)
            // TODO: Combine colors.
            this.addAtomicWeight(element.weight, count);
            if (!this._elements)
                this._elements = [];
            this._elements.push(element);
            return this;
        };
        // --------------------------------------------------------------------------------------------------------------------
        Matter.prototype.startup = function () {
            if (!this.layer)
                throw this.error("This matter object is not associated with a layer.  All matter needs to be associated with a layer to be tracked by the layer grid.");
            return _super.prototype.startup.call(this);
        };
        Matter.prototype.update = function (processor) {
            var state = this.currentState, pstate = this.previousState;
            if (this.parent && this.parent.world && this.temperature == void 0)
                this.temperature = this.parent.world.currentTemperature; // (default to world temperature the first time)
            _super.prototype.update.call(this, processor); // (will update position)
            if (state.gridMoved) {
                var layer = this.layer, putBackX = false, putBackY = false;
                if (this.canCollide && WS2D.enableCollisions) {
                    var hcell = layer.getGridCell(state.position.x, pstate.position.y); // (cell in horizontal direction of travel)
                    var hCollide = hcell && hcell != this._gridCell && hcell.lastIndex >= 0; // (if == this._gridCell then this is where we are so ignore)
                    var vcell = layer.getGridCell(pstate.position.x, state.position.y); // (cell in vertical direction of travel)
                    var vCollide = vcell && vcell != this._gridCell && vcell.lastIndex >= 0; // (if == this._gridCell then this is where we are so ignore)
                    if (!hCollide && !vCollide) {
                        var dcell = layer.getGridCell(state.position.x, state.position.y); // (diagonal cell, if not blocked by h or v)
                        var dCollide = dcell && dcell != this._gridCell && dcell.lastIndex > 0;
                    }
                    if (dCollide || hCollide || vCollide) {
                        if (dCollide) {
                            // ... collide with something diagonally ...
                            state.velocity.x *= -0.02;
                            state.velocity.y *= -0.02;
                            putBackX = true;
                            putBackY = true;
                        }
                        else {
                            if (hCollide) {
                                // ... collide with something on the side ...
                                state.velocity.x *= -0.02;
                                state.velocity.y *= -0.9;
                                putBackX = true;
                            }
                            if (vCollide) {
                                // ... collide with something above or below ...
                                state.velocity.y *= -0.02;
                                state.velocity.x *= -0.9;
                                putBackY = true;
                            }
                        }
                        // ... don't allow position to change into an occupied location ...
                        if (putBackX)
                            state.position.x = pstate.position.x;
                        if (putBackY)
                            state.position.y = pstate.position.y;
                    }
                    if (state.position.x != pstate.position.x || state.position.y != pstate.position.y)
                        layer['_OnObjectGridPositionChanged'](this);
                }
                else
                    layer['_OnObjectGridPositionChanged'](this);
                //var cell = this._gridCell;
                //if (cell && cell.lastIndex > 0) { // (note: 'cell.lastIndex' is the last item; DO NOT go by array length)
                //    var objects = cell.objects;
                //    var o1 = <IPhysicsObject>this, st1 = o1.currentState;
                //    var vx1 = st1.velocity ? st1.velocity.x : 0, vy1 = st1.velocity ? st1.velocity.y : 0;
                //    var hasCollided = false;
                //    //for (var i = cell.lastIndex; i >= 0; --i) {
                //    //    var o2 = <IPhysicsObject>objects[i], st2 = o2.currentState;
                //    //    var vx2 = st2.velocity ? st2.velocity.x : 0, vy2 = st2.velocity ? st2.velocity.y : 0;
                //    //    if (o2 != this && o2.canCollide && o2.onCollided) {
                //    //        // ... can't "hit" something going slower than the item! make sure of this is checked first ...
                //    //        var xvdiff = vx2 - vx1, yvdiff = vy2 - vy1;
                //    //        if (st1.gridDir.x > 0 && xvdiff < 0 || st1.gridDir.x < 0 && xvdiff > 0
                //    //            || st1.gridDir.y > 0 && yvdiff < 0 || st1.gridDir.y < 0 && yvdiff > 0) {
                //    //            this.onCollided(this, o2);
                //    //            hasCollided = true;
                //    //        }
                //    //    }
                //    //}
                //    // ... ALWAYS put the object back - try not to have two in the same position ...
                //    st1.x = st1.prevX;
                //    st1.y = st1.prevY;
                //    var prevgx = st1.prevGridX;
                //    var prevgy = st1.prevGridY;
                //    if (prevgx != st1.gridX || prevgy != st1.gridY) {
                //        st1.renderPosition = st1.prevGridPixelX;
                //        st1.renderPosition = st1.prevGridPixelY;
                //        st1.gridX = prevgx;
                //        st1.gridY = prevgy;
                //        layer['_OnObjectGridPositionChanged'](this); // (removed from current cell)
                //    }
                //    this.world.resend = true;
                //}
            }
            // NOTE: The it's important to make sure both matter and world objects have already handled x, y, gridX, and gridY
            // calculations, including results of collisions and moving back due to collisions, BEFORE returning from this point.
            // After returning, if the object was detected as moving its position, the layer will update the grid location.
            return this;
        };
        Matter.prototype.postUpdate = function (buffer, index, piplineIndex) {
            var calcID = buffer[index];
            _super.prototype.postUpdate.call(this, buffer, index, piplineIndex);
            return this;
        };
        Matter.prototype.render = function () {
            //var color = this.color;
            //if (typeof color != 'string') this.color = color = '' + color;
            //while (color[0] == '#') color = color.slice(1);// (trim '#')
            //var hasAlpha = color.length > 6;
            //var rgbInt = parseInt(hasAlpha ? color.slice(-6) : color, 16); // (https://jsperf.com/hex-to-rgb-2)
            //var alpha = hasAlpha ? (parseInt(color.slice(0, -6), 16) & 255) / 255 : 1;
            //buffer[index + MathPiplines.GravityCalculationInputs.colorRGB] = rgbInt;
            //buffer[index + MathPiplines.GravityCalculationInputs.alpha] = alpha;
            _super.prototype.render.call(this);
        };
        // --------------------------------------------------------------------------------------------------------------------
        Matter.prototype.onCollided = function (source, target) {
            // ... process first object impact ...
            var w = this.world, o1 = source, st1 = o1.currentState, o2 = target, st2 = o2.currentState;
            // o1.lastCollisionUpdateCount = w.updateCounter;
            if (!st2.mass || st2.mass < 0 || o2.unmovable || !o2.isPhysicsObject) {
                if (st1.velocity) {
                    st1.velocity.x *= -st1.direction.x; // (reflect in direction of travel)
                    st1.velocity.y *= -st1.direction.x; // (reflect in direction of travel)
                }
            }
            else {
                // ... get the vector forces the objects currently have ...
                var mx1 = st1.momentum ? st1.momentum.x : 0, my1 = st1.momentum ? st1.momentum.y : 0;
                var vx1 = st1.velocity ? st1.velocity.x : 0, vy1 = st1.velocity ? st1.velocity.y : 0;
                var mass1 = st1.mass !== void 0 ? st1.mass : 0;
                var mx2 = st2.momentum ? st2.momentum.x : 0, my2 = st2.momentum ? st2.momentum.y : 0;
                var vx2 = st2.velocity ? st2.velocity.x : 0, vy2 = st2.velocity ? st2.velocity.y : 0;
                var mass2 = st2.mass !== void 0 ? st2.mass : 0;
                var totalMass = mass1 + mass2;
                if (totalMass != 0) {
                    //var gdx = o1.currentState.gridDir.x, gdy = o1.currentState.gridDir.y;
                    var gdx = 0, gdy = 0; //***temp, use ^^^^^^^^^^^^^^^^^^^
                    // ... calculate the ELASTIC results ...
                    var massDiff1 = mass1 - mass2, massDiff2 = mass2 - mass1;
                    var vx1f = massDiff1 / totalMass * vx1 + mass2 / totalMass * 2 * vx2;
                    var vy1f = massDiff1 / totalMass * vy1 + mass2 / totalMass * 2 * vy2;
                    var vx2f = massDiff2 / totalMass * vx2 + mass1 / totalMass * 2 * vx1;
                    var vy2f = massDiff2 / totalMass * vy2 + mass1 / totalMass * 2 * vy1;
                    // ... calculate INELASTIC results ...
                    // ... interpolate between then based on the object's elasticity ...
                    // m1*v1 + m2*v2 = m1*v3 + m2*v3 ; (m1*v1 + m2*v2) / (m1+m2) = v3
                    //var vx1if = (mass1 * vx1 + mass2 * vx2) / totalMass;
                    //var vy1if = (mass1 * vy1 + mass2 * vy2) / totalMass;
                    //var vx2if = vx1if;
                    //var vy2if = vy1if;
                    //vx1f = vx1if;
                    //vy1f = vy1if;
                    //vx2f = vx2if;
                    //vy2f = vy2if;
                    if (o1.isPhysicsObject) {
                        if (gdx != 0)
                            o1.currentState.velocity.x = vx1f * 0.9; // (0.9 to make some loss due to friction/heat)
                        o1.currentState.velocity.x += (1 - 2 * Math.random()) / 1000; // (Add margin of error to prevent "perfect" rebounds)
                        if (gdy != 0)
                            o1.currentState.velocity.y = vy1f * 0.9;
                        o1.currentState.velocity.y += (1 - 2 * Math.random()) / 1000; // (Add margin of error to prevent "perfect" rebounds)
                    }
                    if (o2.isPhysicsObject) {
                        if (gdx != 0)
                            o2.currentState.velocity.x = vx2f * 0.9;
                        o2.currentState.velocity.x += (1 - 2 * Math.random()) / 1000; // (Add margin of error to prevent "perfect" rebounds)
                        if (gdy != 0)
                            o2.currentState.velocity.y = vy2f * 0.9;
                        o2.currentState.velocity.y += (1 - 2 * Math.random()) / 1000; // (Add margin of error to prevent "perfect" rebounds)
                    }
                    if (ctrlIsDown) {
                        var m = this.clone();
                        //m.currentState.x += -m.currentState.xdir * this._world.pixelSize;
                        //m.currentState.y += -m.currentState.ydir * this._world.pixelSize;
                        m.currentState.velocity.x *= -1 + 2 * Math.random();
                        m.currentState.velocity.y *= -1 + 2 * Math.random();
                        this.parent.add(m);
                        m.startup();
                        ctrlIsDown = false;
                    }
                }
            }
        };
        // --------------------------------------------------------------------------------------------------------------------
        Matter.type = WorldSimulator2D.PhysicsObject.type | WorldSimulator2D.ObjectTypes.Matter;
        /** Used to scale the mass in relation to the mass of earth (defaults to 10^24). */
        Matter.MASS_SCALE = 5.972e24; // kg of earth.
        Matter.AU_SCALE = 149597870.7; // km (the mean Earth–Sun distance).
        Matter.LIGHT_YEAR_SCALE = 9.4607e+12; // km light travels in one year (as 299792.5 km/s).
        Matter._nonClonableProperties = (WorldSimulator2D.SpatialObject._nonClonableProperties['element'] = void 0,
            WorldSimulator2D.SpatialObject._nonClonableProperties['_element'] = void 0,
            WorldSimulator2D.SpatialObject._nonClonableProperties);
        Matter.solidFrictionTempuratureExponent = Math.log(10) / Math.log(2); // (constant is not really valid, but helps; src: https://goo.gl/mu6oCA)
        Matter.viscousFrictionTempuratureExponent = Math.log(17) / Math.log(9.68); // (constant is not really valid, but helps; src: https://goo.gl/TVsVFF; Viscosity Tables: https://goo.gl/Cm4jh, https://goo.gl/xj6mSA, https://goo.gl/yXVJxL)
        return Matter;
    }(WorldSimulator2D.PhysicsObject));
    WorldSimulator2D.Matter = Matter;
    var shiftIsDown = false;
    var altIsDown = false;
    var ctrlIsDown = false;
    var cmdIsDown = false;
    window.onkeyup = function (e) {
        if (!e)
            e = window.event;
        shiftIsDown = e.shiftKey;
        altIsDown = e.altKey;
        ctrlIsDown = e.ctrlKey;
        cmdIsDown = e.metaKey;
    };
    window.onkeydown = function (e) {
        if (!e)
            e = window.event;
        shiftIsDown = e.shiftKey;
        altIsDown = e.altKey;
        ctrlIsDown = e.ctrlKey;
        cmdIsDown = e.metaKey;
    };
})(WorldSimulator2D || (WorldSimulator2D = {}));
// Notes:
// * Great explanation of g/mol regarding atomic weight: https://goo.gl/iTcc8U
// * Interesting paper on particle-based viscoelastic fluid simulation: https://goo.gl/nRVicQ and one person's example: https://www.youtube.com/watch?v=i65V8J1P044
// * Impact momentum and kinetic force videos:
//   1. https://www.youtube.com/watch?v=-Y7NPTH7SWA
//   2. https://www.youtube.com/watch?v=Y-QOfc2XqOk
//   3. https://www.youtube.com/watch?v=Ov7UMD97RGU (best!!!) Also: https://www.youtube.com/watch?v=8ko3qy9vgLQ (sim: https://goo.gl/gkSX3U) , and https://goo.gl/l8iQxl
//   4: Wikipedia.org: https://en.wikipedia.org/wiki/Momentum
// Interesting cell simulator: http://sanojian.github.io/cellauto/
//# sourceMappingURL=matter.js.map