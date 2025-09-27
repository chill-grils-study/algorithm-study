const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf8").trim().split("\n");
const T = Number(input[0]); // 첫 줄: 테스트케이스 개수
const passwords = []
let idx = 1;
for (let t = 0; t < T; t++) {
  const encrypted = input[idx++].trim();
  const original = input[idx++].trim();

  passwords.push({ original, encrypted })
}

// 비밀번호의 서로 다른 두 글자를 교환한다. 이 과정은 0번 또는 원하는 만큼 얼마든지 할 수 있다.
// 1번 과정의 결과물 앞부분에 0개 혹은 그 이상의 문자를 삽입한다.
// 2번 과정의 결과물 뒷부분에 0개 혹은 그 이상의 문자를 삽입한다.
// 원래 비밀번호의 글자 구성이 암호화된 비밀번호 안에 연속으로 붙어서 나타나야 함

for (const { original, encrypted } of passwords) {
  if (original.length > encrypted.length) {
    console.log('NO')
    continue
  }
  let found = false
  const originStr = countCharacters(original)
  const enStr = countCharacters(encrypted.slice(0, original.length))
  if (compareCharacters(originStr, enStr)) {
    console.log('YES')
    found = true
  } else {
    for (let i = 1; i <= encrypted.length - original.length; i++) {
      enStr[encrypted[i - 1]] -= 1
      if (enStr[encrypted[i - 1]] === 0) {
        delete enStr[encrypted[i - 1]];
      }
      enStr[encrypted[i + original.length - 1]] = (enStr[encrypted[i + original.length - 1]] || 0) + 1;
      if (compareCharacters(originStr, enStr)) {
        console.log('YES')
        found = true
        break;
      }
    }
  }
  if (!found) {
    console.log('NO')
  }
}


function countCharacters(str) {
  return str.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
}

function compareCharacters(obj1, obj2) {
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }

  for (const key of obj1Keys) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }
  return true
}