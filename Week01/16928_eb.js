const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const board = Array(101).fill(0);
const visited = Array(101).fill(false);
const queue = [];
for (let i = 1; i <= N + M; i++) {
  const [start, end] = input[i].split(" ").map(Number);
  board[start] = end;
}
queue.push([1, 0])
while (queue.length) {
  const [current, count] = queue.shift();
  if (current === 100) {
    console.log(count)
    break
  }
  if (visited[current]) {
    continue
  }
  visited[current] = true

  for (let i = 1; i <= 6; i++) {
    next = current + i
    if (board[next] !== 0) {
      next = board[next]
    }
    queue.push([next, count + 1])
  }
}
