//카드 섞기
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

let index = 0;
const N = Number(input[index++]);

const cardBefore = Array.from({length: N}, (_, i) => i + 1);
const cardAfter = input[index++].split(" ").map(Number);

for(k1=1;multiple(k1)<N;k1++){
  const arrFirst = shuffle([...cardBefore], k1)
  for(k2=1;multiple(k2)<N;k2++){
    const arrSecond = shuffle([...arrFirst],k2)
    if(arrSecond.join(' ')===cardAfter.join(' ')){
      console.log(k1,k2);
      return;
    }
  }
}

function shuffle(cardList, K) {
  let addCard = [];
  let lastIndex = 0;

  for (let i = 1; i <= K + 1; i++) {
    if (i === 1) {
      addCard = cardList.splice(-multiple(K));
    } else {
      const count = multiple(K - i + 1);
      const start = lastIndex - count + 1;
      addCard = cardList.splice(start, count);
    }
    lastIndex = addCard.length - 1;
    cardList.unshift(...addCard);
  }
  return [...cardList];
}
function multiple(K){
  let result = 1;
  for(let i =0 ;i<K;i++){
    result*=2;
  }
  return result;
}