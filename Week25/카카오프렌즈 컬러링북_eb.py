def solution(m, n, picture):
    visited = [[False] * n for _ in range(m)]
    dx = [0, 0, -1, 1]
    dy = [-1, 1, 0, 0]

    area_count = 0
    max_area = 0

    def dfs(color, x, y):
        visited[x][y] = True
        area = 1

        for i in range(4):
            nx = dx[i] + x
            ny = dy[i] + y

            if 0 <= nx < m and 0 <= ny < n:
                if picture[nx][ny] == color and not visited[nx][ny]:
                    area += dfs(color, nx, ny)

        return area

    for i in range(m):
        for j in range(n):
            if picture[i][j] != 0 and not visited[i][j]:
                current_area = dfs(picture[i][j], i, j)
                area_count += 1
                max_area = max(max_area, current_area)

    return [area_count, max_area]

# C++
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<bool>> visited;
vector<int> dx = {0, 0, -1, 1};
vector<int> dy = {-1, 1, 0, 0};
vector<vector<int>> picture;

int m, n;

int dfs(int color, int x, int y) {
    visited[x][y] = true;

    int area = 1;

    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i];
        int ny = y + dy[i];

        if (0 <= nx && nx < m && 0 <= ny && ny < n) {
            if (picture[nx][ny] == color && !visited[nx][ny]) {
                area += dfs(color, nx, ny);
            }
        }
    }

    return area;
}

vector<int> solution(int M, int N, vector<vector<int>> P) {
    m = M;
    n = N;
    picture = P;

    visited = vector<vector<bool>>(m, vector<bool>(n, false));

    int area_count = 0;
    int max_area = 0;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (picture[i][j] != 0 && !visited[i][j]) {
                int current_area = dfs(picture[i][j], i, j);

                area_count++;
                max_area = max(max_area, current_area);
            }
        }
    }

    return {area_count, max_area};
}
