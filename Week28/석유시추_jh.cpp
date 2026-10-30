#include <string>
#include <vector>
#include <queue>
#include <utility>
#include <math.h>

using namespace std;

// 쩜 더럽게 푼 것 같읍니다!^^ 하지만 풀었다는게 중요한 것 아니겠어요.ㅎ
void bfs(int num, int startX, int startY, int N, int M, vector<vector<int>> &land, vector<vector<pair<int, int>>> &area, vector<vector<bool>> &visited) {
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    queue<pair<int, int>> nextQ;
    queue<pair<int, int>> prevQ;
    int cnt = 1;
    
    visited[startX][startY] = true;
    // 다음에 방문할 블럭과 지금까지 방문한 블럭을 같이 기록
    nextQ.push({startX, startY});
    prevQ.push({startX, startY});
    
    while(!nextQ.empty()) {
        auto [curX, curY] = nextQ.front();
        nextQ.pop();
        
        for(auto direction : directions) {
            int nextX = curX + direction[0];
            int nextY = curY + direction[1];
            
            if(nextX < 0 || nextX >= N || nextY < 0 || nextY >= M || land[nextX][nextY] == 0 || visited[nextX][nextY]) {
                continue;
            }
            
            nextQ.push({nextX, nextY});
            prevQ.push({nextX, nextY});
            visited[nextX][nextY] = true;
            cnt++;
        }
    }

    while(!prevQ.empty()) {
        auto [curX, curY] = prevQ.front();
        prevQ.pop();
        // 지금까지 방문한 블럭에 영역 번호와 시추량을 각각 저장
        area[curX][curY].first = num;
        area[curX][curY].second = cnt;
    }
}

int solution(vector<vector<int>> land) {
    const int N = land.size();
    const int M = land[0].size();
    // 각 블럭에서 뽑을 수 있는 시추량 저장.
    // {영역 번호, 시추량}을 같이 저장해서 영역 구분
    vector<vector<pair<int, int>>> area(N, vector<pair<int, int>>(M, {-1, -1}));
    vector<vector<bool>> visited(N, vector<bool>(M, false));
    int num = 0;
    int answer = 0;
    
    for(int i = 0; i < N; i++) {
        for(int j = 0; j < M; j++) {
            if(!visited[i][j] && land[i][j] == 1) {
                bfs(num, i, j, N, M, land, area, visited);
                num++;
            }
        }
    }
        
    for(int j = 0; j < M; j++) {
        // 현재 열에서 시추관을 뚫었을 때 뽑을 수 있는 석유량
        // 블럭의 영역 번호를 인덱스로 사용 -> 같은 영역을 여러번 지나가도 시추량은 한번만 계산할 수 있음
        vector<int> 석유량(num, 0);
        for(int i = 0; i < N; i++) {
            // 현재 블럭에 석유가 매장되어 있다면
            if(area[i][j].first != -1) {
                // 석유량 저장
                석유량[area[i][j].first] = area[i][j].second;
            }
        }
        // 현재 열에서 뽑을 수 있는 석유량 계산
        int curMaxArea = 0;
        for(int i = 0; i < num; i++) {
            curMaxArea += 석유량[i];
        } // 최댓값 갱신
        answer = max(answer, curMaxArea);
    }
    
    return answer;
}