import { colors } from '../utils/theme.js';
import { Cat } from '../components/Cat.js';
import { buttonS, buttonM, buttonL } from '../utils/theme.js';
import { MyButton } from '../utils/components.js';
import { ClickableArrow } from '../components/ClickableArrow.js';
import { ControlPanel } from '../components/controlPanel.js';
import { Flag } from "../components/Flag.js";
import { Key } from '../components/Key.js';


export default function Level3() {
  let blocksGround = [];
  let blockSprites = [];

  let restart = false;

  const catSize = 155;
  const worldBlockSize = 125;
  const groundHeight = worldBlockSize;
  // const worldHeight = windowHeight - groundHeight;
  const maxIdx = {
    x: Math.ceil(windowWidth / worldBlockSize),
    y: Math.floor(windowHeight / worldBlockSize)
  }

  const obstacle = [
    ...Array(maxIdx.y - 3 - 1).fill(...Array(maxIdx.x).fill(0)),
    [...Array(9).fill(0), ...Array(maxIdx.x - 9).fill(1)],
    [...Array(7).fill(0), ...Array(maxIdx.x - 7).fill(1)],
    [...Array(5).fill(0), ...Array(maxIdx.x - 5).fill(1)],
  ];

  let cat;
  let flag;
  let key;
  
  let runButton;
  let nextButton;
  let exitButton;
  
  let blocks;
  let steps;
  let loops;
  let keys;
  // let clickArrow;

  // let clicked;

  let levelFinished = false;

  let selectedStepIndex = null;
  let selectedPanel = null;
  
  const buildingBlocks = [
    new ClickableArrow('up', false),
    new ClickableArrow('right', false),
    new ClickableArrow('loop', false),
  ];
  
  // // changed on user input
  // let selectedSteps;
  // let selectedBlock;

  const slots = {
    blocks: 3,
    steps: 5,
    loops: 2,
    keys: 1,
  }

  this.name = "Level 3";

  this.setup = () => {
    console.log(this.name);
    
    runButton = new MyButton({
      x: (width / 32) * 28.5,
      y: height / 32,
      text: "run >>",
      mode: "CORNER",
      style: buttonS,
      onPress: () => this.startGame(),
    });

    nextButton = new MyButton({
      x: width / 2,
      y: height / 2.5,
      text: "next",
      mode: "CENTER",
      style: buttonM,
      onPress: () => console.log(`redirect to next game`),
    });

    blocks = new ControlPanel({
      name: 'blocks',
      x: width / 32 * 7,
      y: height / 32,
      numBoxes: slots.blocks,
    });
    blocks.setContents(buildingBlocks);

    steps = new ControlPanel({
      name: 'steps',
      x: width / 32 * 7 + 48 * (slots.blocks + 1),
      y: height / 32,
      numBoxes: slots.steps,
    });

    loops = new ControlPanel({
      name: 'loop',
      x: width / 32 * 7 + 48 * (slots.blocks + slots.steps + 2.5),
      y: height / 32,
      numBoxes: slots.loops,
    });

    keys = new ControlPanel({
      name: 'key',
      x: width / 32 * 7 + 48 * (slots.blocks + slots.steps + slots.loops + 3.5),
      y: height / 32,
      numBoxes: slots.keys,
    });

    flag = new Flag(12 * worldBlockSize, height - worldBlockSize * 4, catSize * 0.75, true);
    key = new Key(10 * worldBlockSize, height - worldBlockSize * 4.3, catSize * 0.35);

    for (let i = 0; i < width; i += worldBlockSize) {
      let b = new Sprite(
          i + worldBlockSize / 2,
          height - groundHeight / 2,
          worldBlockSize,
          worldBlockSize,
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

    // Sprites
    cat = new Cat(2.25 * worldBlockSize, height - catSize * 13/12, catSize, blocksGround, blockSprites, worldBlockSize);
  };

  this.draw = () => {
    background(colors.primary);
    _drawLevelTitle('lvl.3');

    runButton.draw();
    
    blocks.draw();
    steps.draw();
    loops.draw();
    keys.draw();
    cat.draw();
    flag.draw();

    _checkKeyObtained(cat, key, keys, flag);
    if (key && !key.obtained) key.draw();

    // if (cat.sprite && flag.sprite) {
    //   if (key && key.getObtain()) {
    //     flag.setColliderMode('none');

    //     if (cat.sprite.overlaps(flag.sprite)) {
    //     levelFinished = true;
    //   };
    //   } else {
    //     flag.setColliderMode('static');
    //   }
    // };

    if (cat.sprite && flag.sprite) {
      // Only finish if key is obtained
      if (cat.sprite.overlaps(flag.sprite) && key && key.obtained) {
        levelFinished = true;
      }
    };
    
    if (levelFinished) _drawFinishGame(nextButton);
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
      if (selectedPanel && selectedIndex !== null) {
        const panel = selectedPanel === 'steps' ? steps : loops;
        if (panel.contents[selectedIndex]) {
          panel.contents[selectedIndex].selected = false;
        }
      }
      selectedPanel = null;
      selectedIndex = null;
    } else {
      cat.keyPressed(key);
    }
  }

  this.mousePressed = function() {
    steps.contents.forEach((arrow, index) => {
      if (arrow._isMouseOver(mouseX, mouseY)) {
        steps.contents.forEach(a => a.selected = false);
        loops.contents.forEach(a => a.selected = false);

        selectedPanel = 'steps';
        selectedStepIndex = index;
        steps.contents.forEach(a => a.selected = false);
        arrow.select();
      }
    });

    loops.contents.forEach((arrow, index) => {
      if (arrow._isMouseOver(mouseX, mouseY)) {
        steps.contents.forEach(a => a.selected = false);
        loops.contents.forEach(a => a.selected = false);

        selectedPanel = 'loops';
        selectedStepIndex = index;
        loops.contents.forEach(a => a.selected = false);
        arrow.select();
      }
    });

    blocks.contents.forEach((arrow) => {
      if (arrow._isMouseOver(mouseX, mouseY)) {
        if (selectedPanel && selectedStepIndex !== null) {
          let targetPanel = selectedPanel === 'steps' ? steps : loops;
          const selectedArrow = targetPanel.contents[selectedStepIndex];

          if (selectedPanel === 'loops' && arrow.direction === 'loop') {
            selectedArrow.selected = false;
            selectedStepIndex = null;
            selectedPanel = null;
            return;
          }

          selectedArrow.set(arrow.direction);
          selectedArrow.clickable = true;
          selectedArrow.selected = false;

          selectedStepIndex = null;
          selectedPanel = null;
        }
      }
    });
  };  

  this.startGame = () => {
    if (restart) cat.restart();
    console.log(steps.contents);
    console.log(loops.contents);
    const flattenedSteps = _flattenSteps(steps.contents, loops.contents);
    cat.run(flattenedSteps);
    restart = true;
  };

  this.exit = function () {
    // Remove cat sprite
    if (cat) {
        cat.remove();
    }

    // Remove flag sprite
    if (flag && flag.sprite) {
        flag.sprite.remove();
    }

    // Remove ground blocks
    blocksGround.forEach(block => {
        if (block) block.remove();
    });
    blocksGround = [];

    // Remove obstacle blocks
    blockSprites.forEach(block => {
        if (block) block.remove();
    });
    blockSprites = [];
  };
}

function _flattenSteps(stepList, loopList) {
  const result = stepList.reduce((acc, curr) => {
    if (curr.direction == 'loop') acc.push(...loopList);
    else acc.push(curr);
    return acc;
  }, [])

  console.log(`flattened result`)
  console.log(result);

  return result;
}

function _checkKeyObtained(cat, key, keys, flag) {
  if (!key || !cat || !keys || !flag) return;
  if (!key.getObtain() && cat.sprite && key.sprite && cat.sprite.overlaps(key.sprite)) {
    key.obtain();
    keys.contents.forEach((arrow) => {
      arrow.set('key');
    })
    flag.setLocked(false);
    if (flag) flag.debug();
  }
}

function _drawFinishGame(nextButton){
  push();
  fill(35, 20, 45, 190);
  rectMode(CORNER);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  textSize(128)
  fill(colors.tertiary);
  stroke(colors.secondary);
  strokeWeight(10);
  text("~lvl 3 DONE!~", width / 2, height / 4);
  
  // draw button
  nextButton.draw();
  pop();
}

function _drawLevelTitle(title){
  fill(colors.tertiary);
  textSize(128);
  stroke(colors.secondary);
  strokeWeight(7);
  textAlign(LEFT, TOP);
  text(title, width / 32, height /32 - 4);
}

