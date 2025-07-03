const fs = require('fs')
const input = fs.readFileSync('../i.txt').toString().trim().split('\n')

const [n, m] = input[0].split(' ').map(Number)
const houses = input.slice(1).map(Number).sort((a, b) => a - b)

let left = 1
let right = houses[n - 1] - houses[0]
let answer = 0

while (left <= right) {
  const mid = Math.floor((left + right) / 2)
  let count = 1
  let lastInstalled = houses[0]

  for (let i = 1; i < n; i++) {
    if (houses[i] - lastInstalled >= mid) {
      count++
      lastInstalled = houses[i]
    }
  }

  if (count >= m) {
    left = mid + 1
  } else {
    right = mid - 1
  }
}

console.log(right)
