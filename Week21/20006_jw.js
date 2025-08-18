//랭킹전 대기열

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

let idx =0;
const [N,M] = input[idx++].split(" ").map(Number);
const arr = []; 
for(let i=0;i<N;i++){
    const [lev,id] = input[idx++].split(" ");
    const level = Number(lev);
    
    let join = false;
    for(const a of arr){
        if(a.players.length<M&&a.level-10<=level&&level<=a.level+10){
            a.players.push([level,id])
            join = true;
            break;
        }
    }
    if(!join){
        arr.push({level:level,players:[[level,id]]})
    }
}

let result = [];
for (const a of arr) {
  result.push(a.players.length === M ? "Started!" : "Waiting!");
  const sorted = [...a.players].sort((a, b) => a[1].localeCompare(b[1])); // ← 문자열 비교
  for (const [lv, id] of sorted) {
    result.push(`${lv} ${id}`);
  }
}
console.log(result.join("\n"));