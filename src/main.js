import { colors } from './utils/theme.js';
import { Arrow } from './components/Arrow.js';
import { ClickableArrow } from './components/ClickableArrow.js';
import StartScene from './scenes/startScene.js';
import GameScene from './scenes/gameScene.js';
import Level1 from './scenes/lvl1.js';
import Level2 from './scenes/lvl2.js';
import Level3 from './scenes/lvl3.js';

let mgr;

function setup(){
    createCanvas(windowWidth, windowHeight);
    world.gravity.y = 50;
    textFont('Pixelify Sans', 'sans-serif');
    textAlign(CENTER);
    textSize(128);

    mgr = new SceneManager();
    mgr.addScene(StartScene);
    mgr.addScene(Level1);
    mgr.addScene(Level2);
    mgr.addScene(Level3);

    mgr.showScene(Level3);
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

