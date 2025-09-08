const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('').map(Number)
const n = input.length
const dp = Array(n + 1).fill(0)
dp[0] = 1 // 아무 숫자카드도 고르지 않은 상태
// 27123
// 2 -- 1
// 27 7 -- 2 dp[1](7단독) + dp[0](27은 아무것도 고르지 않은 상태라 dp[0])
// 1 -- 2 dp[2](1단독)
// 12 2 -- 4 dp[3] (2단독) + dp[2] 
// 23 3 -- 6

for (let i = 1; i <= n; i++) {
  const current = input[i - 1]
  if (current !== 0) { // 0인 경우 앞 숫자 붙어서 쓸 수 없으니 제외
    dp[i] += dp[i - 1] // current가 단독으로 붙는 경우
  }
  const twoDigits = input[i - 2] * 10 + current;
  if (10 <= twoDigits && twoDigits <= 34) {
    dp[i] += dp[i - 2]; // 앞 숫자 붙여쓸 경우 전전 dp 경우의 수 따져야함
  }

}
console.log(dp.at(-1))