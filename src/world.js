import { colors } from './utils/theme.js';

export const groundHeight = 100;

export function draw(p, groundHeight) {
  fill(colors.secondary);
  rect(0, height - groundHeight, width, groundHeight);
}
