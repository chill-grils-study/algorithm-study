import { MinHeap } from "./MinHeap.js";

//그리디? 조합 찾는거니까 dfs? --> 틀림(X) 그리디+우선순위큐! =>“지금까지 나온 적들 중 가장 큰 k개”
function solution(n, k, enemy) {
    var answer = 0;

    const len = enemy.length;

    if(k>=len) return len; //모든 공격 막을수 있으면 마지막 라운드까지 가능 len return

    //가장 n=enemy[i]가 많이 남아야하고 enemy[i] 수각 작아야함
    // 모든 경우의 수 dfs로 돌면서 계산해서 최댓값 구하기!

    // let max = -1;
    // for(let i=0;i<len;i++){
    //     dfs(i,0,enemy,k,n)
    // }
    const heap = new MinHeap();
    for(let i=0;i<len;i++){//5 2 100 k = 2
        heap.push(enemy[i]);
        if(heap.size()>k){
            //마지막거 버리기
            const en = heap.pop();
            n-=en;
        }
        if(n<0){
            return i;
        }
    }
    return len;
}


// function dfs(index,cnt,enemy,k,n){
//     console.log(`index:${index}`)

//     for(let i=index;i<enemy.length;i++){
//         //무족권 사용하면
//         dfs(index+1,cnt+1,enemy,k-1,n)
//         //사용안하면
//         dfs(index+1,cnt,enemy,k,n-enemy[i])
//     }
// }


console.log(solution(7	,3,	[4, 2, 4, 5, 3, 3, 1]))  //5
console.log(solution(2	,4,	[3, 3, 3, 3]))  //4