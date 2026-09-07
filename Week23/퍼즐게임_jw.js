//현재 퍼즐의 난이도를 diff, 현재 퍼즐의 소요 시간을 time_cur, 이전 퍼즐의 소요 시간을 time_prev, 당신의 숙련도를 level
//diff ≤ level이면 퍼즐을 틀리지 않고 time_cur만큼의 시간을 사용하여 해결
//diff > level이면, 퍼즐을 총 diff - level번 틀립니다. 퍼즐을 틀릴 때마다, time_cur만큼의 시간을 사용하며, 추가로 time_prev만큼의 시간을 사용해 이전 퍼즐을 다시 풀고 와야 합니다.
//diff - level번 틀린 이후에 다시 퍼즐을 풀면 time_cur만큼의 시간을 사용하여 퍼즐을 해결

// 예를 들어 diff = 3, time_cur = 2, time_prev = 4인 경우, level에 따라 퍼즐을 푸는데 걸리는 시간은 다음과 같습니다.
//4+2 = 6
//
// level = 1이면, 퍼즐을 3 - 1 = 2번 틀립니다. 한 번 틀릴 때마다 2 + 4 = 6의 시간을 사용하고, 다시 퍼즐을 푸는 데 2의 시간을 사용하므로 총 6 × 2 + 2 = 14의 시간을 사용하게 됩니다.
// level = 2이면, 퍼즐을 3 - 2 = 1번 틀리므로, 6 + 2 = 8의 시간을 사용하게 됩니다.
// level ≥ 3이면 퍼즐을 틀리지 않으며, 2의 시간을 사용하게 됩니다.
// 퍼즐 게임에는 전체 제한 시간 limit가 정해져 있습니다. 제한 시간 내에 퍼즐을 모두 해결하기 위한 숙련도의 최솟값을 구하려고 합니다. 난이도, 소요 시간은 모두 양의 정수며, 숙련도도 양의 정수여야 합니다.
// 퍼즐의 난이도를 순서대로 담은 1차원 정수 배열 diffs, 퍼즐의 소요 시간을 순서대로 담은 1차원 정수 배열 times, 전체 제한 시간 limit이 매개변수로 주어집니다. 
// 제한 시간 내에 퍼즐을 모두 해결하기 위한 숙련도의 최솟값을 정수로 return 하도록 solution 함수를 완성해 주세요.

// 입출력 예
// diffs	times	limit	result
// [1, 5, 3]	[2, 4, 7]	30	3
// [1, 4, 4, 2]	[6, 3, 8, 2]	59	2
// [1, 328, 467, 209, 54]	[2, 7, 1, 4, 3]	1723	294
// [1, 99999, 100000, 99995]	[9999, 9001, 9999, 9001]	3456789012	39354
// 입출력 예 설명
// 입출력 예 #1

// 숙련도가 3인 경우 다음과 같이 진행됩니다.

// 1번째 퍼즐을 2의 시간을 사용하여 해결합니다.
// 2번째 퍼즐을 5 - 3 = 2번 틀려서 총 (4 + 2) × 2 + 4 = 16의 시간을 사용하여 해결합니다.
// 3번째 퍼즐을 7의 시간을 사용하여 해결합니다.
// 총 2 + 16 + 7 = 25의 시간을 사용하여 모든 퍼즐을 해결할 수 있습니다. 숙련도가 3보다 작은 경우 제한 시간인 30 이내에 모든 퍼즐을 해결할 수 없습니다.
// 따라서 3을 return 해야 합니다.

//o(n), o(logn)
//n*logn
//이분탐색-> 60% 점수
function solution(diffs, times, limit) {
    const n = diffs.length;
    // let max = 0;
    // max = Math.max(max,...diffs); //이거떄매 틀림
    const max = 300000;

    const answerArr = [];

    let l = 1;
    let r = max;
    let level = 0;
    while(l<=r){
        level = Math.floor((l+r)/2);
        let totalTime = 0;
        let beforeTime = 0;

        for(let i=0;i<n;i++){
            //diff ≤ level이면 퍼즐을 틀리지 않고 time_cur만큼의 시간을 사용하여 해결
            //diff > level이면, 퍼즐을 총 diff - level번 틀립니다. 퍼즐을 틀릴 때마다, time_cur만큼의 시간을 사용하며, 추가로 time_prev만큼의 시간을 사용해 이전 퍼즐을 다시 풀고 와야 합니다.
            //time_cur+(time_prev+time_cur)*(diff-level)
            if(diffs[i]<=level){
                totalTime += times[i];
            }else{
                totalTime += times[i]+(times[i]+beforeTime)*(diffs[i]-level);
            }
            beforeTime = times[i];
        }
        // console.log(`l:${l} r:${r} totalTime:${totalTime} beforeTime:${beforeTime}`);
        if(totalTime<=limit){//성공 -> level을 더 줄여도됨
            answerArr.push(level);
            r = level-1;
        }else{
            l = level+1;
        }
        answerArr.sort((a,b)=>a-b)
    }

    return answerArr[0];
}

console.log(solution([1, 5, 3],[2, 4, 7],30));//3
console.log(solution([1, 4, 4, 2],[6, 3, 8, 2],59));//2
console.log(solution([1, 328, 467, 209, 54],[2, 7, 1, 4, 3],1723));//294
console.log(solution([1, 99999, 100000, 99995],[9999, 9001, 9999, 9001],3456789012));//39354