const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')
const n = parseInt(input[0])
const pillars = input.slice(1).map(line => {
  const [x, y] = line.split(' ').map(Number);
  return { x, y };
});
pillars.sort((a, b) => a.x - b.x);
let maxHeight = 0; // 기둥 중 제일 높은 기둥
let maxIndex = 0; // 제일 높은 기둥 인덱스
for (let i = 0; i < n; i++) {
  if (pillars[i].y > maxHeight) {
    maxHeight = pillars[i].y;
    maxIndex = i;
  }
}

let answer = 0
// 높은 기둥 기준으로 왼쪽, 오른쪽 각각 면적 구함 
let currentHeight = 0
let currentHeightIdx = 0
for (let i = 0; i <= maxIndex; i++) {
  if (currentHeight < pillars[i].y) {
    answer += currentHeight * (pillars[i].x - pillars[currentHeightIdx].x)
    currentHeight = pillars[i].y
    currentHeightIdx = i
  }
}

currentHeight = 0
currentHeightIdx = 0
for (let i = n - 1; i >= maxIndex; i--) {
  if (currentHeight <= pillars[i].y) {
    answer += currentHeight * (pillars[currentHeightIdx].x - pillars[i].x)
    currentHeight = pillars[i].y
    currentHeightIdx = i
  }
}
console.log(answer + maxHeight)