const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf8").trim().split("\n");
const n = parseInt(input[0]);
const balls = input[1].split('');
// 69532	448
if (n <= 2) {
  console.log(0);
  process.exit();
}

function moveBall(targetColor, reverse) {
  let copyBalls = [...balls]; 
  if (reverse) {
    copyBalls.reverse();
  }

  const firstBallIndex = copyBalls.indexOf(targetColor);
  if (firstBallIndex === -1) {
    return 0; 
  }

  let moveCount = firstBallIndex !== 0 ? 1 : 0;
  copyBalls[firstBallIndex] = ' ';
  const basket = [0];

  for (let i = 1; i < n; i++) {
    const prevBallIndex = basket.at(-1);
    if (copyBalls[i] === targetColor) {
      if (i - prevBallIndex > 1) {
        moveCount++;
      }
      basket.push(prevBallIndex + 1);
    }
  }
  return moveCount;
}

const movesToRedLeft = moveBall('R', false);
const movesToRedRight = moveBall('R', true);
const movesToBlueLeft = moveBall('B', false);
const movesToBlueRight = moveBall('B', true);

const answer = Math.min(movesToRedLeft, movesToRedRight, movesToBlueLeft, movesToBlueRight);

console.log(answer);


// 결국 (전체 특정 색상 공 수) - (왼쪽부터 연속된 특정 색상 공 수) 27640	212
const totalRed = (balls.match(/R/g) || []).length;
const totalBlue = n - totalRed;

if (totalRed === 0 || totalBlue === 0) {
  console.log(0);
  process.exit();
}

function countContiguous(color, fromLeft) {
  let count = 0;
  if (fromLeft) {
    for (let i = 0; i < n; i++) {
      if (balls[i] === color) count++;
      else break;
    }
  } else { // 오른쪽부터 검사
    for (let i = n - 1; i >= 0; i--) {
      if (balls[i] === color) count++;
      else break;
    }
  }
  return count;
}


// Case 1: 빨간 공을 왼쪽으로 모으기
// (전체 빨간 공 수) - (왼쪽부터 연속된 빨간 공 수)
const moveRedToLeft = totalRed - countContiguous('R', true);

// Case 2: 빨간 공을 오른쪽으로 모으기
// (전체 빨간 공 수) - (오른쪽부터 연속된 빨간 공 수)
const moveRedToRight = totalRed - countContiguous('R', false);

// Case 3: 파란 공을 왼쪽으로 모으기
const moveBlueToLeft = totalBlue - countContiguous('B', true);

// Case 4: 파란 공을 오른쪽으로 모으기
const moveBlueToRight = totalBlue - countContiguous('B', false);

const answer2 = Math.min(
  moveRedToLeft,
  moveRedToRight,
  moveBlueToLeft,
  moveBlueToRight
);

console.log(answer2);