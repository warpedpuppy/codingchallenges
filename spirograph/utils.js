export default class Utils {
	static returnPointsAroundACircle (radius, i) {
		const x = radius * Math.cos((2 * Math.PI) * i)
		const y = radius * Math.sin((2 * Math.PI) * i)
		return { x, y }
	}
	static distributeAroundCircle(circleCenter, radius, i) {
		const x = circleCenter.x + radius * Math.cos((2 * Math.PI) * i )
		const y = circleCenter.y + radius * Math.sin((2 * Math.PI) * i )
		return { x, y }
	  }
	static degToRad (deg) {
		return deg * ( Math.PI / 180.0 );
	}
	static radToDeg (radians) {
	  return radians * ( 180/ Math.PI );
	}
	static cosWave (startPoint, differential, speed) {
		// place in an onEnterFrame Handler0.0015
	
		const currentDate = new Date()
		return startPoint + (Math.cos(currentDate.getTime() * speed) * differential)
	  }
	static randomNumberBetween (min, max) {
		return Math.random() * (max - min) + min
	  }
	static randomIntBetween (min, max) {
		max++
		return Math.floor(Math.random() * (max - min) + min)
	}
	// static distributeAroundCircle (circleCenter, numElements, radius) {
	// 	const arr = []
	// 	for (let i = 0; i < numElements; i++) {
	// 	  const x = circleCenter.x + radius * Math.cos((2 * Math.PI) * i / numElements)
	// 	  const y = circleCenter.y + radius * Math.sin((2 * Math.PI) * i / numElements)
	// 	  arr.push({ x, y })
	// 	}
	// 	return arr
	//   }
	static pointCircle(px, py, cx, cy, r) {
		let distX = px - cx;
		let  distY = py - cy;
		let distance = Math.sqrt( (distX*distX) + (distY*distY) );
		if (distance <= r) {
		  return true;
		}
		return false;
	  }
	static getDistance(x1, y1, x2, y2){
		let y = x2 - x1;
		let x = y2 - y1;
		
		return Math.sqrt(x * x + y * y);
	}
	static randomColor () {
		let colors =  [
			'violet',
			'lightblue',
			'blue',
			// 'lightgreen',
			// 'yellow',
			'orange',
			'red'
		]
		return colors[Math.floor(Math.random()*colors.length)]
	}
}