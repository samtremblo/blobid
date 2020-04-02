class DataHandler{

    constructor(data){

        this.data = data
       
       
      }



    removeCols(){

    let numOfArg = arguments.length;
 
      for (let i = 0 ; i < numOfArg ; i++ ){
        this.data.removeColumn(arguments[i])
      }
    
  
      

    }

    //function only for continent

    assignContinent(table){

      let array = this.data.getArray();
      for( let element of array){
        let continent = element[0];
        let code = element[1]

        console.log(element);

        if (continent == 'Asia') asia.addData(this.checkContinent(table ,code));
        if (continent == 'Antarctica') antartica.addData(this.checkContinent(table ,code));
        if (continent == 'Africa') africa.addData(this.checkContinent(table ,code));
        if (continent == 'Oceania') oceania.addData(this.checkContinent(table ,code));
        if (continent == 'North America') northAmerica.addData(this.checkContinent(table ,code));
        if (continent == 'South America') southAmerica.addData(this.checkContinent(table ,code));
        if (continent == 'Europe') europe.addData(this.checkContinent(table ,code));
        
 
      }

    }



    //funtion only for Covid
    checkContinent(table,code){
      
      return table.findRows(code,'countryterritoryCode')
    }
}
