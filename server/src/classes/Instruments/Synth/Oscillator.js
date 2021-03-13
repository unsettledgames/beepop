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

        // Gain node used for the sound envelop
        this.envelopeNode = audioContext.createGain();

        // User notes (the notes the user is currently playing)
        this.userNotes = {};
    }

    playNote(toPlay, attack, decay, sustain, release) {
        /* Used to save the duration of the note, including attack and decay:
           in that way the note won't get longer as attack and decay increase */
        let currentDuration = attack;

        // If the attack time is too long, I 
        //if (currentDuration > toPlay.duration)

        /*********** SETTING UP THE ENVELOPE *****************/
        // Attack starts from 0
        this.envelopeNode.gain.linearRampToValueAtTime(0,0);

        // If I have enough time to have that attack time, I apply it 
        if (currentDuration < toPlay.duration) {
            // Attack reaches the maximum volume after attackTime 
            this.envelopeNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + attack / 1000);
        }
        // Otherwise, the attack will only reach a certain level (not 1)
        else {
            this.envelopeNode.gain.linearRampToValueAtTime(
                lerp(0, 1, toPlay.duration / attack), 
                audioContext.currentTime + toPlay.duration / 1000
            );
        }

        currentDuration += decay;

        // If I have time to apply decay, I do so
        if (currentDuration <= toPlay.duration) {
            // Decay creates a transition to the sustain value
            this.envelopeNode.gain.linearRampToValueAtTime(sustain, audioContext.currentTime + (decay + attack) / 1000);
        }
        // Otherwise, I apply the decay for as long as I can (until the end of the note)
        else {
            // BUG:
            this.envelopeNode.gain.linearRampToValueAtTime(
                lerp(1, 0, toPlay.duration / currentDuration),
                audioContext.currentTime + attack + toPlay.duration);
        }
        

        // Release transitions from sustain to 0
        this.envelopeNode.gain.linearRampToValueAtTime(0, (release + attack + decay) / 1000);

        // Creating a new oscillator with the object properties
        let osc = this.createSetupOscillator(toPlay.frequency);

        osc.start();
        osc.stop(audioContext.currentTime + (toPlay.duration + release) / 1000);
    }

    startPlayingNote(toPlay) {
        // BUG: save the notes that are playing in a hash map, so I can stop the right
        // ones in case I play more than one note at the same time
        if (this.userNotes[toPlay.name])
            this.userNotes[toPlay.name].stop();
        // Saving the oscillator so I can stop it later
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

        osc.connect(this.gainNode).connect(this.envelopeNode);

        // ISSUE: every time an oscillator is created, it will probably be necessary
        // to rebuild the sound effect chain in the corresponding mixer track
        this.envelopeNode.connect(audioContext.destination);

        return osc;
    }
}