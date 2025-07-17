const fs = require('fs')
const input = fs.readFileSync('../i.txt').toString().trim().split('\n')
const n = input[0]
const distances = input.slice(1).map(Number)
const total = distances.reduce((a, b) => a + b, 0)
const flattenDist = distances.concat(distances)
const prefixSum = [0]
for (let i = 0; i < flattenDist.length; i++) {
  prefixSum[i + 1] = prefixSum[i] + flattenDist[i]
}
let j = 0
let maxDistance = 0

for (let i = 0; i < n; i++) {
  // i 왼쪽 포인터, j 오른쪽 포인터
  while (j < n + i && prefixSum[j + 1] - prefixSum[i] <= total / 2) {
    // dist[i] ~ dist[j]까지의 구간합이 total / 2 보다 작을 때까지
    j++
  }
  const d1 = prefixSum[j] - prefixSum[i] // 정방향 거리
  const d2 = total - d1 // 반대 방향 거리
  maxDistance = Math.max(maxDistance, Math.min(d1, d2))
}

console.log(maxDistance)
