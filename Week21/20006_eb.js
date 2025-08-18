// boj_20006_input.js
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "../i.txt";

const input = fs.readFileSync(path, "utf8").trim().split("\n");

const [p, m] = input[0].split(" ").map(Number); // 플레이어 수, 방 정원
const players = input.slice(1).map(line => {
  const [level, name] = line.split(" ");
  return { level: Number(level), name };
});
// const rooms = []

// for (const {level, name} of players) {
//   let inRoom = false;
  
//   if (rooms.length > 0) {
//     for (const room of rooms) {
//       if (room.players.length < m && room.max >= level && room.min <= level) {
//         room.players.push([level, name]);
//         inRoom = true;
//         break;
//       }
//     }
//   }
  
//   if (!inRoom) {
//     rooms.push({max: level + 10, min: level - 10, players: [[level, name]]});
//   }
// }

// for (const {players} of rooms){
//   if (players.length === m){
//     console.log('Started!')
//   } else {
//     console.log('Waiting!')
//   }

//   players.sort((a,b) => a[1].localeCompare(b[1]))
//   for (const player of players){
//     console.log(player.join(' '))
//   }
// }

// 위 풀이가 가독성이 구린거 같아서 지피티한테 코드리뷰 시켜보니 
const rooms = [];

for (const { level, name } of players) {
  let room = rooms.find( // find로..! 깔끔하게 할 수 있엇다죠
    r =>
      r.players.length < m &&
      r.min <= level &&
      level <= r.max
  );

  if (room) {
    room.players.push({ level, name });
  } else {
    // 새 방 생성은 rooms에 넣을 때도 {level:, name:} 그대로 하는 것이 players 배열과 같은 구조라 통일성 있다는 점
    rooms.push({
      min: level - 10,
      max: level + 10,
      players: [{ level, name }],
    });
  }
}

// 출력
for (const { players } of rooms) {
  console.log(players.length === m ? "Started!" : "Waiting!");

  players
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(player => console.log(player.level, player.name)); // 체이닝으로 깔끔하게 함.. 대박.. 
}
