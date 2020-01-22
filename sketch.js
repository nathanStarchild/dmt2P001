let dx, dy;
let symmetry;
let myBrush;

function setup() {
	createCanvas(windowWidth, windowHeight);
	dx = 0;
	dy = 0;
	symmetry = 6;
	myBrush = new Brush(5, 5, 1, 0, 0);
}

function draw() {
	let fTime = millis()*60/1000;
	// background(255);
	push();
	fill(255, 0, 255);
	stroke(0, 100, 0);
	translate(width/2.0, height/2.0);

	if (mouseIsPressed){
		if (mouseButton === LEFT){
			iter1(mouseX, mouseY);
		} else {
			dx = mouseX;
			dy = mouseY;
		}

	}

	pop();
}

function iter1(x, y) {
	push()
	for (let i=0; i < symmetry; i++) {
		rotate(2 * PI / symmetry);
		push();
		translate((dx - width/2.0), dy - height/2.0);
		iter2(x, y);
		pop();
	}
	pop();
}

function iter2(x, y) {
	push();
	for (let i=0; i < symmetry; i++) {
		rotate(2 * PI / symmetry);
		myBrush.drawIt(x, y);
	}
	pop();
}

class Brush {
	constructor(a, b, s, bod, stk) {
		this.a = a;
		this.b = b;
		this.strokeSize = s;
		this.colourBody = bod;
		this.colourStroke = stk;
		this.fibOn = false;
		this.fibFactor = 0.1;
		this.alphaBody = 255;
		this.alphaStroke = 255;
		this.keepAlpha = true;
		// this.resetBrush();
	}

	drawIt(x, y) {
		ellipse(x - dx, y - dy, this.a, this.b);
	}
}