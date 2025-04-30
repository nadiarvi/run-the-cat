import { colors } from '../theme.js';
import { Cat } from '../cat.js';
import { drawRect } from '../utils/draw.js';
import GameScene from './gameScene.js';

export default function StartScene() {
  let cat;
  let button = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  let startButton;

  // this.name = "StartScene";

  this.setup = () => {
    cat = new Cat(width / 2, height - 200, 200);
    
    startButton = new Clickable();

    // Position and mode
    startButton.mode = "CENTER";
    startButton.locate(width/2, height/2 + 50);

    // Size
    startButton.width = 300;
    startButton.height = 75;

    // Visual styling
    startButton.color = colors.tertiary;
    startButton.stroke = colors.secondary;
    startButton.strokeWeight = 3;

    // Text properties
    startButton.text = 'start';
    startButton.textFont = "Pixelify Sans";
    startButton.textSize = 32;
    startButton.textColor = colors.secondary;

    startButton.onPress = () => {
      console.log("press");
      this.sceneManager.showScene(GameScene);
    }
  };

  this.draw = () => {
    background(colors.primary);

    fill(colors.tertiary);
    textSize(128);
    stroke(colors.secondary);
    strokeWeight(7);

    text("rUn ThE cAT!", width / 2, height / 2 - 100);

    // Button
    // fill(colors.tertiary);
    // stroke(colors.secondary);
    // strokeWeight(3);
    // rectMode(CENTER);
    // rect(width / 2, height / 2 + 50, 300, 75, 10);
    // rectMode(CORNER);

    // button.x = width / 2 - 300 / 2;
    // button.y = height / 2 + 50 - 75 / 2;
    // button.width = 300;
    // button.height = 75;

    // fill(colors.secondary);
    // noStroke();
    // textSize(32);
    // text("Start", width / 2, height / 2 + 60);

    // Ground
    fill(colors.secondary);
    rectMode(CENTER);
    rect(width / 2, height - 100 / 2, width, 100);
    rectMode(CORNER);

    // Sprite
    cat.draw();

    // Button
    startButton.draw();
  };

  this.onResize = () => {
    if (cat) {
      cat.setPosition(width / 2, height - 200);
    }
  }
  

  this.mousePressed = function (){
    const x = mouseX;
    const y = mouseY;

    return;

    this.sceneManager.showScene(GameScene);
    
  };

  this.exit = function () {
    if (cat) {
      cat.remove()
    }
  };
  
}
