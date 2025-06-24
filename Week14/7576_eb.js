const fs = require('fs')
const input = fs.readFileSync('/dev/stdin', 'utf8').trim().split('\n')
const [col, row] = input[0].split(' ').map(Number);
const tomatoes = input.slice(1).map(line => line.split(' ').map(Number));
const queue = []
const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]]
function bfs () {
  let result = 0
  let head = 0
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      if (tomatoes[y][x] === 1) {
        queue.push([y, x, 0])
      }
    }
  }

  while (queue.length > head) {
    const [y, x, days] = queue[head++] // shift() 쓰니 시간 초과 뜸. head 방식으로 변경
    result = days
    for (const [dy, dx] of directions) {
      const newY = y + dy
      const newX = x + dx
      if (
        newX >= 0 &&
        newX < col &&
        newY >= 0 &&
        newY < row &&
        tomatoes[newY][newX] === 0
      ) {
        tomatoes[newY][newX] = 1
        queue.push([newY, newX, days + 1])
      }
    }
  }
  return result
}

const result = bfs()
const hasUnRipe = tomatoes.some(row => row.includes(0))

if (hasUnRipe) {
  console.log(-1)
} else {
  console.log(result)
}

