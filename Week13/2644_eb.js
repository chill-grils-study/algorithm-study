const fs = require('fs')
const input = fs.readFileSync('../input.txt').toString().trim().split('\n')

const n = Number(input[0])
const [start, end] = input[1].split(' ').map(Number)
const m = Number(input[2])
const relations = input.slice(3).map(line => line.split(' ').map(Number))

const graph = Array.from({ length: n + 1 }, () => [])
const visited = Array(n + 1).fill(false)

// 양방향 그래프 구성
for (const [from, to] of relations) {
  graph[from].push(to)
  graph[to].push(from)
}

const queue = [[start, 0]]
visited[start] = true

let result = -1

while (queue.length > 0) {
  const [current, degree] = queue.shift()

  if (current === end) {
    result = degree
    break
  }

  for (const next of graph[current]) {
    if (!visited[next]) {
      visited[next] = true
      queue.push([next, degree + 1])
    }
  }
}

console.log(result)
