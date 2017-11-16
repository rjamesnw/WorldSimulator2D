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
    var Binding = (function () {
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
    var Matter = (function (_super) {
        __extends(Matter, _super);
        function Matter() {
            var _this = _super.call(this) || this;
            _this.color = 'FF808080';
            _this.magneticNorth = WorldSimulator2D.Vector2D.Up;
            _this.canCollide = true;
            return _this;
        }
        Object.defineProperty(Matter.prototype, "vaporPressure", {
            get: function () {
                return this.boilingPoint > 0 ? this.temperature / this.boilingPoint : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matter.prototype, "friction", {
            get: function () {
                var heatingOffsetFactor = this.freezingPoint > 0 ? this.temperature / this.freezingPoint : 0;
                var friction = this.frictionCoefficient + Math.pow(heatingOffsetFactor > 1 ? 1 : heatingOffsetFactor, Matter.solidFrictionTempuratureExponent);
                if (heatingOffsetFactor <= 1)
                    return friction;
                var liquidTempSpan = this.boilingPoint - this.freezingPoint;
                heatingOffsetFactor = liquidTempSpan != 0 ? (this.temperature - this.freezingPoint) / liquidTempSpan : 0;
                friction -= Math.pow(1 - heatingOffsetFactor, Matter.solidFrictionTempuratureExponent);
                return friction < 0 ? 0 : friction;
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
            c._element = this._element;
            return c;
        };
        Object.defineProperty(Matter.prototype, "element", {
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
        Matter.prototype.addElement = function (element, count) {
            if (count === void 0) { count = 1; }
            if (!this.color && element.color)
                this.color = element.color;
            this.addAtomicWeight(element.weight, count);
            if (!this._elements)
                this._elements = [];
            this._elements.push(element);
            return this;
        };
        Matter.prototype.startup = function () {
            if (!this.layer)
                throw this.error("This matter object is not associated with a layer.  All matter needs to be associated with a layer to be tracked by the layer grid.");
            return _super.prototype.startup.call(this);
        };
        Matter.prototype.update = function (processor) {
            var state = this.currentState, pstate = this.previousState;
            if (this.parent && this.parent.world && this.temperature == void 0)
                this.temperature = this.parent.world.currentTemperature;
            _super.prototype.update.call(this, processor);
            if (state.gridMoved) {
                var layer = this.layer, putBackX = false, putBackY = false;
                if (this.canCollide && WS2D.enableCollisions) {
                    var hcell = layer.getGridCell(state.position.x, pstate.position.y);
                    var hCollide = hcell && hcell != this._gridCell && hcell.lastIndex >= 0;
                    var vcell = layer.getGridCell(pstate.position.x, state.position.y);
                    var vCollide = vcell && vcell != this._gridCell && vcell.lastIndex >= 0;
                    if (!hCollide && !vCollide) {
                        var dcell = layer.getGridCell(state.position.x, state.position.y);
                        var dCollide = dcell && dcell != this._gridCell && dcell.lastIndex > 0;
                    }
                    if (dCollide || hCollide || vCollide) {
                        if (dCollide) {
                            state.velocity.x *= -0.01;
                            state.velocity.y *= -0.01;
                            putBackX = true;
                            putBackY = true;
                        }
                        else {
                            if (hCollide) {
                                state.velocity.x *= -0.01;
                                state.velocity.y *= -0.9;
                                putBackX = true;
                            }
                            if (vCollide) {
                                state.velocity.y *= -0.01;
                                state.velocity.x *= -0.9;
                                putBackY = true;
                            }
                        }
                        if (putBackX) {
                            state.position.x = pstate.position.x;
                        }
                        if (putBackY) {
                            state.position.y = pstate.position.y;
                        }
                    }
                    if (!putBackX || !putBackY)
                        layer['_OnObjectGridPositionChanged'](this);
                }
            }
            return this;
        };
        Matter.prototype.postUpdate = function (buffer, index, piplineIndex) {
            var calcID = buffer[index];
            _super.prototype.postUpdate.call(this, buffer, index, piplineIndex);
            return this;
        };
        Matter.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        Matter.prototype.onCollided = function (source, target) {
            var w = this.world, o1 = source, st1 = o1.currentState, o2 = target, st2 = o2.currentState;
            if (!st2.mass || st2.mass < 0 || o2.unmovable || !o2.isPhysicsObject) {
                if (st1.velocity) {
                    st1.velocity.x *= -st1.direction.x;
                    st1.velocity.y *= -st1.direction.x;
                }
            }
            else {
                var mx1 = st1.momentum ? st1.momentum.x : 0, my1 = st1.momentum ? st1.momentum.y : 0;
                var vx1 = st1.velocity ? st1.velocity.x : 0, vy1 = st1.velocity ? st1.velocity.y : 0;
                var mass1 = st1.mass !== void 0 ? st1.mass : 0;
                var mx2 = st2.momentum ? st2.momentum.x : 0, my2 = st2.momentum ? st2.momentum.y : 0;
                var vx2 = st2.velocity ? st2.velocity.x : 0, vy2 = st2.velocity ? st2.velocity.y : 0;
                var mass2 = st2.mass !== void 0 ? st2.mass : 0;
                var totalMass = mass1 + mass2;
                if (totalMass != 0) {
                    var gdx = 0, gdy = 0;
                    var massDiff1 = mass1 - mass2, massDiff2 = mass2 - mass1;
                    var vx1f = massDiff1 / totalMass * vx1 + mass2 / totalMass * 2 * vx2;
                    var vy1f = massDiff1 / totalMass * vy1 + mass2 / totalMass * 2 * vy2;
                    var vx2f = massDiff2 / totalMass * vx2 + mass1 / totalMass * 2 * vx1;
                    var vy2f = massDiff2 / totalMass * vy2 + mass1 / totalMass * 2 * vy1;
                    if (o1.isPhysicsObject) {
                        if (gdx != 0)
                            o1.currentState.velocity.x = vx1f * 0.9;
                        o1.currentState.velocity.x += (1 - 2 * Math.random()) / 1000;
                        if (gdy != 0)
                            o1.currentState.velocity.y = vy1f * 0.9;
                        o1.currentState.velocity.y += (1 - 2 * Math.random()) / 1000;
                    }
                    if (o2.isPhysicsObject) {
                        if (gdx != 0)
                            o2.currentState.velocity.x = vx2f * 0.9;
                        o2.currentState.velocity.x += (1 - 2 * Math.random()) / 1000;
                        if (gdy != 0)
                            o2.currentState.velocity.y = vy2f * 0.9;
                        o2.currentState.velocity.y += (1 - 2 * Math.random()) / 1000;
                    }
                    if (ctrlIsDown) {
                        var m = this.clone();
                        m.currentState.velocity.x *= -1 + 2 * Math.random();
                        m.currentState.velocity.y *= -1 + 2 * Math.random();
                        this.parent.add(m);
                        m.startup();
                        ctrlIsDown = false;
                    }
                }
            }
        };
        Matter.type = WorldSimulator2D.PhysicsObject.type | WorldSimulator2D.ObjectTypes.Matter;
        Matter.MASS_SCALE = 5.972e24;
        Matter.AU_SCALE = 149597870.7;
        Matter.LIGHT_YEAR_SCALE = 9.4607e+12;
        Matter._nonClonableProperties = (WorldSimulator2D.SpatialObject._nonClonableProperties['element'] = void 0,
            WorldSimulator2D.SpatialObject._nonClonableProperties['_element'] = void 0,
            WorldSimulator2D.SpatialObject._nonClonableProperties);
        Matter.solidFrictionTempuratureExponent = Math.log(10) / Math.log(2);
        Matter.viscousFrictionTempuratureExponent = Math.log(17) / Math.log(9.68);
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
//# sourceMappingURL=matter.js.map