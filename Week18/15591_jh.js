function solution(graph, queries) {
  const bfs = (k, v) => {
    const visited = Array(N + 1).fill(false);
    const queue = [v];
    visited[v] = true;
    let count = 0;

    while (queue.length > 0) {
      const cur = queue.shift();
      for (const [next, usado] of graph[cur]) {
        // 연결되지 않은 1 -> 3으로 갈 때
        // 중간에 가중치가 k보다 작은 구간이 있다면
        // 1 -> 3의 유사도는 k보다 작을 것
        // => 제시된 질의에 해당하지 않음
        if (!visited[next] && usado >= k) {
          visited[next] = true;
          count++;
          queue.push(next);
        }
      }
    }

    return count;
  };

  for (const [k, v] of queries) {
    console.log(bfs(k, v));
  }
}
