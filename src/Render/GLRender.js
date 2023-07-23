import GLViewport from "./GLViewport";


export default class GLRenderer {

    _glViewPort;

    _canvas;

    _gl;

    constructor() {

    }


    /**
     *
     * @param elementId
     * @private
     */
    _createCanvas(elementId) {
        let canvas;

        if (typeof elementId === "string") {
            canvas = document.getElementById(elementId);
        }

        if (!canvas) {
            canvas = document.createElement("canvas");
        }

        document.body.appendChild(canvas);

        let gl = canvas.getContext("webgl2");
        if (!gl) {
            return;
        }

        this._canvas = canvas;
    }

    /**
     *
     * @param contextId
     * @private
     */
    _createContext(contextId) {
        if (typeof contextId !== "string") {
            throw new Error("contextId required!");
        }

        if (contextId !== "webgl2") {
            throw new Error("Unsupported gl context!");
        }

        if (!this._canvas) {
            throw new Error("Get context before init canvas!");
        }

        const gl = this._canvas.getContext("webgl2");

        if (!gl) {
            throw new Error("Get context error!");
        }

        this._gl = gl;
    }

}