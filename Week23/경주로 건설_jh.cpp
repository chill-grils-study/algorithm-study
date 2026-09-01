#include <string>
#include <vector>
#include <queue>
#include <tuple>
#include <math.h>

using namespace std;

// ㅋ 바로 피티 도움 받아야 되는 것 봐 .. ^^
// 처음에는 bfs + 완탐으로 모든 경로 탐색하려고 했지만 틀림
// 사실 이렇게 무작정 탐색하면 최적의 경로를 찾을 수 없음.. 나도 알지만 .. 애싸 묻어두고 일단 해봤음...
int bfs(vector<vector<int>> &board) {
    const int N = board.size();
    int minAmount = 25 * 25 * 100 * 500;
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    vector<vector<bool>> visited(N, vector<bool>(N, false));
    queue<tuple<int, int, int, int>> q;
    
    q.push({0, 0, 0, -1});
    visited[0][0] = true;
    
    while(!q.empty()) {
        auto [curX, curY, curAmount, curDirection] = q.front();
        q.pop();
        
        if(curX == N - 1 && curY == N - 1) {
            minAmount = min(minAmount, curAmount);
            continue;
        }
        
        for(int i = 0; i < 4; i++) {
            int nextX = curX + directions[i][0];
            int nextY = curY + directions[i][1];
            int nextAmount = curAmount;

            if(nextX < 0 || nextX >= N || nextY < 0 || nextY >= N || board[nextX][nextY] == 1 || visited[nextX][nextY]) {
                continue;
            }
            if(curDirection != -1 && curDirection != i) {
                nextAmount += 500;
            }
            nextAmount += 100;
            visited[nextX][nextY] = true;
            q.push({nextX, nextY, nextAmount, i});
        }
    }
    
    return minAmount;
}

int solution(vector<vector<int>> board) {
    return bfs(board);
}

// 피티의 도움을 받아.. ㅠ visited 표시 로직을 수정함.
// 단순히 한번 방문한 정점을 표시하는게 아니라!!
// 각 정점에 도달할 때의 방향별 최소비용을 저장한다.
int bfs(vector<vector<int>> &board) {
    const int N = board.size();
    int minAmount = 25 * 25 * 100 * 500;
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    vector<vector<vector<int>>> amountInfo(N, vector<vector<int>>(N, vector<int>(4, minAmount)));
    // 현재 X/Y, 현재 비용, 현재 방향 
    queue<tuple<int, int, int, int>> q;
    // 처음에는 지정된 방향이 없으므로 -1로 뒀음
    q.push({0, 0, 0, -1});
    // 시작점은 모든 방향의 최소 비용을 0으로 둠
    for(int i = 0; i < 4; i++) {
        amountInfo[0][0][i] = 0;
    }
    
    while(!q.empty()) {
        auto [curX, curY, curAmount, curDirection] = q.front();
        q.pop();
        
        for(int i = 0; i < 4; i++) {
            int nextX = curX + directions[i][0];
            int nextY = curY + directions[i][1];
            int nextAmount = curAmount;

            if(nextX < 0 || nextX >= N || nextY < 0 || nextY >= N || board[nextX][nextY] == 1) {
                continue;
            }
            // 현재 방향과 다음에 가야 할 방향이 다르면 코너 비용 추가
            if(curDirection != -1 && curDirection != i) {
                nextAmount += 500;
            }
            // 일반 비용 추가
            nextAmount += 100;
            // 다음 정점을 같은 방향에서 방문한 적이 있고, 지금 계산한 비용이 저장된 비용보다 작다면
            // 비용을 갱신해준 후 큐에 다음 정점 추가
            // ** 저장된 비용이 적다면 더 탐색할 필요가 없음.
            if(amountInfo[nextX][nextY][i] > nextAmount) {
                amountInfo[nextX][nextY][i] = nextAmount;
                q.push({nextX, nextY, nextAmount, i});   
            }
        }
    }
    
    return *min_element(amountInfo[N - 1][N - 1].begin(), amountInfo[N - 1][N - 1].end());
}

int solution(vector<vector<int>> board) {
    return bfs(board);
}