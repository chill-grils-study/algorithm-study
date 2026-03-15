// ㅎㅎ,, 분할 정복 키워드 보고 재귀.. 쪼개서 풀기..를 생각해봤지만 구현을 하지 못했슴.. 다른 사람 풀이 봤습니다. 다 풀이 똑같을거라 생각.. 이건 걍 외워야겠어.
// 시간복잡도: O(logn)
function solution(A, B, C) {
  let n = B,
    a = BigInt(A);

  const power = (n) => {
    if (n === 0) {
      return BigInt(1);
    }
    const half = BigInt(power(Math.floor(n / 2)));
    if (n % 2 === 0) {
      return (half * half) % BigInt(C); // 계산할 때마다 나머지 구해야됨, 마지막에 한번에 구하려고 하면 시간초과
    } else {
      return (half * half * a) % BigInt(C);
    }
  };

  console.log(power(n).toString());
}
