let inputHeight = 20;
let AmountInputs = 0;
let input;

let recovered_temp, death_temp, confirmed_temp;
let country_codes;
let data = [3]; //0 = recovered 1 = death 2 = confirmed

let message = [];
let helpMessage = [];
let isWritting = true;
let p;
let hasStarted = false;
let index;
let amountLines = 0;
let spawnInterval,showHelpTextInterval;


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
   //country_codes = loadTable('country_codes_csv.csv', 'csv','header');
   
   //old
   //dataCovid = loadTable('testData.csv', 'csv','header')
   //dataContinent = loadTable('countries_continent.csv', 'csv','header')
  
  }


function setup() {

  //-----------------------------------------------------Creating a paragraph to put the console text in---------------------

  p = createP(

  ).addClass('Console');
  //-----------------------------------------------------Adding the greeting message in an array----------------------
  append(message, 'blobid-loader@admin:~$ ready');
  append(message, 'Blobid is a different way to see data about the current crisis.');
  append(message, 'Cheers!');
  append(message, ' <br> Type help to start');





  append(helpMessage, 'Blahblahblah');
  append(helpMessage, 'Try with this');
  append(helpMessage, 'Death Week Canada');







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
  artwork.background(0, 255)

  //-----------------------------------------------------Placing both the artwork and the console--------------------
  image(artwork, width / 2, 0);
  image(cnsl, 0, 0);
  //-----------------------------------------------------Placing the middle line to split the canvas--------------------
  strokeWeight(2)
  stroke(15, 207, 133, 255)
  line(width / 2, 0, width / 2, height)
  filter(BLUR, 1); //Blur makes it look a bit more dynamic... to be checked
  //-----------------------------------------------------Spawning the text at an interval--------------------
  spawnInterval = setInterval(SpawnInitialText, 300)
}

function draw() {

  //-----------------------------------------------------Validates if initial message went through--------------------
  if (amountLines > message.length - 1) {
    clearInterval(spawnInterval);
    isWritting = false;

  }


  else {

  }

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





//-----------------------------------------------------Logs all keypresses for Artwork modulation-------------------
function keyPressed() {
  if (keyCode === ENTER) {
    sendInput();
  }
  console.log(AmountInputs + " Inputs");
  AmountInputs++;

}

//-----------------------------------------------------Handles inputs--------------------

function sendInput() {
if(!isWritting){




//-----------------------------------------------------breaks fown all the words to analyse them them-------------------
let words = Input.value().split(' ');


 returnData(words[0],words[1],words[2])
// GenerateText(words);

  if (words[0] == "help") {
    isWritting = true;
    console.log("This is the help menu")
   amountLines = 0;
    showHelpTextInterval =  setInterval(displayHelp,500)
  }

  
  if (words[0] == "clear") {
    p.html("")

  }

//returnData('confirmed','week','Afghanistan');



//-----------------------------------------------------Resets current input once it was sent-------------------

Input.value("");



  
}



}


function displayHelp(){
  
  p.html(helpMessage[amountLines] + "<br>", true)
  amountLines++;
  if(amountLines > helpMessage.length - 1) {
    clearInterval(showHelpTextInterval);
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
  artwork.background(0, 255)


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

 

      if(dataType == 'death'){
        console.log('inside death')

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

