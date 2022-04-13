import {k} from "./kaboom.js"

scene("win", ({ score }) => {

  onKeyPress("r", start)
  
let win = function(args) {
    add([
    text('yay'),
    origin('center'),
    pos(width()/2, height()/3),
    scale(5),
  ])
  
   add([
    text('score:' + args.score),
    origin('center'),
    pos(width()/2, height()/1.5),
   // scale(5),
  ])
    // enter text to go to next level, "press [blank] to get to next level"
  }
  
})