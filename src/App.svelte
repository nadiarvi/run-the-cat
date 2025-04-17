<script>
  import { onMount } from 'svelte';

  let id; // the div in the HTML
  let sprite;

  const sketch = (p5) => {
    p5.setup = async () => {
      p5.createCanvas(400, 300);
      sprite = new p5.Sprite();
      sprite.img = '/assets/monster.png';
      sprite.diameter = 100;
      sprite.scale = 0.5;
    };

    p5.draw = () => {
      p5.clear();
      p5.fill(100);
      p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
      sprite.debug = p5.mouse.pressing();
    };
  };

  // On startup
  onMount(function () {
    let myp5 = new p5(sketch, id);
  });
</script>

<div {id} />
