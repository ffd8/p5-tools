let layer2d;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL); // set 3d space
	layer2d = createGraphics(width * .4, height * .4); // create 2d layer
	//layer2d.background(255, 255, 0, 50)
	angleMode(DEGREES)
}

function draw() {
	background(255, 255, 0);
	
	orbitControl(5)
	// layer2d.clear();
	layer2d.ellipse(random(width), random(height), 10);
	layer2d.stroke(0, 255, 255)
	layer2d.strokeWeight(5);
	if(mouseIsPressed) {
		layer2d.line(mouseX, mouseY, pmouseX, pmouseY);
	}
	// image(layer2d, 0, 0) // don't draw as boring image

	texture(layer2d); // use as texture for 3d
	noStroke(); // remove lines of 3d

	rotateY(frameCount / 2);
	//plane(layer2d.width, layer2d.height); // 2d like image but rotates
	torus(300, 50);
}