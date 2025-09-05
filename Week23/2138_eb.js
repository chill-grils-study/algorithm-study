const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split("\n");

const N = Number(input[0]);
const current = input[1].split("").map(Number).map(Boolean); // '000' → [0,0,0]
const target = input[2].split("").map(Number).map(Boolean); // '010' → [0,1,0]
function press(arr, pressFirst) {
  arr = [...arr];
  let answer = 0;

  if (pressFirst) {
    arr[0] = !arr[0];
    if (N > 1) arr[1] = !arr[1];
    answer++;
  }

  for (let i = 1; i < N; i++) {
    if (arr[i - 1] !== target[i - 1]) {
      arr[i - 1] = !arr[i - 1];
      arr[i] = !arr[i];
      if (i + 1 < N) arr[i + 1] = !arr[i + 1];
      answer++;
    }
  }

  for (let i = 0; i < N; i++) {
    if (arr[i] !== target[i]) return Infinity;
  }

  return answer;
}
const firstClick = press(current, true);
const firstClickNo = press(current, false);
const answer = Math.min(firstClick, firstClickNo)
console.log(answer === Infinity ? -1 : answer)
