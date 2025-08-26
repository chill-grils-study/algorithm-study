const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../i.txt";

const input = fs.readFileSync(path, "utf8").trim().split("\n").map(Number);

const T = input[0]; // 테스트 케이스 수
const cases = input.slice(1); // 각 케이스의 N 값들


// 키패드 인접 정보
const adj = {
  0: [7],
  1: [2, 4],
  2: [1, 3, 5],
  3: [2, 6],
  4: [1, 5, 7],
  5: [2, 4, 6, 8],
  6: [3, 5, 9],
  7: [4, 8, 0],
  8: [5, 7, 9],
  9: [6, 8],
};

// DP 테이블: 최대 1000 길이, 숫자 0~9
const maxN = Math.max(...cases);
const dp = Array.from({ length: maxN + 1 }, () => Array(10).fill(0));

for (let i = 0; i <= 9; i++) {
  dp[1][i] = 1
}

for (let i = 2; i <= maxN; i++) {
  for (let j = 0; j <= 9; j++) {
    for (const prev of adj[j]) {
      dp[i][j] = (dp[i][j] + dp[i - 1][prev])
    }
  }
}

for (const c of cases) {
  let sum = 0
  for (let i = 0; i <= 9; i++) {
    sum += dp[c][i]
  }
  console.log(sum % 1234567)
}