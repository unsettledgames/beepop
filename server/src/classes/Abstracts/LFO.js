import {WaveShapes} from "../Instruments/Synth/Oscillator"

export default class LFO {
    constructor() {
        this.waveShape = WaveShapes.Sine;
        // FEATURE: let the user specify frequency by using beat tempo instead of 
        // float numbers
        this.frequency = 0.5;
        this.gain = 1;
        this.offset = 0;
    }
}