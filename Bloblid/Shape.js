class Shape {

  constructor(totalDeath){
    
    this.ShapeHandleX = [0];
    this.ShapeHandleY = [0];
    this.theta = 0;
    this.ShapeHandles = int(random(5,9));
  

    this.totalDeath = totalDeath;
    
    if(Recovered)this.size = .0002;
    if(Death)this.size = .001;

  }

  initiate(){
     noStroke();
      strokeWeight(0);
  
for(let i = 0; i<this.ShapeHandles;i++){

  this.ShapeHandleX[i]  = random(-totalDeath*this.size,totalDeath*this.size);
  this.ShapeHandleY[i]  = random(-totalDeath*this.size,totalDeath*this.size);

  }  
  
}

shapeDraw() {
  //drawing a shape from the vertex and making it mirror
    let mirrorX = map(sin(this.theta), 0, 255, 0, 255); 
    pg.beginShape();
    if(Death)fill(1000, 0, 0, 1);
    if(Recovered)fill(1,0, 1, 1);

    pg.noFill();
    pg.stroke(100, 2)

    for (let i = 0; i< 10 ; i++) {
      pg.curveVertex(this.ShapeHandleX[i]*mirrorX, this.ShapeHandleY[i]);
    }
    pg.endShape(CLOSE);
    this.theta +=random(.05, 1);
  }
  
}