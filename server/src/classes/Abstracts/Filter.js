const FilterTypes = {
    LowPass: "LowPass",
    HighPass: "HighPass",
    BandPass: "BandPass"
}

export default class Filter {
    constructor() {
        this.filterType = FilterTypes.LowPass;
        this.cutoff = 0.5;
        this.resonance = 0.2;
    }
}