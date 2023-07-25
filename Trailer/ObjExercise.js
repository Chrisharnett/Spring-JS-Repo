const trailer = {
    model:"TIAB",
    make:"EZLoader",
    capacity:4700,
    item:0,
    weight:1015,
    width:2.5,
    length:11,

    get load() {return this.item;},

    set load (item) {
        if (this.item)
            alert(`Attempting to load ${item.make} ${item.model} on ${this.make} ${this.make} ${this.model}. Trailer already occupied with ${this.load.make}`)
        else
            if (item.weight > this.capacity)
                alert (`Attempting to load ${item.make} ${item.model} on ${this.make} ${this.model}. Load too heavy - aborted.`);
            else
                this.item = item;
    }
}
const myBuddysBoat = {
    make:"homemade",
    model:"skiff",
    weight:300,
    width:2.0,
    length:3.0,
};

const boat = {
    make: "Bertram",
    model: "28XC",
    weight: 1143,
    width: 3.0,
    length: 9.14
};

const hitch = {
    towingCapacity: 2268,
    tongueWeight: 227,
    class: 3,
    connect: 0,
};
const car = {
    make: "Subaru",
    model: "Ascent",
    weight: 4603,
    towCapacity: 2000,
    width:76,
    length:199,
    hitch:0,

    addHitch (hitch) {
        this.hitch = hitch
    },
    removeHitch() {
        this.hitch = 0;
    },
    get isHitchable(){
        return (0 != this.hitch)
    },
    hitchOn (trailer) {
        if (!this.hitch){
            alert(`The car already has a hitch.`)
        } else {
            if (this.hitch.connects) {
                alert("Trailer already hitched.")
            }
            else {
                if (this.hitch.capacity < trailer.weight + trailer.item.weight) {
                    alert("Hitch not rated for tow rate!")
                }
                else {
                    if (this.capacity < trailer.weight + trailer.item.weight) {
                        alert("Car cannot tow this much weight.")
                    } else{
                        this.hitch.connect = trailer
                    }
                }
            }

        }
    }
};

$( () => {
    
    $('#ex1').on ("click",
        () => {
            trailer.load = boat;
            if (trailer.load != 0) {
                console.log(`${trailer.item.make} ${trailer.item.model} loaded on ${trailer.make} ${trailer.model}`)
            }
            else {
                trailer.load = myBuddysBoat;
                if(trailer.load != 0) {
                    console.log(`Loaded ${trailer.load.make} ${trailer.load.model} onto ${trailer.make} ${trailer.model}`)
                }
            }
            if (!car.isHitchable) {
                console.log ("Car is not hitchable");
                car.addHitch(trailer);
                if(!car.isHitchable){
                    console.log ("Car is still not hitchable");
                }
                else {
                    console.log("Car is now hitchable.")
                    car.hitchOn(trailer);
                    if (car.hitch)
                    {
                        console.log("Let's go fishing!")
                    }
                    else{
                        console.log("Not fishing today :(")
                    }
                }
            }
        }
    );

    $('#ex2').on ("click",
        () => {
            class Vehicle{
                constructor (engine) {
                    this.engine = engine;
                }

                toString () {
                    return `This vehicle has a ${this.engine} engine`;
                }
            }
            class RoadVehicle extends Vehicle{
                constructor(engine = "2.4l V4", typeOfTires = "rubber") {
                    super(engine);
                    this.tireType = typeOfTires;
                    this.doors = true;
                }

                toString() {
                    return`${super.toString()} and ${this.tireType}.`
                }
            }
            class Sedan extends RoadVehicle{
                constructor () {
                    super();
                    this.doors = 4;
                }
                toString() {
                    return `${super.toString()} and ${this.doors} doors.`
                }
            }
            console.log (new Vehicle("Straight 6").toString())
            console.log(new RoadVehicle("V8", "Tracks").toString());
            const v = new Sedan()
            console.log(v.toString());
            console.log(v instanceof(Vehicle))
        }
    );

    $('#ex3').on ("click",
        () => {

            class Car {
                constructor (make, model, year)
                {
                    this.make = make;
                    this.model = model;
                    this.year = year;
                }
            } 
            const carLot = {
                cars: [new Car("Honda", "Civic", 2020), new Car("Subaru", "Outback", 2022), new Car("Toyota", "Corolla", 2023)],
                // using a generator to create an iterator
                *[Symbol.iterator] () {
                    for (let car of this.cars) {
                        yield car;
                    }
                }
                // Creating an iterator
                // [Symbol.iterator]() {
                //     return {
                //         cars: this.cars,
                //         index: 0,
                //         next() {
                //             if(this.index == this.cars.length){
                //                 return {done : true};
                //             } else {
                //                 let value = this.cars[this.index]
                //                 this.index ++;
                //                 return {value, done: false};
                //             }
                //         }
                //     };
                // }
            };
            for (const car of carLot) {
                console.log(car.make + " " + car.model + " " + car.year);
            }

        }
    );

});