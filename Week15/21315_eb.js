const fs = require("fs");
const input = fs.readFileSync("../input.txt").toString().trim().split("\n");

const N = Number(input[0]);
const resultCards = input[1].split(" ").map(Number);
const maxK = Math.sqrt(N);
for (let k1 = 1; k1 <= maxK; k1++) {
  for (let k2 = 1; k2 <= maxK; k2++) {
    // 초기 배열에서 시작
    let cards = Array(N).fill().map((_, i) => i + 1);
    // k1 섞기 
    cards = shuffle(cards, k1);

    // // k2 섞기 
    cards = shuffle(cards, k2);

    // 결과가 주어진 배열과 같은지 확인
    if (cards.join("") === resultCards.join("")) {
      return console.log(k1, k2);
    }
  }
}
function shuffle(cards, k) {
  // (1, 2, 3, 4, 5) → (2, 3, 4, 5, 1) → (4, 5, 2, 3, 1) → (5, 4, 2, 3, 1)
  const n = cards.length;
  let left = [...cards];
  let right = left.splice(0, n - 2 ** k);

  for (let i = 1; i <= k; i++) {
    const cut = 2 ** (k - i);
    right = left.splice(0, cut).concat(right);
  }
  return [...left, ...right];
}


// function shuffle(k) {
//   let newCards = [];

//   //1 (2345 (67 (8 (9
//   //뒤에서부터 1, 2, 4, 8 ... 끝는 규칙을 찾았다.
//   let right = 0;
//   for (let i = 0; i <= k; i++) {
//     let left = 2 ** i;
//     newCards = newCards.concat(cards.slice(n - left, n - right));

//     right = left;
//   }
//   newCards = newCards.concat(cards.slice(0, n - right));

//   return newCards;
// }
