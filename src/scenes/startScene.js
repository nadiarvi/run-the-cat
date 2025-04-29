import { colors } from '../theme.js';
import { Cat } from '../cat.js';
import GameScene from './gameScene.js';

export default function StartScene() {
  let cat;
  let button = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  // this.name = "StartScene";

  this.setup = () => {
    cat = new Cat(width / 2, height - 200, 200);
  };

  this.draw = () => {
    background(colors.primary);

    fill(colors.tertiary);
    textSize(128);
    stroke(colors.secondary);
    strokeWeight(7);
    
    text('rUn ThE cAT!', width / 2, height / 2 - 100);

    // Button
    fill(colors.tertiary);
    stroke(colors.secondary);
    strokeWeight(3);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 50, 300, 75, 10);
    
    button.x = width / 2 - 300 / 2;
    button.y = height / 2 + 50 - 75 / 2;
    button.width = 300;
    button.height = 75;

    fill(colors.secondary);
    noStroke();
    textSize(32);
    text('Start', width / 2, height / 2 + 60);

    // Ground
    fill(colors.secondary);
    rect(width / 2, height - 100 / 2, width, 100);

    // Sprite
    cat.draw();

  };

  this.onResize = () => {
    if (cat) {
      cat.setPosition(width / 2, height - 200);
    }
  }
  

  this.mousePressed = function (){
    const x = mouseX;
    const y = mouseY;

    if (x < button.x || x > button.x + button.width) return;
    if (y < button.y || y > button.y + button.height) return;

    this.sceneManager.showScene(GameScene);
    
  };

  this.exit = function () {
    if (cat) {
      cat.remove()
    }
  };
  
}
