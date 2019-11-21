

let lastRender = Date.now();


function next() {
    const dt = (Date.now() - lastRender) / 1000;
    lastRender = Date.now();

    requestAnimationFrame(next);
}

next();
