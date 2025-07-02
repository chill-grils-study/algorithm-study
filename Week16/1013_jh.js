// 처음 풀이
// 정규식을 사용해서 풀이
// 반례: 100001111100011
const solution = (N, patterns) => {
  const regex1 = /100+1+/;
  const regex2 = /01/;

  for (const pattern of patterns) {
    let currentPattern = pattern;
    let isRight = true;

    while (currentPattern.length > 0) {
      // 문자열에 100+1+ 가 있다면 제거
      const firstMatch = currentPattern.match(regex1);

      if (firstMatch) {
        currentPattern = currentPattern.replace(regex1, '');
        continue;
      }
      // 문자열에 01+ 가 있다면 제거
      const secondMatch = currentPattern.match(regex2);

      if (secondMatch) {
        currentPattern = currentPattern.replace(regex2, '');
      } else {
        isRight = false;
        break;
      }
    }

    if (isRight) {
      console.log('YES');
    } else {
      console.log('NO');
    }
  }
};

// 두번째 풀이
// 위의서 작성한 반례 똑같이 통과 안됨
const solution2 = (N, patterns) => {
  // 문자열 전체가 일치하지 않아도 매칭되는 부분만 제거하게 됨
  const regex = /(100+1+|01)+/;

  for (const pattern of patterns) {
    const remainStr = pattern.replace(regex, '');
    if (remainStr.length > 0) {
      console.log('NO');
    } else {
      console.log('YES');
    }
  }
};

// 복잡하게도 풀어보려고 했슴,,,
const solution3 = (N, patterns) => {
  const regex1 = /100+1+/;
  const regex2 = /01/;

  for (const pattern of patterns) {
    let currentPattern = pattern;
    let isRight = true;
    while (currentPattern.length > 0) {
      const firstMatch = currentPattern.match(regex1);
      // 10000011101
      // console.log(currentPattern, firstMatch);
      if (firstMatch) {
        const subPatternLength = firstMatch[0].length;

        if (subPatternLength === currentPattern.length) {
          currentPattern = '';
        } else if (
          subPatternLength <= currentPattern.length - 2 &&
          currentPattern[subPatternLength] === '0' &&
          currentPattern[subPatternLength + 1] === '1'
        ) {
          // console.log('1');
          currentPattern = currentPattern.slice(subPatternLength);
        } else if (currentPattern[subPatternLength - 2] === '1') {
          // console.log('2');
          currentPattern = currentPattern.slice(subPatternLength - 1);
        }

        continue;
      }

      const secondMatch = currentPattern.match(regex2);

      if (secondMatch) {
        currentPattern = currentPattern.replace(regex2, '');
      } else {
        isRight = false;
        break;
      }
    }

    if (isRight) {
      console.log('YES');
    } else {
      console.log('NO');
    }
  }
};

// 정답 풀이
// 정규식만 수정
const solution4 = (N, patterns) => {
  // 문자열의 시작과 끝이 주어진 조건대로 작성되어 있는지 확인
  // ^: 문자열 시작, $: 문자열 끝
  // => (100+1+|01)+로 시작하고 끝나는 문자열을 찾겠다
  const regex = /^(100+1+|01)+$/;

  for (const pattern of patterns) {
    const remainStr = pattern.replace(regex, '');
    if (remainStr.length > 0) {
      console.log('NO');
    } else {
      console.log('YES');
    }
  }
};
