// dp...결국 또 지피티의 힘을 빌림...ㅠ
function solution(N, counsels) {
  // dp[i]는 i일부터 N일까지 벌 수 있는 최대 수익
  const dp = Array(N + 1).fill(0);

  // 뒤에서부터 확인해야 최대 수익을 구할 수 있음
  // i일까지의 수익이 아니라 i일부터의 수익이기 때문!
  for (let i = N - 1; i >= 0; i--) {
    const [time, amount] = counsels[i];
    // 퇴사 전에 상담을 끝마칠 수 있으면
    if (i + time <= N) {
      // 오늘 상담을 하지 않았을 때와 상담을 했을 때의 수익 중 최댓값을 대입
      // i일의 상담을 건너뛰었다면 다음 상담은 i+1일부터 => 수익은 i+1부터의 수익과 같음
      dp[i] = Math.max(dp[i + 1], amount + dp[i + time]);
    } else {
      // 오늘은 상담을 할 수 없기에 i+1일부터의 상담 수익을 대입
      dp[i] = dp[i + 1];
    }
  }

  // 0일부터의 상담 최대 수익
  console.log(dp[0]);
}
