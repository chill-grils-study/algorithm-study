const fs = require('fs')
const input = fs.readFileSync('../input.txt').toString().trim().split('\n')
const n = Number(input[0])
const costs = input.slice(1, -1).map(line => line.split(' ').map(Number))
const k = Number(input.at(-1))

const dp = Array.from({ length: n }, () => [Infinity, Infinity])
dp[0][0] = 0
for (let i = 0; i < n - 1; i++) {
  const [sm, lg] = costs[i]
  for (let usedVeryBigJump = 0; usedVeryBigJump < 2; usedVeryBigJump++) {
    if (i + 1 < n) {
      dp[i + 1][usedVeryBigJump] = Math.min(
        dp[i + 1][usedVeryBigJump],
        dp[i][usedVeryBigJump] + sm
      )
    }
    if (i + 2 < n) {
      dp[i + 2][usedVeryBigJump] = Math.min(
        dp[i + 2][usedVeryBigJump],
        dp[i][usedVeryBigJump] + lg
      )
    }
    if (i + 3 < n && usedVeryBigJump === 0) {
      dp[i + 3][1] = Math.min(dp[i + 3][1], dp[i][0] + k)
    }
  }
}
console.log(dp)
console.log(Math.min(...dp.at(-1)))
