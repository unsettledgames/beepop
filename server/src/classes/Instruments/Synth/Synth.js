import Instrument from "../Instrument";
import {MaxVoices} from "../../../config/SynthConfig";
import {MaxOscillators} from "../../../config/SynthConfig";
import EventBus from "../../Input/EventBus";
import Oscillator from "./Oscillator";

export default class Synth extends Instrument {
    constructor() {
        super();
        this.maxVoices = MaxVoices;

        this.attack = 0;
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
                this.oscillators.push(new Oscillator(i, 0.7));
            }
            else {
                this.oscillators.push(new Oscillator(i, 0));
            }
        }

        this.bindListeners();
    }

    bindListeners() {
        //EventBus.on()
    }

    /** Plays a note
     * 
     * @param {NoteData} toPlay The data of the note that should be played
     */
    playNote(toPlay) {
        for (let i=0; i<this.oscillators.length; i++) {
            this.oscillators[i].playNote(toPlay);
        }
    }

    updateOscillatorData(oscIndex) {

    }

    updateLFO(lfoIndex) {
        
    }

    updateAutomation(automationIndex) {
        
    }
}
