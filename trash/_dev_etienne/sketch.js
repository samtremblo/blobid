let layerManager ;
let update = false;

function setup(){

  createCanvas(800, 800);
  background(255)
  layerManager = new LayerManager();
  //randomly pick blendmode
  //blendMode(DIFFERENCE);
 
}



function draw(){
 
  if(update == true){
   
    background(255);
  for(l in layerManager.layers){
    layerManager.layers[l].update();

    layerManager.layers[l].display();
    
  }
  
  }  


  update = false;
}
function keyPressed(){

  if(key){
    update = true;
    
  }

  if(key == 'k'){
  
    let type = int(random(3));
    //console.log('type', type)

    let typeString ;

    if(type == 0){
      typeString = 'recovered'
    }
    if ( type == 1 ){
      typeString = 'death'
    }
    if(type == 2){
      typeString = 'confirmed'
    }

    let data = int( random(10,1500));

    let string = data.toString() +' ' + typeString + ' last month';
    console.log(string)
    newEntry(type,data,string);
  }
}


function newEntry(type,data,string){
  let pos = createVector(random(0.2*width,0.8*width), random(0.2*height,0.8*height));
  layerManager.addLayer(type,data,string,pos);
}


//zzold
function pickProb(){
  let pick = random(1);
  let target = random(0.2,0.7);

  //console.log(pick,target);

  if(pick <= target){ 
   return true;
  }else{
    return false;
  }

}