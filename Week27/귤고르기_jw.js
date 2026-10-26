function solution(k, tangerine) {
    var answer = 0;
    const myMap = new Map();

    tangerine.forEach(key => {
        if (myMap.has(key)) {
            myMap.set(key, myMap.get(key) + 1);
        } else {
            myMap.set(key, 1); 
        }
    });
    const mapEntries = [...myMap.entries()];
    mapEntries.sort((a,b)=>{
        if(a[1]===b[1]) return b[0]-a[0];
        return b[1]-a[1];
    })
    
    let totalSum = 0;
    //[1,1],[4,1],[3,2],[2,2],[5,2]
    for (let i = 0; i < mapEntries.length; i++) {
        const [key, value] = mapEntries[i];
        
        totalSum += value;

        if (totalSum >= k) {
            answer = i+1;
            break;
        }
    }
    return answer;
}

console.log(solution(6,[1, 3, 2, 5, 4, 5, 2, 3]))
console.log(solution(4,[1, 3, 2, 5, 4, 5, 2, 3]))
console.log(solution(2,[1, 1, 1, 1, 2, 2, 2, 3]))
