"use strict"

//Initialize arrays of images
const hurdleImages = [];
const frontdiveImages = [];
const flipImages = [];
const entryImages = [];
const boardImages = [];
const walkImages = [];

// Store the target image location
const board = $("#board")
const diver = $("#diverimage")

const xSpeed = 7
const walkInterval = 3000;
let currentRotation = 0;
let count = 1;

const resetDiver = () => {
    diver.attr("src", walkImages[0].src)
    diver.css("transform", "rotate(0deg)");
    diver.css("left", -110);
    diver.css("top", 125);
    currentRotation = 0;
}
const animateBoard = (i) =>{
    setTimeout(function() {
        board.attr("src", boardImages[i].src);
        i++;
        if (i < boardImages.length){
            animateBoard(i, boardImages)
        }        
    }, 80);
};

const animateHurdle = (i) => {
    setTimeout(function() {
        diver.attr("src", hurdleImages[i].src);
        if (6 == i){
            animateBoard(0)
        }
        i++;
        if (i < hurdleImages.length){
            animateHurdle(i, hurdleImages)
        }
    }, 200);
}

const hurdlePath = (dive) => {
    setTimeout(animateHurdle, walkInterval, 0);
    let hurdleArc = {
        start: {
            x: 40,
            y: 130,
            angle: 250,
            length: 1.023
        },
        end: {
            x: 95,
            y: 150,
            angle: 79.011,
            length: 3
        }
    };
    diver.animate({
        path : new $.path.bezier(hurdleArc)
    }, 1800);
    divePath();
};

const flipRotate = () => {
    if (500 >= currentRotation){
        currentRotation += 20;
        diver.css("transform", 'rotate(' + currentRotation + 'deg)');
        setTimeout(flipRotate, 90);
    }
}

const animateFlip = (i) => {
    setTimeout(function() {
        diver.attr("src", flipImages[i].src);
        i++;
        if (i < flipImages.length){
            animateFlip(i, flipImages)
        }
        if (i >= 2){
            flipRotate()
        }
    }, 60);
};

const animateFrontDiveTuck = (i) => {
    setTimeout(function() {
        diver.attr("src", frontdiveImages[i].src);
        i++;
        if (i < frontdiveImages.length){
            animateFrontDiveTuck(i, frontdiveImages)
        }
    }, 80);
    setTimeout(diveRotate, 500)
}

const diveRotate = () => {
    if (160 >= currentRotation){
        currentRotation += 10;
        diver.css("transform", 'rotate(' + currentRotation + 'deg)');
        setTimeout(diveRotate, 600);
    }
}

const divePath = (dive) => {
    let diveArc = {
        start: {
            x: 95,
            y: 140,
            angle: 250,
            length: 1.8
        },
        end: {
            x: 300,
            y: 400,
            angle: 0,
            length: .4
        }
    };
    diver.animate({
        path : new $.path.bezier(diveArc)
    }, 2400);
    // count=0;
    if ( count == 1 || count == 2 ) {
            setTimeout(animateFrontDiveTuck, walkInterval + 1800, 0);
        count ++;
    }
    else {
        setTimeout(animateFlip, walkInterval + 2200, 0);
        count = 1;
    };
};

const animateWalk = (i) => {
    setTimeout(function() {
        diver.attr("src", walkImages[i].src);
        i++;
        if (i < walkImages.length){
            animateWalk(i, walkImages)
        }
    }, 200);
}

const walkOut = () => {
    resetDiver()
    animateWalk(0);
    diver.animate({left:"40px"}, walkInterval);
    hurdlePath()
}


$( () => {
    diver.on("click", function() { 
        count = 0
    });

    // get images for hurdle, frontdive, flip, entry, board and walk
    const hurdleHref = $("#hurdleHref").find("li > a");
    const frontdiveHref = $("#frontdiveHref").find("li > a");
    const flipHref = $("#flipHref").find("li > a")
    const entryHref = $("#entryHref").find("li > a")
    const boardHref = $("#boardHref").find("li > a")
    const walkHref = $("#walkHref").find("li > a")
    //Preload walk images
    for (let link of walkHref) {
        let image = new Image();
        image.src = link.href;
        walkImages[walkImages.length] = image;
    }
    //Preload hurdle images
    for (let link of hurdleHref) {
        let image = new Image();
        image.src = link.href;
        hurdleImages[hurdleImages.length] = image;
    };
    //Preload board images
    for (let link of boardHref) {
        let image = new Image();
        image.src = link.href;
        boardImages[boardImages.length] = image;
    };
    //Preload jump images
    for (let link of frontdiveHref) {
        let image = new Image();
        image.src = link.href;
        frontdiveImages[frontdiveImages.length] = image;
    }
    // Preload flip images
    for (let link of flipHref) {
        let image = new Image();
        image.src = link.href;
        flipImages[flipImages.length] = image;
    }
    // walkOut()
    setInterval(walkOut, 10000);
});