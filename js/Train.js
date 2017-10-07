import Vector from './Vector.js';
import {Screen, context} from './View.js';

let width = context.canvas.width;
let height = context.canvas.height;

export default class Train {
  constructor(){
    this.pos = new Vector(0,0);
    this.vel = new Vector(0,0);
    this.parts = [];
  }

  addPart(x, y, w, h, _type, _color, parent){
    this.parts.push(new Part(x, y, w, h, _type, _color, parent));
  }

  sortByX(){
    this.parts.sort((partA, partB) => {
    	if(partA.pos.x < partB.pos.x){
    		  return -1
      }else if(partA.pos.x > partB.pos.x){
  		    return 1
      }else{
  		    return 0
      }
    });
  }

  update(){
    this.pos.add(this.vel);
      for(let Piece in this.parts){
        this.parts[Piece].update();
      }
  }

  draw(){
    for(let Piece in this.parts){
      this.parts[Piece].draw();
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
    context.fill();
  }
}
