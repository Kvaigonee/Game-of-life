/**
 *
 */
export default class GLShaderProgram {
    /**
     *
     * @param gl
     * @param vertexShader
     * @param fragmentShader
     * @returns {WebGLProgram}
     */
    static create(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        if (program === null) throw new Error("Create program error!");

        gl.attachShader(program, vertexShader.webGLShader);
        gl.attachShader(program, fragmentShader.webGLShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error("Link program error!");
        }

        return program;
    }
}