//dfs에 return 탈출 조건이 따로 없고 cnt를 더해나가는게 어려웠다.
let cnt = 0;

const dx=[1,0,-1,0];
const dy=[0,-1,0,1];
function solution(maps) {
    var answer = [];

    const n = maps.length;
    const m = maps[0].length;

    const visited = Array.from({length:n},()=>Array(m).fill(false));


    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(!visited[i][j]&&maps[i][j]!=='X'){
                const cnt = dfs(i,j,m,n,maps,visited);
                answer.push(cnt);
            }
        }
    }
    return answer.length>0?answer.sort((a,b)=>a-b):[-1];
}

function dfs(x,y,m,n,maps,visited){

    visited[x][y] = true;
    let sum = Number(maps[x][y]);
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && nx < n && ny >= 0 && ny < m &&
            !visited[nx][ny] && maps[nx][ny] !== 'X') {
            sum+=dfs(nx, ny, m, n, maps, visited);
        }
    }    
    return sum;
}
//dfs

console.log(solution(["X591X","X1X5X","X231X", "1XXX1"]));//[1, 1, 27]
console.log(solution(["XXX","XXX","XXX"]));//[-1]
