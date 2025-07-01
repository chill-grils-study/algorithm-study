const fs = require('fs')
const input = fs.readFileSync('../i.txt').toString().trim().split('\n')

const N = Number(input[0])
const board = input.slice(1).map(line => line.split(' ').map(Number))
const dp = Array.from({ length: N }, () => Array(N).fill(BigInt(0)))

dp[0][0] = 1 // 시작점 도달 가능한 경로 수는 1
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (dp[i][j] === 0 || board[i][j] === 0) continue
    const move = board[i][j]
    if (j + move < N) {
      dp[i][j + move] += BigInt(dp[i][j])
    }
    if (i + move < N) {
      dp[i + move][j] += BigInt(dp[i][j])
    }
  }
}
console.log(dp[N - 1][N - 1].toString())
