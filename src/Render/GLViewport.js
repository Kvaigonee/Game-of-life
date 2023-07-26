
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
    _size = 1280;

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
    get size() {
        return this._size;
    }

    /**
     *
     * @private
     */
    _updateSize() {
        this._canvas.width = this._size;
        this._canvas.height = this._size;
    }

    /**
     *
     */
    _onWindowResize() {
        this._updateSize();
    }
}