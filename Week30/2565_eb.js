const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const N = Number(input[0]);

const arr = input.slice(1).map(line => line.split(" ").map(Number));
const dp = Array(N).fill(1);
arr.sort((a, b) => a[0] - b[0])
for (let i = 0; i < N; i++) {
  for (let j = i; j >= 0; j--) {
    if (arr[i][1] > arr[j][1]) {
      dp[i] = Math.max(dp[j] + 1, dp[i])
    }
  }
}
console.log(N - dp.at(-1))