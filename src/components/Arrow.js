export class Arrow {
    static images = {};
  
    static preload() {
      Arrow.images.up = loadImage('/assets/up.png');
      Arrow.images.down = loadImage('/assets/down.png');
      Arrow.images.left = loadImage('/assets/left.png');
      Arrow.images.right = loadImage('/assets/right.png');
      Arrow.images.empty = loadImage('/assets/empty.png');
    }
  
    constructor(direction) {
      this.direction = direction;
      this.image = Arrow.images[direction];
    }
  
    draw(x, y) {
      image(this.image, x, y, 40, 40);
    }
  }
  