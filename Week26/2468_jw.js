//안전 영역
//브루투포스?
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')

let idx=0;

const N = Number(input[idx++]);

const arr = Array.from({length:N},()=>Array(N));

let max = -Infinity;
// let min = Infinity;
for(let i=0;i<N;i++){
    arr[i] = input[idx++].split(" ").map(Number);
    max = Math.max(max,...arr[i]);
    // min = Math.min(min,...arr[i])
}
const dx=[1,0,-1,0];
const dy=[0,1,0,-1];
//dfs 갯수

let resultMax = -Infinity;
for(let k=max;k>=0;k--){
    let cnt = 0;
    const visited = Array.from({length:N},()=>Array(N).fill(false));
    for(let i=0;i<N;i++){
        for(let j=0;j<N;j++){
            if(arr[i][j]>k&&!visited[i][j]){
                dfs(i,j,k,visited);
                cnt++;
            }
        }
    }
    resultMax = Math.max(resultMax,cnt);
}

console.log(resultMax)

function dfs(x,y,k,visited){
    visited[x][y]=true;

    for(let i=0;i<4;i++){
        const nx = x+dx[i];
        const ny = y+dy[i];
        if(0<=nx && nx<N &&0<=ny &&ny<N&&!visited[nx][ny]&&arr[nx][ny]>k){
            visited[nx][ny]=true;
            dfs(nx,ny,k,visited);
        }
    }

}