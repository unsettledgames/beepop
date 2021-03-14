import {audioContext} from "../../../consts/Globals";
import {lerp} from "../../../utilities/MathUtilities";

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

        this.envelopeNode = undefined;

        // User notes (the notes the user is currently playing)
        this.userNotes = {};
    }

    playNote(toPlay, release) {
        // Creating a new oscillator with the object properties
        let osc = this.createSetupOscillator(toPlay.frequency);

        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + (toPlay.duration + release) / 1000);
    }

    startPlayingNote(toPlay) {
        // BUG: save the notes that are playing in a hash map, so I can stop the right
        // ones in case I play more than one note at the same time
        if (this.userNotes[toPlay.name])
            this.userNotes[toPlay.name].stop();
        // Saving the oscillator so I can stop it later
        this.envelopeNode.gain.value = 1;
        this.userNotes[toPlay.name] = this.createSetupOscillator(toPlay.frequency);
        this.userNotes[toPlay.name].start();
    }

    stopPlaying(toStop) {
        this.userNotes[toStop.name].stop();
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

        console.log(this.envelopeNode);
        this.envelopeNode.connect(audioContext.destination);

        osc.connect(this.gainNode).connect(this.envelopeNode.node);

        // ISSUE: every time an oscillator is created, it will probably be necessary
        // to rebuild the sound effect chain in the corresponding mixer track
        //

        return osc;
    }
}