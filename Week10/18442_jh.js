// 처음 풀이 -> 900ms
function solution(P, L, positions) {
  const positionLength = positions.length;
  // 우체국 위치
  let postboxPositions;
  let minSum = Infinity;

  const backtracking = (start, currentPostboxPositions) => {
    // 우체국 위치 조합이 완료됐다면
    if (currentPostboxPositions.length === P) {
      // 이번 조합에서 거리 최소 합
      let currentMinSum = 0;
      //각 마을에서 가장 가까운 우체국과의 거리를 더한다.
      for (let i = 0; i < positionLength; i++) {
        let currentMin = Infinity;
        // 현재 마을에 우체국이 있다면 다음 마을을 탐색
        if (currentPostboxPositions.includes(positions[i])) continue;
        // 현재 마을에서 가장 가까운 우체국까지의 거리를 구함
        for (let j = 0; j < P; j++) {
          currentMin = Math.min(
            currentMin,
            Math.abs(positions[i] - currentPostboxPositions[j]),
            L - Math.abs(positions[i] - currentPostboxPositions[j]),
          );
        }
        // 최소 합에 더함
        currentMinSum += currentMin;
      }
      // 최소값과 우체국 위치 배열 갱신
      if (minSum > currentMinSum) {
        postboxPositions = currentPostboxPositions;
        minSum = currentMinSum;
      }
    }
    // 조합을 위해 start의 위치는 다음 인덱스로 변경됨
    for (let i = start; i < positionLength; i++) {
      backtracking(i + 1, [...currentPostboxPositions, positions[i]]);
    }
  };

  backtracking(0, []);

  console.log(minSum);
  console.log(postboxPositions.join(' '));
}

// 시간복잡도를 줄여보고자 리팩토링 -> 848ms
// 조합 만드는 방법은 같음, 우체국과의 거리 최소값을 구하는 방식이 다름
function solution(P, L, positions) {
  const positionLength = positions.length;
  let postboxPositions;
  let minSum = Infinity;
  // 우체국 위치가 아니라 인덱스를 저장
  const backtracking = (start, currentPostboxIndexes) => {
    if (currentPostboxIndexes.length === P) {
      let currentMinSum = 0;

      for (let i = 0; i < positionLength; i++) {
        if (currentPostboxIndexes.includes(i)) continue;
        // 현재 마을의 인덱스보다 큰 우체국 인덱스를 찾음
        const bigIndex = currentPostboxIndexes.findIndex((index) => index > i);
        // 마을이 우체국 사이에 있을 경우
        if (bigIndex >= 1) {
          currentMinSum += Math.min(
            positions[currentPostboxIndexes[bigIndex]] - positions[i],
            positions[i] - positions[currentPostboxIndexes[bigIndex - 1]],
          );
        } else if (bigIndex === 0) {
          // 마을이 첫번째 우체국보다 앞에 있을 경우
          currentMinSum += Math.min(
            positions[currentPostboxIndexes[bigIndex]] - positions[i],
            L -
              Math.abs(positions[currentPostboxIndexes[P - 1]] - positions[i]),
          );
        } else {
          // 마을이 마지막 우체국 뒤에 있을 경우
          currentMinSum += Math.min(
            positions[i] - positions[currentPostboxIndexes[P - 1]],
            L - Math.abs(positions[i] - positions[currentPostboxIndexes[0]]),
          );
        }
      }

      if (minSum > currentMinSum) {
        postboxPositions = currentPostboxIndexes
          .map((index) => positions[index])
          .join(' ');
        minSum = currentMinSum;
      }
    }

    for (let i = start; i < positionLength; i++) {
      backtracking(i + 1, [...currentPostboxIndexes, i]);
    }
  };

  backtracking(0, []);

  console.log(minSum);
  console.log(postboxPositions);
}
