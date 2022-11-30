const VARS = {
	COLQ: 30, 
	ROWQ: 15, 
	BOX_WIDTH: 20, 
	BOX_HEIGHT: 20, 
	SPACER: 25,
	BOARD_WIDTH: undefined,
	BOARD_HEIGHT: undefined,
	SCREEN_WIDTH: undefined,
	SCREEN_HEIGHT: undefined,
	LEFT_ADJUST: undefined,
	TOP_ADJUST: undefined,
	rects: {},
	colors: [
		'violet',
		'lightblue',
		'blue',
		'lightgreen',
		'yellow',
		'orange',
		'red'
	],
	init: function (canvas) {
		VARS.canvas = canvas;
		this.SCREEN_WIDTH = canvas.width;
		this.SCREEN_HEIGHT = canvas.height
		this.BOARD_WIDTH = (this.BOX_WIDTH + (this.SPACER - this.BOX_WIDTH)) * this.COLQ;
		this.BOARD_HEIGHT = (this.BOX_HEIGHT + (this.SPACER - this.BOX_HEIGHT)) * this.ROWQ;
		this.LEFT_ADJUST = (this.SCREEN_WIDTH - this.BOARD_WIDTH) / 2;
		this.TOP_ADJUST = (this.SCREEN_HEIGHT - this.BOARD_HEIGHT) / 2;
		this.rects = {};
	}
}

export default VARS;