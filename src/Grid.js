import Mesh from "./Render/Mesh";
import Cell from "./Cell";
import EventEmitter from "./EventSystem/EventEmmiter";


/**
 *
 */
export default class Grid extends EventEmitter {

    _width;

    _height;

    _cells = [];

    constructor(width, height) {
        super();

        this._width = width;
        this._height = height;

        this.updateCells();
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    /**
     *
     */
    updateSize(w, h) {
        this._width = w;
        this._height = h;
        this.updateCells();

        this.dispatchEvent("updateSize");
    }

    /**
     *
     */
    updateCells() {
        this._cells = [];
        for (let x = 1; x <= this._width; x++) {

            for (let y = 1; y <= this._height; y++) {

                this._cells.push(new Cell());

            }
        }
    }
}