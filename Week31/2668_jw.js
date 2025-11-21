const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')
let idx=0;

const N= Number(input[idx++]);

const arr = Array(N + 1); 
//1~N
//

for (let i = 1; i <= N; i++) {
  const d = Number(input[idx++]);
  arr[i] = d;
}
//사이클에 속한 정점 찾기
//dfs로 타고 들어가서 자기 자신으로 돌아오는지 확인

const result=[];
const visited = Array(N + 1).fill(false);
const nowPass = Array(N + 1).fill(false);

for (let i = 1; i <= N; i++) {
  if (!visited[i]) dfs(i);
}

function dfs(i) {
    visited[i] = true;
    nowPass[i] = true;

    const next = arr[i];

    if(!visited[next]){
        dfs(next);
    }else if(nowPass[next]){
        //nowPass에 true인 값들 중에 next 인 값이 겹치면 그때부터 겹칠때까지 값을 넣는다

        let x = next;
        while(true){
            result.push(x);
            x = arr[x];
            if(x===next) break;
        }

    }

    nowPass[i]=false;
}
console.log(result.length)
for(let r of result)
console.log(r)