const input = require('fs').readFileSync('../i.txt').toString().trim()
const n = Number(input)

const board = Array.from({ length: n }, () => Array(n).fill('void'))
const putQueenCol = []
let count = 0

// 해당 위치에 퀸을 놓을 수 있는지 검사
function checkBoard (board, y, x) {
  // 왼쪽 위 대각선
  for (let i = y - 1, j = x - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') return false
  }

  // 오른쪽 위 대각선
  for (let i = y - 1, j = x + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === 'Q') return false
  }

  return true
}

function dfs (y) {
  if (y === n) {
    count++
    return
  }

  for (let x = 0; x < n; x++) {
    if (!putQueenCol.includes(x) && checkBoard(board, y, x)) {
      board[y][x] = 'Q'
      putQueenCol.push(x)
      dfs(y + 1)
      board[y][x] = 'void' // 백트래킹
      putQueenCol.pop() // 열 복구
    }
  }
}

dfs(0)
console.log(count)
