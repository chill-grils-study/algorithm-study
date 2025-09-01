// 일단 매수하고 가장 비쌀 때 매도!
// 뒤에서부터 확인하는게 편함
// 1 4 13 | 5 7 | 3 6
// [1 4]에 매수, 13에 매도 / 5에 매수, 7에 매도 / 3에 매수, 6에 매도
function solution(T, priceList) {
  for (const prices of priceList) {
    const length = prices.length;
    let total = 0,
      maxPrice = -1;

    for (let i = length - 1; i >= 0; i--) {
      if (maxPrice > prices[i]) {
        total += maxPrice - prices[i];
      } else {
        maxPrice = prices[i];
      }
    }

    console.log(total);
  }
}