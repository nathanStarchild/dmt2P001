let soundf;
let fr = 0;

let gradients;
let pos, colors;
const moveSpeed = 0.9;
const moveScale = 900;
const moveStrength = 1200;
let traffic;


let gradients2;
let pos2, colors2;
const moveSpeed2 = 2;
const moveScale2 = 800;
const moveStrength2 = 800;
let busy;

let blobss;
let zoom = 30;
let speed = 20;

let gracedient;
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

let l;

let xx = 0
let yy = 100
let vv = 200

let modifier =0.5

let graceSlider, trafficSlider, busySlider, trafficSlider2, busySlider2;
let gTrans, bTrans, tTrans, bCount, tCount;
let button;
let canv;

function preload() {
  soundf = loadSound('soundfile.mp4');
}

function setup() {
  canv = createCanvas(800, 800);//, WEBGL);
  canv.parent('#p5Sketch');
  traffic = createGraphics(800, 800);
  busy = createGraphics(800, 800);
//   blobss = createGraphics(800, 800);
  gracedient = createGraphics(800, 800);
  resizeIt();

  background(0);
  noStroke();
//   soundf.loop();

  colors = [
    color(0),
    color(255),
    color(0,130,70),
    color(0,89,120),
    color(1,250,240)
  ];
  pos = [];
  gradients = [
    lerpGradient(colors[0], colors[1]),
    lerpGradient(colors[1], colors[2]),
    lerpGradient(colors[2], colors[3]),
    lerpGradient(colors[3], colors[4]),
    lerpGradient(colors[4], colors[0])
  ];
  //print(gradients);
  for (let i = 0; i < 300; i++) {
    pos.push({
      x: random(width),
      y: random(height),
      gradient: gradients[floor(random(gradients.length))],
      c: random(),
      step: random()
    });
  }

  colors2 = [
    color(255,12,0),
    color(230,0,0),
    color(240,130,130),
    color(240,249,12),
    color(1,250,240)
  ];
  pos2 = [];
  gradients2 = [
    lerpGradient(colors2[0], colors2[1]),
    lerpGradient(colors2[1], colors2[2]),
    lerpGradient(colors2[2], colors2[3]),
    lerpGradient(colors2[3], colors2[4]),
    lerpGradient(colors2[4], colors2[0])
  ];
  //print(gradients);
  for (let i = 0; i < 600; i++) {
    pos2.push({
      x: random(width),
      y: random(height),
      gradient: gradients2[floor(random(gradients2.length))],
      c: random(),
      step: random()
    });
  }


  l = height/2


//   graceSlider = createSlider(0, 255, 0, 1);
//   trafficSlider = createSlider(0, 255, 0, 1);
//   trafficSlider2 = createSlider(0, pos.length, 0, 1);
//   busySlider = createSlider(0, 255, 0, 1);
//   busySlider2 = createSlider(0, pos2.length, 0, 1);

  button = createButton('start Sound');
//   button.position(19, 19);
  button.mousePressed(startSound);
  button.parent("#buttons")
}

function resizeIt() {
    let w = select('#p5Sketch').width;
    resizeCanvas(w, w, true);
}

function windowResized() {
    resizeIt();
}

