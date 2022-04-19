import { k } from "./kaboom.js"

scene("lose", (args) => {

  // Press any key to go back
  onKeyPress("r", start)
  

  add([
    text('goodbye'),
    origin('center'),
    pos(width() / 2, height() / 3),
    scale(2),
  ])

  add([
    text('Press "R" to restart level'),
    origin('center'),
    pos(width() / 2, height() / 2),
    scale(1.5)
  ])

  add([
    text('score:' + args.score),
    origin('center'),
    pos(width() / 2, height() / 1.5),
    // scale(5),
  ])
})

function start() {
  // Start with the "game" scene, with initial parameters
  go("game", {
  levelIdx: 0,
  score: 0,
  })
}
