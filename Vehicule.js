class Vehicule {


    constructor(_pos){

        this.pos = _pos;
        this.vel= createVector(random(1,1), random(-1,1));
        this.acc= createVector(0, 0);

        this.r = 5;

        this.maxSpeed = 1;
        this.maxForce = 0.04;
        this.target = createVector(random(width), random(height));
        this.wanderTheta = 0;

        this.behavior = 0//floor(random(0,2)); // 0 = wandering 1= arriving
        this.flipped = false;
        this.flippedTimer =0;
        console.log(this.behavior);
    }

    update(){
        

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
       
        this.pos.add(this.vel);
        this.acc.mult(0);

       if(this.flipped) this.flippedTimer++;

        if(this.flippedTimer > 60){

            this.flipped = false;
            console.log("reset")
            this.flippedTimer =0;
        }
        
    }

    seek(target){

        let desired = p5.Vector.sub(target , this.pos);
        desired.normalize();
        desired.mult(this.maxForce);

        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    
    }

    applyForce(force){
        let f = force.copy();
        f.limit(this,this.maxForce);

        this.acc.add(f);
    }

    arrive( target, rad ){
        let desired = p5.Vector.sub(target , this.pos);
        let d = desired.mag();
       
        // uncomment to display target pos
        //stroke(255,0,0);
        //ellipse(this.target.x, this.target.y ,rad);
        desired.normalize();
        
        if( d < rad ){
            
            let m = map(d,0,rad , 0 , this.maxSpeed);
            desired.mult(m);
            let newTarget = createVector(random(width),random(height));
            this.target = newTarget;
        }else{
            desired.mult(this.maxSpeed);
        }

        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        this.applyForce(steer);

    }

    wandering(radius){
        
        let desired = this.vel.copy();
        desired.normalize()
        desired.mult(3);
        desired.add(this.pos);
        
        
        if(frameCount % 10 == 9){
        this.wanderTheta += random(-0.25,0.25) 
       }
        
   
        
        let x = radius*cos(this.wanderTheta) + desired.x;
        let y = radius*sin(this.wanderTheta) + desired.y;
        //uncomment to display target vector
        //ellipse(desired.x,desired.y,radius*2 );
        //ellipse(x,y,5);
        //ine(this.pos.x,this.pos.y,desired.x,desired.y)
        //line(desired.x,desired.y,x,y)
        //line(this.pos.x,this.pos.y,target.x,target.y)
        
        this.target = createVector( x,y);
        
        this.target.add(this.vel)
       // this.target.limit(this.maxForce)
        this.arrive(this.target,10)


    }

    showTarget(){
        push();
        fill(255,0,0,120);
        ellipse(this.target.x, this.target.y, 10);
    }

    display(){
        let theta = this.vel.heading() + PI / 2;
        fill(127);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
   

    }

    bounceOnWall(){

        if ((this.pos.x > width) || (this.pos.x < 0)) {
            this.vel.x = this.vel.x * -10;
          }
          if ((this.pos.y > height) || (this.pos.y < 0)) {
            this.vel.y = this.vel.y * -10;
          }
    }

    boundaries(d) {

        let desired = null;
        
        if (this.pos.x < d && this.flipped == false) {
          
            desired = createVector(this.maxSpeed, this.vel.y);
            this.target.mult(-1);
        

        } else if (this.pos.x > width - d && this.flipped == false) {

        //console.log("flipped")
        this.flipped = true;
          desired = createVector(-this.maxSpeed, this.vel.y);
          this.target.mult(-1);
          
          
        }
    
        if (this.pos.y < d && this.flipped == false) {
          desired = createVector(this.vel.x, this.maxSpeed);
          
        } else if (this.pos.y > height - d && this.flipped == false) {
          
          desired = createVector(this.vel.x, -this.maxSpeed);
        }
    
        if (desired !== null) {
           
          desired.normalize();
          desired.mult(this.maxSpeed);
          let steer = p5.Vector.sub(desired, this.vel);
          steer.limit(this.maxForce);
          this.target = steer.copy();
          this.applyForce(steer);
        }

        line(d,d,width-d,d);
        line(d,d,d,height-d);
        line(width-d,height-d,width-d,d);
        line(width-d,height-d,d,height-d);
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

    applyBehavior(){
        if(this.behavior == 0 ){
            
            this.wandering(25);
        }else if (this.behavior == 1){
            
            this.arrive(this.target, 50);
        }
    }
    
    
    draw(){
        this.applyBehavior();
        
        this.update();
        this.bounceOnWall();
        this.display();
    }

}