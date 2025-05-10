export class Cat {
  constructor(x, y, targetSize, groundRef, obstacleRefs, worldBlockSize) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.targetSize = targetSize;
    this.sprite = null;
    this.loaded = false;
    this.velocity = 4;
    this.ground = groundRef;
    this.obstacles = obstacleRefs;
    this.blockSize = worldBlockSize;

    this.shiftOffset = 0;

    this.steps = [];

    this.currentStepIndex = 0;
    this.isMoving = false;
    this.stepTimer = 0;
    this.stepDuration = 40;
    this.moveDirection = null;
    this.lastDirection = null;

    this.hasJumped = false;

    loadImage('assets/cat.webp', (img) => {
      this.size = img.height / 5;

      this.sprite = new Sprite(this.x, this.y, this.size, this.size, 'dynamic');
      this.sprite.rotationLock = true;
      this.sprite.bounciness = 0.1;
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

      const scaleFactor = this.targetSize / this.size;
      this.sprite.scale = scaleFactor;
      
      this.shiftOffset = this.targetSize - this.sprite.width * this.sprite.scale;
      this.sprite.anis.offset.x = this.shiftOffset + this.targetSize / 4;
      // this.sprite.anis.offset.x = this.targetSize / 4;

      this.loaded = true;
    });
  }
  
  update() {
    if (!this.sprite || this.steps.length === 0) return;
    // console.log(`updating sprite...`);

    if (this.isMoving) {
      this._continueMovement();
    } else if (this.currentStepIndex < this.steps.length) {
      this._startMovement(this.steps[this.currentStepIndex]);
    };

    this._handleInput();
  };

  run(steps) {
    this.steps = steps.map(e => e.direction);
    this.currentStepIndex = 0;
    this.isMoving = false;
  }

  _startMovement(direction) {
    this.moveDirection = direction;
    this.stepTimer = 0;
    this.isMoving = true;

    if (direction === 'right') {
      this.sprite.mirror.x = false;
      this.targetX = this.sprite.x + this.blockSize;
      this.targetY = this.sprite.y;

      this.sprite.vel.x = this.velocity;
      this.sprite.vel.y = 0;

      this.lastDirection = 'right';
      this.changeAni('w');
    } else if (direction === 'left') {
      this.sprite.mirror.x = true;
      this.targetX = this.sprite.x - this.blockSize;
      this.targetY = this.sprite.y;

      this.sprite.vel.x = -this.velocity;
      this.sprite.vel.y = 0;
      
      this.lastDirection = 'left';
      this.changeAni('w');
      
    } else if (direction === 'up') {
      this.targetX = this.sprite.x + (this.lastDirection === 'right' ? this.blockSize : -this.blockSize);
      this.targetY = this.sprite.y - this.blockSize;

      this.hasJumped = false;

      if (this._checkPlatform()) {
        this.sprite.vel.y = -this.velocity;

        if (this.lastDirection === "right") {
          this.sprite.vel.x = this.velocity;
        } else if (this.lastDirection === "left") {
          this.sprite.vel.x = -this.velocity;
        } else {
          this.sprite.vel.x = 0;
        }

        this.changeAni('j');
      }
    }
  }
  
  _continueMovement() {
    this.stepTimer++;
  
    let isOnPlatform = this._checkPlatform();
  
    if (this.moveDirection === 'right') {
      this.sprite.mirror.x = false;
      this.changeAni('w');
      this.sprite.vel.x = this.velocity - 0.70;
      this.lastDirection = 'right';
    }
  
    if (this.moveDirection === 'left') {
      this.sprite.mirror.x = true;
      this.changeAni('w');
      this.sprite.vel.x = -this.velocity - 0.70;
      this.lastDirection = 'left';
    }
  
    if (this.moveDirection === 'up' && isOnPlatform && !this.hasJumped) {
      this.changeAni('j');
      this.sprite.vel.y = -20;
  
      if (this.lastDirection === 'right') {
        this.sprite.vel.x = this.velocity + 0.20;
      } else if (this.lastDirection === 'left') {
        this.sprite.vel.x = -this.velocity + 0.20;
      } else {
        this.sprite.vel.x = 0;
      }
    }
  
    this.hasJumped = true;
  
    if (this.stepTimer >= this.stepDuration) {
      this.isMoving = false;
      this.currentStepIndex++;
      this.sprite.vel.x = 0;
      this.changeAni('i');
    }
  }

  _checkPlatform() {
    if (!this.sprite) return false;

    if (this.ground && Array.isArray(this.ground)) {
      for (let block of this.ground) {
        if (this.sprite.colliding(block)) return true;
      }
    }

    if (this.obstacles && Array.isArray(this.obstacles)) {
      for (let block of this.obstacles) {
        if (this.sprite.colliding(block)) return true;
      }
    }
    return false;
  }
  
  restart() {
    console.log('resetting initial position.....');

    if (!this.sprite) return null;

    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;

    this.sprite.scale = this.targetSize / this.size;
    this.sprite.mirror.x = false;
    this.sprite.rotation = 0;
    this.sprite.rotationSpeed = 0;

    this.sprite.anis.offset.x = this.shiftOffset + this.targetSize / 4;
    
    this.steps = [];
    this.currentStepIndex = 0;
    this.isMoving = false;
    this.stepTimer = 0;
    this.moveDirection = null;
    this.targetX = null;
    this.targetY = null;
    
    this.changeAni('i');
  }
  

  keyPressed(key) {
    console.log(`receiving keyboard input: ${key}`);
  }

  draw() {
    if (!this.sprite) return;
    this.update();
    this.sprite.update();

    // debugging purposes
    noFill();
    stroke(255);
    strokeWeight(1);

    let w = this.sprite.width;
    let h = this.sprite.height;

    rectMode(CENTER);
    // rect(this.sprite.x, this.sprite.y, w, h);
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

  _handleInput(){
    // console.log('assume i have something....');
  }
}
  