function solution(N, honey) {
  const total = honey.reduce((acc, item) => acc + item, 0);
  // 벌통이 가운데에 있고, 벌은 양 사이드에 있을 때
  let centerTotal = total - honey[0] - honey.at(-1);
  let centerMaxNum = -1;

  for (let i = 1; i < N - 1; i++) {
    centerMaxNum = Math.max(centerMaxNum, honey[i]);
  }

  centerTotal += centerMaxNum;

  let firstMaxTotal = -1,
    firstTotal = (total - honey[0]) * 2;

  // 벌 왼쪽 끝에 하나, 벌 가운데, 벌통 오른쪽
  for (let i = 1; i < N - 1; i++) {
    firstTotal -= honey[i] * 2;
    firstMaxTotal = Math.max(firstMaxTotal, firstTotal);
    firstTotal += honey[i];
  }

  let secondMaxTotal = -1,
    secondTotal = (total - honey.at(-1)) * 2;

  // 벌 오른쪽 끝에 하나, 벌 가운데, 벌통 왼쪽
  for (let i = N - 2; i >= 1; i--) {
    secondTotal -= honey[i] * 2;
    secondMaxTotal = Math.max(secondMaxTotal, secondTotal);
    secondTotal += honey[i];
  }

  console.log(Math.max(centerTotal, firstMaxTotal, secondMaxTotal));
}
