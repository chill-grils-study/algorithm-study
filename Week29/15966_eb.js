const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(path, "utf8").trim().split(/\r?\n/);
const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const map = new Map(); // map[값] = 해당 값으로 끝나는 최장 길이
let answer = 1;

for (let i = 0; i < n; i++) {
  const current = arr[i];
  const prev = current - 1;

  // 이전 값(current-1)이 존재하면 이어붙이기
  if (map.has(prev)) {
    map.set(current, map.get(prev) + 1);
  } else {
    map.set(current, 1);
  }

  answer = Math.max(answer, map.get(current));
}
console.log(map)
console.log(answer);

// 35점 코드 
{
  const fs = require("fs");
  const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
  const input = fs.readFileSync(path, "utf8").trim().split("\n");
  const n = Number(input[0]);
  const arr = input[1].split(" ").map(Number);

  const dp = Array(n).fill(1); // 자기 자신으로 최소 길이 1
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] + 1 === arr[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  console.log(Math.max(...dp));

}