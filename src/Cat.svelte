<script>
    import { onMount } from 'svelte';
    export let myp5;
    
    // Props
    export let x = 600;
    export let y = 600;
    const size = 171;
    
    // Sprite reference
    let cat;

    $: if (myp5) {
        // Initialize sprite
        cat = new myp5.Sprite(x, y, size, size);
        cat.spriteSheet = 'assets/cat.webp';
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
    }

    export function changeAni(name) {
      if (cat) cat.changeAni(name);
    }

    // function to handle logics
    export function update() {
      // add behavior here
      return null;
    }
  </script>