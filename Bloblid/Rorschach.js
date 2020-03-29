let amountShapes = 4;
let _shape = []; 
let totalDeath=0;

let Death = false;
let Recovered = true;


function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  if(Death)  table = loadTable('../Covid-19-master/Death_global.csv', 'csv', 'header');
  if(Recovered) table = loadTable('../Covid-19-master/Recovered.csv', 'csv', 'header');

  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");


  //cycle through the table to load it first
  for (let r = 0; r < table.getRowCount(); r++)
    for (let c = 0; c < table.getColumnCount(); c++) {
      print(table.getString(r, c));
    }
  
  }




  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  



function setup() {

  //fetch all the numbers
  for (let r = 1; r < table.getRowCount(); r++)
  for (let c = 4; c < table.getColumnCount(); c++) {
  //if the returned number is NaN, discart it.
  if(!isNaN(float((table.getString(r, c))))){
   totalDeath += float((table.getString(r, c)));
  } 
    
  }



  createCanvas(windowWidth, windowHeight);
 background(2)

  for(let i=0;i<amountShapes;i++){
    _shape.push(new Shape());
    _shape[i] =  new Shape(); 
    _shape[i].initiate();
   
    textSize(20);
    textAlign(CENTER, CENTER);
fill(100)
textFont('monospace');


if(Recovered) text((totalDeath)+" personnes se sont rétablies depuis le début", windowWidth*.5, windowHeight*.9);
    if(Death) text((totalDeath)+" poumons se sont éteints", windowWidth*.5, windowHeight*.9);


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