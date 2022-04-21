import {k} from "./kaboom.js"

loadSprite("wood", "sprites/wood.png");
loadSprite("door", "sprites/door.png");
loadSprite("player", "sprites/player.png");
loadSprite("enemy1", "sprites/enemy1.png");
loadSprite("enemy2", "sprites/enemy2.png");
loadSprite("table", "sprites/table.png");
loadSprite("cat", "sprites/cat.png");
loadSprite("invis-wall", "sprites/invis-wall.png");



//loadSprite("spoopy", "sprites/spoopy.jpg");
// let img1 = loadImage(assets/wood.png);
// let img2 = loadImage(assets/door.png);
// let img3 = loadImage(assets/player.png);
// let img4 = loadImage(assets/enemy1.png);
// let img5 = loadImage(assets/flashlight.png);
// let img6 = loadImage(assets/table.png);
// let img7 = loadImage(assets/cat.png);
// let img8 = loadImage(assets/invis-wall.png);


let MOVE_SPEED = 220
let JUMP_FORCE = 550
let ENEMY_SPEED = 50

let BOSS_SPEED = 110
let possT = false
let possC = false
let levelIdx = 0
let scorevalue = 0

const LEVELS = [
  [
  '                                          ',
  '                                          ',
  '                                          ', 
  '                                          ',
  '                                          ',
  '                 ?  &  ?                  ',
  '                 !!!!!!!                  ',
  '              &                  &          ',
  '             !!               !!!!        ',
  '                                          ',

  '?    ~  ?    &     &        ^    ?        ?   ',
    
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
], 
[
  ' ~                                      ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '        ?    -  &           ?           ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
],
[
  '                                          ',
  '                                          ',
  '                                          ', 
  '                                          ',
  '        !!!                  !!!          ',
  '                ?   ^   ?                 ',
  '                !!!!!!!!!                 ',
  '                                          ',
  '        !!!                  !!!          ',
  '                                          ',
  '                                          ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
  '                                          ',
  '                                          ',
  '                                          ',
  '                                          ',
  ' -                                        ',
],
[
  '                                          ',
  '                                          ',
  '                               ?   & ?    ', 
  '                               !!!!!!!    ',
  '                      ? ^ ?               ',
  '                      !!!!!               ',
  '              ? ^ ?                       ',
  '              !!!!!                       ',
  '      ? ^ ?                  ~            ',
  '      !!!!!                 !!!           ',
  '                -                         ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
 ],
 [
  '                                          ',
  '       ?  &  ?      !!     ?  &  ?        ',
  '       !!!!!!!             !!!!!!!        ', 
  '                                          ',
  '                   !!!!                   ',
  '                             ~            ',
  '          !!!!             !!!!           ',
  '                                          ',
  '                   !!!!                   ',
  '          !!!!             !!!!           ',
  ' ?    -             ^                   ? ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
 ],
 [
  '      ?& ?        ?& ?        ?& ?        ',
  '      !!!!        !!!!        !!!!        ',
  '            ?& ?         ?& ?             ', 
  '            !!!!         !!!!             ',
  '      ?& ?        ?& ?        ?& ?        ',
  '      !!!!        !!!!        !!!!        ',
  '            ?& ?         ?  ?             ',
  '            !!!!         !!!!             ',
  '      ?  ?        ?  ?        ?  ?        ',
  '      !!!!        !!!!        !!!!        ',
  '            ~-                            ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
 ],
]

let go_table = () => {return [
  sprite('table'),
  'table',
  area()
]}

let go_cat = () => {return [
  sprite('cat'),
  'cat',
  area(),
]}
  
