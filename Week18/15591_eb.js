const fs = require('fs')
const input = fs.readFileSync('../i.txt').toString().trim().split('\n')

const [N, Q] = input[0].split(' ').map(Number)

const graph = Array.from({ length: N + 1 }, () => [])

for (let i = 1; i < N; i++) {
  const [p, q, r] = input[i].split(' ').map(Number)
  graph[p].push([q, r])
  graph[q].push([p, r])
}

// 쿼리 저장
const queries = []
for (let i = N; i < N + Q; i++) {
  const [k, v] = input[i].split(' ').map(Number)
  queries.push([k, v])
}

for (const [k, v] of queries) {
  bfs(k, v)
}

function bfs (k, v) {
  const queue = []
  const visited = Array(N + 1).fill(false)
  queue.push(v)
  visited[v] = true
  let count = 0
  while (queue.length > 0) {
    const current = queue.shift()
    for (const [nextNode, usado] of graph[current]) {
      if (!visited[nextNode] && usado >= k) {
        visited[nextNode] = true
        queue.push(nextNode)
        count++
      }
    }
  }
  console.log(count)
}
