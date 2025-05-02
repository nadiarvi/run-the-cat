import { colors } from '../utils/theme.js';
import { Cat } from '../cat.js';
import { buttonS } from '../utils/theme.js';
import { MyButton } from '../utils/components.js';
import { Arrow } from '../components/Arrow.js';
import { ClickableArrow } from '../components/ClickableArrow.js';
import { ControlPanel } from '../components/controlPanel.js';


export default function GameScene() {
  let cat;
  let runButton;
  let blocks;
  let steps;
  let loops;
  let clickArrow;

  const slots = {
    blocks: 2,
    steps: 6,
    loop: 3,
  }

  this.name = "GameScene";

  this.setup = () => {
    cat = new Cat(width / 6, height - 167.5, 150);

    // test
    clickArrow = new ClickableArrow('up', true);

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
      name: 'blocks',
      x: width / 32 * 7,
      y: height / 32,
      numBoxes: 2
    });

    steps = new ControlPanel({
      name: 'steps',
      x: width / 32 * 7 + 48 * (slots.blocks + 1),
      y: height / 32,
      numBoxes: 6
    });

    loops = new ControlPanel({
      name: 'loop',
      x: width / 32 * 7 + 48 * (slots.blocks + slots.steps + 2.75),
      y: height / 32,
      numBoxes: 4
    });

    blocks.setContents([
      new Arrow('right'),
      // new Arrow('up')
      new ClickableArrow('up', true),
    ]);


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

    runButton.draw();
    blocks.draw();
    steps.draw();
    loops.draw();
    
    // Sprite
    camera.on();
    cat.draw();
    camera.off();
  };

  this.onResize = () => {
    cat.setPosition(width / 2, height - 177.5);
    runButton.setPosition((width / 16) * 15, height / 16);
    blocks.setPosition(width / 32, height / 32);
    steps.setPosition((width / 32) * 4, height / 32);
  }

  this.keyPressed = () => {
    const _key = key;
    console.log(`key passed: ${_key}`);
    if (_key == "ArrowRight") {
      cat.keyPressed(_key);
    } else {
      cat.changeAni(_key);
    }
  }

  this.handleClick = function(mx, my) {
    this.arrows.forEach(arrow => {
      if (arrow.clickable) {
        arrow.handleClick(mx, my);
      }
    });
  }
}
