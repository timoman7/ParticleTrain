import Particle from './Particle.js';
import Train from './Train.js';
import Vector from './Vector.js';
import {Screen, context} from './View.js';

let width = context.canvas.width;
let height = context.canvas.height;

let CodingTrain = new Train();
window.CodingTrain = CodingTrain;
function constructTrain(){
  //X, Y, Width, Height, Type, Color, Parent
  CodingTrain.addPart(0, 0, 80, 30, "rect", "rgb(20, 60, 140)", CodingTrain);
  CodingTrain.addPart(-20, 0, 40, 30, "rect", "rgb(20, 60, 140)", CodingTrain);
  CodingTrain.addPart(-60, 0, 20, 30, "rect", "rgb(20, 60, 140)", CodingTrain);

  CodingTrain.sortByX();
}

function setup(){
  CodingTrain.pos.set(0, 0);
  CodingTrain.vel.set(2,0);
  constructTrain();
}

function update(){
  CodingTrain.update();
}

function draw(){
  context.fillStyle = "rgb(255,255,255)";
  context.fillRect(0, 0, width, height);
  update();
  CodingTrain.draw();
  requestAnimationFrame(draw);
}

setup();
update();
draw();
