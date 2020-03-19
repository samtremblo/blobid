let x = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);  
}

function draw() {
  ellipse(x, height/2, 20, 20);
  x = x + 1;
}