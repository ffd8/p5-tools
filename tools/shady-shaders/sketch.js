let mode = 0;

let rand, songs; //music
let hs, ip, tm, Tfont; //songs

let col; //color title
let sLayer, aLayer, bLayer;
let songMenu;
let theShader;
let newShader;
let newestShader;


let slider1;
let slider2;
let slider3;
let slider4;
let slider5;

let button2 = false;
let button3 = false;

let useStep = true;
let bouncy = false; //tf
let vol;
let input;

let custom = false;
let defalutText = "The philosophical remarks in this book are, \nas it were, a number of sketches of landscapes \nwhich were made in the course of these long \nand involved journey ings. \nThe same or almost the same points were always being approached \nafresh from different directions, and new sketches made. \nVery many of these were badly drawn or uncharacteristic, \nmarked by all the defects of a weak draughtsman. And when they were rejected a number of tolerable ones \nwere left, which now had to be arranged and sometimes cut down, so that if \nyou looked at them you could get a picture of the landscape. \nThus this book is really only an album.";

let button4 = true;
let discoButt = true;

//let useStepD = true;

let t1; 
let t2 = "shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders - shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -shady shaders -"

let songNames = ['infinity 2008', "80's vampire car chase", "Cha-cha", "Non più andrai"];
let songLoc = ["assets/infinity-2008.mp3", "assets/80_s_Vampire_Car_Chase.mp3", "assets/ChaCha_Fontanez.mp3", "assets/Non_Piu_Andrai_comp.mp3"];
let songFiles = [];

function preload() {

	font = loadFont("assets/neue-bold.otf")
	font2 = loadFont("assets/neue-regular.otf")
	shady = loadImage ("assets/shady.png");
	shady2 = loadImage ("assets/shady_2.png");


	for (let s of songLoc)
	{
	songFiles.push(loadSound(s));
	}

    star = loadImage("assets/star.png");
	theShader = loadShader("romance.vert", "romance.frag");
	newShader = loadShader("displacement.vert","displacement.frag");
	newestShader = loadShader("shader3.vert", "shader3.frag");

}
	///////////////////	
	///////////////////
	///////////////////
	///////////////////
	///////////////////	

