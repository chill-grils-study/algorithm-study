function solution(n, stations, w) {
    var answer = 0;
    //n의 범위가 큼 -> O(n)
    //dp? 이분탐색?그리디?

    //dp

    const arr = [];
    for(let i=0;i<stations.length;i++){
        const spot = stations[i];
        const start = spot-w<0?0:spot-w
        const end = spot+w>n?n:spot+w
        arr.push([start,end]);
    }
    let before = 1;
    let len = 0;

    for(let i=0;i<arr.length;i++){
        if(before<arr[i][0]){
            len = arr[i][0]-before;
            answer += getCnt(len,w);
            // before = arr[i][1]+1;
        }
            before = Math.max(before, arr[i][1]+1);
    }

    if(before<=n){
        answer += getCnt(n-before+1,w);
    }

    //[3,5],[10,11]
    //  o   ㅐ  o     o     ㅐ
    //1 2 3 4 5 6 7 8 9 10 11
    
    //                ㅐ                     
    //1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
    //[7,11]
    return answer;
}

function getCnt(m,w){
     //3 - > 3, 4~6 -> 2   //커버 가능한 영역: 1+2w    false 영역 n / 1+2w (나누어떨어지면 +0 안떨어지면 +1)
    const cover = 2*w+1;
    if(m%cover){
        return Math.floor(m/cover)+1;
    }else return Math.floor(m/cover);
}