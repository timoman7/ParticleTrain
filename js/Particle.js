import {Screen, context} from './View.js';

export default class Particle{
  constructor(){
    this.color =  {
      r: 0,
      g: 0,
      b: 0,
      a: 0.2
    };
    let x = 0, y = 0;
    if(arguments.length !== 0){
      if(arguments.length == 1){
        x = arguments[0].x, y = arguments[0].y;
      }else if(arguments.length ){
        x = arguments[0], y = arguments[1];
      }
    }
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
  }
  set(){
    if(arguments.length !== 0){
      if(Object.keys(arguments[0]).includes("x")){
        this.pos.x = arguments[0].x, this.pos.y = arguments[0].y;
      }else{
        this.pos.x = arguments[0], this.pos.y = arguments[1];
      }
    }else{
      this.pos.x = 0, this.pos.y = 0;
    }
  }

  setColor(){
    if(arguments.length == 1){
      this.color = arguments[0];
    }else{
      this.color = {
        r: arguments[0],
        g: arguments[1],
        b: arguments[2],
        a: arguments[3] || 120
      };
    }
  }

  update(){
    this.pos.add(this.vel);
  }

  draw(){
    context.globalAlpha = this.color.a;
    context.beginPath();
    context.fillStyle = "rgb(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ")";
    context.ellipse(this.pos.x + this.r, this.pos.y + this.r, this.r, this.r, 0, 0, 360);
    context.fill();
    //Vanilla ellipses are genuinly the most confusing thing :/
    context.closePath();
    context.fill();
    context.globalAlpha = 1;
  }
}
