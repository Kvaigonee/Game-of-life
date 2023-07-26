import UserInputHandler from "./UserInputHandler";
import GLRenderer from "./Render/GLRender";
import GridProcessing from "./GridProcessing";

/**
 *
 */
export default class Game {

    _inputHandler;

    _render;

    _gridProcessing;

    _startProcess;

    constructor() {
        this._inputHandler = new UserInputHandler();
        this._initListeners();

        this._render = new GLRenderer();
        this._render.size = 1000;

        this._gridProcessing = new GridProcessing(this._render.size, this._render.size);

        this._randomGeneration();
        this._update();

        this._repaint();
    }

    /**
     *
     * @private
     */
    _randomGeneration() {
        for (let x = 2; x < this._render.size; x++) {
            for (let y = 2; y < this._render.size; y++) {
                const val = Math.random() < 0.7 ? 0 : 1;
                this._gridProcessing.setLife(x, y, val);

                if (val === 0) continue;
                this._render.setColorToTextureData(x, y, val);
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
        for (let x = 2; x < this._render.size; x++) {
            for (let y = 2; y < this._render.size; y++) {
                let m = this._gridProcessing.getNeighborCount(x, y);
                if (m === 3) {
                    this._gridProcessing.setLife(x, y, 1);

                    if (this._gridProcessing.getLife(x, y) !== 1) {
                        this._render.setColorToTextureData(x, y, 1);
                    }
                    continue;
                }
                if (m === 2) {
                    let state = this._gridProcessing.getLife(x, y);
                    this._gridProcessing.setLife(x, y, state);
                    //this._render.setColorToTextureData(x, y, state);
                    continue;
                }

                this._gridProcessing.setLife(x, y, 0);

                if (this._gridProcessing.getLife(x, y) !== 0) {
                    this._render.setColorToTextureData(x, y, 0);
                }
            }
        }

        this._render.applyTextureData();
        this._gridProcessing.update();

        //console.log("Last update time: ", Date.now() - time);
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
        this._onClick = this._onClick.bind(this);
        this._onSizeChange = this._onSizeChange.bind(this);

        this._inputHandler.addEventListener("start", this._onStart);
        this._inputHandler.addEventListener("stop", this._onStop);
        this._inputHandler.addEventListener("reset", this._onReset);
        this._inputHandler.addEventListener("sizeChange", this._onSizeChange);

        window.addEventListener("click", this._onClick);
    }

    _start() {
        if (this._startProcess !== undefined) return;

        this._startProcess = window.setInterval(() => {
            this._update();
        }, 100);
        console.log("Start pressed!");
    }

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
     * @param event{{value:number}}
     * @private
     */
    _onSizeChange(event) {
        console.log("WIDTH change")
        this._render.size = event.value;
        this._gridProcessing.updateSize(this._render.size, this._render.size);

        this._randomGeneration();
        this._update();
    }

    /**
     *
     * @private
     */
    _onClick() {
        console.log("CLICK!")
    }

}