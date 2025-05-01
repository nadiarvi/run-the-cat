export class Cat {
  constructor(x, y, targetSize) {
    this.x = x;
    this.y = y;
    this.size = 171;
    this.targetSize = targetSize;
    this.sprite = null;
    this.loaded = false;
    this.velocity = 24;

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

  changeAni(key) {
    if (!this.sprite) return;
    console.log('changing animation...');
    console.log(key);
    switch (key) {
      case 'w':
        this.sprite.changeAni("walk");
        break;
      case 'j':
        this.sprite.changeAni("jump");
        break;
      case 'i':
        this.sprite.changeAni("idle");
        break;
      case 'h':
        this.sprite.changeAni("hurt");
        break;
      case 'd':
        this.sprite.changeAni("death");
        break;
      default:
        break;
    };
  };

  setPosition(x, y) {
    if (this.sprite) {
      this.sprite.position.x = x;
      this.sprite.position.y = y;
    };
  };

  moveRight() {
    if (this.x + this.targetSize >= width) {
      this.x = width - this.targetSize; // Ensure it doesn't go beyond the boundary
      this.setPosition(this.x, this.y);
      this.changeAni('i'); // Optionally change to idle if boundary reached
      return;
    }
    this.x += this.velocity;  // Keep moving
    this.setPosition(this.x, this.y);
    console.log(`sprite's actual position: ${this._getSpritePosition()}`)
    this.changeAni('w'); // Keep walking animation
  }

  keyPressed(key) {
    if (key === 'ArrowRight') {
      this.moveRight();
    }
  }
  

  remove() {
    if (!this.sprite) return;

    this.sprite.remove();
    this.sprite = null;
  }

  // helper
  _getSpritePosition(){
    console.log(`sprite's actual position: ${this.sprite.x}, ${this.sprite.y}`);
    return (this.sprite.x, this.sprite.y);
  }
}
  