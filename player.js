var LEFT = 0;
var RIGHT = 1;

var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_IDLE_RIGHT = 3;
var ANIM_JUMP_RIGHT = 4;
var ANIM_WALK_RIGHT = 5;
var ANIM_MAX = 6;

var score = 0;
var lives = 3;

var Player = function () {
    this.image = document.createElement("img");
    this.position = new Vector2();
    this.position.set(9 * TILE, 0 * TILE);
    this.width = 159;
    this.height = 163;
    this.offset = new Vector2();
    this.offset.set(-55, -87);
    this.velocity = new Vector2();
    this.falling = true;
    this.jumping = false;
    this.image.src = "player.png";
};


Player.prototype.update = function (deltaTime) {

    var left = false;
    var right = false;
    var jump = false;
 if(Timer >= 0){
    if (keyboard.isKeyDown(keyboard.KEY_LEFT) == true) {
        this.position.x += -5;
       
    }
    if (keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) {
     
        this.position.x += 5;
    }

    if (keyboard.isKeyDown(keyboard.KEY_UP) == true) {
        this.position.y -= 5;
    }

       if (keyboard.isKeyDown(keyboard.KEY_DOWN) == true) {
        this.position.y += 5;
    }
 }
    var wasleft = this.velocity.x < 0;
    var wasright = this.velocity.x > 0;
    var ddx = 0;
    var ddy = GRAVITY;
        if (left)
            ddx = ddx - ACCEL; // player wants to go left
        else if (wasleft)
            ddx = ddx + FRICTION; // player was going left, but not any more
        if (right)
        ddx = ddx + ACCEL; // player wants to go right
        else if (wasright)
        ddx = ddx - FRICTION;
        this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
        this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
        this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
        this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);

     if ((wasleft && (this.velocity.x > 0)) ||
        (wasright && (this.velocity.x < 0)))
     {
            // clamp at zero to prevent friction from making us jiggle side to side
            this.velocity.x = 0;
     }


    // we'll insert code here later
    // collision detection
    // Our collision detection logic is greatly simplified by the fact that the
    // player is a rectangle and is exactly the same size as a single tile.
    // So we know that the player can only ever occupy 1, 2 or 4 cells.

    // This means we can short-circuit and avoid building a general purpose
    // collision detection engine by simply looking at the 1 to 4 cells that
    // the player occupies:
    var tx = pixelToTile(this.position.x);
    var ty = pixelToTile(this.position.y);
    var nx = (this.position.x) % TILE; // true if player overlaps right
    var ny = (this.position.y) % TILE; // true if player overlaps below
    var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
    var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
    var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
    var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);

    // If the player has vertical velocity, then check to see if they have hit a platform
    // below or above, in which case, stop their vertical velocity, and clamp their
    // y position:
    if (this.velocity.y > 0) {
        if ((celldown && !cell) || (celldiag && !cellright && nx)) {
            // clamp the y position to avoid falling into platform below
            this.position.y = tileToPixel(ty);
            this.velocity.y = 0; // stop downward velocity
            this.falling = false; // no longer falling
            this.jumping = false;
            ny = 0; // no longer overlaps the cells below
        }
    }
    else if (this.velocity.y < 0) {
        if ((cell && !celldown) || (cellright && !celldiag && nx)) {
            // clamp the y position to avoid jumping into platform above
            this.position.y = tileToPixel(ty + 1);
            this.velocity.y = 0; // stop upward velocity
            // player is no longer really in that cell, we clamped them to the cell below
            cell = celldown;
            cellright = celldiag; // (ditto)
            ny = 0; // player no longer overlaps the cells below
        }
    }
    if (this.velocity.x > 0) {
        if ((cellright && !cell) || (celldiag && !celldown && ny)) {
            // clamp the x position to avoid moving into the platform we just hit
            this.position.x = tileToPixel(tx);
            this.velocity.x = 0; // stop horizontal velocity
        }
    }
    else if (this.velocity.x < 0) {
        if ((cell && !cellright) || (celldown && !celldiag && ny)) {
            // clamp the x position to avoid moving into the platform we just hit
            this.position.x = tileToPixel(tx + 1);
            this.velocity.x = 0; // stop horizontal velocity
        }
    }
}

Player.prototype.draw = function () {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.drawImage(this.image, -this.width / 2, -this.height / 2);
    context.restore();
}
