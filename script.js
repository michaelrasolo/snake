const gameSpace = document.querySelector(".game-container");
let foodX = 10,
  foodY = 10;
// Snake variables
let headX = 3,
  headY = 1;
let snakeBody = [];

let directionX = 0,
  directionY = 0;
const scoreInput = document.querySelector('.score')
  let score = 0
function moveFood() {
  (foodX = Math.floor(Math.random() * 30) + 1),
    (foodY = Math.floor(Math.random() * 30) + 1);
}

function placeHead() {
  (headX = Math.floor(Math.random() * 30)),
    (headY = Math.floor(Math.random() * 30));
}

function snakeDirection(e) {
  if (e.key === "ArrowDown" && directionY !== -1) {
    directionX = 0;
    directionY = 1;
  } else if (e.key === "ArrowUp" && directionY !== 1) {
    directionX = 0;
    directionY = -1;
  } else if (e.key === "ArrowLeft" && directionX !== 1) {
    directionX = -1;
    directionY = 0;
  } else if (e.key === "ArrowRight" && directionX !== -1) {
    directionX = 1;
    directionY = 0;
  }
}


function play() {
  // Place food point

  let points = `<div class="food" style="grid-area: ${foodY}/${foodX}">  <div class="inner-food"></div></div>`;

  // Update snake direction
  headX += directionX;
  headY += directionY;

  // Snake ate food
  if (headX === foodX && headY === foodY) {
    moveFood();
    snakeBody.push([foodY, foodX]);
    // console.log("snakeBody", snakeBody);
    console.log(foodY, foodX);
    score++
    scoreInput.textContent = score
  }

  // Body points take the position of the previous one
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [headY, headX];

  for (let i = 0; i < snakeBody.length; i++) {
    points += `<div class="head" style="grid-area: ${snakeBody[i][0]}/${snakeBody[i][1]}"></div>`;
  }
  gameSpace.innerHTML = points;

  
  if (headX > 30 || headX < 1 ||headY > 30 || headY < 1) {
    console.log("game over")
    return
  }
}

moveFood();
setInterval(play, 100);
document.addEventListener("keydown", snakeDirection);