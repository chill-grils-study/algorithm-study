

//greedy -> 특정 기준으로 정렬해서 배분하면될듯(x)
//완탐 -> 4의 m제곱 최대 4의 7제곱



//[[40, 10000], [25, 10000]]
//[7000, 9000]


//[10,6300],[20,5600],[30,4900],[40,4200]
//[10,8100],[20,7200],[30,6300],[40,5400]



function solution(users, emoticons) {
    var answer = [];
    const m = emoticons.length;
    const disAmountArr = Array(m);


    for(let i=0;i<m;i++){
        const amount = emoticons[i];
        const arr = []
        for(let j=10;j<=40;j+=10){
            const disAmount = amount*(100-j)/100
            arr.push([j,disAmount])
        }
        disAmountArr[i] = arr
    }
    const comb =[];


    dfs(0);


    function dfs(i){
        if(i === m){
            let plus = 0;
            let pAmount = 0;


            for(let u=0;u<users.length;u++){
                const dis = users[u][0];
                const amount = users[u][1];
                let total = 0;
                for(let s=0;s<comb.length;s++){
                    if(dis<=comb[s][0]){
                        total+=comb[s][1];
                    }
                }
                if(total>=amount){
                    plus++;
                    total=0;
                }  
                pAmount+=total;
                
            }
            if(answer.length){
                if(answer[0][0]<plus ||answer[0][0]===plus&&answer[0][1]<pAmount){
                    answer.pop();
                    answer.push([plus,pAmount])
                }
            }else answer.push([plus,pAmount])
            return;
        }
        for(let d=0;d<4;d++){
            comb.push(disAmountArr[i][d]);
            dfs(i+1);
            comb.pop();
        }


    }    
    return answer[0];
}
console.log(solution([[40, 10000], [25, 10000]],[7000, 9000]))//[1, 5400]
console.log(solution([[40, 2900], [23, 10000], [11, 5200], [5, 5900], [40, 3100], [27, 9200], [32, 6900]],	[1300, 1500, 1600, 4900]))//	[4, 13860])