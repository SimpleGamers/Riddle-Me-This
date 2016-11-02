var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();


function getDeltaTime() {
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();

    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;

    if (deltaTime > 1)
        deltaTime = 1;

    return deltaTime;
}

//ABOVE DON'T TOUCH



var fps = 0;
var fpsCount = 0;
var fpsTime = 0;
var Timer = 30;
var LAYER_COUNT = 4;
var LAYER_BACKGOUND = 0;
//walls
var LAYER_PLATFORMS = 1;



var LAYER_OBJECT_TRIGGERS = 3

var MAP = { tw: 60, th: 15 };
var TILE = 8;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 0;
var TILESET_SPACING = 1;
var TILESET_COUNT_X = 17;
var TILESET_COUNT_Y = 14;

var METER = TILE;
var GRAVITY = 0;
var MAXDX = METER * 10;
 // max vertical speed (15 tiles per second)
var MAXDY = METER * 15;
 // horizontal acceleration - take 1/2 second to reach maxdx
var ACCEL = MAXDX * 2;
 // horizontal friction - take 1/6 second to stop from maxdx
var FRICTION = MAXDX * 6;



var player = new Player();
var keyboard = new Keyboard();

if (player.x == 42 && player.y == 90) {
    prompt("What is blue and grey and hairy all over");
};



var tileset = document.createElement("img");
tileset.src = "16pxVersion - Olek.png";

function cellAtPixelCoord(layer, x,y)
{
	if(x<0 || x>SCREEN_WIDTH) // || y<0)
		return 1;
	// let the player drop of the bottom of the screen (this means death)
	if(y>SCREEN_HEIGHT)
		return 0;
	return cellAtTileCoord(layer, p2t(x), p2t(y));
};

function cellAtTileCoord(layer, tx, ty)
{
	if(tx<0 || tx>=MAP.tw) // || ty<0)
		return 1;
	// let the player drop of the bottom of the screen (this means death)
	if(ty>=MAP.th)
		return 0;
};

function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
};

function bound(value, min, max)
{
	if(value < min)
		return min;
	if(value > max)
		return max;
	return value;
}

function drawMap() {
    for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) {
        var idx = 0;
        for (var y = 0; y < level1.layers[layerIdx].height; y++) {
            for (var x = 0; x < level1.layers[layerIdx].width; x++) {
                if (level1.layers[layerIdx].data[idx] != 0) {
                    var tileIndex = level1.layers[layerIdx].data[idx] - 1;
                    var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
                    var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_X)) * (TILESET_TILE + TILESET_SPACING);
                    context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x * TILE, (y - 1) * TILE, TILESET_TILE, TILESET_TILE);
                }
                idx++;
            }
        }
    }
}

var cells = []; // the array that holds our simplified collision data
function initialize() {
    for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) { // initialize the collision map
        cells[layerIdx] = [];
        var idx = 0;
        for (var y = 0; y < level1.layers[layerIdx].height; y++) {
            cells[layerIdx][y] = [];
            for (var x = 0; x < level1.layers[layerIdx].width; x++) {
                if (level1.layers[layerIdx].data[idx] != 0) {
                    // for each tile we find in the layer data, we need to create 4 collisions
                    // (because our collision squares are 35x35 but the tile in the
                    // level are 70x70)
                    cells[layerIdx][y][x] = 1;
                    cells[layerIdx][y - 1][x] = 1;
                    cells[layerIdx][y - 1][x + 1] = 1;
                    cells[layerIdx][y][x + 1] = 1;
                }
                else if (cells[layerIdx][y][x] != 1) {
                    // if we haven't set this cell's value, then set it to 0 now
                    cells[layerIdx][y][x] = 0;
                }
                idx++;
            }
        }
    }
}
function run() {

    context.fillStyle = "#ccc";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var deltaTime = getDeltaTime();
	
	player.update(deltaTime);
	
	
	context.save();
	context.scale(2, 4);

    drawMap();
	player.draw();
	console.log(player.position.x + ", " + player.position.y);
	context.restore();
    fpsTime += deltaTime;
    fpsCount++;
    if (fpsTime >= 1) {
        fpsTime -= 1;
        fps = fpsCount;
        fpsCount = 0;
    }
    
    context.fillStyle = "#f00";
    context.font = "14px Arial";
    context.fillText("FPS: " + fps, 5, 20, 100);
	
	
   if(Timer >= 0){
    Timer -= deltaTime;
    //Timer Drawing
    context.fillStyle = "#f00";
    context.font = "14px Arial";
    context.fillText("Time Left: " + Timer.toFixed(2), 375, 20, 100);
}
    //Game end
    
    if(Timer <= 0){
     
    context.fillStyle = "#ffff00";
    context.font = "20px Arial";
    context.fillText("You Loose", 40, 100);
    
    }  
}
initialize();

//BELOW DON'T TOUCH

(function () {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.requestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / 60)
        }
    }

    window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);

