const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf8").trim().split("\n").map(Number);
const n = input[0];
const titles = input.slice(1).map(Number);

const stack = [];
const answer = Array(n).fill(0);


if (titles.at(-1) !== 1) {
  return console.log(-1)
}
for (let i = 1; i < n; i++) {
  if (titles[i] - titles[i - 1] > 1) {
    return console.log(-1)
  }
}
for (let i = n - 1; i >= 0; i--) {
  while (stack.length !== 0 && stack.at(-1) - 1 === titles[i]) {
    answer[i]++
    stack.pop()
  }
  stack.push(titles[i])
}
console.log(answer.join('\n'))

