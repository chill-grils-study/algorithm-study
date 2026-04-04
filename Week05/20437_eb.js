const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
const T = Number(input[idx++]);
for (let t = 0; t < T; t++) {
  let min = Infinity
  let max = -Infinity
  const W = input[idx++];
  const K = Number(input[idx++]);

  const positions = Array.from({ length: 26 }, () => []);

  for (let i = 0; i < W.length; i++) {
    const idx = W.charCodeAt(i) - 97;
    positions[idx].push(i);
  }
  positions.forEach((position) => {
    if (position.length < K) {
      return;
    }
    for (let j = 0; j <= position.length - K; j++) {
      const length = position[j + K - 1] - position[j] + 1;
      min = Math.min(length, min)
      max = Math.max(length, max)
    }
  })
  console.log(min === Infinity ? -1 : min, max)
}
