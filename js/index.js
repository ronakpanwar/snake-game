// variables
let direction = { x: 0, y: 0 };
const foodSound = new Audio('resource/food.mp3');
const gameOverSound = new Audio('resource/gameover.mp3');
const moveSound = new Audio('resource/move.mp3');
const musicSound = new Audio('resource/music.mp3');

let speed = 5;
let score = 0;
let lastPaint = 0;
let snakeArr = [
    {
        x: 13, y: 13
    }
]

let food = { x: 6, y: 7 };

// game function 
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaint) / 1000 < 1 / speed) {
        return;
    }
    lastPaint = ctime;
    gameEngine();
}


function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }

    return false;
}


function gameEngine() {
    // updating the snake and food 
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        direction = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        let a = 1;
        let b = 20;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;


    // show the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('snake');
        }
        else {
            snakeElement.classList.add('head');
        }
        board.appendChild(snakeElement);
    });



    // show the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');

    board.appendChild(foodElement);
}


// main logic
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 };

        moveSound.play();
    


    switch (e.key) {
        case "ArrowUp":
            console.log("arrowup");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("arrowdown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("arrowleft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("arrowright");
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }

})
