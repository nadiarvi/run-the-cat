import { colors } from './utils/theme.js';
import { Arrow } from './components/Arrow.js';
import StartScene from './scenes/startScene.js';
import GameScene from './scenes/gameScene.js';

let mgr;

function setup(){
    createCanvas(windowWidth, windowHeight);
    textFont('Pixelify Sans', 'sans-serif');
    textAlign(CENTER);
    textSize(128);

    mgr = new SceneManager();
    mgr.addScene(StartScene);
    mgr.addScene(GameScene);
    mgr.showScene(GameScene);
};

function draw(){
    background(colors.primary);
    mgr.draw();
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  mgr.handleEvent('onResize');
};


function mousePressed(){
    mgr.handleEvent('mousePressed');
};

function preload(){
    Arrow.preload();
}

function keyPressed(){
    mgr.handleEvent('keyPressed');
}


window.setup = setup;
window.draw = draw;
// window.windowResized = windowResized;
window.mousePressed = mousePressed;
window.preload = preload;
window.keyPressed = keyPressed;