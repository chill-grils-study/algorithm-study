//단축키 지정

const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')

let idx=0;

const N = Number(input[idx++]);

const keys=[];

let find = false;

for(let i=0;i<N;i++){
    console.log(findShortCutKey(input[idx++]));
}


function findShortCutKey(s){
    const arr = s.split(" ");
    find = false;

    for(let i=0;i<arr.length;i++){
        if(!keys.length||!keys.includes(arr[i][0].toUpperCase())){
            keys.push(arr[i][0].toUpperCase());
            find = true;
            arr[i] = makePrintWord(arr[i],arr[i][0]);
            // const newWord = `[${arr[i][0]}]`
            // arr[i] = arr[i].replace(arr[i][0],newWord);
            return arr.join(' ')
        }
        if(keys.includes(arr[i][0].toUpperCase())){
            continue;
        }
    }

    if(!find){
        for(let i=0;i<arr.length;i++){
           for(let j=1;j<arr[i].length;j++){
             if(!keys.length||!keys.includes(arr[i][j].toUpperCase())){
                keys.push(arr[i][j].toUpperCase());
                find = true;
                arr[i] = makePrintWord(arr[i],arr[i][j]);
                return arr.join(' ')
            }
           }
        }
    }
    if(!find) return arr.join(' ')
}

function makePrintWord(s,w){
    s = s.replace(w, `[${w}]`);
    return s;    
}