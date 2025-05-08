import { colors } from '../utils/theme.js';
import { Cat } from '../cat.js';
import { buttonS } from '../utils/theme.js';
import { MyButton } from '../utils/components.js';
import { ClickableArrow } from '../components/ClickableArrow.js';
import { ControlPanel } from '../components/controlPanel.js';


export default function GameScene() {
  // for ground
  let ground;
  let blocksGround = [];
  let blockSprites = [];

  let restart = false;

  const catSize = 150;
  const worldBlockSize = 100;
  const groundHeight = worldBlockSize;
  // const worldHeight = windowHeight - groundHeight;
  const maxIdx = {
    x: Math.ceil(windowWidth / worldBlockSize),
    y: Math.floor(windowHeight / worldBlockSize)
  }

  const obstacle = [
    ...Array(maxIdx.y - 3 - 1).fill(...Array(maxIdx.x).fill(0)),
    [...Array(9).fill(0), ...Array(maxIdx.x - 9).fill(1)],
    [...Array(8).fill(0), ...Array(maxIdx.x - 8).fill(1)],
    [...Array(7).fill(0), ...Array(maxIdx.x - 7).fill(1)],
  ];

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
    runButton = new MyButton({
      x: (width / 32) * 28.5,
      y: height / 32,
      text: "run >>",
      mode: "CORNER",
      style: buttonS,
      onPress: () => this.startGame(),
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

    for (let i = 0; i < width; i += worldBlockSize) {
      let b = new Sprite(
          i + worldBlockSize / 2,          // x position for each block
          height - groundHeight / 2,        // y position
          worldBlockSize,                   // width of each block
          worldBlockSize,                   // height of each block
          'static'
      );
      const i_cnt = Math.floor(i / worldBlockSize);

      b.color = (i_cnt % 2) === 0 ? color(colors.secondary) : color(colors.darkRed);
      b.strokeWeight = 5;
      b.stroke = (i_cnt % 2) === 0 ? color(colors.darkRed) : color(colors.darkRed);
      blocksGround.push(b);
    }

    // Obstacles (physical)
    for (let y = windowHeight - groundHeight - 2; y > 0; y -= worldBlockSize) {
      for (let x = 0; x < width; x += worldBlockSize) {
        const x_cnt = Math.floor(x / worldBlockSize);
        const y_cnt = Math.floor(y / worldBlockSize);
        const isObs = obstacle[y_cnt] && obstacle[y_cnt][x_cnt];

        if (isObs) {
          let b = new Sprite(x + worldBlockSize / 2, y + worldBlockSize / 2, worldBlockSize, worldBlockSize, 'static');
          b.color = (x_cnt + y_cnt) % 2 === 0 ? color(colors.tertiary) : color(colors.accent);
          b.strokeWeight = 0;
          blockSprites.push(b);
        }
      }
    }

    // Cat sprite
    // cat = new Cat(width / 4, height - catSize * 13/12, catSize, blocksGround, blockSprites);
    cat = new Cat(3.5 * worldBlockSize, height - catSize * 13/12, catSize, blocksGround, blockSprites);
  };

  this.draw = () => {
    background(colors.primary);

    fill(colors.tertiary);
    textSize(128);
    stroke(colors.secondary);
    strokeWeight(7);
    textAlign(LEFT, TOP);
    text('lvl.1', width / 32, height /32 - 4);

    runButton.draw();
    blocks.draw();
    steps.draw();
    // loops.draw();
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

  this.startGame = () => {
    if (restart) cat.restart();
    cat.run(steps.contents);
    this.restart = true;
  }
}
