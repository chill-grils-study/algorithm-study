#include <string>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

// 오랜만에 스근~하게 풀어서 정말 기뻤다죠.
// 풀이 다 똑같을듯...
int bfs(vector<int> start, vector<string> &maps, vector<vector<bool>> &visited, int N, int M) {
    int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    queue<pair<int, int>> q;
    int total = maps[start[0]][start[1]] - '0';
        
    visited[start[0]][start[1]] = true;
    q.push({start[0], start[1]});
    
    while(!q.empty()) {
        auto [curX, curY] = q.front();
        q.pop();
        
        for(auto direction : directions) {
            int nextX = curX + direction[0];
            int nextY = curY + direction[1];
            
            if(nextX < 0 || nextX >= N || nextY < 0 || nextY >= M || visited[nextX][nextY] || maps[nextX][nextY] == 'X') {
                continue;
            }
            
            q.push({nextX, nextY});
            visited[nextX][nextY] = true;
            total += maps[nextX][nextY] - '0';
        }
    }
    
    return total;
}

vector<int> solution(vector<string> maps) {
    const int N = maps.size();
    const int M = maps[0].size();
    vector<vector<bool>> visited(N, vector<bool>(M, false));
    vector<int> answer;
    
    for(int i = 0; i < N; i++) {
        for(int j = 0; j < M; j++) {
            if(maps[i][j] != 'X' && !visited[i][j]) {
                int total = bfs(vector<int>{i, j}, maps, visited, N, M);
                answer.push_back(total);
            }
        }
    }
    
    if(answer.empty()) {
        answer.push_back(-1);
    } 
    
    sort(answer.begin(), answer.end());
    
    return answer;
}