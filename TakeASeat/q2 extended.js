
const createAircraft = (name, rows, col) => {
    let deck = [];      

    for (let y=0; y<rows; ++y)
    {
        let rank = [];
        for (let x=0; x<col; ++x) {
            rank.push(null); /* push an empty object */
        }
        deck.push(rank);
    }
    
    return {
        isSeatOccupied (row, col=0) {
            let r = 0;
            let c = 0;

            if (typeof (row) === 'string') /* ie: "1A" */
            {
                r = row.charCodeAt(0) - "0".charCodeAt(0);
                c = row.charCodeAt(1) - "A".charCodeAt(0) + 1;
            }
            else{ /* ie: 1, "A" */
                r = row;
                if (typeof (col) === 'string')
                    c = col.charCodeAt(0) - "A".charCodeAt(0) + 1;
                else
                    c = col;
            }

            if (deck[r-1][c-1] == null){
                return false;
            }
            return true;
        },
        setSeatOccupant(occupant, row, col=0) {
            let r = 0;
            let c = 0;

            if (typeof (row) === 'string') /* ie: "1A" */
            {
                r = row.charCodeAt(0) - "0".charCodeAt(0);
                c = row.charCodeAt(1) - "A".charCodeAt(0) + 1;
            }
            else{ /* ie: 1, "A" */
                r = row;
                if (typeof (col) === 'string')
                    c = col.charCodeAt(0) - "A".charCodeAt(0) + 1;
                else
                    c = col;
            }
            
            deck[r-1][c-1] = occupant;
        },
        getName() {
            return name;
        }
    }
}
    
    
const createPassenger = (name, meal) => {    
    return {
        getName(){
            return name;
        },
        getMeal(){
            return meal;
        }
    }
    } 
$( () => {
    let aircraft = createAircraft("experimental", 9, 4);
    console.log(aircraft.getName())
    aircraft.name = 'concord'
    console.log(aircraft.getName())
    $('#board').on ("click", () => {

        if (!aircraft.isSeatOccupied ($("#passSeat").val())) {
            
            aircraft.setSeatOccupant (createPassenger($("#passName").val(), $("#passMeal").val()), $("#passSeat").val());

            /* update the web page */
            $("#"+$("#passSeat").val()).html ($("#"+$("#passSeat").val()).html()+"<br>"+$("#passName").val()); /* on a new line, put the name */
            $("#"+$("#passSeat").val()).attr ('title', $("#passName").val() + " would like " + $("#passMeal").val() + " for dinner."); /* this implements the hover tip */
        }
        else
            alert ("Seat is taken, Passenger cannot board!");

    });

});