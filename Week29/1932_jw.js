//정수 삼각형 dp? dfs?
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(path, "utf8").trim().split(/\r?\n/);

let index=0;
const N = Number(input[index++]);
const arr = Array.from({length:N},()=>Array(N));

for(let i=0;i<N;i++){
    arr[i] = input[index++].split(" ").map(Number)
}

const dp = Array.from({length:N},()=>Array(N));
// console.log(arr)

dp[0][0]=arr[0][0];
//dp[1]=dp[0]+Math.max(대각선 왼/오) arr[1][0],arr[1][1]  //10 15
//dp[2]=dp[1][0]+Math.max(대각선 왼/오) dp[1][1]+대각선/왼/오
//양쪽 끝 ->바로 위숫자+arr[자기자신]
//가운데 -> 자기 대각선 왼/오 max+ar[자기자신]
for(let i=1;i<N;i++){ //i번째 행 =>i개
    for(let j=0;j<N;j++){
        if(!arr[i][j]&&arr[i][j]!==0) continue;
        //양쪽끝 index
        if(j===0){
            dp[i][j]=dp[i-1][j]+arr[i][j];
        }else if(j===i){
            dp[i][j]=dp[i-1][j-1]+arr[i][j]
        }else{
            dp[i][j] = Math.max(dp[i-1][j-1],dp[i-1][j])+arr[i][j]
        }
    }
}
console.log(Math.max(...dp[N-1]))