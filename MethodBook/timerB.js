"use strict";

// import Exercises from "./Exercises.js";

const $ = selector => document.querySelector(selector);

const oldExerciseList = [
    'C4_wholeNote.js',
    'G4_to_D5_8ths.js',
    'G4_wholeNote.js'
];

let exerciseCounter = 0;
let timer = null;
let exercise = null;

const output = $("#output");

const changeExercise = () => {
    exercise = oldExerciseList[Math.floor(Math.random() * oldExerciseList.length)];
    const exerciseScript = document.createElement('script');
    exerciseScript.src = exercise;
}

var w;

const startCountDown = () => {
    if(typeof(Worker) !=="undefined") {
        if(typeof(w) == "undefined") {
            w=new Worker("Countdown.js");
        }
        w.onmessage = function(event) {
            document.getElementById("countDown").innerHTML = event.data
        };
    } else {
        document.getElementById("countDown").innerHTML = "Sorry! No Web Worker support.";
    }
    
}

const toggleStartText = () => {
    if ($("#start").innerHTML == "Start") {
        $("#start").innerHTML = "Stop"
    }
    else {
        $("#start").innerHTML = "Start"
    }
}
const timerControl = () => {
    if ($("#start").innerHTML == "Start"){
        startCountDown();
    }
    else {
        w.terminate();
    }
}
document.addEventListener("DOMContentLoaded", () => {

    $("#start").addEventListener("click", () => {
        // changeExercise();
        timerControl()
        toggleStartText()
        timer = setInterval(changeExercise, 1000);
        $("#start").disabled = false;
        $("#reset").disabled = false;
    });

    $("#reset").addEventListener("click", () => {
        clearInterval(timer);
        $("#start").disabled = false;
        $("#reset").disabled = true;
        w.terminate();
    });

});