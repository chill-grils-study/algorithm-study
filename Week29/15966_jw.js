//군계일학
//dp
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')


let idx=0;

const N = Number(input[idx++]);

const arr = input[idx++].split(" ").map(Number);
//자신앞에 dp max값 +1

const dp = Array(N).fill(1);
let cnt =1; //초기값 1

for(let i=0;i<N;i++){
    for(let j=0;j<i;j++){
        if(arr[j]<arr[i]&&arr[j]+1===arr[i]){
            dp[i]=Math.max(dp[i],dp[j]+1);
            cnt=Math.max(dp[i],cnt);
        }
    }
}

console.log(cnt);