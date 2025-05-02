export class ClickableArrow {
    static images = {};
  
    static preload() {
      ClickableArrow.images.up = loadImage('/assets/up.png');
      ClickableArrow.images.down = loadImage('/assets/down.png');
      ClickableArrow.images.left = loadImage('/assets/left.png');
      ClickableArrow.images.right = loadImage('/assets/right.png');
      ClickableArrow.images.empty = loadImage('/assets/empty.png');
    }
  
    constructor(direction, clickable=false) {
      this.direction = direction;
      this.image = ClickableArrow.images[direction];
      this.clickable = clickable;
      // this.onClick = onClick | null;
      this.x = 0;
      this.y = 0;
      this.width = 40;
      this.height = 40;
    }
  
    draw(x, y) {
      this.x = x;
      this.y = y;
      stroke(255);
      image(this.image, x, y, 40, 40);
    }

    handleClick(mouseX, mouseY) {
      if (this._isMouseOver(mouseX, mouseY) && this._onClick) {
        this._onClick();
      }
    }

    //helpers
    _onClick(){
      console.log('clicked!');
    }

    _isMouseOver(mouseX, mouseY) {
      return mouseX > this.x && mouseX < this.x + this.width &&
             mouseY > this.y && mouseY < this.y + this.height;
    }

  }
  