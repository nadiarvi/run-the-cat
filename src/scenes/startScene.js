import { colors } from '../utils/theme.js';
import { Cat } from '../components/Cat.js';
import { buttonL } from '../utils/theme.js';
import { MyButton } from '../utils/components.js';
import Level1 from './lvl1.js';

export default function StartScene() {
  const worldBlockSize = 125;
  const groundHeight = worldBlockSize;

  let cat;
  let blocksGround = [];

  let startButton;

  this.name = "StartScene";

  this.setup = () => {
    cat = new Cat(width / 2, height - 200, 200);
    
    startButton = new MyButton({
      x: width/2,
      y: height/2 + 50,
      text: 'start',
      mode: 'CENTER',
      style: buttonL,
      onPress: () => {
          console.log("press");
          this.sceneManager.showScene(Level1);
      }
    });

    // Ground (physical)
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
  };

  this.draw = () => {
    background(colors.primary);

    fill(colors.tertiary);
    textSize(128);
    stroke(colors.secondary);
    strokeWeight(7);

    text("rUn ThE cAT!", width / 2, height / 2 - 100);

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
      startButton.locate(width/2, height/2 + 50);
    }
  }

  this.exit = function () {
    if (cat) {
      cat.remove()
    }
  };
  
}
