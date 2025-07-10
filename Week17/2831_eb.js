const fs = require('fs')
const input = fs.readFileSync('../i.txt').toString().trim().split('\n')

const n = Number(input[0])
const men = input[1]
  .trim()
  .split(' ')
  .map(Number)
  .sort((a, b) => Math.abs(a) - Math.abs(b))

const women = input[2]
  .trim()
  .split(' ')
  .map(Number)
  .sort((a, b) => Math.abs(a) - Math.abs(b))
const menWantTaller  = []
const menWantShorter = []
men.forEach(m => {
  if (m > 0) menWantTaller .push(m)
  else menWantShorter.push(-m)
})

const womenWantTaller = []
const womenWantShorter = []
women.forEach(w => {
  if (w > 0) womenWantTaller.push(w)
  else womenWantShorter.push(-w)
})
console.log(menWantTaller , womenWantTaller, menWantShorter, womenWantShorter)

function match (arr1, arr2) {
  let i = 0
  let j = 0
  let count = 0
  // [ -1800, -2200 ] [ 1900, 1700 ]
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      i++
      j++
      count++
    } else {
      j++
    }
  }
  return count
}
console.log(
  match(menWantTaller , womenWantShorter) +
    match(womenWantTaller, menWantShorter)
)
