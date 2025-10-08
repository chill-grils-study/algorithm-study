const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf8").trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
// 시간 초과^^
if (false) {
  let answer = 0
  for (let i = 0; i < n; i++) {
    const count = new Map()
    count[arr[i]] = 1
    let length = 1
    for (let j = i + 1; j < n; j++) {
      const target = arr[j]
      count[target] = (count[target] || 0) + 1;
      if (count[target] > k) {
        answer = Math.max(length, answer)
        break
      } else {
        length++
      }
    }
  }
  console.group(answer)
  //3 2 5 5 6 4 4 5 7}
}

let answer = 0
let left = 0
const count = new Map()
for (let right = 0; right < n; right++) {
  const target = arr[right]
  count.set(target, (count.get(target) || 0) + 1);
  while (count.get(target) > k) {
    const leftNum = arr[left]
    count.set(leftNum, count.get(leftNum) - 1)
    left++
  }
  answer = Math.max(answer, right - left + 1)
}
console.log(answer)