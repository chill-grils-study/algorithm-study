const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';

const input = fs.readFileSync(path, 'utf-8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

const containers = input.slice(1, N + 1).map(line => {
  const [priority, weight] = line.split(' ').map(Number);
  return { priority, weight };
});

let answer = 0;
const space = []; // 적재 스택
const spare = []; // 임시 보관 스택

let currentPriority = M; // 낮은 우선순위부터 처리
while (containers.length > 0) {
  const currentContainer = containers.shift();

  if (currentContainer.priority === currentPriority) {
    // 같은 우선순위에서만 무게 정렬(무거운 게 아래)
    while (
      space.length > 0 &&
      space.at(-1).priority === currentPriority &&
      space.at(-1).weight < currentContainer.weight
    ) {
      const light = space.pop();
      answer += light.weight;   // 꺼낼 때 비용
      spare.push(light);        // 임시로 빼둠 (스택)
    }

    // 현재 컨테이너 적재
    answer += currentContainer.weight;
    space.push(currentContainer);

    // 방금 뺀 가벼운 컨테이너들 다시 적재 (원래 순서 유지되도록 pop)
    while (spare.length > 0) {
      const back = spare.pop(); // 가장 최근에 뺀 것부터 되돌림
      answer += back.weight;    // 다시 적재 비용
      space.push(back);
    }

    // 현재 우선순위가 레일에 더 남아있는지 확인
    if (!containers.some(c => c.priority === currentPriority)) {
      currentPriority--; // 더 높은 우선순위로
    }

  } else {
    // 아직 처리 차례가 아닌 높은 우선순위는 레일 맨뒤로
    answer += currentContainer.weight;
    containers.push(currentContainer);
  }
}

console.log(answer);
