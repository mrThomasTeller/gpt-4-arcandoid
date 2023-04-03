const ctx = canvas.getContext('2d');

let lives = 3;

const paddleWidth = 100;
const paddleHeight = 20;
const paddleSpeed = 7;

let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

init();

function init() {
  initPaddle();
  initBall();
  initBricks();
  initScore();
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  gameLoop();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle();
  drawAllBalls();
  drawBricks();
  drawScore();
  drawLives();

  if (shootingEnabled) {
    updateBullets();
  }

  updatePaddle();
  updateAllBalls();
  updateBonuses();
  checkCollisions();
  checkBallOutOfBounds(ball);
  for (let extraBall of extraBalls) {
    checkBallOutOfBounds(extraBall);
  }

  requestAnimationFrame(gameLoop);
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  } else if (e.key === ' ' || e.key === 'Spacebar') {
    spacePressed = true;
    shootBullet();
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  } else if (e.key === ' ' || e.key === 'Spacebar') {
    spacePressed = false;
  }
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}
