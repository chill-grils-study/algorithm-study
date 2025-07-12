const input = require('fs')
  .readFileSync('../i.txt')
  .toString()
  .trim()
  .split('\n')

const n = Number(input[0])
const children = input.slice(1).map(Number)

const dp = Array(n).fill(1)
for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (children[j] < children[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1)
    }
  }
}
console.log(dp, n - Math.max(...dp))
