#include <iostream>
#include <queue>
#include <tuple>
#include <vector>
#include <math.h>

using namespace std;

struct Node {
    int z, y, x, day;
};

// 시간복잡도, 공간복잡도: O(H * N * M)
// 3차원 배열을 쓰는 단순 bfs!
int main() {
    int M, N, H;

    cin >> M >> N >> H;

    vector<vector<vector<int>>> tomatoes(H, vector<vector<int>>(N, vector<int>(M)));
    queue<Node> next;
    
    for(int k = 0; k < H; k++) {
        for(int i = 0; i < N; i++) {
            for(int j = 0; j < M; j++) {
                cin >> tomatoes[k][i][j];
                // 익은 토마트의 위치를 큐에 넣어줌
                if(tomatoes[k][i][j] == 1) {
                    next.push({k, i, j, 0});
                }
            }
        }
    }

    int directions[6][3] = {{1, 0, 0}, {-1, 0, 0}, {0, 0, -1}, {0, 0, 1}, {0, 1, 0}, {0, -1, 0}};
    int day = 0;

    while(!next.empty()) {
        auto [curZ, curX, curY, curDay] = next.front();
        next.pop();

        day = max(day, curDay);
        // 앞뒤위아래왼오 다 확인
        for(auto [dirZ, dirX, dirY] : directions) {
            int nextX = curX + dirX;
            int nextY = curY + dirY;
            int nextZ = curZ + dirZ;

            if(nextX < 0 || nextX >= N || nextY < 0 || nextY >= M || nextZ < 0 || nextZ >= H) {
                continue;
            }
            if(tomatoes[nextZ][nextX][nextY] != 0) {
                continue;
            }

            next.push({nextZ, nextX, nextY, curDay + 1});
            tomatoes[nextZ][nextX][nextY] = 1;
        }
    }

    bool isRipe = true;

    for(int k = 0; k < H; k++) {
        for(int i = 0; i < N; i++) {
            for(int j = 0; j < M; j++) {
                // 아직 덜 익은 토마토가 있다면 break;
                if(tomatoes[k][i][j] == 0) {
                    isRipe = false;
                    break;
                }
            }
            if(!isRipe) break;
        }
        if(!isRipe) break;
    }

    if(isRipe) {
        cout << day;
    } else {
        cout << -1;
    }

    return 0;
}
