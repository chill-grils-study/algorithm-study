function solution(N, M, dance) {
  const dp = Array.from({ length: N }, () => Array(2).fill(0));
  const MOD = 1000000007;

  if (dance[0][1] === 0) {
    dp[0][0] = M - 1;
    dp[0][1] = 1;
  } else {
    dp[0][0] = 1;
    dp[0][1] = M - 1;
  }

  for (let i = 1; i < N; i++) {
    const correctDanceCount = dance[i][1] === 0 ? 1 : M - 1;
    const wrongDanceCount = dance[i][1] === 0 ? M - 1 : 1;

    dp[i][0] =
      (dp[i - 1][0] * correctDanceCount + dp[i - 1][1] * wrongDanceCount) % MOD;
    dp[i][1] = (dp[i - 1][1] * correctDanceCount) % MOD;
  }

  console.log((dp[N - 1][0] + dp[N - 1][1]) % MOD);
}
