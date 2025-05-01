import { colors } from '../utils/theme.js';
import { Cat } from '../cat.js';
import { buttonS } from '../utils/theme.js';
import { MyButton } from '../utils/components.js';
import { Arrow } from '../components/Arrow.js';
import { ControlPanel } from '../components/controlPanel.js';


export default function GameScene() {
  let cat;
  let runButton;
  let blocks;
  let steps;
  let loops;

  this.name = "GameScene";

  this.setup = () => {
    cat = new Cat(width / 6, height - 167.5, 150);

    runButton = new MyButton({
      x: width / 32 * 28.5,
      y: height / 32,
      text: "run >>",
      mode: "CORNER",
      style: buttonS,
      onPress: () => {
        console.log("Run button pressed");
      }
    });

    blocks = new ControlPanel({
      name: 'building blocks',
      x: width / 32 * 7,
      y: height / 32,
      numBoxes: 3
    });

    steps = new ControlPanel({
      name: 'steps',
      x: width / 32 * 12,
      y: height / 32,
      numBoxes: 6
    });

    loops = new ControlPanel({
      name: 'loop',
      x: width / 32 * 21,
      y: height / 32,
      numBoxes: 4
    })

  };

  this.draw = () => {
    background(colors.primary);

    fill(colors.tertiary);
    textSize(128);
    stroke(colors.secondary);
    strokeWeight(7);
    textAlign(LEFT, TOP);
    text('lvl.3', width / 32, height /32 - 4);

    // Ground
    rectMode(CENTER);
    fill(colors.secondary);
    rect(width / 2, height - 100 / 2, width, 80);

    // Sprite
    cat.draw();
    runButton.draw();
    blocks.draw();
    steps.draw();
    loops.draw();

  };

  this.onResize = () => {
    cat.setPosition(width / 2, height - 177.5);
    runButton.setPosition((width / 16) * 15, height / 16);
    blocks.setPosition(width / 32, height / 32);
    steps.setPosition((width / 32) * 4, height / 32);
  }
}
