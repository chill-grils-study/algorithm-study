function solution(N, bolls) {
  const count = { R: 0, B: 0 };
  let leftPrev = bolls[0],
    rightPrev = bolls[N - 1];
  let leftIndex = 1,
    rightIndex = N - 2;

  for (; leftIndex < N; leftIndex++) {
    if (leftPrev !== bolls[leftIndex]) {
      break;
    }
  }

  for (; rightIndex >= 0; rightIndex--) {
    if (rightPrev !== bolls[rightIndex]) {
      break;
    }
  }

  leftIndex--;
  rightIndex++;

  if (leftIndex === N - 1 || rightIndex === 0 || leftIndex + 1 === rightIndex) {
    return 0;
  }

  if (leftPrev === rightPrev) {
    count[leftPrev] = Math.min(leftIndex + 1, N - rightIndex);
  }

  const centerCount = { R: 0, B: 0 };

  for (let i = leftIndex + 1; i < rightIndex; i++) {
    centerCount[bolls[i]]++;
  }

  return Math.min(centerCount['R'] + count['R'], centerCount['B'] + count['B']);
}
