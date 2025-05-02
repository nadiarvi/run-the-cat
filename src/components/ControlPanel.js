import { Arrow } from "./Arrow";
import { colors } from "../utils/theme";

export class ControlPanel {
    constructor({ name, x, y, numBoxes }) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.numBoxes = numBoxes;
        this.boxWidth = 48;
        this.boxHeight = 48;
        this.boxSpacing = 8;
        this.contents = Array(numBoxes).fill(null);
        this.empty = new Arrow('empty');
        this.fontSize = 20;
        this.gap = this.fontSize;
    }

    setContents(contents){
        this.contents = contents;
        console.log(this.contents);
    }

    updateBox(index, content) {
        if (index >= 0 && index < this.numBoxes) {
            this.contents[index] = content;
        }
    }

    draw() {
        rectMode(CORNER);

        // Label
        fill(colors.tertiary);
        noStroke();
        rect(this.x, this.y, this._getPanelWidth(), this._getTextBoxHeight(), 5);
        fill(colors.secondary);
        textAlign(CENTER, CENTER);
        textSize(this.fontSize);
        text(this.name, this.x + this._getPanelWidth() / 2, this.y + this._getTextBoxHeight() /2);

        // White panel
        fill(255);
        noStroke();
        rect(this.x, this.y + 24 + this.gap, this._getPanelWidth(), this.boxHeight + this.boxSpacing, 6);

        // Boxes
        for (let i = 0; i < this.numBoxes; i++) {
            const bx = this.x + 10 + i * (this.boxWidth + this.boxSpacing);
            const by = this.y + 24 + this.gap + (this.boxSpacing * 1) / 2;

            // Draw content if it exists
            if (this.contents[i]) {
                if (this.contents[i] instanceof Arrow) {
                    this.contents[i].draw(bx + this.boxWidth/2 - 20, by + this.boxHeight/2 - 20);
                }
            } else {
                this.empty.draw(bx + this.boxWidth / 2 - 20, by + this.boxHeight / 2 - 20);
            }
        }        
    }

    setPosition(x, y){
        blocks.x = x;
        blocks.y = y;
    }


    //helper functions
    _getPanelWidth() {
        return this.numBoxes * (this.boxWidth + this.boxSpacing) + 12;
    }

    _getTextBoxHeight(){
        return this.fontSize + 16;
    }
}
