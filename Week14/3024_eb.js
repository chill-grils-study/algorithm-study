const input = require("fs")
  .readFileSync("../input.txt", "utf8")
  .trim()
  .split("\n");

const n = Number(input[0]); // 4
const board = input.slice(1).map(line => line.split(""));

const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const current = board[i][j];
    if (current === ".") continue;
    for (const [dy, dx] of directions) {
      let bingo = true;
      for (let k = 1; k <= 2; k++) {
        const nextX = j + dx * k;
        const nextY = i + dy * k;
        if (
          nextX < 0 ||
          nextX >= n ||
          nextY < 0 ||
          nextY >= n ||
          board[nextY][nextX] !== current
        ) {
          bingo = false;
          break;
        }
      }
      if (bingo) {
        return console.log(current);
      }
    }
  }
  console.log("ongoing");
}

// console.log(n); // 숫자 출력
// console.log(board); // 2차원 배열 출력
// // 세로 확인
// for (let i = 0; i < n; i++) {
//   let flag = "";
//   for (let j = 0; j < n; j++) {
//     if (j === 0) {
//       flag = board[j][i];
//     }
//     if (flag === "." || flag !== board[j][i]) {
//       break;
//     }
//     if (j === n - 1) {
//       return console.log(board[j][i]);
//     }
//   }
// }

// // 가로 확인
// for (let i = 0; i < n; i++) {
//   let flag = "";
//   for (let j = 0; j < n; j++) {
//     if (j === 0) {
//       flag = board[i][j];
//     }
//     if (flag === "." || flag !== board[i][j]) {
//       break;
//     }
//     if (j === n - 1) {
//       return console.log(board[i][j]);
//     }
//   }
// }

// // 대각선 확인
// let flag = board[0][0];

// for (let i = 1; i < n; i++) {
//   if (flag === "." || flag !== board[i][i]) {
//     break;
//   }
//   return console.log(board[i][i]);
// }

// // 반대 대각선 확인
// flag = board[0][n - 1];
// for (let i = 1; i < n; i++) {
//   if (flag === "." || flag !== board[i][n - 1 - i]) {
//     break;
//   }
//   return console.log(board[i][n - 1 - i]);
// }

// console.log("ongoing");
