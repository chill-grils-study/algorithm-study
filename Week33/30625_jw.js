const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')

//우진이 앞을 보고 춤을 추면 호영이는 우진과 같은 춤을 춰야 한다
//우진이 뒤를 보고 춤을 추면 호영이는 우진과 다른 춤을 춰야 한다.
//두번 틀리면 탈락

let index=0;

const [N,M] = input[index++].split(" ").map(Number);

const correct = [];
const wrong = [];

for (let i = 0; i < N; i++) {
  const [kind,direction] = input[index++].split(" ").map(Number);
  if(direction){ //1일때 뒤
    correct[i] = M-1;
    wrong[i] = 1
  }else{ //0일떄 앞 (동일)
    correct[i] = 1;
    wrong[i] = M-1
  }
}

// 우진 1 0(앞) -> 호영 1(동일)
// 우진 3 1(뒤) -> 호영 1,2,4(다른거)
// 우진 2 0 -> 호영 2
// 우진 4 1 -> 호영 1,2,3

//최대 한 번까지 올바르지 않은 춤을 춰도 통과

//모두 정답일때 -> 1*3*1*3  = 9

//춤 종류 i -> 앞이면 correct[i] = 1, wrong[i] = M-1
//춤 종류 i -> 뒤면 correct[i] = M-1, wrong[i] = 1

const dp = Array.from({length:N},()=>Array(2));
//dp[i][0] = i번째 라운드까지 왔고 틀린 횟수 0
//dp[i][1] = i번째 라운드까지 왔고 틀린 횟수 1
//dp[0][0] = correct[0]
//dp[0][1] = wrong[0]
//dp[1][0] = dp[0][0]*correct[1]
//dp[1][1] = dp[0][0]*wrong[1](이번에 틀리거나)+dp[0][1]*correct[1](이전에 틀렸거나)
//dp[2][0] = dp[1][0]*correct[2]
//dp[2][1] = dp[1][0]*wrong[2]+dp[1][1]*correct[2]
//dp[i][0] = dp[i-1][0]*correct[i]
//dp[i][1] = dp[i-1][0]*wrong[i]+dp[i-1][1]*correct[i]


//dp[N-1][0] + dp[N-1][1]

dp[0][0] = correct[0]
dp[0][1] = wrong[0]
for(let i=1;i<N;i++){
    dp[i][0] = dp[i-1][0]*correct[i] %1000000007;
    dp[i][1] = dp[i-1][0]*wrong[i]+dp[i-1][1]*correct[i] %1000000007;
}

console.log((dp[N-1][0] + dp[N-1][1])%1000000007);