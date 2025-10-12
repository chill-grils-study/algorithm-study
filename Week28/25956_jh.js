// 스택을 쓰면 쉽게 푸는건데... 이걸 생각을 못했슨..ㅎㅎ
function solution(N, nums) {
  const count = Array(N).fill(0);
  const stack = [];

  for (let i = N - 1; i >= 0; i--) {
    const curNum = nums[i];
    let cnt = 0;

    // 기냥 무식허게~ 다 빼버렷
    while (stack.at(-1) > curNum) {
      if (stack.at(-1) - curNum !== 1) {
        console.log(-1);
        return;
      }
      stack.pop();
      cnt++;
    }
    count[i] = cnt;

    stack.push(curNum);
  }

  // 목차 올바른지 한번 더 확인
  // 1이 아닌 다른 숫자가 남았다면 올바르지 않은 목차
  // 4 2 3 1 2 3 => 4 1이 남겠죠?
  while (stack.length > 0) {
    const top = stack.pop();
    if (top !== 1) {
      console.log(-1);
      return;
    }
  }

  // 시간 초과
  // for (const item of count) {
  //   console.log(item);
  // }

  console.log(count.join('\n'));
}
