export class Flag {
    constructor(x, y, targetSize) {
        // props
        this.x = x;
        this.y = y;
        this.targetSize = targetSize;
        this.sprite = null;
        this.loaded = false;

        this.size = 0;

        // Load the flag image
        loadImage('assets/flag.png', (img) => {
            this.size = img.height;
            this.sprite = new Sprite(
              this.x,
              this.y - this.size * 0.8,
              this.size,
              this.size,
              "dynamic"
            );
            this.sprite.layer = -1;
            this.sprite.spriteSheet = img;
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
        if (this.isLoaded) {
            this.sprite.position.x = this.x;
            this.sprite.position.y = this.y;
        }
    }

    draw() {
        if (this.isLoaded) {
            drawSprite(this.sprite);
        }
    }

    debug() {
        console.log(`Flag position: x=${this.x}, y=${this.y}`);
        console.log(`Flag loaded: ${this.isLoaded}`);
    }
}