import Mesh from "./Render/Mesh";
import CellGeometry from "./Render/CellGeometry";


export default class Cell {


    _position;

    _xOnGrid;

    _yOnGrid;

    _w;

    _h;

    constructor(position, xOnGrid, yOnGrid, w, h) {

        this._position = position;

        this._xOnGrid = xOnGrid;
        this._yOnGrid = yOnGrid;

        this._w = w;
        this._h = h;
    }


    get position() {
        return this._position;
    }

    get xOnGrid() {
        return this._xOnGrid;
    }

    get yOnGrid() {
        return this._yOnGrid;
    }
}