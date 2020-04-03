class Continent {

//faire une fonction qui sort par jour

    constructor(name){

        this.name = name;
        
        this.countries = [] ;
        this.days = []

       
    }

    addData(data){

        this.countries.push(data)
    }

    removeEmpty(){
        let temp = 0;
        
        for( let element of this.countries){
            
            let size = element.length;
            
           
            if(size == 0){
               
               let index = temp
                this.countries.splice(index,1);

            }
            temp++
           

        
        }
    }

    sortDays(){

        let highestElement = 0;
        let temp = 0;
        let index =0 ;
        for( let element of this.countries){
            temp++
            let size = element.length;
           
            if(size > highestElement){
                highestElement = size;
                index = temp-1

            }
           

        
        }
        
        let table = this.countries[index]
        let compareTable = [this.countries]
       

        compareTable[0].splice(index, 1)
        
        for( let i = 0 ; i<highestElement ; i++){
        
            let row = table[i];
      
            let day = row.get('dateRep',0);
           
            let sameDays=[];

       
            for(let elements of compareTable[0]){ //for every countries in compareTable

                for(let subElements of elements){ //for ervery day in that country
                    let index =0;
                      
                        let compare_day = subElements.get('dateRep',0)
                      if(compare_day == day){
                        sameDays.push(subElements);
                        
                        
                      }
                    
                    
                }
               
            }
            this.days.push(sameDays);
            
            
        }

    }




}