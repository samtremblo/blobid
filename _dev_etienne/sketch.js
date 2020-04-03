let dataCovid
let dataContinent

let dhContinent
let dhCovid

let antartica
let africa
let asia
let europe
let northAmerica
let oceania
let southAmerica


function preload() {

//preloading csv files
 dataCovid = loadTable('testData.csv', 'csv','header')
 dataContinent = loadTable('countries_continent.csv', 'csv','header')

}

function setup() {

//create data handler object
dhCovid = new DataHandler(dataCovid);
dhContinent = new DataHandler(dataContinent);

//empty pre filled arrays
dataCovid = []
dataContinent =[]

//strip down data
dhContinent.removeCols('Continent_Code','Country_Name','Two_Letter_Country_Code','Country_Number');
dhCovid.removeCols('geoId','popData2018');

createContinents();
dhContinent.assignContinent(dhCovid.data);
setupContinents();

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


//create all continent objects
function createContinents(){
  antartica = new Continent('antartica');
  africa = new Continent('africa');
  asia = new Continent('asia');
  europe = new Continent('europe');
  northAmerica = new Continent('northAmerica');
  oceania = new Continent('oceania');
  southAmerica = new Continent('southAmerica');

}

function setupContinents(){
  antartica.removeEmpty();
  antartica.removeEmpty();
  antartica.sortDays();

  africa.removeEmpty();
  africa.removeEmpty();
  africa.sortDays();

  asia.removeEmpty();
  asia.removeEmpty();
  asia.sortDays();

  europe.removeEmpty();
  europe.removeEmpty();
  europe.sortDays();
  
  northAmerica.removeEmpty();
  northAmerica.removeEmpty();
  northAmerica.sortDays();

  
  oceania.removeEmpty();
  oceania.removeEmpty();
  oceania.sortDays();
  
  southAmerica.removeEmpty();
  southAmerica.removeEmpty();
  southAmerica.sortDays();

}