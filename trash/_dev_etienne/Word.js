class Word {


    constructor(pos,color,text){
       // console.log(pos,color,text);
        this.pos = pos;
        this.vel = createVector(0,0);
        this.acc= createVector(0, 0);

        this.reduce = int(random(2));
        this.r = 5;

        this.inc = random(1000);

        this.maxSpeed = random(0.8,360.2);
        this.maxForce = random(0.5,355.5);

        this.target = createVector(random(width), random(height));
        this.wanderTheta = 0;

        this.behavior = floor(random(0,2)); // 0 = wandering 1= arriving
        this.rotate = false;
        this.theta = 0;
        this.flipped = false;
        this.flippedTimer =0;
        this.outline = false; 
        this.translateOrigin = false;

        this.text = text;
        this.textSize = random(15,50) ; 
        this.color = color; 
       
        
    }

    update(){
        
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);   

        if(this.reduce == true) this.textSize -= 0.01;
        if(this.rotate == true) this.theta += noise(this.inc);

        this.inc+= 0.1
    }

    applyBehavior(){
        if(this.behavior == 0 ){
            
            this.wandering(25);
        }else if (this.behavior == 1){
            
            this.arrive(this.target, 50);
        }
    }


    display(){

        push(this.color);

        //fill or outilnes 
        if(this.outline == true){

        noFill();
        stroke();

        }else{

        noStroke();
        fill(this.color);

        }

        textSize(this.textSize);

        //rotation origin translated
        if(this.translateOrigin == true){
              translate(this.pos.x,this.pos.y);
              if(this.rotate == true) rotate(this.theta);
              text(this.text , 0, 0);
        }else{
            
             if(this.rotate == true) rotate(this.theta);
             text(this.text , this.pos.x,this.pos.y);
        }
        pop();
        

    }
     
    draw(){

        this.applyBehavior();      
        this.update();
        this.wraparound();
        this.display();
    }
  




//moving behavior

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

    

 



//edges behavior 

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
        
        if (this.pos.x < d ) {
          
            desired = createVector(this.maxSpeed, this.vel.y);
           
        

        } else if (this.pos.x > width - d ) {

      
          desired = createVector(-this.maxSpeed, this.vel.y);
          
          
          
        }
    
        if (this.pos.y < d ) {
          desired = createVector(this.vel.x, this.maxSpeed);
          
        } else if (this.pos.y > height - d ) {
          
          desired = createVector(this.vel.x, -this.maxSpeed);
        }
    
        if (desired !== null) {
           
          desired.normalize();
          desired.mult(this.maxSpeed);
          let steer = p5.Vector.sub(desired, this.vel);
          steer.mult(3);
          this.applyForce(steer);
        }

      //  line(d,d,width-d,d);
      //  line(d,d,d,height-d);
      //  line(width-d,height-d,width-d,d);
      //  line(width-d,height-d,d,height-d);
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




}