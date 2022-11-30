import Utils from "./utils.js";
import Graphics from './graphics.js';
export default class DiscInDisc {
	constructor(ctx, radius = 125, dir) {
		this.#ctx = ctx;
		this.#radius = radius;
		this.#innerRadius = radius * 0.85;
		this.#innerDiscRadius = radius * 0.65;
		if (dir % 2 === 0) this.#rotationSpeed *= -1;
	}
	#ctx;
	#radius;
	#innerRadius;
	#innerDiscRadius;
	#rotationSpeed;
	#discX;
	#discY;
	#dots = [];
	#innerDiscX;
	#innerDiscY;
	#counter = 0;
	#counter2 = 0;
	#highlight = false;
	#hide = false;

	getDiscCoordinates () {
		return { x: this.#innerDiscX, y: this.#innerDiscY, radius: this.#innerDiscRadius }
	}
	highlight (bool) {
		this.#highlight = bool;
	}
	hide(bool) {
		this.#hide = bool;
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
	animate () {
		this.#counter += 0.0025;
		let outerCoords = Utils.returnPointsAroundACircle((250 - this.#radius), this.#counter);

		this.#discX = 250 + outerCoords.x;
		this.#discY = 250 + outerCoords.y;

		if (!this.#hide) {
			Graphics.drawCircle({x: this.#discX, y: this.#discY}, this.#radius, false);
			Graphics.drawCircle({x: this.#discX, y: this.#discY}, this.#innerRadius, false);
		}
		
		let diff = this.#innerRadius - this.#innerDiscRadius;

		let radius = (this.#discX + diff) - this.#discX;
		this.#counter2 += -0.0025;
		let innerCoords = Utils.returnPointsAroundACircle(radius, this.#counter2);

		this.#innerDiscX = this.#discX + innerCoords.x;
		this.#innerDiscY = this.#discY + innerCoords.y;
		if (!this.#hide) {
			Graphics.drawCircle(
				{
					x: this.#innerDiscX, 
					y: this.#innerDiscY, 
				}, this.#innerDiscRadius, false);
		}

		this.#dots.forEach( dot => {
			let obj = Utils.returnPointsAroundACircle(dot.distFromCenter, dot.counter); 
		
			dot.x = this.#discX - obj.x;
			dot.y = this.#discY - obj.y;
			dot.counter -= 0.025;
			dot.lines.push({x: dot.x, y: dot.y})
			this.#ctx.strokeStyle = "black";

			this.#ctx.beginPath();
			this.#ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
			this.#ctx.stroke();

			this.#ctx.strokeStyle = dot.color;

			this.#ctx.beginPath();
			dot.lines.forEach( item => {
				this.#ctx.lineTo(item.x, item.y);
			})
			this.#ctx.stroke();

			this.#ctx.strokeStyle = "black";

		})
	}

}