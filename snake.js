
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

    document.addEventListener("keydown", turn);

    setInterval(update, 500);
}

function update() {
    moveSnake();

    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "red";
    context.fillRect(rx, ry, cellSize, cellSize);

    context.fillStyle = "white";
    context.fillRect(px, py, cellSize, cellSize);

    
}

function moveSnake() {
    px = px + (vx*cellSize);
    if (px > board.width - cellSize) {px = 0;}
    if (px < 0) {px = board.width-cellSize;}
    
    py = py + (vy*cellSize);
    if (py > board.height-cellSize) {py = 0;}
    if (py < 0) {py = board.height-cellSize;}
}


function turn(input) {
    if (input.code == "ArrowUp" && vy != 1) {
        vx = 0;
        vy = -1;
    }
    else if (input.code == "ArrowDown" && vy != -1) {
        vx = 0;
        vy = 1;
    }
    else if (input.code == "ArrowLeft" && vx != 1) {
        vx = -1;
        vy = 0;
    }
    else if (input.code == "ArrowRight" && vx != -1) {
        vx = 1;
        vy = 0;
    }
    else if (input.code == "Space") {
        vx = 0;
        vy = 0;
    }
}