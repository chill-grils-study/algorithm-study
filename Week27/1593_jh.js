function solution(wLength, sLength, w, s) {
  const wCount = new Map();
  const sCount = new Map();
  let count = 0;

  for (let i = 0; i < wLength; i++) {
    wCount.set(w[i], (wCount.get(w[i]) || 0) + 1);
  }

  for (let i = 0; i < wLength; i++) {
    sCount.set(s[i], (sCount.get(s[i]) || 0) + 1);
  }

  count += isMatch(wCount, sCount) ? 1 : 0;

  for (let i = 1; i <= sLength - wLength; i++) {
    const previousChar = s[i - 1];
    const previousCount = sCount.get(previousChar);
    const currentChar = s[i + wLength - 1];
    if (previousCount === 1) {
      sCount.delete(previousChar);
    } else {
      sCount.set(previousChar, previousCount - 1);
    }
    sCount.set(currentChar, (sCount.get(currentChar) || 0) + 1);

    count += isMatch(wCount, sCount) ? 1 : 0;
  }

  return count;
}

function isMatch(aCount, bCount) {
  let result = true;

  for (const [key, value] of aCount) {
    if (!bCount.has(key) || bCount.get(key) !== value) {
      result = false;
      break;
    }
  }

  return result;
}
