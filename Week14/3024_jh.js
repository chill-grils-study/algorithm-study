const fs = require('fs');
const input = fs.readFileSync('./run/input.txt').toString().trim().split('\n');
const N = +input[0];
const board = [];
// 이동 방향
const directions = [
  [0, 1], // 오른쪽으로 이동
  [1, 1], // 오른쪽 대각선 아래로 이동
  [1, 0], // 아래로 이동
  [1, -1], // 왼쪽 대각선 아래로 이동
];
const visited = Array.from({ length: N }, () => Array(N).fill(false));

for (let i = 1; i <= N; i++) {
  board.push(input[i].split(''));
}

function dfs(currentX, currentY, count, directionIndex) {
  // 이긴 사람 찾으면 플레이어 이름 반환
  if (count === 3) return board[currentX][currentY];
  // 승자 초깃값은 ongoing
  let winner = 'ongoing';

  const nextX = currentX + directions[directionIndex][0];
  const nextY = currentY + directions[directionIndex][1];
  // 다음 좌표로 이동할 수 있으면 이동
  if (
    nextX >= 0 &&
    nextX < N &&
    nextY >= 0 &&
    nextY < N &&
    !visited[nextX][nextY] &&
    board[currentX][currentY] === board[nextX][nextY]
  ) {
    // 다음 좌표 방문 표시
    visited[nextX][nextY] = true;
    winner = dfs(nextX, nextY, count + 1, directionIndex);
    // 다음 좌표 방문 표시 false로 변경
    // 만일, 이번 경로에서 승리자를 찾지 못했다면 다음 경로 탐색 때 해당 좌표를 방문할 수 있어야 하기 때문
    visited[nextX][nextY] = false;
  }

  return winner;
}

function solution(N) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 한 방향으로만 이동해야 하기 때문에 directions 인덱스를 넘김
      for (let z = 0; z < directions.length; z++) {
        const winner = dfs(i, j, 1, z);
        // 승리자가 있고 .이 아닐 경우에만 반환
        if (winner !== 'ongoing' && winner !== '.') {
          return winner;
        }
      }
    }
  }
  // 반복문을 다 돌아도 승리한 사람이 없다면 ongoing 반환
  return 'ongoing';
}

console.log(solution(N));
