const ballRadius = 10;
const ballSpeed = 3;

let ball;

function initBall() {
  ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: ballRadius,
    speed: ballSpeed,
    dx: ballSpeed,
    dy: -ballSpeed,
    isDestructive: false, // Добавьте этот флаг
  };
}

function drawBall(ballInstance) {
  ctx.beginPath();
  ctx.arc(ballInstance.x, ballInstance.y, ballInstance.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function updateBall(ballInstance) {
  ballInstance.x += ballInstance.dx;
  ballInstance.y += ballInstance.dy;

  // Проверка столкновения с левой и правой сторонами холста
  if (
    ballInstance.x + ballInstance.dx > canvas.width - ballInstance.radius ||
    ballInstance.x + ballInstance.dx < ballInstance.radius
  ) {
    ballInstance.dx = -ballInstance.dx;
  }

  // Проверка столкновения с верхней стороной холста
  if (ballInstance.y + ballInstance.dy < ballInstance.radius) {
    ballInstance.dy = -ballInstance.dy;
  }

  // Проверка столкновения с платформой
  if (ballInstance.y + ballInstance.dy > canvas.height - ballInstance.radius - paddleHeight) {
    if (ballInstance.x > paddle.x && ballInstance.x < paddle.x + paddle.width) {
      ballInstance.dy = -ballInstance.dy;
    }
  }
}

function updateAllBalls() {
  updateBall(ball);

  // Обновление дополнительных мячей
  for (let i = 0; i < extraBalls.length; i++) {
    let extraBall = extraBalls[i];
    updateBall(extraBall);
  }
}

function drawAllBalls() {
  drawBall(ball);

  // Отрисовка дополнительных мячей
  for (let extraBall of extraBalls) {
    drawBall(extraBall);
  }
}
