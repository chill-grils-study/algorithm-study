const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./i.txt";

const input = fs.readFileSync(path, "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const maze = input.slice(1).map(line => line.split("").map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(false))
const direction = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const bfs = (y, x) => {
  const queue = [[y, x, 1]]
  while (queue.length > 0) {
    const [y, x, cnt] = queue.shift()
    if (y === N - 1 && x === M - 1) {
      console.log(cnt)
      return
    }
    if (maze[y][x] === 1 && !visited[y][x]) {
      visited[y][x] = true
      for (const [dy, dx] of direction) {
        const nextY = dy + y
        const nextX = dx + x
        if (
          nextX >= 0 && nextX < M &&
          nextY >= 0 && nextY < N &&
          maze[nextY][nextX] === 1 &&
          !visited[nextY][nextX]
        ) {
          queue.push([nextY, nextX, cnt + 1]);
        }
      }
    }
  }
}
bfs(0, 0);