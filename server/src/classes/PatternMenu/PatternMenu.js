import VisualComponent from "../Abstracts/VisualComponent";

export default class PatternMenu extends VisualComponent {
    constructor() {
        this.patterns = undefined;
        this.currentPattern = undefined;
        this.allInstruments = null;
    }

    switchToPattern(patternIndex) {

    }

    getCurrentPattern() {
        return this.currentPattern;
    }

    createPattern() {
        
    }

    deletePattern() {

    }

    renamePattern(newName) {
        
    }

    changePatternColor() {

    }

    addInstrument(toAdd) {

    }

    deleteInstrument(index) {

    }

    renameInstrument(index, newName) {

    }

    changeInstrumentColor(index, newName) {

    }

    setInstrumentMixerTrack(index, mixerTrack) {

    }

    fillEvery(index, rate) {

    }

    openInPianoRoll(index) {
        
    }
}