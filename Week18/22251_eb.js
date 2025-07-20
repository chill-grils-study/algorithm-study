const fs = require('fs')
const input = fs
  .readFileSync('../i.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number)

const [N, K, P, X] = input
// N 층수, K 자릿수, P 바꿀수있는수, X 현재 층
// sevenSeg[]로 숫자 0~9 비트 표현 준비
// X를 K자리 문자열로 변환 (padStart(K, '0'))
// 1 ~ N 까지 순회하며:
// 그 숫자도 K자리 문자열로 만들고
// 각 자릿수마다 7-segment 간 차이 LED 개수 누적
// 총합이 P 이하면 카운트
// 단, 현재 층 X는 제외

const sevenSeg = [
  0b1111110, // 0
  0b0110000, // 1
  0b1101101, // 2
  0b1111001, // 3
  0b0110011, // 4
  0b1011011, // 5
  0b1011111, // 6
  0b1110000, // 7
  0b1111111, // 8
  0b1111011 // 9
]
const currentFloor = String(X).padStart(K, '0')

// 메모리 50072 시간 2736 
// toString 변환하고 split때문에 오래 걸림 
{
  let answer = 0
  for (let i = 1; i <= N; i++) {
    if (i === X) continue
    const target = String(i).padStart(K, '0')
    let count = 0
    for (let i = 0; i < K; i++) {
      const xor = (sevenSeg[Number(target[i])] ^
        sevenSeg[Number(currentFloor[i])]).toString(2)
      count += xor.split('1').length - 1
    }
    if (count <= P) {
      answer += 1
    }
  }
  console.log(answer)
}

// 메모리 19368 시간 344
// countBits 함수 추가: 1비트씩 확인하고 오른쪽 쉬프트
let answer = 0
for (let i = 1; i <= N; i++) {
  if (i === X) continue
  const target = String(i).padStart(K, '0')
  let count = 0
  for (let i = 0; i < K; i++) {
    const xor = (sevenSeg[Number(target[i])] ^
      sevenSeg[Number(currentFloor[i])]).toString(2)
    count += countBits(xor)
    if (count > P) break // 조기 탈출
  }
  if (count <= P) {
    answer += 1
  }
}

function countBits (x) {
  let count = 0
  while (x > 0) {
    count += x & 1
    x >>= 1
  }
  return count
}
