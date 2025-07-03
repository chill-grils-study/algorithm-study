const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// 현재 칸과 맞닿아 있는 바다 칸의 개수 구하기
const getOceanCount = (x, y) => {
  let count = 0;

  for (const direction of directions) {
    const nextX = x + direction[0];
    const nextY = y + direction[1];

    if (ices[nextX][nextY] === 0) {
      count++;
    }
  }

  return count;
};

// 현재 칸과 연결되어 있는 빙산 칸들을 순회하며 방문 표시
const bfs = (x, y, visited) => {
  const queue = [[x, y]];

  visited[x][y] = true;

  while (queue.length > 0) {
    const [currentX, currentY] = queue.shift();

    for (const direction of directions) {
      const nextX = currentX + direction[0];
      const nextY = currentY + direction[1];

      if (ices[nextX][nextY] > 0 && !visited[nextX][nextY]) {
        queue.push([nextX, nextY]);
        visited[nextX][nextY] = true;
      }
    }
  }

  return;
};

const solution = () => {
  let year = 0;
  // 빙산이 다 녹거나 덩어리가 두개 이상으로 분류될 때까지 반복
  while (true) {
    const queue = [];
    let areaCount = 0;

    for (let i = 1; i < N - 1; i++) {
      for (let j = 1; j < M - 1; j++) {
        if (ices[i][j] > 0) {
          // 현재 칸과 맞닿아 있는 바다 칸 개수 구함
          const oceanCount = getOceanCount(i, j);
          // 큐에 저장
          // (여기서 바로 현재 칸의 빙하를 녹이면 다음 칸 탐색할 때 영향을 끼치므로 큐에 저장해두고 한번에 확인)
          queue.push([i, j, oceanCount]);
        }
      }
    }
    // 빙하 녹임
    while (queue.length > 0) {
      const [currentX, currentY, currentCount] = queue.shift();
      ices[currentX][currentY] -= Math.min(
        currentCount,
        ices[currentX][currentY]
      );
    }

    const visited = Array.from({ length: N }, () => Array(M).fill(false));
    // 빙하 덩어리의 개수 구함
    for (let i = 1; i < N - 1; i++) {
      for (let j = 1; j < M - 1; j++) {
        if (ices[i][j] > 0 && !visited[i][j]) {
          bfs(i, j, visited);
          areaCount++;
        }
      }
    }
    // 시간 증가
    year++;
    // 빙하가 모두 녹았다면 0 반환
    if (areaCount === 0) {
      return 0;
    } else if (areaCount >= 2) {
      // 덩어리가 두개 이상이면 시간 반환
      return year;
    }
  }
};
