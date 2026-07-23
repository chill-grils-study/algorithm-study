function solution(genres, plays) {
    var answer = [];
    const len = genres.length;
    const map = new Map(); //{장르,[i,players[i]]}
    for(let i=0;i<len;i++){
        const genre = genres[i];
        if(!map.has(genre)){
            map.set(genre,[[i,plays[i]]]);
        }else{
            const arr = map.get(genre);
            map.set(genre,[...arr,[i,plays[i]]]);
        }
    }

    const sortedMap = [...map].sort((a,b)=>{
        const aTotal = a[1].reduce((acc,curr)=>acc+curr[1],0);
        const bTotal = b[1].reduce((acc,curr)=>acc+curr[1],0);
        return bTotal-aTotal;
    });

    for (const value of sortedMap.values()) {

        const arr = value[1];
        const sortedArr = arr.sort((a,b)=>{
            if(a[1]===b[1]) return a[0]-b[0];
            return b[1]-a[1];
        });
        for(let i=0;i<2&&i<sortedArr.length;i++){
            answer.push(sortedArr[i][0]);
        }

    }
    return answer;
    
}