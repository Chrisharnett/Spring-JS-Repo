"use strict"

class Passenger {
    constructor (name, seat, meal){
        this.name = name;
        this.seat = seat;
        this.meal = meal;
    }
}

class Seat {
    constructor (number){
        this.number = number;
        this.passenger;}
    isEmpty() {
        if (this.passenger == null){
            return true;
        }
        else {
            return false;
        }
    }
    loadSeat(passenger) {
        this.passenger = passenger
    }
}

class Airplane {
    constructor (seats){
        this.seats = seats
    }
    loadPassenger(passenger) {
        let i = seats.find(seat => seat.number == passenger.seat)
        i.loadSeat(passenger)
    }
    *[Symbol.iterator]() {
        for (let seat of this.seats){
            yield seat;
        }
    }   
}