const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../input.txt";
const input = fs.readFileSync(path, "utf8").trim().split("\n");
// N 거인 나라 인구 수, H 센티 키, T 횟수
let [N, H, T] = input[0].split(" ").map(Number);
const giants = input.slice(1).map(Number).sort((a, b) => a - b);
{ // 시간 초과
  let usedCnt = 0
  while (T > 0) {
    giants.sort((a, b) => a - b);
    const target = giants.at(-1)
    if (target < H || target === 1) {
      break
    }
    giants[giants.length - 1] = Math.floor(target / 2)
    usedCnt++;
    T--;
  }

  if (giants.every((giant) => giant < H)) {
    console.log('YES')
    console.log(usedCnt)
  } else {
    console.log('NO')
    console.log(Math.max(...giants))
  }
}

class MaxHeap {
  constructor() {
    this.data = [];
  }
  push(value) {
    this.data.push(value);
    this._up()
  }
  pop() {
    if (this.data.length === 1) return this.data.pop();
    const max = this.data[0];
    this.data[0] = this.data.pop();
    this._down();
    return max;
  }
  peek() {
    return this.data[0]
  }
  _up() { // _함수명은 내부함수라는 의미 (밖에서 쓰지 않음)
    let i = this.data.lenght - 1;
    const node = this.data[i];
    while (i > 0) {
      const p = Math.floor((i - 1) / 2)
      if (this.data[p] >= node) break;
      this.data[i] = this.data[p]
      this.data[p] = node
      i = p
    }
  }
  _down() { // 루트부터 아래로 내려가며 올바른 위치 찾기
    // 최대 힙 조건: 부모 >= 자식
    let i = 0;
    const len = this.data.length;
    const node = this.data[0];
    while (true) {
      let l = 2 * i + 1, r = 2 * i + 2, swap = null;
      if (l < len && this.data[l] > node) swap = l;
      if (r < len && this.data[r] > (swap === null ? node : this.data[l])) swap = r;
      if (swap === null) break;
      this.data[i] = this.data[swap];
      this.data[swap] = node;
      i = swap;
    }
  }
}
const heap = new MaxHeap();
for (const giant of giants) {
  heap.push(giant);
}
let usedCnt = 0;
while (T > 0) {
  const target = heap.peek();
  if (target < H || target === 1) {
    break;
  }
  heap.pop();
  heap.push(Math.floor(target / 2))
  usedCnt++
  T--
}
const tallestGiant = heap.peek();
if (tallestGiant < H) {
  console.log('YES')
  console.log(usedCnt)
} else {
  console.log('NO')
  console.log(tallestGiant)
}