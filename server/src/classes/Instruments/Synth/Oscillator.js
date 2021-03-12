import {audioContext as AudioContext} from "../../../consts/Globals";

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
        this.gainNode = AudioContext.createGain();
        this.gainNode.gain.value = this.volume;
    }

    playNote(toPlay) {
        // Creating a new oscillator (yes, that's how the Audio API work)
        let osc = this.createSetupOscillator(toPlay.frequency);

        osc.start();
        osc.stop(AudioContext.currentTime + toPlay.duration / 1000);
    }

    startPlayingNote(toPlay) {
        // BUG: save the notes that are playing in a hash map, so I can stop the right
        // ones in case I play more than one note at the same time
        if (this.userKeyboardNote && this.userKeyboardNote === toPlay.name)
            this.userKeyboardOsc.stop();
        // Saving the oscillator so I can stop it later
        this.userKeyboardOsc = this.createSetupOscillator(toPlay.frequency);
        this.userKeyboardOsc.start();
        // Saving the note, so that I don't make a mess
        this.userKeyboardNote = toPlay.name;
    }

    stopPlaying() {
        this.userKeyboardOsc.stop();
    }

    /** Creates an oscillator and sets it up. No need to recreate nodes, however
     *  oscillators must be recreated for each note.
     * 
     * @param {*} freq The frequency of the note to play
     * @returns The created oscillator
     */
    createSetupOscillator(freq) {
        let osc = AudioContext.createOscillator();

        osc.volume = this.volume;
        osc.frequency.value = freq;        
        osc.type = this.waveform;

        osc.connect(this.gainNode);

        // ISSUE: every time an oscillator is created, it will probably be necessary
        // to rebuild the sound effect chain in the corresponding mixer track
        this.gainNode.connect(AudioContext.destination);

        return osc;
    }
}