const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split("\n");

const N = Number(input[0]);
const numbers = input[1].split(" ").map(Number);
const [plus, minus, multiply, divide] = input[2].split(" ").map(Number);

let maxResult = -Infinity
let minResult = Infinity
function dfs(num, depth, plus, minus, multiply, divide) {
  if (depth === N) {
    maxResult = Math.max(maxResult, num);
    minResult = Math.min(minResult, num);
  }

  if (plus) {
    dfs(num + numbers[depth], depth + 1, plus - 1, minus, multiply, divide);
  }
  if (minus) {
    dfs(num - numbers[depth], depth + 1, plus, minus - 1, multiply, divide);
  }
  if (multiply) {
    dfs(num * numbers[depth], depth + 1, plus, minus, multiply - 1, divide);
  }
  if (divide) {
    dfs(parseInt(num / numbers[depth]), depth + 1, plus, minus, multiply, divide - 1);
  }
}

dfs(numbers[0], 1, plus, minus, multiply, divide)
console.log(`${maxResult}\n${minResult}`);