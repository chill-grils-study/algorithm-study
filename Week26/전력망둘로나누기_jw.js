//완탐으로 하나씩 끊고 bfs/dfs

function solution(n, wires) {
    var answer = -1;
    
    for(let i=0;i<wires.length;i++){
        const arr = makeArr(i);
        const cnt = bfs(1, arr);
        const diff = Math.abs(cnt - (n - cnt));
        
        answer = Math.min(answer, diff);
        
    }
    function bfs(start,arr){
        //bfs
        const visited = Array(n + 1 ).fill(false);
        const queue = [start];
        visited[start] = true;
        let cnt = 1;
        while(q.length){
            const q = queue.shift();
            for(let i=0;i<arr[q].length;i++){
                const nxt = arr[q][i];
                if(!visited[nxt]){
                    visited[nxt] =true;
                    queue.push(nxt);
                    cnt++;
                }
            }
            

        }

    }
    function makeArr(index){
        const arr = Array.from({ length: n + 1 }, () => []);
        for(let g=0;g<wires.length;g++){
            if(g===index)continue;
            const [a,b] = wires[g];
            arr[a].push(b);
            arr[b].push(a);
        }
    }
    return answer;
}