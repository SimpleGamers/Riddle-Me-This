<<<<<<< HEAD
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;


// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime() {
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();

    // Find the delta time (dt) - the change in time since the last drawFrame
    // We need to modify the delta time to something we can use.
    // We want 1 to represent 1 second, so if the delta is in milliseconds
    // we divide it by 1000 (or multiply by 0.001). This will make our 
    // animations appear at the right speed, though we may need to use
    // some large values to get objects movement and rotation correct
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;

    // validate that the delta is within range
    if (deltaTime > 1)
        deltaTime = 1;

    return deltaTime;
}

var LAYER_COUNT = 3;
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

var tileset = document.createElement("img");
tileset.src = "RESIZEDtileset.png"

function drawMap() {
    for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) {
        var idx = 0;
        for (var y = 0; y < level1.layers[layerIdx].height; y++) {
            for (var x = 0; x < level1.layers[layerIdx].width; x++) {
                if (level1.layers[layerIdx].data[idx] != 0) {
                    // the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tileset id to get the
                    // correct tile
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

function run() {

    context.fillStyle = "#ccc";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var deltaTime = getDeltaTime();
    drawMap();
  
}

(function() {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); window.requestAnimationFrame(_cb);}
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function(cb) {
            setInterval(cb, 1000 / 60)
        }
    }
    
    window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
=======
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

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var LAYER_COUNT = 3;
var LAYER_BACKGROUND = 0;
var LAYER_WALLS = 1;
var LAYER_OBJECTIVES = 2;
var MAP = { tw: 16, th: 16 };
var TILE = 8;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 0;
var TILESET_COUNT_X = 19;
var TILESET_COUNT_Y = 19;




var tileset = document.createElement("img");
tileset.src = "sheet.png";

function drawMap() {
    for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) {
        var idx = 0;
        for (var y = 0; y < level1.layers[layerIdx].height; y++) {
            for (var x = 0; x < level1.layers[layerIdx].width; x++) {
                if (level1.layers[layerIdx].data[idx] != 0) {
                    var tileIndex = level1.layers[layerIdx].data[idx] - 1;
                    var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
                    var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
                    context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x * TILE, (y - 1) * TILE, TILESET_TILE, TILESET_TILE);
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
    drawMap();

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
}

//BELOW DON'T TOUCH

(function() {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); window.requestAnimationFrame(_cb);}
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function(cb) {
            var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function(cb) {
            setInterval(cb, 1000 / 60)
        }
    }
    
    window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
>>>>>>> origin/master
