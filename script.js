const gameSpace = document.querySelector(".game-container");
let foodX = 0,
  foodY = 0;
// Snake variables
let headX = 5,
  headY = 10;
let body = [];

let directionX = 0,
  directionY = 0;

function moveFood() {
  (foodX = Math.floor(Math.random() * 30) + 1),
    (foodY = Math.floor(Math.random() * 30) + 1);
}

function placeHead() {
  (headX = Math.floor(Math.random() * 30)),
    (headY = Math.floor(Math.random() * 30));
}

function snakeDirection(e) {
  console.log(e);
  switch (e.key) {
    case "ArrowDown":
      (directionX = 1), (directionY = 0);
      break;
    case "ArrowUp":
      (directionX = -1), (directionY = 0);
      break;
    case "ArrowLeft":
      (directionX = 0), (directionY = -1);
      break;
    case "ArrowRight":
      (directionX = 0), (directionY = 1);
      break;
    default:
      break;
  }
}

function play() {
  let htmlPoints = `<div class="food" style="grid-area: ${foodX}/${foodY}">  <div class="inner-food"></div>
    </div>`;
  headX += directionX;
  headY += directionY;
//   
  if (headX === foodX && headY === foodY){
      moveFood();
      body.push([foodX,foodY])
  }

  htmlPoints += `<div class="head" style="grid-area: ${headX}/${headY}"></div>`;
  gameSpace.innerHTML = htmlPoints;
}

moveFood();
setInterval(play, 100);
document.addEventListener("keydown", snakeDirection);
