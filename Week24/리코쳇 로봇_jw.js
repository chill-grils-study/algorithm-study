//한방향으로 끝까지. 범위 넘거나, D만나면 멈춤
function solution(board) {
    var answer = -1;
    const arr = board.map(b =>b.split(''));
    const n = board.length;
    const m = board[0].length;
    const dirArr=[[-1,0],[0,-1],[1,0],[0,1]];
    let startX=0;
    let startY=0;

    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(arr[i][j]==='R'){
                startX = i;
                startY = j;
                break;
            }
        }
    }
    const visited = Array.from({length:n},()=>Array(m)); //"한 번의 이동이 끝나서 멈춘 위치"를 기준으로
    // const q = [[startX,startY,0,0]]; //쭉내려가서 멈춘 위치를 q에 넣기
    const q = [];
    for (let d = 0; d < 4; d++) {
        q.push([startX, startY, d, 1]);
    }
    bfs();
    // dfs(startX,startY,0,0);

    function bfs(){
        while(q.length){
            const [x,y,dir,cnt]= q.shift();
            let nx = x;
            let ny = y;
            while(0<=nx&&nx<n&&0<=ny&&ny<m&&arr[nx][ny]!=='D'){
                nx +=dirArr[dir][0];
                ny +=dirArr[dir][1];
            }
            const stopX = nx-dirArr[dir][0];
            const stopY = ny-dirArr[dir][1];

            if(visited[stopX][stopY]) continue;
            visited[stopX][stopY]=true;
            
            if(arr[stopX][stopY]==='G'){
                answer=cnt;
                return;
            }else{
                for(let i=0;i<4;i++){
                    if(i===dir) continue;
                    nx = stopX+dirArr[i][0];
                    ny = stopY+dirArr[i][1];
                        
                    if(0<=nx&&nx<n&&0<=ny&&ny<m&&arr[nx][ny]!=='D'){
                        q.push([nx,ny,i,cnt+1])
                    }
                }     
            }

        }
    }

    // function bfs(dir,cnt){
    //     while(q.length){
    //         const [x,y,dir,cnt] = q.shift(); //pop해서 틀림 ㅎ
    //         console.log(x,y,dir,cnt)

    //         let nx = x+dirArr[dir][0];
    //         let ny = y+dirArr[dir][1];

    //         if(0<=nx&&nx<n&&0<=ny&&ny<m&&!visited[nx][ny]&&(arr[nx][ny]==='.'||arr[nx][ny]==='G')){
    //             console.log(nx,ny,dir,cnt);
    //             q.push([nx,ny,dir,cnt])
    //         } else{
    //             visited[x][y]=true;
    //             if(arr[x][y]==='G'){
    //                 answer=cnt;
    //                 return;
    //             }
    //             for(let i=0;i<4;i++){
    //                 if(i===dir) continue;
    //                 nx = x+dirArr[i][0];
    //                 ny = y+dirArr[i][1];
                        
    //                 if(0<=nx&&nx<n&&0<=ny&&ny<m&&!visited[nx][ny]&&(arr[nx][ny]==='.'||arr[nx][ny]==='G')){
    //                     console.log(nx,ny,dir,cnt);
    //                     q.push([nx,ny,i,cnt+1])
    //                 }
    //             }           
    //         }

    //     }
    // }
    
    // function dfs(x,y,dir,cnt){
    //     if(arr[x][y]==='G'){
    //         answer=cnt;
    //         return;
    //     }
    //     let nx = x+dirArr[dir][0];
    //     let ny = y+dirArr[dir][1];

    //     if(0<=nx&&nx<n&&0<=ny&&ny<m&&(arr[nx][ny]==='.'||arr[nx][ny]==='G')&&!visited[nx][ny]){
    //         visited[nx][ny]=true;
    //         dfs(nx,ny,dir,cnt)
    //     }
    //     else{
    //         for(let i=0;i<4;i++){
    //             if(i===dir) continue;
    //             nx = x+dirArr[i][0];
    //             ny = y+dirArr[i][1]
    //             if(0<=nx&&nx<n&&0<=ny&&ny<m&&(arr[nx][ny]==='.'||arr[nx][ny]==='G')&&!visited[nx][ny]){
    //                 visited[nx][ny]=true;
    //                 dfs(nx,ny,i,cnt+1)
    //             }
    //         }           
    //     }
    // }
    return answer;
}

console.log(solution(["...D..R", ".D.G...", "....D.D", "D....D.", "..D...."]));//7
console.log(solution([".D.R", "....", ".G..", "...D"]));//-1