
var rows = 30;
var cols = 30;
var cellSize = 20;
var board;
var context;

var px = cols/2 * cellSize;
var py = rows/2 * cellSize;
var rx = Math.floor(Math.random() * (cols-1)) * cellSize;
var ry = Math.floor(Math.random() * (rows-1)) * cellSize;
var vx = 0;
var vy = 0;

window.onload = function() {
    board = document.getElementById("grid");
    board.height = rows * cellSize;
    board.width = cols * cellSize;
    context = board.getContext("2d");

    update();
}

function update() {
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "white";
    context.fillRect(px, py, cellSize, cellSize);

    context.fillStyle = "red";
    context.fillRect(rx, ry, cellSize, cellSize);
}
