
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
    _w = 1280;

    /**
     *
     * @private
     */
    _h = 1280;

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
     */
    set width(value) {
        this._w = value;
        this._updateSize();
    }

    /**
     *
     */
    set height(value) {
        this._h = value;
        this._updateSize();
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
        this._canvas.width = this._w;
        this._canvas.height = this._h;
    }

    /**
     *
     */
    _onWindowResize() {
        this._updateSize();
    }
}