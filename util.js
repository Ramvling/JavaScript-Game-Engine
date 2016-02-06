//various useful objects

function Vector(x,y) {
	var vec = {x,y};
	return vec;
}

function SpriteOptions(src, srcWidth, srcHeight,frameAmount, context) {
    var options = {};
    options.src = src;
    options.srcHeight = srcHeight;
    options.srcWidth = srcWidth;
    options.frameWidth = srcWidth/ frameAmount;
    options.context = context;
    options.frameAmount = frameAmount;
    return options;
}
function Sprite(src, height, width, context, options) {
    var sprite = {};
    sprite.image = new Image();
    sprite.image.src = src;
    sprite.frame = 0;
    sprite.frameCount = 0;
    sprite.frameLength = 1;
    sprite.options = options;
    sprite.render = function() {
        options = sprite.options;
        sprite.frameCount += 1;
        if (sprite.frameCount > sprite.frameLength) {
            sprite.frameCount = 0;
            sprite.frame += 1;
            sprite.frame = sprite.frame % options.frameAmount;
        }
        context.drawImage(
            sprite.image,
            (sprite.frame * options.srcWidth) / 10,
            //could easily be adapted for multitiered sprite sheets later
            0,
            options.srcWidth / options.frameAmount,
            options.srcHeight,
            0,
            0,
            options.srcWidth / options.frameAmount,
            options.srcHeight
        )
    }

    sprite.reload = function() {
        sprite.image = new Image();
        sprite.image.src = sprite.options.src;
    }

    return sprite;
    
}

function Color(r,g,b) {
    //converts int values into hex
    red = (r % 255).toString(16);
    green = (g%255).toString(16);
    blue = (b%255).toString(16);
    return "#" + red + green + blue;   
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
