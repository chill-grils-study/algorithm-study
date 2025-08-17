const fs = require("fs");
const path = process.platform === 'linux' ? '/dev/stdin' : '../i.txt'

const input = fs.readFileSync(path, "utf8").trim().split("\n");

const N = Number(input[0]); 
const buildings = input.slice(1).map(Number);
let answer = 0
const stack = []
// 현재 빌딩에서 보이는 빌딩 수를 더하는 것이 아니라
// 현재 빌딩을 볼 수 있는 빌딩 수를 더함
for (let i = 0; i < N; i++) {
  const currentHeight = buildings[i]
  while (stack.at(-1) <= currentHeight) {
    stack.pop()
  }
  answer += stack.length // 스택에 남은 빌딩들이 현재 빌딩을 볼 수 있는 빌딩들
  stack.push(currentHeight) // 해당 빌딩
}

console.log(answer)
