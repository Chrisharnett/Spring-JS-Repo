"use strict"

const Pallet = {
    colors: [],
 
    get colors() {
        return this._colors;
    },
    set colors(colors){
        this._colors = colors;
    },
     
    *[Symbol.iterator]() {
        for (let color of this.colors){
            yield color;
        }
    } 

};