// 스근~~~하게 bfs로 슥 풀었습니다
function bfs(startPosition, visited) {
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const queue = [startPosition];
  let count = 1;

  while (queue.length > 0) {
    const [currentX, currentY] = queue.shift();

    for (const direction of directions) {
      const nextX = currentX + direction[0];
      const nextY = currentY + direction[1];

      if (
        nextX < 0 ||
        nextX >= N ||
        nextY < 0 ||
        nextY >= N ||
        visited[nextX][nextY] ||
        map[nextX][nextY] === 0
      ) {
        continue;
      }

      queue.push([nextX, nextY]);
      visited[nextX][nextY] = true;
      count++;
    }
  }

  return count;
}

function solution(N, map) {
  const counts = [];
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  let totalCount = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j] && map[i][j] === 1) {
        visited[i][j] = true;
        counts.push(bfs([i, j], visited));
        totalCount++;
      }
    }
  }

  // 처음에 오름차순 안 하고 제출해서 틀렸음,,ㅎ 문제 조건을 잘 읽자!
  counts.sort((a, b) => a - b);

  console.log(totalCount);
  console.log(counts.join("\n"));
}
