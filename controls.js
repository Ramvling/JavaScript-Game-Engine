window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

var keysDown = [];
var keyMaps = {};
mapKeyCodes();
function keysPressed(e) {
	//stores the keys currently pressed
	keysDown[e.keyCode] = true;
	if (keysDown[keyMaps['Right']]) {
		console.log('Right');
	}

	if (keysDown[keyMaps['Left']]) {
		console.log('Left');
	}
}

function keysReleased(e) {
	//clears the keys that have been released
	keysDown[e.keyCode] = false;
}

function mapKeyCodes() {
	keyMaps['Ctrl'] = 17;
	keyMaps['Left'] = 37;
	keyMaps['Up'] = 38;
	keyMaps['Right'] = 39;
	keyMaps['Down'] = 40;
}