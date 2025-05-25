function solution(N, M, nums) {
  // 누락된 논문 페이지 번호
  const numsToPrint = [];
  let prevNum, // 이전 연속 구간 시작 번호
    prevInk = 7; // 이전 구간까지의 누적 잉크 양
  let result = 0;

  nums.sort((prev, next) => prev - next);

  // 누락된 페이지 번호들을 저장
  for (let i = 1; i <= N; i++) {
    if (!nums.includes(i)) {
      numsToPrint.push(i);
    }
  }

  const numsToPrintLength = numsToPrint.length;

  // * 예외 처리를 안 하고 돌렸더니 30퍼에서 틀림
  // 로컬에서 그냥 돌렸을 때는 괜찮았는데 백준 환경에서는 머 문제가 생기나보다..
  // 엣지 케이스들도 잘 점검하기
  // 누락된 페이지가 없다면 0을 출력하고 리턴
  if (numsToPrintLength === 0) {
    console.log(0);
    return;
  }
  // 누락된 페이지가 한장이면 7을 출력하고 리턴
  if (numsToPrintLength === 1) {
    console.log(7);
    return;
  }

  // 부분 연속 구간 시작점
  prevNum = numsToPrint[0];

  // 두번째 페이지 번호부터 확인
  for (let i = 1; i < numsToPrintLength; i++) {
    // 이전 페이지 번호부터 현재 번호까지 연속으로 출력했을 때의 잉크 양
    const continuousInk = 5 + 2 * (numsToPrint[i] - prevNum + 1);

    // 이전 페이지부터 현재까지 연속으로 출력하는 것이
    // 이전 연속 구간과 현재 페이지를 분리해서 출력하는 것보다 잉크 양이 적게 든다면
    // prevInk 갱신
    if (prevInk + 7 > continuousInk) {
      prevInk = continuousInk;
    } else {
      // 구간을 분리하는게 잉크 양이 적게 든다면
      // 결과에 이전 구간의 잉크 양 더함
      result += prevInk;
      // 현재 번호부터 연속 구간이 새로 시작되기 때문에 prevInk를 7로 변경
      prevInk = 7;
      // 이전 연속 구간 시작 번호는 현재 페이지 번호로
      prevNum = numsToPrint[i];
    }
    // 현재 원소가 마지막 원소라면 결과에 잉크 양 더해줌
    if (i === numsToPrintLength - 1) {
      result += prevInk;
    }
  }

  console.log(result);
}
