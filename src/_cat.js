export class Cat {
  constructor(x, y, targetSize) {
    this.x = x;
    this.y = y;
    this.size = 171;
    this.targetSize = targetSize;
    this.sprite = null;
    this.loaded = false;
    this.velocity = 24;
    this.count = 0;

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
    if (!this.sprite) return;
    console.log(`updating sprite...`);

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    if (kb.pressing('left')) {
      console.log("accepting pressed kb");
      this.sprite.vel.x = -1;
    } else if (kb.pressing('right')) {
      this.sprite.vel.x = 1;
    } else {
      this.sprite.vel.x = 0;  // Stop the hero if no keys are pressed
    }
  };

  draw() {
    if (!this.sprite) return;
    // this.sprite.draw();
    this.sprite.update();
  };

  changeAni(key) {
    if (!this.sprite) return;

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

  /// i want to add this part to move sprite across the canvas when user presses right arrow
  // if (kb.presses('right')) {
  //   this.move(30, 'right', 3)
  // }

  move(direction){
    if (!direction) return;
    console.log(`entered move method`);
    if (direction == "right") this.moveRight();
    if (direction == "up") this.moveUp();
  }

  moveRight(){
    console.log(`${this.count}`);
    this.changeAni('w')
    this.sprite.vel.x = 1;
    this.count += 1;
  }

  moveUp(){
    console.log(`sprite should move up...`);
    this.changeAni('j')
  }

  runCat(steps){
    steps.forEach(element => {
      setTimeout(() => {
        console.log(element)
      }, 1000);
    });
  }


  // helper
  _getSpritePosition(){
    console.log(`sprite's actual position: ${this.sprite.x}, ${this.sprite.y}`);
    return (this.sprite.x, this.sprite.y);
  }

  _translate(step){
    switch (step) {
      case 'up':
        console.log('move: up');
        return 'jump'
        break;
      case 'right':
        console.log('move: down');
        return 'walk'
        break;
      case 'down':
        console.log('move: up');
        return 'jump'
        break;
      default:
        break;
    }
  }
}
  