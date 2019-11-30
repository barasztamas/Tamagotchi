import { Baby } from "./baby.js";
import { head } from "./index.js";

const happy = document.querySelector("#happy");
const bored = document.querySelector("#bored");
const hungry = document.querySelector("#hungry");
const pee = document.querySelector("#pee");
const poo = document.querySelector("#poo");


/**
 * @param  {Baby} baby
 */
export function render(baby) {
    happy.innerHTML = baby._happy;
    bored.innerHTML = baby._bored;
    hungry.innerHTML = baby.hunger();
    pee.innerHTML = baby._pee;
    poo.innerHTML = baby._poo;
}