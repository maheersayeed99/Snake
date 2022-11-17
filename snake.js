
var rows = 6;
var cols = 6;
var cellSize = 100; 
var board;
var context;
var currHigh = 0;

var px = cols/2 * cellSize;
var py = rows/2 * cellSize;
var rx = Math.floor(Math.random() * (cols-1)) * cellSize;
var ry = Math.floor(Math.random() * (rows-1)) * cellSize;
var vx = 0;
var vy = 1;

let snake = [[py, px]];
let available = {};
let colorArr = ["lime","cyan", "purple","red","orange","yellow"];

var turnFix = true

window.onload = function() {
    board = document.getElementById("grid");
    printScore = document.getElementById("score");
    highScore = document.getElementById("high");
    board.height = rows * cellSize;
    board.width = cols * cellSize;
    context = board.getContext("2d");
    document.addEventListener("keydown", turn);

    initializeSet();

    setInterval(update, 200);
}

function initializeSet() {
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            available[(row*cellSize*cols)+(col*cellSize)] = [row*cellSize, col*cellSize];
        }
    }
}

function update() {
    
    moveSnake();

    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "white";
    context.fillRect(rx, ry, cellSize, cellSize);

    context.fillStyle = colorArr[0];
    for (let i = 0; i<snake.length; i++) {
        context.fillRect(snake[i][1], snake[i][0], cellSize, cellSize);
    }

    turnFix = true;
    
}

function moveSnake() {

    

    px = px + (vx*cellSize);
    if (px > board.width - cellSize) {px = 0;}
    if (px < 0) {px = board.width-cellSize;}
    
    py = py + (vy*cellSize);
    if (py > board.height-cellSize) {py = 0;}
    if (py < 0) {py = board.height-cellSize;}

    snake.push([py,px]);
    delete available[(py*cols)+(px)];


    if(px == rx && py == ry) {
        printScore.innerHTML = snake.length-1;
        moveFood();
    }
    else{
        available[(snake[0][0]*cols)+(snake[0][1])] = [snake[0][0], snake[0][1]];
        snake.shift();
    }
    checkDeath();
    
}

function moveFood() {
    

    let maxLen = Object.keys(available).length;
    randPick = Math.floor(Math.random()*maxLen-1);

    let count = 0;
    var randKey;
    for (const[key,value] of Object.entries(available)) {
        count++;
        randKey = value;
        if (count == randPick)
        {
            break;
        }
    }

    ry = randKey[0];
    rx = randKey[1];
    
}

function turn(input) {

    if (turnFix == true)
    {
        if (input.code == "ArrowUp" && vy == 0) {
            vx = 0;
            vy = -1;
            turnFix = false;
        }
        else if (input.code == "ArrowDown" && vy == 0) {
            vx = 0;
            vy = 1;
            turnFix = false;
        }
        else if (input.code == "ArrowLeft" && vx == 0) {
            vx = -1;
            vy = 0;
            turnFix = false;
        }
        else if (input.code == "ArrowRight" && vx == 0) {
            vx = 1;
            vy = 0;
            turnFix = false;
        }
        else if (input.code == "Space") {
            vx = 0;
            vy = 0;
            turnFix = false;
        }
        
    }
}

function checkDeath() {
    head = snake[snake.length-1];
    

    for (let i =0; i<snake.length-1; ++i) {
        if (snake[i][0] == head[0] && snake[i][1] == head[1]) {
            for (let j = i; j>= 0; --j) {
                delete available[(snake[j][0]*cols)+(snake[j][1])]
            }
            currHigh = Math.max(currHigh, snake.length-1);
            snake = snake.slice(i+1);
            printScore.innerHTML = snake.length-1;
            highScore.innerHTML = currHigh;
            colorArr.push(colorArr.shift());
        } 
    }
}