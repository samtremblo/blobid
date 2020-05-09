let inputHeight = 20;
let AmountInputs = 0;
let input;
let layerManager ;

let recovered_temp, death_temp, confirmed_temp;
let data = [3]; //0 = recovered 1 = death 2 = confirmed

let message = [];
let helpMessage = [];
let commandsMessage = [];

let isWritting = true;
let p;
let hasStarted = false;
let index;
let amountLines = 0;
let spawnInterval,showHelpTextInterval,showCommandTextInterval;
let update = false;

let palette = [[34, 102, 121],[28, 45, 137],[29, 135, 63],[45, 118, 13],[169, 204, 110],[1, 1, 5]]
let bgColorIndex = 0;
let bgColor;


let timeLineSpawn = 300;

//-----------------------------------------------------Easier capitalization for Countries---------------------
const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
;


//Preload les CSV
function preload() {

  //preloading csv files
  
   recovered_temp = loadTable('Recovered_Global.csv', 'csv','header');
   death_temp = loadTable('Death_Global.csv', 'csv','header');
   confirmed_temp = loadTable('Confirmed_Global.csv', 'csv','header');
  
  }


function setup() {
 layerManager = new LayerManager();

 
  //-----------------------------------------------------Creating a paragraph to put the console text in---------------------

  p = createP(

  ).addClass('Console');
  //-----------------------------------------------------Adding the greeting message in an array----------------------
  append(message, 'blobid-loader@admin:<b class="pink">~</b>$ ready');
  append(message, '<br>Blobid is a different way to see data about the current crisis.');
  append(message, ' <br> Type<b class="pink"> help </b>to start');



  //-----------------------------------------------------Adding the help message in an array----------------------
  append(helpMessage, '<br>');
  append(helpMessage, 'Blobid is a console that outputs art depending on what you request');
  append(helpMessage, 'As of now, you can type a data and a frame of time followed by country');
  append(helpMessage,'<br>For an example, you can write: <b class="pink">Death Week Canada</b>');

  append(helpMessage, '<br>First word can be <b class="pink">death</b> / <b class="pink">recovered</b> / <b class="pink">confirmed</b>');
  append(helpMessage, 'Second word can be <b class="pink">day</b> / <b class="pink">month</b> / <b class="pink">all</b>');
  append(helpMessage, 'Third word can be any <b class="pink">country</b>. If it does not work, type the command  <b class="pink">countries</b>');
  append(helpMessage,'<br> <br>For the full command list, type<b class="pink"> Commands</b>');


  append(helpMessage, '<br>');

  //-----------------------------------------------------Adding the commands message in an array----------------------
  append(commandsMessage, '   <b class="pink">help</b>: gives you an understanding how Blobid works');
  append(commandsMessage, ' <b class="pink">about</b>: tells you about who made Blobid');
  append(commandsMessage, ' <b class="pink">countries</b>: gives you a list of all the countries compatible with blobid');
  append(commandsMessage, ' <b class="pink">clear</b>: clears the console and the artwork');
  append(commandsMessage, ' <b class="pink">commands</b>: gives you a list of available commands');


  //create data handler object
  data[0] = new Data('recovered' ,recovered_temp);
  data[1] = new Data('death' ,death_temp);
  data[2] = new Data('confirmed' ,confirmed_temp);
  
  //-----------------------------------------------------Creating the canvas for the sketch, console and artwork--------------------
  createCanvas(windowWidth, windowHeight - 10);
  cnsl = createGraphics(width / 2, height);
  artwork = createGraphics(width / 2, height);
  //-----------------------------------------------------Initializing the input field--------------------
  generateInput();
  //-----------------------------------------------------Giving a background color for the console and artwork--------------------
  let bg = color(17, 41, 31, 255);
  cnsl.background(bg)

  bgColorIndex = int(random(palette.length));
  bgColor = palette[bgColorIndex];
  artwork.background(bgColor[0],bgColor[1],bgColor[2])

  //-----------------------------------------------------Placing both the artwork and the console--------------------
  image(artwork, width / 2, 0);
  image(cnsl, 0, 0);
  //-----------------------------------------------------Placing the middle line to split the canvas--------------------
  strokeWeight(2)
  stroke(15, 207, 133, 255)
  line(width / 2, 0, width / 2, height)
  //filter(BLUR, 1); //Blur makes it look a bit more dynamic... to be checked
  //-----------------------------------------------------Spawning the text at an interval--------------------
 
  spawnInterval = setInterval(SpawnInitialText, timeLineSpawn)


 // artwork.blendMode(DIFFERENCE);
}

