class Blob{

    constructor(){

        this.pos = createVector(0,0);
        this.size = 50; 
        this.yOffset = 0;
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
                curveVertex(p.x , p.y);
            }
        endShape(CLOSE);
    }

    res( x , y){

        let p = createVector(x,y);
        let scl = 0.01;
        let ang = noise( p.x * scl, p.y * scl, 500+frameCount * 0.001)*100;
        let off = noise( p.x * scl, p.y * scl, frameCount * 0.001)*25;

        p.x += cos(ang) * off;
        p.y += sin(ang) * off;
        return p;

    }

    blob2(){

        noStroke();

        push();
            translate(this.pos.x , this.pos.y);
            beginShape();
                let xOffset = 0 ; 
                for(let i = 0 ; i < 360 ; i += 1){
                    let offset = map(noise(xOffset, this.yOffset),0,1,-100,100);
                    let newSize = this.size+offset;
                    let x = newSize*cos(i);
                    let y = newSize*sin(i);
                    curveVertex(x,y);
                    xOffset += 0.1;
                }
            this.yOffset += 0.01;
            endShape();

        pop();
    }




}