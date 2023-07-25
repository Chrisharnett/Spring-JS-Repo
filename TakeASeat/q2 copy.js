


$( () => {

class Passenger {
    constructor (name, location, meal)
    {
        this.name = name
        this.location = location
        this.location.html(this.location.html() + "<br>" + this.name);
        this.meal = meal;

        $("#"+location).attr('title', this.name + " would like " + this.meal + "for dinner.");
    }
    
}
let passengers = [];

function isOccupied (location) {
    for (p of passengers)
        if (p.location.html() == $("#"+location).html())
            return true;
    return false;
}
    
    $('#board').on ("click", () => {
        if (!isOccupied($("#passSeat").val()))
            passengers.push(new Passenger ($("#passSeat").val(), $("#passSeat").val(), $("#passMeal").val()));
        else {
            alert("The seat is already taken")
        }

        }); 
    });