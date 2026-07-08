function solution(targets) {
    var answer = 0;
    //greedy?
    //입력값 10만: O(N), O(NlogN)
    //O(NlogN)는 정렬, 이분탐색, 정렬+한번순회(그리디/투포인터), 우선순위큐
    //[1,4][4,5][3,7][4,8] [5,12][11,13] [10,14] 
    //종료지점 기준으로 정렬하고 종료지점 앞에서 미사일쐈을때 다음 배열이 구간에 포함되면 겹치는것, 포함안되면 새 미사일 필요

    targets.sort((a,b)=>{
        if(b[1]===a[1]) return a[0]-b[0];
        return a[1]-b[1];
    })

    let end = targets[0][1];
    answer = 1;
    for(let i=1;i<targets.length;i++){
        if(is같은구간(end,targets[i])){
            continue;
        }else{
            answer++;
            end = targets[i][1];
        }

    }
   
    return answer;
}
function is같은구간(미사일,el){
    const start = el[0];
    const end = el[1];
    if(start<미사일&&미사일<=end) return true;
    return false;
}

console.log(solution([[4,5],[4,8],[10,14],[11,13],[5,12],[3,7],[1,4]]));//3
console.log(solution([[1,4], [4,5]]))
console.log(solution([[1,4], [2,4], [4,5]]))