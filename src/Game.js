import EventEmitter from "./EventSystem/EventEmmiter";


class UserInputHandler extends EventEmitter {

}


export default class Game {

    _inputHandler;


    constructor() {

        this._inputHandler = new UserInputHandler();


        this._inputHandler.addEventListener("start", this._onStart);
    }




    _onStart() {

    }

    _onStop() {

    }

    _onChangeGenerationLifeType() {

    }


}