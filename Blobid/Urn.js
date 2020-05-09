class Urn {

    constructor(){

        this.elements = [];
        this.picks = [];

        this.size = 0 ;
        
    }


    fillArray(array){
        this.elements = array;
        this.size = this.elements.length;
        console.log('urn content : ' , this.elements);
        console.log('urn size : ' , this.size);
    }

    pick(){
        let samePick = true    
        let  pick; 

        while( samePick == true){

        pick = int(random(this.size));
        console.log('PICK : ' , pick)

        samePick =  this.comparePicks(pick);
        console.log(samePick);

        }

        let pickedElement = this.elements[pick];
        console.log("PUSHEED")
        this.picks.push(pick);

        this.verifyAllPicks();
        return pickedElement;

    }

    resetUrn(){
        this.picks = [];

    }

    verifyAllPicks(){
        if( this.size == this.picks.length ){
            console.log('elements all picked');
            this.resetUrn();
        }

        
    }

    
    comparePicks(pick){
     let samePick = false ; 
        if(this.picks.length < 1){
            console.log('Empty array. First pick') 
        }else{

         for(let element in this.picks){

            if(pick == this.picks[element]){
                samePick = true;
            }
           
        }

     }

     return samePick ;
    }
}