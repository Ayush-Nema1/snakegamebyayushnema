let inputdir = { x: 0, y: 0 };
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const board = document.querySelector(".board");
const button = document.querySelector(".btn");

let speed = 5;
let lastPaintTime = 0;
let snakearr = [
    { x: 13, y: 15 }
]

let food = { x: 6, y: 7 }

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function iscoillide(snake){
for (let i = 1; i< snakearr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y=== snake[0].y){
        return true
    }
}
if (snake[0].x >=18 || snake[0].x<=0||snake[0].y>=18||snake[0].y<=0){
    return true;
}
return false;
}

function gameEngine() {
    console.log("function is called")
    if (iscoillide(snakearr)){
        gameoversound.play();
        inputdir = {x:0,y:0};
        alert("game over")
        snakearr =[{x:13,y:15}]
    }

    //eat and gain 
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    //moving snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] }
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
button.addEventListener("click", () => {
    // Reset game state
    inputdir = { x: 0, y: 0 };
    snakearr = [{ x: 13, y: 15 }];
    food = { x: 6, y: 7 };
    gameRunning = true;

    // Start the game loop
    window.requestAnimationFrame(main);
});




    window.requestAnimationFrame(main);
    window.addEventListener('keydown', e => {
        inputdir = { x: 0, y: 1 }
        movesound.play();
        switch (e.key) {
            case "ArrowUp": console.log("Arroe Up");
                inputdir.x = 0;
                inputdir.y = -1;
                break;
            case "ArrowDown": console.log("arrroen down");
                inputdir.x = 0;
                inputdir.y = 1;
                break;
            case "ArrowRight": console.log("arrow right");
                inputdir.x = 1;
                inputdir.y = 0;
                break;
            case "ArrowLeft": console.log("arrowlwft")
                inputdir.x = -1;
                inputdir.y = 0;
                break;
        }

    });