// 문제 유형이 이분탐색이라는걸 알고
// 처음에는 탐색해야 할 값을 '공유기 위치'로 정하고 로직을 짜려고 했습니다.
// 근데 탐색 구간 정하는 기준을 어떻게 잡아야 될지 모르겠어서 결국 지피티한테 물어봤슴니다...
// 지피티가 탐색해야 할 값은 '공유기 사이의 최소 거리'라고 정정해주고 풀이 방법 알려줬음니다..
// 가장 인접한 두 공유기 사이의 최대 거리 = 공유기 사이의 최소 거리

// 인자로 넘겨받은 거리마다 공유기 설치했을 때 총 설치 갯수가 C개 이상인지 확인
const canInstall = (distance, C, houses) => {
  const length = houses.length;
  let count = 1;
  let previousHouse = houses[0];
  // 현재 거리 유지하면서 공유기 설치
  for (let i = 1; i < length; i++) {
    if (houses[i] - previousHouse >= distance) {
      count++;
      previousHouse = houses[i];
    }
  }
  // (사실 처음에는 count랑 C가 같아야 된다고 생각했음)
  // 공유기를 C개 이상 설치할 수 있는 가장 큰 거리를 찾는게 목표.
  // count가 C보다 크다면 distance를 키워서 탐색 범위를 오른쪽으로 늘려볼 수 있음
  // 반환값이 count === C라면 구간 탐색이 원활하지 않음
  return count >= C;
};

const solution = (N, C, houses) => {
  let left = 1,
    right;
  let answer;

  houses.sort((a, b) => a - b);
  // 탐색 값이 공유기 사이의 최소 거리이기 때문에
  // right를 가장 먼 집 간의 거리로 초기화
  right = houses[N - 1] - houses[0];
  // 이분탐색
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // mid 거리마다 C개 이상의 공유기를 설치할 수 있다면
    if (canInstall(mid, C, houses)) {
      // 정답 갱신
      answer = mid;
      // 거리를 더 늘려볼 수 있으므로 탐색 구간을 오른쪽으로 이동
      left = mid + 1;
    } else {
      // 탐색 구간을 왼쪽으로 이동
      right = mid - 1;
    }
  }

  console.log(answer);
};
