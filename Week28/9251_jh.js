function solution(str1, str2) {
  const str1Length = str1.length;
  const str2Length = str2.length;
  const dp = Array.from({length: str1Length + 1}, () => Array(str2Length + 1).fill(0));

  for(let i = 1; i <= str1Length; i++) {
    for(let j = 1; j <= str2Length; j++) {
      if(str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[str1Length][str2Length];
}
