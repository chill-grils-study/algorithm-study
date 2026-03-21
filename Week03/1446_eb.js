const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, D] = input[0].split(" ").map(Number);

const shortcuts = input.slice(1).map(line => {
  const [start, end, distance] = line.split(" ").map(Number);
  return [start, end, distance];
});

const dist = Array(D + 1).fill(Infinity);
dist[0] = 0;
for (let i = 0; i <= D; i++) {
  if (i + 1 < D) {
    dist[i + 1] = Math.min(dist[i + 1], dist[i] + 1);
  }
  for (const [start, end, distance] of shortcuts) {
    if (start === i && end <= D) {
      dist[end] = Math.min(dist[end], dist[i] + distance);
    }
  }
}
console.log(dist[D]);