<script>
    import { onMount } from 'svelte';
    import { colors } from './theme';
    import * as World from './World.svelte';
    import Cat from './Cat.svelte'; //this is the cat component
    
    let id;
    let catComponent;
    let myp5;

  
    const sketch = (p5) => {

        p5.setup = () => {
            new p5.Canvas(p5.windowWidth, p5.windowHeight);
        };
           
        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        };

        p5.draw = () => {
            p5.clear();
            p5.background(colors.Pico8Style.primary);
            p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);

            World.draw(p5);
        };

        // catPosition = {x: p5.windowWidth / 2, y: p5.windowHeight - 50};
    };

    // On startup
    onMount(function () {
        myp5 = new p5(sketch, id);
    });

  </script>
  
  <div {id}>
    {#if myp5}
        <Cat bind:this={catComponent} {myp5} />
    {/if}
  </div>
  