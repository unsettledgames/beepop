import {EventBus} from "../Input/EventBus";
import NoteData from "../PianoRoll/NoteData";

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
        this.bindInput = this.bindInput.bind(this);

        this.bindInput();
    }

    bindInput() {
        console.log("bindo");
        window.addEventListener("mouseup", this.onMouseUp.bind(this));
        window.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("wheel", this.onMouseWheel.bind(this));
        window.addEventListener("pointermove", this.onMouseMove.bind(this));

        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("keydown", this.onKeyDown.bind(this));

        window.addEventListener("contextmenu", this.preventContextMenu.bind(this));
    }

    onMouseUp(e) {
        console.log("mouse");
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
        // Stop playing the note
        this.playNoteEvent(e.keyCode, false);
    }

    /** Triggered when a key is pushed
     * 
     * @param {*} e The key event
     */
    onKeyDown(e) {
        console.log("premuto");
        // Saving the key event
        this._keyEvent = e;
        // Play the note
        if (!e.repeat)
            this.playNoteEvent(e.keyCode, true);
    }

    playNoteEvent(keyCode, starts) {
        let eventType = starts ? "start" : "stop";
        switch (keyCode) {
            // Z
            case 90:
                EventBus.emit("synth-"+eventType+"-playing-note", new NoteData("C-4", 0, 500, 1));
                break;
            // X
            case 88:
                EventBus.emit("synth-"+eventType+"-playing-note", new NoteData("D-4", 0, 500, 1));
                break;
            // C
            case 67:
                EventBus.emit("synth-"+eventType+"-playing-note", new NoteData("E-4", 0, 500, 1));
                break;
            // V
            case 86:
                EventBus.emit("synth-"+eventType+"-playing-note", new NoteData("F-4", 0, 500, 1));
                break;
            // B
            case 66:
                EventBus.emit("synth-"+eventType+"-playing-note", new NoteData("G-4", 0, 500, 1));
                break;
            // N
            case 78:
                EventBus.emit("synth-"+eventType+"-playing-note", new NoteData("A-4", 0, 500, 1));
                break;
            // M
            case 77:
                EventBus.emit("synth-"+eventType+"-playing-note", new NoteData("B-4", 0, 500, 1));
                break;
            // ;
            case 188:
                EventBus.emit("synth-"+eventType+"-playing-note", new NoteData("C-5", 0, 500, 1));
                break;

        }
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