import Utils from "./utils.js";
import Graphics from './graphics.js';
export default class Disc {
	constructor(ctx, radius = 125, dir) {
		this.#ctx = ctx;
		this.#radius = radius;
		if (dir % 2 === 0) this.#rotationSpeed *= -1;
	}
	#ctx;
	#counter = 0;
	#rotationSpeed = Utils.randomNumberBetween(0.005, 0.0005);
	#counter2 = 10;
	#dotX;
	#dotY;
	#discX;
	#discY;
	#dots = [];
	#radius;
	#hide = false;
	
	#highlight = false;
	temp = 0;

	startCoords = this.getDotCoordinates();

	getDotCoordinates () {
		return { x: this.#dotX, y: this.#dotY }
	}

	hide(bool) {
		this.#hide = bool;
	}

	switchDirections = () => {
		this.#rotationSpeed *= -1;
	}

	getDiscCoordinates () {
		return { x: this.#discX, y: this.#discY, radius: this.#radius}
	}

	highlight (bool) {
		this.#highlight = bool;
	}

	addDot (point) {
		if (!point || !this.#highlight) return false;
		this.#dots.push(this.createDot(point))
		return true
	}

	setDotStartCounter (point) {

		var Vx = point.x - this.getDiscCoordinates().x;
		var Vy = point.y - this.getDiscCoordinates().y;

		var radians;

		if (Vx || Vy) {
			radians = Math.atan2(Vy, Vx);
		} else {
			radians = 0;
		}

		if (radians < 0) {
			radians += 2*Math.PI;
		}

		var degrees = radians * 180 / Math.PI;

		this.calculatedAngle = degrees;

		let perc = (this.calculatedAngle - 180) / 360 ;

		return perc;
	}

	createDot (point) {
		let discCoords = this.getDiscCoordinates();
		return {
			x: point.x,
			y: point.y,
			counter: this.setDotStartCounter(point),
			startCoords: {x: this.#discX - point.x, y: this.#discY - point.y},
			distFromCenter: Utils.getDistance(point.x, point.y, discCoords.x,  discCoords.y),
			lines: [],
			color: Utils.randomColor()
		}
	}

	
	animate = () => {
		let ctx = this.#ctx

		this.#counter += this.#rotationSpeed;

		if (this.#counter >= 1) this.#counter = 0;
		let { x, y } = Utils.returnPointsAroundACircle((250 - this.#radius), this.#counter);

		this.#discX = 250 + x;
		this.#discY = 250 + y;

		if (!this.#hide) {
			Graphics.drawCircle({x: this.#discX, y: this.#discY}, this.#radius, this.#highlight)
			this.temp -= this.#rotationSpeed;
			this.createLines(ctx, this.temp)
		}
		
		

		this.#dots.forEach( dot => {
			let obj = Utils.returnPointsAroundACircle(dot.distFromCenter, dot.counter);
			
			dot.x = this.#discX - obj.x;
			dot.y = this.#discY - obj.y;
			dot.counter -= this.#rotationSpeed;
			
			dot.lines.push({x: dot.x, y: dot.y})
			ctx.strokeStyle = "black";

			Graphics.drawCircle({x: dot.x, y: dot.y}, 5, this.#highlight)

			ctx.beginPath();
			ctx.strokeStyle = dot.color;
			dot.lines.forEach( item => {
				ctx.lineTo(item.x, item.y);
			})
			ctx.stroke();

			ctx.strokeStyle = "black";

		})


		
	}

	createLines(ctx, temp){

		if (Math.abs(this.temp) > 1) this.temp = 0;

		let discCoords = this.getDiscCoordinates();

		let startCoords = Utils.distributeAroundCircle(discCoords, this.#radius, temp);
		let endCoords = Utils.distributeAroundCircle(discCoords, -this.#radius, temp);
		Graphics.drawLine(startCoords, endCoords)

		ctx.strokeStyle = "red";
		this.#counter2 = temp + 0.25;

		startCoords =  Utils.distributeAroundCircle(discCoords, this.#radius, this.#counter2 );
		endCoords =  Utils.distributeAroundCircle(discCoords, -this.#radius, this.#counter2  );
		Graphics.drawLine(startCoords, endCoords)

		ctx.strokeStyle = "black";
	}
}