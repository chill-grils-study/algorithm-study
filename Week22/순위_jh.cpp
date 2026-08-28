#include <string>
#include <vector>
#include <math.h>
#include <queue>
using namespace std;

// 그래프 문제인걸 봐버려서 처음부터 풀이를 그래프 쪽으로 생각함..
// 처음엔 한번만 탐색하는걸 생각해보다가 피티가 두번 탐색하는게 쉽다고 알려줌
// 핵심은 내가 몇명한테 이겼나!! 졌나!!를 따로 탐색
void bfs(vector<vector<int>> &graph, vector<vector<int>> &rankInfo, bool isWin, int n) {
    int rankSecondIndex = isWin ? 0 : 1;
    queue<int> q;
    // 모든 정점이 연결되어 있는게 아니기 때문에 모든 정점을 처음부터 탐색해야 함
    for(int i = 0; i < n; i++) {
        // **출발점이 변경될 때마다 방문 배열 새로 생성**
        // 탐색의 기준은 첫 출발점!!! (방문 배열 매번 갱신하는건 피티가 알려줌,,)
        vector<int> visited(n, false);
        visited[i] = true;
        q.push(i);
        while(!q.empty())  {
            int curPos = q.front();
            q.pop();
            // 이긴 선수 큐에 넣어가면서 계속 탐색
            // 1: [2]
            // 2: [5]
            // 3: [2]
            // 4: [3, 2]
            for(int next : graph[curPos]) {
                if(!visited[next]) {
                    q.push(next);
                    visited[next] = true;
                    // 여기 첨에 일반 bfs처럼 i가 아니라 next를 넣어서 틀렸음.
                    // 중요한 건 시작점이 몇명 이겼냐임
                    rankInfo[i][rankSecondIndex]++;
                }
            }
        }
    }
}

int solution(int n, vector<vector<int>> results) {
    // 누구한테 이겼는지 저장
    vector<vector<int>> wins(n, vector<int>());
    // 누구한테 졌는지 저장
    vector<vector<int>> loses(n, vector<int>());
    vector<vector<int>> rankInfo(n, vector<int>(2, 0));
    
    for(vector<int> result : results) {
        int win = result[0] - 1;
        int lose = result[1] - 1;
        
        wins[win].push_back(lose);
        loses[lose].push_back(win);
    }
    
    bfs(wins, rankInfo, true, n);
    bfs(loses, rankInfo, false, n);
    
    int result = 0;
    
    for(vector<int> rank : rankInfo) {
        // 아래 조건을 만족하면 정확하게 순위를 메길 수 있음
        // 나 제외 다른 선수들과 모두 겨뤄본 것과 같음
        if(rank[0] + rank[1] == n - 1) {
            result++;
        }
    }
    
    return result;
}