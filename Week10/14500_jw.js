//테트로미노
//dfs/bfs? and ㅜ 모양 따로!
//depth 3에서, 그 직전 블록(즉, depth 2 블록)을 기준으로 상하좌우 중 하나를 붙이기

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N,M] = input[0].split(" ").map(Number);

const arr =[];
const visited =Array.from({length:N},()=>Array(M).fill(false));
let max = 0;
const dx=[1,0,-1,0];
const dy=[0,-1,0,1];
for (let i = 0; i < N; i++) {
  arr[i] = input[i + 1].split(" ").map(Number);
}

solution();

function solution(){
  for(let i=0;i<N;i++){
    for(let j=0;j<M;j++){
      visited[i][j]=true;
      dfs(i,j,1,arr[i][j]);
      visited[i][j]=false;
    }
  }
  console.log(max)
}


function dfs(x,y,depth,sum){
  if(depth===4){
    max = Math.max(max,sum)
    return;
  }

  for(let i=0;i<4;i++){
    const nx = x+dx[i];
    const ny = y+dy[i];
      
    if (0 <= nx && nx < N && 0 <= ny && ny < M && !visited[nx][ny]) {
      //ㅏ ㅓ ㅗ ㅜ 모양 -> depth가 2일때 상하좌우 중 한칸 더 넣기
      if(depth===2){
        for(let j=0;j<4;j++){
          const tx = x+dx[j];
          const ty = y+dy[j];
          if (0 <= tx && tx < N && 0 <= ty && ty < M && !visited[tx][ty]) {
            visited[tx][ty] = true;
            dfs(nx, ny, depth + 2, sum + arr[tx][ty]+arr[nx][ny]);
            visited[tx][ty] = false;
          }
        }
      }
      visited[nx][ny] = true;
      dfs(nx, ny, depth + 1, sum + arr[nx][ny]);
      visited[nx][ny] = false;
    }
  
  }
}