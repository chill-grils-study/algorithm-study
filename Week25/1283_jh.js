const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : './run/input.txt';
const inputs = fs.readFileSync(path).toString().trim().split('\n');
const N = +inputs[0];
const options = [];
const optionIndexes = Array.from({ length: N }, () => []);

for (let i = 1; i <= N; i++) {
  const option = inputs[i];
  const firstCharIndexes = [];
  const nonFirstCharIndexes = [];
  let previous = ' ';

  options.push(option);

  for (let j = 0; j < option.length; j++) {
    if (previous === ' ') {
      firstCharIndexes.push(j);
    } else if (option[j] !== ' ') {
      nonFirstCharIndexes.push(j);
    }
    previous = option[j];
  }

  optionIndexes[i - 1].push(firstCharIndexes, nonFirstCharIndexes);
}

function solution(N, options) {
  const shortcuts = new Map();
  const shortcutIndexes = Array(N).fill(-1);

  for (let i = 0; i < N; i++) {
    const option = options[i];
    for (const firstCharIndex of optionIndexes[i][0]) {
      const shortcutsChar = option[firstCharIndex].toUpperCase();
      if (!shortcuts.has(shortcutsChar)) {
        shortcutIndexes[i] = firstCharIndex;
        shortcuts.set(shortcutsChar, true);
        break;
      }
    }

    if (shortcutIndexes[i] !== -1) continue;

    for (const nonFirstCharIndex of optionIndexes[i][1]) {
      const shortcutsChar = option[nonFirstCharIndex].toUpperCase();
      if (!shortcuts.has(shortcutsChar)) {
        shortcutIndexes[i] = nonFirstCharIndex;
        shortcuts.set(shortcutsChar, true);
        break;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    const option = options[i];
    const shortcutIndex = shortcutIndexes[i];
    if (shortcutIndex === -1) {
      console.log(option);
    } else {
      console.log(
        `${option.slice(0, shortcutIndex)}[${
          option[shortcutIndex]
        }]${option.slice(shortcutIndex + 1)}`
      );
    }
  }
}

solution(N, options);
