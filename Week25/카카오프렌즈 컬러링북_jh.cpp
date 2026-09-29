#include <vector>
#include <utility>
#include <algorithm>
#include <queue>
using namespace std;

int bfs(int startX, int startY, int m, int n, vector<vector<bool>> &visited, vector<vector<int>> &picture) {
    queue<pair<int, int>> q;
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    int curArea = 1;
    int curNum = picture[startX][startY];
    
    visited[startX][startY] = true;
    q.push({startX, startY});
    
    while(!q.empty()) {
        auto [curX, curY] = q.front();
        q.pop();
        
        for(auto direction : directions) {
            int nextX = curX + direction[0];
            int nextY = curY + direction[1];
            
            if(nextX < 0 || nextX >= m || nextY < 0 || nextY >= n || visited[nextX][nextY] || picture[nextX][nextY] != curNum) {
                continue;
            }
            
            visited[nextX][nextY] = true;
            q.push({nextX, nextY});
            curArea++;
        }
    }

    return curArea;
} 

vector<int> solution(int m, int n, vector<vector<int>> picture) {
    vector<vector<bool>> visited(m, vector<bool>(n, false));
    int totalAreaCnt = 0;
    int maxArea = 0;
    
    // ㅎㅎ 처음에는 어피치 눈이랑 입이 빈칸인줄 알고,, 그림의 바깥 영역을 미리 체크하려고 했음
    // 근데 눈이랑 코도 검은색으로 칠해진거더만~~
    // for(int i = 0; i < m; i++) {
    //     if(!visited[i][0] && picture[i][0] == 0) {
    //         bfs(i, 0, m, n, visited, picture);
    //     }
    // }
    // for(int i = 0; i < m; i++) {
    //     if(!visited[i][n - 1] && picture[i][n - 1] == 0) {
    //         bfs(i, n - 1, m, n, visited, picture);
    //     }
    // }
    // for(int j = 0; j < n; j++) {
    //     if(!visited[0][j] && picture[0][j] == 0) {
    //         bfs(0, j, m, n, visited, picture);
    //     }
    // }
    // for(int j = 0; j < n; j++) {
    //     if(!visited[m - 1][j] && picture[m - 1][j] == 0) {
    //         bfs(m - 1, j, m, n, visited, picture);
    //     }
    // }
    
    for(int i = 0; i < m; i++) {
        for(int j = 0; j < n; j++) {
            // 빈칸이면 검사 안 함
            if(!visited[i][j] && picture[i][j] != 0) {
                int curArea = bfs(i, j, m, n, visited, picture);
                totalAreaCnt++;
                maxArea = max(maxArea, curArea);
            }
        }
    }
    
    return {totalAreaCnt, maxArea};
}