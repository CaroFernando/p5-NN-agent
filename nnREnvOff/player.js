class player{
  constructor(nrays, tam){
    this.rays = []
    this.pos = createVector(width/2 + tam/2, 300 + tam/2);

    for(let i = 1; i <= nrays; i++){
      this.rays.push(new ray(this.pos, radians((360/nrays)*i)));
    }
    this.nn = new NeuralNetwork(nrays, 15, 5);

    this.tam = tam;
  }

  update(walls){
    fill(255);
    rect(this.pos.x - this.tam/2, this.pos.y - this.tam/2, this.tam, this.tam);
    let dists = [];
    for(let ray = 0; ray < this.rays.length; ray++){
      let men = Infinity;
      let menpt = null;
      for(let wall = 0; wall < walls.length; wall++){
        let pt = this.rays[ray].cast(walls[wall]);
        if(pt){
          let d = dist(this.pos.x, this.pos.y, pt.x, pt.y);
          if(d < men){
            men = d;
            menpt = pt;
          }
        }
      }
      if(menpt){
        fill(255);
    		ellipse(menpt.x, menpt.y, 10, 10);
        stroke(255);
        line(this.pos.x, this.pos.y, menpt.x, menpt.y);
        dists.push(map(men, 0, 1000, 1, 0));
      }else{
        dists.push(0);
        this.rays[ray].show();
      }
    }

    return dists;
  }

  automove(dists){
    let pred = this.nn.predict(dists);
    print(pred);
    this.move(pred);
  }

  automove_all_dir(dists){
    let pred = this.nn.predict(dists);
    print(pred);
    this.move_all_dir(pred);
  }

  move(arr){
    // [arriba, abajo, derecha, izquierda, nada]
    let may = -1;
    let imay = 0;

    for(let i = 0; i < arr.length; i++){
      if(arr[i] > may){
        may = arr[i];
        imay = i;
      }
    }
    let vel = 9;

    switch(imay){
      case 0:
      this.pos.y-=vel;
      break;
      case 1:
      this.pos.y+=vel;
      break;
      case 2:
      this.pos.x+=vel;
      break;
      case 3:
      this.pos.x-=vel;
      break;
      case 4:
      break;
    }

    for(let ray = 0; ray < this.rays.length; ray++){
      this.rays[ray].pos = this.pos;
    }
  }

  move_all_dir(arr, offset = 0.8){
    let vel = 9;

    if(arr[0] > offset) this.pos.y-=vel;
    if(arr[1] > offset) this.pos.y+=vel;
    if(arr[2] > offset) this.pos.x+=vel;
    if(arr[3] > offset) this.pos.x-=vel;

    for(let ray = 0; ray < this.rays.length; ray++) this.rays[ray].pos = this.pos;
  }

  get_pos(){
    return [this.pos.x - this.tam/2, this.pos.y - this.tam/2, this.tam];
  }
}
