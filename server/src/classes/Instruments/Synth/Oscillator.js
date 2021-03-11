import {audioContext} from "../../../consts/Globals";

export const WaveShapes = {
    Sine: "sine",
    Triangle: "triangle",
    Saw: "sawtooth",
    Square: "square",
    Noise: "noise",
    Pulse: "pulse"
}


export default class Oscillator {
    constructor(index, startVolume, waveform) {
        this.htmlElement = undefined;
        this.oscIndex = index;
        this.waveform = waveform;

        // Oscillator properties
        this.detune = 0;
        this.phase = 0.5;
        this.pan = 0.5;
        this.volume = startVolume;

        // Note properties
        this.octaveOffset = 0;
        this.semitoneOffset = 0;

        // Gain node
        this.gainNode = audioContext.createGain();
        this.gainNode.gain.value = this.volume;
    }

    playNote(toPlay) {
        // Creating a new oscillator (yes, that's how the Audio API work)
        let osc = this.createSetupOscillator(toPlay.frequency);

        osc.start();
        osc.stop(toPlay.duration / 1000);
    }

    /** Creates an oscillator and sets it up. No need to recreate nodes, however
     *  oscillators must be recreated for each note.
     * 
     * @param {*} freq The frequency of the note to play
     * @returns The created oscillator
     */
    createSetupOscillator(freq) {
        let osc = audioContext.createOscillator();

        osc.volume = this.volume;
        osc.frequency.value = freq;        
        osc.type = this.waveform;

        osc.connect(this.gainNode);

        // ISSUE: every time an oscillator is created, it will probably be necessary
        // to rebuild the sound effect chain in the corresponding mixer track
        this.gainNode.connect(audioContext.destination);

        return osc;
    }
}