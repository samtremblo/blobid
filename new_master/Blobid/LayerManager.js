class LayerManager{
  
 constructor() 
  {   
  
    this.layers = [];
    
    this.max = 4;
  }
  
  checkMaximum(){

    if(this.layers.length >= this.max){
      this.layers.splice(0,1);
    }

  }


 addLayer(type,data,string,pos){

  this.checkMaximum();

  let l = new Layer(type,data,string,pos);
  this.layers.push(l);

 }

removeLayers(){
  this.layers = []

}
}