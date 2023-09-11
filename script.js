// Space variables
const gameSpace = document.querySelector(".game-container");
let foodX = 10,
  foodY = 10;
let gameSpeed;
// Snake variables
let headX = 3,
  headY = 1;
let snakeBody = [];
let directionX = 0,
  directionY = 0;

// Score variables
const scoreInput = document.querySelector(".score");
let score = 0;
const highScoreInput = document.querySelector(".highscore");
let highScore = localStorage.getItem("highscore") || 0;
highScoreInput.textContent = highScore;

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

function stopGame() {
  clearInterval(gameSpeed);
  alert(`Game over, your score is ${score} !`);
  location.reload();
}

function play() {
  console.log("snakeBody", snakeBody);
  // Place food point
  let points = `<div class="food" style="grid-area: ${foodY}/${foodX}">  <div class="inner-food"></div></div>`;

  // Update snake's head direction
  headX += directionX;
  headY += directionY;

  // Eating event
  if (headX === foodX && headY === foodY) {
    moveFood();
    snakeBody.push([]);
    score++;
    scoreInput.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreInput.textContent = highScore;
      localStorage.setItem("highscore", highScore);
    }
  }

  // Give each body point the position of the previous one
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [headY, headX];

  // Create a div for each body point
  for (let i = 0; i < snakeBody.length; i++) {
    points += `<div class="head" style="grid-area: ${snakeBody[i][0]}/${snakeBody[i][1]}"></div>`;
  }
  gameSpace.innerHTML = points;

  // Stop game if out of bounds
  if (headX > 30 || headX < 1 || headY > 30 || headY < 1) {
    stopGame();
  }

  // Stop game if body/head collision
  for (let i = 1; i < snakeBody.length; i++) {
    if (headY === snakeBody[i][0] && headX === snakeBody[i][1])
      return stopGame();
  }
}

moveFood();
gameSpeed = setInterval(play, 100);
document.addEventListener("keydown", snakeDirection);
