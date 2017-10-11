import Vector from './Vector.js';
import Particle from './Particle.js';
import {Screen, context} from './View.js';
import {Colors} from './Colors.js';

let width = context.canvas.width;
let height = context.canvas.height;

export default class Train {
  constructor(){
    this.pos = new Vector(0,0);
    this.vel = new Vector(0,0);
    this.parts = [];
    this.smoke = [];
  }

  addPart(x, y, w, h, _type, _color, parent){
    this.parts.push(new Part(x, y, w, h, _type, _color, parent));
  }

  sortByX(){
    this.parts.sort((partA, partB) => {
    	if(partA.pos.x + partA.size.w < partB.pos.x + partB.size.w){
    		  return -1
      }else if(partA.pos.x + partA.size.w > partB.pos.x + partB.size.w){
  		    return 1
      }else{
  		    return 0
      }
    });
  }

  addSmoke(){
      let newSmokeX = 0, newSmokeY = 0, newSmokeR = 10, newSmokeColor = "rgb(0,0,0)";
      if(arguments.length !== 0){
        if(arguments[0].x !== undefined){
          newSmokeX = arguments[0].x, newSmokeY = arguments[0].y;
          newSmokeR = arguments[1];
          newSmokeColor = arguments[2];
        }else{
          newSmokeX = arguments[0], newSmokeY = arguments[1];
          newSmokeR = arguments[2];
          newSmokeColor = arguments[3];
        }
      }else{
        newSmokeX = 0, newSmokeY = 0;
      }
      let tempSmoke = new Particle(newSmokeX, newSmokeY, newSmokeR, newSmokeColor);
      tempSmoke.setLifetime(500);
      let rngX = (Math.random() - 0.5);
      let rngY = (Math.random() - 0.5);
      tempSmoke.vel.set(0 + rngX, -4 + rngY);
      tempSmoke.startVel.set(0 + rngX, -4 + rngY);
      tempSmoke.setColor(newSmokeColor);
      tempSmoke.update();
      this.smoke.push(tempSmoke);
  }

  update(){
    if(this.parts[0].pos.x > Screen.width){
      this.pos.x -= Screen.width + ((this.parts[this.parts.length-1].size.w + this.parts[this.parts.length-1].pos.x) - this.parts[0].pos.x);
    }
    this.pos.add(this.vel);
    for(let Piece in this.parts){
      this.parts[Piece].update();
    }
    for(let ParticleID = this.smoke.length - 1; ParticleID >= 0; ParticleID--){
      if(this.smoke[ParticleID].isDead()){
        this.smoke.splice(ParticleID, 1);
      }else{
        this.smoke[ParticleID].update();
      }
    }
  }

  draw(){
    for(let Piece in this.parts){
      this.parts[Piece].draw();
    }
    for(let ParticleID in this.smoke){
      this.smoke[ParticleID].draw();
    }
  }
}

class Part{
  constructor(x, y, w, h, _type, _color, parent){
    this.parent = parent;
    this.offset = new Vector(x, y);
    this.pos = new Vector(x + this.parent.pos.x, y + this.parent.pos.y);
    this.size = {w: w, h: h};
    this.type = _type;
    this.color = _color;
    return this
  }

  update(){
    this.pos.set(this.offset.x + this.parent.pos.x, this.offset.y + this.parent.pos.y);
  }

  draw(){
    context.fillStyle = this.color;
    switch(this.type){
      case "rect":
        context.fillRect(this.pos.x,this.pos.y,this.size.w,this.size.h);
        break;
    }
  }
}
