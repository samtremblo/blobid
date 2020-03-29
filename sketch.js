
let continents = [];
let blobs = [];
let ps
let ps_foreground

function setup(){

  createCanvas(windowWidth,windowHeight);
  

  setupEtienne();

}


function draw(){
  background(40 )
  fill(0,0,0,120);
 blendMode(DIFFERENCE);

 for ( let p of ps.particles){
   p.applyForce(ps.wind(-0.001));
 }
 ps.run();
 

  for ( let v of continents) {
  v.draw();
  //v.showTarget();
  }

  for( i = 0 ; i < 7 ; i++){
    blobs[i].updatePos(continents[i].pos);

  }

  for ( let b of blobs){
  b.blob1();

  }
  for ( let p of ps_foreground.particles){
    p.applyForce(ps_foreground.wind(0.001));
  }
ps_foreground.run();

}

function setupEtienne()
{


  
  ps = new ParticleSystem();
  ps_foreground = new ParticleSystem();

  for(let i = 0 ; i < 30;i++){
    ps.addParticle(random(width), random(height));
  }

  for(let i = 0 ; i < 25;i++){
    ps_foreground.addParticle(random(width), random(height));
  }
  for( i = 0 ; i < 7 ; i++){

  
  
  randomPos = createVector(random(width),random(height));
  let v  = new Vehicule(randomPos);
  
  continents.push(v);
  let b = new Blob(v.pos.x,v.pos.y);
  blobs.push(b);
  }
}
