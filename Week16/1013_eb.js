const input = require('fs')
  .readFileSync('../i.txt')
  .toString()
  .trim()
  .split('\n')
const N = Number(input[0])
const radiowaves = input.slice(1)
const regex = /^(100+1+|01)+$/
for (let wave of radiowaves) {
  console.log(regex.test(wave) ? 'YES' : 'NO')
}
