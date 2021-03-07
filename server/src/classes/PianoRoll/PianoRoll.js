import VisualComponent from "../Abstracts/VisualComponent";

export default class PianoRoll extends VisualComponent {
    constructor() {
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