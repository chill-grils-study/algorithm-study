const fs = require('fs')
const input = fs.readFileSync('../input.txt', 'utf-8').trim().split('\n')
const N = Number(input[0]) // N: 퇴사일
const schedule = input.slice(1).map(line => line.split(' ').map(Number))
// pt한테 힌트 받았습니다.. 역방향으로 해야 된다는 것을.. 
// 왜 역방향? 미래의 최적해를 알아야 선택이 가능 
function solution (N, schedule) {
  const dp = Array(N + 1).fill(0)
  // dp[i] = i일부터 퇴사일 까지 얻을 수 있는 최대 이익 
  dp[N + 1] = 0
  for (let i = N; i >= 1; i--) {
    const [day, profit] = schedule[i - 1]
    if (i + day > N + 1) {
      // 퇴사일 이후
      dp[i] = dp[i + 1]
    } else {
      // 상담 안하거나 dp[i + 1]
      // 상담 하기 dp[i+day](미래 최대 이익) + profit(현재 상담 비용)
      dp[i] = Math.max(dp[i + 1], dp[i + day] + profit)
    }
  }
  console.log(dp.at(1))
}

solution(N, schedule)
