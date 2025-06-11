// 진짜 오랜만에 한번에 통과한 문제 ㅠㅠ
function solution(P, melodies) {
  // 각 줄의 프랫 정보를 이차원 배열로 관리
  const stacks = Array.from({ length: 7 }, () => []);
  let count = 0;

  melodies.forEach(([줄, 프렛]) => {
    const stack = stacks[줄];

    // 스택의 최상단에 있는 프랫이 현재 프랫보다 크다면 해당 프랫 제거
    while (stack.length > 0 && stack[stack.length - 1] > 프렛) {
      stack.pop();
      count++; // 손가락 뗀거니까 횟수 증가
    }

    // 스택의 최상단에 있는 프랫이 현재 프랫과 다를 때만 스택에 푸시
    if (stack[stack.length - 1] !== 프렛) {
      stack.push(프렛);
      count++; // 손가락 누른거니까 횟수 증가
    }
  });

  console.log(count);
}
