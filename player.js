function Entity(x,y) {
    var entity = {};
    entity.color = "#FF00FF";
	entity.x = x;
	entity.y = y;
    entity.width = (w/100);
    entity.height = (h/100);
	//change this soon
	entity.speed = 1.5;
	entity.move = function(dx,dy) {
		entity.x += (dx * entity.speed);
		entity.y += (dy * entity.speed);
	}

	entity.draw = function(ctxt) {
		ctxt.fillStyle = entity.color;
		ctxt.fillRect(entity.x,entity.y,(entity.width),(entity.height));
		return;
	}

    entity.collide = function(other) {
        //basic bounding boxes for now
        if ((entity.x < other.x + other.width) && (entity.x + entity.width > other.x) && (entity.y < other.y + other.height) && (entity.y + entity.height > other.y)) {
        console.log("collide");
        }
    }
	return entity;
}

function Player() {
    var player = Entity(0,35);
    player.color = "#00FF00";
    player.width = 100;
    player.height = 100;
/*	var player = {};
	player.x = 0;
	player.y = 35;
    player.width = w/100;
    player.height = h/100;
	//player.physics = new Vector(0,0);
	//change this soon
	player.speed = 1.5;
	player.move = function(dx,dy) {
		player.x += (dx * player.speed);
		player.y += (dy * player.speed);
	}

	player.draw = function(ctxt) {
		ctxt.fillStyle = "#FF0000";
		ctxt.fillRect(player.x,player.y,(w/100),(h/100));
		return;
	}*/
	return player;
}
