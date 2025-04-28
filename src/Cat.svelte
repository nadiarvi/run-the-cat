<script>
  import { onMount } from 'svelte';
  export let myp5;
  
  // Props
  export let windowHeight = 0;
  export let windowWidth = 0;

  $: x = windowWidth / 2;
  $: y = windowHeight - 100 - Math.ceil(size/2);
  const size = 171;
  
  // Sprite reference
  let cat = null;
  let canInitializeSprite = false;
  let spriteCreated = false;

  onMount(() => {
      setTimeout(() => {
          canInitializeSprite = true;
      }, 100);
  });

  function initializeSprite() {
      if (spriteCreated || !myp5 || !canInitializeSprite) {
          return;
      }
      
      console.log("Actually initializing sprite at", x, y);
      
      try {
          cat = new myp5.Sprite(x, y, size, size);

          myp5.loadImage('assets/cat.webp',
              (catSpriteSheet) => {
                  cat.spriteSheet = catSpriteSheet;
                  cat.anis.offset.y = 2;
                  cat.anis.frameDelay = 8;
                  cat.friction = 0;
                  cat.addAnis({
                      jump: { row: 0, frames: 4 },
                      death: { row: 1, frames: 4 }, 
                      hurt: { row: 2, frames: 2 },
                      idle: { row: 3, frames: 4 },
                      walk: { row: 4, frames: 6 }
                  });
                  cat.changeAni('idle');
              },
              (err) => {
                  console.error('Error loading sprite image:', err);
                  spriteCreated = false;
              }
          );
          
          spriteCreated = true;
      } catch (error) {
          console.error('Error in sprite initialization:', error);
          spriteCreated = false;
      }
  }

  $: if (canInitializeSprite && myp5 && !spriteCreated && windowWidth > 0 && windowHeight > 0) {
      initializeSprite();
  }

  $: if (cat && windowWidth > 0 && windowHeight > 0) {
      cat.position.x = x;
      cat.position.y = y;
  }

  export function changeAni(name) {
      if (cat) cat.changeAni(name);
  }

  export function update() {
      return null;
  }
</script>