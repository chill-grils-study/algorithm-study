//꿀 따기
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')

let idx=0;

const N = Number(input[idx++]);

const arr = input[idx++].split(" ").map(Number);
// console.log(arr)

//미리 더한값 구하기
const sum = Array(N);
sum[0] = arr[0];
for(let i=1;i<N;i++){
    sum[i] = sum[i-1]+arr[i]
}
// console.log(sum)

//꿀이 맨 오른쪽에 있을때
//벌1 ㅁ 벌2 ㅁ ㅁ 꿀
let max = 0;
for(let i=1;i<N-1;i++){
    const bee1 = sum[N-1]-arr[0]-arr[i];
    const bee2 = sum[N-1]-sum[i];
    max = Math.max(max,bee1+bee2);
    console.log(`case1 i:${i} ${bee1} ${bee2}`)

}
//5 8 5 2
//꿀이 맨 왼쪽에 있을때
//꿀 ㅁ 벌1 ㅁ ㅁ 벌2
for(let i=1;i<N-1;i++){
    const bee1 = sum[i]-arr[i];
    const bee2 = sum[N-1]-arr[i]-arr[N-1];
    max = Math.max(max,bee1+bee2);
    console.log(`case2 i:${i} ${bee1} ${bee2}`)
}

//꿀이 가운대 있을때
//벌1 ㅁ  꿀 ㅁ ㅁ 벌2
for(let i=1;i<N-1;i++){
    const bee1 = sum[i]-arr[0];
    const bee2 = sum[N-1]-sum[i-1]-arr[N-1];
    max = Math.max(max,bee1+bee2);
    console.log(`case3 i:${i} ${bee1} ${bee2}`)

}
console.log(max)
