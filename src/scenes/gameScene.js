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

  this.name = "GameScene";

  this.setup = () => {
    cat = new Cat(width / 6, height - 167.5, 150);

    runButton = new MyButton({
      x: width / 16 * 15,
      y: height / 16,
      text: "run >>",
      mode: "CENTER",
      style: buttonS,
      onPress: () => {
        console.log("Run button pressed");
      }
    });

    blocks = new ControlPanel({
      name: 'blocks',
      x: width / 32,
      y: height / 32,
      numBoxes: 4
    });

  };

  this.draw = () => {
    background(colors.primary);
    rectMode(CENTER);

    fill(colors.tertiary);
    textSize(128);
    stroke(colors.secondary);
    strokeWeight(7);
    
    text('dan yap', width / 2, height / 2 - 100);

    // Ground
    fill(colors.secondary);
    rect(width / 2, height - 100 / 2, width, 80);

    // Sprite
    cat.draw();
    runButton.draw();
    blocks.draw();

  };

  this.onResize = () => {
    cat.setPosition(width / 2, height - 177.5);
    runButton.setPosition((width / 16) * 15, height / 16);
    blocks.x = width / 16 - 40;
    blocks.y = height / 16 + 8;
  }
}