function draw() {

  //artwork.background(bgColor[0],bgColor[1],bgColor[2]);
   for(l in layerManager.layers){
    layerManager.layers[l].update();
    layerManager.layers[l].display();
 }
 image(artwork, width / 2, 0);

  //-----------------------------------------------------Validates if initial message went through--------------------
  if (amountLines > message.length - 1) {
    clearInterval(spawnInterval);
    isWritting = false;

  }

  //------update canvas when key pressed-------//
  if(update == true){
   let pick = random(1)
   let target = 0.3;
   if(pick < target){
     copyPart();
   }else{
    test();
   }
   
   
   
   // for(l in layerManager.layers){
    // artwork.background(bgColor[0],bgColor[1],bgColor[2]);
      
     //layerManager.layers[l].update();
     //layerManager.layers[l].display();
       
     
    
    //image(artwork, width / 2, 0);
    }
  
  
    update = false;

}
//-----------------------------------------------------Spawns initial message and appends every line-------------------
function SpawnInitialText() {
  p.html(message[amountLines] + "<br>", true)
  amountLines++;

}

//-----------------------------------------------------Generates the input field and gives a basic style-------------------
function generateInput() {

  //Position
  Input = createInput().size(windowWidth / 2 - 5, inputHeight)
  Input.position(0, cnsl.height - inputHeight - 6);
  //Style
  Input.style("color", "#0fcf85")
  Input.style("background-color", "rgb(17, 41, 31,255)")
  Input.style("border-color", "#0fcf85")

}

function test(){

  artwork.image(artwork,random(width),random(height),random(width),random(height),random(width),random(height))
}

function copyPart(){
  let pos = createVector(random(width),random(height));

  c = artwork.get(pos.x,pos.y,random(1,width),random(1,height));

  let pick = random(1);
  let target = 0.25;
  if ( pick < target){
    let iter = int(random(20));

    for( let i = 0 ; i < iter ; i++){
      artwork.image(c,random(1,width),random(1,height));
    }
  }else {
  artwork.image(c,random(1,width),random(1,height));
  }
}


//-----------------------------------------------------Logs all keypresses for Artwork modulation-------------------
function keyPressed() {
  if (keyCode === ENTER) {
    sendInput();
  }
  console.log(AmountInputs + " Inputs");
  AmountInputs++;


  if(key){
    update = true; //------update canvas when key pressed-------//
    
  }

}

//-----------------------------------------------------Handles inputs--------------------

function sendInput() {
if(!isWritting){




//-----------------------------------------------------breaks fown all the words to analyse them them-------------------
let words = Input.value().split(' ');
let data;

// GenerateText(words);

    let type = words[0];
    //console.log('type', type)

    let typeString ;
    
    if(type == 'recovered'){
      typeString = 'recovered'
    }
    if ( type == 'death' ){
      typeString = 'death'
    }
    if(type == 'confirmed'){
      typeString = 'confirmed'
    }


    if(words[2]!=undefined){
      data = returnData(words[0],words[1],capitalize(words[2]))
    };


if(data == undefined) data = 0 ;  
    let string = data.toString() +' ' + typeString + ' last ' + words[1];
    console.log(string)
    newEntry(type,data,string);
    console.log("There were " + data +words[0]+ "in " + words[2] + "last " + words[1])
    p.html("There were " + data + " " +words[0]+ " in " + words[2] + " last " + words[1] +"<br>", true);

  if (words[0] == "help" && words.length<2) {
    isWritting = true;
    amountLines = 0;
    showHelpTextInterval =  setInterval(displayHelp,timeLineSpawn)
  }

  
  if (words[0] == "commands" && words.length<2) {
    isWritting = true;
    amountLines = 0;
    showCommandTextInterval =  setInterval(displayCommands,timeLineSpawn)
  }


  
  if (words[0] == "clear") {
    p.html('blobid-loader@admin:<b class="pink">~</b>$ ready <br>');

   
      // artwork.background(0);
    
    layerManager.removeLayers();
    artwork = createGraphics(width / 2, height);
    artwork.background(bgColor[0],bgColor[1],bgColor[2])
    image(artwork, width / 2, 0);

       
      
  }



//-----------------------------------------------------Resets current input once it was sent-------------------

Input.value("");



  
}



}

function newEntry(type,data,string){
  
  //console.log('Logging new entry')
  //let pos = createVector(width*0.5, height*0.5);
  layerManager.addLayer(type,data,string);

}

function displayHelp(){
  
  p.html(helpMessage[amountLines] + "<br>", true)
  amountLines++;
  if(amountLines > helpMessage.length - 1) {
    clearInterval(showHelpTextInterval);
    isWritting = false;
  }
}


function displayCommands(){
  
  p.html(commandsMessage[amountLines] + "<br>", true)
  amountLines++;
  if(amountLines > commandsMessage.length -1) {
    clearInterval(showCommandTextInterval);
    isWritting = false;
  }
}


