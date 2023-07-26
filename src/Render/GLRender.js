import GLViewport from "./GLViewport";
import GLPipelineState from "./GLPipelineState";
import Mat3 from "../Math/Mat3";


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
    _gridCols = 500;

    /**
     *
     * @type {number}
     * @private
     */
    _gridRows = 500;

    /**
     *
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
        this._camera = Mat3.translation(0, 0, 0);

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

    /**
     *
     * @returns {number}
     */
    get countCols() {
        return this._gridCols;
    }

    /**
     *
     * @returns {number}
     */
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
        this._updateTextureSize();
    }

    /**
     *
     */
    draw() {
        const gl = this._pipelineState.gl;

        gl.viewport(0, 0, this._glViewPort.width, this._glViewPort.height);

        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this._pipelineState.program);

        gl.uniformMatrix3fv(this._pipelineState.matrixLocation, false, this._camera);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    /**
     *
     * @private
     */
    _updateBufferGeometry() {
        const bufferData = new Float32Array([
            -1, -1,
            0, 0,

            1, -1,
            1, 0,

            -1, 1,
            0, 1,

            1, 1,
            1, 1
        ]);

        const gl = this._pipelineState.gl;
        gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    }

    /**
     *
     * @private
     */
    _updateTextureSize() {
        this._rawTexture = new Uint8Array(this._gridCols * this._gridRows * 4);
        this._pipelineState.gl.texImage2D(
            this._pipelineState.gl.TEXTURE_2D,
            0,
            this._pipelineState.gl.RGBA,
            this._gridCols,
            this._gridRows,
            0,
            this._pipelineState.gl.RGBA,
            this._pipelineState.gl.UNSIGNED_BYTE,
            null
        );
    }

}