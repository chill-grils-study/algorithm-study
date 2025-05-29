//우체국1
//백트래킹 마을V개 중 우체국P개 뽑아서 최소 거리 구하기

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [V,P,L] = input[0].split(" ").map(Number);

const arr = input[1].split(" ").map(Number);
let result = Infinity;
let minPickArr = [];
solution();

function solution(){
  const pickArr = [];
  backtracking(pickArr,0);
  console.log(result);
  console.log(...minPickArr);
}

function backtracking(pickArr,start){

  if(pickArr.length===P){
    let total = 0;
    for(let j =0;j<V;j++){
      let minViliageDist = Infinity;
      for(let k=0;k<P;k++){
        let distance = Math.min(difference(arr[j],pickArr[k]), L - difference(arr[j],pickArr[k]));
        minViliageDist = Math.min(minViliageDist,distance);
      }
      total+=minViliageDist;
    }
    if(result>total){
      result = Math.min(result,total);
      minPickArr =[...pickArr]
    }
    return;
  }
  for(let i=start;i<V;i++){
    pickArr.push(arr[i]);
    backtracking(pickArr,i+1);
    pickArr.pop();
  }
    
}

function difference(a, b) {
  return Math.abs(a - b);
}