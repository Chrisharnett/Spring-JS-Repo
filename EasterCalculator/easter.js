"use strict"

const lunarMonth = 29.5;
let lastEaster = new Date();
const fullMoon = new Date("2023/05/05");
let nextEasterString = "";

const findNextEaster = (lastEaster) => {   
    let year = lastEaster.getFullYear() + 1;
    let springEquinox = new Date(year, 2, 20);
    let nextFullMoon = new Date(fullMoon);
    while (nextFullMoon <= springEquinox) {
        nextFullMoon.setTime(nextFullMoon.getTime() + (lunarMonth * 24 * 60 * 60 * 1000) ) 
    };
    let month = nextFullMoon.getMonth();
    let date = nextFullMoon.getDate() + (7 - nextFullMoon.getDay());
    let nextEaster = new Date(year, month, date);
    $(".nextDate").text(nextEaster.toDateString());
    return nextEaster;
};

const daysAway = (nextEaster) => {
    const now = new Date();
    let days = Math.abs(nextEaster.getTime() - now.getTime());
    days = Math.ceil(days/(24*60*60*1000));
    let daysAway = days + " days away.";
    $(".daysAway").text(daysAway);
};

$ ( () => {
    $("#calcNextEaster").click( () => {
        if (nextEasterString != "") {
            $("#lastEaster").val(nextEasterString);
        }
        const userInput = $("#lastEaster").val();
        if (isNaN(userInput.substring(0, 4)) == false &&
         isNaN(userInput.substring(5, 7)) == false && 
         isNaN(userInput.substring(8)) == false && (userInput.substring(8).length === 2)) {
            lastEaster.setFullYear(parseInt(userInput.substring(0, 4)));
            lastEaster.setMonth(parseInt(userInput.substring(5, 7)) - 1);
            lastEaster.setDate(parseInt(userInput.substring(8)));
        }
        else {
            alert("Invalid date format, please use YYYY-MM-DD")
            $("#lastEaster").val("").focus()
        }
        let nextEaster = findNextEaster(lastEaster)
        daysAway(nextEaster)
        let year = nextEaster.getFullYear();
        let month = (nextEaster.getMonth() + 1).toString().padStart(2, '0');
        let date = nextEaster.getDate().toString().padStart(2, '0');
        nextEasterString = year + "-" + month + "-" + date;
    });
})