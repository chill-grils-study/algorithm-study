//겹치는건 싫어
//슬라이딩 윈도우?
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')

let idx=0;

const [N,K] = input[idx++].split(" ").map(Number);
const arr = input[idx].split(" ").map(Number);

const map = new Map();
let max = 0;
//연속 K개 같은 수 안나오게
//Map 사용
//map value가 K보다 크면 start+1이동 end 이동 N-1까지
//값:end-start+1
let start=0;
let end=0;
while(end<N){
    if(map.has(arr[end])){
        const value = map.get(arr[end]);
        if(value===K){
            map.set(arr[start],map.get(arr[start])-1);
            max=Math.max(end-start,max);
            start++;
            continue;
        }
        map.set(arr[end],value+1);
    }else map.set(arr[end],1);
    end++;
}
max=Math.max(end-start,max);
console.log(max);