
let continents = [];
function setup(){

  createCanvas(400,400);
  
  for( i = 0 ; i < 7 ; i++){

  
  
  randomPos = createVector(random(width),random(height));
  let v  = new Vehicule(randomPos);
  continents.push(v);
  }

}


function draw(){
  background(255);

  for ( let v of continents) {
  v.draw()

  }

}