class LayerManager{
  
 constructor() 
  {   
  
    this.layers = [];
    
    this.max = 2;
  }
  
  checkMaximum(){

    if(this.layers.length >= this.max){
      this.layers.splice(0,1);
    }

  }


 addLayer(type,data,string){

  this.checkMaximum();

  let l = new Layer(type,data,string);
  this.layers.push(l);

 }

removeLayers(){
  this.layers = []

}
}