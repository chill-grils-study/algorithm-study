// 보자마자 아앗~! 투포인터!
function solution(N, solutions) {
  const result = [0, 0];
  // 바깥쪽에서부터 확인
  let leftPointer = 0,
    rightPointer = N - 1;
  let sum = Infinity;

  // 모든 용액이 산성이면 가장 앞의 숫자들을 반환
  if (solutions.every((solution) => solution >= 0)) {
    return `${solutions[0]} ${solutions[1]}`;
  } // 모든 용액이 알칼리성이면 가장 뒤의 숫자들을 반환
  if (solutions.every((solution) => solution < 0)) {
    return `${solutions[N - 2]} ${solutions[N - 1]}`;
  }

  // 포인터가 교차되기 전까지 반복
  while (leftPointer < rightPointer) {
    const currentSum = solutions[leftPointer] + solutions[rightPointer];
    // 현재 두 용액의 합이 저장해둔 합보다 작다면 정답 갱신
    if (Math.abs(sum) > Math.abs(currentSum)) {
      result[0] = solutions[leftPointer];
      result[1] = solutions[rightPointer];
      sum = currentSum;
    }
    // 0에 가까워져야 하는거니까 기준 값을 0으로 잡았음
    // 현재합이 0보다 작으면 leftPointer를 오른쪽으로 이동
    if (currentSum < 0) {
      leftPointer++;
    } else {
      // 현재합이 0보다 크면 rightPointer를 왼쪽으로 이동
      rightPointer--;
    }
  }

  return `${result[0]} ${result[1]}`;
}
