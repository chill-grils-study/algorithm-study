function solution(n, k) {
    const answer = [];
    // 아직 사용하지 않은 숫자 목록 [1, 2, ..., n]
    const nums = Array.from({ length: n }, (_, i) => i + 1);

    let groupSize = fact(n - 1); // 첫 자리의 그룹 크기 (n-1)!
    k = k - 1;                   // 0부터 세는 기준으로 변경

    for (let i = n - 1; i >= 0; i--) {
        const idx = Math.floor(k / groupSize); // 몇 번째 그룹인지 = 고를 숫자의 인덱스
        answer.push(nums[idx]);                // 정답에 숫자 추가
        nums.splice(idx, 1);                   // 사용한 숫자는 목록에서 제거
        k = k % groupSize;                     // 그룹 안에서의 순번 = 새 k

        if (i > 0) groupSize = groupSize / i;  // 다음 그룹 크기: (i)! → (i-1)!
    }

    return answer;

    function fact(m) {
        if (m <= 1) return 1;
        return m * fact(m - 1);
    }
}
 // const result = [];
    // const visited = new Array(n+1).fill(false);
    // dfs([],visited);

    // function dfs(arr,visited){
    //     if(arr.length===n){
    //         result.push([...arr]);
    // if(result.length===k) return result[k-1];
    //         return;
    //     }
    //     for(let i=1;i<=n;i++){
    //         if(!visited[i]){
    //             visited[i]=true;
    //             arr.push(i);
    //             dfs(arr,visited);
    //             visited[i]=false;
    //             arr.pop();
    //         }
    //     }
        
    // }
