

export default class Grid {

    _size;

    _grid;

    _nextGrid;

    constructor(size) {
        this.updateSize(size);
    }

    /**
     *
     * @returns {*}
     */
    get grid() {
        return this._grid;
    }

    /**
     *
     */
    reset() {
        this._grid = new Uint8Array(this._size * this._size);
        this._nextGrid = new Uint8Array(this._size * this._size);
    }

    /**
     *
     */
    updateSize(size) {
        this._size = size;
        this.reset();
    }

    /**
     *
     * @param x
     * @param y
     * @param val
     */
    setLife(x, y, val) {
        this._nextGrid[y * (this._size) + x] = val;
    }

    /**
     *
     * @param x
     * @param y
     * @returns {*}
     */
    getLife(x, y) {
        return this._grid[y * (this._size) + x];
    }

    /**
     *
     */
    update() {
        this._grid = new Uint8Array(this._nextGrid);
    }

    /**
     *
     * @param x
     * @param y
     * @returns {number}
     */
    getNeighborCount(x, y) {
        let count = 0;

        let bottom = y === 0 ? this._size - 1 : (y - 1);
        let left = x === 0 ? this._size - 1 : (x - 1);

        let right = x === this._size - 1 ? 0 : (x + 1);
        let top = y === this._size - 1 ? 0 : (y + 1);

        count += this._grid[(bottom) * (this._size) + x];
        count += this._grid[y * (this._size) + (left)];
        count += this._grid[(bottom) * (this._size) + (left)];
        count += this._grid[(top) * (this._size) + (x)];

        count += this._grid[y * (this._size) + (right)];
        count += this._grid[(top) * (this._size) + (right)];
        count += this._grid[(top) * (this._size) + (left)];
        count += this._grid[(bottom) * (this._size) + (right)];

        return count;
    }

}