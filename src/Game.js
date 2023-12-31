import UserInputHandler from "./UserInputHandler";
import GLRenderer from "./Render/GLRender";
import Grid from "./Grid";

/**
 *
 */
export default class Game {

    _inputHandler;

    _render;

    _gridProcessing;

    _startProcess;

    _updateInSecond;

    _moveStep = 10;

    constructor() {
        this._render = new GLRenderer();

        this._inputHandler = new UserInputHandler();
        this._render.size = this._inputHandler.size;
        this._updateInSecond = this._inputHandler.speed;

        this._initListeners();

        this._gridProcessing = new Grid(this._render.size);

        this._randomGeneration();
        this._update();

        this._repaint();
    }

    /**
     *
     * @private
     */
    _randomGeneration() {
        for (let x = 0; x < this._render.size; x++) {
            for (let y = 0; y < this._render.size; y++) {
                const val = Math.random() < 0.7 ? 0 : 1;
                this._gridProcessing.setLife(x, y, val);
            }
        }
        this._gridProcessing.update();
    }

    /**
     *
     * @private
     */
    _update() {
        let time = Date.now();
        for (let x = 0; x < this._render.size; x++) {
            for (let y = 0; y < this._render.size; y++) {
                let m = this._gridProcessing.getNeighborCount(x, y);
                if (m === 3) {
                    this._gridProcessing.setLife(x, y, 1);
                    continue;
                }
                if (m === 2) {
                    let state = this._gridProcessing.getLife(x, y);
                    this._gridProcessing.setLife(x, y, state);
                    continue;
                }

                this._gridProcessing.setLife(x, y, 0);
            }
        }

        this._gridProcessing.update();
        this._render.textureSubData(this._gridProcessing.grid);

        this._inputHandler.generationTime = Date.now() - time;
    }

    /**
     *
     * @private
     */
    _repaint() {
        requestAnimationFrame(() => {

           this._render.draw();
           this._repaint();
        });
    }

    /**
     *
     * @private
     */
    _initListeners() {
        this._onStart = this._onStart.bind(this);
        this._onStop = this._onStop.bind(this);
        this._onReset = this._onReset.bind(this);
        this._onRandom = this._onRandom.bind(this);
        this._onSizeChange = this._onSizeChange.bind(this);
        this._onSpeedChange = this._onSpeedChange.bind(this);
        this._onLeft = this._onLeft.bind(this);
        this._onRight = this._onRight.bind(this);
        this._onTop = this._onTop.bind(this);
        this._onBottom = this._onBottom.bind(this);
        this._onScale = this._onScale.bind(this);

        this._inputHandler.addEventListener("start", this._onStart);
        this._inputHandler.addEventListener("stop", this._onStop);
        this._inputHandler.addEventListener("reset", this._onReset);
        this._inputHandler.addEventListener("random", this._onRandom);
        this._inputHandler.addEventListener("sizeChange", this._onSizeChange);
        this._inputHandler.addEventListener("speedChange", this._onSpeedChange);
        this._inputHandler.addEventListener("scaleChange", this._onScale);

        this._inputHandler.addEventListener("left", this._onLeft);
        this._inputHandler.addEventListener("right", this._onRight);
        this._inputHandler.addEventListener("top", this._onTop);
        this._inputHandler.addEventListener("bottom", this._onBottom);


        this._initCanvasListeners();
    }

    /**
     *
     * @private
     */
    _initCanvasListeners() {
        let wasDown = false;

        this._render.canvas.addEventListener("mousedown", () => {
            wasDown = true;
        });

        this._render.canvas.addEventListener("mouseup", () => {
            wasDown = false;
        });

        this._render.canvas.addEventListener("mousemove", (event) => {
            if (wasDown) {
                this._applyEventCoordinates(event);
            }
        });
    }

    /**
     *
     * @private
     */
    _start() {
        if (this._startProcess !== undefined) return;

        this._startProcess = window.setInterval(() => {
            this._update();
        }, 1000 / this._updateInSecond);
    }

    /**
     *
     * @private
     */
    _stop() {
        if (this._startProcess !== undefined) {
            window.clearInterval(this._startProcess);
            this._startProcess = undefined;
        }
    }

    /**
     *
     * @private
     */
    _onStart() {
        this._start();
    }

    /**
     *
     * @private
     */
    _onStop() {
        this._stop();
    }

    /**
     *
     * @private
     */
    _onReset() {
        this._render.clearView();
        this._gridProcessing.reset();
        this._stop();
    }

    /**
     *
     * @private
     */
    _onRandom() {
        this._randomGeneration();
        this._update();
    }

    /**
     *
     * @private
     */
    _onScale(event) {
        this._render.camera[2] = event.value;
    }

    /**
     *
     * @param event{{value:number}}
     * @private
     */
    _onSizeChange(event) {
        this._render.size = event.value;
        this._gridProcessing.updateSize(event.value);
        this._render.textureData(this._gridProcessing.grid);

        this._randomGeneration();
        this._update();
    }

    /**
     *
     * @param event
     * @private
     */
    _onSpeedChange(event) {
        this._stop();
        this._updateInSecond = event.value;
        this._start();
    }

    /**
     *
     * @private
     */
    _onLeft() {
        this._render.camera[0] += this._moveStep;
    }

    /**
     *
     * @private
     */
    _onRight() {
        this._render.camera[0] -= this._moveStep;
    }


    /**
     *
     * @private
     */
    _onTop() {
        this._render.camera[1] -= this._moveStep;
    }

    /**
     *
     * @private
     */
    _onBottom() {
        this._render.camera[1] += this._moveStep;
    }

    /**
     *
     * @private
     */
    _applyEventCoordinates(event) {
        if (this._startProcess !== undefined) return;

        const viewSize = this._render.viewPort.size * this._render.camera[2];

        const sizeCellInPix = viewSize / this._render.size; // this._render.camera[2]);

        let x = event.clientX - this._render.camera[0];
        let y = viewSize - event.clientY - this._render.camera[1];

        x = Math.ceil(x / sizeCellInPix) - 1;
        y = Math.ceil(y / sizeCellInPix) - 1;

        this._gridProcessing.setLife(x, y, 1);
        this._gridProcessing.update();

        this._render.textureSubData(this._gridProcessing.grid);
    }
}