//동전2

const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')

let idx=0;
const [n,k] = input[idx++].split(" ").map(Number);

const dp = new Array(10001).fill(Infinity)

for(let i=0;i<n;i++){
    const num= Number(input[idx++]);
    dp[num]=1;
}

// dp[1]=1;
// dp[2]=dp[1]+dp[1];
// dp[3]=min(dp[0]+dp[3], dp[1]+dp[2]);
// dp[4]=min(dp[0]+dp[4], dp[1]+dp[3],dp[2]+dp[2]);
// dp[5]=min(dp[0]+dp[5]....);

dp[0]=0;
for(let i=1;i<=10000;i++){
    let min = Infinity;
    for(let j=0;j<i;j++){
        min=Math.min(min,dp[j]+dp[i-j]);
    }
    dp[i]=min;
}

console.log(dp[k]===Infinity?-1:dp[k]);

