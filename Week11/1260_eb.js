const fs = require('fs')
const input = fs.readFileSync('../input.txt', 'utf-8').trim().split('\n')
const [N, M, V] = input[0].split(' ').map(Number) // N 정점 개수, M 간선 개수, V 시작 정점 번호
const edges = input.slice(1).map(line => line.split(' ').map(Number))
// 그래프 만들기
// 정점 번호가 1부터 시작하므로 N + 1까지 만듦, 0은 버림
const graph = Array.from({ length: N + 1 }, () => [])
const visitedForDFS = Array.from(N + 1).fill(false)
const dfsResult = []
const visitedForBFS = Array.from(N + 1).fill(false)
const bfsResult = []
for (const [start, end] of edges) {
  graph[start].push(end)
  graph[end].push(start)
}

// 정점 번호 작은 것부터 탐색 위한 정렬
for (const g of graph) {
  g.sort((a, b) => a - b)
}
dfs(V)
bfs(V)
console.log(dfsResult.join(' '))
console.log(bfsResult.join(' '))
function dfs (v) {
  visitedForDFS[v] = true
  dfsResult.push(v)
  for (const next of graph[v]) {
    if (!visitedForDFS[next]) {
      dfs(next)
    }
  }
}

function bfs (v) {
  const queue = [v]
  visitedForBFS[v] = true
  while (queue.length > 0) {
    const current = queue.shift()
    bfsResult.push(current)

    for (const next of graph[current]) {
      if (!visitedForBFS[next]) {
        visitedForBFS[next] = true
        queue.push(next)
      }
    }
  }
}
