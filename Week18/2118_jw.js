//두 개의 탑
//투포인터+누적합

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const N = Number(input[0]);
const distance=[];


for(let i=1;i<=N;i++){
  distance.push(Number(input[i]));
}

// console.log(...plus)
// console.log(...distance)
//모든 거리의 합/2 보다 작으면서 가장 가까운 수

// let index=N/2;
// let middle = plus[N]/2;
// let diff=plus[N];
//0 1 3 6 10 15


// 배열을 2배로 만들어 원형 → 선형으로 바꾸고
// 누적합으로 구간합 계산
// 투포인터로 “절반 이하 거리 중 최댓값” 찾기

const doubleArr = [...distance,...distance]; //원형->선형
const doubleSumArr =[0]
for(let i =0;i<doubleArr.length;i++){
  doubleSumArr.push(doubleSumArr[i]+doubleArr[i]);
}
// console.log(...doubleArr)
// console.log(...doubleSumArr)

let maxDist = 0;
let left=0;
const middle = doubleSumArr[N]/2;
// 1 2 3 4 5 1 2 3 4 5
// 0 1 3 6 10 15 16 18 21 25 30
let right = 0;

while(right<2*N){
  while (right - left >= N) { //최대 길이: N-1 그것보다 더 커지면 어차피 짧은 길이를 구해야함
    left++;
  }
  const dist = doubleSumArr[right + 1] - doubleSumArr[left]; //두 정점의 거리
  if(dist<=middle){
    maxDist = Math.max(maxDist,dist);
    right++;
  }else{
    left++;
  }
}

console.log(maxDist)