function windowResized() {
    //-----------------------------------------------------Makes window resizing possible-------------------

  resizeCanvas(windowWidth, windowHeight);
  cnsl = createGraphics(width / 2, height);
  artwork = createGraphics(width / 2, height);

  Input.size(cnsl.width - 5, inputHeight)
  Input.position(0, cnsl.height - inputHeight - 6);

  let bg = color(17, 41, 31, 255);


  cnsl.background(bg)
  artwork.background(255, 255)


  image(artwork, width / 2, 0);
  image(cnsl, 0, 0);

  strokeWeight(2)




  stroke(15, 207, 133, 255)
  line(width / 2, 0, width / 2, height)
}


//get the data from the csv file and pushes it into an array
async function getData(file,array){
  //gets data from csv file
  const response = await fetch(file);
  const data = await response.text();
  const table = data.split('\n');
 
  for(let element of table){
    const row = element.split(',');
    array.push(row);
  }
   
}

///VERIFY IF ELSE STATEMENT
//return data  base on passed argument
function returnData( dataType, time, location){
// console.log('returning data')
 

      if(dataType == 'death'){

         if(time == 'day'){
           
           if(location === undefined){
            
             //return total death for today worldwide
             let death = data[1];
             let total = death.returnWW(time);
             
             return total;
           }else{
             
             //return total death for today at passed location
              let total = data[1].returnLoc(location ,time);
              return total;
           }
         }else if( time == 'week'){  
           if(location === undefined){
             //return total death for last week worldwide
             let total = data[1].returnWW(time);
             return total;
          }else{
            //return total death for last week at passed location
             let total = data[1].returnLoc(location ,time);
              return total;
          }
         }else if( time == 'month'){
           
           if(location === undefined){
             //return total death for last month worldwide
             let total = data[1].returnWW(time);
             
             return total;

          }else{
            
            //return total death for last month at passed location
            let total = data[1].returnLoc(location ,time);
              return total;
          }
         }else if( time == 'all'){
           //return total death for all time worldwide
           if(location === undefined){
            let total = data[1].returnWWAllTime();
            return total;
            
          }else{
            
            //return total death for all time at passed location
            let total = data[1].returnLoc(location ,time);
              return total;
          }
         }else{
           //return total death all time worldide
           let total = data[1].returnWWAllTime();
            return total;
         }

          
      }else if ( dataType == 'confirmed'){
       

        if(time == 'day'){
          
          if(location === undefined){
           //return total confirmed for today worldwide
           let confirmed = data[2];
           let total = confirmed.returnWW(time);
           return total;
          }else{
            //return total confirmed for today at passed location
            let total = data[2].returnLoc(location ,time);
              return total;
          }

        }else if( time == 'week'){
          
          if(location === undefined){
            //return total confirmed for last week worldwide
            let total = data[2].returnWW(time);
            return total;
           
         }else{
           //return total confirmed for last week at passed location
           let total = data[2].returnLoc(location ,time);
              return total;
         }
        }else if( time == 'month'){
          
          if(location === undefined){
            //return total confirmed for last month worldwide
            let total = data[2].returnWW(time);
            return total;
         }else{
           //return total confirmed for last month at passed location
           let total = data[2].returnLoc(location ,time);
              return total;
         }
        }else if( time == 'all'){
          
          if(location === undefined){
            //return total confirmed for all time worldwide
            let total = data[2].returnWWAllTime();
            return total;
         }else{
           //return total confirmed for all time at passed location
           let total = data[2].returnLoc(location ,time);
              return total;
         }
        }else{
          //return total death all time worldide
          let total = data[2].returnWWAllTime();
           return total;
        }
  
  
      }else if ( dataType == 'recovered'){
        

        if(time == 'day'){
          if(location === undefined){
             //return total recovered for today worldwide
             let total = data[0].returnWW(time);
             return total;
          }else{
            //return total recovered for today at passed location
             let total = data[0].returnLoc(location ,time);
              return total;
          }

        }else if( time == 'week'){
          
          if(location === undefined){
             //return total recovered for last week worldwide
             let total = data[0].returnWW(time);
             return total;
         }else{
           //return total recovered for last week at passed location
             let total = data[0].returnLoc(location ,time);
              return total;
         }
        }else if( time == 'month'){
          
          if(location === undefined){
             //return total recovered for last month worldwide
             let total = data[0].returnWW(time);
             return total;
         }else{
           //return total recovered for last month at passed location
           let total = data[0].returnLoc(location ,time);
              return total;
         }
        }else if( time == 'all'){
          
          if(location === undefined){
            //return total recovered for all time worldwide
            let total = data[0].returnWWAllTime();
            return total;
         }else{
          let total = data[0].returnLoc(location ,time);
          return total;
           //return total recovered for all time at passed location
         }
        }
        else{
          //return total death all time worldide
          let total = data[0].returnWWAllTime();
           return total;
        }
  
        

  }
} 

