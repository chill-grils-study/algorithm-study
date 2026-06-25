function solution(n, times) {
    let answer = 0;

    times.sort((a,b)=>a-b);

    //이분탐색
    //left = 1 * 가장 빠른 심사관
    // right = 가장 느린 심사관 * n

    let left = times[0];
    let right = n*times[times.length-1]; //최악의 경우

    while(left<right){
        let middle = Math.floor((left+right)/2);
        let cnt = 0;
        for(let i=0;i<times.length;i++){
            cnt+=Math.floor(middle/times[i]);
        }

        if(cnt<n){
            left = middle+1;
        }else{
            right = middle;
        }
    }

    return right;
}

console.log(solution(6,[7, 10])); //28
