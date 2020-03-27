let amountShapes = 4;
let _shape = []; 


function setup() {
  createCanvas(800, 800);
 background(255)

  for(let i=0;i<amountShapes;i++){
    _shape.push(new Shape());
    _shape[i] =  new Shape(); 
    _shape[i].initiate();
    
  }

  
}

function draw() {
  for (let x = 0; x < amountShapes; x ++) { 
    push();
    translate(width/2, height/2,random(400, 500));
    _shape[x].shapeDraw();
    pop();
  }
}