// 백트래킹..쉬운 문제였는데 나눗셈에서 자꾸 틀려서 헤맸어요...^^ㅠ..
// operations는 주어진 연산자를 이어붙인 문자열입니다. (예: '++---**//')
function solution(N, numbers, operations) {
  // 방문 표시 배열
  const visited = Array(N - 1).fill(false);
  let minTotal = Infinity,
    maxTotal = -Infinity;

  function calculate(currentTotal, numIndex) {
    // 탐색이 끝났다면 최솟값, 최댓값 갱신
    if (numIndex >= N) {
      // -0이 들어가서 틀리는 경우가 있어서 예외처리
      if (currentTotal === -0) {
        currentTotal = 0;
      }
      minTotal = Math.min(minTotal, currentTotal);
      maxTotal = Math.max(maxTotal, currentTotal);
      return;
    }
    // 한번 학인했던 원소도 다시 봐야되니 0부터 확인하도록 했어요.
    for (let i = 0; i < N - 1; i++) {
      let newTotal = currentTotal;

      if (!visited[i]) {
        visited[i] = true;

        if (operations[i] === '+') {
          newTotal += numbers[numIndex];
        } else if (operations[i] === '-') {
          newTotal -= numbers[numIndex];
        } else if (operations[i] === '*') {
          newTotal *= numbers[numIndex];
        } else { // 나눗셈은 예외 처리
          // newTotal을 앞으로 둘지 numbers[numIndex]를 앞에 둘지 갑자기 엄청 헷갈렸어요..;;
          const quot = Math.floor(Math.abs(newTotal) / numbers[numIndex]);
          newTotal = newTotal >= 0 ? quot : -quot;
        }

        calculate(newTotal, numIndex + 1);
        visited[i] = false;
      }
    }
  }

  calculate(numbers[0], 1);

  console.log(maxTotal);
  console.log(minTotal);
}
