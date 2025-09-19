const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";

const input = fs.readFileSync(path, "utf-8").trim().split('\n')
const n = input[0]
const words = input.slice(1)
const shortcutKey = new Set()
const answer = []

for (const word of words) {
  const parts = word.split(' ')
  let find = false;
  for (let i = 0; i < parts.length; i++) {
    const firstCh = parts[i][0]
    if (!shortcutKey.has(firstCh.toUpperCase())) {
      shortcutKey.add(firstCh.toUpperCase())
      parts[i] = `[${firstCh}]${parts[i].slice(1)}`
      find = true;
      answer.push(parts.join(' '))
      break
    }
  }
  if (!find) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== ' ' && !shortcutKey.has(word[i].toUpperCase())) {
        shortcutKey.add(word[i].toUpperCase())
        answer.push(word.slice(0, i) + `[${word[i]}]` + word.slice(i + 1, word.length))
        find = true
        break
      }
    }
    if (!find) answer.push(word)
  }
}

console.log(answer.join('\n'))