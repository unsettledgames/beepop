export default class InstrumentInstance {
    constructor() {
        this.htmlElement = undefined;
        this.notes = undefined;
        this.instrument = undefined;
    }

    getNotes() {
        return this.notes;
    }

    setNotes(noteData) {
        this.notes = noteData;
    }

    getInstrument() {
        return this.instrument;
    }

    setInstrument(toSet) {
        this.instrument = toSet;
    }
}