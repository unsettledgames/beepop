export default class _Input {
    constructor() {
        // Telling whether or not the mouse buttons are pressed
        this._leftButtonDown = false;
        this._rightButtonDown = false;

        // Saving the key event (also contains whether or not alt or shift are pressed)
        this._keyEvent = undefined;
        
        // Position data
        this._currMousePos = false;
        this._lastMousePos = false;

        // Binding the JS input events to the input functions
        bindInput();
    }

    bindInput() {
        window.addEventListener("mouseup", this.onMouseUp.bind(this));
        window.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("wheel", this.onMouseWheel.bind(this));
        window.addEventListener("pointermove", this.onMouseMove.bind(this));

        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("keydown", this.onKeyDown.bind(this));

        window.addEventListener("contextmenu", this.preventContextMenu.bind(this));
    }

    onMouseUp(e) {
        if (e.button === 0) {
            this._leftButtonDown = false;
        }
        else if (e.button === 2) {
            this._rightButtonDown = false;
        }
    }

    /** Triggered when the user presses a mouse button
     * 
     * @param {*} e 
     */
    onMouseDown(e) {
        if (e.button === 0) {
            this._leftButtonDown = true;
        }
        else if (e.button === 2) {
            this._rightButtonDown = true;
        }
    }

    onMouseWheel(e) {

    }

    /** Triggered when the user is moving the mouse
     * 
     * @param {*} e 
     */
    onMouseMove(e) {
        this._lastMousePos = this._currMousePos;
        this._currMousePos = {x: e.clientX, y: e.clientY};
    }

    /** Triggered when a key is realeased
     * 
     * @param {*} e 
     */
    onKeyUp(e) {
        // The user is not pressing anything, setting _keyEvent to undefined
        this._keyEvent = undefined;
    }

    /** Triggered when a key is pushed
     * 
     * @param {*} e The key event
     */
    onKeyDown(e) {
        // Saving the key event
        this._keyEvent = e;
    }

    /** Prevent the context menu from opening
     * 
     * @param {MouseEvent} e The mouse event
     * @returns 
     */
    preventContextMenu(e) {
        e.preventDefault();
        return false;
    }
}

const Input = new _Input();