const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf8").trim().split("\n");
const [g, s] = input[0].split(' ').map(Number)
const [pictograph, mayan] = input.slice(1)
const pictographCount = countCharacters(pictograph)
let answer = 0
const cutMayanCount = countCharacters(mayan.slice(0, g))
console.log(cutMayanCount)
if (compareCharacters(cutMayanCount, pictographCount)) {
  answer++
}
for (let i = 1; i <= s - g; i++) {
  const leftChar = mayan[i - 1];
  const rightChar = mayan[i + g - 1];

  cutMayanCount.set(leftChar, cutMayanCount.get(leftChar) - 1);
  if (cutMayanCount.get(leftChar) === 0) cutMayanCount.delete(leftChar);

  cutMayanCount.set(rightChar, (cutMayanCount.get(rightChar) || 0) + 1);

  if (compareCharacters(cutMayanCount, pictographCount)) answer++;
}


console.log(answer)
function countCharacters(str) {
  const map = new Map();
  for (const ch of str) {
    map.set(ch, (map.get(ch) || 0) + 1);
  }
  return map;
}

function compareCharacters(map1, map2) {
  if (map1.size !== map2.size) return false;

  for (const [key, value] of map1) {
    if (!map2.has(key) || map2.get(key) !== value) return false;
  }
  return true;
}
