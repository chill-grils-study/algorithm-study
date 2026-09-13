//범위 작아서 다 순회해서 dfs 로 조합 찾기!
function solution(n, q, ans) {

    let answer=0;
    
    const m = q.length;
    //1~n까지 m개 조합 뽑기

    const visited = Array(n+1);
    dfs(1,0);

    function dfs(start,cnt){
        if(cnt===5){
            const arr = visited.flatMap((val, idx) => val ? idx : []);
            if(isMatch(arr)){
                answer++;
            }
            return;
        }

        for(let i=start;i<=n;i++){
            if(!visited[i]){
                visited[i]=true;
                dfs(i+1,cnt+1);
                visited[i]=false;
            }
        }
    }

    function isMatch(arr){
        const set = new Set(arr);
        for(let i=0;i<m;i++){
            const cnt = q[i].filter(item=>set.has(item)).length;
            if(cnt!==ans[i]) return false;
        }
        return true;
    }

    return answer
}

console.log(solution(10,[[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [3, 7, 8, 9, 10], [2, 5, 7, 9, 10], [3, 4, 5, 6, 7]],[2, 3, 4, 3, 3]))//3
console.log(solution(15,[[2, 3, 9, 12, 13], [1, 4, 6, 7, 9], [1, 2, 8, 10, 12], [6, 7, 11, 13, 15], [1, 4, 10, 11, 14]],[2, 1, 3, 0, 1]))//5
