"use strict"
let count = 1;

const changeColor = (pallet, swatches) => {
    if(count%5 == 0){
        $(".container").css("background-color", pallet[count%pallet.length]);
        count++;
    }
    $(swatches[count%swatches.length]).css("background-color", pallet[count%pallet.length]);
    count++;
}

$( () => {
// create an array of swatches (boxes) as targets in the html
    const swatches = $("div");
    const pallet = ["Snow", "Cyan", "LightCyan", "Aqua", "PowderBlue", "LightGrey", "DarkGreen", "Magenta", "HoneyDew", "Wheat"]

    setInterval(changeColor, 500, pallet, swatches) 

    
    
});
