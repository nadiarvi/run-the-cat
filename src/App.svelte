<script>
    console.log('this is the app screen');
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
            p5.textFont('Pixelify Sans', 'sans-serif');
            p5.textAlign('center');
            p5.textSize(128);
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
            p5.background(colors.primary);
            p5.fill(colors.tertiary);

            // p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
            // World.draw(p5, World.groundHeight = 100);
            p5.fill(colors.secondary);
            p5.rect(0, p5.height - 100, p5.width, 100);
        };
    };

    // On startup
    onMount(function () {
        myp5 = new p5(sketch, id);
    });

    const handleClick = () => {
        console.log('Button clicked');
    }

</script>
  
<div bind:this={id} class="canvas-container">
    {#if myp5}
        <Cat bind:this={catComponent} {myp5} windowHeight={windowSize.height} windowWidth={windowSize.width}/>
    {/if}

    <div class="overlay-text">
        <h1>rUn ThE cAT!</h1>
        <button id='start' on:click={handleClick}>start</button>
    </div>
</div>

<style>
button {
    border-radius: 5px;
    border: 3px solid #FF8142;
    background: #FFF6AE;
    font-size: 2rem;
    font-weight: 500;
    color: #FF8142;
    padding: .75rem 5rem;
}
.canvas-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

/* This puts your text on top of canvas */
.overlay-text {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center it exactly */
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;
    
}

.overlay-text h1 {
    font-size: 8rem;
    font-weight: 700;
    margin: 0;
    color: #FFF6AE;
    -webkit-text-stroke: 0.2rem #FF8142;
} 
</style>
