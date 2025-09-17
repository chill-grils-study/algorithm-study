// 첫 풀이~
// 아무 생각 없이.. dfs 재귀 돌렸다가
// 시간초과가 났구요...?ㅎㅎ
function solution(graphs) {
  const N = graphs.length;
  const directions = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];
  const minCosts = Array(N).fill(Infinity);

  function dfs(graphIndex, current, visited) {
    const row = graphs[graphIndex].length;
    const [cx, cy, cc] = current;

    if (cx === row - 1 && cy === 1) {
      minCosts[graphIndex] = Math.min(minCosts[graphIndex], cc);
      return;
    }

    for (const direction of directions) {
      const nx = cx + direction[0];
      const ny = cy + direction[1];

      if (nx < 0 || nx >= row || ny < 0 || ny >= COLUMN || visited[nx][ny]) {
        continue;
      }

      visited[nx][ny] = true;
      dfs(graphIndex, [nx, ny, cc + graphs[graphIndex][nx][ny]], visited);
      visited[nx][ny] = false;
    }
  }

  for (let i = 0; i < N; i++) {
    const visited = Array.from({ length: graphs[i].length }, () =>
      Array(COLUMN).fill(false)
    );
    visited[0][1] = true;
    dfs(i, [0, 1, graphs[i][0][1]], visited);

    console.log(`${i + 1}. ${minCosts[i]}`);
  }
}

// 문제 유형이 dp인걸 보고서.. 하앗.. 눈물이 났어요
// 그래.. dp면 ㅣ... 정말 쉽게 풀 수 있잖아..? 하며 풀었읍니다.
function solution(graphs) {
  const N = graphs.length;

  for (let i = 0; i < N; i++) {
    const graph = graphs[i];
    const dp = Array.from({ length: graph.length }, () => Array(3).fill(0));
    const rows = graph.length;

    dp[0][0] = graph[0][0];
    dp[0][1] = graph[0][1];
    dp[0][2] = graph[0][1] + graph[0][2];

    for (let x = 1; x < rows; x++) {
      // (0, 0) 출발을 제외하기 위해
      if (x === 1) {
        dp[x][0] = graph[x][0] + dp[x - 1][1];
        dp[x][1] = graph[x][1] + Math.min(dp[x - 1][1], dp[x - 1][2], dp[x][0]);
      } else {
        dp[x][0] = graph[x][0] + Math.min(dp[x - 1][0], dp[x - 1][1]);
        dp[x][1] =
          graph[x][1] +
          Math.min(dp[x - 1][0], dp[x - 1][1], dp[x - 1][2], dp[x][0]);
      }

      dp[x][2] = graph[x][2] + Math.min(dp[x - 1][1], dp[x - 1][2], dp[x][1]);
    }
    console.log(`${i + 1}. ${dp[rows - 1][1]}`);
  }
}
