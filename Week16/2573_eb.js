const fs = require('fs')
const input = fs.readFileSync('../i.txt').toString().trim().split('\n')

const [row, col] = input[0].split(' ').map(Number)
const board = input.slice(1).map(line => line.split(' ').map(Number))

function getIcebergCnt (board) {
  const visited = Array.from({ length: row }, () => Array(col).fill(false))
  let count = 0

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]

  function bfs (startY, startX) {
    const queue = [[startY, startX]]
    visited[startY][startX] = true

    while (queue.length > 0) {
      const [y, x] = queue.shift()
      for (const [dy, dx] of directions) {
        const nextY = y + dy
        const nextX = x + dx
        if (
          nextY >= 0 &&
          nextX >= 0 &&
          nextY < row &&
          nextX < col &&
          !visited[nextY][nextX] &&
          board[nextY][nextX] > 0
        ) {
          visited[nextY][nextX] = true
          queue.push([nextY, nextX])
        }
      }
    }
  }

  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      if (!visited[y][x] && board[y][x] > 0) {
        bfs(y, x)
        count++
      }
    }
  }

  return count
}

function meltingIceberg (board) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  const updateIcebergs = []

  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      if (board[y][x] > 0) {
        let meltingCnt = 0
        for (const [dy, dx] of directions) {
          const nextY = y + dy
          const nextX = x + dx
          if (
            nextX >= 0 &&
            nextY >= 0 &&
            nextX < col &&
            nextY < row &&
            board[nextY][nextX] === 0
          ) {
            meltingCnt++
          }
        }
        updateIcebergs.push([y, x, meltingCnt])
      }
    }
  }

  for (const [y, x, meltingCnt] of updateIcebergs) {
    board[y][x] = Math.max(0, board[y][x] - meltingCnt)
  }
}

let year = 0
while (true) {
  const count = getIcebergCnt(board)
  if (count === 0) {
    console.log(0)
    break
  }
  if (count >= 2) {
    console.log(year)
    break
  }
  meltingIceberg(board)
  year++
}
