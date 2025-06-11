const fs = require('fs')
const input = fs.readFileSync('../input.txt', 'utf-8').trim().split('\n')
const N = Number(input[0])
const firstWord = input[1]
const words = input.slice(2)
let result = 0
// 하나의 문자를 더하거나, 빼거나, 바꾸기
// 왜 틀렸는지 몰겠음
const count = {}
for (const char of firstWord) {
  count[char] = (count[char] || 0) + 1
}
for (let word of words) {
  // 1. 길이 차이가 2 이상이면 스킵
  if (Math.abs(word.length - firstWord.length) >= 2) continue

  // 2. 동일한 단어면 비슷한 단어로 간주
  if (word === firstWord) {
    result += 1
    continue
  }

  // 3. 기준 단어의 문자들을 제거해보기
  let temp = word
  for (let c in count) {
    for (let i = 0; i < count[c]; i++) {
      temp = temp.replace(c, '')
    }
  }

  // 4. 남은 문자가 1개 이하이면 비슷한 단어
  if (temp.length <= 1) {
    result += 1
  }
}

console.log(result)
