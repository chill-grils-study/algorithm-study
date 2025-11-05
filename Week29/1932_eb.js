const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(path, "utf8").trim().split("\n");

const n = Number(input[0]);
const triangle = input.slice(1).map(line => line.split(" ").map(Number));

const dp = triangle.at(-1).slice()
for (let i = n - 2; i >= 0; i--) {
  for (let j = 0; j < triangle[i].length; j++) {
    dp[j] = triangle[i][j] + Math.max(dp[j], dp[j + 1]);
  }
}
console.log(dp.at(0))