import UserInputHandler from "./UserInputHandler";

/**
 *
 */
export default class Game {

    _inputHandler;


    constructor() {
        this._inputHandler = new UserInputHandler();

        this._inputHandler.addEventListener("start", this._onStart);
    }


    _onStart() {
        console.log("Start pressed!");
    }

    _onStop() {

    }

    _onChangeGenerationLifeType() {

    }


}