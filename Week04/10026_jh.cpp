#include <iostream>
#include <vector>
#include <queue>
#include <functional>
#include <algorithm>

using namespace std;

// 야하~! 한번에 풀었다 얏호!
// 시간복잡도: O(N*2)
// 공간복잡도: O(N*2)
// bfs 늘 하던대로, ,풀엇어요
void bfs(const vector<vector<char>>& map, vector<vector<bool>>& visited, int startX, int startY, int N) {
    queue<pair<int, int>> queue;
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    
    visited[startX][startY] = true;
    queue.push({startX, startY});

    while(!queue.empty()) {
        auto [currentX, currentY] = queue.front();
        char currentColor = map[currentX][currentY];

        queue.pop();

        for(auto [moveX, moveY]: directions) {
            int nextX = currentX + moveX;
            int nextY = currentY + moveY;

            if(nextX < 0 || nextX >= N || nextY < 0 || nextY >= N || visited[nextX][nextY] || map[nextX][nextY] != map[currentX][currentY]) {
                continue;
            }

            queue.push({nextX, nextY});
            visited[nextX][nextY] = true;
        }
    }

    return;
}

int main() {
    int N, 적록색약_count = 0, 비적록색약_count = 0;
    
    cin >> N;

    vector<vector<char>> map(N, vector<char>(N));

    for(int i = 0; i < N; i++) {
        for(int j = 0; j < N; j++) {
            cin >> map[i][j];
        }
    }

    vector<vector<bool>> 비적록색약_visited(N, vector<bool>(N, false));
    // 각 구역의 개수를 구해야 하니깐 말이죵
    // 이중 반복문 돌렷~!
    for(int i = 0; i < N; i++) {
        for(int j = 0; j < N; j++) {
            if(!비적록색약_visited[i][j]) {
                bfs(map, 비적록색약_visited, i, j, N);
                비적록색약_count++;
            }
        }
    }
    
    vector<vector<bool>> 적록색약_visited(N, vector<bool>(N, false));
    // 적록색약이 있으시니깐,, 초록색을 기냥 빨간색으로 바꿔버렸어요 후훟
    // 이거 말고 더 기깔난 방법이 있을 것 같쥐만? 아 귀찬하 .. 걍 해. !
    for(int i = 0; i < N; i++) {
        for(int j = 0; j < N; j++) {
            if(map[i][j] == 'G') {
                map[i][j] = 'R';
            }
        }
    }

     for(int i = 0; i < N; i++) {
        for(int j = 0; j < N; j++) {
            if(!적록색약_visited[i][j]) {
                bfs(map, 적록색약_visited, i, j, N);
                적록색약_count++;
            }
        }
    }

    cout << 비적록색약_count << " " << 적록색약_count;

    return 0;
}
