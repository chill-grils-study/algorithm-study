// 상당히 무식하게 풀었읍니다.. ^^
const getSum = (startX, startY, point, tetromino) => {
  const tetrominoN = tetromino.length;
  const tetrominoM = tetromino[0].length;
  let sum = 0;

  for (let i = startX; i < startX + tetrominoN; i++) {
    for (let j = startY; j < startY + tetrominoM; j++) {
      if (tetromino[i - startX][j - startY] === 1) {
        sum += point[i][j];
      }
    }
  }

  return sum;
};

const getMaxSum = (point, tetromino) => {
  const pointN = point.length;
  const pointM = point[0].length;
  const tetrominoN = tetromino.length;
  const tetrominoM = tetromino[0].length;
  let maxSum = 0;

  for (let i = 0; i <= pointN - tetrominoN; i++) {
    for (let j = 0; j <= pointM - tetrominoM; j++) {
      maxSum = Math.max(maxSum, getSum(i, j, point, tetromino));
    }
  }

  return maxSum;
};

function solution(N, M, point) {
  // 가능한 테트로미노를 모두 만듬
  const tetrominos = [
    [[1, 1, 1, 1]],
    [[1], [1], [1], [1]],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
  ];
  let result = 0;

  tetrominos.forEach((tetromino) => {
    result = Math.max(result, getMaxSum(point, tetromino));
  });

  console.log(result);
}
