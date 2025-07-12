//2631:줄세우기
//전체에서 이미 정렬된 상태로 유지 가능한 부분 수열을 찾기(LIS)
//N-LIS (몇번이 아니고 몇명 움직이는지가 답)
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const N = Number(input[0]);
const arr = [];

for(let i=1;i<=N;i++){
 arr.push(Number(input[i]))
}

//LIS 찾기
//DP로
const dp = Array.from({length:N}).fill(1);
for(let i=1;i<N;i++){ //3 7 5 2 6 1 4
  for(let j=0;j<i;j++){ //자신보다 앞 index 탐색해서 값이 자신보다 작으면 증가수열 가능하므로 +1
    if(arr[j]<arr[i]){
      dp[i]=Math.max(dp[j]+1,dp[i]); //앞에서 이미 업데이트 한 값이 더 클 경우 그 값으로 유지
    }
  }
}
const max = Math.max(...dp)
console.log(N-max)