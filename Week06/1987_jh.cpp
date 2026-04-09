#include <iostream>
#include <vector>
#include <string>
#include <math.h>

using namespace std;

// 첫번째 풀이, 접근도 맞고 잘 풀었는데 dfs 인자가 너무 많아서 찝찝
// 백트래킹, dfs로 풀었슨
// 시간복잡도: O(4^k), 공간복잡도: O(R * C)
int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
int maxCount = 0;

void dfs(int curX, int curY, vector<bool> visited, vector<vector<char>> map, int R, int C, int count) {
    for(auto [dirX, dirY] : directions) {
        int nextX = curX + dirX;
        int nextY = curY + dirY;
        
        if(nextX < 0 || nextX >= R || nextY < 0 || nextY >= C) {
            continue;
        }

        int nextCharIndex = (int)map[nextX][nextY] - (int)'A';
        if(visited[nextCharIndex]) {
            continue;
        }

        visited[nextCharIndex] = true;
        dfs(nextX, nextY, visited, map, R, C, count + 1);
        visited[nextCharIndex] = false;
    }

    maxCount = max(maxCount, count);
}

int main() {
    int R, C;

    cin >> R >> C;

    vector<vector<char>> map(R, vector<char> (C));

    for(int i = 0; i < R; i++) {
        for(int j = 0; j < C; j++) {
            cin >> map[i][j];
        }
    }

    int visitedSize = ((int)'Z' - (int)'A') + 1;
    vector<bool> visited(visitedSize, false);    

    int curCharIndex = (int)map[0][0] - (int)'A';
    visited[curCharIndex] = true;

    dfs(0, 0, visited, map, R, C, 1);

    cout << maxCount;

    return 0;
}

// 두번째! dfs 인자 몇개를 전역변수로 뺌
// 훨씬 깔끔~
int R, C;
vector<string> map; // map은 string으로 선언하고
bool visited[26];
int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
int maxCount = 0;

void dfs(int curX, int curY, int count) {
    for(auto [dirX, dirY] : directions) {
        int nextX = curX + dirX;
        int nextY = curY + dirY;
        
        if(nextX < 0 || nextX >= R || nextY < 0 || nextY >= C) {
            continue;
        }

        int nextCharIndex = (int)map[nextX][nextY] - (int)'A';
        if(visited[nextCharIndex]) {
            continue;
        }

        visited[nextCharIndex] = true;
        dfs(nextX, nextY, count + 1);
        visited[nextCharIndex] = false;
    }

    maxCount = max(maxCount, count);
}

int main() {
    cin >> R >> C;

    map.resize(R); // 이렇게 리사이징 하면 된다.

    for(int i = 0; i < R; i++) {
        cin >> map[i]; // string에서 char는 원래도 인덱스로 접근 가능했으니까!
    }

    int curCharIndex = (int)map[0][0] - (int)'A';
    visited[curCharIndex] = true;

    dfs(0, 0, 1);

    cout << maxCount;

    return 0;
}

