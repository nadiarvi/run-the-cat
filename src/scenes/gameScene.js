import { colors } from '../theme.js';
import { draw as drawWorld, groundHeight } from '../world.js';
import { Cat } from '../cat.js';

export default function GameScene() {
  let cat;
  this.name = "GameScene";

  this.setup = () => {
    cat = new Cat(width / 6, height - 167.5, 150);
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

  };

  this.onResize = () => {
    if (cat) {
      cat.setPosition(width / 2, height - 177.5);
    }
  }
}
