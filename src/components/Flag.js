import { colors } from "../utils/theme";

export class Flag {
    constructor(x, y, targetSize, guarded=false) {
        // props
        this.x = x;
        this.y = y;
        this.targetSize = targetSize;
        this.sprite = null;
        this.loaded = false;
        this.guarded = guarded;

        this.size = 0;
        this.locked = guarded ? true : false;

        this.unlockAni = false;
        this.unlockProg = 1; // 1: locked, 0: unlocked

        // Load the flag image
        loadImage('assets/flag.png', (img) => {
            this.size = img.height;
            this.sprite = new Sprite(
              this.x,
              this.y - this.size * 0.8,
              this.size,
              this.size,
              "none"
            );
            this.sprite.layer = -1;
            this.sprite.spriteSheet = img;
            this.sprite.anis.offset.x = this.size / 5;
            this.sprite.addAnis({
              default: { row: 0, frames: 5 },
            });
            this.sprite.anis.frameDelay = 8;
            this.sprite.changeAni("default");
            
            // Scale the sprite to match target size
            const scale = this.targetSize / img.height;
            this.sprite.scale = scale;
            
            // Set sprite properties
            this.sprite.collider = 'static';
            this.loaded = true;
        });
    }

    update() {
        if (this.loaded) {
            this.sprite.position.x = this.x;
            this.sprite.position.y = this.y;
        }
    }

    draw() {
        if (!this.loaded) return;
        
        this.sprite.draw();
        
        if (this.guarded) this._drawJailCosed();
    }

    setColliderMode(mode) {
        this.sprite.collider = mode;
    }

    setLocked(mode) {
        this.locked = mode;
    }

    debug() {
        console.log(`Flag position: x=${this.x}, y=${this.y}`);
        console.log(`Flag loaded: ${this.loaded}`);
        console.log(`flag locked? ${this.locked}`);
    }

    _drawJailCosed(){
        noFill();
        stroke(colors.darkRed);
        strokeWeight(3);

        let w = this.sprite.width;
        let h = this.sprite.height;

        rectMode(CENTER);
        rect(this.sprite.x, this.sprite.y, w, h);

        if (this.locked) {
            // draw the bars
            const numBars = 5;
            const gap = w / numBars;

            const o_x = this.sprite.x - w / 2;
            const o_y = this.sprite.y - h / 2;

            for (let i = 0; i < w; i += gap) {
                line(o_x + i, o_y, o_x + i, o_y + h);
            }
        }
    }
}