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
    let toneDifference;
    let sign;
    
    // Normally, notes go from B to A, instead we're going from C to B because
    // it's more intuitive for the user
    
    // If the note is B, there's only a tone of difference
    if (note.charCodeAt(0) == 'B'.charCodeAt(0)) {
        toneDifference = 1;

        // Going up or down?
        if (octave >= 4) 
            sign = 1;
        else 
            sign = -1;
    }
    // Otherwise, I can't do A - G for example, so I pretend A is H 
    // to get the correct distance
    else {
        toneDifference = 'H'.charCodeAt(0) - note.charCodeAt(0);

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
        case 'b':
            modifierDifference = -1;
            break;
    }

    totSemitones = 12*octaveDifference + toneDifference*2 + modifierDifference;

    return Math.pow(2, (totSemitones / 12))*440;
    // fn = frequency of the note that has a difference of n semitones from A4 (440 Hz)
}