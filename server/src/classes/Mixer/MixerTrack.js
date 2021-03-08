export default class MixerTrack {
    constructor(htmlElement, index) {
        this.htmlElement = this.htmlElement;
        this.visualizer = this.htmlElement.getElementsByClassName("mixer-visualizer")[0];

        this.volume = 0.75;
        this.pan = 0.5;
        this.enabled = true;
        this.stereo = true;

        this.number = index;
        this.name = "Track " + this.number;

        this.effects = [];
    }

    addEffect(toAdd) {

    }

    removeEffect(toRemove) {
        
    }

    removeEffect(effectIndex) {
        this.removeEffect(effects[effectIndex]);
    }

    moveEffect(startIndex, endIndex) {

    }


}