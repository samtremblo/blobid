
let dataCovid
let dataContinent
let recovered_temp, death_temp, confirmed_temp;
let country_codes;
let data = [3]; //0 = recovered 1 = death 2 = confirmed
let dhContinent
let dhCovid

let antartica
let africa
let asia
let europe
let northAmerica
let oceania
let southAmerica
let world


function preload() {

//preloading csv files

 recovered_temp = loadTable('Recovered_Global.csv', 'csv','header');
 death_temp = loadTable('Death_Global.csv', 'csv','header');
 confirmed_temp = loadTable('Confirmed_Global.csv', 'csv','header');
 country_codes = loadTable('country_codes_csv.csv', 'csv','header');
 
 //old
 //dataCovid = loadTable('testData.csv', 'csv','header')
 dataContinent = loadTable('countries_continent.csv', 'csv','header')

}

function setup() {

//create data handler object
data[0] = new Data('recovered' ,recovered_temp);
data[1] = new Data('death' ,death_temp);
data[2] = new Data('confirmed' ,confirmed_temp);

country_codes = country_codes.getArray();

//empty pre filled arrays
for(let item of data){
  item.setup();
}



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






function returnData( dataType, time, loc){

  console.log(arguments)
      if(dataType == 'death'){
         if(time == 'day'){
           if(location === undefined){
             //return total death for today worldwide
             let death = data[1];
             let total = death.returnWW(time);
             return total;
           }else{
             //return total death for today at passed location
              let total = data[1].returnLoc(loc ,time);
              return total;
           }
         }else if( time == 'week'){  
           if(location === undefined){
             //return total death for last week worldwide
             let total = data[1].returnWW(time);
             return total;
          }else{
            //return total death for last week at passed location
             let total = data[1].returnLoc(loc ,time);
              return total;
          }
         }else if( time == 'month'){
           
           if(location === undefined){
             //return total death for last month worldwide
             let total = data[1].returnWW(time);
             
             return total;
          }else{
            //return total death for last month at passed location
            let total = data[1].returnLoc(loc ,time);
              return total;
          }
         }else if( time == 'all'){
           //return total death for all time worldwide
           if(location === undefined){
            let total = data[1].returnWWAllTime();
            return total;
            
          }else{
            //return total death for all time at passed location
            let total = data[1].returnLoc(loc ,time);
              return total;
          }
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
            let total = data[2].returnLoc(loc ,time);
              return total;
          }

        }else if( time == 'week'){
          
          if(location === undefined){
            //return total confirmed for last week worldwide
            let total = data[2].returnWW(time);
            return total;
           
         }else{
           //return total confirmed for last week at passed location
           let total = data[2].returnLoc(loc ,time);
              return total;
         }
        }else if( time == 'month'){
          
          if(location === undefined){
            //return total confirmed for last month worldwide
            let total = data[2].returnWW(time);
            return total;
         }else{
           //return total confirmed for last month at passed location
           let total = data[2].returnLoc(loc ,time);
              return total;
         }
        }else if( time == 'all'){
          if(location === undefined){
            //return total confirmed for all time worldwide
            let total = data[2].returnWWAllTime();
            return total;
         }else{
           //return total confirmed for all time at passed location
           let total = data[2].returnLoc(loc ,time);
              return total;
         }
        }
  
  
      }else if ( dataType == 'recovered'){
        if(time == 'day'){
          if(location === undefined){
             //return total recovered for today worldwide
             let total = data[0].returnWW(time);
             return total;
          }else{
            //return total recovered for today at passed location
             let total = data[0].returnLoc(loc ,time);
              return total;
          }

        }else if( time == 'week'){
          
          if(location === undefined){
             //return total recovered for last week worldwide
             let total = data[0].returnWW(time);
             return total;
         }else{
           //return total recovered for last week at passed location
             let total = data[0].returnLoc(loc ,time);
              return total;
         }
        }else if( time == 'month'){
          
          if(location === undefined){
             //return total recovered for last month worldwide
             let total = data[0].returnWW(time);
             return total;
         }else{
           //return total recovered for last month at passed location
           let total = data[0].returnLoc(loc ,time);
              return total;
         }
        }else if( time == 'all'){
          
          if(location === undefined){
            //return total recovered for all time worldwide
            let total = data[0].returnWWAllTime();
            return total;
         }else{
          let total = data[0].returnLoc(loc ,time);
          return total;
           //return total recovered for all time at passed location
         }
        }
  
        
      else{
        //return error message
        //return error message
      let error = 'error'
      return error
      }

  }
} 

