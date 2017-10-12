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
    let newPart = new Part(x, y, w, h, _type, _color, parent);
    this.parts.push(newPart);
    return newPart
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
      tempSmoke.setLifetime(300);
      let rngX = (Math.random() - 0.5);
      let rngY = (Math.random() - 0.5);
      tempSmoke.vel.set(0 + rngX, -3 + rngY);
      tempSmoke.startVel.set(0 + rngX, -3 + rngY);
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
    this.rot = 0;
    this.connections = [];
    return this
  }

  addConnector(target){
    let newConnection = new Connector(this, target);
    this.connections.push(newConnection);
    return newConnection
  }

  update(){
    switch(this.type){
      case "wheel":
        this.pos.set(this.offset.x + this.parent.pos.x, this.offset.y + this.parent.pos.y);
        if(this.rot > 2 * Math.PI){
          this.rot = 0;
        }else{
          this.rot += Math.PI / 180;
        }
        for(let _Connection in this.connections){
          let curConnection = this.connections[_Connection];
          let rotX = Math.cos(this.rot) * (this.size.w / 2);
          let rotY = Math.sin(this.rot) * (this.size.h / 2);
          curConnection.setPOffset(rotX, rotY);
          let tPart = curConnection.target;
          let tRotX = Math.cos(this.rot) * (tPart.size.w / 2);
          let tRotY = Math.sin(this.rot) * (tPart.size.h / 2);
          curConnection.setTOffset(tRotX, tRotY);
          this.connections[_Connection].update();
        }
        break;
      default:
        this.pos.set(this.offset.x + this.parent.pos.x, this.offset.y + this.parent.pos.y);
        for(let _Connection in this.connections){
          this.connections[_Connection].update();
        }
        break;
    }
  }
  /**
  * Add wheel type that functions as its own class
  */
  draw(){
    context.fillStyle = this.color;
    context.strokeStyle="rgb(100,100,100)";
    context.stroke();
    switch(this.type){
      case "rect":
        context.fillRect(this.pos.x,this.pos.y,this.size.w,this.size.h);
        break;
      case "ellipse":
        context.beginPath(); // x, y, w, h, rotation in rad, start angle, end angle (0, 2Math.PI = full circle)
        context.ellipse(this.pos.x, this.pos.y, this.size.w, this.size.h, 0, 0, 2 * Math.PI);
        //Vanilla ellipses are genuinly the most confusing thing :/
        context.fill();
        context.closePath();
        break;
      case "wheel":
        context.beginPath(); // x, y, w, h, rotation in rad, start angle, end angle (0, 2Math.PI = full circle)
        context.ellipse(this.pos.x, this.pos.y, this.size.w, this.size.h, this.rot, 0, 2 * Math.PI);
        //Vanilla ellipses are genuinly the most confusing thing :/
        context.fill();
        context.closePath();
        break;
    }
    for(let _Connection in this.connections){
      this.connections[_Connection].draw();
    }
  }
}
class Connector{
  constructor(parent, target){
    this.parent = parent;
    this.target = target;
    this.parentOffset = new Vector(0, 0);
    this.targetOffset = new Vector(0, 0);
    this.startPos = new Vector(this.parent.pos.x + this.parentOffset.x, this.parent.pos.y + this.parentOffset.y);
    this.endPos = new Vector(this.target.pos.x + this.targetOffset.x, this.target.pos.y + this.targetOffset.y);
    return this;
  }

  setPOffset(x, y){
    this.parentOffset.set(x, y);
  }

  setTOffset(x, y){
    this.targetOffset.set(x, y);
  }

  update(){
    this.startPos.set(this.parent.pos.x + this.parentOffset.x, this.parent.pos.y + this.parentOffset.y);
    this.endPos.set(this.target.pos.x + this.targetOffset.x, this.target.pos.y + this.targetOffset.y);
  }

  draw(){
    context.stroke();
    context.beginPath();
    context.moveTo(this.startPos.x, this.startPos.y);
    context.lineTo(this.endPos.x, this.endPos.y);
    context.closePath();
  }
}
