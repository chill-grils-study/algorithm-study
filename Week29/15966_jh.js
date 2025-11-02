// 풀 땐 dp가 아니라고 생각했는데 풀고 보니까 너무나도 dp...
function solution(N, arr) {
  const maxNum = Math.max(...arr);
  const info = Array(maxNum + 1).fill(0);
  let maxLength = 1;

  for (let i = 0; i < N; i++) {
    const num = arr[i];
    info[num] = info[num - 1] + 1;
    maxLength = Math.max(maxLength, info[num]);
  }

  return maxLength;
}
