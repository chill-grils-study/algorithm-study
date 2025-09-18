//삼각 그래프
//dfs->dp 점화식
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')

let idx=0;

let testCaseNum = 1;
while(Number(input[idx])!==0){ //문자열 0이라서 input[idx]으로 판단하면 항상 true
    const N = Number(input[idx]);
    idx++;
    const arr = Array.from({length:N},()=>Array(3));
    console.log(solution(testCaseNum,N,arr));
    testCaseNum++;
}

function solution(testCaseNum,N,arr){
    for(let i=0;i<N;i++){
        arr[i] = input[idx++].split(" ").map(Number);
    }

    const dp = Array.from({length:N},()=>Array(3).fill(Infinity));
    
    // dp[2][0] = arr[2][0]+ Math.min(dp[1][0],dp[1][1]); //0번째는 위에서 내려오거나 오른쪽대각선에서 내려옴
    // dp[2][1] = arr[2][1]+ Math.min(dp[1][0],dp[1][1],dp[1][2],dp[2][0]); //모든방향에서 내려옴 & 왼쪽에서 오른쪽으로옴
    // dp[2][2] = arr[2][2]+ Math.min(dp[1][1],dp[1][2],dp[2][1]); //위나 왼쪽 위대각선 & 왼쪽에서 오른쪽으로옴


    dp[0][0] = Infinity;
    dp[0][1] = arr[0][1];
    dp[0][2] = arr[0][1]+arr[0][2];


    dp[1][0] = arr[1][0]+dp[0][1];
    dp[1][1] = arr[1][1]+Math.min(dp[1][0], dp[0][1],dp[0][2]);
    dp[1][2] = arr[1][2]+Math.min(dp[0][2],dp[0][1],dp[1][1]);

    for(let i=2;i<N;i++){
        dp[i][0] = arr[i][0]+Math.min(dp[i-1][0],dp[i-1][1]);
        dp[i][1] = arr[i][1]+Math.min(dp[i-1][0],dp[i-1][1],dp[i-1][2],dp[i][0]);
        dp[i][2] = arr[i][2]+Math.min(dp[i-1][1],dp[i-1][2],dp[i][1]);
    }

    return `${testCaseNum}. ${dp[N-1][1]}`

}


// function solution(testCaseNum,N,arr){
//     for(let i=0;i<N;i++){
//         arr[i] = input[idx++].split(" ").map(Number);
//     }

//     console.log(arr)

//     //오른쪽/아래/왼쪽대각선/오른쪽대각선으로 이동가능
//     //(1,0) (0,1) (1,-1),(1,1) 
//     const dx=[1,0,1,1];
//     const dy=[0,1,-1,1];

//     const dp = Array.from({length:N},()=>Array(3).fill(0));

//     dp[0][1] = arr[0][1];
//     const q =[[0,1]];

//     while(q.length){
//         const [x,y] =q.shift();
//         for(let i=0;i<4;i++){
//             const nx = dx[i]+x;
//             const ny = dy[i]+y;
//             // console.log(`nx:${nx} ny:${ny}`)

//             if(nx>=0&&nx<N&&ny>=0&&ny<3){
//                 dp[nx][ny] = dp[nx][ny]!==0? Math.min(dp[nx][ny],dp[x][y]+arr[nx][ny]):dp[x][y]+arr[nx][ny];
//                 q.push([nx,ny]);
//             }
//         }
//     }

//     console.log(dp);

//     return `${testCaseNum}. ${dp[N-1][1]}`

// }

