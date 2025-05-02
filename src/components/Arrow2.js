export class CLickableArrow {
    static images = {};
  
    static preload() {
      Arrow.images.up = loadImage('/assets/up.png');
      Arrow.images.down = loadImage('/assets/down.png');
      Arrow.images.left = loadImage('/assets/left.png');
      Arrow.images.right = loadImage('/assets/right.png');
      Arrow.images.empty = loadImage('/assets/empty.png');
    }
  
    constructor(direction, clickable=false) {
      this.direction = direction;
      this.image = Arrow.images[direction];
      this.clickable = clickable;
      // this.onClick = onClick;
      this.x = 0;
      this.y = 0;
      this.width = 40;
      this.height = 40;
    }
  
    draw(x, y) {
      this.x = x;
      this.y = y;
      image(this.image, x, y, this.width, this.height);
    }

    handleClick(mouseX, mouseY) {
      if (this.isMouseOver(mouseX, mouseY) && this.onClick) {
        this._onClick();
      }
    }

    //helpers
    _onClick(){
      console.log('clicked!');
    }

  }
  