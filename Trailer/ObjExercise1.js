// car/boat/trailer example.
// 1. Create boat and trailer objects. (make, model, weight, capacity, width, length, ...)
// 2. Create a "load" accessor for the trailer that will load an item (an object that has a weight) onto the trailer only if
//   a. the trailer is unoccupied, and
//   b. the item is not too heavy.
// 3. Create a hitch object that has properties for the class of the hitch, the towing capacity in kgs, and the object that's connected to the hitch (if any)
// 4. Create a car object - our towing vehicle. (make, model, weight, capacity, width, length, ...) 
//   a. Add a property to refer to a hitch object.
//   b. add a method to add a hitch to the car.
//   c. add a method to remove a hitch from the car.
//   d. Create an accessor isHitchable (true if there is a hitch installed, false otherwise)
// 5. Add a hitch to the car
// 6. Add a trailer to the hitch only if 
//   a. the trailer is not empty, and
//   b. the trailer and item on the trailer is not too heavy for the hitch, and
//   c. the trailer and item on the trailer is not too heavy for the car to tow.

const myBoat = {
    make: "Bertram",
    model: "28XC",
    weight: 4626,
    width: 3.0,
    length: 9.14
};

const myBuddysBoat = {
    make: "Homemade",
    model: "skiff",
    weight: 300,
    width: 2.0,
    length: 3.0
};

const myTrailer = {
    make:"EZ Loader",
    model:"TIAB",
    capacity:4700,
    item:0,
    weight:1015,
    width:2.5,
    length:11,

    set load (item) {
        if (this.item)
            alert (`Attempting to load ${item.model} on ${this.make}. Trailer already occupied with ${this.load.make} ${this.load.model} - aborted.`);
        else
            if (item.weight > this.capacity)
                alert (`Attempting to load ${item.model} on ${this.make}. Load too heavy - aborted.`);
            else
                this.item = item;
    },

    get load () { return this.item;}
};

const myHitch = {
    class: 2,
    capacity: 1587, //kgs, 3500lbs
    connects:0 // the object that's hitched
};

const myCar = {
    make:"Honda",
    model:"Civic",
    hitch: 0,

    addHitch (hitch) {
        this.hitch = hitch;
    },

    rmHitch () {
        this.hitch = 0;
    },

    get isHitchable () { return (this.hitch!=0); },

    hitchOn (trailer) {
        if (!this.hitch) {
            alert ("There is no hitch on the car");
        }
        else{
            if (this.hitch.connects) {
                alert ("trailer already hitched");
            }
            else{
                if (this.hitch.capacity < trailer.weight + trailer.item.weight) {
                    alert ("hitch is not rated for the tow weight!");
                }
                else {
                    if (this.capacity < trailer.weight + trailer.item.weight) {
                        alert ("car cannot tow that much weight!");
                    }
                    else{
                        this.hitch.connects = trailer;
                    }
                }

            }
        }
    }
};

$( () => {
    
    $('#ex1').on ("click",
        () => {
            myTrailer.load = myBoat;
            if (myTrailer.load != 0){
                console.log (`Loaded ${myTrailer.load.make} ${myTrailer.load.model} onto ${myTrailer.make} ${myTrailer.model}`);
            }
            else{
                myTrailer.load = myBuddysBoat;
                if (myTrailer.load != 0){
                    console.log (`Loaded ${myTrailer.load.make} ${myTrailer.load.model} onto ${myTrailer.make} ${myTrailer.model}`);
                }
            }

            if (!myCar.isHitchable){
                console.log ("Car is not hitchable!");
                myCar.addHitch(myHitch);
                if (!myCar.isHitchable){
                    console.log ("Car is still not hitchable!");
                }
                else {
                    console.log ("Car is now hitchable!");
                    myCar.hitchOn(myTrailer);
                    if (myCar.hitch)
                    {
                        console.log ("Let's go fishing!");
                    }
                    else{
                        console.log ("Not fishing today :(");
                    }
                }
            }
        }
    );

    $('#ex2').on ("click",
        () => {
        }
    );

    $('#ex3').on ("click",
        () => {
        }
    );

});