let score;

function initScore() {
  score = 0;
}

function increaseScore() {
  score += 10;
  checkVictory();
}

function checkVictory() {
  const totalBricks = brickRows * brickCols;
  const bricksDestroyed = totalBricks - bricksLeft();

  if (bricksDestroyed === totalBricks) {
    console.log('You won!');
    // Вы можете добавить код для завершения игры или начала нового уровня
  }
}

function bricksLeft() {
  let bricksRemaining = 0;

  for (let c = 0; c < brickCols; c++) {
    for (let r = 0; r < brickRows; r++) {
      if (bricks[c][r].status === 1) {
        bricksRemaining++;
      }
    }
  }

  return bricksRemaining;
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('Score: ' + score, 8, 20);
}
