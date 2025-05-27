const fs = require("fs");
const input = fs.readFileSync("../input.txt", "utf-8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number); // N: 논문 마지막 페이지 번호, M: 떨어진 논문 장수수
const pages = new Set(input[1].split(" ").map(Number));
const missing = []; // 누락된 페이지를 저장할 배열
for (let i = 1; i <= N; i++) {
  if (!pages.has(i)) {
    missing.push(i);
  }
}
missing.sort((a, b) => a - b); // 누락된 페이지를 오름차순으로 정렬
if (missing.length === 0) {
  console.log(0);
  return;
}
if (missing.length === 1) {
  console.log(7);
  return;
}

const k = missing.length;
const dp = Array(k).fill(Infinity);

// 2. 누락된 페이지들만 대상으로 DP
for (let i = 0; i < k; i++) {
  for (let j = 0; j <= i; j++) {
    const left = missing[j]; // 구간의 실제 시작 페이지
    const right = missing[i]; // 구간의 실제 끝 페이지
    const length = right - left + 1; // 실제 인쇄할 페이지 수
    const cost = 5 + 2 * length;

    if (j === 0) {
      dp[i] = Math.min(dp[i], cost);
    } else {
      dp[i] = Math.min(dp[i], dp[j - 1] + cost);
    }
  }
}

console.log(dp[k - 1]);
