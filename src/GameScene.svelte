<script>
    export let p; // p5 instance
    export let sceneManager;

    let circleX;
    let circleY;
    let colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    let currentColor = 0;

    export function enter() {
        circleX = p.width / 2;
        circleY = p.height / 2;

        p.background('#222831');
        p.textAlign(p.CENTER);
        p.fill('#EEEEEE');
        p.text("Click to change colors\n" + 
               "Use arrow keys to move the circle\n" +
               "Space to advance to next scene", p.width / 2, p.height / 2);
    }

    export function keyPressed() {
        if (p.keyCode === 32) { // spacebar
            sceneManager.showNextScene();
        }
        
        if (p.keyCode === p.LEFT_ARROW) circleX -= 10;
        if (p.keyCode === p.RIGHT_ARROW) circleX += 10;
        if (p.keyCode === p.UP_ARROW) circleY -= 10;
        if (p.keyCode === p.DOWN_ARROW) circleY += 10;
        
        p.background('#222831');
        p.fill(colors[currentColor]);
        p.circle(circleX, circleY, 50);
    }

    export function mousePressed() {
        currentColor = (currentColor + 1) % colors.length;
        p.fill(colors[currentColor]);
        p.circle(circleX, circleY, 50);
    }
</script>
