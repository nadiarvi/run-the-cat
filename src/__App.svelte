<script>
    import { onMount } from 'svelte';
    import { colors } from './theme';
    import p5 from 'p5';
    import { SceneManager } from 'p5screenmanager';
    import StartScene from './StartScene.svelte';
    import GameScene from './GameScene.svelte';
    // import SanityCheck from './SanityCheck.svelte';

    let canvas;

    onMount(() => {
        const sketch = (p5) => {
            let mgr;

            p5.setup = () => {
                const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
                canvas = cnv;

                mgr = new p5.SceneManager();
                
                mgr.addScene(StartScene);
                // mgr.addScene(GameScene);
                // mgr.addScene(SanityCheck);

                mgr.showNextScene(StartScene);
            };

            p5.draw = () => {
                mgr.draw();
            };

            p5.mousePressed = () => {
                mgr.handleEvent("mousePressed");
            };

            p5.keyPressed = () => {
                switch(p.key) {
                    case '1':
                        mgr.showScene(StartScene);
                        break;
                    case '2':
                        mgr.showScene(GameScene);
                        break;
                    case '3':
                        mgr.showScene(SanityCheck);
                        break;
                }
                mgr.handleEvent("keyPressed");
            };
        };

        new p5(sketch);
    });

    console.log('this is the screenmanager screen');
</script>

<style>
    :global(canvas) {
        display: block;
    }
</style>
