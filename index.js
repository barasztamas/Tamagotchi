import { render } from "./render.js";
import { Baby } from "./baby.js";
import { secondsSince } from "./utils.js";


export const head = document.querySelector("#head");
const feed =document.querySelector("#feed");
const pet =document.querySelector("#pet");
const changeDiaper =document.querySelector("#changeDiaper");
const baby = new Baby();

const audioCry = new Audio("./snd/baby-crying-short.mp3")
audioCry.volume = 0.2;
audioCry.addEventListener("ended", function(){audioCry.currentTime=0;console.log("abc");})
const audioFail = new Audio("./snd/fail.m4a")



let lastRender = Date.now();

let start = Date.now();
let i=0;

feed.addEventListener("click", baby.feed.bind(baby));
pet.addEventListener("click", baby.pet.bind(baby,1));
changeDiaper.addEventListener("click", baby.changeDiaper.bind(baby));

next();


function next() {
    const dt = secondsSince(lastRender);
    lastRender = Date.now();
    const happyBefore = baby._happy;

    baby.next(dt);
    render(baby);
    
    if (i%500 === 0) {
        console.log(secondsSince(start), baby.problems(), baby.happyRate(), baby.unhappyRate(), baby._happy);
        i=0;
    }
    i++;

    if (baby._happy>20) {
        audioCry.pause();
    }
    if (baby._happy<=20) {
        audioCry.play();
    }
    
    if (baby._happy === 0) {
        audioCry.pause();
        audioFail.play();
    } else {
        requestAnimationFrame(next);
    }
}

