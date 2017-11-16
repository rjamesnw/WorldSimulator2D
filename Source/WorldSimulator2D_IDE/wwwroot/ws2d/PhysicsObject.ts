namespace WorldSimulator2D {

    export class PhysicsState extends SpacialState {
        /**
         * In Kilograms, which is also used to determine the density and gravitational force of attraction.
         **/
        mass: number;

        /** The sum of all directional forces being applied to this object (not normalized). */
        netForce: Vector2D = Engine.create(Vector2D);

        /** This is calculated based on the mass and current velocity after 'update()' is called. */
        momentum: Vector2D = Engine.create(Vector2D);

        /** The calculated speed of the object. This is what the object should be before any dampening is applied for game purposes. */
        velocity: Vector2D = Engine.create(Vector2D);

        /** The speed of the object after 'update()' is called (one physics calculation pass, or one "step"). */
        stepVelocity: Vector2D = Engine.create(Vector2D);

        copyFrom(state: SpacialState): this {
            super.copyFrom(state);

            var physState = <PhysicsState>state;

            this.mass = physState.mass;

            if (physState.netForce) {
                this.netForce.x = physState.netForce.x;
                this.netForce.y = physState.netForce.y;
                this.netForce.nx = physState.netForce.nx;
                this.netForce.ny = physState.netForce.ny;
            }

            if (physState.momentum) {
                this.momentum.x = physState.momentum.x;
                this.momentum.y = physState.momentum.y;
                this.momentum.nx = physState.momentum.nx;
                this.momentum.ny = physState.momentum.ny;
            }

            if (physState.velocity) {
                this.velocity.x = physState.velocity.x;
                this.velocity.y = physState.velocity.y;
                this.velocity.nx = physState.velocity.nx;
                this.velocity.ny = physState.velocity.ny;
            }

            if (physState.stepVelocity) {
                this.stepVelocity.x = physState.stepVelocity.x;
                this.stepVelocity.y = physState.stepVelocity.y;
                this.stepVelocity.nx = physState.stepVelocity.nx;
                this.stepVelocity.ny = physState.stepVelocity.ny;
            }

            return this;
        }

        clone(): this {
            return super.clone();
        }
    }

    /**
     * Holds physics properties for this object in regards to speed, velocity, mass, and gravity. It also takes into account the gravity of the world as well.
     */
    export class PhysicsObject<TParent extends IGraphObject = IGraphObject, TChildren extends IGraphObject = IGraphObject> extends SpatialObject<TParent, TChildren> implements IPhysicsObject {
        // --------------------------------------------------------------------------------------------------------------------

        static readonly type = SpatialObject.type | ObjectTypes.PhysicsObject;

        protected static _nonClonableProperties: I_nonClonableProperties = (
            PhysicsObject._nonClonableProperties['mass'] = void 0,
            PhysicsObject._nonClonableProperties['velocity'] = void 0,
            PhysicsObject._nonClonableProperties['history'] = void 0,
            PhysicsObject._nonClonableProperties
        );

        protected static _StateType = PhysicsState;

        // --------------------------------------------------------------------------------------------------------------------

        readonly history: PhysicsState[];
        readonly currentState: PhysicsState;
        readonly previousState: PhysicsState;

        /** Gets 'currentState.velocity'. */
        get velocity() { return this.currentState.velocity; }

        /** Gets/sets 'currentState.mass'. */
        get mass() { return this.currentState.mass; }
        set mass(v: number) { this.currentState.mass = v; }

        constructor() {
            super();
            (<{ isPhysicsObject: any }>this).isPhysicsObject = true;
            this.unmovable = false; // (physics objects default to movable)
        }

        initialize(isnew: boolean, autoReset?: boolean) {
            super.initialize(isnew, autoReset);
        }

        configure(...args: any[]): this {
            super.configure();
            return this;
        }

        dispose(): void {
            super.dispose();
        }

        // --------------------------------------------------------------------------------------------------------------------

        startup(): this {
            return super.startup();
        }

        static gpuKernal(a: number[], typeIndex: number, dataIndex: number, outIndex: number, __this: { thread: { x: number } }, result: number): number {
            return 0;
        }

        update(processor: MathPipelines.MathProcessor) { // (reminder: Y+ is UP)
            var state = this.currentState, w = this.world;

            state.velocity.x += state.stepVelocity.x;
            state.velocity.y += state.stepVelocity.y;

            if (state.velocity.x > 1) state.velocity.x = 1;
            if (state.velocity.y > 1) state.velocity.y = 1;

            state.position.x += state.velocity.x;
            state.position.y += state.velocity.y;

            var gravCalcPipe = processor.mathPipelines[MathPipelines.Types.GravityCalculation];
            var buffer = gravCalcPipe.buffers[gravCalcPipe.bufferWriteIndex], i = buffer.count += gravCalcPipe.blockLength;

            buffer[i + MathPipelines.GravityCalculationInputs.objectID] = this.id;
            buffer[i + MathPipelines.GravityCalculationInputs.calcID] = 0; // (default world gravity)
            buffer[i + MathPipelines.GravityCalculationInputs.m1] = w.mass;
            buffer[i + MathPipelines.GravityCalculationInputs.m2] = this.mass;
            buffer[i + MathPipelines.GravityCalculationInputs.x1] = 0;
            buffer[i + MathPipelines.GravityCalculationInputs.y1] = 0;
            buffer[i + MathPipelines.GravityCalculationInputs.x2] = state.position.x;
            buffer[i + MathPipelines.GravityCalculationInputs.y2] = state.position.y;

            if (buffer.count >= buffer.length)
                gravCalcPipe.nextBuffer();

            return super.update(processor);
        }

        postUpdate(buffer: Float32Array, index: number, piplineIndex: MathPipelines.Types): this {
            var state = this.currentState, calcID = buffer[index];
            if (piplineIndex == MathPipelines.Types.GravityCalculation && calcID === 0) {
                state.stepVelocity.x = buffer[index + MathPipelines.GravityCalculationOutputs.vstepx];
                state.stepVelocity.y = buffer[index + MathPipelines.GravityCalculationOutputs.vstepy];
            }
            return super.postUpdate(buffer, index, piplineIndex);
        }

        //? This is the working original, but should be removed soon ...
        //__update(kernalBufferManager: MathPiplines.KernalBufferManager): this { // (reminder: Y+ is UP)
        //    var w = this._world, state = this.currentState;

        //    if (<object>this !== w && !this.unmovable) { // (the world is the top most and should not be processing itself!)
        //        // (Note: when 'this.unmovable' is true, other objects can still update the forces; the object just won't move due to it.)

        //        // ... get world force on this object based on distance from world center ...

        //        var x = state.x, y = state.y;
        //        var d = distance2D(0, 0, x, y) / w.unitBlockSize * w.metersPerBlockSize / 2; // (make sure it's in meters: d in world particles / particles per 1.75 meters * 1.75 to get the meters)
        //        if (d) {
        //            var nx = x / d, ny = y / d; // (get normals for the offset between objects)
        //            var f = (6.67408e-11 * state.mass * this._world.currentState.mass) / (d * d) / w.gravitationalScale; // (constant 6.67e-11 scaled to 6.67e-6 because mass is also scaled by half the exponent)
        //            if (f > w.maxGravitationalForce) f = w.maxGravitationalForce;
        //        } else
        //            nx = 0, ny = 0, f = 0; // (get normals for the offset between objects)
        //        var fx = nx * f, fy = ny * f;
        //        state.netForce.x = fx; // (scale the force down so the updates can be called many times per render frame)
        //        state.netForce.y = fy; // (scale the force down so the updates can be called many times per render frame)

        //        // ... get the velocity of this object ...

        //        var vx = (state.velocity.x -= fx) / w.velocityScale;
        //        var vy = (state.velocity.y -= fy) / w.velocityScale;
        //        //var vx = this.velocity.x; 
        //        //var vy = this.velocity.y;
        //        var pixelSize = w.pixelSize;

        //        // ... make sure the velocity cannot "skip" grid locations ...
        //        // (Each particle exists in a grid location, but high velocities can skip grid locations causing missed interactions.
        //        //  For this reason the velocity MUST be clamped a max of 1 grid jump only. To have particles seem to "skip" ahead,
        //        //  the 'update()' process can be called many times to more rapidly speed up the movement process [physics time])

        //        if (vx <= -pixelSize) vx = -pixelSize;
        //        if (vx >= pixelSize) vx = pixelSize;
        //        if (vy <= -pixelSize) vy = -pixelSize;
        //        if (vy >= pixelSize) vy = pixelSize;

        //        state.x += vx;
        //        state.y += vy;

        //        state.stepVelocity.x = vx;
        //        state.stepVelocity.y = vy;

        //        // ... also calculate the force of momentum based on the mass and this velocity ...

        //        state.momentum.x = state.mass * vx;
        //        state.momentum.y = state.mass * vy;

        //        // ... normalize vectors ...

        //        state.netForce.updateNormals();
        //        state.velocity.updateNormals();
        //        state.stepVelocity.updateNormals();
        //        state.momentum.updateNormals();
        //    }
        //    return super._update(kernalBufferManager);
        //}

        render(): void {
            super.render();
        }

        /** Set the mass on this object to a scaled version of the real world kilogram value. */
        setMass(kg: number): this { this.currentState.mass = kg; return this; }

        /** Set the mass on this object to a scaled version of the real world gram value. */
        setMassInGrams(g: number): this { this.setMass(g / 1000); return this; }

        /**
         * Converts and adds the given atomic weight to this matter.
         * The return value is the matter object itself so more than one weight can be added.
         * @param w An atomic weight (typically taken from the periodic table).
         * @param count An optional value to use as a convenient multiplier. This is typically the subscript of an element in a formula (i.e. the 2 in H2O).
         */
        addAtomicWeight(w: number, count = 1): this {
            this.currentState.mass = (this.currentState.mass || 0) + w /*grams*/ * count / 1000;
            return this;
        }

        // --------------------------------------------------------------------------------------------------------------------
    }

    export interface IPhysicsObject extends PhysicsObject { }
}

// Notes:
// * Inertia: http://hyperphysics.phy-astr.gsu.edu/hbase/mi.html (I = m*r^2) 
// * Momentum: https://www.youtube.com/watch?v=oTqTHuwvqNw
