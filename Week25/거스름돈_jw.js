//dp
function solution(n, money) {
    const dp = Array(n + 1).fill(0);
    
    dp[0] = 1; 
    
    // 중복때문에 미리 반영
    for (let i = 0; i < money.length; i++) {
        const coin = money[i];
        
        // 현재 동전으로 만들 수 있는 금액(coin)부터 목표 금액(n)까지 갱신
        for (let j = coin; j <= n; j++) {
            dp[j] = (dp[j] + dp[j - coin]) % 1000000007;
        }
    }
    
    return dp[n];
}
// function solution(n, money) {
//     var answer = 0;
//     money.sort();
//     const max = money[money.length-1]
//     const coin = Array(max+1).fill(0)
//     const dp = Array(n+1).fill(0);
//     for(let i=0;i<money.length;i++){
//         coin[money[i]] = 1;
//         dp[money[i]]=1;
//     }
//     console.log(coin)
//     for(let i=1;i<=n;i++){
//         let total = 0;
//         for(let j=i-1;j>=0;j--){
//             total+=dp[j]+coin[n-j];
//         }
//         dp[i]=total;
//         console.log(`${i}: ${dp[i]}`)
//     }
    
//     return dp[n];
// }
console.log(solution(5,[1,2,5]));
//n=5 money=[1,2,5]
//n=1 1 money[1] 있음
//n=2 1+1, money[2] 있음 //dp[1]+1(2)
//n=3 1+1+1,2+1 money[3]없음 //dp[2]
//n=4 dp[3]+dp[2] 
//(dp[3]+coin[n-3]) + (dp[2]+coin[n-2]) +(dp[1]+coin[n-1])+coin[n]