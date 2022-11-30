import Disc from './disc.js';
import DiscInDisc from './discInDisc.js';
import Utils from './utils.js';
import Graphics from './graphics.js';
import Oval from './oval.js';
(function(){
	const canvas = document.querySelector("canvas"),
		  ctx = canvas.getContext("2d"),
		  discs = [],
		  discsInDiscs = [],
		  ovals = [];

	canvas.width = 500;
	canvas.height = 500;
	let activePoint, testX, testY, hide = false;
	Graphics.init(ctx)


	function loop () {
		ctx.strokeStyle = "#000000";
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		Graphics.drawCircle({x: 250, y: 250}, 250);
		discs.forEach( disc => {
			disc.animate();
		})
		discsInDiscs.forEach( discsInDisc => {
			discsInDisc.animate();
		})
		requestAnimationFrame(loop)
	}

	requestAnimationFrame(loop);

	function clear() {
		discs.length = 0;;
		discsInDiscs.length = 0;;
	}

	function addNewDisc() {
		let disc = new Disc(ctx,  Utils.randomIntBetween(100,125), discs.length - 1);
		discs.push(disc);
	}
	function addNewDiscInDisc() {
		let disc = new DiscInDisc(ctx,  Utils.randomIntBetween(100,125), discsInDiscs.length - 1);
		discsInDiscs.push(disc);

	}
	function hideDiscs(){
		hide = !hide;
		for (let i = 0; i < discs.length; i++) {
			
			discs[i].hide(hide);
		}
		for (let i = 0; i < discsInDiscs.length; i++) {
			discsInDiscs[i].hide(hide);
		}
	}

	const mouseMoveHandler = e => {
		const { pageX: mouseX, pageY: mouseY } = e;
		const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();

		let mouseXOnCanvas = testX = mouseX - canvasX;
		let mouseYOnCanvas = testY = mouseY - canvasY;

		let test = [];
		for (let i = 0; i < discs.length; i++) {
			let disc = discs[i]
			let coords = disc.getDiscCoordinates();

			if (Utils.pointCircle(mouseXOnCanvas, mouseYOnCanvas, coords.x, coords.y, coords.radius)) {
				activePoint = { x: mouseXOnCanvas, y: mouseYOnCanvas };
				test.push(true)
				// 
			} else {
				test.push(false)
			}

			if (test.includes(true)) {
				canvas.classList.add('over');
				disc.highlight(true);
				break;
			} else {
				canvas.classList.remove('over');
				disc.highlight(false);
			}
		}

		for (let i = 0; i < discsInDiscs.length; i++) {
			let disc = discsInDiscs[i]
			let coords = disc.getDiscCoordinates();

			if (Utils.pointCircle(mouseXOnCanvas, mouseYOnCanvas, coords.x, coords.y, coords.radius)) {
				activePoint = { x: mouseXOnCanvas, y: mouseYOnCanvas };
				test.push(true)
			} else {
				test.push(false)
			}

			if (test.includes(true)) {
				canvas.classList.add('over');
				disc.highlight(true);
				break;
			} else {
				canvas.classList.remove('over');
				disc.highlight(false);
			}
		}
	}

	const mouseDownHandler = e => {
		let happen;
		for (let i = 0; i < discs.length; i++) {
			let disc = discs[i]
			happen = disc.addDot(activePoint)
			if (happen) break;
		}
		if (happen) return;

		for (let i = 0; i < discsInDiscs.length; i++) {
			let disc = discsInDiscs[i]
			let happen = disc.addDot(activePoint)
			if (happen) break;
		}
	};

	document.querySelector("#clear").addEventListener('click', clear);
	document.querySelector("#hideDiscs").addEventListener('click', hideDiscs);
	document.querySelector("#addNewDiscInDisc").addEventListener('click', addNewDiscInDisc);
	document.querySelector("#addNewDisc").addEventListener('click', addNewDisc);
	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mousedown', mouseDownHandler);
})()