"use strict"
//Initialize arrays of images
const frontdiveImages = [];
const flipImages = [];
let count = 1;
// Store the target image location
const toScreen = $("#image")
let imageChange;

const changeImage = (i, dive) => {
    imageChange = setTimeout(function() {
        toScreen.attr("src", dive[i].src);
        i++;
        if (i < dive.length){
            changeImage(i, dive)
        } 
    }, 45);
    
}
const jump = () => {
    if (0 === count % 3) {
        changeImage(0, flipImages)
    } else {
        changeImage(0, frontdiveImages)
    }
    toScreen.attr("src", frontdiveImages[0].src);
    count ++;
}

$( () => {
    toScreen.on("click", function(){changeImage(0, flipImages)});
    count = 1;
    // get images for jump and flip
    const frontdive = $("#frontdive").find("li > a");
    const flip = $("#flip").find("li > a")
    //Preload jump images
    for (let link of frontdive) {
        let image = new Image();
        image.src = link.href;
        frontdiveImages[frontdiveImages.length] = image;
    }
    // Preload flip images
    for (let link of flip) {
        let image = new Image();
        image.src = link.href;
        flipImages[flipImages.length] = image;
    }
    setInterval(jump, 5000)
    
})