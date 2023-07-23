/**
 *
 */
export default class GLShader {

    /**
     *
     */
    _webGLShader;

    /**
     *
     */
    _type;

    /**
     *
     * @param renderingContext
     * @param shaderType
     * @param sourceCode
     */
    constructor(renderingContext, shaderType, sourceCode) {

        const glContext = renderingContext;
        const shader = glContext.createShader(shaderType);

        if(shader === null){
            throw new Error("Unable to create shader with type " + shaderType);
        }

        glContext.shaderSource(shader, sourceCode);
        glContext.compileShader(shader);

        if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
            throw new Error(
                "An error occurred compiling the shaders: " +
                glContext.getShaderInfoLog(shader) +
                glContext.getShaderInfoLog(shader)
            );
        }

        this._webGLShader = shader;
        this._type = shaderType;
    }

    /**
     *
     */
    get webGLShader() {
        return this._webGLShader;
    }

    /**
     *
     */
    get type() {
        return this._type;
    }

    /**
     *
     * @param ctx
     * @param shaderSource
     * @returns {GLShader}
     */
    static createVertex(ctx, shaderSource) {
        return GLShader.create(ctx, ctx.VERTEX_SHADER, shaderSource);
    }

    /**
     *
     * @param ctx
     * @param shaderSource
     * @returns {GLShader}
     */
    static createFragment(ctx, shaderSource) {
        return GLShader.create(ctx, ctx.FRAGMENT_SHADER, shaderSource);
    }

    /**
     *
     * @param ctx
     * @param shaderType
     * @param shaderSource
     * @returns {GLShader}
     */
    static create(ctx, shaderType, shaderSource){
        return new GLShader(ctx, shaderType, shaderSource);
    }
}

