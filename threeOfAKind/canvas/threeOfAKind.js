import VARS from "./vars.js";
export default class ThreeOfAKind {

		constructor(ctx, canvas) {
			this.ctx = ctx;
			this.canvas = canvas;
			this.ctx.strokeStyle = "black";
			this.setUp();
			this.update();
		}

		canvas;
		ctx;
	
		setUp () {
			for (let row = 0; row < VARS.ROWQ; row++) {
				VARS.rects[row] = []
				for (let col = 0; col < VARS.COLQ; col++) {
					VARS.rects[row].push(this.rectangle(col, row))
				}
			}
		}

		build(dimension, value) {
			if (dimension === 'cols'){ VARS.COLQ = value;} else if (dimension === 'rows') { VARS.ROWQ = value; }
			VARS.init(this.canvas)
			this.setUp();
			this.update();
		}

		update = async () => {
			
			let rowsWithThrees = [];
			let colsWithThrees = [];
			let colColorTracker = {};
			for (let row = 0; row < VARS.ROWQ; row++) {
				let rowColorTracker = [];
				for (let col = 0; col < VARS.COLQ; col++) {

					let item = VARS.rects[row][col];

					// columns
					 let [ arr1, arr2 ] = this.searchForGroupsOfThreesOrMore (row, colColorTracker[col], item, colsWithThrees, 'row')
					 colsWithThrees = arr1;
					 colColorTracker[col] = arr2;
					
					 //rows
					let [ arr3, arr4 ] = this.searchForGroupsOfThreesOrMore (rowColorTracker.length, rowColorTracker, item, rowsWithThrees, 'col')
					rowsWithThrees = arr3;
					rowColorTracker = arr4;
					
				}
			}
			this.draw(rowsWithThrees, colsWithThrees);
		}

		searchForGroupsOfThreesOrMore (start, tracker, item, collectionOfThrees, metric) {
			
			if ( start === 0) {
				tracker = [ item ];
			} else {
				let latestColor = tracker[tracker.length - 1].color;
				if (item.color === latestColor) { // IF IT MATCHES COLOR
					
					tracker.push(item);

					//if it is the final item in the row or col and there is a group, put them in the collection array
					if (tracker.length > 2 && 
						((metric === 'col' && item.col === VARS.COLQ - 1) || (metric === 'row' && item.row === VARS.ROWQ - 1))) {
						collectionOfThrees = [...collectionOfThrees, ...tracker]
					}

				} else if (item.color !== latestColor && tracker.length > 2) { // IF IT DOES NOT MATCHES COLOR
					// STORE CURRENT VALUES
					collectionOfThrees = [...collectionOfThrees, ...tracker]
					// START AGAIN
					tracker = [ item ];
				} else {
					tracker = [ item ];
				}
			}
			return [ collectionOfThrees, tracker ];
		}

		draw(rowsWithThrees, colsWithThrees) {
			const { BOX_WIDTH: width, BOX_HEIGHT: height, ROWQ, COLQ, LEFT_ADJUST, TOP_ADJUST, rects, SPACER } = VARS;

			this.ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let row = 0; row < ROWQ; row++) {
				for (let col = 0; col < COLQ; col++) {
					let item = rects[row][col];
					this.ctx.fillStyle = item.color;
					let xPos = LEFT_ADJUST + col * SPACER;
					let yPos = TOP_ADJUST + row * SPACER;
					let adjust = width * 0.25 ;
					let xPosAdjusted = xPos + adjust;
					let yPosAdjusted = yPos + adjust;

					if (rowsWithThrees.includes(item) || colsWithThrees.includes(item)) {
						this.ctx.strokeRect(xPosAdjusted, yPosAdjusted, width * 0.5, height * 0.5);
						this.ctx.fillRect(xPosAdjusted, yPosAdjusted, width * 0.5, height * 0.5);
					} else {
						this.ctx.strokeRect(xPos, yPos, width, height);
						this.ctx.fillRect(xPos, yPos, width, height);
					}
				}
			}
		}

		rectangle(col, row) {
			const { BOX_WIDTH: width, BOX_HEIGHT: height, colors, LEFT_ADJUST, TOP_ADJUST, SPACER } = VARS;
			let color = colors[ Math.floor(Math.random() * colors.length) ];
			let x = (col * SPACER) + LEFT_ADJUST;
			let y = (row *  SPACER) + TOP_ADJUST;
			return { color, row, col, x, y, width, height};
		}
		
	}