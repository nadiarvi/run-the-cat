<script>
    export let p; // p5 instance will be passed from the screen manager
    export let sceneManager; // scene manager will be passed from the parent

    let textX;
    let textY;

    export function enter() {
        textX = 10;
        textY = 0;

        p.background("teal");
        p.textAlign(p.CENTER);
        p.fill("black");
        p.text("Press keys 1, 2, 3 to jump to a particular animation\n" + 
                    "... or mouse to advance animation.\n\n" +
                    "Press any key to display it.", p.width / 2, p.height / 2);
    }

    export function keyPressed() {
        p.text(p.keyCode, textX, textY += 10);
        if (textY > p.height) {
            textX += 20;
            textY = 0;
        }
    }

    export function mousePressed() {
        sceneManager.showNextScene();
    }
</script>
