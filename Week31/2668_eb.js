const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(path, "utf8").split('\n');
const N = Number(input[0]);
const arr = [0, ...input.slice(1, 1 + N).map(Number)];

const result = [];

// 각 숫자에서 시작해서 사이클 찾기
for (let start = 1; start <= N; start++) {
  const visited = new Set();
  let current = start;

  // 사이클 찾을 때까지 계속 이동
  for (let step = 0; step < N; step++) {
    if (visited.has(current)) {
      break;
    }
    visited.add(current);
    current = arr[current];
  }

  // 현재 위치가 시작점이면 사이클!
  if (current === start) {
    // 사이클에 속한 모든 숫자 찾기
    let node = start;
    for (let step = 0; step < N; step++) {
      if (!result.includes(node)) {
        result.push(node);
      }
      node = arr[node];
      if (node === start) break;
    }
  }
}

result.sort((a, b) => a - b);
console.log(result.length);
for (let i = 0; i < result.length; i++) {
  console.log(result[i]);
}