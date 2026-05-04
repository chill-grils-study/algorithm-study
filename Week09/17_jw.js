function solution(digits){
    const chArr = Array.from({ length: 10 }, () => Array(3).fill(""));
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

    let index = 0;

    for(let i=2;i<chArr.length;i++){
        const m = i===7||i===9?4:3;
        for(let j=0;j<m;j++){
            chArr[i][j] = alphabet[index++]
        }
    }
    const visited = Array.from({ length: 10 }, () => Array(3).fill(false));
    const result = [];

    btk(chArr,digits,"",result,visited,0);
    console.log(result)
}

function btk(chArr,digits,word,result,visited,dIndex){
    console.log(`word:${word} dIndex:${dIndex}`)

    if(dIndex===digits.length){
        // console.log(`result word:${word}`);
        result.push(word)
        return;
    }

    //digits 돌면서
    //해당값이 index

    const i = digits[dIndex];
    console.log(`i:${i}`)

    for(let j=0;j<chArr[i].length;j++){
        // if(!visited[i][j]){
        //     visited[i][j] = true;
            dIndex++;
            
            // console.log(`i:${i}, j:${j}. word:${word}, dIndex:${dIndex}`);
            btk(chArr,digits,word+chArr[i][j],result,visited,dIndex);
            // visited[i][j] = false;
            dIndex--;
            // console.log(`word:${word} dIndex:${dIndex}`);
        // }
    }
}
