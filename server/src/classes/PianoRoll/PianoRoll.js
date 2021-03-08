import VisualComponent from "../Abstracts/VisualComponent";

export default class _PianoRoll extends VisualComponent {
    constructor() {
        super();
        
        this.currentNoteData = undefined;
        this.currentPhysicalNotes = undefined;
    
        this.tools = undefined;
        this.currentTool = undefined;
    }

    drawNotes(notes) {

    }

    switchTool(newTool) {
        
    }
}

const PianoRoll = new _PianoRoll();