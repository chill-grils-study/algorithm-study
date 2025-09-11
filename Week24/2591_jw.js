//숫자카드
//조합->dfs?


const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

let idx=0;
const str = input[idx++];

let cnt = 0;
const arr=[];
dfs(0,arr);

console.log(cnt)

function dfs(idx,arr){
    if(idx>=str.length){

        console.log(arr)
        cnt++;
        return;
    }
    for(let i=idx;i<str.length;i++){
        const newNum = str.slice(idx,i+1);
        // console.log(`idx:${idx}, i:${i} newNum:${newNum}`)
        if(Number(newNum<35) &&Number(newNum>0)){
            arr.push(newNum);
            const len = newNum.length;
            // console.log(`len:${len}`)
            idx+=len;
            dfs(idx,arr);
            arr.pop(newNum)
            idx-=len;
        }

    }
}