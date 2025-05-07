import { colors } from './utils/theme.js';
import { Arrow } from './components/Arrow.js';
import StartScene from './scenes/startScene.js';
import GameScene from './scenes/gameScene.js';
import { ClickableArrow } from './components/ClickableArrow.js';

let mgr;

function setup(){
    createCanvas(windowWidth, windowHeight);
    console.log(`window size: ${windowWidth}x${windowHeight}`);
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

    // custom event handler, manually called
    // mgr.handleEvent('keyPressing');
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
    ClickableArrow.preload();
}

function keyPressed(){
    mgr.handleEvent('keyPressed');
}


window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.preload = preload;
window.keyPressed = keyPressed;

