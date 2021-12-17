// Polar Perlin Noise Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/136-polar-perlin-noise-loops.html
// https://youtu.be/ZI1dmHv3MeM
// https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn

let phase = 0;
let zoff = 0;
//let slider;

//ccapture
// const T = 1;
// const NUM_FRAMES = 200;
// var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({
  format:'webm', 
  framerate: 60
});
var btn1;

function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB, 360, 100, 100, 100);
  // slider = createSlider(0, 10, 3, 0.1);
  background(255);

  //CCapture
  btn1 = document.createElement('button');
  btn1.textContent = "save recording";
  document.body.appendChild(btn1);
  btn1.onclick = save_record;
}

function draw() {
  // background(255, 0.5);
  if (frameCount==1) capturer.start(); // start the animation capture
  print(frameCount);
  scale(1.5);
  translate(width / 2, height / 2);
  stroke(random(175, 250), 100, random(100), random(50, 100));
  strokeWeight(random(10));
  noFill();
  beginShape();
  let noiseMax = 10;
  for (let a = 0; a < TWO_PI; a += radians(5)) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.003;
  zoff += 0.01;

  capturer.capture(document.getElementById('defaultCanvas0')); 
  if (frameCount==2400){
    save_record();
  }
}

function save_record() {
  capturer.save();
}