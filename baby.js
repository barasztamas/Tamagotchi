import { minute, numberInRange, doByChance, secondsSince } from "./utils.js";

export class Baby{
    constructor() {
        this._lastPoo = Date.now();
        this._lastFed = Date.now();
        this._bored = 0;
        this._happy = 100;
        this.changeDiaper();
    }
    //Baby's state
    pooRate() {
        return numberInRange((40 * minute) - secondsSince(this._lastPoo), minute);
    }
    peeRate() {
        return 5 * minute;
    }
    boreRate() {
        return 1.5 * minute;
    }
    hunger() {
        return numberInRange(Math.floor(secondsSince(this._lastFed) / (5*minute))-1, 0, 5);
    }
    problems() {
        return this._bored + 2*this.hunger() + 3*this._poo + (this._pee > 3 ? 1 + 2 * (this._pee - 3) : Math.floor(this._pee/2));
    }
    unhappyRate() {
        return numberInRange(minute * (1 - 0.08 * this.problems()), 1);
    }
    happyRate() {
        return this.problems() <= 1 ? minute/6 : minute * 0.5 * this.problems();
    }
    //Baby actions
    poo() {
        this._poo++;
        this._lastPoo = Date.now();
    }
    pee() {
        this._pee++;
    }
    bore() {
        this._bored = numberInRange(this._bored + 1, 0, 5);
    }
    addHappy(by) {
        this._happy = numberInRange(this._happy + by, 0, 100);
    }
    happyPlus() {
        this.addHappy(1);
    }
    happyMinus() {
        this.addHappy(-1);
    }
    //User actions
    pet(times=1) {
        for (let i = 0; i < times; i++) {
            if (this._bored) {
                this._bored--;
                this.addHappy(10);
            } else if (this.problems <= 1) {
                this.addHappy(10);
            } else {
                this.addHappy(5);
            }
        }
    }
    changeDiaper() {
        this.pet(this._poo + this._pee/2);
        this._poo = 0;
        this._pee = 0;
    }
    feed() {
        this.pet(this.hunger);
        this._bored = 0;
        this._lastFed = Date.now();
        this._lastPoo -= 10 * minute;
    }
    //Simulation step
    next(dt) {
        doByChance(this.pooRate()       , dt, this, this.poo);
        doByChance(this.peeRate()       , dt, this, this.pee);
        doByChance(this.boreRate()      , dt, this, this.bore);
        doByChance(this.happyRate()     , dt, this, this.happyPlus);
        doByChance(this.unhappyRate()   , dt, this, this.happyMinus);
    }
}