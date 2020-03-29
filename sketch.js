
let continents = [];
let blobs = [];

function setup(){

  createCanvas(windowWidth,windowHeight);
  
  

  for( i = 0 ; i < 2 ; i++){

  
  
  randomPos = createVector(random(width),random(height));
  let v  = new Vehicule(randomPos);
  
  continents.push(v);
  let b = new Blob(v.pos.x,v.pos.y);
  blobs.push(b);
  }

}


function draw(){
  background(255)
  fill(0,0,0,120);
 // blendMode(DIFFERENCE);

  for ( let v of continents) {
  v.draw();
  v.showTarget();
  }

  for( i = 0 ; i < 2 ; i++){
    blobs[i].updatePos(continents[i].pos);

  }

  for ( let b of blobs){
  //b.blob1();

  }

}