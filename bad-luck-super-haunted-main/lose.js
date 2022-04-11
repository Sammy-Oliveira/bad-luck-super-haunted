import {k} from "./kaboom.js"

let lose = function(args) {
    add([
    text('goodbye'),
    origin('center'),
    pos(width()/2, height()/3),
   scale(2),
  ])
  
  add([
    text('Press "R" to restart level'),
    origin('center'),
    pos(width()/2, height()/2),
    scale(1.5)
])

   add([
    text('score:' + args.score),
    origin('center'),
    pos(width()/2, height()/1.5),
   // scale(5),
  ])
    //enter text + link, "press [blank] to try again"
  }

  export {lose}