function setup() {
	createCanvas(windowWidth, windowHeight);
	setupAudio();
	
	sLayer = createGraphics(1080, 720, WEBGL);
	sLayer.pixelDensity(1);

	aLayer = createGraphics(1080, 720);
	bLayer = createGraphics(1080, 720);

	angleMode(DEGREES);
	
	slider1= createSlider(2,9,5);
	slider1.size(80, 10)
  
	slider2= createSlider(0,1,0);
	slider2.position(0,20);
  
	slider3= createSlider(0,1,0,.1);
	slider3.size(80, 20);

	slider4= createSlider(0.1,0.9,.3,.1);
	slider4.position(0,60);

	slider5= createSlider(1, 8, 5);
	slider5.position(0,60);
	slider5.size(80, 20);


	///////////// video
	cam = createCapture(VIDEO);
	cam.size(width, height);
	cam.hide();


	//////// song menu
	songMenu = createSelect();
	songMenu.position(width*.04, height*.23);
	songMenu.option('choose the song!', -1);

	for(let i=0; i< songNames.length; i++){
		songMenu.option(songNames[i], i);
	}

	songMenu.changed(songMenuFunc);


	///////////////////	
	//////////buttons

	/////// chaos
	chaos = new Clickable(); //Create button
	
	
		chaos.text = "chaos"
		chaos.color = "#F3F3F3"; //Change button color
		chaos.textColor = "#000000"
		chaos.height = 20;
		chaos.width = 55;
		chaos.cornerRadius = 50;
		chaos.stroke = "#F3F3F3"
	

		chaos.onPress = function() {
			if (button2 == true) {
				chaos.text = "chaos";
			} else if (button2 == false) {
				chaos.text = "tidy";
			}
			chaos.color = "#F3F3F3"
			chaos.stroke = "#F3F3F3"
			button2 = !button2;
	}

	/////// custom text
	customText = new Clickable(); //Create button
	
		customText.text = "custom text"
		customText.color = "#F3F3F3"; //Change button color
		customText.textColor = "#000000"
		customText.height = 20;
		customText.width = 90;
		customText.cornerRadius = 50;
		customText.stroke = "#F3F3F3"
	

		customText.onPress = function() {
			
			input.show()

			if (custom == true) {
				customText.text = "default text";
				button4 = !button4;
				input.hide();

			}
			else if (custom == false) {
				customText.text = "custom text";
				button4 = !button4;
			}
			custom = !custom;

	}

	/////// volSet
	volSet = new Clickable(); //Create button
	
	
	volSet.text = "volume on | off";
	volSet.color = "#F3F3F3"; //Change button color
	volSet.textColor = "#000000"
	volSet.height = 20;
	volSet.width = 100;
	volSet.cornerRadius = 50;
	volSet.stroke = "#F3F3F3"
	
	volSet.onPress = function() {
		if (button3 == false) {
			volSet.text = "vol | on";
			vol = 1000;
		} else if (button3 == true) {
			volSet.text = "vol | off";
			vol = 2000;
		}
		volSet.color = "#C7C7C7"
		volSet.stroke = "#C7C7C7"
		volSet.width = 60
		button3 = !button3;
	}

	//////romance
	indie = new Clickable(); //Create button

	indie.onHover = function() {
		indie.color = "#00FFFF"; //Change button color
		indie.textColor = "#000000";
		indie.height = 30;
		indie.width = 100;
		indie.cornerRadius = 50;
		indie.stroke = "#00FFFF"
	}

	indie.onOutside = function() {
		indie.text = "bad romance";
		indie.color = "#202020"; //Change button color
		indie.textColor = "#FFFFFF"
		indie.height = 30;
		indie.width = 100;
		indie.cornerRadius = 50;
		indie.stroke = "#00FFFF"

	}

	indie.onPress = function() {
		mode = 2;
	}

	faded = new Clickable(); //Create button

	faded.onHover = function() {
		faded.color = "#00FFFF"; //Change button color
		faded.textColor = "#000000";
		faded.height = 30;
		faded.width = 80;
		faded.cornerRadius = 50;
		faded.stroke = "#00FFFF";
	}

	faded.onOutside = function() {
		faded.text = "faded";
		faded.color = "#202020"; //Change button color
		faded.textColor = "#FFFFFF"
		faded.height = 30;
		faded.width = 80;
		faded.cornerRadius = 50;
		faded.stroke = "#00FFFF"

	}

	faded.onPress = function() {
		mode = 4;
	}

	//////black widow
	jazzpop = new Clickable(); //Create button
	
	//This function is ran when the clickable is NOT hovered.
	jazzpop.onHover = function() {
		jazzpop.color = "#00FFFF"; //Change button color
		jazzpop.textColor = "#000000"
		jazzpop.height = 30;
		jazzpop.width = 100;
		jazzpop.cornerRadius = 50;
		jazzpop.stroke = "#00FFFF"

	}
	jazzpop.onOutside = function() {
		jazzpop.text = " black widow";
		jazzpop.color = "#202020"; //Change button color
		jazzpop.textColor = "#FFFFFF"
		jazzpop.height = 30;
		jazzpop.width = 100;
		jazzpop.cornerRadius = 50;
		jazzpop.stroke = "#00FFFF"
	}
	jazzpop.onPress = function() {
		mode = 1;
	}


	/////// sharpness
	sharp = new Clickable(); //Create button
	
		sharp.text = "sharpness"
		sharp.color = "#F3F3F3"; //Change button color
		sharp.textColor = "#000000"
		sharp.height = 20;
		sharp.width = 70;
		sharp.cornerRadius = 50;
		sharp.stroke = "#F3F3F3"
	

		sharp.onPress = function() {

		if (useStep == true) {
			sharp.text = "sharp | on";
		} else if (useStep == false) {
			sharp.text = "sharp | off";
		}
		sharp.color = "#C7C7C7"
		sharp.stroke = "#C7C7C7"
		useStep = !useStep;
	}

	disco = new Clickable(); //Create button
	
	disco.text = "lounge"
	disco.color = "#F3F3F3"; //Change button color
	disco.textColor = "#000000"
	disco.height = 20;
	disco.width = 70;
	disco.cornerRadius = 50;
	disco.stroke = "#F3F3F3"


	disco.onPress = function() {

	if (discoButt == true) {
		disco.text = "disco";
	} else if (discoButt == false) {
		disco.text = "lounge";
	}
	disco.color = "#C7C7C7"
	disco.stroke = "#C7C7C7"
	discoButt = !discoButt;
}

	//////// input text // new pop
	input = createInput();
	input.size(80, 10)
	input.position(width*.04, height/2+10)


	/////original location
	jazzpop.locate(width / 2 - 50, height / 2 + 50); //Position Button
	indie.locate(width / 2 -50, height / 2); //Position Button
	faded.locate(width / 2 -42, height / 2+100); //Position Button
}

	///////////////////	
	///////////////////
	///////////////////
	///////////////////
	///////////////////	draw

