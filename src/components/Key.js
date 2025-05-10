export class Key {
    constructor(x, y, targetSize) {
        this.x = x;
        this.y = y;
        this.targetSize = targetSize;
        this.sprite = null;
        this.loaded = false;
        this.obtained = false;
        this.size = 0;
        this.bobTime = 0;

        // Load the flag image
        loadImage('assets/keys.png', (img) => {
            this.size = img.width / 12;
            this.sprite = new Sprite(
              this.x,
              this.y - this.size * 0.8,
              this.size,
              img.height,
              "dynamic"
            );
            this.sprite.layer = -1;
            this.sprite.spriteSheet = img;
            this.sprite.addAnis({
              default: { row: 0, frames: 5 },
            });
            this.sprite.anis.frameDelay = 16;
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
        if (this.loaded) {
            this.bobTime += 0.1;
            const bobOffset = Math.sin(this.bobTime) *2;
            this.sprite.y = this.y - this.size * 0.8 + bobOffset;
            this.sprite.draw();
        }
    }

    obtain() {
        if (!this.loaded || this.obtained) return;
        this.obtained = true;
        this.sprite.visible = false;
        this.sprite.collider = 'none';
    }
    
    getObtain() {
        return this.obtained;
    }

    restart() {
        this.obtained = false;
    }

    debug() {
        console.log(`Flag position: x=${this.x}, y=${this.y}`);
        console.log(`Flag loaded: ${this.isLoaded}`);
    }
}