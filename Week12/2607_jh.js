// 처음 풀이, 틀렸음... 어렵다.. ㅠ 실버2래매..
// 로직 오류가 많이 발견됨
function solution(N, words) {
  const counts = Array.from({ length: N }, () => new Map());
  let result = 0;

  words.forEach((word, index) => {
    for (const char of word) {
      counts[index].set(char, (counts[index].get(char) || 0) + 1);
    }
  });

  for (let i = 1; i < N; i++) {
    let targetWord, inputWord;
    let unmatchedCount = 0;
    let canChange = false;

    if (words[i].length > words[0].length) {
      targetWord = counts[i];
      inputWord = counts[0];
    } else {
      targetWord = counts[0];
      inputWord = counts[i];
    }

    for (const [key, value] of targetWord) {
      if (!inputWord.has(key)) {
        if (canChange) {
          canChange = false;
        } else {
          unmatchedCount++;
        }
      } else if (inputWord.get(key) > value) {
        inputWord.set(key, inputWord.get(key) - 1);
        canChange = true;
        unmatchedCount++;
      } else if (inputWord.get(key) < value) {
        inputWord.set(key, inputWord.get(key) + 1);
        unmatchedCount++;
      }

      if (unmatchedCount > 1) {
        break;
      }
    }

    if (unmatchedCount <= 1) {
      result++;
    }
  }

  console.log(result);
}

// and then... help me GPT !!!!!!
// 각 단어의 문자 개수를 세는건 똑같음
// 일치하지 않는 문자 개수의 차이를 계산해서 답을 구하면 됨
function solution(N, words) {
  const base = words[0];
  const baseMap = getCharMap(base);
  let result = 0;

  for (let i = 1; i < N; i++) {
    const currentWord = words[i];
    const currentMap = getCharMap(currentWord);
    const diff = getDiffCount(baseMap, currentMap);
    const lengthDiff = Math.abs(base.length - currentWord.length);

    if (
      (diff === 0 && lengthDiff === 0) || // 단어가 서로 일치
      (diff === 1 && lengthDiff === 1) || // 문자 하나 더하거나 빼면 됨
      (diff === 2 && lengthDiff === 0) // 문자 하나 바꾸면 됨
    ) {
      result++;
    }
  }

  console.log(result);
}

// 단어의 각 문자별 빈도수를 계산해서 반환
function getCharMap(word) {
  const map = new Map();

  for (char of word) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  return map;
}

// 두 단어의 문자별 등장 횟수 차이의 총합을 반환
function getDiffCount(map1, map2) {
  // 두 단어에 등장하는 모든 문자
  // set으로 중복 제거
  const allKeys = new Set([...map1.keys(), ...map2.keys()]);
  let diff = 0;

  for (const key of allKeys) {
    const count1 = map1.get(key) || 0;
    const count2 = map2.get(key) || 0;
    // 두 단어에서 현재 문자에 대한 등장 횟수 차이 더함
    diff += Math.abs(count1 - count2);
  }

  return diff;
}
