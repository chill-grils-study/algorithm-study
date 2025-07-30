const path = process.platform === 'linux' ? '/dev/stdin' : '../i.txt'
const input = require('fs')
  .readFileSync(path, 'utf-8')
  .toString()
  .trim()
  .split('\n')

const n = Number(input[0])
const towers = input[1].split(' ').map(Number)
const answer = []

// 시간 초과 ㅠ
// for (let i = n - 1; i >= 0; i--) {
//   const currentTowerHeight = towers[i]
//   let receiveTowerIndex = 0
//   for (let j = i; j >= 0; j--) {
//     if (towers[j] > currentTowerHeight) {
//       receiveTowerIndex = j + 1
//       break
//     }
//   }
//   answer.push(receiveTowerIndex)
// }
// console.log(answer.reverse().join(' '))

const stack = []
for (let i = 0; i < n; i++) {
  const currentHeight = towers[i]
  while (stack.length && stack.at(-1)[1] < currentHeight) {
    // 해당 탑 높이보다 작은 탑들은 다 pop 처리 (수신 못 하니까)
    stack.pop()
  }

  if (stack.length === 0) {
    // stack 비어있으면 수신할 탑이 없다는 뜻이므로 0
    answer.push(0)
  } else {
    // stack이 있다면 제일 마지막 요소 탑 번호
    answer.push(stack.at(-1)[0])
  }

  stack.push([i + 1, currentHeight]) // 해당 탑 stack push
}

console.log(answer.join(' '))
