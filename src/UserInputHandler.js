import EventEmitter from "./EventSystem/EventEmmiter";

/**
 *
 */
export default class UserInputHandler extends EventEmitter {

    _startButton;

    _stopButton;

    _sizeInput;

    constructor() {
        super();

        this._initButtons();
        this._initInputs();
    }


    /**
     *
     * @private
     */
    _initInputs() {
        this._sizeInput = this._protectedGetElemById("size");
        this._sizeValue = this._protectedGetElemById("size-value");

        this._sizeValue.textContent = this._sizeInput.value + "X" + this._sizeInput.value;

        this._sizeInput.addEventListener("input", (event) => {
            this._sizeValue.textContent = event.target.value + "X" + event.target.value;
        });

        this._sizeInput.addEventListener("change", (event) => {
            this.dispatchEvent("sizeChange", {value: +event.target.value});
        });
    }


    /**
     *
     * @private
     */
    _initButtons() {
        this._startButton = this._protectedGetElemById("start");
        this._stopButton = this._protectedGetElemById("stop");
        this._resetButton = this._protectedGetElemById("reset");

        this._startButton.addEventListener("click", () => {

            this.dispatchEvent("start");
        });

        this._stopButton.addEventListener("click", () => {

            this.dispatchEvent("stop");
        });


        this._resetButton.addEventListener("click", () => {

            this.dispatchEvent("reset");
        });
    }


    /**
     *
     * @param id
     * @returns {HTMLElement}
     * @private
     */
    _protectedGetElemById(id) {
        const elem = document.getElementById(id);
        if (!elem) throw new Error(`Get element by id: ${id} error!`);

        return elem;
    }

}