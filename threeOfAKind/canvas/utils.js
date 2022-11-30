class Utils {
	 static rectPointCollision = (x, y, rect) => {
		if (x > rect.x &&
			x < (rect.x + rect.width) &&
			y > rect.y && 
			y < (rect.y + rect.height)) {
				return true;
			}
		return false;
	}
}
export default Utils;