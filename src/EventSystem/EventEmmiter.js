

export default class EventEmitter extends EventTarget {

    /**
     *
     */
    #eventListenerList;

    /**
     *
     */
    constructor() {
        super();
        this.#eventListenerList = new Map();
        this.onEvent = this.onEvent.bind(this);
    }

    /**
     *
     */
    addEventListener(key, listener) {
        this.#eventListenerList.set(key, listener);
        super.addEventListener(key.toString(), this.onEvent);
    }

    /**
     *
     * @param key
     * @param data
     */
    dispatchEvent(key, data){
        super.dispatchEvent(new CustomEvent(key.toString(), {
            detail: data
        }));
    }

    /**
     *
     * @param key
     */
    removeEventListener(key) {
        this.#eventListenerList.delete(key);
        super.removeEventListener(key.toString(), this.onEvent);
    }

    /**
     *
     */
    onEvent(evt) {
        const callBack = this.#eventListenerList.get(evt.type);
        if (!callBack) return;

        callBack(evt.detail);
    }
}