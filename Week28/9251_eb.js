const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
// https://mojing.tistory.com/entry/Algorithm-Longest-Common-SubsequenceLCS-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%91%90-%EB%AC%B8%EC%9E%90%EC%97%B4-%EA%B0%84-%EC%B5%9C%EC%9E%A5-%EA%B3%B5%ED%86%B5-%EB%B6%80%EB%B6%84-%EC%88%98%EC%97%B4-%EC%B0%BE%EA%B8%B0
const [first, second] = fs.readFileSync(path, "utf8").trim().split("\n")
const dp = Array.from({ length: second.length + 1 }, () => Array(first.length + 1).fill(0));
// 두 문자가 같으면 이전까지의 LCS 길이에 1을 더하고
// 다르면 현재 위치 제외한 LCS 최장 길이 가지기 
for (let y = 0; y <= second.length; y++) {
  for (let x = 0; x <= first.length; x++) {
    if (first[x - 1] === second[y - 1]) {
      dp[y][x] = dp[y - 1][x - 1] + 1
    } else {
      dp[y][x] = Math.max(dp[y][x - 1], dp[y - 1][x])
    }
  }
}
console.log(dp.at(-1).at(-1))