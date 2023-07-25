"use strict"

const daysOfMonth = $("td");
const yearPattern = /^[1-2]\d{3}$/;

const getAugust = (year) => {
    let month = [];
    for (let i=1; i<=31; i++ ) {
        let date = new Date(year, "07", i)
        month.push(date);
    }
    return month;

}

$ ( () => {
    $("#showCalendar").click( () => {
        const year = parseInt($("#year").val())
        if ( year == "" || !yearPattern.test(year) )
            alert("Enter a valid, 4-digit year.");
        else {
            let monthArray = getAugust(year);
            let firstDay = monthArray[0].getDay();
            for (let i=0; i<30; i++) {
                daysOfMonth[firstDay].textContent = monthArray[i].getDate();
                firstDay += 1;
            }
        $("table").css("display", "grid")
        }
        let message = "Generated on " + Date() + "by Chris Harnett."
        $("#message").text(message)
        
    });

});