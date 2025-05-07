import { colors } from "../utils/theme";

export class ClickableArrow {
  static images = {};
  
  static preload() {
    ClickableArrow.images.up = loadImage('/assets/up.png');
    ClickableArrow.images.down = loadImage('/assets/down.png');
    ClickableArrow.images.left = loadImage('/assets/left.png');
    ClickableArrow.images.right = loadImage('/assets/right.png');
    ClickableArrow.images.empty = loadImage('/assets/empty.png');
  }

  constructor(direction, clickable = false) {
    console.log(`constructing a new clickable arrow....`);
    this.direction = direction;
    this.image = ClickableArrow.images[direction];
    this.clickable = clickable;
    this.selected = false;
    this.x = 0;
    this.y = 0;
    this.width = 40;
    this.height = 40;
  }

  draw(x, y) {
    this.x = x;
    this.y = y;
    stroke(255);
    fill(200);

    if (this.selected) {
      fill(colors.tertiary);
    } else {
      fill(255);
    }
    rect(x, y, 40, 40);
    image(this.image, x, y, 40, 40);
  }

  handleClick(mouseX, mouseY) {
    if (this._isMouseOver(mouseX, mouseY) && this._onClick) {
      this._onClick();
    }
  }

  set(direction){
    this.direction = direction;
    this.image = ClickableArrow.images[direction];
  }

  select(){
    this.selected = true;
  }

  unselect(){
    this.selected = false;
  }

  //helpers
  _onClick(){
    if (!this.clickable) return;
    console.log('clicked!');
  }

  _isMouseOver(mouseX, mouseY) {
    return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height;
  }

}
  