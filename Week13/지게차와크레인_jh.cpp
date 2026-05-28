#include <string>
#include <vector>
#include <iostream>
#include <queue>

using namespace std;

// 처음 풀이. 시간초과 났구요....ㅋ
// 크레인 쓸 수 있으면 타겟 보일 때마다 빈칸 만들어주고
int removeContainerWithCrane(vector<string>& storage, char target) {
    const int rows = storage.size();
    const int columns = storage[0].size();
    int removeCnt = 0;
    
    for(int i = 0; i < rows; i++) {
        for(int j = 0; j < columns; j++) {
            if(storage[i][j] == target) {
                removeCnt++;
                storage[i][j] = '0';
            }
        }
    }
    
    return removeCnt;
}

bool bfs(vector<string>& storage, int startX, int startY) {
    const int rows = storage.size();
    const int columns = storage[0].size();
    vector<vector<bool>> visited(rows, vector<bool>(columns, false));
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    queue<pair<int, int>> q;
    
    visited[startX][startY] = true;
    q.push({startX, startY});
    
    while(!q.empty()) {
        auto [currentX, currentY] = q.front();
        q.pop();
        
        for(auto [directionX, directionY] : directions) {
            int nextX = currentX + directionX;
            int nextY = currentY + directionY;
            
            if(nextX < 0 || nextX >= rows || nextY < 0 || nextY >= columns) {
                return true;
            }
            
            if(storage[nextX][nextY] == '0') {
                q.push({nextX, nextY});
                visited[nextX][nextY] = true;
            }
        }
    }
    
    return false;
}
// 크레인 없이 제거해야 되면 해당 타겟 지점부터 bfs로 상하좌우로 이동하면서 외부랑 연결되어 있는지 확인하려고 했음
int removeContainerWithoutCrane(vector<string>& storage, char target) {
    const int rows = storage.size();
    const int columns = storage[0].size();
    vector<pair<int, int>> willChangeArea;
    int removeCnt = 0;
    
    for(int i = 0; i < rows; i++) {
        for(int j = 0; j < columns; j++) {
            if(storage[i][j] == target) {
                if(bfs(storage, i, j)) {
                    removeCnt++;
                    willChangeArea.push_back({i, j});
                }
            }
        }
    }
    
    for(auto [x, y] : willChangeArea) {
        storage[x][y] = '0';
    }
    
    return removeCnt;
}

int solution(vector<string> storage, vector<string> requests) {
    const int requestSize = requests.size();
    int answer = storage.size() * storage[0].length();
    
    for(int i = 0; i < requestSize; i++) {
        if(requests[i].length() == 2) {
            answer -= removeContainerWithCrane(storage, requests[i][0]);
        } else {
            answer -= removeContainerWithoutCrane(storage, requests[i][0]);
        }
    }
    
    return answer;
}

// 컨테이너에서 바깥을 찾는게 아니라 바깥에서 컨테이너를 찾는다!!!!!
int removeContainerWithCrane(vector<vector<char>>& storage, char target, int rows, int columns) {
    int removeCnt = 0;
    
    for(int i = 0; i < rows; i++) {
        for(int j = 0; j < columns; j++) {
            if(storage[i][j] == target) {
                removeCnt++;
                storage[i][j] = '0';
            }
        }
    }
    
    return removeCnt;
}

int removeContainerWithoutCrane(vector<vector<char>>& storage, char target, int rows, int columns) {
    vector<vector<bool>> visited(rows, vector<bool>(columns, false));
    queue<pair<int, int>> q;
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    int removeCnt = 0;
    
    // 0, 0부터 시작
    visited[0][0] = true;
    q.push({0, 0});
    // 바깥과 연결된 칸은 visited true 표시
    while(!q.empty()) {
        auto [currentX, currentY] = q.front();
        q.pop();
        
        for(auto [directionX, directionY] : directions) {
            int nextX = currentX + directionX;
            int nextY = currentY + directionY;
            
            if(nextX < 0 || nextX >= rows || nextY < 0 || nextY >= columns || visited[nextX][nextY] || storage[nextX][nextY] != '0') {
                continue;
            }
            
            q.push({nextX, nextY});
            visited[nextX][nextY] = true;
        }
    }
    
    for(int i = 0; i < rows; i++) {
        for(int j = 0; j < columns; j++) {
            // 현재 칸과 맞닿은 4면 중 하나라도 바깥과 연결된 칸이 있다면 해당 컨테이너 제거 가능
            if(storage[i][j] == target) {
                for(auto [directionX, directionY] : directions) {
                    int nextX = i + directionX;
                    int nextY = j + directionY;
                    
                    if(visited[nextX][nextY]) {
                        removeCnt++;
                        storage[i][j] = '0';
                        break;
                    }
                }
            }
        }
    }
    
    return removeCnt;
}

int solution(vector<string> storage, vector<string> requests) {
    const int rows = storage.size() + 2;
    const int columns = storage[0].size() + 2;
    // 기존 맵을 감싸는 패딩을 넣어줌.
    //  00000
    //  0xaz0
    //  00000
    // 패딩을 사용하는 이유는 바깥과 연결된 컨테이너를 쉽게 찾기 위함
    vector<vector<char>> map(rows, vector<char>(columns, '0'));
    int answer = storage.size() * storage[0].length();
    
    for(int i = 1; i < rows - 1; i++) {
        for(int j = 1; j < columns - 1; j++) {
            map[i][j] = storage[i - 1][j - 1];
        }
    }
    
    for(string request : requests) {
        if(request.length() == 2) {
            answer -= removeContainerWithCrane(map, request[0], rows,  columns);
        } else {
            answer -= removeContainerWithoutCrane(map, request[0], rows, columns);
        }
    }
    
    return answer;
}