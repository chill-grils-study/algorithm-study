// 좀 생각해보다가,, 이건...무조건 공식이 있을 것 같아서
// 구글링해버렸어요,,,ㅎ
// 신발끈 공식을 이용해서 풀면 되더라구용

// 신발끈 공식
// x: 0 3 4
// y: 1 2 4
// => 1/2(|(0 * 2 + 3 * 4 + 4 * 1) - (1 * 3 + 2 * 4 + 4 * 0)|)
function solution(N, points) {
  let firstTotal = 0,
    secondTotal = 0;

  for (let i = 0; i < N; i++) {
    const [x1, y1] = points[i];
    // 마지막 원소와 첫번째 원소를 같이 계산할 때를 위해
    const [x2, y2] = points[(i + 1) % N];

    firstTotal += x1 * y2;
    secondTotal += x2 * y1;
  }

  return (Math.abs(firstTotal - secondTotal) / 2).toFixed(1);
}
