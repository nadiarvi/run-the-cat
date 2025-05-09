export class MyButton {
    constructor({ x, y, text, mode = "CORNER", style = {}, onPress = null, size = 'small' }) {
      this.button = new Clickable();
  
      // Apply layout
      this.button.mode = mode;
      this.button.locate(x, y);
      
      // Apply text
      this.button.text = text;
  
      // Apply styles
      this.button.width = style.width || 150;
      this.button.height = style.height || 50;
      this.button.color = style.color || "#ffffff";
      this.button.stroke = style.stroke || "#000000";
      this.button.strokeWeight = style.strokeWeight || 2;
      this.button.textFont = style.textFont || "sans-serif";
      this.button.textSize = style.textSize || 16;
      this.button.textColor = style.textColor || "#000000";
  
      // Event
      if (onPress) {
        this.button.onPress = onPress;
      }
    }
  
    draw() {
      this.button.draw();
    }
  
    setText(newText) {
      this.button.text = newText;
    }
  
    setPosition(x, y) {
      this.button.locate(x, y);
    }
};