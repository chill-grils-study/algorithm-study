const solution = (N) => {
  const columns = Array(N).fill(false);
  const leftDiagonals = Array(N * 2 - 1);
  // N = 4
  // |0|1|2|3|
  // |1|2|3|4|
  // |2|3|4|5|
  // |3|4|5|6|
  const rightDiagonals = Array(N * 2 - 1);
  // N = 4
  // |3|2|1|0|
  // |4|3|2|1|
  // |5|4|3|2|
  // |6|5|4|3|
  let count = 0;
  // 한 행씩 내려가면서 검사
  const backtracking = (row) => {
    // 각 행에 퀸을 하나씩 다 놓았으면 리턴
    if (row === N) {
      count++;
      return;
    }
    // 열을 순회하며 퀸 놓을 수 있는지 확인
    for (let column = 0; column < N; column++) {
      const leftDiagonal = row + column;
      const rightDiagonal = row - column + (N - 1);
      // 현재 열과 대각선에 다른 퀸이 없으면
      if (
        !columns[column] &&
        !leftDiagonals[leftDiagonal] &&
        !rightDiagonals[rightDiagonal]
      ) {
        // 퀸 놓음
        columns[column] = true;
        leftDiagonals[leftDiagonal] = true;
        rightDiagonals[rightDiagonal] = true;
        // 다음 퀸 놓으러 감
        backtracking(row + 1);
        // 이전에 놓은 퀸 회수
        columns[column] = false;
        leftDiagonals[leftDiagonal] = false;
        rightDiagonals[rightDiagonal] = false;
      }
    }
  };

  backtracking(0);

  return count;
};
