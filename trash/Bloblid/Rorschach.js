//ETIENNE GLOBAL VARS
let continents = [];
let blobs = [];
let ps
let ps_foreground
let pg
/////////////////////////

let amountShapes;
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
 amountShapes = random(1,);
  //fetch all the numbers
  for (let r = 1; r < table.getRowCount(); r++)
  for (let c = 4; c < table.getColumnCount(); c++) {
  //if the returned number is NaN, discart it.
  if(!isNaN(float((table.getString(r, c))))){
   totalDeath += float((table.getString(r, c)));
  } 

  
    
  }



createCanvas(windowWidth, windowHeight);
 background(0)

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

  setupEtienne();
  pg = createGraphics(windowWidth, windowHeight);
  
}

function draw() {
 blendMode(EXCLUSION)
  //background(40);


  for ( let p of ps.particles){
    p.applyForce(ps.wind(-0.001));
  }
 // ps.run();
  
 
   for ( let v of continents) {
   v.draw();
   //v.showTarget();
   }
 
   for( i = 0 ; i < 7 ; i++){
     blobs[i].updatePos(continents[i].pos);
 
   }

   shape();
   image(pg,0,0)
 
   for ( let b of blobs){
   b.blob1();
 
   }
   for ( let p of ps_foreground.particles){
     p.applyForce(ps_foreground.wind(0.001));
   }
// ps_foreground.run();
}

function setupEtienne()
{


  
  ps = new ParticleSystem();
  ps_foreground = new ParticleSystem();

  for(let i = 0 ; i < 30;i++){
    ps.addParticle(random(width), random(height));
  }

  for(let i = 0 ; i < 25;i++){
    ps_foreground.addParticle(random(width), random(height));
  }
  for( i = 0 ; i < 7 ; i++){

  
  
  randomPos = createVector(random(width),random(height));
  let v  = new Vehicule(randomPos);
  
  continents.push(v);
  let b = new Blob(v.pos.x,v.pos.y);
  blobs.push(b);
  }
}

function shape(){
  for (let x = 0; x < amountShapes; x ++) { 
    pg.push();
    pg.translate(width/2, height/2,random(400, 500));
    _shape[x].shapeDraw();
    pg.pop();
  }
}