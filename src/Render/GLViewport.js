
export default class GLViewport {

    /**
     *
     * @private
     */
    _canvas;

    /**
     *
     * @private
     */
    _DEFAULT_W = 1280;

    /**
     *
     * @private
     */
    _DEFAULT_H = 1280;

    /**
     *
     * @param canvas
     */
    constructor(canvas) {
        this._canvas = canvas;

        this._updateSize();
        this._onWindowResize = this._onWindowResize.bind(this);

        window.addEventListener("resize", this._onWindowResize);
    }

    /**
     *
     * @returns {*}
     */
    get width() {
        return this._canvas.width;
    }

    /**
     *
     * @returns {*}
     */
    get height() {
        return this._canvas.height;
    }

    /**
     *
     * @private
     */
    _updateSize() {
        this._canvas.width = this._DEFAULT_W;
        this._canvas.height = this._DEFAULT_H;
    }

    /**
     *
     */
    _onWindowResize() {
        this._updateSize();
    }
}