function draw() {
    automation();
    // fr++;
    background(0);

  //traffic
  ////////////////////////////////
  traffic.background(0, 60);
//   traffic.clear();
  traffic.noStroke();
  for (let i = 0; i < tCount; i++) {
    let p = pos[i];
    let angle = noise(p.x / moveScale, p.y / moveScale) * moveStrength;
    let gradient = p.gradient;
    let c = p.c;
    let pct = map(sin(p.c), -1, 1, 0, 1);
    let x = cos(angle) * moveSpeed + p.x;
    let y = sin(angle) * moveSpeed + p.y;
    traffic.fill(gradient(pct));

    traffic.push();
    traffic.translate(p.x - width / 2, p.y - height / 2, 0);
    // rotateZ(angle - HALF_PI);

    traffic.ellipse(x, y, 8, 400);

    traffic.pop();

    p.c = p.c + p.step * 0.21;
    if (x > width || x < 0 || y > height || y < 0 || random(1) < 0.001) {
      p.x = random(width);
      p.y = random(height);
    } else {
      p.x = x;
      p.y = y;
    }
  }
//   makeTransparent(traffic);
  /////////////////////////////////////////

  //busy
  ///////////////////////////////////

//   busy.clear();
  busy.background(0, 6);
  busy.noStroke();
//   background(0,2);
  for (let i = 0; i < bCount; i++) {
    let p = pos2[i];
    let angle = noise(random(p.x / moveScale2), p.y / moveScale2) * moveStrength2; 
    let gradient = p.gradient;
    let c = p.c;
    let pct = map(sin(p.c), -1, 1, 0, 1); 
    let x = cos(angle) * moveSpeed2 + p.x;
    let y = sin(angle) * moveSpeed2 + p.y;
    busy.fill(gradient(pct));
    
    busy.push();
    busy.translate(p.x - width / 2, p.y - height / 2, 0);
    // rotateZ(angle - HALF_PI);
    // cone(4,10);
    let s = map(noise(i, frameCount/speed), 0, 1, 0, 25)
    let s2 = map(noise(i+20, frameCount/speed), 0, 1, 0, 25)
    busy.ellipse(x, y, s2, s);
    busy.pop();
    
    p.c = p.c + p.step * 0.25;
    if (x > width || x < 0 || y > height || y < 0 || random(1) < 0.001) {
      p.x = random(width);
      p.y = random(height);
    } else {
      p.x = x;
      p.y = y;
    }
  }
//   makeTransparent(busy);

  //blobss
  /////////////////////////////////////////
//   blobss.background(0);
//   blobss.loadPixels();
//   push();
//   colorMode(HSB, 255);
//   for (let j=0; j<blobss.height; j++) {
//     for (let i=0; i<blobss.width; i++) {
//       let r = map(noise(i/zoom, j/zoom, frameCount/speed), 0, 1, 0, 256*1.5);
//       let c = color(r%256, 255, 255)
//       console.log(c);
//       blobss.pixels[i+j*blobss.width] = c;
//     }
//   }
//   blobss.updatePixels();
//   pop();
  ////////////////////////////////////////


  //gracedient
  /////////////////////////////////////////////////////////////////////
   xx = xx  + 0.1;
   if (xx > width) {
     xx = 0;
   }
  
   yy = yy - 1;
 b=255*sin(PI*yy/1000)
  vv = vv - 1;
 
   l += modifier;
   if (l < 0) {
     modifier *= -1;
   }
  if (l>255){
     modifier*= -1;
   }
  
 p=255*sin(PI*vv/1000)
  
  // print(p)
   //c = color('hsl(160, 60%, 50%)');
  //c = color('hsb(180, 100%, 300%)');
 
   // Define colors
   b1 = color(247, 30, 237, b);//white
   b2 = color(247, 175, 23,b);//orange
   c1 = color(255, b, l, 30);
   c2 = color(80 ,l,255,p);//blue
   c4 = color(180,p, 110,p) //green - pink
   // Background
   setGradient(0, 0, width , height, b1, b2, X_AXIS);
   setGradient(width , 0, width / 2, height, b2, b1, X_AXIS);
  
   setGradient(0, 0, width, height, c1, c2, Y_AXIS);
  setGradient(0, 0, width, height, c2, c4, X_AXIS);
  ///////////////////////////////////////////////////////

//   image(blobss, 0, 0);

push();
tint(255, gTrans);
blendMode(BLEND);
image(gracedient, 0, 0);
blendMode(SCREEN);
  tint(255, tTrans);
  image(traffic, 0, 0);
  tint(255, bTrans);
  image(busy, 0, 0);
  pop();

//   ellipse(100, 100, 20, 20);
}

function lerpGradient(c1, c2) {
  let generatedCalculation = function(v) {
    return lerpColor(c1, c2, v);
  };
  return generatedCalculation;
}

function mousePressed() {
//   for (let i = 0; i < pos.length; i++) {
//     pos[i].x = random(width);
//     pos[i].y = random(height);
//     pos[i].c = random();
//     pos[i].step = random();
//   }
    console.log((millis() - fr) / 1000);
}


function setGradient(x, y, w, h, c1, c2, axis) {
    gracedient.noFill();
  
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
       let c = lerpColor(c1, c2, inter);
        gracedient.stroke(c);
        gracedient.line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        gracedient.stroke(c);
        gracedient.line(i, y, i, y + h);
      }
    }
  }

function makeTransparent(pgr) {
    pgr.loadPixels();
    pgr.pixels.map(c => {
        if (c == color(0)) {
            return color(0, 0);
        }
        return c;
    })
}

function startSound() {
    soundf.loop();
    fr = millis();
}

function automation() {
    let t = (millis() - fr) / 1000;
    if (t < 21) {
        gTrans = min(map(t, 0, 3, 0, 255), 255);
        tTrans = map(t, 0, 21, 0, 120);
        tCount = map(t, 0, 21, 0, 12);
        bTrans = 0;
        bCount = 0;
    } else if (t < 40) {
        tTrans = map(t, 21, 40, 120, 180);
        tCount = map(t, 21, 40, 12, 60);
        bTrans = map(t, 21, 40, 0, 255);
        bCount = map(t, 21, 40, 0, 30);
        gTrans = min(map(t, 35, 40, 255, 160), 255);
    } else if (t < 66) {
        tTrans = map(t, 40, 66, 180, 255);
        tCount = map(t, 40, 66, 60, 150);
        bCount = map(t, 40, 66, 30, 300);
        gTrans = map(t, 40, 66, 160, 120);
    } else if (t < 77) {
        tCount = map(t, 66, 77, 150, 300);
        bCount = map(t, 66, 77, 300, 600);
        gTrans = map(t, 66, 77, 120, 0);
    } else if (t < 95) {
        tCount = map(t, 77, 95, 300, 250);
        bCount = map(t, 77, 95, 600, 450);
    } else if (t < 113) {
        tCount = map(t, 95, 113, 250, 100);
        bCount = map(t, 95, 113, 450, 200);
        gTrans = map(t, 95, 113, 0, 180);
    } else if (t < 117) {
        tCount = map(t, 113, 117, 100, 0);
        bCount = map(t, 113, 117, 200, 0);
        gTrans = map(t, 113, 117, 180, 250);

    }
}