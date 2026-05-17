//m명 늘어날때마다 1대 추가
//m명 미만은 추가 x
//n*m<=<(n+1)*m -> n대 서버
//k시간 운영 후 반납
// 0시에서 23시까지의 시간대별 게임 이용자의 수를 나타내는 1차원 정수 배열 players, 
// 서버 한 대로 감당할 수 있는 최대 이용자의 수를 나타내는 정수 m, 서버 한 대가 운영 가능한 시간을 나타내는 정수 k가 주어집니다. 
// 이때, 모든 게임 이용자를 감당하기 위한 최소 서버 증설 횟수를 return 
//0~24
//remainTime에 아직 시간이 껴있는데 m보다 크면 서버 증설X

//틀림-> 서버마다 만료시간 관리해야함
//남아있는 서버수랑 필요한 서버수 관리

function solution(players, m, k) {
let server = 0;
let serverCnt = 0;
let remainTime = 0;
const serverArr = new Array(players.length).fill(0);

//시간(i번째) = [서버수] //서버수가 0보다 크면 i + k 만료
    for(let i=0;i<players.length;i++){
        // if(remainTime<=i && server) server--;//서버 유지시간 끝나면 serverCnt--
        if(i-k>=0&&serverArr[i-k]){ //만료 시간에 서버증설대수가 있을때 만료시키기
            server-=serverArr[i-k]
        }
        if(players[i]>=m){ //remainTime에 안걸려 있으면 서버 증설
            //현재 필요한 서버수: Math.floor(players[i]/m)
            const need = Math.floor(players[i]/m);
            if(server<need)
                serverArr[i] = need-server; //추가로 증설될 서버수
            serverCnt+=serverArr[i];
            server+=serverArr[i];
            // remainTime = i+k;
        }
        // console.log(`${i}시~${i+1}시 게임이용자수: ${players[i]} 서버 수:${server} 증설횟수:${serverCnt} 유지시간:${remainTime}`)
    }
    return serverCnt;
}