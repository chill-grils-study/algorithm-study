//dfs 시작점 부터 상/하/좌우 돌고 자기자신으로 돌아오는지 확인(갯수 동일) -> 갯수 max 업데이트 하면서
//return max*max 틀림
// 1 1 0
// 1 1 1
// 0 1 1
//dp->대각선 + 위, 아래 값
//현재 위치 (i, j)를 정사각형의 오른쪽 아래 꼭짓점이라고 가정
//A B
//C D
//D = min(A,B,C) +1(오른쪽 모서리 밑)
//1하나만 있어도 정사각형 1*1(이거때문에 틀림)

function solution(board)
{
    let max = -1;
    const n = board.length;
    const m = board[0].length;
    const dp = Array.from({length:n},()=>Array(m).fill(0));

    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if (board[i][j] === 1 ){
                if((i > 0 && j > 0) )
                    dp[i][j]=Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1;
                else
                    dp[i][j]=1;
            } else {
                dp[i][j]=0;
            }
            max = Math.max(max,dp[i][j]);
        }
    }
    return max*max; 
}

console.log(solution([[0,1,1,1],[1,1,1,1],[1,1,1,1],[0,0,1,0]]))//9
console.log(solution([[0,0,1,1],[1,1,1,1]]))//4