const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
let cnt = 1;
while (true) {
  const N = Number(input[idx++]);
  if (N === 0) break;

  const graph = [];
  for (let i = 0; i < N; i++) {
    graph.push(input[idx++].split(" ").map(Number));
  }

  const dist = Array.from({ length: N }, () => Array(N).fill(Infinity));
  dist[0][0] = graph[0][0];
  const pq = [[graph[0][0], 0, 0]];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // 최소 힙
    const [cost, x, y] = pq.shift();

    if (cost > dist[x][y]) {
      continue;
    }
    for (let d = 0; d < 4; d++) {
      const nx = x + dx[d];
      const ny = y + dy[d];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) {
        continue;
      }

      const newCost = cost + graph[nx][ny];

      if (newCost < dist[nx][ny]) {
        dist[nx][ny] = newCost;
        pq.push([newCost, nx, ny]);
      }
    }
  }
  console.log(`Problem ${cnt++}: ${dist[N - 1][N - 1]}`);
}