function draw() {
	
	background(20);
	updateAudio();

	indie.draw();
	jazzpop.draw();
	faded.draw();

	if(mode == 0) {
		standard();
	}

	if (mode == 1) {
		newPop();
	}
	if(mode == 2) {
		romance();
	}
	if (mode == 4) {
		fadeShade();
	}

	image(sLayer,width*.24,height*.1, sLayer.width*.93, sLayer.height*.93);

}

	///////////////////	
	///////////////////
	///////////////////
	///////////////////
	///////////////////	standard

function standard() {

	//background(20, 5)

	slider1.hide();
	slider2.hide();
	slider3.hide();
	slider4.hide();
	slider5.hide();
	songMenu.hide();
	input.hide();

	col = map(noise(frameCount * .06), -1, 1, 50, 255);
	col2 = map(noise(frameCount * .1), -1, 1, 20, 255);
	col3 = map(noise(frameCount * .2), -1, 1, 5, 255);


	textFont(font);
	textSize(20);

	fill(col3)

	textFont(font2);

	fill(255);
	textSize(15);
	text("choose a music genre:", width / 2, height/2-45)
	
	
	push()
	let scl = .02
	imageMode(CENTER)
	translate(width/2, height/2+20)
	rotate(frameCount/4)
	image (shady2, 0, 0, 400, 400);
	pop()
	push()
	imageMode(CENTER)
	blendMode(EXCLUSION)
	translate(width/2, height/2)
	rotate(-frameCount/4)
	image (shady2, 0, 0, 700, 700);
	pop()
	push()
	imageMode(CENTER)
	translate(width/2, height/2)
	rotate(frameCount/10)
	image (shady2, 0,0, 1000, 1000);
	pop()
	push()
	imageMode(CENTER)
	translate(width/2, height/2)
	rotate(frameCount/10)
	image (shady2, 0,0, 1500, 1500);
	pop()

}

	///////////////////	
	///////////////////
	///////////////////
	///////////////////
	/////////////////// shader1

function romance() {

/////WEBGL layer for the shader
  sLayer.shader(theShader);

  theShader.setUniform("tex0", cam); //input image
  theShader.setUniform('micVol', ampEase/1000); //resolution
  theShader.setUniform('slider01', slider1.value()); //scale
  theShader.setUniform('useStep', useStep); //framecount
  theShader.setUniform('bounce', bouncy);
  theShader.setUniform('slider03', slider3.value()); //scale

  sLayer.rect (0,0,width,height);

////drawing the buttons and sh*t

	slider1.show();	
	slider3.show();
	slider5.hide()		
	slider4.hide();
	input.hide()

	sharp.draw();

	jazzpop.locate(width*.04, height / 2 + 70);
	indie.locate(width*.04, height / 2 + 20);
	faded.locate(width*.04, height/2+120)

	songMenu.show();

	image(star, width*.12, height / 2 + 21, 20, 20)
	fill(255);
	
	
	fill(255);
	textAlign(LEFT);
	textSize(35);
	textFont(font);
	t = text("shady* \nshaders", width*.04, height*.14);

	
	

	textFont("sans-serif")
	textSize(10);
	
	sharp.locate(width*.04, height*.4);
	slider1.position(width*.04, height*.3)
	slider3.position(width*.04, height*.35)	
	text("blue?", width*.04, height*.28)
	text("or pink?", width*.08, height*.28)

	text("feeling lazy?", width*.04, height*.34)
	textSize(12);
	text("switch between filters:", width*.04, height/2-10);
}


	///////////////////	
	///////////////////
	///////////////////
	///////////////////
	///////////////////	shader2

