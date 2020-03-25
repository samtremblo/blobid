class Vehicule {


    constructor(_pos){

        this.pos = _pos;
        this.vel= createVector(random(1,1), random(-1,1));
        this.acc= createVector(0, 0);

        this.r = 5;

        this.maxSpeed = 1;
        this.maxForce = 1;
        this.target = createVector(random(width), random(height));
        this.wanderTheta = 0;

        this.behavior = floor(random(0,2)); // 0 = wandering 1= arriving
        console.log(this.behavior);
    }

    update(){
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        
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
        desired.mult(100);
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
        
        let target = createVector( x,y);
        //target.limit(this.maxForce)
        target.add(this.vel)
       
        this.seek(target)


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
            
            this.wandering(50);
        }else if (this.behavior == 1){
            
            this.arrive(this.target, 50);
        }
    }

    draw(){
        this.applyBehavior();
        this.update();
        this.wraparound();
        this.display();
    }

}