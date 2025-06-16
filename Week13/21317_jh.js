// 처음 풀이
// 매우 큰 점프를 했을 때와 안 했을 때로 구분해서 저장
// 아래 풀이대로 하면 바로 직전에 매우 큰 점프를 한 경우만 저장됨
// 더 이전에 매우 큰 점프를 한 경우는 계산이 안됨
function solution(N, energies, K) {
  const dp = Array.from({ length: N }, () => Array(2).fill(Infinity));

  // 미리 0으로 초기화해놓는게 문제, N이 2이하일 수도 있음
  // 그럴 때는 런타임에러 발생
  // for문 안에 조건문을 여러개 두기 싫어서 위에서 계산하려고 한건데 분기 처리하는게 맞았음
  dp[0][0] = dp[0][1] = 0;
  dp[1][1] = dp[2][1] = 0;
  dp[1][0] = dp[0][0] + energies[0][0];
  dp[2][0] = Math.min(dp[0][0] + energies[0][1], dp[1][0] + energies[1][0]);

  for (let i = 3; i < N; i++) {
    dp[i][0] = Math.min(
      dp[i - 1][0] + energies[i - 1][0],
      dp[i - 2][0] + energies[i - 2][1]
    );
    dp[i][1] = Math.min(
      dp[i - 1][1] + energies[i - 1][0],
      dp[i - 2][1] + energies[i - 2][1],
      dp[i - 3][0] + K
    );
  }
  console.log(dp);
  console.log(Math.min(...dp[N - 1]));
}

// 지피티 help..!
// 매우 큰 점프를 안 했을 때, 했을 때 따로 저장하는건 맞음.
// 그래도 접근은 맞았으니 ,, ^^
function solution(N, energies, K) {
  const dp = Array.from({ length: N }, () => Array(2).fill(Infinity));
  // 첫번재 돌에서는 점프를 하지 않으니 0으로 초기화
  dp[0][0] = dp[0][1] = 0;

  for (let i = 1; i < N; i++) {
    // 이전 돌에서 작은 점프를 한 경우
    if (i >= 1) {
      dp[i][0] = Math.min(dp[i][0], dp[i - 1][0] + energies[i - 1][0]);
      dp[i][1] = Math.min(dp[i][1], dp[i - 1][1] + energies[i - 1][0]);
    }

    // 전전 돌에서 큰 점프를 한 경우
    if (i >= 2) {
      dp[i][0] = Math.min(dp[i][0], dp[i - 2][0] + energies[i - 2][1]);
      dp[i][1] = Math.min(dp[i][1], dp[i - 2][1] + energies[i - 2][1]);
    }

    // 전전전 돌에서 매우 큰 점프를 한 경우
    // 딱 한번만 할 수 있음
    if (i >= 3) {
      dp[i][1] = Math.min(dp[i][1], dp[i - 3][0] + K);
    }
  }

  console.log(Math.min(dp[N - 1][0], dp[N - 1][1]));
}
