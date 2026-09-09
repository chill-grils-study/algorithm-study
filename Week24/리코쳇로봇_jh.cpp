#include <string>
#include <vector>
#include <tuple>
#include <algorithm>
#include <stack>

using namespace std;

// 저번주에 푼 경주로 건설이랑 비슷하게 접근.
// 근데 구현하고 보니까 한방향으로 쭉 가도록 구현하지 않았음
int dfs(vector<string> board) {
    const int MAX_NUM = 1000;
    const int ROWS = board.size();
    const int COLUMNS = board[0].size();
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    vector<vector<vector<int>>> info(ROWS, vector<vector<int>>(COLUMNS, vector<int>(4, MAX_NUM)));
    stack<tuple<int, int, int, int>> s;
    
    int startX = -1, startY = -1;
    int minCnt = MAX_NUM;
    
    for(int i = 0; i < ROWS; i++) {
        for(int j = 0; j < COLUMNS; j++) {
            if(board[i][j] == 'R') {
                startX = i;
                startY = j;
                break;
            }
        }
        if(startX != -1) {
            break;
        }
    }
    
    for(int i = 0; i < 4; i++) {
        info[startX][startY][i] = 0;
    }
    
    s.push({startX, startY, 0, -1});
    
    while(!s.empty()) {
        auto [curX, curY, curCnt, curDir] = s.top();
        s.pop();
        
        for(int i = 0; i < 4; i++) {
            int nextX = curX + directions[i][0];
            int nextY = curY + directions[i][1];
            int nextCnt = curCnt + (curDir == i ? 0 : 1);
            
            if(nextX < 0 || nextX >= ROWS || nextY < 0 || nextY >= COLUMNS || board[nextX][nextY] == 'D') {
                if(board[curX][curY] == 'G' && curDir == i) {
                    minCnt = min(minCnt, curCnt);
                }
                continue;
            }
            
            if(info[nextX][nextY][i] > nextCnt) {
                info[nextX][nextY][i] = nextCnt;
                s.push({nextX, nextY, nextCnt, i});
            }
        }
    }
    
    return minCnt == MAX_NUM ? -1 : minCnt;
}

int solution(vector<string> board) {
    return dfs(board);
}


// 두번재 풀이. 맞추긴 했음
// 1. 한 방향으로 쭉 간다
// 2. 막히면 방향을 틀어서 또 쭉 간다
// 아 더 깔끔한 코드로 수정하고 싶은데 힘들어요.. 빈이나 정우거 볼래요
#include <string>
#include <vector>
#include <tuple>
#include <algorithm>
#include <stack>

using namespace std;

int dfs(vector<string> board) {
    const int MAX_NUM = 1000;
    const int ROWS = board.size();
    const int COLUMNS = board[0].size();
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    vector<vector<vector<int>>> info(ROWS, vector<vector<int>>(COLUMNS, vector<int>(4, MAX_NUM)));
    stack<tuple<int, int, int, int>> s;
    
    int startX = -1, startY = -1;
    int minCnt = MAX_NUM;
    
    for(int i = 0; i < ROWS; i++) {
        for(int j = 0; j < COLUMNS; j++) {
            if(board[i][j] == 'R') {
                startX = i;
                startY = j;
                break;
            }
        }
        if(startX != -1) {
            break;
        }
    }
    
    for(int i = 0; i < 4; i++) {
        info[startX][startY][i] = 0;
    }
    
    s.push({startX, startY, 0, -1});
    
    while(!s.empty()) {
        auto [curX, curY, curCnt, curDir] = s.top();
        
        s.pop();
        // 일단 현재 방향으로 쭉 가본다.!
        int nextX = curX + directions[curDir][0];
        int nextY = curY + directions[curDir][1];
        // 다음 칸으로 더 이동할 수 없다면
         if(nextX < 0 || nextX >= ROWS || nextY < 0 || nextY >= COLUMNS || board[nextX][nextY] == 'D') {
            // 현재 칸이 G면 정답 갱신
            if(board[curX][curY] == 'G') {
                minCnt = min(minCnt, curCnt);
            }
            // 방향을 틀어서 다음 칸으로 갈 수 있으면 간다.
            for(int i = 0; i < 4; i++) {
                if(curDir == i) continue;
                
                int nextX = curX + directions[i][0];
                int nextY = curY + directions[i][1];
                int nextCnt = curCnt + 1;
                
                if(nextX < 0 || nextX >= ROWS || nextY < 0 || nextY >= COLUMNS || board[nextX][nextY] == 'D') {
                    continue;
                }
                // 이번 탐색으로 최소값을 찾을 수 있는거라면 쭉 탐색
                if(info[nextX][nextY][i] > nextCnt) {
                    info[nextX][nextY][i] = nextCnt;
                    s.push({nextX, nextY, nextCnt, i});
                }
            }
         } else {
             if(info[nextX][nextY][curDir] > curCnt) {
                info[nextX][nextY][curDir] = curCnt;
                s.push({nextX, nextY, curCnt, curDir});
            }
         }
    }
    
    return minCnt == MAX_NUM ? -1 : minCnt;
}

int solution(vector<string> board) {
    return dfs(board);
}