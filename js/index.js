// variables
let direction = {x:0 , y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let speed = 2;
let lastPaint = 0;
let snakeArr = [
{
    x:13 , y:13
}
]

let food = {x:6 , y:7};

// game function 
function main(ctime){
    window.requestAnimationFrame(main);
    console.log(ctime);
    if((ctime - lastPaint)/1000 < 1/speed){
        return;
    }
    lastPaint = ctime;
    gameEngine();
}

function gameEngine(){
    // updating the snake and food 
    // show the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart  = e.x;
       
        if(index === 0){
            snakeElement.classList.add('snake');
        }
        else{
            snakeElement.classList.add('head');
        }
        board.appendChild(snakeElement);
    });

    

    // show the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart  = food.x;
    foodElement.classList.add('food');
   
    board.appendChild(foodElement);
}


// main logic
window.requestAnimationFrame(main);
