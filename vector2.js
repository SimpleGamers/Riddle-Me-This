// constructor for the vector2 object
var Vector2 = function () {
    this.x = 0;
    this.y = 0;
}

// set the components of the vector
Vector2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
}

// add two vectors together
Vector2.prototype.Add = function (otherVector) {
    var newVector = new Vector2();
    newVector.set(this.x + otherVector.x, this.y + otherVector.y);
    return newVector;
}

// add subtract and multiply functions here
Vector2.prototype.Subtract = function (otherVector) {
    var newVector = new Vector2();
    newVector.set(this.x - otherVector.x, this.y - otherVector.y);
    return newVector;
}

Vector2.prototype.Multiply = function (otherVector) {
    var newVector = new Vector2();
    newVector.set(this.x * otherVector.x, this.y * otherVector.y);
    return newVector;
}