import GLViewport from "./GLViewport";
import GLPipelineState from "./GLPipelineState";


export default class GLRenderer {
    /**
     * @type {GLViewport}
     * @private
     */
    _glViewPort;

    /**
     *
     * @private
     */
    _pipelineState;

    /**
     *
     * @type {number}
     * @private
     */
    _gridSize = 500;

    /**
     * TODO impl scaling and translation
     * @private
     */
    _camera;

    /**
     *
     * @private
     */
    _rawTexture;

    /**
     *
     */
    constructor() {
        this._pipelineState = new GLPipelineState();
        this._glViewPort = new GLViewport(this._pipelineState.canvas);

        //this._camera = Mat3.translation(0, 0, 0);
        //this._pipelineState.gl.uniformMatrix3fv(this._pipelineState.matrixLocation, false, this._camera);

        this._rawTexture = new Uint8Array(this._gridSize * this._gridSize * 4);

        this._updateBufferGeometry();
        this._updateTextureSize();
    }

    /**
     *
     * @returns {GLViewport}
     */
    get viewPort() {
        return this._glViewPort;
    }

    /**
     *
     * @returns {*}
     */
    get camera() {
        return this._camera;
    }

    /**
     *
     */
    get canvas() {
        return this._pipelineState.canvas;
    }

    /**
     *
     * @returns {number}
     */
    get size() {
        return this._gridSize;
    }

    /**
     *
     * @param value
     */
    set camera(value) {
        this._camera = value;
    }

    /**
     *
     * @param x
     * @param y
     * @param val
     */
    setColorToTextureData(x, y, val) {
        let index = (this._gridSize * y + x) * 4;

        if (val === 0) {
            this._rawTexture[index++] = 255;
            this._rawTexture[index++] = 255;
            this._rawTexture[index++] = 255;
            this._rawTexture[index] = 255;
            return;
        }

        this._rawTexture[index++] = 0;
        this._rawTexture[index++] = 255;
        this._rawTexture[index++] = 0;
        this._rawTexture[index] = 255;
    }

    /**
     *
     */
    clearView() {
        this._updateTextureSize();
    }

    /**
     *
     */
    applyTextureData() {
        this._pipelineState.gl.texSubImage2D(
            this._pipelineState.gl.TEXTURE_2D, 0, 0,
            0, this._gridSize, this._gridSize,
            this._pipelineState.gl.RGBA, this._pipelineState.gl.UNSIGNED_BYTE,
            this._rawTexture
        );
    }

    /**
     *
     */
    set size(size) {
        this._gridSize = size;

        this._updateBufferGeometry();
        this._updateTextureSize();
    }

    /**
     *
     */
    draw() {
        const gl = this._pipelineState.gl;

        gl.viewport(0, 0, this._glViewPort.size, this._glViewPort.size);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this._pipelineState.program);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    /**
     *
     * @private
     */
    _updateBufferGeometry() {
        const bufferData = new Float32Array([
            -1, -1,
            0, 1,

            1, -1,
            1, 1,

            -1, 1,
            0, 0,

            1, 1,
            1, 0
        ]);

        const gl = this._pipelineState.gl;
        gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    }

    /**
     *
     * @private
     */
    _updateTextureSize() {
        this._rawTexture = new Uint8Array(this._gridSize * this._gridSize * 4);
        this._pipelineState.gl.texImage2D(
            this._pipelineState.gl.TEXTURE_2D,
            0,
            this._pipelineState.gl.RGBA,
            this._gridSize,
            this._gridSize,
            0,
            this._pipelineState.gl.RGBA,
            this._pipelineState.gl.UNSIGNED_BYTE,
            null
        );
    }

}