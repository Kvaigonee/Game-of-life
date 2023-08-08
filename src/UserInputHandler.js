import EventEmitter from "./EventSystem/EventEmmiter";

/**
 *
 */
export default class UserInputHandler extends EventEmitter {

    _startButton;

    _stopButton;

    _sizeInput;

    _sizeValue;

    _speedInput;

    _speedValue;

    _resetButton;

    _randomButton;

    constructor() {
        super();

        this._initButtons();
        this._initInputs();
        this._initKeyListeners();


        this._lastGenarationTime = this._protectedGetElemById("time");
    }

    get size() {
        return +this._sizeInput.value;
    }

    get speed() {
        return +this._speedInput.value;
    }

    set generationTime(value) {
        this._lastGenarationTime.innerText = value;
    }

    /**
     *
     * @private
     */
    _initInputs() {
        this._sizeInput = this._protectedGetElemById("size");
        this._speedInput = this._protectedGetElemById("speed");
        this._scaleInput = this._protectedGetElemById("scale");

        this._sizeValue = this._protectedGetElemById("size-value");
        this._speedValue = this._protectedGetElemById("speed-value");
        this._scaleValue = this._protectedGetElemById("scale-value");

        this._sizeValue.textContent = this._sizeInput.value + "X" + this._sizeInput.value;
        this._speedValue.textContent = this._speedInput.value + " updates in second";
        this._scaleValue.textContent = this._scaleInput.value;

        this._sizeInput.addEventListener("input", (event) => {
            this._sizeValue.textContent = event.target.value + "X" + event.target.value;
        });

        this._speedInput.addEventListener("input", (event) => {
            this._speedValue.textContent = event.target.value + " updates in second";
        });

        this._scaleInput.addEventListener("input", (event) => {
            this._scaleValue.textContent = event.target.value;
        });

        this._sizeInput.addEventListener("change", (event) => {
            this.dispatchEvent("sizeChange", {value: +event.target.value});
        });

        this._speedInput.addEventListener("change", (event) => {
            this.dispatchEvent("speedChange", {value: +event.target.value});
        });

        this._scaleInput.addEventListener("change", (event) => {
            this.dispatchEvent("scaleChange", {value: +event.target.value});
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
        this._randomButton = this._protectedGetElemById("random");

        this._startButton.addEventListener("click", () => {

            this.dispatchEvent("start");
        });

        this._stopButton.addEventListener("click", () => {

            this.dispatchEvent("stop");
        });

        this._resetButton.addEventListener("click", () => {

            this.dispatchEvent("reset");
        });

        this._randomButton.addEventListener("click", () => {

            this.dispatchEvent("random");
        });
    }

    /**
     *
     * @private
     */
    _initKeyListeners() {
        document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "KeyA":
                    this.dispatchEvent("left");
                    break;
                case "KeyD":
                    this.dispatchEvent("right");
                    break;
                case "KeyW":
                    this.dispatchEvent("top");
                    break;
                case "KeyS":
                    this.dispatchEvent("bottom");
                    break;
            }
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