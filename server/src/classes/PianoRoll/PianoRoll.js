import VisualComponent from "../Abstracts/VisualComponent";

class _PianoRoll extends VisualComponent {
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

export const PianoRoll = new _PianoRoll();