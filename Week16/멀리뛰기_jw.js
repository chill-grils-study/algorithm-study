// 한번에 1칸, 또는 2칸
//dp
function solution(n) {
    var answer = 0;
    // 1 -> 1
    // 2 -> 1/1, 2 ->2
    // 3 -> 1/1/1, 2/1, 1/2 ->3   //dp[1] + 2칸 , dp[2] + 1칸
    // 4 -> 1/1/1/1 , 2/1/1, 1/2/1, (dp[3]+1칸) 1/1/2, 2/2 dp[2]+2칸

    const dp = [];
    dp[1] = 1;
    dp[2] = 2;

    if(n===1||n===2) return n;

    for(let i=3;i<=n;i++){
        dp[i] = (dp[i-1]+dp[i-2])%1234567;
    }
    return dp[n];
}



console.log(solution(4)) //5
console.log(solution(3)) //3