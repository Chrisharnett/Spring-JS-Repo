class Exercise {
    constructor(
        name,
        dynamic,
        articulation,
        tempoLow,
        tempoHigh,
        description,
        duration
    ) {
        this.name = name;
        this.dynamic = dynamic;
        this.articulation = articulation;
        this.tempo = {
            low: tempoLow,
            high: tempoHigh,
        };
        this.tempoHigh = tempoHigh;
        this.description = description;
        this.duration = duration;
    }
}
export default Exercise;

const G4WholeNote = new Exercise (
    "G4 whole note",
    "mf",
    "fermata",
    [new StaveNote({ keys: ["g/4"], duration: "w" }),],
    60,
    120,
    "Breath in on 2. Play a medium loud g for four beats. Repeat.",
    25,
);