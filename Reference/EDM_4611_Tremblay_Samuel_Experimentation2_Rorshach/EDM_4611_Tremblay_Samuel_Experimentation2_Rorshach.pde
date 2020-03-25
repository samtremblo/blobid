// Experimentation 2: rorschach
// By Samuel Tremblay
// www.Samtremblay.com, samtremblay.exe@gmail.com
// press any key to save the image on the canvas


int amountShapes = 5;  // amount of objects being pushed in the shape array
myShape[] shape = new myShape[amountShapes]; // initiating the shape array


void setup() {
  size(800, 800, P3D);
  background(255);

  for (int i = 0; i < amountShapes; i ++) { 
  // Loop calling individual shapes and using their initial function
    shape[i] =  new myShape(); 
    shape[i].initiate();
  }
}

void draw() {
  // drawing every shape on the canvas and moving them so it creates the ink effect
  for (int x = 0; x < amountShapes; x ++) { 
    pushMatrix();
    translate(width/2, height/2, int(random(400, 500)));
    shape[x].shapeDraw();
    popMatrix();
  }
}


void keyPressed() {
  // saving the image at any key pressed
  save("rorschach.png");
}
