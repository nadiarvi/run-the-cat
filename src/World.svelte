<script context="module">
    import {colors} from './theme';
    
    export function draw(p5) {
        p5.fill(colors.Pico8Style.secondary);
        p5.rect(0, p5.height - 50, p5.width, 50);
    }
</script>
  