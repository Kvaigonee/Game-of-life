/**
 *
 */
export default class EventEmitter extends EventTarget {

    /**
     *
     */
    _eventListenerList;

    /**
     *
     */
    constructor() {
        super();
        this._eventListenerList = new Map();
        this._onEvent = this._onEvent.bind(this);
    }

    /**
     *
     */
    addEventListener(key, listener) {
        this._eventListenerList.set(key, listener);
        super.addEventListener(key.toString(), this._onEvent);
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
        this._eventListenerList.delete(key);
        super.removeEventListener(key.toString(), this._onEvent);
    }

    /**
     *
     */
    _onEvent(evt) {
        const callBack = this._eventListenerList.get(evt.type);
        if (!callBack) return;

        callBack(evt.detail);
    }
}