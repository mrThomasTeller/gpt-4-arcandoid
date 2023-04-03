const brickRows = 5;
const brickCols = 20; // Увеличьте количество кирпичей
const brickWidth = canvas.width / brickCols; // Рассчитайте ширину кирпича на основе ширины холста
const brickHeight = 20;
const brickPadding = 1; // Установите небольшое расстояние между кирпичами
const brickOffsetTop = 30;
const brickOffsetLeft = 16;

let bricks = [];

function initBricks() {
  bricks = [];
  for (let c = 0; c < brickCols; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRows; r++) {
      bricks[c][r] = {
        x: c * (brickWidth + brickPadding),
        y: r * (brickHeight + brickPadding) + brickOffsetTop,
        status: 1,
      };
    }
  }
}

function updateBricks() {
  for (let c = 0; c < brickCols; c++) {
    for (let r = 0; r < brickRows; r++) {
      let brick = bricks[c][r];
      if (brick.status === 1) {
        drawBrick(brick);
      }
    }
  }
}

function drawBrick(brick) {
  ctx.beginPath();
  ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickCols; c++) {
    for (let r = 0; r < brickRows; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
