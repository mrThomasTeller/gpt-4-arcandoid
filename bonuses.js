const bonusTypes = ['shooting', 'extraBall', 'destructiveBall'];
const bonusSpeed = 2;
const bonusWidth = 16;
const bonusHeight = 16;
let bonuses = [];

function createBonus(x, y) {
  const bonusType = bonusTypes[Math.floor(Math.random() * bonusTypes.length)];

  let bonus = {
    x: x,
    y: y,
    width: bonusWidth,
    height: bonusHeight,
    type: bonusType,
    speed: bonusSpeed,
  };

  bonuses.push(bonus);
}

function updateBonuses() {
  for (let i = 0; i < bonuses.length; i++) {
    let bonus = bonuses[i];
    bonus.y += bonus.speed;

    // Проверка столкновения бонуса с платформой
    if (
      bonus.y + bonus.height > paddle.y &&
      bonus.x + bonus.width > paddle.x &&
      bonus.x < paddle.x + paddle.width
    ) {
      activateBonus(bonus.type);
      bonuses.splice(i, 1);
      i--;
    } else if (bonus.y > canvas.height) {
      // Если бонус выходит за пределы холста, удаляем его
      bonuses.splice(i, 1);
      i--;
    } else {
      drawBonus(bonus);
    }
  }
}

function drawBonus(bonus) {
  ctx.beginPath();
  ctx.rect(bonus.x, bonus.y, bonusWidth, bonusHeight);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

let shootingEnabled = false;
let extraBalls = [];

function activateShooting() {
  shootingEnabled = true;

  setTimeout(() => {
    shootingEnabled = false;
  }, 10000); // Длительность бонуса "стрельба" - 10 секунд
}

function activateExtraBall() {
  let extraBall = {
    x: ball.x,
    y: ball.y,
    radius: ball.radius,
    speed: ball.speed,
    dx: ball.dx,
    dy: -ball.dy,
  };

  extraBalls.push(extraBall);
}

function activateDestructiveBall() {
  // Сделать основной мяч разрушительным
  ball.isDestructive = true;

  // Сделать все дополнительные мячи разрушительными
  for (let extraBall of extraBalls) {
    extraBall.isDestructive = true;
  }

  // Установить таймер, чтобы вернуть мячи в обычное состояние через некоторое время
  setTimeout(() => {
    ball.isDestructive = false;

    // Вернуть все дополнительные мячи в обычное состояние
    for (let extraBall of extraBalls) {
      extraBall.isDestructive = false;
    }
  }, 10000); // Сделайте бонус временным, например, на 10 секунд
}

function activateBonus(type) {
  switch (type) {
    case 'shooting':
      activateShooting();
      break;
    case 'extraBall':
      activateExtraBall();
      break;
    case 'destructiveBall':
      activateDestructiveBall();
      break;
  }
}
