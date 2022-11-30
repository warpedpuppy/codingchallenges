import ThreeOfAKind from './threeOfAKind.js';
import MouseEvents from './mouseEvents.js';
import VARS from './vars.js';

(function(){


	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	VARS.init(canvas);
	const three = new ThreeOfAKind(ctx, canvas);
	const mouseEvents = new MouseEvents(three);

	

	let rowSelect = document.querySelector("#rows")
	for (let i =5; i <= 15; i++){
		let option = document.createElement('option');
		option.innerText = i;
		if ( i===15 ) option.selected = true;
		rowSelect.appendChild(option)
	}
	rowSelect.addEventListener('change', e => mouseEvents.change('rows', e.target.value))

	let colSelect = document.querySelector("#cols")
	for (let i =10; i <= 30; i++){
		let option = document.createElement('option');
		option.innerText = i;
		if ( i===30 ) option.selected = true;
		colSelect.appendChild(option)
	}
	colSelect.addEventListener('change', e => mouseEvents.change('cols', e.target.value))

	
	document.addEventListener('mousemove', mouseEvents.mouseMoveHandler);
	document.addEventListener('mousedown', mouseEvents.mouseDownHandler)

})()