import { render } from "./render.js";
import { Baby } from "./baby.js";
import { secondsSince } from "./utils.js";


export const head = document.querySelector("#head");
const baby = new Baby();

let lastRender = Date.now();

// let start = Date.now();
// let i=0;

next();


function next() {
    const dt = secondsSince(lastRender);
    lastRender = Date.now();

    baby.next(dt);
    render(baby);
    
    // if (i%500 === 0) {
    //     console.log(secondsSince(start), baby.problems(), baby.happyRate(), baby.unhappyRate(), baby._happy);
    //     i=0;
    // }
    // i++;

    requestAnimationFrame(next);
}

