export default class Pattern {
    constructor() {
        this.usedInstruments = undefined;
        this.name = undefined;
        this.color = undefined;
    }

    getInstrument(index) {
        return this.usedInstruments[index];
    }

    getInstruments() {
        return this.usedInstruments;
    }
}