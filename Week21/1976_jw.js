//여행가자
//union-find?

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

let idx =0;
const N = Number(input[idx++]);
const M = Number(input[idx++]);

const adj = Array.from({ length: N+1}, () => Array(N+1).fill(0));
for (let i = 1; i <= N; i++) {
    const row = input[idx++].split(" ").map(Number);
  for (let j = 1; j <= N; j++) {
    adj[i][j] = row[j-1];
  }
}

const plan = input[idx++].trim().split(" ").map(Number);
const parent = Array.from({length:N+1},(_,i)=>i)

function union(a,b){
    a = find(a);
    b = find(b)
    if(a===b) return;
    parent[b]=a; //p[2]=1 p[3]=1

}

function find(x){ //1-2 2-3
    if(parent[x]!==x) parent[x]=find(parent[x]);
    return parent[x];
}

for (let i = 1 ;i <=N; i++) {
  for (let j = i + 1; j <= N; j++) {
    if (adj[i][j] === 1) union(i, j);
  }
}

//모든 도시의 조상이(find값이) 같다면 YES
const result = plan.every(p=>find(p)===find(plan[0]));
console.log(result?"YES":"NO")
