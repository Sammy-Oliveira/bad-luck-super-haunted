import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

// initialize kaboom context
export const k = kaboom({
    width: 1600,
    height: 800,
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 255, ],
    global: true,
});
