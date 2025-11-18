// 층수가 다른 건물의 개수가 곧 정답
function solution(건물들) {
  const stack = [];
  let count = 0;

  for (const [_, y] of 건물들) {
    // y > 0을 확인하는 이유
    // 스택이 비어있는데 0을 넣으면 건물 개수가 잘못 카운팅되니까
    if ((stack.length === 0 && y > 0) || stack[stack.length - 1] < y) {
      count++;
      stack.push(y);
      continue;
    }
    while (stack[stack.length - 1] > y) {
      stack.pop();
    }

    if (
      (stack.length > 0 && stack[stack.length - 1] !== y) ||
      (stack.length === 0 && y > 0)
    ) {
      stack.push(y);
      count++;
    }
  }

  console.log(count);
}
