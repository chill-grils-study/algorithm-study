const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf8").trim().split("\n");
const n = parseInt(input[0])
const honeys = input[1].split(' ').map(Number)
const sum = Array(n).fill(0);
sum.forEach((_, i) => {
  sum[i] = honeys[i] + (i > 0 ? sum[i - 1] : 0)
})
const totalHoney = sum.at(-1)
let answer = 0
// 벌 벌 꿀통
for (let i = 1; i < n - 1; i++) {
  const result = totalHoney * 2 - sum[i] - honeys[0] - honeys[i]
  answer = Math.max(result, answer)
}
// 꿀통 벌벌 
for (let i = 1; i < n-1; i++) {
  const result = totalHoney - honeys[n - 1] + sum[i - 1] - honeys[i]
  answer = Math.max(result, answer)
}
// 벌 꿀통 벌
for (let i = 1; i < n - 1; i++) {
  const result = totalHoney + honeys[i] - honeys[0] - honeys[n - 1]
  answer = Math.max(result, answer)
}
console.log(answer)