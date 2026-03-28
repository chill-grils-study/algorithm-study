const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const grid = input.slice(1).map(v => v.split(""));
let normal = 0;
let weak = 0;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function dfs(x, y, target, visited) {
  if (
    x < 0 ||
    x >= N ||
    y < 0 ||
    y >= N ||
    visited[x][y]
  ) return;

  if (target === 'RG') {
    if (grid[x][y] !== 'R' && grid[x][y] !== 'G') return;
  } else {
    if (grid[x][y] !== target) return;
  }

  visited[x][y] = true;

  for (let d = 0; d < 4; d++) {
    dfs(x + dx[d], y + dy[d], target, visited);
  }
}

const visited = Array.from({ length: N }, () => Array(N).fill(false));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      dfs(i, j, grid[i][j], visited);
      normal++;
    }
  }
}

const visited1 = Array.from({ length: N }, () => Array(N).fill(false));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited1[i][j]) {
      if (grid[i][j] === 'R' || grid[i][j] === 'G') {
        dfs(i, j, 'RG', visited1);
      } else {
        dfs(i, j, 'B', visited1);
      }
      weak++;
    }
  }
}

console.log(normal, weak);
