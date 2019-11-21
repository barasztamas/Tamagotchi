import { minute, numberInRange, doByChance } from "./utils.js";

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
        return numberInRange((40 * minute) - (Date.now() - this._lastPoo), minute);
    }
    peeRate() {
        return 5 * minute;
    }
    boreRate() {
        return 1.5 * minute;
    }
    hunger() {
        return numberInRange(Math.floor((Date.now-this._lastFed) / (5*minute))-1, 0, 5);
    }
    problems() {
        return this._bored + Math.floor(this._pee/2) + 2*this.hunger + 3*this._poo;
    }
    unhappyRate() {
        return this.problems <= 1 ? minute : numberInRange (minute - 5*this.problems, 1)
    }
    happyRate() {
        return this.problems <= 1 ? 10 : 30 * this.problems;
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
        this._bored++;
    }
    addHappy(by) {
        this._happy = numberInRange(this._happy + by, 0, 100);
    }
    //User actions
    pet(times=1) {
        for (let i = 0; i < times; i++) {
            if (this._bored) {
                this._bored--;
                this.addHappy(10);
            } else {
                this.addHappy(5);
            }
        }
    }
    changeDiaper() {
        this._poo = 0;
        this._pee = 0;
        this.pet();
    }
    feed() {
        this.pet(this.hunger);
        this._bored = 0;
        this._lastFed = Date.now();
        this._lastPoo -= 10 * minute;
    }
    //Simulation step
    next(dt) {
        doByChance(this.pooRate     , dt, this, this.poo);
        doByChance(this.peeRate     , dt, this, this.pee);
        doByChance(this.boreRate    , dt, this, this.bore);
        doByChance(this.happyRate   , dt, this, this.addHappy.bind(this,1));
        doByChance(this.unhappyRate , dt, this, this.addHappy.bind(this, -1));
    }
}