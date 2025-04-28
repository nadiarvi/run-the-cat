<script context="module">
    import {colors} from './theme';

    // Props
    export let groundHeight = 0;
    
    export function draw(p5) {
        p5.fill(colors.Pico8Style.secondary);
        p5.rect(0, p5.height - groundHeight, p5.width, groundHeight);
    }
</script>
  