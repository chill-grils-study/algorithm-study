const getZeroCount = (belts) => {
  return belts.filter((belt) => belt[1] === 0).length;
};

// 처음 풀이
const solution1 = (N, K, powers) => {
  // 컨베이어 칸의 정보 저장, [로봇 존재 여부, 내구도]
  const belts = Array.from({ length: N * 2 }, () => Array(2));
  const doubleN = N * 2;
  // 위쪽의 벨트 구간을 인덱스로 관리
  // (startIndex ~ endIndex까지 위쪽 구간)
  let startIndex = 0,
    endIndex,
    count = 0;
  // 내구도 정보 기반으로 칸 배열 업데이트
  powers.forEach((power, index) => {
    belts[index][0] = false;
    belts[index][1] = power;
  });

  while (true) {
    count++;
    // 벨트 한칸 회전 -> 회전에 맞춰 벨트 구간 나타내는 인덱스 갱신
    startIndex = startIndex === 0 ? doubleN - 1 : startIndex - 1;
    endIndex = startIndex <= N ? startIndex + N - 1 : startIndex - (N + 1);
    // 위쪽 마지막 칸에 로봇이 있으면 내려줌
    if (belts[endIndex][0]) {
      belts[endIndex][0] = false;
    }
    // 벨트의 위쪽 칸을 순회하며 로봇들 한 칸씩 이동
    for (let i = endIndex; i >= startIndex; i--) {
      if (belts[i][0]) {
        if (i === doubleN - 1 && !belts[0][0] && belts[0][1] > 0) {
          belts[0][0] = true;
          belts[0][1]--;
          i = 0;
          continue;
        }
        if (!belts[i + 1][0] && belts[i + 1][1] > 0) {
          belts[i + 1][0] = true;
          belts[i + 1][1]--;
        }
      }
    }
    // 마지막 칸에 로봇 있으면 내려줌
    if (belts[endIndex][0]) {
      belts[endIndex][0] = false;
    }
    // 첫번째 칸에 로봇을 올릴 수 있다면 올림
    if (belts[startIndex][1] > 0) {
      belts[startIndex][0] = true;
      belts[startIndex][1]--;
    }
    // 내구도가 0인 칸의 개수가 K개라면 반복문 종료
    // (문제에서의 조건은 K개 이상이라고 나와있는데 문제 제대로 안 읽음 ㅎ)
    if (getZeroCount(belts) === K) {
      break;
    }
  }

  return count;
};
// => 인덱스를 사용한 구간 계산에 오류가 있음, 로봇 이동 꼬일 수 있음

const solution = (N, K, powers) => {
  // 주어진 내구도 정보 기반으로 컨베이어 벨트 칸의 정보 초기화
  const belts = powers.map((power) => [false, power]);
  let count = 0;

  while (true) {
    count++;
    // 벨트 회전
    // 맨 뒤의 칸을 추출해서 앞에 삽입
    belts.unshift(belts.pop());
    // 위쪽 마지막 칸에 있는 로봇 내림
    belts[N - 1][0] = false;
    // 로봇 앞으롷 한칸씩 이동
    for (let i = N - 2; i >= 0; i--) {
      if (belts[i][0] && !belts[i + 1][0] && belts[i + 1][1] > 0) {
        belts[i][0] = false;
        belts[i + 1][0] = true;
        belts[i + 1][1]--;
      }
    }
    // 위쪽 마지막 칸에 있는 로봇 내림
    belts[N - 1][0] = false;
    // 첫번째 칸의 내구도가 0 작지 않으면 로봇 올림
    if (belts[0][1] > 0) {
      belts[0][0] = true;
      belts[0][1]--;
    }
    // 내구도 0인 칸이 K개 이상이면 반복문 종료
    if (getZeroCount(belts) >= K) {
      break;
    }
  }

  return count;
};
