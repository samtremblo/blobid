class Blob{

    constructor(){

        this.pos = createVector(0,0);
        this.size = 50; 
        this.yOffset = 0;
        this.yOff = 0.1;

        this.xOff = 0.1;

        this.amount = 5;
        
        this.vs = [];
        this.theta = 0
    }


    updatePos(pos){
        this.pos = pos.copy();

    }

    blob1(){

        beginShape();
        noStroke();
            for(let i = 0 ; i < TWO_PI ; i += TWO_PI/360){

                let x_polar = this.pos.x + this.size*0.5 * cos(i);
                let y_polar = this.pos.y + this.size*0.5 * sin(i);
                let p = this.res( x_polar , y_polar);
                ellipse(p.x,p.y,5)
                curveVertex(p.x , p.y);
            }
        endShape(CLOSE);
    }

    //play with res for better results of blob1
    res( x , y){

        let p = createVector(x,y);
        let scl = 0.001; 
        let ang = noise( p.x * scl, p.y * scl, 500+frameCount * 0.001)*100;
        let off = noise( p.x * scl, p.y * scl, frameCount * 0.001)*50;

        p.x += cos(ang) * off;
        p.y += sin(ang) * off;
        return p;

    }

    blob2(){

        //UNCOMMENT FOR THE LOLZ
        //blendMode(DIFFERENCE)
        
        push();
        //noFill();
        translate(this.pos.x , this.pos.y);

        beginShape();

                let xOffset = 0 ; 

                for(let i = 0 ; i < TWO_PI ; i += TWO_PI/60){
                    
                    let offset = map(noise(xOffset, this.yOffset),0,1,-1*this.amount,this.amount);
                    let newSize = this.size+offset;
                    let x = newSize*cos(i);
                    let y = newSize*sin(i);
                    curveVertex(x,y);
                    xOffset += this.xOff;
                }
            this.yOffset += this.yOff;
            endShape(CLOSE);

        pop();

    
    }

    



}