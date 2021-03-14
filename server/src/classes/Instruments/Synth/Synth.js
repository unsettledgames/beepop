import Instrument from "../Instrument";
import {MaxOscillators} from "../../../config/SynthConfig";
import Envelope from "./Envelope";
import {EventBus} from "../../Input/EventBus";
import Oscillator, { WaveShapes } from "./Oscillator";
import NoteData, {getNoteFrequency} from "../../PianoRoll/NoteData";

export default class Synth extends Instrument {
    constructor() {
        super();

        let defaultEnvelope = {
            attack: 0, decay: 0, sustain: 0, release: 0, duration: 1
        };

        this.leftEnvelope = new Envelope("gain");
        this.rightEnvelope = new Envelope("gain");

        this.leftEnvelope.updateEnvelope(defaultEnvelope);
        this.rightEnvelope.updateEnvelope(defaultEnvelope);

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

        // Connecting the first 2 oscillators to the first envelope
        this.oscillators[0].envelopeNode = this.leftEnvelope;
        this.oscillators[1].envelopeNode = this.leftEnvelope;

        this.oscillators[2].envelopeNode = this.rightEnvelope;
        this.oscillators[3].envelopeNode = this.rightEnvelope;

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
        let envelopeObject = {duration: toPlay.duration};

        this.leftEnvelope.updateEnvelope(envelopeObject);
        this.rightEnvelope.updateEnvelope(envelopeObject);

        for (let i=0; i<this.oscillators.length; i++) {
            this.oscillators[i].playNote(toPlay, this.leftEnvelope.release);
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
