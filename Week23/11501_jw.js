//주식
//그리디?
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

let idx=0;
const T = Number(input[idx++]);

for(let i=0;i<T;i++){
    const N = Number(input[idx++]);
    const juga = input[idx++].split(" ").map(Number);
    console.log(check(juga));
}

//2차 힌트: 오른쪽에서 왼쪽으로 스캔했을때 가장 큰값 찾기
function check(arr){

    let idx = arr.length-1;
    let max = 0;
    let maxIdx=-1;

    let benefit = 0;
    while(idx>=0){
        if(max<arr[idx]){
            max=arr[idx]; //max값 갱신
        }else{
            benefit+=max-arr[idx]; //max값에 팔기
        }
        idx--;
    }

    return benefit;
}

//1차 틀림 반례; 1, 3 ,2, 10
// function check(arr){
//     let buy=[];
//     let benefit = 0;
//     //주가가 점점 감소하면 0
//     //주가가 점점 증가하면 마지막에 모두 팔기
//     //특정 구간에서 증가하면 그 구간까지 팔기 감소하면 0
//     //최대 증가하는 구간 찾기? 
//     let before=-1;

//     for(let i=0;i<arr.length;i++){
//         if(before>arr[i]){
//             if(buy.length){
//                 const last = buy.pop();
//                 for(let j=0;j<buy.length;j++){
//                     benefit+=last-buy[j];
//                 }
//                 buy=[];
//             }
            
//         }
//         before=arr[i];
//         //사기
//         buy.push(arr[i]);
//     }

//     const last = buy.pop();
//     for(let j=0;j<buy.length;j++){
//         benefit+=last-buy[j];
//     }

//     return benefit;
// }