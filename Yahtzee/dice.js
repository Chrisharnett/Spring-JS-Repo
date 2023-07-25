"use strict"

// Initalize an array of dice
let diceArray = [];
// Initialize an array of dice face images
const diceImages = [];
// Initialize an array of the current dice images.
const currentDiceImg = [];
// Store the dice targets in an array.
const diceElement = [$("#dice1"), $("#dice2"), $("#dice3"), $("#dice4"), $("#dice5")]

const rollDice = () =>{
    for (let die in diceArray) {
        diceArray[die] = (Math.floor(Math.random() * 6)+1);
        currentDiceImg[die] = diceImages[diceArray[die]];
    };
    //call diceImage with the starting index of 0
    diceImage(0)
};

const diceImage = (i) => {
    setTimeout(function() {
        diceElement[i].attr("src", currentDiceImg[i].src);
        diceElement[i].attr("alt", currentDiceImg[i].alt);
        i++;
        if (i < diceArray.length) {
            diceImage(i);
        }
    }, 100)
};

const totals = () => {
    // Add up the dice.
    let total = 0;
    for (let die of diceArray)
        total += die;
    $("#total").text(total);
    $("#total").css("display", "contents")
    // Check for yahtzee.
    if (diceArray.every( value => value == diceArray[0] )) {
        $("#yahtzee").text("Yahtzee!");
    };
};

const readyToGo = () => {
    $("#rollDice").text("Roll Dice")
    $("#rollDice").focus()
    
}

$(document).ready( () => {
    $("#rollDice").focus();
    
    // Get the image links from the DOM
    const links = $("#diceImages").find("li > a");

    // Preload images and alt text
    for (let link of links) {
        let image = new Image();
        image.src = link.href;
        image.alt = link.title;
        diceImages[diceImages.length] = image;
    };

    $("#rollDice").click( () => {
        // Clear yahtzee
        $("#yahtzee").empty();
        $("#rollDice").blur()
        $("#rollDice").text("Rolling")
        $("#total").css("display", "none")
        for (let die of diceElement) {
            die.attr("src", diceImages[0].src)
            die.attr("alt", diceImages[0].alt)
        };

        diceArray = [0,0,0,0,0];
        rollDice();
        setTimeout(totals, 1000);
        setTimeout(readyToGo, 1000)
    })
});