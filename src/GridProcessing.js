

export default class GridProcessing {

    _width;

    _height;

    _grid;

    _nextGrid;

    constructor(w, h) {
        this.updateSize(w, h);
    }

    /**
     *
     */
    reset() {
        this.updateSize(this._width, this._height);
    }

    /**
     *
     */
    updateSize(w, h) {
        this._width = w;
        this._height = h;

        this._grid = new Uint8Array((this._width + 2) * (this._height + 2));
        this._nextGrid = new Uint8Array((this._width + 2) * (this._height + 2));
    }

    /**
     *
     * @param x
     * @param y
     */
    setLife(x, y, val) {
        this._nextGrid[x * (this._width + 2) + y] = val;
    }

    /**
     *
     * @param x
     * @param y
     * @returns {*}
     */
    getLife(x, y) {
        return this._grid[x * (this._width + 2) + y];
    }

    /**
     *
     */
    update() {
        this._grid = new Uint8Array(this._nextGrid);
        //this._nextGrid = temp;
    }

    /**
     *
     * @param x
     * @param y
     * @returns {number}
     */
    getNeighborCount(x, y) {
        let count = 0;

        count += this._grid[(x - 1) * (this._width + 2) + y];
        count += this._grid[x * (this._width + 2) + (y-1)];
        count += this._grid[(x - 1) * (this._width + 2) + (y-1)];
        count += this._grid[(x + 1) * (this._width + 2) + (y)];

        count += this._grid[x * (this._width + 2) + (y + 1)];
        count += this._grid[(x + 1) * (this._width + 2) + (y + 1)];
        count += this._grid[(x + 1) * (this._width + 2) + (y - 1)];
        count += this._grid[(x - 1) * (this._width + 2) + (y + 1)];

        return count;
    }

}