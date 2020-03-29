class ParticleSystem{
  


  
 constructor() 
  {
    
    this.particles = [];
    
    
  }
  
  
  
addParticle(x,y)
  {
    let p = new Particle(x,y);
    this.particles.push(p);
  }
  
deleteParticle()
  {
    this.particles.splice(0,1)
  }

wind(force){
let w = createVector(force,0);
return w
} 
run(){

  for(let p of this.particles){
    p.update();
    p.wraparound();
    p.display();
  }
}
  
}