"use strict"

var i = 1;

function countDown(interval) {
    let currentTime = interval - i;
    postMessage(currentTime);
    let timer;
    if (currentTime > 0){
        timer = setInterval(countDown,1000,interval);
        i++
    }
    else {
        postMessage("Done. Hit Next.")
        timer = clearInterval(timer)
    }
    
}

countDown(180);