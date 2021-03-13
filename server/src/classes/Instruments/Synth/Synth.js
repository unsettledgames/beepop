import Instrument from "../Instrument";
import {MaxOscillators} from "../../../config/SynthConfig";
import {EventBus} from "../../Input/EventBus";
import Oscillator, { WaveShapes } from "./Oscillator";
import NoteData, {getNoteFrequency} from "../../PianoRoll/NoteData";

export default class Synth extends Instrument {
    constructor() {
        super();

        this.attack = 500;
        this.decay = 1;
        this.sustain = 1;
        this.release = 0;

        this.arpeggiator = undefined;
        this.oscillators = [];

        this.mainFilter = undefined;
        this.LFOs = [];
        this.automations = [];

        // Creating the oscillators
        for (let i=0; i<4; i++) {
            if (i == 0) {
                this.oscillators.push(new Oscillator(i, 0.25, WaveShapes.Saw));
            }
            else {
                this.oscillators.push(new Oscillator(i, 0, WaveShapes.Triangle));
            }
        }

        this.bindListeners = this.bindListeners.bind(this);
        
        this.bindListeners();
        this.bindMethods();
    }

    bindListeners() {
        EventBus.on("synth-start-playing-note", this.startPlayingNote.bind(this));
        EventBus.on("synth-stop-playing-note", this.stopPlaying.bind(this))
    }

    bindMethods() {
        this.playNote = this.playNote.bind(this);
    }

    /** Plays a note
     * 
     * @param {NoteData} toPlay The data of the note that should be played
     */
    playNote(toPlay) {
        for (let i=0; i<this.oscillators.length; i++) {
            this.oscillators[i].playNote(toPlay, 
                this.attack, this.decay, this.sustain, this.release);
        }
    }

    /** Starts playing a note
     * 
     * @param {NoteData} toPlay The data of the note that should be played
     */
    startPlayingNote(toPlay) {
        for (let i=0; i<this.oscillators.length; i++) {
            this.oscillators[i].startPlayingNote(toPlay);
        }
    }

    /** Stops playing the current note
     * 
     */
    stopPlaying(note) {
        for (let i=0; i<this.oscillators.length; i++) {
            this.oscillators[i].stopPlaying(note);
        }
    }

    
    updateOscillatorData() {
    }

    updateLFO(lfoIndex) {
        
    }

    updateAutomation(automationIndex) {
        
    }
}
