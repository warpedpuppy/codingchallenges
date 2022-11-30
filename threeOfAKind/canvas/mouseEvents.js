import Utils from './utils.js';
import VARS from './vars.js';
class MouseEvents {

	constructor(threeOfAKind) {
		this.#update = threeOfAKind.update;
		this.three = threeOfAKind;
	}
	#chosenSquares = [];
	#activeSquare;
	#update;
	three;


	mouseDownHandler = e => {
		if (this.#chosenSquares.length >= 2) {
			this.#chosenSquares = [];
		} else if (this.#chosenSquares.length === 1) {
			let { row: row1, col: col1 } = this.#chosenSquares[0];
			let { row: row2, col: col2 } = this.#activeSquare;
			if (Math.abs(col1-col2) <= 1 && Math.abs(row1-row2) <= 1) {
				[this.#chosenSquares[0].color, this.#activeSquare.color] = [this.#activeSquare.color, this.#chosenSquares[0].color];	
				this.#update();
				this.#chosenSquares = [];
			} else {
				this.#chosenSquares = [];
				return;
			}
		} else {
			this.#chosenSquares.push(this.#activeSquare)
		}
	}

	mouseMoveHandler = e => {
		const { ROWQ, COLQ, rects, canvas } = VARS;
		const { pageX: mouseX, pageY: mouseY } = e;
		const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

		let mouseXOnCanvas = mouseX - canvasX;
		let mouseYOnCanvas = mouseY - canvasY;
		let test = [];
		for (let row = 0; row < ROWQ; row++) {
			for (let col = 0; col < COLQ; col++) {
				if (Utils.rectPointCollision(mouseXOnCanvas, mouseYOnCanvas, rects[row][col])) {
					this.#activeSquare = rects[row][col];
					test.push(true)
				} else {
					test.push(false)
				}
			}
		}
		if (test.includes(true)) {
			canvas.classList.add('over')
		} else {
			canvas.classList.remove('over')
		}
	}

	change (dimension, value) {
		this.#chosenSquares = [];
		this.#activeSquare = undefined
		this.three.build(dimension, value)
	}
}

export default MouseEvents;