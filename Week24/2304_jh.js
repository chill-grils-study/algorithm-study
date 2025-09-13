// 제일 높은 창고를 기준으로 왼/오로 나눠서 검사했어요.
function solution(bars) {
  const N = bars.length;
  // 왼쪽 영역에서 제일 높은 창고의 위치와 높이를 저장
  const leftMax = { location: 0, height: 0 };
  // 왼쪽 영역에서 제일 높은 창고의 위치와 높이를 저장
  const rightMax = { location: 0, height: 0 };
  // 전체 창고 중에서 제일 높은 창고의 위치와 높이를 저장
  const realMax = { location: 0, height: 0, index: 0 };
  let total = 0;
  // 창고 높이 기준으로 오름차순 정렬
  bars.sort((a, b) => a[0] - b[0]);
  // 가장 높은 창고 정보 저장
  bars.forEach((bar, index) => {
    const [location, height] = bar;
    
    if (height > realMax.height) {
      realMax.location = location;
      realMax.height = height;
      realMax.index = index;
    }
  });
  // 왼쪽 영역 확인
  for (let i = 0; i <= realMax.index; i++) {
    const [curLocation, curHeight] = bars[i];

    if (curHeight >= leftMax.height) {
      total += (curLocation - leftMax.location) * leftMax.height;
      leftMax.location = curLocation;
      leftMax.height = curHeight;
    }
  }
  // 오른쪽 영역 확인
  for (let i = N - 1; i >= realMax.index; i--) {
    const [curLocation, curHeight] = bars[i];

    if (curHeight >= rightMax.height) {
      total += (rightMax.location - curLocation) * rightMax.height;
      rightMax.location = curLocation;
      rightMax.height = curHeight;
    }
  }

  total += realMax.height;

  console.log(total);
}
