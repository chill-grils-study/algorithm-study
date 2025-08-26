const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../i.txt";
const input = fs.readFileSync(path, "utf-8").trim().split("\n");

let line = 0;

// 보드 크기
const N = parseInt(input[line++]);

// 사과 개수
const K = parseInt(input[line++]);
const apples = [];
for (let i = 0; i < K; i++) {
  const [r, c] = input[line++].split(" ").map(Number);
  apples.push([r, c]);
}

// 방향 전환 횟수
const L = parseInt(input[line++]);
const moves = [];
for (let i = 0; i < L; i++) {
  const [X, C] = input[line++].split(" ");
  moves.push([parseInt(X), C]);
}

// L: left, D: right 
const headDirections = [
  [0, 1],   // 오른쪽
  [1, 0],   // 아래
  [0, -1],  // 왼쪽
  [-1, 0],  // 위
];
const snake = [[1, 1]]
let time = 1
let head = 0
while (true) {
  time++;
  const [dy, dx] = headDirections[head];
  const [curY, curX] = snake[0]; // 머리
  const newY = curY + dy;
  const newX = curX + dx;

  // 벽 충돌
  if (newY < 1 || newY > N || newX < 1 || newX > N) {
    console.log(time);
    break;
  }

  // 몸 충돌
  if (snake.some(([y, x]) => y === newY && x === newX)) {
    console.log(time);
    break;
  }

  // 사과 체크
  const appleIdx = apples.findIndex(([y, x]) => y === newY && x === newX);
  if (appleIdx !== -1) {
    apples.splice(appleIdx, 1); // 사과 제거
    snake.unshift([newY, newX]); // 머리 추가
  } else {
    snake.pop();               // 꼬리 제거
    snake.unshift([newY, newX]); // 머리 추가
  }

  // 방향 전환
  if (moves.length > 0 && moves[0][0] === time) {
    const [, C] = moves.shift();
    if (C === 'D') head = (head + 1) % 4;   // 오른쪽 회전
    else head = (head + 3) % 4;             // 왼쪽 회전
  }
}
