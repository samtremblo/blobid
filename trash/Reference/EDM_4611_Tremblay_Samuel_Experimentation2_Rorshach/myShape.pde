public class myShape {
  public int shapeHandles = int(random(5, 9)); // amount of vertex in the shape
  public float theta = 0.0; // initiating the oscillation
  private PVector[] shapeVectors = new PVector[shapeHandles];// initiating the array of vertex



  public void initiate() {
    // creating a random value of the x and y value of each vertex
    noStroke();
    strokeWeight(0);
    for (int i = 0; i<shapeHandles; i++) {
      shapeVectors[i] = new PVector();
      shapeVectors[i].x = random(-100, 100);
      shapeVectors[i].y = random(-100, 100);
    }
  }

  public void shapeDraw() {
  //drawing a shape from the vertex and making it mirror
    float mirrorX = map(sin(theta), 0, 255, 0, 255); 

    beginShape();
    fill(0, 0, 0, 1);
    for (int i = 0; i< shapeHandles; i++) {
      curveVertex(shapeVectors[i].x*mirrorX, shapeVectors[i].y);
    }
    endShape(CLOSE);
    theta +=random(.005, .01);
  }
}
