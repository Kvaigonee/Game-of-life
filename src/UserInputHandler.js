import EventEmitter from "./EventSystem/EventEmmiter";

/**
 *
 */
export default class UserInputHandler extends EventEmitter {

    _startButton;

    _stopButton;

    constructor() {
        super();

        this._initButtons();
    }


    /**
     *
     * @private
     */
    _initButtons() {
        this._startButton = this._protectedGetElemById("start");
        this._stopButton = this._protectedGetElemById("stop");

        this._startButton.addEventListener("click", () => {

            this.dispatchEvent("start");
        });

        this._stopButton.addEventListener("click", () => {

            this.dispatchEvent("stop");
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