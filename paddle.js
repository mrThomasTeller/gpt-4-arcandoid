let paddle;

function initPaddle() {
  paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    width: 80,
    height: 10,
    speed: 10,
  };
  addPaddleControls();
}

function updatePaddle() {
  // Обработка движения платформы
  if (paddle.moveLeft && paddle.x > 0) {
    paddle.x -= paddle.speed;
  }
  if (paddle.moveRight && paddle.x + paddle.width < canvas.width) {
    paddle.x += paddle.speed;
  }
  drawPaddle();
}

function drawPaddle() {
  ctx.fillStyle = 'white';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function addPaddleControls() {
  paddle.moveLeft = false;
  paddle.moveRight = false;

  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
      paddle.moveLeft = true;
    }
    if (event.code === 'ArrowRight' || event.code === 'KeyD') {
      paddle.moveRight = true;
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
      paddle.moveLeft = false;
    }
    if (event.code === 'ArrowRight' || event.code === 'KeyD') {
      paddle.moveRight = false;
    }
  });
}

let bullets = [];
const bulletSpeed = 5;
const bulletRadius = 2;

function shootBullet() {
  if (shootingEnabled) {
    let bullet = {
      x: paddle.x + paddle.width / 2,
      y: paddle.y - bulletRadius,
      radius: bulletRadius,
      speed: bulletSpeed,
    };
    bullets.push(bullet);
  }
}

function updateBullets() {
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.y -= bullet.speed;

    if (bullet.y < 0) {
      bullets.splice(i, 1);
      i--;
    } else {
      drawBullet(bullet);
    }
  }
}

function drawBullet(bullet) {
  ctx.beginPath();
  ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}
