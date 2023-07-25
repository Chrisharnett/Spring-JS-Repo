"use strict"

class Die {
    constructor(
        sides //sides = 6 default constructor;
    ) {
        this.sides = parseInt(sides)
        this.value = 0  //this.value = this.roll();
        this.image = diceImages[this.value]
    };
    roll() {
        this.value = (Math.floor(Math.random() * this.sides)+1);
        this.image = diceImages[this.value];
        return this.value;
    };
    getValue() {
        return this.value
    };
    getImage() {
        return this.image
    };
};

// Initalize an array of dice
let dice = [];
// Initialize an array of dice face images
const diceImages = [];
// Store the dice targets in an array.
const diceElement = [$("#dice1"), $("#dice2"), $("#dice3"), $("#dice4"), $("#dice5")];

let total = 0;

const rollDice = () =>{
    for (let die of dice) {
        die.roll();
        total += die.getValue();
    };
    //call diceImage with the starting index of 0
    diceImage(0)
};

const diceImage = (i) => {
    setTimeout(function() {
        diceElement[i].attr("src", dice[i].getImage().src);
        diceElement[i].attr("alt", dice[i].getImage().alt);
        i++;
        if (i < dice.length) {
            diceImage(i);
        };
    }, 100);
};

const totals = () => {
    $("#total").text(total).css("display", "contents");
    // Check for yahtzee.
    if (dice.every( die => die.getValue() === dice[0].getValue())) {
        $("#yahtzee").text("Yahtzee!");
    };
    $("#rollDice").text("Roll Dice").focus();
};


$( () => {
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
    // Initialize array of "dice"
    for (let i = 0; i< 5; i++)
        dice[i] = new Die(6);

    $("#rollDice").click( () => {
        $("#yahtzee").empty();
        $("#rollDice").text("Rolling").blur();
        $("#total").css("display", "none");
        total = 0;
        // clear previous dice images
        for (let die of diceElement) {
            die.attr("src", diceImages[0].src);
            die.attr("alt", diceImages[0].alt);
        };
        rollDice();
        setTimeout(totals, 1000);
    });
});