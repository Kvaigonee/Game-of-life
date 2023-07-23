import GLViewport from "./GLViewport";


export default class GLRenderer {
    /**
     *
     * @type {string}
     * @private
     */
    _CANVAS_ID = "render_area";

    /**
     *
     * @private
     */
    _glViewPort;

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
     */
    constructor(gridW, gridH) {
        this._canvas = this._createCanvas(this._CANVAS_ID);
        this._gl = this._createContext();
        this._glViewPort = new GLViewport(this._canvas);

        this._texture = this._gl.createTexture();
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        this._setTextureParams();
        this._updateTextureSize(gridW, gridH);


        this._nextTexture = this._gl.createTexture();

        this._buffer = this._createBuffer();
    }

    /**
     *
     * @param x
     * @param y
     * @param val
     */
    setColorToTexture(x, y, val) {
        const colorData = val === 0
            ? new Uint8Array([0, 0, 0, 255])
            : new Uint8Array([0, 255, 0, 255]);

        this._gl.texSubImage2D(this._gl.TEXTURE_2D, 0, x, y,
            1, 1, this._gl.RGBA, this._gl.UNSIGNED_BYTE, colorData);
    }


    /**
     *
     * @returns {HTMLElement}
     * @private
     */
    _createCanvas() {
        let canvas = document.getElementById(this._CANVAS_ID);

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



    _setTextureParams() {
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
    }


    _updateTextureSize(w, h) {
        this._gl.texImage2D(
            this._gl.TEXTURE_2D,
            0,
            this._gl.RGBA,
            w,
            h,
            0,
            this._gl.RGBA,
            this._gl.UNSIGNED_BYTE,
            null
        );
    }

    _createBuffer() {
        const buffer = this._gl.createBuffer();
        if (buffer === null) throw new Error("Buffer was not created!");

        return buffer;
    }

    _updateBufferGeometry(w, h) {

        const bufferData = new Float32Array([
            -0.7, -0.7, 0,
            0, 1,
            -0.7, 0.7, 0,
            0, 0,
            0.7, 0.7, 0,
            1, 0,
            0.7, 0.7, 0,
            1, 0,
            0.7, -0.7, 0,
            1, 1,
            -0.7, -0.7, 0,
            0, 1,
        ]);

        this._gl.bufferData(this._gl.ARRAY_BUFFER, bufferData, this._gl.STATIC_DRAW);
    }


}