function solution(N, M, map) {
  const dp = Array.from({length: N}, () => Array(M).fill(Infinity));
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const visited = Array.from({length: N}, () => Array(M).fill(false));
  const queue = [[0, 0, 1]];
  
  dp[0][0] = 1;
  visited[0][0] = true;

  while(queue.length > 0) {
    const [cx, cy, cc] = queue.shift();

    for(const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;

      if(nx < 0 || nx >= N || ny < 0 || ny >= M || map[nx][ny] === '0' || visited[nx][ny]) {
        continue;
      }

      dp[nx][ny] = Math.min(dp[nx][ny], cc + 1);
      queue.push([nx, ny, dp[nx][ny]]);
      visited[nx][ny] = true;
    }
  }

  console.log(dp[N - 1][M - 1]);
}
