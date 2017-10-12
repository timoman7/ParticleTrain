import Particle from './Particle.js';
import Train from './Train.js';
import Vector from './Vector.js';
import {Screen, context} from './View.js';
import {Colors} from './Colors.js';

let width = context.canvas.width;
let height = context.canvas.height;
/**
* Creating a new train
*/
let CodingTrain = new Train();
let Rainbow = [
  Colors.purple,
  Colors.pink,
  Colors.lightBlue,
  Colors.yellow,
  Colors.orange,
  Colors.red
];
window.CodingTrain = CodingTrain;
/**
* Mouse pressing
*/
let mouseState = {
  PRESSED: false,
  x: 0,
  y: 0
};
function mouseClick(event){
  mouseState = {
    PRESSED: (event.type === "mousedown" ? true : false),
    x: (event.x),
    y: (event.y)
  };
}
window.addEventListener('mousedown', mouseClick);
window.addEventListener('mouseup', mouseClick);

/**
* Add parts to the train
*/
function constructTrain(){
  //X, Y, Width, Height, Type, Color, Parent\

  //

  //Head car
  CodingTrain.addPart(70, 40, 100, 40, "rect", Colors.cart, CodingTrain); //Right
  CodingTrain.addPart(0, 0, 10, 80, "rect", Colors.cart, CodingTrain);  //Left
  CodingTrain.addPart(0, 50, 80, 30, "rect", Colors.cart, CodingTrain); //Bottom
  CodingTrain.addPart(70, 0, 10, 80, "rect", Colors.cart, CodingTrain); //Right
  CodingTrain.addPart(0, 0, 80, 10, "rect", Colors.cart, CodingTrain);  //Top
  let Wheel1 = CodingTrain.addPart(40, 100, 20, 20, "wheel", Colors.cart, CodingTrain);  //Wheel1
  let Wheel2 = CodingTrain.addPart(140, 100, 10, 10, "wheel", Colors.cart, CodingTrain);  //Wheel2
  window.connection1 = Wheel1.addConnector(Wheel2);
  //Connector
  CodingTrain.addPart(-40, 60, 60, 10, "rect", Colors.cart, CodingTrain);

  //Caboose
  CodingTrain.addPart(-200, 50, 170, 30, "rect", Colors.cart, CodingTrain);


  //Find whats in front
  CodingTrain.sortByX();
}
/**
*
*/
function puffSmoke(){
  for(let i = 0; i < Rainbow.length; i++){
    CodingTrain.addSmoke(
      CodingTrain.parts[CodingTrain.parts.length-1].pos.x + ((1 + i) * 10),
      CodingTrain.parts[CodingTrain.parts.length-1].pos.y,
      3,
      Rainbow[i]
    ); //Make the rainbow
  }
}

function randomSmoke(duration, modu, state){
  if(duration % modu){
    puffSmoke();
  }
  if(state){
    if(duration <= 0){
      setTimeout(randomSmoke.bind(null, duration - 1, modu, false), 10);
    }else{
      setTimeout(randomSmoke.bind(null, duration - 1, modu, true), 10);
    }
  }else{
    let puffTime = Math.floor(Math.random() * 50);
    let puffDelay = Math.floor(Math.random() * 1000) - puffTime;
    setTimeout(randomSmoke.bind(null, puffTime, modu, true), puffDelay);
  }
}

/**
* Drawing, updating, and setting up
*/

function setup(){
  CodingTrain.pos.set(0, 300);
  CodingTrain.vel.set(2,0);
  constructTrain();
  randomSmoke(40, 4, true);
  update();
  draw();
}

function update(){
  if(mouseState.PRESSED){
    puffSmoke();
  }
  CodingTrain.update();
}

function draw(){
  update();
  context.clearRect(0, 0, width, height);
  CodingTrain.draw();
  requestAnimationFrame(draw);
}

setup();
