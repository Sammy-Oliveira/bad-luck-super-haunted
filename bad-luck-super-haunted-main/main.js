import {k} from "./kaboom.js"

loadPedit("wood", "sprites/wood.pedit");
loadPedit("door", "sprites/door.pedit");
loadPedit("player", "sprites/player.pedit");
loadPedit("enemy1", "sprites/enemy1.pedit");
loadPedit("enemy2", "sprites/enemy2.pedit");
loadPedit("table", "sprites/table.pedit");
//loadPedit("cat", "sprites/cat.pedit");
loadSprite("cat", "sprites/cat.png");
loadPedit("invis-wall", "sprites/invis-wall.pedit");
// let img1 = loadImage(assets/wood.png);
// let img2 = loadImage(assets/door.png);
// let img3 = loadImage(assets/player.png);
// let img4 = loadImage(assets/enemy1.png);
// let img5 = loadImage(assets/flashlight.png);
// let img6 = loadImage(assets/table.png);
// let img7 = loadImage(assets/cat.png);
// let img8 = loadImage(assets/invis-wall.png);

let MOVE_SPEED = 200
let JUMP_FORCE = 550
let ENEMY_SPEED = 50
let BOSS_SPEED = 50
let poss = false

const LEVELS = [
  [
  '!                                        !',
  '!                                        !',
  '!                                        !', 
  '!                                        !',
  '!                                        !',
  '!                   ~                    !',
  '!                !!!!!!!                 !',
  '!                                        !',
  '!            !!               !!!!       !',
  '!                                        !',
  '!      ?                 ^    ?          !',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
], 
[
  '!                                      !',
  '!                                      !',
  '!                                      !',
  '!                                      !',
  '!                                      !',
  '!                                      !',
  '!                                      !',
  '!                                      !',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
],
]
  
scene("game", ({ levelIdx }) => {
  
  const level = addLevel(LEVELS[levelIdx || 0], {

  // '!                                        !',
  // '!                                        !',
  // '!                                        !', 
  // '!                                        !',
  // '!       !!!                  !!!         !',
  // '!               ?   ^   ?                !',
  // '!               !!!!!!!!!                !',
  // '!                                        !',
  // '!       !!!                  !!!         !',
  // '!                                        !',
  // '!                                        !',
  // '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',

  // '!                                        !',
  // '!                                        !',
  // '!                              ?   & ?   !', 
  // '!                              !!!!!!!   !',
  // '!                     ? ^ ?              !',
  // '!                     !!!!!              !',
  // '!             ? ^ ?                      !',
  // '!             !!!!!                      !',
  // '!     ? ^ ?                  ~           !',
  // '!     !!!!!                 !!!          !',
  // '!                                        !',
  // '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',

  // '!                                        !',
  // '!      ?  &  ?      !!     ?  &  ?       !',
  // '!      !!!!!!!             !!!!!!!       !', 
  // '!                                        !',
  // '!                  !!!!                  !',
  // '!                                        !',
  // '!         !!!!             !!!!          !',
  // '!                                        !',
  // '!                  !!!!                  !',
  // '!         !!!!             !!!!          !',
  // '!?                  ^                   ?!',
  // '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',

// work on the one bellow more, needs substance

  // '!     ?& ?        ?& ?        ?& ?       !',
  // '!     !!!!        !!!!        !!!!       !',
  // '!           ?& ?         ?& ?            !', 
  // '!           !!!!         !!!!            !',
  // '!     ?& ?        ?& ?        ?& ?       !',
  // '!     !!!!        !!!!        !!!!       !',
  // '!           ?& ?         ?  ?            !',
  // '!           !!!!         !!!!            !',
  // '!     ?  ?        ?  ?        ?  ?       !',
  // '!     !!!!        !!!!        !!!!       !',
  // '!                                        !',
  // '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
//], {
  width: 32,
  height: 32,
  //'#' : ()=>[sprite('door'), 'door', scale(0.7),],
  '!' : ()=>[sprite('wood'), 'wood', solid(), scale(0.5), area()],
  '?' : ()=>[sprite('invis-wall'), 'invis-wall', scale(0.5), area()],
 '&' : ()=>[sprite('enemy1'), 'enemy1', area(), body(), scale(0.7),],
 '^' : ()=>[sprite('enemy2'), 'enemy2', area(), body(), scale(0.7),],
  '-' : ()=>[sprite('table'), 'table', area(), scale(0.5),],
  '~' : ()=>[sprite('cat'), 'cat', area(), body(), scale(1.2),],
})


let door = add([

  sprite('door'),
  pos(1000, 296),
  width(32), 
  height(64),
  area(),
  //body(),
])

let table = add([
  sprite('table'),
  pos(450, 320),
  width(32), 
  height(64),
  area(),
  scale(0.5),
  layer('obj')
  //body(),
])

let player = add([
	sprite("player"),
	pos(40, 40),
  scale(0.7),
	area(),
  body(),
  layer('obj'),
])

//next level 

onKeyPress ("up", ()=> {
  if (player.isColliding(door)) {
     if (levelIdx < LEVELS.length - 1) {
  // If there's a next level, go() to the same scene but load the next level
  go("game", {
  levelIdx: levelIdx + 1,
      score: score,
})
  } else {
  // Otherwise we have reached the end of game, go to "win" scene!
  go("win", { score: score, })
  }
})

// //next level 
// player.onCollide("door", () => {
 
//   })



onKeyPress ("down", ()=> {
  if (player.isColliding(table)) {
    poss =! poss;
    if(poss==true){
    console.log("true"),
    MOVE_SPEED = 0,
    JUMP_FORCE = 0
    player.unuse(sprite('player'))
    player.use(sprite('table'))
    }
    if(poss==false){
      console.log("false"),
      MOVE_SPEED = 200,
      JUMP_FORCE = 550
      player.use(sprite('player'))
      player.unuse(sprite('table'))
      }
  }
})


player.onUpdate(() => {
  camPos(player.pos)
})

const score = add([
  text('0'),
  pos(50,50),
  {
    value:0,
  }
])

//player movement
keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
  player.flipX(true);
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
  player.flipX(false);
})

keyPress('space', () => {
  if(player.isGrounded()) {
    player.jump(JUMP_FORCE)
  }
})

//player destroys enemy
player.onCollide('enemy1', (e)=> {
  if(poss==false){
  destroy(e);
  shake(2);
  score.value++
  score.text = score.value
  }
});


//flashlight destroys player
player.onCollide('enemy2', ()=> {
  if(poss==true){
    BOSS_SPEED = BOSS_SPEED * -1;
  }
  if(poss==false){
  destroy(player);
  shake(2);
  go('lose', { score: score.value})
  }
});

action('enemy1', (s)=> {
  s.move(ENEMY_SPEED, 0)
  
})

action('enemy2', (s)=> {
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
