// ㅎㅎ 완탐으로,, 무식하게 풀어보려고 함 ,,, 시간초과
function solution(N, nums) {
  let resArr = [];

  const 완전탐색 = (curIndex, curArr, curNums) => {
    const copiedNums = [...curNums];
    copiedNums.sort((a, b) => a - b);

    if (
      curArr.join('') === copiedNums.join('') &&
      resArr.length < copiedNums.length
    ) {
      resArr = copiedNums;
    }

    for (let i = curIndex; i < N; i++) {
      완전탐색(i + 1, [...curArr, i + 1], [...curNums, nums[i]]);
    }
  };

  완전탐색(0, [], []);

  console.log(resArr.length);
  for (const num of resArr) {
    console.log(num);
  }
}

// 지피티한테 힌트를 받아버리고야 말았습니다...^^ㅠ
// 돌고 돌아 시작점으로 오면 집합이 일치하는 것..!!
const dfs = (start, nums) => {
  const 경로 = [start];
  const queue = [start];
  const visited = Array(N + 1).fill(false);
  let isCorrect = false;

  visited[start] = true;

  while (queue.length > 0) {
    const curNum = queue.pop();
    const nextNum = nums[curNum - 1];

    if (!visited[nextNum]) {
      경로.push(nextNum);
      queue.push(nextNum);
      visited[nextNum] = true;
    }
    if (nextNum === start) {
      isCorrect = true;
      break;
    }
  }

  return isCorrect ? 경로 : [];
};

function solution(N, nums) {
  const result = [];

  for (let i = 1; i <= N; i++) {
    if (result.indexOf(i) < 0) {
      result.push(...dfs(i, nums));
    }
  }

  result.sort((a, b) => a - b);

  console.log(result.length);
  for (const num of result) {
    console.log(num);
  }
}
