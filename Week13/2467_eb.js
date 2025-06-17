const fs = require("fs");
const input = fs.readFileSync("../input.txt").toString().trim().split("\n");

const n = Number(input[0]);
const solutions = input[1].split(" ").map(Number);

let left = 0;
let right = n - 1;
let minSum = Infinity;
let answer = [solutions[left], solutions[right]];

while (left < right) {
  const sum = solutions[left] + solutions[right];

  if (Math.abs(sum) < Math.abs(minSum)) {
    minSum = sum;
    answer = [solutions[left], solutions[right]];
  }

  if (sum < 0) {
    left++;
  } else if (sum > 0) {
    right--;
  } else {
    // 합이 정확히 0이면 그게 가장 가까운 값이므로 바로 출력
    console.log(solutions[left], solutions[right]);
    return;
  }
}

console.log(answer[0], answer[1]);
