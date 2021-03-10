export default class NoteData {
    constructor() {
        this.noteName = undefined;
        this.noteFrequency = undefined;
        this.startTime = undefined;
        this.endTime = undefined;
        this.noteVolume = undefined;
    }
}

// Problema: tra A e B non c'è un solo tono, purtropo
export function getNoteFrequency(noteName) {
    // Converting everything to uppercase so I don't have case problems
    noteName = noteName.toUpperCase();

    // Name of the note
    let note = noteName.charAt(0);
    // Modifier (# if sharp, b if flat or - if none)
    let modifier = noteName.charAt(1);
    // Octave of the note 
    let octave = noteName.charAt(2);

    let octaveDifference = Math.abs(octave - 4);
    let semitoneDifference;
    let sign;
    
    // Normally, notes go from B to A, instead we're going from C to B because
    // it's more intuitive for the user
    
    // If the note is B, there's only a tone of difference
    if (note.charCodeAt(0) == 'B'.charCodeAt(0)) {
        // Going up or down?
        if (octave >= 4) {
            sign = 1;
            semitoneDifference = 2;
        }
        else {
            sign = -1;
            semitoneDifference = -2;
        }
    }
    // Otherwise, I can't do A - G for example, so I pretend A is H 
    // to get the correct distance
    else {
        switch (note) {
            case 'C':
                semitoneDifference = -9;
                break;
            case 'D':
                semitoneDifference = -7;
                break;
            case 'E':
                semitoneDifference = -5;
                break;
            case 'F':
                semitoneDifference = -4;
                break;
            case 'G':
                semitoneDifference = -2;
                break;
            case 'A':
                semitoneDifference = 0;
                break;
            default:
                console.log("NOTE " + note + " NOT FOUND");
                break;
        }

        // Going up or down?
        if (octave > 4) 
            sign = 1;
        else 
            sign = -1;
    }
    
    let modifierDifference;
    let totSemitones;

    switch (modifier) {
        case '-':
            modifierDifference = 0;
            break;
        case '#':
                modifierDifference = 1;
            break;
    }

    totSemitones = 12*octaveDifference*sign + semitoneDifference+ modifierDifference;

    return Math.pow(2, (totSemitones / 12))*440;
    // fn = frequency of the note that has a difference of n semitones from A4 (440 Hz)
}