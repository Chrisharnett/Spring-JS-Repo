

//  A G Long tone
const { Renderer, Stave, StaveNote, Voice, Beam, Formatter } = Vex.Flow;

const div = document.getElementById("output")
const renderer = new Renderer(div, Renderer.Backends.SVG);

//Rendering Context??
renderer.resize(500, 500);
const context = renderer.getContext();
// newStave(position x, y, width z)
const stave = new Stave(10, 20, 300);

stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context
stave.setContext(context).draw();

const notes1 = [
    new StaveNote({ keys: ["g/4"], duration: "8" }),
    new StaveNote({ keys: ["a/4"], duration: "8" }),
]
const notes2 = [
    new StaveNote({ keys: ["b/4"], duration: "8" }),
    new StaveNote({ keys: ["c/5"], duration: "8" }),
]
const notes3 = [
    new StaveNote({ keys: ["d/5"], duration: "8" }),
    new StaveNote({ keys: ["c/5"], duration: "8" }),
]
const notes4 = [
    new StaveNote({ keys: ["b/4"], duration: "8" }),
    new StaveNote({ keys: ["a/4"], duration: "8" }),
];

const allNotes = notes1.concat(notes2).concat(notes3).concat(notes4);

const beams = [new Beam(notes1), new Beam(notes2), new Beam(notes3), new Beam(notes4)]

Formatter.FormatAndDraw(context, stave, allNotes);

beams.forEach((b) => {
    b.setContext(context).draw();
});

function dotted(staveNote) {
    Dot.buildAndAttach([staveNote]);
    return staveNote
}