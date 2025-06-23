const input = require('fs')
  .readFileSync('../input.txt', 'utf8')
  .trim()
  .split('\n')
const [a, d, k, coupon] = input[0].split(' ').map(Number)
let sushi = input.slice(1).map(Number)
sushi = sushi.concat(sushi.slice(0, d - 1))
let bucket = new Set()
let result = -Infinity
for (let i = 0; i < a; i++) {
  for (let j = i; j < i + k; j++) {
    bucket.add(sushi[j])
  }
  bucket.add(coupon)
  result = Math.max(result, bucket.size)
  bucket = new Set()
}
console.log(result)