scene("game", ({ levelIdx }) => {

  layers(['spoopy', 'obj'], 'obj')
  add([ sprite("spoopy", {width: width(), height: height()})
  ]);
  
  const level = addLevel(LEVELS[levelIdx || 0], {

  width: 32,
  height: 32,
  //'#' : ()=>[sprite('door'), 'door', scale(0.7),],

  '!' : ()=>[sprite('wood'), 'wood', solid(), area()],
  '?' : ()=>[sprite('invis-wall'), 'invis-wall', area()],
 '&' : ()=>[sprite('enemy1'), 'enemy1', area(), body()],
 '^' : ()=>[sprite('enemy2'), 'enemy2', area(), body(), ],
  '-' : go_table,
  '~' : go_cat,
})

let door = add([

  sprite('door'),
  pos(1000, 296),
  width(32), 
  height(64),
  area(),
  scale(1.7)
  //body(),
])

add([
  text('use the left and right arrow keys to go left and right'),
  origin('center'),
  pos(0, height() / 7),
])

add([
  text('jump using space'),
  origin('center'),
  pos(0, height() / 6),
])

add([
  text('enter doors by pressing the up arrow key'),
  origin('center'),
  pos(0, height() / 5),
])

add([
  text('attack pink civilians for points!'),
  origin('center'),
  pos(0, height() / 4),
])

add([
  text('but dont let the yellow enemies hit you, or youll lose!'),
  origin('center'),
  pos(0, height() / 3),
])

add([
  text('you can avoid the yellow by haunting objects like tables by pressing "T" or cats by pressing "C"'),
  origin('center'),
  pos(0, height() / 2.5),
])

add([
  text('but when possessing cats, you cant scare civies, so you gotta unpossess the cat!'),
  origin('center'),
  pos(0, height() / 2),
])


let player = add([
	sprite("player"),
	pos(40, 40),
	area(),
  body(),
])

player.onUpdate(() => {
if(player.pos.y >= 1000) {
  go('lose', {
    score: score.value,
    levelIdx: 0,
  }
  )
}
})


// //next level 
// player.onCollide("door", () => {
 
//   })



 onKeyPress ("t", ()=> {
   let t = get('table')[0]
   if (player.isColliding(t)) {  
    possT =! possT;
    if(possT==true){
      console.log("true")
    MOVE_SPEED = 0,
    JUMP_FORCE = 0
 player.unuse(sprite('player'))
   player.use(sprite('table'))
     }
  if(possT==false){
    MOVE_SPEED = 200,
    JUMP_FORCE = 550
   player.use(sprite('player'))
    player.unuse(sprite('table'))
  }
  }
 })

//preparing for cat possession

onKeyPress ("c", ()=> {
  possC =! possC;
  let c = get('cat')[0]
  if (player.isColliding(c)) {
    if(possC==true){
    player.unuse(sprite('player'))
    player.use(sprite('cat'))
    }
  }
  if(possC==false){
    MOVE_SPEED = 200,
    JUMP_FORCE = 550
    player.use(sprite('player'))
    player.unuse(sprite('cat'))
    }
})

player.onUpdate(() => {
  camPos(player.pos)
})

let score = add([
  {
    value:scorevalue,
  },
])

onKeyPress("space", () => {
  // pos(50, 50),
  // text(score.value),
  console.log(score.value)
})


//player movement
onKeyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
  player.flipX(true);
})

onKeyDown('right', () => {
  player.move(MOVE_SPEED, 0)
  player.flipX(false);
})

onKeyPress('space', () => {
  if(player.isGrounded()) {
    player.jump(JUMP_FORCE)
  }
})

//player destroys enemy
player.onCollide('enemy1', (e)=> {
  if(possT==false && possC==false){
  destroy(e);
  shake(2);
  score.value++
  score.text = score.value
  }
  ENEMY_SPEED = ENEMY_SPEED * -1;
  let scoredisplay = add([
    pos(player.pos.x, player.pos.y),
    text(score.value),
  ])
});

onKeyPress ("up", ()=> {
  if (player.isColliding(door) && score.value == 5) {
     if (levelIdx < LEVELS.length - 1) {
  // If there's a next level, go() to the same scene but load the next level
  go("game", {
  levelIdx: levelIdx + 1,
      score: score.value,
})
  } else {
  // Otherwise we have reached the end of game, go to "win" scene!
  go("win", { score: score.value })
  }
}
})

//flashlight destroys player
player.onCollide('enemy2', ()=> {
  if(possT==true || possC==true){
    BOSS_SPEED = BOSS_SPEED * -1;
  }
  if(possT==false && possC==false){
  destroy(player);
  shake(2);
  go('lose', { score: score.value})
  }
});

onUpdate('enemy1', (s)=> {
  s.move(ENEMY_SPEED, 0)
  
})

onUpdate('enemy2', (s)=> {
  s.move(BOSS_SPEED, 0)
  
})

//enemy movement

onCollide('enemy1', 'invis-wall', (s,p)=> {
  if(ENEMY_SPEED == 50){
    s.flipX(false);
  } else{
   s.flipX(true);
  }
  ENEMY_SPEED = ENEMY_SPEED * -1
})

// if(ENEMY_SPEED == 50){
//   s.flipX(false);
// } else{
//  s.flipX(true);
// }

onCollide('enemy2', 'invis-wall', (s,p)=> {
  if(BOSS_SPEED == 50){
    s.flipX(false);
  } else{
   s.flipX(true);
  }
  BOSS_SPEED = BOSS_SPEED * -1
})

// if(BOSS_SPEED == 50){
//   s.flipX(false);
// } else{
//  s.flipX(true);
// }

onCollide('enemy1', 'enemy2', (s,p)=> {
  // if(ENEMY_SPEED == -50){
  //   s.flipX(false);
  // } else{
  //  s.flipX(true);
  // }
  // if(BOSS_SPEED == -50){
  //   p.flipX(false);
  // } else{
  //  p.flipX(true);
  // }
  ENEMY_SPEED = ENEMY_SPEED * -1,
  BOSS_SPEED = BOSS_SPEED * -1

})


})

function start() {
  // Start with the "game" scene, with initial parameters
  go("game", {
  levelIdx: 0,
  score: 0,
  })
}


start()
