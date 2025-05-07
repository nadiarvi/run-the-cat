import { colors } from '../utils/theme.js';
import { Cat } from '../cat.js';
import { buttonS } from '../utils/theme.js';
import { MyButton } from '../utils/components.js';
import { Arrow } from '../components/Arrow.js';
import { ClickableArrow } from '../components/ClickableArrow.js';
import { ControlPanel } from '../components/controlPanel.js';


export default function GameScene() {
  const groundHeight = 100;
  const worldHeight = windowHeight - groundHeight;
  const catSize = 150;
  const worldBlockSize = 100;

  let cat;
  let runButton;
  let blocks;
  let steps;
  let loops;
  let clickArrow;

  let clicked;

  let selectedStepIndex = null;
  
  const buildingBlocks = [
    new ClickableArrow('up', false),
    new ClickableArrow('right', false),
  ];
  
  // changed on user input
  let selectedSteps;
  let selectedBlock;

  // selectedSteps = ['up', 'right', 'up', 'up', 'right', 'down'];
  // selectedSteps = selectedSteps.map((e) => new ClickableArrow(e, true));

  const slots = {
    blocks: 2,
    steps: 6,
    loop: 3,
  }

  this.name = "GameScene";

  this.setup = () => {
    cat = new Cat(width / 4, height - 175 - 2, catSize);

    runButton = new MyButton({
      x: width / 32 * 28.5,
      y: height / 32,
      text: "run >>",
      mode: "CORNER",
      style: buttonS,
      onPress: () => cat.run(steps.contents),
    });

    blocks = new ControlPanel({
      name: 'blocks',
      x: width / 32 * 7,
      y: height / 32,
      numBoxes: 2
    });
    blocks.setContents(buildingBlocks);

    steps = new ControlPanel({
      name: 'steps',
      x: width / 32 * 7 + 48 * (slots.blocks + 1),
      y: height / 32,
      numBoxes: 6
    });
    

    // loops = new ControlPanel({
    //   name: 'loop',
    //   x: width / 32 * 7 + 48 * (slots.blocks + slots.steps + 2.75),
    //   y: height / 32,
    //   numBoxes: 4
    // });
  };

  this.draw = () => {
    background(colors.primary);

    fill(colors.tertiary);
    textSize(128);
    stroke(colors.secondary);
    strokeWeight(7);
    textAlign(LEFT, TOP);
    text('lvl.1', width / 32, height /32 - 4);

    // Ground
    rectMode(CORNER);
    fill(colors.secondary);
    rect(0, height - groundHeight, width, groundHeight);

    console.log(`ground is drawn at (0, ${height - groundHeight}) with size of ${width}x${groundHeight}`)

    // Obstacle
    console.log(`world size: ${windowWidth}, ${windowHeight}`);
    for (let y = windowHeight - groundHeight - 2; y > 0; y -= worldBlockSize) {
      for (let x = 0; x < width ; x += worldBlockSize) {
        stroke(0)
        strokeWeight(1)
        noFill()
        rect(x, y, worldBlockSize, worldBlockSize);
        textSize(24);
        const x_cnt = Math.floor(x / worldBlockSize);
        const y_cnt = Math.floor(y / worldBlockSize);
        const txt = `${x_cnt}, ${y_cnt}`;
        text(txt, x + 8, y + 8);
      }
    }

    runButton.draw();
    blocks.draw();
    steps.draw();
    // loops.draw();
    
    // Sprite
    cat.draw();
  };

  this.onResize = () => {
    cat.setPosition(width / 2, height - 177.5);
    runButton.setPosition((width / 16) * 15, height / 16);
    blocks.setPosition(width / 32, height / 32);
    steps.setPosition((width / 32) * 4, height / 32);
  }

  this.keyPressed = () => {
    console.log(`key: ${key}, keyCode: ${keyCode}`);

    const _key = key;
    console.log(`key passed: ${_key}`);

    if (keyCode === ESCAPE) {
        // Deselect the currently selected arrow if any
        if (selectedStepIndex !== null && steps.contents[selectedStepIndex]) {
            steps.contents[selectedStepIndex].selected = false;
        }
        selectedStepIndex = null;
    } else {
        cat.keyPressed(key);
    }
  }

  this.mousePressed = function() {
    console.log(`canvas clicked at ${mouseX}, ${mouseY}`);

    steps.contents.forEach((arrow, index) => {
      if (arrow._isMouseOver(mouseX, mouseY)) {
        selectedStepIndex = index;
        steps.contents.forEach(a => a.selected = false);
        arrow.select();
      }
    });

    blocks.contents.forEach((arrow) => {
      if (arrow._isMouseOver(mouseX, mouseY)) {
        // console.log("Clicked arrow", arrow.direction);
        if (selectedStepIndex !== null) {
          const selectedArrow = steps.contents[selectedStepIndex];
          selectedArrow.set(arrow.direction);
          selectedArrow.clickable = true;
          selectedArrow.selected = false;
          selectedStepIndex = null;
        }
      }
    });

  };  
}
