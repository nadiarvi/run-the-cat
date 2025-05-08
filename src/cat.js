export class Cat {
  constructor(x, y, targetSize, groundRef, obstacleRefs) {
    this.x = x;
    this.y = y;
    this.size = 171;
    this.targetSize = targetSize;
    this.sprite = null;
    this.loaded = false;
    this.velocity = 24;
    this.ground = groundRef;
    this.obstacles = obstacleRefs;

    this.steps = [];

    this.currentStepIndex = 0;
    this.isMoving = false;
    this.stepTimer = 0;
    this.stepDuration = 40; // frames to complete one movement
    this.moveDirection = null;
    this.lastDirection = null;

    this.hasJumped = false;

    loadImage('assets/cat.webp', (img) => {
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

      const scaleFactor = this.targetSize / 171;
      this.sprite.scale = scaleFactor;
      this.loaded = true;
    });
  }
  
  update() {
    if (!this.sprite || this.steps.length === 0) return;
    console.log(`updating sprite...`);

    if (this.isMoving) {
      this._continueMovement();
    } else if (this.currentStepIndex < this.steps.length) {
      this._startMovement(this.steps[this.currentStepIndex]);
    }

    this._handleInput();
  };

  // update() {
  //   if (!this.sprite || this.steps.length === 0) return;
  
  //   if (this.isMoving) {
  //     this._continueMovement();
  //   } else if (this.currentStepIndex < this.steps.length) {
  //     this._startMovement(this.steps[this.currentStepIndex]);
  //   }
  // }
  

  run(steps) {
    this.steps = steps.map(e => e.direction);
    this.currentStepIndex = 0;
    this.isMoving = false;
  }

  _startMovement(direction) {
    const blockSize = 100;
    this.moveDirection = direction;
    this.stepTimer = 0;
    this.isMoving = true;

    if (direction === 'right') {
      this.targetX = this.sprite.x + blockSize;
      this.sprite.vel.x = this.velocity;
      this.lastDirection = 'right';
      this.changeAni('w');
    } else if (direction === 'left') {
      this.targetX = this.sprite.x - blockSize;
      this.sprite.vel.x = -this.velocity;
      this.lastDirection = 'left';
      this.changeAni('w');
    } else if (direction === 'up') {
      this.targetY = this.sprite.y - blockSize;
      this.hasJumped = false;

      // Check platform
      let isOnPlatform = this._checkPlatform();
      if (isOnPlatform) {
        this.sprite.vel.y = -10;
        if (this.lastDirection === 'right') this.sprite.vel.x = this.velocity;
        else if (this.lastDirection === 'left') this.sprite.vel.x = -this.velocity;
        else this.sprite.vel.x = 0;
        this.changeAni('j');
      }
    }
  }

  _checkPlatform() {
    if (!this.sprite) return false;
    // if (this.ground && this.sprite.colliding(this.ground)) return true;

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

  // _continueMovement() {
  //   this.stepTimer++;
  
  //   // let isOnPlatform = false;
  //   let isOnPlatform = this._checkPlatform(); // Use existing _checkPlatform method instead
  
  
  //   if (this.ground && this.sprite.colliding(this.ground)) {
  //     isOnPlatform = true;
  //   }
  
  //   if (this.obstacles && Array.isArray(this.obstacles)) {
  //     for (let block of this.obstacles) {
  //       if (this.sprite.colliding(block)) {
  //         isOnPlatform = true;
  //         break;
  //       }
  //     }
  //   }
  
  //   if (this.moveDirection === 'right') {
  //     this.sprite.vel.x = 3;
  //     this.lastDirection = 'right';
  //   }
  
  //   if (this.moveDirection === 'left') {
  //     this.sprite.vel.x = -3;
  //     this.lastDirection = 'left';
  //   }
  
  //   if (this.moveDirection === 'up' && isOnPlatform && !this.hasJumped) {
  //     this.sprite.vel.y = -20;
  
  //     // use lastDirection to add horizontal push
  //     if (this.lastDirection === 'right') {
  //       this.sprite.vel.x = 3;
  //     } else if (this.lastDirection === 'left') {
  //       this.sprite.vel.x = -3;
  //     } else {
  //       this.sprite.vel.x = 0; // jump straight up
  //     }
  //   }

  //   this.hasJumped = true;
  
  //   if (this.stepTimer >= this.stepDuration) {
  //     this.isMoving = false;
  //     this.currentStepIndex++;
  //     this.sprite.vel.x = 0;
  //     this.changeAni('i');
  //   }
  // } 
  
  _continueMovement() {
    this.stepTimer++;
  
    let isOnPlatform = this._checkPlatform(); // ✅ use this only
  
    if (this.moveDirection === 'right') {
      this.sprite.vel.x = 3;
      this.lastDirection = 'right';
    }
  
    if (this.moveDirection === 'left') {
      this.sprite.vel.x = -3;
      this.lastDirection = 'left';
    }
  
    if (this.moveDirection === 'up' && isOnPlatform && !this.hasJumped) {
      this.sprite.vel.y = -20;
  
      if (this.lastDirection === 'right') {
        this.sprite.vel.x = 3;
      } else if (this.lastDirection === 'left') {
        this.sprite.vel.x = -3;
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
  
  

  restart() {
    console.log('resetting initial position.....');

    if (!this.sprite) return null;

    // Reset position to initial coordinates (from constructor)
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    
    // Reset velocities
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    
    // Reset movement states
    this.steps = [];
    this.currentStepIndex = 0;
    this.isMoving = false;
    this.stepTimer = 0;
    this.moveDirection = null;
    this.targetX = null;
    this.targetY = null;
    
    // Reset animation
    this.changeAni('i');

    setTimeout(() => {
      console.log('finish resetting...')
    }, 1000);
  }
  

  keyPressed(key) {
    console.log(`receiving keyboard input: ${key}`);
  }

  draw() {
    if (!this.sprite) return;
    this.update();
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
    console.log('assume i have something....');
  }
}
  