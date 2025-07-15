// LIS, 최장 증가 수열 구하는 문제
const solution = (N, idle) => {
  // dp[i] = idle[i]까지의 최장 증가 수열 길이
  const dp = Array(N).fill(1);
  let maxLength = 1;

  for (let i = 0; i < N; i++) {
    // idle[i] 전 요소까지 확인
    for (let j = 0; j < i; j++) {
      // 증가 수열을 만들 수 있다면
      if (idle[i] >= idle[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        maxLength = Math.max(maxLength, dp[i]);
      }
    }
  }

  return N - maxLength;
};
