// 처음 풀이, dfs 재귀로 탐색 => 시간초과
const solution1 = (N, board) => {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  let result = 0;

  const dfs = (x, y) => {
    // 마지막 칸에 도달하면 경로 개수 1 증가
    if (x === N - 1 && y === N - 1) {
      result++;
      return;
    }
    // 현재 칸에서 갈 수 있는 거리
    const distance = board[x][y];
    const rightX = x;
    const bottomX = x + distance;
    const rightY = y + distance;
    const bottomY = y;

    // 오른쪽으로 이동
    if (
      rightX >= 0 &&
      rightX < N &&
      rightY >= 0 &&
      rightY < N &&
      !visited[rightX][rightY]
    ) {
      visited[rightX][rightY] = true;
      dfs(rightX, rightY);
      // 재방문이 가능해야 하기 때문에 dfs 리턴되면 방문 표시 변경
      visited[rightX][rightY] = false;
    }
    // 아래로 이동
    if (
      bottomX >= 0 &&
      bottomX < N &&
      bottomY >= 0 &&
      bottomY < N &&
      !visited[bottomX][bottomY]
    ) {
      visited[bottomX][bottomY] = true;
      dfs(bottomX, bottomY);
      visited[bottomX][bottomY] = false;
    }
  };

  dfs(0, 0);

  return result;
};

// dp로 풀이
const solution = (N, board) => {
  // 경로의 개수가 2^63-1보다 작거나 같다고 했기 때문에 BigInt 사용
  const dp = Array.from({ length: N }, () => Array(N).fill(BigInt(0)));

  dp[0][0] = BigInt(1);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const distance = board[i][j];
      const nextX = i + distance;
      const nextY = j + distance;
      // 현재 칸에서 갈 수 있는 거리가 0이면 다른 칸을 탐색
      if (distance === 0) continue;
      // 아래로 이동할 수 있으면 dp 값 갱신
      if (nextX < N) {
        dp[nextX][j] += dp[i][j];
      }
      // 오른쪽으로 이동할 수 있으면 dp 값 갱신
      if (nextY < N) {
        dp[i][nextY] += dp[i][j];
      }
    }
  }
  // BigInt 변수를 문자열로 변경해서 반환
  return dp[N - 1][N - 1].toString();
};
