import Instrument from "../Instrument";
import {MaxVoices} from "../../../config/SynthConfig";
import {MaxOscillators} from "../../../config/SynthConfig";
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
        for (let i=0; i<MaxOscillators; i++) {
            this.oscillators.push(new Oscillator(i));
        }
    }

    updateOscillatorData(oscIndex) {

    }

    updateLFO(lfoIndex) {
        
    }

    updateAutomation(automationIndex) {
        
    }
}