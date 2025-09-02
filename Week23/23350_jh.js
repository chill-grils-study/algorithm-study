// 틀린 풀이예여...
// 배열 조작하기 싫어서 인덱스로 어떻게든 풀어보려고 했어요..
// 정말 미련했다...ㅠㅠ...조건이 작아서 실버였던 것 같은데..흑흑...
const fs = require('fs');
const input = fs.readFileSync('./run/input.txt').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map((item) => +item);
const containers = [];
const priorityCount = Array(M).fill(0);

for (let i = 1; i <= N; i++) {
  const [priority, weight] = input[i].split(' ').map((item) => +item);
  containers.push([priority, weight]);
  priorityCount[priority - 1]++;
}

function solution(N, M, containers, priorityCount) {
  const stack = [];
  const stackWeight = Array(M).fill(0);
  let currentPriority = M,
    railFrontIndex = 0;
  let amountTotal = 0;

  while (containers.length > 0) {
    const [frontPriority, frontWeight] = containers[railFrontIndex];

    if (currentPriority > frontPriority) {
      railFrontIndex = (railFrontIndex + 1) % containers.length;
      amountTotal += frontWeight;
    } else if (currentPriority === frontPriority) {
      const stackTop = stack.at(-1);

      if (stackTop && stackTop[0] > frontPriority) {
        stack.push([frontPriority, frontWeight]);
        amountTotal += frontWeight;
        stackWeight[frontPriority - 1] += frontWeight;
      } else if (stackTop && stackTop[1] < frontWeight) {
        amountTotal += stackWeight[frontPriority - 1] * 2 + frontWeight;
        stackWeight[frontPriority - 1] += frontWeight;
        stack.unshift([frontPriority, frontWeight]);
      } else {
        stack.push([frontPriority, frontWeight]);
        amountTotal += frontWeight;
        stackWeight[frontPriority - 1] += frontWeight;
      }

      containers.splice(railFrontIndex, 1);
      priorityCount[frontPriority - 1]--;

      stackWeight[frontPriority - 1] += frontWeight;

      railFrontIndex = railFrontIndex % containers.length;
    } else {
      stack.push([frontPriority, frontWeight]);
      stackWeight[frontPriority - 1] += frontWeight;
      containers.splice(railFrontIndex, 1);

      stackWeight[frontPriority - 1] += frontWeight;
      amountTotal += frontWeight;
      priorityCount[frontPriority - 1]--;
      railFrontIndex = railFrontIndex % containers.length;
    }

    if (priorityCount[currentPriority - 1] === 0) {
      currentPriority--;
    }

    console.log(amountTotal, stack, containers);
  }

  console.log(amountTotal);
}

// 정답 풀이
// 배열 조작하도록 바꿨어요. 배열 쓰게 되면 그냥 문제 조건대로 처리하면 되서 금방 짰습니다..
// (진즉에 이렇게 할걸 ㅠ)
function solution(N, M, priorityCount, containers) {
  // 컨테이너 재정렬하기 전에 잠깐 넣어두는 배열
  const remainStack = [];
  // 컨테이너 쌓아두는 배열
  const saveStack = [];
  // 레일
  const rail = [...containers];
  // 현재 우선순위 -> M-1로 시작해서 점점 작아짐
  let currentPriority = M - 1;
  let amountTotal = 0;

  while (rail.length > 0) {
    // 일단 레일에서 첫번째 컨테이너 뺌
    const [frontPriority, frontWeight] = rail.shift();
    // 아직 현재 컨테이너를 쌓아둘 때가 아니라면
    if (currentPriority > frontPriority) {
      // 레일 맨 뒤에 넣음
      rail.push([frontPriority, frontWeight]);
      amountTotal += frontWeight;
      continue;
    } // 현재 우선순위가 컨테이너의 우선순위와 같다면
    if (currentPriority === frontPriority) {
      // 적재된 컨테이너들 중 현재 컨테이너보다 가벼운게 있다면
      while (
        saveStack.length > 0 &&
        saveStack.at(-1)[0] === frontPriority &&
        saveStack.at(-1)[1] < frontWeight
      ) { // 컨테이너 옮김
        const top = saveStack.pop();
        remainStack.push(top);
        amountTotal += top[1];
      }
      // 현재 컨테이너 넣어주고
      saveStack.push([frontPriority, frontWeight]);
      amountTotal += frontWeight;
      // 옮겨둔 컨테이너 다시 옮김
      while (remainStack.length > 0) {
        const top = remainStack.pop();
        saveStack.push(top);
        amountTotal += top[1];
      }
    } else {
      saveStack.push([frontPriority, frontWeight]);
      amountTotal += frontWeight;
    }

    priorityCount[currentPriority]--;

    if (priorityCount[currentPriority] === 0) {
      currentPriority--;
    }
  }

  console.log(amountTotal);
}