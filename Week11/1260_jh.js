const fs = require('fs');
const input = fs.readFileSync('run/input.txt').toString().trim().split('\n');
const [N, M, V] = input[0].split(' ').map((num) => +num);
const connections = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [start, end] = input[i].split(' ').map((num) => +num);
  connections[start].push(end);
  connections[end].push(start);
}

// 각 정점에 연결된 정점 번호를 오름차순으로 정렬해서 저장
connections.forEach((connection) => {
  connection.sort((a, b) => a - b);
});

// bfs는 큐를 사용
function bfs(N, V, connections) {
  const queue = [V];
  const visited = Array(N + 1).fill(false);
  const result = [];

  while (queue.length > 0) {
    const current = queue.shift();

    if (!visited[current]) {
      result.push(current);
      visited[current] = true;

      connections[current].forEach((next) => {
        if (!visited[next]) {
          // 다음 방문 정점은 큐 뒤에 저장
          queue.push(next);
        }
      });
    }
  }

  return result;
}

// dfs는 스택을 사용
function dfs(N, V, connections) {
  const stack = [V];
  const visited = Array(N + 1).fill(false);
  const result = [];

  while (stack.length > 0) {
    const current = stack.pop();

    if (!visited[current]) {
      result.push(current);
      visited[current] = true;

      const startIndex = connections[current].length - 1;

      // 현재 정점은 오름차순으로 저장되어 있기 때문에
      // 가장 작은 정점을 먼저 방문하게 하려면 뒷쪽 원소부터 스택에 추가해야함
      for (let i = startIndex; i >= 0; i--) {
        const next = connections[current][i];
        if (!visited[next]) {
          stack.push(next);
        }
      }
    }
  }

  return result;
}

function solution(N, V, connections) {
  console.log(dfs(N, V, connections).join(' '));
  console.log(bfs(N, V, connections).join(' '));
}

solution(N, V, connections);
