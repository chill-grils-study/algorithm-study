#include <string>
#include <vector>
#include <queue>

using namespace std;

// 이건 혼자 풀었다.. 흑흑흑
// 문제 봤을 때 무조건 큐로 풀어야겠다 생각했슨
int solution(vector<int> players, int m, int k) {
    const int length = players.size();
    // 추가된 서버 개수와 시간 저장
    queue<pair<int, int>> server;
    // 현재 돌아가는 서버 개수와 정답 변수
    int serverCnt = 0, answer = 0;
    
    for(int i = 0; i < length; i++) {
        // 가장 먼저 증설된 서버를 반납해야 한다면
        if(!server.empty() && server.front().second + k == i) {
            // 현재 서버 개수 감소시키고 큐에서 제거
            serverCnt -= server.front().first;
            server.pop();
        }
        // 새로 증설해야 하는 서버 개수
        const int newServerCnt = players[i] / m - serverCnt;
        // 증설해야 한다면
        if(newServerCnt > 0) {
            // 정답이랑 현재 돌아가는 서버 대수 증가시키고 큐에 넣어줌
            answer += newServerCnt;
            serverCnt += newServerCnt;
            server.push({newServerCnt, i});
        }
    }
    
    return answer;
}