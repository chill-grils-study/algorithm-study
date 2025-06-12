const fs = require('fs')
const input = fs.readFileSync('../input.txt', 'utf-8').trim().split('\n')
const [N, P] = input[0].split(' ').map(Number)
const plays = input.slice(1).map(e => e.split(' ').map(Number))
let count = 0
const stack = Array.from({ length: N + 1 }, () => [])
for (let play of plays) {
  const [sound, fret] = play

  // 더 높은 프렛 누르기 (또는 아무 것도 없음)
  if (stack[sound].length === 0 || stack[sound].at(-1) < fret) {
    stack[sound].push(fret)
    count += 1
    continue
  }

  // 더 낮은 프렛을 누르려면 높은 걸 다 떼야 함
  while (stack[sound].length > 0 && stack[sound].at(-1) > fret) {
    stack[sound].pop()
    count += 1
  }

  // 같은 프렛이면 이미 누르고 있음
  // 다 떼고 나서 아직 누르지 않은 프렛이면 누름
  if (stack[sound].at(-1) !== fret) {
    stack[sound].push(fret)
    count += 1
  }
}
console.log(count)
