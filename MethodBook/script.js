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
    score.voice(score.notes('G4/w'))
]
}).addClef('treble').addTimeSignature('4/4');

// Draw it!
vf.draw();