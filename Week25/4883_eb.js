const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split("\n").map(line => line.split(" ").map(Number));

let caseNum = 1;
let idx = 0;

while (true) {
  const n = input[idx][0]; // 행 개수
  if (n === 0) break; // 입력 종료

  const graph = input.slice(idx + 1, idx + 1 + n); // n개의 줄
  const dp = Array.from({ length: n }, () => Array(3).fill(Infinity));
  dp[0][1] = graph[0][1]
  dp[0][2] = dp[0][1] + graph[0][2];
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.min(dp[i - 1][0], dp[i - 1][1]) + graph[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2], dp[i][0]) + graph[i][1];
    dp[i][2] = Math.min(dp[i - 1][1], dp[i - 1][2], dp[i][1]) + graph[i][2];

  }
  console.log(caseNum + '.', dp[n - 1][1])
  idx += n + 1;
  caseNum++;
}
