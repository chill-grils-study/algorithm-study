const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n');
const n = Number(input[0]);

let maxHeight = 0;
const matrix = input.slice(1).map((line) => {
  const arr = line.split(' ').map(Number);
  maxHeight = Math.max(maxHeight, ...arr);
  return arr;
});

let visited;
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function dfs(x, y, k) {
  if (x < 0 || x >= n || y < 0 || y >= n) return;
  if (visited[x][y]) return;
  if (matrix[x][y] < k) return;

  visited[x][y] = true;

  for (let i = 0; i < 4; i++) {
    dfs(x + dx[i], y + dy[i], k);
  }
}

let answer = 0;
for (let k = 1; k <= maxHeight; k++) {
  visited = Array.from({ length: n }, () => Array(n).fill(false));
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && matrix[i][j] >= k) {
        dfs(i, j, k);
        count++;
      }
    }
  }
  answer = Math.max(answer, count);
}

console.log(answer);
