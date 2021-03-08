export const WaveShapes = {
    Sine: new WaveShape("sine"),
    Triangle: new WaveShape("triangle"),
    Saw: new WaveShape("saw"),
    Square: new WaveShape("square"),
    Noise: new WaveShape("noise"),
    Pulse: new WaveShape("pulse")
}

export default class WaveShape {
    constructor(name) {
        this.name = name;
    }
}

export default class Oscillator {
    constructor(index) {
        this.osc = undefined;
        this.htmlElement = undefined;
        this.oscIndex = index;

        this.waveShape = WaveShape.Sine;

        this.detune = 0;
        this.phase = 0.5;
        this.pan = 0.5;
        this.volume = 1;

        this.octaveOffset = 0;
        this.semitoneOffset = 0;
    }
}