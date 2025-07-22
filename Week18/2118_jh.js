// 지피티가 풀어주긴 했는데 사실 제대로 이해 안돼요.. 빈이 설명 들을래...
const solution = (N, distances) => {
  // 누적합을 저장할 배열
  // 원형 경로를 선형 배열처럼 처리하기 위해 길이를 2N으로 확장
  const prefixSum = Array(2 * N + 1).fill(0);

  for (let i = 1; i <= 2 * N; i++) {
    prefixSum[i] = prefixSum[i - 1] + distances[(i - 1) % N];
  }

  const total = prefixSum[N];
  let result = 0;
  let right = 0;

  for (let left = 0; left < N; left++) {
    while (
      right < left + N &&
      prefixSum[right + 1] - prefixSum[left] <= total / 2
    ) {
      right++;
    }

    const clockwise = prefixSum[right] - prefixSum[left];
    const unClockwise = total - clockwise;
    result = Math.max(result, Math.min(clockwise, unClockwise));
  }

  return result;
};
