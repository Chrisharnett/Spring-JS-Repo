
const seats = []


$( () => {
    
    const htmlSeats = $(".seat")
    for (let target of htmlSeats) {
        let seat = new Seat(target.id)
        seats.push(seat)
    }
    let plane = new Airplane(seats)
    $('#board').on ("click", () => {
        let passName = $("#passName").val()
        let passSeat = $("#passSeat").val()
        let passMeal = $("#passMeal").val()

        for (let seat of plane.seats){
            if (seat.number == passSeat) {
                if (seat.isEmpty()){
                    const passenger = new Passenger(passName, passSeat, passMeal)
                    plane.loadPassenger(passenger);
                    let seatString = "#" + passenger.seat
                    // let withName = ($(seatString).val()) + ": " + passenger.name
                    $(seatString).append(" " + passenger.name) 
                }else {
                    alert("Seat is taken")
                }
            }
        }
        $("#passName").val("").focus()
        $("#passSeat").val("")
        $("#passMeal").val("")
    });
    $('#1A').hover (() => {
        for (let s of plane.seats) {
            if (s.passenger.seat == '1A')
                $('#1A').append(" " + "Meal:" + s.passenger.meal)
        }}, () => {
            for (let s of plane.seats) {
                if (s.passenger.seat == '1A')
                    $('#1A').text("1A" + s.passenger.name)
            }
        }); 
    $('#1B').hover (() => {
        for (let s of plane.seats) {
            if (s.passenger.seat == '1B')
                $('#1B').append(" " + "Meal:" + s.passenger.meal)
        }}, () => {
            for (let s of plane.seats) {
                if (s.passenger.seat == '1B')
                    $('#1B').text("1B" + s.passenger.name)
            }
        });  
    $('#2A').hover (() => {
        for (let s of plane.seats) {
            if (s.passenger.seat == '2A')
                $('#2A').append(" " + "Meal:" + s.passenger.meal)
        }}, () => {
            for (let s of plane.seats) {
                if (s.passenger.seat == '2A')
                    $('#2A').text("2A" + s.passenger.name)
            }
        });
    $('#2B').hover (() => {
        for (let s of plane.seats) {
            if (s.passenger.seat == '2B')
                $('#2B').append(" " + "Meal:" + s.passenger.meal)
        }}, () => {
            for (let s of plane.seats) {
                if (s.passenger.seat == '2B')
                    $('#2B').text("2B" + s.passenger.name)
            }
        }); 
    $('#3A').hover (() => {
        for (let s of plane.seats) {
            if (s.passenger.seat == '3A')
                $('#3A').append(" " + "Meal:" + s.passenger.meal)
        }}, () => {
            for (let s of plane.seats) {
                if (s.passenger.seat == '3A')
                    $('#3A').text("3A" + s.passenger.name)
            }
        });
    $('#3B').hover (() => {
        for (let s of plane.seats) {
            if (s.passenger.seat == '3B')
                $('#3B').append(" " + "Meal:" + s.passenger.meal)
        }}, () => {
            for (let s of plane.seats) {
                if (s.passenger.seat == '3B')
                    $('#3B').text("3B" + s.passenger.name)
            }
        }); 
    });