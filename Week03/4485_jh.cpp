#include <iostream>
#include <queue>
#include <vector>
#include <tuple>
#include <functional>

using namespace std;

// 시간복잡도: O(N^2 logN) -> 다익스트라 + 우선순위 큐 사용
// 공간복잡도: O(N^2)
// 다익스트라는 현재까지 가장 비용이 작은 경로부터 확장한다.
int dijkstra(vector<vector<int>>& cave, int N) {
    const int INF = 987654321;

    priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> queue;
    vector<vector<int>> points(N, vector<int>(N, INF));
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

    queue.push({cave[0][0], 0, 0});
    points[0][0] = cave[0][0];

    while(!queue.empty()) {
        auto [curPoint, curX, curY] = queue.top();
        queue.pop();

        for(auto direction : directions) {
            int nextX = curX + direction[0];
            int nextY = curY + direction[1];

            if(nextX < 0 || nextX >= N || nextY < 0 || nextY >= N) {
                continue;
            }

            int nextPoint = curPoint + cave[nextX][nextY];

            if(nextPoint < points[nextX][nextY]) {
                points[nextX][nextY] = nextPoint;
                queue.push({ nextPoint, nextX, nextY });
            }
        }
    }

    return points[N - 1][N - 1];
}

int main() {
    int problemNum = 1;

    while(true) {
        int N;
        cin >> N;

        if(N == 0) {
            break;
        }

        vector<vector<int>> cave(N, vector<int>(N));

        for(int i = 0; i < N; i++) {
            for(int j = 0; j < N; j++) {
                cin >> cave[i][j];
            }
        }

        cout << "Problem " << problemNum << ": " << dijkstra(cave, N)<< '\n';

        problemNum++;
    }

    return 0;
}