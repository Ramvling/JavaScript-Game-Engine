window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

var keysDown = [];
var keyMaps = {};
mapKeyCodes();

function handleInputs() {
	//passes commands to the other modules. Called every time in the game loop
	if (keysDown[keyMaps['Right']]) {
		console.log('Right');
		player.move(1,0);
	}

	if (keysDown[keyMaps['Left']]) {
		console.log('Left');
		player.move(-1,0);
	}

	if (keysDown[keyMaps['Down']]) {
		console.log('Down');
		player.move(0,1);
	}

	if (keysDown[keyMaps['Up']]) {
		console.log('Up');
		player.move(0,-1);
	}
}
function keysPressed(e) {
	//stores the keys currently pressed
	keysDown[e.keyCode] = true;
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