// 처음에는 유니온 파인드인 줄 알았는데
// 깊이를 구하는 문제라 bfs로 풀었삼 ㅋ
// 조상이 같은지 물어보는 문제였으면 유니온 파인드로 풀어야 했을듯
function bfs(N, start, end, relationships) {
  const visited = Array(N + 1).fill(false);
  const queue = [[start, 0]];
  let count = -1;

  while (queue.length > 0) {
    const [currentNum, currentCount] = queue.shift();

    if (currentNum === end) {
      count = currentCount;
      break;
    }

    for (const nextNum of relationships[currentNum]) {
      if (visited[nextNum]) continue;

      visited[nextNum] = true;
      queue.push([nextNum, currentCount + 1]);
    }
  }

  return count;
}

function solution(N, start, end, arr) {
  const relationships = Array.from({ length: N + 1 }, () => []);

  arr.forEach(([parent, child]) => {
    relationships[parent].push(child);
    relationships[child].push(parent);
  });

  return bfs(N, start, end, relationships);
}
