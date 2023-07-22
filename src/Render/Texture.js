
/**
 * Class that defines texture rendering options
 */
export default class Texture {

    #source;

    constructor(source) {
        this.#source = source;
    }

    get source() {
        return this.#source;
    }

    set source(value) {
        if (!(value instanceof TextureSource)) {
            throw new Error(`Value : ${value} is invalid source type!`);
        }

        this.source = value;
    }
}