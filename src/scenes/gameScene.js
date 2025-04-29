import { colors } from '../theme.js';
import { draw as drawWorld, groundHeight } from '../world.js';
import { Cat } from '../cat.js';

export default function GameScene(p) {
  let cat;

  this.setup = () => {
    cat = new Cat(width / 2, height - 200, 200);
  };

  this.draw = () => {
    // drawWorld(p, groundHeight);
    cat.update();
    cat.draw();
  };
}
