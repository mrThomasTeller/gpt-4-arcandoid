const bonusDropChance = 0.2;

function checkCollisions() {
  checkBallCollisions(ball);

  // Проверка столкновений для дополнительных мячей
  for (let extraBall of extraBalls) {
    checkBallCollisions(extraBall);
  }

  // Обработка столкновений пуль с кирпичами
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    for (let c = 0; c < brickCols; c++) {
      for (let r = 0; r < brickRows; r++) {
        let brick = bricks[c][r];
        if (brick.status === 1) {
          if (
            bullet.x + bullet.radius > brick.x &&
            bullet.x - bullet.radius < brick.x + brickWidth &&
            bullet.y + bullet.radius > brick.y &&
            bullet.y - bullet.radius < brick.y + brickHeight
          ) {
            brick.status = 0;
            bullets.splice(i, 1);
            i--;
            increaseScore();
          }
        }
      }
    }
  }
}

function checkBallCollisions(ballInstance) {
  for (let c = 0; c < brickCols; c++) {
    for (let r = 0; r < brickRows; r++) {
      let brick = bricks[c][r];
      if (brick.status === 1) {
        if (
          ballInstance.x + ballInstance.radius > brick.x &&
          ballInstance.x - ballInstance.radius < brick.x + brickWidth &&
          ballInstance.y + ballInstance.radius > brick.y &&
          ballInstance.y - ballInstance.radius < brick.y + brickHeight
        ) {
          if (ballInstance.isDestructive) {
            // Уничтожение кирпича без изменения направления мяча
            brick.status = 0;
            increaseScore();
          } else {
            // Обычное столкновение и изменение направления мяча
            ballInstance.dy = -ballInstance.dy;
            brick.status = 0;
            increaseScore();
          }

          // Шанс выпадения бонуса
          if (Math.random() < bonusDropChance) {
            createBonus(brick.x + brickWidth / 2, brick.y + brickHeight / 2);
          }
        }
      }
    }
  }
}

function checkBallOutOfBounds(ballInstance) {
  if (ballInstance.y + ballInstance.dy < ballInstance.radius) {
    ballInstance.dy = -ballInstance.dy;
  } else if (ballInstance.y + ballInstance.dy > canvas.height - ballInstance.radius) {
    if (ballInstance.x > paddle.x && ballInstance.x < paddle.x + paddle.width) {
      ballInstance.dy = -ballInstance.dy;
    } else {
      // Если мяч выходит за пределы поля, удаляем его из массива extraBalls
      if (extraBalls.includes(ballInstance)) {
        extraBalls.splice(extraBalls.indexOf(ballInstance), 1);
      } else {
        // Если это основной мяч, уменьшаем количество жизней
        lives--;
        if (lives === 0) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          initBall();
          initPaddle();
        }
      }
    }
  }

  if (
    ballInstance.x + ballInstance.dx > canvas.width - ballInstance.radius ||
    ballInstance.x + ballInstance.dx < ballInstance.radius
  ) {
    ballInstance.dx = -ballInstance.dx;
  }
}
