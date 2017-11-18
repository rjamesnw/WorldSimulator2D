declare namespace WorldSimulator2D {
    class PhysicsState extends SpacialState {
        /**
         * In Kilograms, which is also used to determine the density and gravitational force of attraction.
         **/
        mass: number;
        /** The sum of all directional forces being applied to this object (not normalized). */
        netForce: Vector2D;
        /** This is calculated based on the mass and current velocity after 'update()' is called. */
        momentum: Vector2D;
        /** The calculated speed of the object. This is what the object should be before any dampening is applied for game purposes. */
        velocity: Vector2D;
        /** The speed of the object after 'update()' is called (one physics calculation pass, or one "step"). */
        stepVelocity: Vector2D;
        copyFrom(state: SpacialState): this;
        clone(): this;
    }
    /**
     * Holds physics properties for this object in regards to speed, velocity, mass, and gravity. It also takes into account the gravity of the world as well.
     */
    class PhysicsObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends SpatialObject<TParent, TChildren> implements IPhysicsObject {
        static readonly type: number;
        protected static _nonClonableProperties: I_nonClonableProperties;
        protected static _StateType: typeof PhysicsState;
        readonly history: PhysicsState[];
        readonly currentState: PhysicsState;
        readonly previousState: PhysicsState;
        /** Gets 'currentState.velocity'. */
        readonly velocity: Vector2D;
        /** Gets/sets 'currentState.mass'. */
        mass: number;
        constructor();
        initialize(isnew: boolean, autoReset?: boolean): void;
        configure(...args: any[]): this;
        dispose(): void;
        startup(): this;
        static gpuKernal(a: number[], typeIndex: number, dataIndex: number, outIndex: number, __this: {
            thread: {
                x: number;
            };
        }, result: number): number;
        update(processor: MathPipelines.MathProcessor): this;
        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this;
        render(): void;
        /** Set the mass on this object to a scaled version of the real world kilogram value. */
        setMass(kg: number): this;
        /** Set the mass on this object to a scaled version of the real world gram value. */
        setMassInGrams(g: number): this;
        /**
         * Converts and adds the given atomic weight to this matter.
         * The return value is the matter object itself so more than one weight can be added.
         * @param w An atomic weight (typically taken from the periodic table).
         * @param count An optional value to use as a convenient multiplier. This is typically the subscript of an element in a formula (i.e. the 2 in H2O).
         */
        addAtomicWeight(w: number, count?: number): this;
    }
    interface IPhysicsObject extends PhysicsObject {
    }
}
