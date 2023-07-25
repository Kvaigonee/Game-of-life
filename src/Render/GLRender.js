import GLViewport from "./GLViewport";
import GLPipelineState from "./GLPipelineState";
import Mat4 from "../Math/Mat4";


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
    _gridCols = 1000;

    /**
     *
     * @type {number}
     * @private
     */
    _gridRows = 1000;

    /**
     *
     * @private
     */
    _camera;

    /**
     *
     * @type {number}
     * @private
     */
    _gridWidth = 2000;

    /**
     *
     * @type {number}
     * @private
     */
    _gridHeight = 2000;

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
        this._camera = Mat4.translation(0, 0, 0);

        this._rawTexture = new Uint8Array(this._gridCols * this._gridRows * 4);

        this._updateBufferGeometry();
        this._updateTextureSize();
    }

    /**
     *
     * @returns {*}
     */
    get camera() {
        return this._camera;
    }

    get countCols() {
        return this._gridCols;
    }

    get countRows() {
        return this._gridRows;
    }

    /**
     *
     * @param x
     * @param y
     * @param val
     */
    setColorToTextureData(x, y, val) {
        let index = (this._gridCols * y + x) * 4;

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
    applyTextureData() {
        this._pipelineState.gl.texSubImage2D(
            this._pipelineState.gl.TEXTURE_2D, 0, 0,
            0, this._gridCols, this._gridRows,
            this._pipelineState.gl.RGBA, this._pipelineState.gl.UNSIGNED_BYTE,
            this._rawTexture
        );
    }

    /**
     *
     * @param w
     * @param h
     */
    setGridSize(w, h) {
        this._gridCols = w;
        this._gridRows = h;

        this._updateBufferGeometry();
    }

    /**
     *
     * @param w
     * @param h
     */
    setSize(w, h) {
        this._gridWidth = w;
        this._gridHeight = h;

        this._updateBufferGeometry();
    }

    /**
     *
     */
    draw() {
        const gl = this._pipelineState.gl;

        gl.viewport(0, 0, this._glViewPort.width, this._glViewPort.height);

        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this._pipelineState.program);

        gl.uniformMatrix4fv(this._pipelineState.matrixLocation, false, this._camera);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    /**
     *
     * @private
     */
    _updateBufferGeometry() {
        let pixelWidth = 2 / this._glViewPort.width;
        let pixelHeight = 2 / this._glViewPort.height;

        const x1 = -1;
        const y1 = -1;

        const x2 = (this._gridWidth * pixelWidth - 1);
        const y2 = (this._gridHeight * pixelHeight - 1);

        const bufferData = new Float32Array([
            x1, y1, 0,
            0, 1,
            x1, y2, 0,
            0, 0,
            x2, y2, 0,
            1, 0,
            x2, y2, 0,
            1, 0,
            x2, y1, 0,
            1, 1,
            x1, y1, 0,
            0, 1,
        ]);

        const gl = this._pipelineState.gl;

        gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    }

    /**
     *
     * @private
     */
    _updateTextureSize() {
        this._pipelineState.gl.texImage2D(
            this._pipelineState.gl.TEXTURE_2D,
            0,
            this._pipelineState.gl.RGBA,
            this._gridCols + 2,
            this._gridRows + 2,
            0,
            this._pipelineState.gl.RGBA,
            this._pipelineState.gl.UNSIGNED_BYTE,
            null
        );
    }

}