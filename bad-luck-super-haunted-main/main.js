import {k} from "./kaboom.js"

//remember to add k to the beginning of practically everything

import {win} from "./win.js"
scene('win', win);
import {lose} from "./lose.js"
scene('lose', lose);

loadPedit("wood", "sprites/wood.pedit");
loadPedit("door", "sprites/door.pedit");
loadPedit("player", "sprites/player.pedit");
loadPedit("enemy1", "sprites/enemy1.pedit");
loadPedit("flashlight", "sprites/flashlight.pedit");
loadPedit("table", "sprites/table.pedit");
loadPedit("cat", "sprites/cat.pedit");
loadPedit("invis-wall", "sprites/invis-wall.pedit");
// let img1 = loadImage(assets/wood.png);
// let img2 = loadImage(assets/door.png);
// let img3 = loadImage(assets/player.png);
// let img4 = loadImage(assets/enemy1.png);
// let img5 = loadImage(assets/flashlight.png);
// let img6 = loadImage(assets/table.png);
// let img7 = loadImage(assets/cat.png);
// let img8 = loadImage(assets/invis-wall.png);

const MOVE_SPEED = 200
const JUMP_FORCE = 550
let ENEMY_SPEED = 50

addLevel([
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
  '!      ?   &   ? -   ^        ?          !',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
], {
  width: 32,
  height: 32,
  //'#' : ()=>[sprite('door'), 'door', scale(0.7),],
  '!' : ()=>[sprite('wood'), 'wood', solid(), scale(0.5), area()],
  '?' : ()=>[sprite('invis-wall'), 'invis-wall', scale(0.5), area()],
 '&' : ()=>[sprite('enemy1'), 'enemy1', area(), body(),scale(0.7),],
 '^' : ()=>[sprite('flashlight'), 'flashlight', area(), scale(0.7),],
  '-' : ()=>[sprite('table'), 'table', area(), scale(0.5),],
  '~' : ()=>[sprite('cat'), 'cat', area(), body(), scale(0.5),],
})

const door = add([
  sprite('door'),
  pos(1200, 288),
  width(32), 
  height(64),
  area(),
  //body(),
])

const player = add([
	sprite("player"),
	pos(40, 40),
  scale(0.7),
	area(),
  body()
])

const score = add([
  text('0'),
  pos(50,50),
  {
    value:0,
  }
])

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
  player.flipX(true);
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
  player.flipX(false);
})

//onCollide('player', 'wood', () => {  
//})


keyPress('space', () => {
  if(player.isGrounded()) {
    player.jump(JUMP_FORCE)
  }
})

//player destroys enemy
player.onCollide('enemy1', (e)=> {
  destroy(e);
  shake(2);
  score.value++
  score.text = score.value
});


//flashlight destroys player
player.onCollide('flashlight', ()=> {
  destroy(player);
  shake(2);
  go('lose', { score: score.value})
});

//let CURRENT_ENEMY = ENEMY_SPEED

action('enemy1', (s)=> {
  s.move(ENEMY_SPEED, 0)
  
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

//next level 

player.onCollide('door', ()=> {
  keyPress('up', ()=> {
      go('win', { score: score.value})
  })
})

//action('flashlight', (s)=> {
// s.move(ENEMY_SPEED, 0)
//})

//onCollide('flashlight', 'invis-wall', ()=> {
//ENEMY_SPEED = ENEMY_SPEED * -1
  // })
