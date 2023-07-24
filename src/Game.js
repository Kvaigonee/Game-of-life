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

    constructor() {
        this._inputHandler = new UserInputHandler();

        this._render = new GLRenderer();

        this._inputHandler.addEventListener("start", this._onStart);
        this._gridProcessing = new GridProcessing(this._render.countCols, this._render.countRows);

        this._fillGrid();
        this._repaint();

        this._render.setSize(1000, 1000);

        setInterval(() => {
            this._update();
        }, 100);
    }


    _fillGrid() {
        let time = Date.now();
        for (let x = 0; x < this._render.countCols; x++) {
            for (let y = 0; y < this._render.countRows; y++) {
                this._render.setColorToTexture(x, y, 0)
            }
        }

        this._randomGeneration();

        this._gridProcessing.update();

        console.log("Fill grid time: ", Date.now() - time);
    }

    _randomGeneration() {
        for (let x = 2; x < this._render.countCols; x++) {
            for (let y = 2; y < this._render.countRows; y++) {
                const val = Math.random() < 0.7 ? 0 : 1;
                this._render.setColorToTexture(x, y, val);
                this._gridProcessing.setLife(x, y, val);
            }
        }
    }

    _update() {
        let time = Date.now();
        for (let x = 2; x <= this._render.countCols; x++)
        {
            for (let y = 2; y <= this._render.countRows; y++)
            {
                let m = this._gridProcessing.getNeighborCount(x, y);
                if (m === 3)
                {
                    this._gridProcessing.setLife(x, y, 1);
                    this._render.setColorToTexture(x, y, 1);
                    continue;
                }
                if (m === 2)
                {
                    let state = this._gridProcessing.getLife(x, y);
                    this._gridProcessing.setLife(x, y, state);
                    this._render.setColorToTexture(x, y, state);
                    continue;
                }

                this._gridProcessing.setLife(x, y, 0);
                this._render.setColorToTexture(x, y, 0);
            }
        }
        this._gridProcessing.update();

        console.log("Last update time: ", Date.now() - time);
    }

    _repaint() {
        requestAnimationFrame(() => {
           this._render.draw();

           this._repaint();
        });
    }

    _onStart() {
        console.log("Start pressed!");
    }

    _onStop() {

    }

    _onChangeGenerationLifeType() {

    }


}