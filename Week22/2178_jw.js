//미로 탐색
//bfs
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

let idx = 0;
const [N,M] = input[idx++].split(" ").map(Number);

const arr= Array.from({length:N},()=>Array(M));

// const visited= Array.from({length:N},()=>Array(M)).fill(false);
const visited =  Array.from({ length: N }, () => Array(M).fill(false));
const dist = Array.from({length:N},()=>Array(M).fill(0));

for(let i=0;i<N;i++){
    arr[i]=input[idx++].split("").map(Number);
}

// bfs(0,0);
const dx=[1,0,-1,0];
const dy=[0,-1,0,1];

const q=[[0,0]];
visited[0][0]=true;
dist[0][0]=1;

while(q.length>0){

    const [x,y] = q.shift();

    if(x===N-1&&y===M-1){
        // console.log(cnt);
        console.log(dist[N-1][M-1]);
        return;
    }

    for(let i =0;i<4;i++){
        let nx = dx[i]+x;
        let ny = dy[i]+y;
        if(0<=nx&&nx<N&&0<=ny&&ny<M&&!visited[nx][ny]&&arr[nx][ny]===1){
            visited[nx][ny]=true;
            // cnt++;
            dist[nx][ny]=dist[x][y]+1;
            q.push([nx,ny]);
        }
    }

}
