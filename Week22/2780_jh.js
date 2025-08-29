const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const T = +input[0];
const cases = [];

for (let i = 1; i <= T; i++) {
  cases.push(+input[i]);
}

function solution(cases) {
  const maxVal = Math.max(...cases);
  // dp[i][j]: j로 끝나는 i자릿수의 개수
  // dp[3][2]: 2로 끝나는 세자릿수의 개수 => 132 152
  const dp = Array.from({ length: maxVal + 1 }, () => Array(10).fill(0));
  const totals = Array(maxVal).fill(0);
  const MOD = 1234567;

  for (let i = 0; i < 10; i++) {
    dp[1][i] = 1;
  }

  totals[1] = 10;
  // 무식하게 dp 돌리기...
  for (let i = 2; i <= maxVal; i++) {
    // 1과 인접한 2/4를 입력하고 마지막으로 1 입력
    dp[i][1] = (dp[i - 1][2] + dp[i - 1][4]) % MOD;
    dp[i][2] = (dp[i - 1][1] + dp[i - 1][3] + dp[i - 1][5]) % MOD;
    dp[i][3] = (dp[i - 1][2] + dp[i - 1][6]) % MOD;
    dp[i][4] = (dp[i - 1][1] + dp[i - 1][5] + dp[i - 1][7]) % MOD;
    dp[i][5] =
      (dp[i - 1][2] + dp[i - 1][4] + dp[i - 1][6] + dp[i - 1][8]) % MOD;
    dp[i][6] = (dp[i - 1][3] + dp[i - 1][5] + dp[i - 1][9]) % MOD;
    dp[i][7] = (dp[i - 1][0] + dp[i - 1][4] + dp[i - 1][8]) % MOD;
    dp[i][8] = (dp[i - 1][5] + dp[i - 1][7] + dp[i - 1][9]) % MOD;
    dp[i][9] = (dp[i - 1][6] + dp[i - 1][8]) % MOD;
    dp[i][0] = dp[i - 1][7] % MOD;

    let total = 0;

    for (let j = 0; j < 10; j++) {
      total += dp[i][j];
    }

    totals[i] = total % MOD;
  }

  cases.forEach((item) => {
    console.log(totals[item]);
  });
}

solution(cases);
