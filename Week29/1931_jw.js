//회의실 배정 ->그리디
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(path, "utf8").trim().split(/\r?\n/);

let index=0;
const N = Number(input[index++]);
const arr =[];
for(let i=0;i<N;i++){
    const [start,end] = input[index++].split(" ").map(Number);
    arr.push([start,end]);
}

//회의 겹치지않게 회의사용가능한 최대개수
arr.sort((a,b)=>{
    if(a[1]===b[1]){
        return a[0]-b[0]
    }
    return a[1]-b[1];
});
let cnt=0;
let end=-1; //0으로 초기화해서 틀림!
let i=0;
while(i<N){
    if(end<=arr[i][0]){
        cnt++;
        end = arr[i][1];
    }
    i++;

}
console.log(cnt)