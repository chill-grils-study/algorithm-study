const fs = require('fs')
const input = fs.readFileSync('../input.txt', 'utf-8').trim().split('\n')
const N = Number(input[0]) // N: 지도 크기
const matrix = input.slice(1).map(e => e.split('').map(Number))
const dx = [-1, 1, 0, 0]
const dy = [0, 0, -1, 1]
const result = []
function dfs (x, y) {
  if (x < 0 || x >= N || y < 0 || y >= N || matrix[x][y] <= 0) {
    return 0
  }
  matrix[x][y] = -1
  let count = 1

  for (let i = 0; i < dx.length; i++) {
    count += dfs(x + dx[i], y + dy[i])
  }

  return count
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const r = dfs(i, j)
    if (r > 0) {
      result.push(r)
    }
  }
}
console.log(result.length)
console.log(result.sort((a, b) => a - b).join('\n'))
