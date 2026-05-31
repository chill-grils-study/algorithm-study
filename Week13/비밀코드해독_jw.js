
let answer = 0;

function solution(n, q, ans) {

    //dfs/백트래킹으로 조합 모두 만들고 q[i]돌면서 ans[i]값 맞는지 확인 틀리면 다시조합

    const visited = Array(n+1).fill(false);
    dfs(n,[],visited,q, ans,1);
    return answer;
}

function dfs(n,arr,visited,q,ans,start){
    if(arr.length===5){
        if(isMatch(arr,q,ans)) answer++;
        return;
    }

    for(let i=start;i<=n;i++){
        // if(!visited[i]){
            // visited[i] = true;
            arr.push(i);
            dfs(n,arr,visited,q,ans,i+1);
            // visited[i] = false;
            arr.pop();
        // }
    }
}


function isMatch(arr,q,ans){

    for(let i=0;i<q.length;i++){
        let match = 0;
        for (const num of q[i]) {
            if (arr.includes(num)) match++;
        }
        if(match!==ans[i]) return false;
    }
    return true;
    
}


console.log(solution(10,[[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [3, 7, 8, 9, 10], [2, 5, 7, 9, 10], [3, 4, 5, 6, 7]],[2, 3, 4, 3, 3]))