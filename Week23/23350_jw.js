//K물류창고
//그리디? (우선순위 스케줄링)
//낮은 우선순위 - 낮은 무게 순으로 위에 쌓아야함
//높은 순위의 컨테이너가 들어오면 비용 발생+맨앞으로 이동

//적재할때랑 뺄때

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

let idx=0;
const [N,M] = input[idx++].split(" ").map(Number);

const container = [];
const load =[];
const remain = Array(M+1).fill(0);
let pAllow = M; //낮은 우선순위부터
let fee=0;

for(let i=0;i<N;i++){
    const [P,W] = input[idx++].split(" ").map(Number);
    remain[P]++; //우선순위 cnt
    container.push([P,W]);
}

// const first= container.shift();
// load.push(first);
// fee+=first[1];

while(container.length>0){
    const [p,w]=container.shift();

    if(pAllow>p){//우선순위 비교 
        container.push([p,w]);
        fee+=w;
        continue;
    }
    if (load.length === 0) { 
        load.push([p,w]); 
        fee += w; 
        remain[p]--; 
        if(remain[p]===0) 
            pAllow--; 
        continue; 
    }
    
    if(load.at(-1)[0]===p){
       const tmp = [];
        while (load.length &&
            load.at(-1)[0] === p &&   // 같은 우선순위인 애들만
            load.at(-1)[1] < w) {     // 위가 더 가벼우면 잠시 뺌
        const t = load.pop();
        fee += t[1];                   // 빼낼 때 비용
        tmp.push(t);                   // 레일이 아니라 임시 스택
        }

        load.push([p, w]);
        fee += w;

        while (tmp.length) {
        const t = tmp.pop();           // 역순 복원
        load.push(t);
        fee += t[1];                   // 다시 올릴 때 비용
        }
    }else{
        load.push([p,w]);
        fee+=w;
    }
    remain[p]--; 
    if(remain[p]===0) pAllow--;
}

console.log(fee)