
class Particle {
  
  

  
  constructor(x, y) {
    this.acc = createVector( 0,0);
  	this.vel = createVector( 0, 0);
    this.pos = createVector( x ,y);
    this.maxSpeed = 1 ;
    this.maxForce = 1 ;
    this.weight = 0; 

    this.life = 1000; //frame
    this.isDead = false;
    this.size = random(15,100);
    this.opa = map(this.size , 15,100, 200,50);
  }
  
  
  applyForce(force){
  
  this.f = force.copy();
  this.f.limit(this.maxForce);
  this.acc.add(this.f);
  
  }
  
  
	update(){
  
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);
  this.acc.mult(0);
  this.life--;

  }


  
  // basic particule display method
  display() {
    push();
    noStroke()
    fill(255,255,255, this.opa);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y,this.size,height);
    pop()
  }

	checkDeath(){
  	if( this.life <= 0 ) {
  	this.isDead = false;
  	return this.isDead;
  }
  
  }
  wraparound() {

    if ((this.pos.x > width)){
        this.pos.x = 0;
    }
    
    if(this.pos.x < 0){
        this.pos.x = width;
      }
    
    if (this.pos.y > height){
        this.pos.y = 0;
    }
    
    if(this.pos.y < 0) {
       this.pos.y=height;
    }


}

//METHODS TO SET PARAM

	setMaxSpeed( maxSpeed){
  	this.maxSpeed = maxSpeed;
  }

	setMaxForce( maxForce){
  	this.maxForce = maxForce;
  }	
	
	setWeight( weight){
  	this.weight = weight;
  }

	setLifeTime( lifeTime){
  	this.life = lifeTime;
  }
	

}