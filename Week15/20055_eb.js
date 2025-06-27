const fs = require("fs");
const input = fs.readFileSync("../input.txt").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const durabilities = input[1].split(" ").map(Number);
const robots = Array(N).fill(false); // 로봇이 있는 위치를 표시하는 배열
// 1. 벨트 회전
// 2. 로봇 이동 + 내구도 감소
// 3. 로봇 올리기 + 내구도 감소
// 4. 로봇 내리기
let zeroDurability = 0;
let stepCount = 0;
while (K > zeroDurability) {
  stepCount++;
  // 1. 벨트 회전
  durabilities.unshift(durabilities.pop());
  robots.unshift(robots.pop());
  // 1-1. 마지막 위치 로봇 내리기
  if (robots[N - 1]) {
    robots[N - 1] = false;
  }

  // 2. 로봇 이동 + 내구도 감소
  for (let i = N - 2; i >= 0; i--) {
    if (robots[i] && !robots[i + 1] && durabilities[i + 1] >= 1) {
      robots[i] = false;
      robots[i + 1] = true;
      durabilities[i + 1]--;

      if (durabilities[i + 1] === 0) {
        zeroDurability++;
        if (zeroDurability >= K) {
          console.log(stepCount);
          return;
        }
      }
    }
  }
  // 2-1. 이동 후 마지막에 있는 로봇 내리기
  if (robots[N - 1]) {
    robots[N - 1] = false;
  }
  // 3. 로봇 올리기 + 내구도 감소
  if (!robots[0] && durabilities[0] > 0) {
    robots[0] = true;
    durabilities[0]--;
    if (durabilities[0] === 0) {
      zeroDurability++;
      if (zeroDurability >= K) {
        console.log(stepCount);
        return;
      }
    }
  }
}
console.log(stepCount);
// 3 2
// 1 2 1 2 1 2

// 1 step
// 2 1 2 1 2 1 벨트 이동
// 1 0 0 0 0 0 로봇 올리기
// 1 1 2 1 2 1 벨트 내구도 업뎃
// 내리기 생략

// 2
// 1 2 1 2 1 2 벨트 이동
// 0 1 0 0 0 0 로봇 이동
// 1 1 1 2 1 2 벨트 내구도 업뎃
// 0 1 1 2 1 2 // 로봇 올린 후 벨트 내구도
// 1 1 0 0 0 0 // 로봇 올린 후 로봇 위치
