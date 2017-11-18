declare namespace WorldSimulator2D {
    enum States {
        Air = 0,
        Water = 1,
        Rock = 2,
        Metal = 3,
    }
    /**
     * Records binding properties between matter.
     * Matter "breaks off" from groups when the surrounding attraction is no longer adequate to hold onto it.
     */
    class Binding {
        source: Matter;
        target: Matter;
        magnitude: number;
        constraint: number;
        /** The current angle between the source and target particles. */
        angle: number;
        /** The amount of angular force exerted by the source particle. */
        angularForce: number;
        /** The amount of angular velocity as a result of the angularForce. */
        angularVelocity: number;
        /** The amount of resistance to change in angular motion for this binding. Vales range from 0.0 (no resistance) to 1.0 (fully locked, no motion). */
        angularResistence: number;
        /**
         * Constructs an object to
         * @param source The owner of this instance.
         * @param target The target bound to.
         * @param magnitude The amount of force attraction between the two matter particles.
         * @param constraint An angular
         */
        constructor(source: Matter, target: Matter, magnitude?: number, constraint?: number);
    }
    /**
     * The most basic element in the world simulator is particle matter.  It has properties that defined its behavior in the world simulator.
     * It's important to remember that most values in the simulator are not designed to be "real world" for better "playability".
     * Matter exists as the smallest unit - so each world "pixel" (may be more than one screen pixel) is a piece of matter.
     * No two matter particles can occupy the same space.
     * Note: Don't defined a property if it is not applicable (it should be left undefined, or set to undefined is no longer in use).
     */
    class Matter extends PhysicsObject implements IMatter {
        static readonly type: number;
        /** Used to scale the mass in relation to the mass of earth (defaults to 10^24). */
        static readonly MASS_SCALE: number;
        static readonly AU_SCALE: number;
        static readonly LIGHT_YEAR_SCALE: number;
        static _nonClonableProperties: I_nonClonableProperties;
        /**
        * Bindings to any matter surrounding this matter, or joined by some force.
        * This is usually set for matter that is part of a group of connected matter in a world object, but could also be used in
        * fluid simulations to create elastic/magnetic/surface tension attractions, or by joint systems.
        * @see Binding for more details.
        */
        bindings: Binding[];
        name: string;
        /** The coefficient from 0.0 (inelastic) to 1.0 (elastic) used to calculate how much bounce the matter has. */
        bounciness: number;
        /** A color to use for this matter.  */
        color: string;
        /**
        * How bright the matter is when not emitting it's own light (if any).
        * Valid values are 0.0 (dark) to 1.0 (fully lit). Values higher than 1 will start to overexpose the color and turn it towards white.
        * The luminosity is calculated based on other surrounding light sources.
        */
        luminosity: number;
        /** How dense the matter is (in g/cm3 [but used as g/cm2 for the 2D simulation]; typical values are taken from the periodic table). */
        density: number;
        /**
         * Liquids boil when their vapor pressure is equal to the pressure exerted on the liquid by its surroundings.
         * 0.0 is no pressure (solid, no molecular movement), whereas 1.0 is full pressure (great molecular movement) turning the
         * matter into gas (assuming the surrounding pressure is less).
         * For liquids, the vapor pressure (as a function of temperature) has an exponential behavior.
         */
        readonly vaporPressure: number;
        /**
         * The temperature in kelvins at which the matter freezes (turns solid).
         * To convert from Celsius simply add 273.15.
         */
        freezingPoint: number;
        /**
         * The temperature in kelvins at which the matter boils (turns to gas).
         * To convert from Celsius simply add 273.15.
         */
        boilingPoint: number;
        /**
         * The current temperature of the matter, in kelvins. The default is the world temperature contained in the engine.
         * To convert from Celsius simply add 273.15.
         */
        temperature: number;
        /** A value from -1.0 (solid/frozen) to 0.0 (liquid) and 1.0 (gas). */
        /** A simple pseudo coefficient-type value from 0.0 (no friction) to 1.0 (very adhesive). */
        frictionCoefficient: number;
        static solidFrictionTempuratureExponent: number;
        static viscousFrictionTempuratureExponent: number;
        readonly friction: number;
        /**
         * Determines resistance to gradual deformation by outside forces.
         * The value is 0.0-1.0, which, in centipoise/millipascal units, is 1 (Water) - 200000 ().
         * 0.0 is none (space), and 1.0 is solid.
         */
        viscosity: number;
        /** A value from 0.0 (not magnetic) to 1.0 (fully magnetic).
         * Note that fully magnetic (1.0) is a force that will likely apply to most objects, even at far distances.
         */
        magnetic: number;
        /** The direction of magnetic north.  Only used if the magnetic factor is grater than zero. */
        magneticNorth: Vector2D;
        /** A value from 0.0 (completely stable) to 1.0 (explodes instantly).
         * Note that when matter explodes into pieces, those smaller pieces can be attracted again if the mass is large enough.
         */
        volatility: number;
        /** The rotation of this matter (affects magnetic north, collisions, etc.). */
        rotation: number;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(element?: Element): this;
        clone(): this;
        /** Gets or sets a single element.  If there are more than one element, only the first element is changed. */
        element: Element;
        private _element;
        /** A list of elements when 'addElement()' is used. When calling 'setElement()' or setting the 'element' property, any existing items are replaced by the one new one.
        * Note: Updating this array does NOT change the matter properties;  It is here for reference only.  Use the various functions for modifying matter properties instead.
        */
        _elements: Element[];
        setElement(element: Element): Matter;
        /**
         * Converts and adds the properties of the given element to this matter.
         * The return value is the matter object itself so more than one element can be added.
         * @param w An atomic weight (typically taken from the periodic table).
         * @param count An optional value to use as a convenient multiplier. This is typically the subscript of an element in a formula (i.e. the 2 in H2O).
         */
        addElement(element: Element, count?: number): Matter;
        startup(): this;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
        onCollided?(source: ISpatialObject, target: ISpatialObject): void;
    }
    interface IMatter extends Matter {
    }
}
