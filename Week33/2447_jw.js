const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')
const N = Number(input[0]);

//1 2 3
//4 5 6
//7 8 9

// (1,1)

// i%3===1 && j%3===1 -> 공백
// console.log(N)

//(3,3) (3,4) (3,5), (4,3), (4,4),(4,5),(5,3),(5,4),(5,5) => 공백
// let str = "";
// for(let i=1;i<=N;i++){
//     for(let j=1;j<=N;j++){
//         str+=(i%3===2&&j%3===1)?" ":"*";
//     }
//     str+="\n"
// }

// console.log(str)
let str=""
let isBlank=false;
for(let i=0;i<N;i++){
    for(let j=0;j<N;j++){
        let x = i
        let y = j

        while (x > 0 || y > 0) {
            if (x % 3 === 1 && y % 3 === 1) {
                isBlank = true;
                break;
            }

            x = Math.floor(x / 3)
            y = Math.floor(y / 3)
        }

        str+=isBlank?" ":"*";
        isBlank = false;
    }
    str+="\n"
}

console.log(str)