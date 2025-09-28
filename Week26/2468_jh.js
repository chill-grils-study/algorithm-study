const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : './run/input.txt';
const inputs = fs.readFileSync(path).toString().trim().split('\n');
const N = +inputs[0];
const area = [];
const heights = new Set();

for (let i = 1; i <= N; i++) {
  const items = inputs[i].split(' ').map((item) => +item);
  area.push(items);

  for (const item of items) {
    heights.add(item);
  }
}

function bfs(i, j, height, visited) {
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const queue = [[i, j]];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();

    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (
        nx < 0 ||
        nx >= N ||
        ny < 0 ||
        ny >= N ||
        area[nx][ny] <= height ||
        visited[nx][ny]
      ) {
        continue;
      }

      queue.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }
}

function solution() {
  const arrayHeights = [...heights];
  let maxCount = 1;

  arrayHeights.sort((a, b) => a - b);

  for (const height of arrayHeights) {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    let count = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (area[i][j] > height && !visited[i][j]) {
          visited[i][j] = true;
          bfs(i, j, height, visited);
          count++;
        }
      }
    }

    maxCount = Math.max(maxCount, count);
  }

  console.log(maxCount);
}

solution();
