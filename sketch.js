let file, file2;

let hueValue = 0;
let num = 45; // Number which will later interact with framerate
let mx = []; // Empty array to later store mouseX values
let my = []; // Empty array to later store mouseY values
let r, g, b; // Init variables for random rgb values for fill
let q, w, e; // Init variables for random rgb values for stroke

let o = true; // Boolean which acts as a toggle between canvas modes
let controls = true; // Boolean used to initially display controls
let rectangle = true; // Toggle switch for whether rect or ellise is drawn

function setup() {
  let canvas = createCanvas(1250, 750);
  canvas.parent('trail');

  frameRate(60);
  //colorMode(HSB, 360, 100, 100)

  if (!o) {
    // If this boolean is false, the background is drawn in the setup
    background(50);
  }

  file = loadSound("transition-windy.wav", soundLoaded);
  file2 = loadSound("startup.wav", soundLoaded);

  file.amp(0.01);
  file2.amp(0.03);
}

function soundLoaded() {
  file2.play();
}

function draw() {
  //hueValue = (hueValue + 1 ) % 360;
  
  if (o) {
    // If this boolean is true, the background is drawn in the draw function
    background(50);
  }

  if (controls === true) {
    textSize(26);
    fill(255);
    stroke(0);
    text("Click mouse to change color", 60, 50);
    text("Press 'Space Bar' to toggle canvas mode", 60, 90);
    text("Press 'S' to change shape", 60, 130);
  }

  let which = frameCount % num; // Calculate the current frame count modulo num and store it in 'which'
  mx[which] = mouseX;
  my[which] = mouseY;

  stroke(r, g, b);
  strokeWeight(4);
  fill(q, w, e);
  //fill(hueValue, 100, 100)
  //stroke(hueValue, 100, 100)


  for (let i = 0; i < num; i++) {
    // Start a loop that iterates 'i' from 0 to 'num - 1'
    let index = (which + 1 + i) % num; // Calculate an 'index' based on 'which', 'i', and 'num'
    if (rectangle) {
      rectMode(CENTER);
      rect(mx[index], my[index], i, i);
    } else if (!rectangle) {
      ellipse(mx[index], my[index], i, i);
    }
  }
}

function mousePressed() {
  q = random(0, 255);
  w = random(0, 255);
  e = random(0, 255);

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);

  file2.play();
}

function keyPressed() {
  //I need this timeout because the background was switching to being drawn in setup BEFORE the controls were erased, this is to give the background in the draw function a few milliseconds to erase the text before switching to setup//
  if (key === " ") {
    setTimeout(function () {
      o = !o;
    }, 20);
    controls = false;
  }

  if (key === "s" || key === "S") {
    rectangle = !rectangle;
  }
}
