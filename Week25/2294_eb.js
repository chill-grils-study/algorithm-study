const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')
const [n, target] = input[0].split(' ').map(Number)
const coins = input.slice(1).map(Number)
const dp = Array(target + 1).fill(Infinity) // 금액 i를 만들 수 있는 최소 동전 개수
dp[0] = 0
for (const coin of coins) {
  for (let i = coin; i <= target; i++) {
    dp[i] = Math.min(dp[i], dp[i - coin] + 1)
  }
}
console.log(dp.at(-1) === Infinity ? -1 : dp.at(-1))