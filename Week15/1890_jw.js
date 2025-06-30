//점프 -> dp문제 -> 78%에서 틀림(반례 미발견..)
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

let index = 0;
const N = Number(input[index++]);
const dp = Array.from({length:N},()=> Array(N).fill(0));

const arr = [];
for(let i = 0;i<N;i++){
  arr[i] = input[index++].split(" ").map(Number);
}

dp[0][0] = 1;

for(let x=0;x<N;x++){
  for(let y=0;y<N;y++){
    if(arr[x][y]===0) continue;

    const jump  = arr[x][y];

    if(x+jump<N){
      dp[x+jump][y] += dp[x][y];//갯수
    }
    if(y+jump<N){
      dp[x][y+jump] += dp[x][y];//갯수
    }
  }
}

console.log(dp[N-1][N-1]);