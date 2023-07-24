
export default class GLViewport {

    _canvas;

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
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
    }

    /**
     *
     */
    _onWindowResize() {
        //this._updateSize();
    }
}