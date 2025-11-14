// 정말 슬프다...
// 이렇게 멋지게 풀어보려고 했지만 .. 장렬하게 틀렸음..
// 아니 그 테케 검증하는 사이트에서 반례 1개만 틀리길래 희망을 가지고 으쌰으쌰 고쳐보려고 했는데
// 도저히 안되는거임.. 그래서 다른 사람들 풀이 보니까 LIS였음..
// 그리디로도 풀이는 가능하지만 코드가 더 복잡해짐...
function solution(N, 전깃줄들) {
  const graph = Array.from({ length: N }, () => Array(N).fill(false));
  const 합선개수 = Array(N).fill(0);
  let 최고합선 = 0,
    최고합선인덱스 = 0;
  let result = 0;

  전깃줄들.sort((a, b) => a.start - b.start);

  for (let i = 0; i < N - 1; i++) {
    const 첫번째전깃줄 = 전깃줄들[i];
    for (let j = i + 1; j < N; j++) {
      const 두번째전깃줄 = 전깃줄들[j];
      if (
        첫번째전깃줄.start <= 두번째전깃줄.start &&
        첫번째전깃줄.end >= 두번째전깃줄.end
      ) {
        graph[i][j] = true;
        graph[j][i] = true;
        합선개수[i]++;
        합선개수[j]++;
      }
    }
  }

  while (true) {
    합선개수.forEach((num, index) => {
      if (num > 최고합선) {
        최고합선 = num;
        최고합선인덱스 = index;
      } else if (num === 최고합선) {
        if (
          Math.abs(전깃줄들[index].start - 전깃줄들[index].end) >
          Math.abs(
            전깃줄들[최고합선인덱스].start - 전깃줄들[최고합선인덱스].end
          )
        ) {
          최고합선 = num;
          최고합선인덱스 = index;
        }
      }
    });

    if (최고합선 === 0) {
      break;
    }

    합선개수[최고합선인덱스] = 0;

    for (let i = 0; i < N; i++) {
      if (graph[최고합선인덱스][i]) {
        graph[i][최고합선인덱스] = false;
        합선개수[i]--;
      }
    }

    result++;
    최고합선 = 0;
  }

  console.log(result);
}

// LIS...
function solution(N, 전깃줄들) {
  const dp = Array(N).fill(1);
  // 시작점을 기준으로 정렬
  전깃줄들.sort((a, b) => a.start - b.start);
  // 최장 증가 수열의 길이를 구한다.
  for (let i = 1; i < N; i++) {
    for (let j = 0; j <= i; j++) {
      if (전깃줄들[i].end > 전깃줄들[j].end) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }
  // 전체 길이에서 증가 수열 길이를 뺌
  // 감소했던 부분들은 선이 꼬였다는 뜻이기 때문
  console.log(N - Math.max(...dp));
}
