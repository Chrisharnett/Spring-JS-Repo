

//  A G Long tone
const { Renderer, Stave, StaveNote, Voice, Beam, Formatter } = Vex.Flow;

const div = document.getElementById("output")
// const renderer = new Renderer(div, Renderer.Backends.SVG);

//Rendering Context??
renderer.resize(500, 500);
const context = renderer.getContext();
// newStave(position x, y, width z)
const stave = new Stave(10, 20, 200);

stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context
stave.setContext(context).draw();

const notes1 = [
    new StaveNote({ keys: ["g/4"], duration: "w" }),
]

Formatter.FormatAndDraw(context, stave, notes1);


function dotted(staveNote) {
    Dot.buildAndAttach([staveNote]);
    return staveNote
}