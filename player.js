function Player() {
	var player = {};
	player.x = 0;
	player.y = 35;
	//player.physics = new Vector(0,0);
	//change this soon
	player.speed = 1.5;
	player.move = function(dx,dy) {
		player.x += (dx * player.speed);
		player.y += (dy * player.speed);
		console.log(player.x + ' ' + player.y);
	}

	player.draw = function(ctxt) {
		ctxt.fillStyle = "#FF0000";
		ctxt.fillRect(player.x,player.y,(w/100),(h/100));
		return;
	}
	return player;
}