function newPop()
{
	//chaos/tidy
	if (button2) //clear
	{

		aLayer.push();
		aLayer.background(0,95);
		aLayer.fill(200);
		aLayer.noStroke();
		aLayer.textSize(120);
		aLayer.textLeading(80);
		
		if (!button4)
		{
		for (let i=0;i<10;i++)
		{
		let shaderText = lyrics();
		shaderText = shaderText+ shaderText + shaderText+ shaderText+ shaderText+ shaderText + shaderText+ shaderText+ shaderText+ shaderText;

			if (button3)
		{
			aLayer.text(shaderText, width/2 *waveform[i] *.05 , 100);
		} else if (!button3)
		{
			aLayer.text(shaderText, width*.2 *waveform[i] *.02, 100);
				}
		}
		}

		else if (button4)
		{
	
			if (button3)
		{
			aLayer.text(defalutText, width/2 * waveform[i] *.05 , 100);
		} else if (!button3)
		{
			aLayer.text(defalutText, width*.2 * waveform[i] *.02, 100);
		}
		}
		aLayer.pop();

	} else if (!button2) //chaos
	{
		let shaderText = lyrics();
		aLayer.push();
		aLayer.background(0,50);
		aLayer.fill(200);
		aLayer.noStroke();
		aLayer.textSize(50);
		aLayer.textLeading(50);

		if (frameCount%2 == 0)
		{
		if (!button4)
		{
			for (let i=0;i<fft.length;i++)
			{
			aLayer.text(shaderText, waveform[i]*500 ,fft[i]*4);
			}
		}
		else if (button4)
		{
			for (let i=0;i<fft.length;i++)
			{
			aLayer.text("a number of sketches of landscapes", waveform[i]*500 ,fft[i]*4);
			}
		}
	}
		aLayer.pop();
	}

	
	sLayer.shader(newShader);
	///vol on | off
	let shaderVol = ampEase/vol;

	// passing cam as a texture
	newShader.setUniform("tex0", cam); //input image
	newShader.setUniform('tex1', aLayer);
	newShader.setUniform('micVol', ampEase); //resolution ampEase/1000
	newShader.setUniform('amt', slider4.value());

	sLayer.rect(0,0,width,height);
  
	
		///drawing buttons and sh*t
		chaos.draw();
		chaos.locate(width*.04, height*.34);

		volSet.draw();
		volSet.locate(width*.085, height*.34);

		slider4.show();
		slider4.position(width*.04, height*.3);
		slider4.size(80,10)
		slider1.hide();
		slider3.hide();
		slider5.hide()

		customText.draw()
		customText.locate(width*.04, height*.38)
		//input.show();
		input.position(width*.04, height*.41)

		songMenu.show();

		jazzpop.locate(width*.04, height / 2 + 70);
		indie.locate(width*.04, height / 2 + 20);
		faded.locate(width*.04, height/2+120)

	image(star, width*.12, height / 2 + 71, 20, 20)

	fill(255);
	textAlign(LEFT);
	textSize(35);
	textFont(font);
	t = text("shady* \nshaders", width*.04, height*.14);

	textFont("sans-serif");
	textSize(10);
	text("texty?", width*.04, height*.28)
	text("shapey?", width*.08, height*.28)

	textSize(12);
	fill(255);
	text("switch between filters:", width*.04, height/2-10);


	textFont("sans-serif", "bold");
	textSize(12);
	fill(0, 255, 255);
}


	///////////////////	
	///////////////////
	///////////////////
	///////////////////
	///////////////////	shader 3

