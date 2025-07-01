// 오랜만에 한번에 풀어서 기분 좋았다죠...
// 역으로 카드를 다시 섞으면 됩니다.
const solution = (N, cards) => {
  const result = Array(2);
  // 역으로 섞을 거기 때문에 K의 초깃값은 0
  let k = 0;

  // (2, K) 섞기를 두번 해야됨

  // 2^k번째 카드가 N이 아니라면
  // (2^k번째 카드가 N이라면 카드를 K번 섞었다는 뜻)
  while (cards[2 ** k] !== N) {
    // 앞에 있는 2^K개의 카드를 2^K번째 뒤로 옮김
    const pow = 2 ** k;
    const frontCards = cards.splice(0, pow);
    cards.splice(pow, 0, ...frontCards);
    k++;
    result[1] = k;
  }
  // 앞에 있던 2^k개의 카드를 맨뒤로 보냄 - 첫번째 섞기 완료 상태
  const secondFrontCards = cards.splice(0, 2 ** k);
  cards.push(...secondFrontCards);

  // 첫번째 섞기의 k를 계산해야 하므로 다시 0으로 초기화
  k = 0;

  // 2^k번째 카드가 1이 아니라면
  // 2^k번째 카드가 1이라면 카드를 K번 섞었다는 뜻
  while (cards[2 ** k] !== 1) {
    const pow = 2 ** k;
    const frontCards = cards.splice(0, pow);
    cards.splice(pow, 0, ...frontCards);
    k++;
    result[0] = k;
  }

  // 앞에 있던 2^k개의 카드를 맨뒤로 보냄 - 처음 상태
  // 이건 지워도 되겠당,,
  const firstFrontCards = cards.splice(0, 2 ** k);
  cards.push(...firstFrontCards);

  return result.join(' ');
};
