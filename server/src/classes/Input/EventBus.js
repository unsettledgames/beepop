export default class _EventBus {
    constructor() {
        this.bus = {};
    }

    /** Adds the callback to the event with name eventName
     * 
     * @param {*} eventName The name of the event
     * @param {*} callback  The callback to add to the events
     */
    on(eventName, callback) {
        if (!this.bus[eventName]) {
            this.bus[eventName] = [];
        }

        this.bus[eventName].push(callback);
    }

    /** Emits the event with name eventName and calls all the associated callbacks
     * 
     * @param {*} eventName The name of the event
     * @param  {...any} parameters The parameters of the callbacks
     */
    emit(eventName, ...parameters) {
        if (this.bus[eventName]) {
            for (let callback of this.bus[eventName]) {
                callback(...parameters);
            }
        }
    }
}

export const EventBus = new _EventBus();