
// Board dimentions
var rows = 6;
var cols = 6;
var cellSize = 100; 
var board;
var context;
var currHigh = 0;

// Current location and speed of head
var px = cols/2 * cellSize; 
var py = rows/2 * cellSize;
var vx = 0;
var vy = 1;

// Food location
var rx = Math.floor(Math.random() * (cols-1)) * cellSize;
var ry = Math.floor(Math.random() * (rows-1)) * cellSize;

// Snake body
let snake = [[py, px]];
// Snake color
let colorArr = ["lime","cyan", "purple","red","orange","yellow"];

// Dictionary of available positions for food
let available = {};

// Boolean to make sure funtion handle is called only once per update
var turnFix = true



window.onload = function() {

    board = document.getElementById("grid");        // get canvas from html
    printScore = document.getElementById("score");  // get score from html
    highScore = document.getElementById("high");    // get high score from html
    board.height = rows * cellSize;
    board.width = cols * cellSize;
    context = board.getContext("2d");
    document.addEventListener("keydown", turn);     // listen for key presses

    initializeSet();                                // initialize available spots

    setInterval(update, 200);                       // Update once every 200 ms
}

// Fill availabke dictionary with every empty cell
function initializeSet() {
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            available[(row*cellSize*cols)+(col*cellSize)] = [row*cellSize, col*cellSize];
        }
    }
}


function update() {
    
    moveSnake();    // Update Snake location and speed

    // Draw board
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    // Draw food
    context.fillStyle = "white";
    context.fillRect(rx, ry, cellSize, cellSize);

    // Draw Snake
    context.fillStyle = colorArr[0];
    for (let i = 0; i<snake.length; i++) {
        context.fillRect(snake[i][1], snake[i][0], cellSize, cellSize);
    }

    // Set turnfix so function handle can be called again
    turnFix = true;
    
}

function moveSnake() {

    // Update X location of new head
    px = px + (vx*cellSize);
    if (px > board.width - cellSize) {px = 0;}  // wrap around if out of bounds
    if (px < 0) {px = board.width-cellSize;}
    
    // Update Y location of new head
    py = py + (vy*cellSize);
    if (py > board.height-cellSize) {py = 0;}   // wrap around if out of bounds
    if (py < 0) {py = board.height-cellSize;}

    // Push new head into snake body
    snake.push([py,px]);
    // Remove new head as an available spot for food
    delete available[(py*cols)+(px)];

    // If new location is the same as food location
    if(px == rx && py == ry) {
        printScore.innerHTML = snake.length-1;  // Update Score
        moveFood();                             // Find new food location
    }
    else{
        available[(snake[0][0]*cols)+(snake[0][1])] = [snake[0][0], snake[0][1]];   // add current tail as an available slot for food
        snake.shift();  // Pop tail
    }
    // Check if snake ate itself
    checkDeath();
    
}


function moveFood() {
    

    let maxLen = Object.keys(available).length;         // Get length of dictionary
    randPick = Math.floor(Math.random()*maxLen-1);      // Pick random index within range

    let count = 0;
    var randKey;
    for (const[key,value] of Object.entries(available)) {   // Iterate through dictionary
        count++;
        randKey = value;
        if (count == randPick)
        {
            break;              // Break when iterated random index times
        }
    }

    ry = randKey[0];        // Set food location at the random indexes
    rx = randKey[1];
    
}



function turn(input) {

    if (turnFix == true)
    {
        if (input.code == "ArrowUp" && vy == 0) {
            vx = 0;
            vy = -1;
            turnFix = false;                                // Set turnfix to false so another move can't be made in this step
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
        if (snake[i][0] == head[0] && snake[i][1] == head[1]) {         // If collision detected
            for (let j = i; j>= 0; --j) {                               // Add entire cur off snake tail as available slots for food
                delete available[(snake[j][0]*cols)+(snake[j][1])]
            }
            
            currHigh = Math.max(currHigh, snake.length-1);
            snake = snake.slice(i+1);                       // Slice snake body literally
            printScore.innerHTML = snake.length-1;          // Update score
            highScore.innerHTML = currHigh;                 // Update high score
            colorArr.push(colorArr.shift());                // Rotate color array
        } 
    }
}