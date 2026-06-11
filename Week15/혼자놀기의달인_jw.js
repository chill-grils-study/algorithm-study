
//1 2 3 4 5 6 7 8
//8 6 3 7 2 5 1 4

//1번 인덱스 선택 -> 1 8 4 7
//2번 인덱스 선택 -> 2 6 5
//3번 선택
//결국 순환 조합 찾기! (가장 긴거)
//dfs

//1차 -> 80점
const arr =[];
function solution(cards) {
    let answer = 0;
    cards.unshift(0) //인덱스 0 값은 0 문제랑 동일하게 맞추기위해서!
    const visited = Array(cards.length).fill(false);
    for(let i=1;i<cards.length;i++){
        if(visited[i])continue; //얘때매 틀림!!
        dfs(i,cards[i],visited,cards,1);
    }
    arr.sort((a, b) => b - a);
    return arr.length<2?0:arr[0]*arr[1];
}

function dfs(startIndex,currentValue,visited,cards,depth){
    console.log(`startIndex:${startIndex}, currentValue:${currentValue} depth:${depth}`)
    visited[startIndex] = true;
    if(!visited[currentValue]){
        dfs(currentValue,cards[currentValue], visited,cards,depth+1)
    }else{
        arr.push(depth);
        return;
    }


}

console.log(solution([8,6,3,7,2,5,1,4],12));