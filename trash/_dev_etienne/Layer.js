class Layer{
  


  
 constructor(type,data,string,pos) 
  {
    this.words = [];

    this.type=type;
    this.data = data;
    this.string = string;
    this.pos = pos
    this.inc = random(1000)
    this.numWord = 1//int(this.data/100) //maybe will need to be rescaled depending on results with data
    
    this.target1 = 0.32; 
    this.target2 = 0.67


    this.direction = int(random(4))
    this.edgeBehavior = int(random(3))
    this.rotate = int(random(2));
    this.originTranslate = int(random(2));
    this.outline = int(random(2));

    this.setWeight();
    this.fillLayer();
    this.setup();
    console.log( 'layer settings' , 'dir' , this.direction ,'edge', this.edgeBehavior,'rot',this.rotate,'origin' , this.originTranslate, 'outline' ,this.outline)
  }
//setup functions

setup(){
  for(let w in this.words ){
    this.words[w].translateOrigin = this.originTranslate;
    this.words[w].rotate = this.rotate;
    this.words[w].outline = this.outilne;
  }


}

setWeight(){

 switch(this.type){
   case 0:
     this.target1  = 0.45;
     this.target2 =  0.75 ; 
     break;

   case 1:
    this.target1  = 0.25;
    this.target2 =  0.60 ; 
     break;

   case 2:
    this.target1  = 0.40;
    this.target2 =  0.65 ; 
     break;
 }
}

addWords(_pos, color,text)
  {
    
    let w = new Word(_pos, color,text);
    this.words.push(w);
  }
  
deleteWord()
  {
    this.words.splice(0,1)
  }

//
//animation
//

wind(force){
let w = createVector(force,0);
return w
} 

left(){
let w = createVector(-1,0);
return w
}
right(){
  let w = createVector(1,0);
  return w
  }
up(){
    let w = createVector(0,-1);
    return w
    }
down(){
      let w = createVector(0,1);
      return w
      }

display(){
  for(let w in this.words ){



    this.words[w].display();

  }
}

fall(){
  for(let w in this.words ){

    this.words[w].applyForce(this.down());
    this.words[w].update();
    this.words[w].wraparound();
  }
}

update(){
  for(let w in this.words ){
    //pick if its rotate or not
   //  this.words[w].rotate = true;

    let  x = this.inc;
    this.words[w].applyBehavior();



    switch(this.direction){

      case 0 : 
      this.words[w].applyForce(this.left());

      break;
      case 1: 
      this.words[w].applyForce(this.right());

      break;
      case 2 : 
      this.words[w].applyForce(this.up());

      break;
      case 3 : 
      this.words[w].applyForce(this.down());

      break;
    }

    //this.words[w].applyForce(this.wind(noise(x)*10,noise(x+500)*10));
   
    switch(this.edgeBehavior){

      case 0 :
        this.words[w].wraparound();
        break;
      case 1:
        this.words[w].bounceOnWall();
        break;
      case 2:
        this.words[w].boundaries(random(40));
        break;
    }
    
   
    this.words[w].update();
    this.x +=0.1;
  }
}




//HELPERS
fillLayer(){

let pick = random(1);
let positions;

if( pick < this.target1){
 let r  = random(width*0.4);
 positions = this.pointCircle(this.numWord , this.pos , r);

}else if( pick > this.target2){
  let pick = random(1);
  let target = random(0.2,0.7);
  let axis;

  let size = random( width*0.2 , width*0.8);
  if(pick <= target){ 
   axis = true;
  }else{
    axis = false;
  }
 positions = this.pointLine(axis, this.pos , this.numWord, size);


}else{
 let border = random(width*0.3);

 positions = this.randomPos(this.numWord , border);




}
//console.log(positions)
for(let p in positions){
/// CREATE COLORS SYSTEM
 // console.log(positions[p])
  let color = random(255);
  this.addWords(positions[p], color , this.string);
}
}


randomPos(numPoints,border){
  if(arguments.length== 1)border = 0;

  let positions=[];
  let pickedPos = [];
 

  for( let i = 0 ; i< numPoints*3; i++){
    let pos = createVector(random(0+border,width-border),random(0+border,height-border));
    positions.push(pos);
  }

  for( let i = 0 ; i< numPoints ; i++){
  let pick = int(random(positions.length))
  pickedPos.push(positions[pick]);
  }

  return pickedPos;
}

pointLine(axis , pos, numPoints, size ){
  let linePoints = [];
  let pickedPos = [];

  let step = size/numPoints;

  for( let i = 0 ; i < numPoints*3 ; i++){
    let x;
    let y;

    if(axis == true){
      //line on x axis
      x = (pos.x - size*0.5) + ( step * i);
      y = pos.y;
    }else{
      //line on y axis
      
      x = pos.x ; 
      y = (pos.y - size*0.5) + ( step * i);
    }
    let pointPos = createVector(x, y)
    linePoints.push(pointPos);
  }

  for( let i = 0 ; i< numPoints ; i++){
    let pick = int(random(linePoints.length))
    pickedPos.push(linePoints[pick]);
    }

  return pickedPos;
}

pointCircle(numPoints ,pos, r){

  let circlePoints=[];
  let pickedPos = [];

  let a = TWO_PI/numPoints;

  for(let i = 0 ; i < numPoints ; i++){

    let theta = (i)*a;

    let x = r * cos(theta) + pos.x;
    let y = r * sin(theta) + pos.y;

    let pointPos = createVector(x, y);

    circlePoints.push(pointPos);
  }

  for( let i = 0 ; i< numPoints ; i++){
    let pick = int(random(circlePoints.length))
    pickedPos.push(circlePoints[pick]);
    }

  return pickedPos;
}
}