export default class Instrument {
    constructor() {
        this.htmlElement = undefined;
        this.instrumentType = undefined;
        this.mixerTrack = undefined;
        this.pitch = 0;
        this.volume = 1;
    }

    getInstrumentType() {
        return this.instrumentType;
    }

    setMixerTrack(track) {
        this.mixerTrack = track;
    }

    openInstrumentEditor() {
        this.htmlElement.style.display = "block";
    }
}