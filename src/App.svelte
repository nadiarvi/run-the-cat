<script>
    import { onMount } from 'svelte';
    import { colors } from './theme';
    import * as World from './World.svelte';
    import Cat from './Cat.svelte'; //this is the cat component
    
    let id;
    let catComponent;
    let myp5;
    let windowSize = {
        width : 0,
        height : 0,
    };

  
    const sketch = (p5) => {

        p5.setup = () => {
            new p5.Canvas(p5.windowWidth, p5.windowHeight);
            windowSize = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };

           
        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
            windowSize = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };

        p5.draw = () => {
            p5.clear();
            p5.background(colors.Pico8Style.primary);
            p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);

            World.draw(p5, World.groundHeight = 100);
            console.log(`windowSize: ${windowSize.width} x ${windowSize.height}`);
        };
    };

    // On startup
    onMount(function () {
        myp5 = new p5(sketch, id);
    });

</script>
  
<div {id}>
    {#if myp5}
        <Cat bind:this={catComponent} {myp5} windowHeight={windowSize.height} windowWidth={windowSize.width}/>
    {/if}
</div>
