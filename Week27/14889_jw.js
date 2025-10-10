//스타트와 링크
//조합 문제
//시간초과,,
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')

let idx=0;

const N = Number(input[idx++]);

const arr = Array.from({length:N},()=>Array(N));
const visited = Array(N).fill(false);
let min = Infinity;

for(let i=0;i<N;i++){
    arr[i] = input[idx++].split(" ").map(Number);
}

//1~N까지
dfs(0,0);
console.log(min);

function dfs(m,cnt){
    if(cnt===N/2){ //두팀으로 뽑았으면 계산
        //visited true 인것과 false인것 계산
        let aTeamSum = 0;
        let bTeamSum = 0;

        const aArr = [];
        const bArr = [];

        visited.forEach((v, i) => {
         if (v) aArr.push(i);
         else bArr.push(i);
        });

        for(let i=0;i<N/2-1;i++){
            for(let j=i+1;j<N/2;j++){
                aTeamSum+=arr[aArr[i]][aArr[j]]+arr[aArr[j]][aArr[i]];
                bTeamSum+=arr[bArr[i]][bArr[j]]+arr[bArr[j]][bArr[i]];
            }
        }

        min=Math.min(min,Math.abs(aTeamSum-bTeamSum));
        return;

    }

    // for(let i=0;i<N;i++){ //시간초과부분!
    for(let i=m+1;i<N;i++){
        if(!visited[i]){
            visited[i]=true;
            cnt++;
            dfs(i,cnt);
            visited[i]=false;
            cnt--;
        }
    }
}

