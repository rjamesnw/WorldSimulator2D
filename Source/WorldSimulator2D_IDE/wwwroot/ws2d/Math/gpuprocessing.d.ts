declare namespace WorldSimulator2D {
    /**
     * Types and routines
     */
    namespace MathPipelines {
        var GPU_KERNAL_MAX_DATA_PER_OBJECT: number;
        /**
         * The vertex shader code to use when processing objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         * @param varyings One ore more varyings for feedback buffers.
         */
        var processCode_vs: (gl: WebGL, varyings: string[]) => string;
        /**
         * The fragment shader code to use when processing objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         */
        var processCode_fs: (gl: WebGL) => string;
        enum ParticleRenderInputs {
            /** X Position of the particle. */
            x = 0,
            /** Y Position of the particle. */
            y = 1,
            /** RGB color 8-bit colors encoded into a float (bottom 24 bits). */
            colorRGB = 2,
            /** Transparency (0.0 to 1.0). */
            alpha = 3,
            /** Keep as the last enum to know the size of the float block required. */
            blockSize = 4,
        }
        /**
         * The vertex shader code to use when rendering objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         */
        var renderCode_vs: (gl: WebGL) => string;
        /**
         * The fragment shader code to use when rendering objects in the simulator.
         * @param gl A reference to the WebGL wrapper instance for this script (required to detect version information).
         */
        var renderCode_fs: (gl: WebGL) => string;
    }
}
