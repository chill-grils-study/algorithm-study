// 1) 어피치 선 n발 후
// 2) k점 a발 b발 a= b -> 어피치 승 이긴사람이 k점
// 3) 둘다 0발이면 0점
// 화살의 개수를 담은 자연수 n, 어피치가 맞힌 과녁 점수의 개수를 10점부터 0점까지 순서대로 담은 정수 배열 info
//라이언이 가장 큰 점수 차이로 우승하기 위해 n발의 화살을 어떤 과녁 점수에 맞혀야 하는지를 10점부터 0점까지 순서대로 정수 배열에 담아 return
//라이언이 우승할 수 없는 경우 [-1] return
// 라이언이 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 일 경우, 가장 낮은 점수를 더 많이 맞힌 경우를 return
// 가장 낮은 점수를 맞힌 개수가 같을 경우 계속해서 그다음으로 낮은 점수를 더 많이 맞힌 경우를 return
function solution(n, info) {
    const arr = Array(11).fill(0);
    let total = 0;
    let max = 0 ;
    let maxArr = []
    dfs(10,0)
       
    //comb [10,10,10,9,9,8]
    function dfs(start,cnt){
        if(cnt===n){
            //점수계산
            let aTotal = 0;
            let lTotal = 0;
             for(let i=0;i<=10;i++){
                if(info[i]<arr[i]){
                    lTotal+=Number(10-i);
                }else if(info[i]>0){
                    aTotal+=Number(10-i);
                }
            }
            
            const diff = lTotal - aTotal;
            if(diff>0 && max<diff){
                max= diff;
                maxArr = [...arr];
            }else if(max===diff){
                if(!maxArr.length||checkArr(arr,maxArr))
                    maxArr = [...arr]; // 가장 낮은 점수를 맞힌 개수가 같을 경우 계속해서 그다음으로 낮은 점수를 더 많이 맞힌 경우를 return
            }
            total = 0;
            return;
        }
        for(let i=start;i>=0;i--){
                arr[10-i]++;
                cnt++;
                dfs(i,cnt);
                arr[10-i]--;
                cnt--;

        }
    }
    return max===0?[-1]:maxArr;
}

function checkArr(arr,maxArr){
    for(let i=10;i>=0;i--){
        if(arr[i]>maxArr[i]) return true;
        if(arr[i]<maxArr[i]) return false;
    }
    return false
}