"use strict"

// variables
const moles = $(".mole");

//Closure to keep score
const scoreCounter = () => {
    let score = 0;
    return {
        hit() {
            score ++;
            return score;
        },
    }
};

//Closure to track each mole hit

const colorChange = () =>{
    let max = 2;
    let min = 0;
    setTimeout(showMole, (Math.random() * (max - min + 1) + min)*1000);
};

// function to make a random mole appear
const showMole = () =>{
    let min = 0;
    let max = 8;
    let rMole= Math.floor(Math.random() * (max - min + 1) + min);
    $(moles[rMole]).css('background', 'red').attr("id", "on");
    setTimeout(()=>{$(moles[rMole]).css('background', 'greenyellow').attr("id", "off"); }, 
    (Math.random() * (3 - 1 + 1) + 1 * 1000) )
}

$( () => {
    let currentScore = scoreCounter();
    let i = setInterval(colorChange, 1000);
    for (let mole of moles) {
        $(mole).on("click", () => {
            let color = $(mole).attr('id')
            if (color == 'on'){
                $(".score").text(currentScore.hit());
                $(mole).css('background', 'grey').attr("id", "off");
                setTimeout(()=>{$(mole).css('background', 'greenyellow')}, 2000);
                if ($(".score").text() == 5) {
                    clearInterval(i);
                    $(".score").append(" YOU WIN!!");
                    $(moles).css('background', 'gold');
            };
            };
        });
    };
    
    

    // Random squares change to red at random intervals. Remain red ~2-3 seconds.

    
});