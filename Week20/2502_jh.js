function solution(D, K) {
  const dp = Array(D).fill(1);
  let A, B;

  for (let i = 2; i < D; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  const a = dp[D - 3];
  const b = dp[D - 2];

  for (let i = 1; i < K; i++) {
    const remainNum = K - a * i;
    if (remainNum % b === 0) {
      A = i;
      B = Math.floor(remainNum / b);
      break;
    }
  }

  console.log(A);
  console.log(B);
}
