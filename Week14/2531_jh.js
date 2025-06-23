function solution(chobob, N, k, c) {
  // 각 초밥별 등장 횟수를 저장하는 map
  const chobobCount = new Map();
  // 초밥 가짓수, 최대 가짓수
  let typeCount = 1,
    result = 0;

  // 쿠폰에 적힌 초밥은 무조건 먹을 수 있으므로 등장 횟수 1로 설정
  chobobCount.set(c, 1);
  // 앞에서부터 k개의 초밥 각 등장 횟수 저장
  for (let i = 0; i < k; i++) {
    if (chobobCount.has(chobob[i])) {
      chobobCount.set(chobob[i], chobobCount.get(chobob[i]) + 1);
    } else {
      chobobCount.set(chobob[i], 1);
      typeCount++;
    }
  }
  // 최대 가짓수 갱신
  result = typeCount;
  // 구간을 한 칸씩 이동
  for (let i = 1; i < N; i++) {
    // 이번 구간에서 제외된 초밥
    const removedChobob = chobob[i - 1];
    // 이번 구간에서 추가된 초밥
    const addedChobob = chobob[(i + k - 1) % N];
    // 제외된 초밥이 1개 남아있고 새로 추가되는 초밥과 다른 종류라면
    // 초밥 가짓수 - 1
    if (chobobCount.get(removedChobob) === 1 && removedChobob !== addedChobob) {
      typeCount--;
    }
    // 추가되는 초밥이 완전히 처음 추가되는거라면
    // 초밥 가짓수 + 1
    if (!chobobCount.has(addedChobob) || chobobCount.get(addedChobob) === 0) {
      typeCount++;
    }
    // 초밥 등장 횟수 갱신
    chobobCount.set(removedChobob, chobobCount.get(removedChobob) - 1);
    chobobCount.set(addedChobob, (chobobCount.get(addedChobob) || 0) + 1);
    // 최댓값 갱신
    result = Math.max(result, typeCount);
  }

  return result;
}
