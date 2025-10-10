function solution(N, K, arr) {
  const info = new Map();
  let leftIndex = 0;
  let maxLength = 0;

  for (let rightIndex = 0; rightIndex < N; rightIndex++) {
    const num = arr[rightIndex];
    if (info.has(num)) {
      const [indexes, frontIndex] = info.get(num);
      indexes.push(rightIndex);
      const count = indexes.length - frontIndex;

      if (count > K) {
        const nextLeftIndex = indexes[frontIndex] + 1;
        if (leftIndex < nextLeftIndex) {
          leftIndex = indexes[frontIndex] + 1;
        }
        info.set(num, [indexes, frontIndex + 1]);
      }
    } else {
      info.set(num, [[rightIndex], 0]);
    }

    maxLength = Math.max(maxLength, rightIndex - leftIndex + 1);
  }

  return maxLength;
}
