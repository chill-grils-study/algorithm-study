// 보드판, 그래프니까 그래프 탐색 알고리즘 BFS!
// 뱀/사다리 있는 칸 도착하면 무조건 땨라서 올라가거나 내려가야됨
function solution(ladders, snakes) {
  const map = Array(101).fill(0);
  const visited = Array(101).fill(false);
  const queue = [[1, 0]];
  let answer = 0;

  visited[1] = true;

  for (const [start, end] of ladders) {
    map[start] = end;
  }

  for (const [start, end] of snakes) {
    map[start] = end;
  }

  while (queue.length > 0) {
    const [curPos, curDist] = queue.shift();
    if (curPos === 100) {
      answer = curDist;
      break;
    }

    for (let i = 1; i <= 6; i++) {
      let nextPos = curPos + i;

      if (nextPos > 100) continue;

      if (map[nextPos] > 0) {
        nextPos = map[nextPos];
      }

      if (!visited[nextPos]) {
        visited[nextPos] = true;
        queue.push([nextPos, curDist + 1]);
      }
    }
  }

  console.log(answer);
}
