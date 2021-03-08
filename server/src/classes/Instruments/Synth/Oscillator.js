import {audioContext} from "../../../consts/Globals";

export class WaveShape {
    constructor(name) {
        this.name = name;
    }
}

export const WaveShapes = {
    Sine: new WaveShape("sine"),
    Triangle: new WaveShape("triangle"),
    Saw: new WaveShape("saw"),
    Square: new WaveShape("square"),
    Noise: new WaveShape("noise"),
    Pulse: new WaveShape("pulse")
}


export default class Oscillator {
    constructor(index, startVolume) {
        this.osc = audioContext.createOscillator();
        this.htmlElement = undefined;
        this.oscIndex = index;

        this.waveShape = WaveShape.Sine;

        // Oscillator properties
        this.detune = 0;
        this.phase = 0.5;
        this.pan = 0.5;
        this.volume = startVolume;

        // Note properties
        this.octaveOffset = 0;
        this.semitoneOffset = 0;

        // Nodes
        this.gainNode = undefined;
        
        // Bind the init function and initialize the oscillator
        this.init = this.init.bind(this);
        
        this.init();
    }

    init() {
        // Setting up the gain node
        this.gainNode = audioContext.createGain();
        this.gainNode.gain.value = this.volume;

        this.osc.connect(this.gainNode);
        this.gainNode.connect(audioContext.destination);
    }

    playNote(toPlay) {
        this.osc.start();
    }
}