"use strict";

//  A G Long tone
const { Factory } = Vex.Flow;

// Create a VexFlow renderer attached to the DIV element with id="output".
const vf = new Factory({ renderer: { elementId: 'output' } });
const score = vf.EasyScore();
const system = vf.System();

// Create a 4/4 treble stave and add two parallel voices.
system.addStave({
voices: [

    // Bottom voice has two half notes, with stems down.
    score.voice(score.notes('C4/w'))
]
}).addClef('treble').addTimeSignature('4/4');

// Draw it!
vf.draw();

//  A G Long tone
const { Stave, StaveNote, Voice, Beam, Formatter } = Vex.Flow;

const div = document.getElementById("output")
const renderer = new Renderer(div, Renderer.Backends.SVG);

//Rendering Context??
renderer.resize(500, 500);
const context = renderer.getContext();
// newStave(position x, y, width z)
const stave = new Stave(10, 20, 200);

stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context
stave.setContext(context).draw();

const notes1 = [
    new StaveNote({ keys: ["c/4"], duration: "w" }),
]

Formatter.FormatAndDraw(context, stave, notes1);


function dotted(staveNote) {
    Dot.buildAndAttach([staveNote]);
    return staveNote
}