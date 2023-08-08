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

        this._camera = [1, 1, 1];

        this._rawTexture = new Uint8Array(this._gridSize * this._gridSize);

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
     */
    set size(size) {
        this._gridSize = size;

        this._updateTextureSize();
    }

    /**
     *
     * @param x
     * @param y
     * @param val
     */
    setColorToTextureData(x, y, val) {
        this._rawTexture[this._gridSize * y + x] = val;
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
    textureSubData(data) {
        this._pipelineState.gl.texSubImage2D(
            this._pipelineState.gl.TEXTURE_2D, 0, 0,
            0, this._gridSize, this._gridSize,
            this._pipelineState.gl.RED, this._pipelineState.gl.UNSIGNED_BYTE,
            data
        );
    }

    /**
     *
     * @param data
     */
    textureData(data) {
        this._updateTextureSize(data);
    }

    /**
     *
     */
    draw() {
        const gl = this._pipelineState.gl;

        gl.viewport(0, 0, this._glViewPort.size, this._glViewPort.size);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this._pipelineState.program);

        this._pipelineState.gl.uniform3fv(this._pipelineState.transformLocation, this._camera);
        this._pipelineState.gl.uniform2fv(this._pipelineState.resolutionLocation, new Float32Array([1280, 1280]));

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    /**
     *
     * @private
     */
    _updateBufferGeometry() {
        const bufferData = new Float32Array([
            0, 0,
            0, 1,

            this.viewPort.size, 0,
            1, 1,

            0, this.viewPort.size,
            0, 0,

            this.viewPort.size, this.viewPort.size,
            1, 0

            // 0, 0,
            // 0, 1,
            //
            // 1, 0,
            // 1, 1,
            //
            // 0, -1,
            // 0, 0,
            //
            // 1, -1,
            // 1, 0
        ]);

        const gl = this._pipelineState.gl;
        gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    }

    /**
     *
     * @private
     */
    _updateTextureSize(data) {
        this._pipelineState.gl.texImage2D(
            this._pipelineState.gl.TEXTURE_2D,
            0,
            this._pipelineState.gl.R8,
            this._gridSize,
            this._gridSize,
            0,
            this._pipelineState.gl.RED,
            this._pipelineState.gl.UNSIGNED_BYTE,
            data
        );
    }
}