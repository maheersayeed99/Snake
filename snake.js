
var rows = 30;
var cols = 30;
var cellSize = 20;
var board;
var context;
var score = 0;

var px = cols/2 * cellSize;
var py = rows/2 * cellSize;
var rx = Math.floor(Math.random() * (cols-1)) * cellSize;
var ry = Math.floor(Math.random() * (rows-1)) * cellSize;
var vx = 0;
var vy = 0;

let snake = [[py, px]];
//let available = new Set();

window.onload = function() {
    board = document.getElementById("grid");
    printScore = document.getElementById("score");
    board.height = rows * cellSize;
    board.width = cols * cellSize;
    context = board.getContext("2d");
    document.addEventListener("keydown", turn);

    //initializeSet();

    setInterval(update, 100);
}
/*
function initializeSet() {
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            available.add((row*cols*cellSize) + (col*cellSize));
        }
    }
}
*/
function update() {
    
    moveSnake();

    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "red";
    context.fillRect(rx, ry, cellSize, cellSize);

    context.fillStyle = "white";
    for (let i = 0; i<snake.length; i++) {
        context.fillRect(snake[i][1], snake[i][0], cellSize, cellSize);
    }
    
}

function moveSnake() {
    px = px + (vx*cellSize);
    if (px > board.width - cellSize) {px = 0;}
    if (px < 0) {px = board.width-cellSize;}
    
    py = py + (vy*cellSize);
    if (py > board.height-cellSize) {py = 0;}
    if (py < 0) {py = board.height-cellSize;}

    snake.push([py,px]);
    //available.delete((py*cols)+px);

    if(px == rx && py == ry) {
        score ++;
        printScore.innerHTML = score;
        moveFood();
    }
    else{
        //available.add((snake[0]*cols)+snake[1])
        snake.shift();
    }
    checkDeath();
}

function moveFood() {
    /*

    let maxLen = available.size;
    randPick = Math.floor(Math.random()*maxLen-1);
    let iter = available.values();

    for (let i = 0; i<randPick; ++i) {
        iter = iter.next
    }

    rx = (iter.value % cols) * cellSize;
    ry = (Math.floor(iter.value / cols)) * cellSize;
    */
    rx = Math.floor(Math.random() * (cols-1)) * cellSize;
    ry = Math.floor(Math.random() * (rows-1)) * cellSize;
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

function checkDeath() {
    head = snake[snake.length-1];
    

    for (let i =0; i<snake.length-1; ++i) {
        if (snake[i][0] == head[0] && snake[i][1] == head[1]) {
            console.log("slice")
            snake = snake.slice(i+1);
        } 
    }
}