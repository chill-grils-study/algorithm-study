// 일반적인 bfs 문제여서 bfs로 풀이
function bfs(queue, tomatoes) {
  const N = tomatoes.length;
  const M = tomatoes[0].length;
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let frontIndex = 0,
    day = 0;

  while (frontIndex < queue.length) {
    // 처음에는 인덱스로 접근하지 않고 shift 메서드를 사용했음
    // -> 시간초과 발생, shift는 배열 앞의 원소를 빼고 뒤의 원소들을 앞으로 한칸씩 이동시키기 때문에 시간복잡도가 O(n)
    // => 시간복잡도를 줄이기 위해 배열을 조작하지 않고 인덱스로 접근하도록 수정
    const [currentX, currentY, currentCount] = queue[frontIndex++];

    visited[currentX][currentY] = true;
    day = currentCount;

    for (const [x, y] of directions) {
      const nextX = currentX + x;
      const nextY = currentY + y;

      if (
        nextX < 0 ||
        nextX >= N ||
        nextY < 0 ||
        nextY >= M ||
        visited[nextX][nextY] ||
        tomatoes[nextX][nextY] !== 0
      ) {
        continue;
      }

      queue.push([nextX, nextY, currentCount + 1]);
      tomatoes[nextX][nextY] = 1;
    }
  }

  return day;
}

function solution(M, N, tomatoes) {
  const queue = [];

  // 토마토의 익힘은 동시에 퍼져나가기 때문에 토마토가 있는 위치를 모두 큐에 저장
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (tomatoes[i][j] === 1) {
        queue.push([i, j, 0]);
      }
    }
  }

  let day = bfs(queue, tomatoes);

  // 아직도 안 익은 토마토가 있는지 확인
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (tomatoes[i][j] === 0) {
        day = -1;
        break;
      }
    }

    if (day === -1) {
      break;
    }
  }

  return day;
}
