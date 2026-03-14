function solution(N) {
  const stars = Array.from({ length: N }, () => Array(N).fill(' '));
  let cur = 3,
    prev = 1;

  stars[0][0] = '*';

  while (cur <= N) {
    for (let i = 0; i < cur; i++) {
      for (let j = 0; j < cur; j++) {
        if (i <= prev - 1 && j <= prev - 1) {
          continue;
        }
        if (prev <= i && i < prev * 2 && prev <= j && j < prev * 2) {
          continue;
        }
        stars[i][j] = stars[i % prev][j % prev];
      }
    }

    prev = cur;
    cur *= 3;
  }
  for (let i = 0; i < N; i++) {
    let line = '';
    for (let j = 0; j < N; j++) {
      line += stars[i][j];
    }
    console.log(line);
  }
}
