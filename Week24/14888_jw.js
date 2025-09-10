//연산자 끼워넣기
//그리디 -> 백트래킹

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

let idx=0;
const N = Number(input[idx++]);

const num = input[idx++].split(" ").map(Number);
const operator = input[idx++].split(" ").map(Number); //+ - * /

function calc(a,b,opIndex){
    if(opIndex===0) return a+b
    if(opIndex===1) return a-b;
    if(opIndex===2) return a*b;

    const q = a/b;
    const t = q<0?Math.ceil(q):Math.floor(q);
    return t===0?0:t
}
let max = -Infinity;
let min = Infinity;

dfs(1,num[0]);
console.log(max)
console.log(min)

function dfs(idx,total){

    if(idx===N){
        max = Math.max(total,max);
        min = Math.min(total,min);
        return;
    }

    for(let i =0;i<operator.length;i++){
        if(operator[i]>0){
            operator[i]--;
            dfs(idx+1,calc(total,num[idx],i));
            operator[i]++;
        }
    }
    
}
// const max=[];
// const min=[];

// //최대
// //최소 ->

// for(let i=N-1;i>=0;i--){
//     max.push(arr[i]);
//     //max
//     if(operator[2]){
//         max.push('*');
//     }else if(operator[0]){
//         max.push('+');
//     }else if(operator[3]){
//         max.push('/');
//     }else{
//         max.push('-');
//     }
//     //min
// }
// for(let i=N-1;i>=0;i--){
//     min.push(arr[i]);
//     //max
//     if(operator[2]){
//         min.push('*');
//     }else if(operator[1]){
//         max.push('-');
//     }else if(operator[3]){
//         max.push('/');
//     }else{
//         max.push('+');
//     }
// }
// let minTotal=0;
// let maxTotal=0;
// let index=0;
// let op = '';
// while(index>=0&&index<min.length){
//     const n = min.pop();
//     //숫자 문자열 판단해서 더하기
//     if(index%2!==0){
//         op = n;
//         continue;
//     }else{
//         if(operator==='+'){
//             minTotal+=n;
//         }else if(operator==='-'){
//             minTotal-=n;
//         }else if(operator==='/'){
//             minTotal/=n;
//         }else if(operator==='*'){
//             minTotal*=n;
//         }
//     }
// }
// console.log(minTotal)
// index=0;
// op=''
// while(index>=0&&index<min.length){
//     const m = max.pop();
//     //숫자 문자열 판단해서 더하기
//     if(index%2!==0){
//         op = m;
//         continue;
//     }else{
//         if(operator==='+'){
//             maxTotal+=m;
//         }else if(operator==='-'){
//             maxTotal-=m;
//         }else if(operator==='/'){
//             maxTotal/=m;
//         }else if(operator==='*'){
//             maxTotal*=m;
//         }
//     }
// }
// console.log(maxTotal)
//1 2 3 4 5 6 

//+ / * /
//최소값: 뒤에다가 마이너스
//최대값: 뒤에다가 곱하기 앞에 더하기

// 1+2+3/4-5*6 :24
//곱하기 앞에 -

// 1-2/3+4+5×6 :54

//음수 나누기 양수는 양수로 바꾸고 나누고 몫을 음수