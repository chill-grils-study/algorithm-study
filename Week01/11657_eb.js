const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const edges = [];

for (let i = 1; i <= M; i++) {
  const [A, B, C] = input[i].split(" ").map(Number);
  edges.push([A, B, C]);
}
const dist = Array(N + 1).fill(Infinity);
dist[1] = 0;

for (let i = 1; i <= N; i++) {
  for (const [a, b, cost] of edges) {

    if (dist[a] === Infinity) continue;

    if (dist[b] > dist[a] + cost) {
      dist[b] = dist[a] + cost;

      if (i === N) { // N-1번 반복하면 최단거리 확정, N번째에도 갱신 -> 계속 줄어드는 사이클 존재
        console.log(-1);
        return;
      }
    }

  }
}
for (let i = 2; i <= N; i++) {
  console.log(dist[i] === Infinity ? -1 : dist[i]);
}