function fadeShade(){

	slider1.hide();
	slider2.hide();
	slider3.hide();
	slider4.hide();
	slider5.show();

	sLayer.shader(newestShader);

	newestShader.setUniform("tex0", cam); //input image
	newestShader.setUniform('micVol', ampEase/1000);
	newestShader.setUniform('intensity', slider5.value());
	newestShader.setUniform('volOn', discoButt);

	sLayer.rect (0,0,width,height);
  
	
	  ////drawing the buttons and sh*t
		disco.draw()
		disco.locate(width*.04, height*.34);

		songMenu.show();

		image(star, width*.11, height / 2 + 121, 20, 20)
		
			jazzpop.locate(width*.04, height / 2 + 70);
			indie.locate(width*.04, height / 2 + 20);
			faded.locate(width*.04, height/2+120)


			slider5.show()
			slider5.position(width*.04, height*.3)


	fill(255);
	textAlign(LEFT);
	textSize(35);
	textFont(font);
	t = text("shady* \nshaders", width*.04, height*.14);
	textFont("sans-serif");
	textSize(10);
	text("bit chill", width*.04, height*.28)
	text("more bouncy:", width*.08, height*.28)

	textSize(12);
	fill(255);
	text("switch between filters:", width*.04, height/2-10);

}

function songMenuFunc() {

	for(let i=0; i< songNames.length; i++){
		songFiles[i].stop();
	}

	if(songMenu.value() >= 0){
		songFiles[songMenu.value()].play();
		songFiles[songMenu.value()].playMode('untilDone');
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function lyrics() {

		let txt = input.value() + "\n";

		if (txt.length >= 1000) {
		txt = "hi";
		input.value("");	
		}

	return txt;
}

	///////////////////	
	///////////////////
	///////////////////
	///////////////////
	///////////////////	Audio
let mic, fftRaw, fft, waveform, amp = 0.0,
	ampStereo = {
		l: 0.0,
		r: 0.0
	},
	ampEase = 0.0,
	numBins = 512,
  bands = 12;

function setupAudio() {
	userStartAudio();
	mic = new p5.AudioIn();
	mic.start();
	fftRaw = new p5.FFT(0.75, numBins);
	fftRaw.setInput(mic);
}

function updateAudio() {
	fftRaw.analyze();
	amp = mic.getLevel() * 1000; // average mixed amplitude
	ampStereo.l = mic.amplitude.getLevel(0) * 500; // average left amplitude
	ampStereo.r = mic.amplitude.getLevel(1) * 500; // average right amplitude
	ampEase = ease(amp, ampEase, 0.075); // smooth 'amp'
	waveform = fftRaw.waveform(); // array (-1, 1)
	fft = fftRaw.logAverages(fftRaw.getOctaveBands(bands)); // array (0, 255)
}

	///////////////////	
	///////////////////
	///////////////////
	///////////////////
	///////////////////	custom p5live & p5-tool functions
function ease(iVal, oVal, eVal){
	let targetX = iVal;
	let dx = targetX - oVal; 
	return oVal += dx * eVal;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

var credits = { 
    "names" : [ 
        "Annalisa.Savin" // link to website if you have it <a href="URL" target="_blank">first.lastname</a> 
        ,"Lena.Frei" 
    ] 
	,"class" : "MA"
    ,"description" : "Shady*shaders is a small collection of unusual audio-reactive webcam filters. The filters are based on shaders (GLSL), which give you much more freedom in manipulating pixels. The language used within a shader is designed to directly talk to the GPU of the computer, so the results are easy and fast too process for the machine. The parameters we played with are many math functions, that influenced the behavior of the colors, the position of the pixels and the textures, according to the music that is currently playing. Have fun! :)" 
}

function saveFrame(toolName){ 
    let timestamp = (new Date()).toISOString().replace(/[^0-9]/g, '').slice(0, -3); 
    let filename = toolName + '_' + timestamp + '.png'; 
    // filename = toolName + '.png'; // uncomment to remove timestamp from name 
    sLayer.save(filename); 
}