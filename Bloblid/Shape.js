class Shape {

  constructor(){
    
    this.ShapeHandleX = [0];
    this.ShapeHandleY = [0];
    this.theta = 0;
    this.ShapeHandles = int(random(5,9));

  }

  initiate(){
     noStroke();
      strokeWeight(0);
  
for(let i = 0; i<this.ShapeHandles;i++){

  this.ShapeHandleX[i]  = random(-300,300);
  this.ShapeHandleY[i]  = random(-300,300);

  }  
  
}

shapeDraw() {
  //drawing a shape from the vertex and making it mirror
    let mirrorX = map(sin(this.theta), 0, 255, 0, 255); 
    beginShape();
    fill(0, 0, 0, 1);

    for (let i = 0; i< 10 ; i++) {
      curveVertex(this.ShapeHandleX[i]*mirrorX, this.ShapeHandleY[i]);
    }
    endShape(CLOSE);
    this.theta +=random(.5, .01);
  }
  
}