const fs = require('fs')
const input = fs.readFileSync('../i.txt').toString().trim().split('\n')

const N = Number(input[0])
const points = input.slice(1).map(line => line.split(' ').map(Number))

let answer = 0

for (let i = 0; i < N; i++) {
  const [x1, y1] = points[i]
  const [x2, y2] = points[(i + 1) % N]
  answer += x1 * y2 - x2 * y1
}
console.log((Math.abs(answer) / 2).toFixed(1))
