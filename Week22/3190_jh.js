function solution(N, apples, move) {
  // map을 만드는데 초기값은 X
  const map = Array.from({ length: N }, () => Array(N).fill('X'));
  // 위 오 아 왼
  const direction = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  // 뱀이 있는 좌표들을 저장
  const routes = [[0, 0]];
  let curTime = 0,
    curDirIndex = 1;

  map[0][0] = 'B';

  apples.map(([ax, ay]) => {
    map[ax - 1][ay - 1] = 'A';
  });

  while (true) {
    const [cx, cy] = routes.at(-1);
    const nx = cx + direction[curDirIndex][0];
    const ny = cy + direction[curDirIndex][1];
    // 맵을 벗어나서 벽에 부딪히거나 몸에 부딪히면 종료
    if (nx < 0 || nx >= N || ny < 0 || ny >= N || map[nx][ny] === 'B') {
      break;
    }

    if (map[nx][ny] !== 'A') {
      const [tx, ty] = routes.shift();
      // 꼬리 이동
      map[tx][ty] = 'X';
    }

    map[nx][ny] = 'B';
    routes.push([nx, ny]);
    curTime++;
    // 방향 틀어주기
    if (move.length > 0 && move[0][0] === curTime) {
      const [, direction] = move.shift();

      curDirIndex = (curDirIndex + 4 + direction) % 4;
    }
  }

  console.log(curTime + 1);
}
