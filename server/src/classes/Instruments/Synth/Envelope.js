import {audioContext} from "../../../consts/Globals";
import {lerp} from "../../../utilities/MathUtilities";

export default class Envelope {
    constructor(type) {
        this.attack = 0;
        this.decay = 0;
        this.sustain = 1;
        this.release = 0;

        switch (type) {
            case "gain":
                this.node = audioContext.createGain();
                break;
            default:
                console.log("Couldn't create Envelope of type " + type);
                break;
        }
    }

    updateEnvelope(updateObject) {
        console.log("env object: ");
        console.log(updateObject);

        if (updateObject.attack) {
            this.attack = updateObject.attack;
        }
        if (updateObject.decay)
            this.decay = updateObject.decay;
        if (updateObject.sustain)
            this.sustain = updateObject.sustain;
        if (updateObject.release)
            this.release = updateObject.release;
        if (updateObject.duration === undefined) 
            console.log("MUST SEND A NOTE DURATION TO THE ENVELOPE");

        let duration = updateObject.duration;
        /* Used to save the duration of the note, including attack and decay:
        in that way the note won't get longer as attack and decay increase */
        let currentDuration = this.attack;
        // If attack or decay are too high, the note may not reach the expected sustain value
        let appliedSustain;

        /*********** SETTING UP THE ENVELOPE *****************/
        // Attack starts from 0
        this.node.gain.linearRampToValueAtTime(audioContext.currentTime, 0);

        // If I have enough time to have that attack time, I apply it 
        if (currentDuration < duration) {
            // Attack reaches the maximum volume after attackTime 
            this.node.gain.linearRampToValueAtTime(1, audioContext.currentTime + this.attack / 1000);
        }
        // Otherwise, the attack will only reach a certain level (not 1)
        else {
            console.log("lerp: " + lerp(0, 1, duration / this.attack))
            this.node.gain.linearRampToValueAtTime(
                lerp(0, 1, duration / this.attack), 
                audioContext.currentTime + duration / 1000
            );

            appliedSustain = lerp(0, 1, duration / this.attack);
        }

        currentDuration += this.decay;

        // If I have time to apply decay, I do so
        if (currentDuration <= duration) {
            // Decay creates a transition to the sustain value
            this.node.gain.linearRampToValueAtTime(
                this.sustain, 
                audioContext.currentTime + (this.decay + this.attack) / 1000
            );
            appliedSustain = this.sustain;
        }
        // Otherwise, I apply the decay for as long as I can (until the end of the note)
        else {
            this.node.gain.linearRampToValueAtTime(
                lerp(1, 0, (duration - this.attack) / this.decay),
                audioContext.currentTime + (duration) / 1000);
            
            appliedSustain = lerp(1, 0, (duration - this.attack) / this.decay);
        }

        // Release starts from the applied sustain value
        this.node.gain.linearRampToValueAtTime(appliedSustain,
            audioContext.currentTime + (duration) / 1000);
        // And slides towards 0 as soon as the note is over
        this.node.gain.linearRampToValueAtTime(0,
                audioContext.currentTime + (duration + this.release) / 1000);
    }

    connect(node) {
        this.node.connect(node);
    }
}