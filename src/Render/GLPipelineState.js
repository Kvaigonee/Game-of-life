import GLViewport from "./GLViewport";
import GLShader from "./Shader/GLShader";
import vertexShaderSource from "./Shader/GLVertexShaderSource";
import GLFragmentShaderSource from "./Shader/GLFragmentShaderSource";
import GLShaderProgram from "./Shader/GLShaderProgram";


export default class GLPipelineState {

    /**
     *
     * @private
     */
    _canvas;

    /**
     *
     * @private
     */
    _gl;

    /**
     *
     * @private
     */
    _program;

    /**
     *
     * @private
     */
    _texture;

    /**
     *
     * @private
     */
    _nextTexture;

    /**
     *
     * @private
     */
    _buffer;

    /**
     *
     * @private
     */
    _matrixLocation;


    constructor() {
        this._canvas = this._createCanvas();
        this._gl = this._createContext();

        this._texture = this._gl.createTexture();
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        this._setTextureParams();

        this._nextTexture = this._gl.createTexture();
        this._buffer = this._createBuffer();

        const vertexShader = GLShader.createVertex(this._gl, vertexShaderSource);
        const fragmentShader = GLShader.createFragment(this._gl, GLFragmentShaderSource);
        this._program = GLShaderProgram.create(this._gl, vertexShader, fragmentShader);

        this._applyPointers();

        this._gl.clearColor(0.5, 0.5, 0.5, 1);

        this._matrixLocation = this._gl.getUniformLocation(this._program, "u_matrix");
    }

    get canvas() {
        return this._canvas;
    }

    get gl() {
        return this._gl;
    }

    get program() {
        return this._program;
    }

    get matrixLocation() {
        return this._matrixLocation;
    }

    get buffer() {
        return this._buffer;
    }

    get texture() {
        return this._texture;
    }

    get nextTexture() {
        return this._nextTexture;
    }


    /**
     *
     * @returns {HTMLElement}
     * @private
     */
    _createCanvas() {
        let canvas = document.getElementById("render-area");

        if (!canvas) {
            canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
        }

        return canvas;
    }

    /**
     *
     * @returns {*}
     * @private
     */
    _createContext() {
        if (!this._canvas) {
            throw new Error("Get context before init canvas!");
        }

        const gl = this._canvas.getContext("webgl2");

        if (!gl) {
            throw new Error("Get context error!");
        }

        return gl;
    }

    /**
     *
     * @private
     */
    _setTextureParams() {
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
    }

    /**
     *
     * @returns {WebGLBuffer | AudioBuffer}
     * @private
     */
    _createBuffer() {
        const buffer = this._gl.createBuffer();
        if (buffer === null) throw new Error("Buffer was not created!");

        return buffer;
    }

    /**
     *
     * @private
     */
    _applyPointers() {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);

        let attribPosition = this._gl.getAttribLocation(this._program, "a_position");
        this._gl.enableVertexAttribArray(attribPosition);

        this._gl.vertexAttribPointer(
            attribPosition, 2, this._gl.FLOAT, false, 16, 0);


        let uvAttribPosition = this._gl.getAttribLocation(this._program, "a_texcoord");
        this._gl.enableVertexAttribArray(uvAttribPosition);

        this._gl.vertexAttribPointer(
            uvAttribPosition, 2, this._gl.FLOAT, false, 16, 8);
    }
}