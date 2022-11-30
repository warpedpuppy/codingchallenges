import Utils from "./utils.js";
export default class Oval {

	constructor (ctx) {
		this.#ctx = ctx;
	}
	#ctx;

	animate = () =>  {
		let obj = Utils.returnPointsAroundACircle(150, this.counter2); 
		this.#ctx.beginPath();
		this.#ctx.ellipse(250, 450, 100, 50, Utils.degToRad(180), Utils.degToRad(0), Utils.degToRad(360));
		this.#ctx.stroke();

		this.#ctx.beginPath();
		this.#ctx.moveTo(250, 300)
		this.#ctx.lineTo(250, 500);
		this.#ctx.stroke();
	}
}