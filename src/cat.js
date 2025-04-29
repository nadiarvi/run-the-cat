export class Cat {
  constructor(x, y, targetSize) {
    this.x = x;
    this.y = y;
    this.size = 171;
    this.targetSize = targetSize;
    this.sprite = null;
    this.loaded = false;

    loadImage('assets/cat.webp', (img) => {
      this.sprite = new Sprite(this.x, this.y, this.size, this.size);
      this.sprite.spriteSheet = img;
      this.sprite.anis.offset.y = 3;
      this.sprite.anis.frameDelay = 8;
      this.sprite.friction = 0;
      this.sprite.addAnis({
        jump: { row: 0, frames: 4 },
        death: { row: 1, frames: 4 },
        hurt: { row: 2, frames: 2 },
        idle: { row: 3, frames: 4 },
        walk: { row: 4, frames: 6 }
      });
      this.sprite.changeAni('idle');

      const scaleFactor = this.targetSize / 171;
      this.sprite.scale = scaleFactor;
      this.loaded = true;
    });
  }
  
  update() {
    if (this.sprite) {
      this.sprite.position.x = this.x;
      this.sprite.position.y = this.y;
    }
  };

  draw() {
    if (this.sprite) this.sprite.draw();
  };

  changeAni(name) {
    if (this.sprite) this.sprite.changeAni(name);
  };

  setPosition(x, y) {
    if (this.sprite) {
      this.sprite.position.x = x;
      this.sprite.position.y = y;
    };
  };

  remove() {
    if (!this.sprite) return;

    this.sprite.remove();
    this.sprite = null;
  }
}
  