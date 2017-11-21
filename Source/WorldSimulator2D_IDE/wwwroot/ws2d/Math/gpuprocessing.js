var WorldSimulator2D;
(function (WorldSimulator2D) {
    /**
     * Types and routines
     */
    var MathPipelines;
    (function (MathPipelines) {
        MathPipelines.GPU_KERNAL_MAX_DATA_PER_OBJECT = 32; // (becomes the 'width' constant)
        /**
         * The vertex shader code to use when processing objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         * @param varyings One ore more varyings for feedback buffers.
         */
        MathPipelines.processCode_vs = function (gl, varyings) {
            if (!varyings || !varyings.length)
                throw Error("'varyings' is required, and cannot be empty.");
            return "#version 300 es\n\
                #ifdef GL_ES\n\
                    precision highp float;\n\
                    precision highp int;\n\
                #endif\n\
                \n\
                uniform float unitBlockSize;\n\
                uniform float metersPerBlockSize;\n\
                uniform float worldMass;\n\
                uniform float gravitationalScale;\n\
                uniform float maxGravitationalForce;\n\
                uniform float velocityScale;\n\
                uniform float pixelSize;\n\
                uniform float width;\n\
                uniform float height;\n\
                \n\
                in float a_type;\n\
                in float a_id;\n\
                in vec2  a_pos;\n\
                in vec2  a_velocity;\n\
                in float a_mass;\n\
                in float a_colorRGB;\n\
                in float a_alpha;\n\
                \n\
                out float " + varyings.join(";\n                out float ") + ";\n\
                \n\
                void main() {\n\
                    float type = a_type;\n\
                    vec2 pos = a_pos;\n\
                    vec2 velocity = a_velocity;\n\
                    \n\
                    // ... get world force on this object based on distance from world center ...\n\
                    float poslen = length(pos);\n\
                    vec2 npos = pos / poslen; // (get normals for the offset between objects)\n\
                    float d = poslen / unitBlockSize * metersPerBlockSize / 2.; // (make sure it's in meters: d in world particles / particles per 1.75 meters * 1.75 to get the meters)\n\
                    float f = (6.67408e-11 * a_mass * worldMass) / (d * d) / gravitationalScale; // (constant 6.67e-11 scaled to 6.67e-6 because mass is also scaled by half the exponent)\n\
                    f = clamp(f, 0., maxGravitationalForce);\n\
                    vec2 force = npos * f; // (get force vectors) \n\
                    \n\
                    //vec2 netForce += force; // (scale the force down so the updates can be called many times per render frame)\n\
                    \n\
                    // ... get the velocity of this object ...\n\
                    \n\
                    velocity -= force;\n\
                    vec2 stepv = velocity / velocityScale;\n\
                    float stepvlen = length(stepv);\n\
                    stepv = float(stepvlen <= pixelSize) * stepv + float(stepvlen > pixelSize) * stepv / stepvlen * pixelSize;\n\
                    // (clamp: make sure the velocity cannot 'skip' grid locations)\n\
                    // (Each particle exists in a grid location, but high velocities can skip grid locations causing missed interactions.\n\
                    //  For this reason the velocity MUST be clamped a max of 1 grid jump only. To have particles seem to 'skip' ahead,\n\
                    //  the 'update()' process can be called many times to more rapidly speed up the movement process [physics time])\n\
                    \n\
                    pos += stepv;\n\
                    \n\
                    // ... update movement stats ...\n\
                    \n\
                    // ... get grid stats also for this object if we are not the layer object itself, which owns the grid! ...\n\
                    \n\
                    float gx = float(int(pos.x / pixelSize)); // convert to integer offsets from 0 center and truncates fractional part. (perhaps use '0.00000000001' to fix float-point math issues [such as 2.3*100])\n\
                    \n\
                    float gy = float(int(pos.y / pixelSize)); // convert to integer offsets from 0 center and truncates fractional part. (perhaps use '0.00000000001' to fix float-point math issues [such as 2.3*100])\n\
                    \n\
                    v_type = a_type;\n\
                    v_id = a_id;\n\
                    v_x = pos.x;\n\
                    v_y = pos.y;\n\
                    v_gridX = gx;\n\
                    v_gridY = gy;\n\
                    v_velocityX = velocity.x;\n\
                    v_velocityY = velocity.y;\n\
                    v_stepVelocityX = stepv.x;\n\
                    v_stepVelocityY = stepv.y;\n\
                    v_mass = a_mass;\n\
                    v_colorRGB = a_colorRGB;\n\
                    v_alpha = a_alpha;\n\
                }";
        };
        /**
         * The fragment shader code to use when processing objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         */
        MathPipelines.processCode_fs = function (gl) {
            return "#version 300 es\n\
                #ifdef GL_EXT_draw_buffers\n\
                    #extension GL_EXT_draw_buffers : require\n\
                #endif\n\
                #ifdef GL_ES\n\
                    precision highp float;\n\
                    precision highp int;\n\
                #endif\n\
                out vec4 o_color;\n\
                void main() {\n\
                    o_color = vec4(1.0); \n\
                }";
        };
        // ====================================================================================================================
        var ParticleRenderInputs;
        (function (ParticleRenderInputs) {
            /** X Position of the particle. */
            ParticleRenderInputs[ParticleRenderInputs["x"] = 0] = "x";
            /** Y Position of the particle. */
            ParticleRenderInputs[ParticleRenderInputs["y"] = 1] = "y";
            /** RGB color 8-bit colors encoded into a float (bottom 24 bits). */
            ParticleRenderInputs[ParticleRenderInputs["colorRGB"] = 2] = "colorRGB";
            /** Transparency (0.0 to 1.0). */
            ParticleRenderInputs[ParticleRenderInputs["alpha"] = 3] = "alpha";
            /** Keep as the last enum to know the size of the float block required. */
            ParticleRenderInputs[ParticleRenderInputs["blockSize"] = 4] = "blockSize";
        })(ParticleRenderInputs = MathPipelines.ParticleRenderInputs || (MathPipelines.ParticleRenderInputs = {}));
        /**
         * The vertex shader code to use when rendering objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         */
        MathPipelines.renderCode_vs = function (gl) {
            return "#version 300 es\n\
                #ifdef GL_ES\n\
                    precision highp float;\n\
                    precision highp int;\n\
                #endif\n\
                \n\
                uniform float pixelSize;\n\
                \n\
                uniform float width;\n\
                uniform float height;\n\
                in vec2  a_pos;\n\
                in float a_colorRGB;\n\
                in float a_alpha;\n\
                \n\
                out vec4 v_color;\n\
                void main() {\n\
                    int rgb = int(a_colorRGB);\n\
                    v_color = vec4(float((rgb>>16)&0xff)/255., float((rgb>>8)&0xff)/255., float(rgb&0xff)/255., a_alpha);\n\
                    gl_Position = vec4(float(int(a_pos.x)) * pixelSize / (width / 2.), float(int(a_pos.y)) * pixelSize / (height / 2.), 0., 1.);\n\
                    gl_PointSize = pixelSize;\n\
                }";
        };
        /**
         * The fragment shader code to use when rendering objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         */
        MathPipelines.renderCode_fs = function (gl) {
            return (gl.isWebGL2Supported ? "#version 300 es\n" : "") + "\
                #ifdef GL_ES\n\
                    precision highp float;\n\
                    precision highp int;\n\
                #endif\n\
                in vec4 v_color;\n\
                out vec4 o_color;\n\
                void main() {\n\
                    o_color = v_color; \n\
                }";
        };
    })(MathPipelines = WorldSimulator2D.MathPipelines || (WorldSimulator2D.MathPipelines = {}));
})(WorldSimulator2D || (WorldSimulator2D = {}));
// Particles in GPU examples: 
// 1. http://philogb.github.io/philogl/PhiloGL/examples/particles/
// 2. http://nullprogram.com/blog/2014/06/29/
// 3. Liquid ideas: http://nullprogram.com/blog/2013/06/26/
// 4. Try vertex feedback buffers: https://gpfault.net/posts/webgl2-particles.txt.html
//# sourceMappingURL=gpuprocessing.js.map