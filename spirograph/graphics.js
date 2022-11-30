import Utils from "./utils.js";
export default class Graphics {
	static init(ctx){
		this.ctx = ctx;
	}
	static drawLine(startCoords, endCoords) {
		this.ctx.beginPath();
		this.ctx.moveTo(startCoords.x, startCoords.y);
		this.ctx.lineTo(endCoords.x, endCoords.y);
		this.ctx.stroke();
	} 
	static drawCircle(center, radius, highlight = false) {
		this.ctx.beginPath();
		let arc = this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		if (highlight) {
			this.ctx.globalAlpha = 0.05;
			this.ctx.fillStyle = 'yellow';
			this.ctx.fill(arc);
			this.ctx.globalAlpha = 1;
		}
		this.ctx.stroke();
	}
}