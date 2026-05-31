
console.log(solution(4,3,[[2, 2]]))
function solution(m, n, puddles) {
    const dp = Array.from({length:n},()=>Array(m).fill(0));
    const MAX= 1000000007;

    //오른쪽, 아래 dp 최단거리 아니고 갯수;;
    dp[0][0] = 1;

    //물 ->-1
    for(let p=0;p<puddles.length;p++){
        const [a,b] = puddles[p];
        dp[b-1][a-1]=-1;
    }
    // console.log(dp)

    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            let result = 0;
            if((i===0&&j===0||dp[i][j]===-1)) continue; 

            if(i===0){
                result = Math.max(0, dp[i][j-1]);  //앞에가 물웅덩이면 0, 아니면 1
            }else if(j===0){
                result = Math.max(0, dp[i-1][j]);
            }
            else result = Math.max(0,dp[i][j-1])+Math.max(0,dp[i-1][j]); //-1들어가면안되고 0으로 처리
            dp[i][j] =result%MAX;
        }
    }
    return dp[n-1][m-1];
}