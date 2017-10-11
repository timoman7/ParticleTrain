import Vector from './Vector.js';
import {Screen, context} from './View.js';
import {Colors} from './Colors.js';

export default class Particle{
  constructor(){
    let x = 0, y = 0, r = 0, color = "rgb(0,0,0)", a = 1;
    if(arguments.length !== 0){
      if(arguments[0].x !== undefined){
        x = arguments[0].x, y = arguments[0].y;
        r = arguments[1];
        color = arguments[2];
      }else{
        x = arguments[0], y = arguments[1];
        r = arguments[2];
        color = arguments[3];
      }
    }
    this.color = color;
    this.a = a;
    this.colorR = this.color.split(',')[0].split('(')[1];
    this.colorG = this.color.split(',')[1];
    this.colorB = this.color.split(',')[2].split(')')[0];
    this.color = "rgba("+this.colorR+","+this.colorG+","+this.colorB+","+this.a+")";
    this.r = r;
    this.pos = new Vector(x, y);
    this.startVel = new Vector(0, 0);
    this.vel = new Vector(0, 0);
    this.maxlife = 999999; // Just to make sure they don't instantly die
    this.lifetime = 999999; // Just to make sure they don't instantly die
  }

  set(){
    if(arguments.length !== 0){
      if(arguments[0].x !== undefined){
        this.pos.x = arguments[0].x, this.pos.y = arguments[0].y;
      }else{
        this.pos.x = arguments[0], this.pos.y = arguments[1];
      }
    }else{
      this.pos.x = 0, this.pos.y = 0;
    }
  }

  setLifetime(lifetime){
    this.maxlife = lifetime;
    this.lifetime = lifetime;
  }

  setColor(){
    this.color = arguments[0];
    this.colorR = this.color.split(',')[0].split('(')[1];
    this.colorG = this.color.split(',')[1];
    this.colorB = this.color.split(',')[2].split(')')[0];
    this.color = "rgba("+this.colorR+","+this.colorG+","+this.colorB+","+this.a+")";
  }

  isDead(){
      if(this.lifetime <= 0){
          // context.beginPath();
          // context.clearRect(this.pos.x - this.r, this.pos.y - this.r, this.r*2, this.r*2);
          // context.closePath();
          return true
      }else{
          return false
      }
  }

  update(){
    this.pos.add(this.vel);
    this.lifetime--;
    this.a = Math.round((this.lifetime / (this.maxlife * 1.5)) * 100) / 100;
    this.vel.set(this.startVel.x * this.a, this.startVel.y * this.a);
    this.color = "rgba("+this.colorR+","+this.colorG+","+this.colorB+","+this.a+")";
  }

  draw(){
    context.beginPath();
    context.ellipse(this.pos.x, this.pos.y, this.r, this.r, 0, 0, 2 * Math.PI);
    //Vanilla ellipses are genuinly the most confusing thing :/
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
}
