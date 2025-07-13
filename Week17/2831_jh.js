const solution = (men, women) => {
  const menSize = men.length;
  const womenSize = women.length;
  let count = 0;

  // 남자, 여자 키 모두 오름차순으로 정렬
  men.sort((a, b) => a - b);
  women.sort((a, b) => a - b);

  // 남자 키 중에서 양수인 키의 인덱스 구함
  const plusIndexInMen = men.findIndex((man) => man > 0);
  // 여자 키 중에서 양수인 키의 인덱스 구함
  const plusIndexInWomen = women.findIndex((woman) => woman > 0);
  // (음수 키 남자 + 양수 키 여자) 조합 먼저 확인
  // 키가 작은 애들부터 쌍을 맺어야 많이 맺을 수 있음
  // 남자: [-2200, -1800, 2300, 2700]
  // 여자: [-3000, -2500, 1700, 1900]
  let i = plusIndexInMen === -1 ? menSize - 1 : plusIndexInMen - 1,
    j = plusIndexInWomen;

  while (i >= 0 && j >= 0 && j < womenSize) {
    if (-men[i] > women[j]) {
      count++;
      i--;
      j++;
    } else {
      i--;
    }
  }
  // (양수 키 남자 + 음수 키 여자) 조합 확인
  (i = plusIndexInMen),
    (j = plusIndexInWomen === -1 ? womenSize - 1 : plusIndexInWomen - 1);

  while (i >= 0 && i < menSize && j >= 0) {
    if (men[i] < -women[j]) {
      count++;
      i++;
      j--;
    } else {
      j--;
    }
  }

  return count;
};
