import EventEmitter from "./EventSystem/EventEmmiter";

class Geometry {

}

class TextureSource {

}


class Texture {

    textureSource;

    constructor(source) {
        this.textureSource = source;
    }

    get source() {
        return this.textureSource;
    }

    set source(value) {
        if (!(value instanceof TextureSource)) {
            throw new Error(`Value : ${value} is invalid source type!`);
        }

        this.textureSource = value;
    }
}

class Mesh extends EventEmitter {

    position;

    constructor() {
        super();
    }

    setPosition(value) {
        this.dispatchEvent("setPosition", value);
    }

    getPosition() {

    }
}

console.log(new Mesh());

class Cell extends Mesh {

}

