export default class Vector{
  constructor(){
    let x = 0, y = 0;
    if(arguments.length !== 0){
      x = arguments[0], y = arguments[1];
    }
    this.x = x, this.y = y;
  }
  set(){
    if(arguments.length !== 0){
      if(Object.keys(arguments[0]).includes("x")){
        this.x = arguments[0].x, this.y = arguments[0].y;
      }else{
        this.x = arguments[0], this.y = arguments[1];
      }
    }else{
      this.x = 0, this.y = 0;
    }
  }
  add(){
    if(arguments.length !== 0){
      if(Object.keys(arguments[0]).includes("x")){
        this.x += arguments[0].x, this.y += arguments[0].y;
      }else{
        this.x += arguments[0], this.y += arguments[1];
      }
    }
  }
  sub(){
    if(arguments.length !== 0){
      if(Object.keys(arguments[0]).includes("x")){
        this.x -= arguments[0].x, this.y -= arguments[0].y;
      }else{
        this.x -= arguments[0], this.y -= arguments[1];
      }
    }
  }
  div(){
    if(arguments.length !== 0){
      if(arguments.length == 1){
        if(Object.keys(arguments[0]).includes("x")){
          this.x /= arguments[0].x, this.y /= arguments[0].y;
        }else{
          this.x /= arguments[0], this.y /= arguments[0];
        }
      }else{
        this.x /= arguments[0], this.y /= arguments[1];
      }
    }
  }
  mult(){
    if(arguments.length !== 0){
      if(arguments.length == 1){
        if(Object.keys(arguments[0]).includes("x")){
          this.x *= arguments[0].x, this.y *= arguments[0].y;
        }else{
          this.x *= arguments[0], this.y *= arguments[0];
        }
      }else{
        this.x *= arguments[0], this.y *= arguments[1];
      }
    }
  }
}
