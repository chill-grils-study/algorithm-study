const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')
const N = Number(input[0]);

for(let i=1;i<=N;i++){
    solution(input[i]);
}

//백트래킹??

function solution(s){
    const arr = s.split("").sort();
    // console.log(arr);
    // let set = new Set();
    let visited = new Array(arr.length).fill(false);
    btk(arr,"",visited)
}

function btk(arr,word,visited){

    if(word.length===arr.length){
        console.log(word);
        return; 
    }
    
    for(let index=0;index<arr.length;index++){
        if(index > 0 && arr[index]===arr[index-1]&&!visited[index-1]) continue;  ///여기서 틀림!!!! 중복 제거할때 set 말고 같은 문자는 앞에거쓰기!
        if(!visited[index]){
            visited[index]=true;
            btk(arr,word.concat(arr[index]),visited);//맨끝에 문자 추가
            visited[index]=false;
        }
    }

}