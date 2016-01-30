//various useful objects

function Vector(x,y) {
	var vec = {x,y};
	return vec;
}

function SpriteOptions(src, srcHeight, srcWidth,framecount, tier) {
    var options = {};
    options.srcHeight = srcHeight;
    options.srcWidth = srcWidth;
    options.frameWidth
}
function Sprite(src, height, width, context) {
    var sprite = {};
    sprite.image = new Image();
    sprite.image.src = src;
    sprite.frame = 0;
    sprite.frameCount = 0;
    sprite.frameLength = 1;
    sprite.render = function() {
        sprite.frameCount += 1;
        if (sprite.frameCount > sprite.frameLength) {
            sprite.frameCount = 0;
            sprite.frame += 1;
            sprite.frame = sprite.frame % 10;
        }
        context.drawImage(
            sprite.image,
            (sprite.frame * 1000) / 10,
            //could easily be adapted for multitiered sprite sheets later
            0,
            1000 / 10,
            height,
            0,
            0,
            1000 / 10,
            height
        )
    }
    return sprite;
    
}

function Example() {
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
