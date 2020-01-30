class obst{
  constructor(x, y, tam, dmov, ran, st = false, w, h){
    this.pos = createVector(x,y);
    this.tam = tam;

    this.walls = [];;

    if(!st){
      if(dmov){
        if(ran) this.mov = [0,7];
        else this.mov = [0,-7];
      }else{
        if(ran) this.mov = [7,0];
        else this.mov = [-7,0];
      }

      this.walls.push(new wall(x,y,x+tam,y));
      this.walls.push(new wall(x+tam,y,x+tam,y+tam));
      this.walls.push(new wall(x+tam,y+tam,x,y+tam));
      this.walls.push(new wall(x,y+tam,x,y));
    }else{
      this.mov = [0,0];
      this.walls.push(new wall(x,y,x+w,y));
      this.walls.push(new wall(x+w,y,x+w,y+h));
      this.walls.push(new wall(x+w,y+h,x,y+h));
      this.walls.push(new wall(x,y+h,x,y));
    }


  }

  update(){
    this.pos.x += this.mov[0];
    this.pos.y += this.mov[1];

    for(let i = 0; i < 4; i++){
      this.walls[i].a.x+=this.mov[0];
      this.walls[i].a.y+=this.mov[1];
      this.walls[i].b.x+=this.mov[0];
      this.walls[i].b.y+=this.mov[1];
    }

    return (this.pos.x > width || this.pos.x + this.tam < 0 || this.pos.y > height || this.pos.y + this.tam < 0);
  }

  show(){
    for(let i = 0; i < 4; i++){
      this.walls[i].show();
    }
  }

  get_pos(){
    return [this.pos.x, this.pos.y, this.tam];
  }
}

class environment{
  constructor(){
    this.obsts = [];
    this.obsts.push(new obst(1,1,0,true,true,true,width - 2,height - 2));
  }

  new_cuad(tam = 150){
    let r1 = int(random(0,1));
    if(r1 == 0){
      this.obsts.push(new obst(random(0,width-tam),0-tam,tam,true,true))
    }else if(r1 == 1){
      this.obsts.push(new obst(width,random(0,height-tam),tam,false, false))
    }else if(r1 == 2){
      this.obsts.push(new obst(random(0,width-tam),height,tam,true,false))
    }else if(r1 == 3){
      this.obsts.push(new obst(0-tam,random(0,height-tam),tam,false, true))
    }
  }

  get_lines(){
    let res = []
    for(let i = 0; i < this.obsts.length; i++)
      for(let j = 0; j < this.obsts[i].walls.length; j++)
        res.push(this.obsts[i].walls[j])
    return res;
  }
  show(){
    for(let i = this.obsts.length - 1; i >= 0; i--){
      let r = this.obsts[i].update();

      if(r){
        this.obsts.splice(i, 1);
      }
      else this.obsts[i].show();
    }
  }

  check_col(player){
    let x = 0;
    let y = 1;
    let t = 2;
    let plpos = player.get_pos();

    for(let i = 0; i < this.obsts.length; i++){
      let obpos = this.obsts[i].get_pos();

      if(plpos[x] < obpos[x] + obpos[t] && plpos[x] + plpos[t] > obpos[x] && plpos[y] < obpos[y] + obpos[t] && plpos[y] + plpos[t] > obpos[y])
        return true;
    }
    return false;
  }
}
