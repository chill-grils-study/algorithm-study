function solution(picks, minerals) {
    var answer = 0;
    const arr = [[1,1,1],[5,1,1],[25,5,1]];
    let map = new Map([ // 2차원 key, value 형태의 배열
        ['diamond',0],
        ['iron',1],
        ['stone',2]
    ]);
    const len = 3;
    const max = 5;
    //0:dia, 1:iron, 2:stone
    
    let idx= 0 ;
    let pIdx = 0;
    while(idx<minerals.length){
        if(idx===max){
            picks[pIdx]--;
            idx++;
            continue;
        }
        if(!picks[pIdx]){
            pIdx++;
            continue;
        }
        const a = pIdx;
        const b = minerals[idx];
        const cnt = arr[a][map.get(b)];
        answer+=cnt;
        picks[pIdx]--;
        idx++;
    }
    
    return answer;
}

console.log(solution([1, 3, 2],["diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"]))//12


// picks	minerals	result
// [1, 3, 2]	["diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"]	12
// [0, 1, 1]	["diamond", "diamond", "diamond", "diamond", "diamond", "iron", "iron", "iron", "iron", "iron", "diamond"]	50