const path = process.platform === 'linux' ? '/dev/stdin' : '../i.txt'
const input = require('fs')
  .readFileSync(path, 'utf-8')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const [day, k] = input
const dp = Array(day + 1).fill(0)
dp[1] = 'a'
dp[2] = 'b'
for (let i = 3; i <= day; i++) {
  dp[i] = dp[i - 1] + dp[i - 2]
}
const aCoeff = dp[day].split('a').length - 1
const bCoeff = dp[day].length - aCoeff
for (let a = 1; a < Math.floor(k / aCoeff); a++) {
  const b = (k - aCoeff * a) / bCoeff
  if (Number.isInteger(b) && b >= 1) {
    console.log(`${a}\n${b}`)
    break
  }
}
