const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const [A, B, C] = fs.readFileSync(path, "utf8").trim().split(" ").map(BigInt);

function pow(a, b) {
  if (b === 1n) return a % C;

  const half = pow(a, b / 2n);

  if (b % 2n === 0n) {
    return (half * half) % C;
  } else {
    return (half * half * a) % C;
  }
}

console.log(String(pow(A, B)));
