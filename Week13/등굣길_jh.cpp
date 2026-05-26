#include <string>
#include <vector>

using namespace std;

// 집에서 학교로 빨리 가려면 결국 오른쪽이나 아래로 이동해야 함
int solution(int m, int n, vector<vector<int>> puddles) {
    const int MOD = 1000000007;
    // 지역 정보 표시할 배열
    vector<vector<int>> map(n, vector<int>(m, 0));
    vector<vector<int>> dp(n, vector<int>(m, 0));
    
    for(auto puddle : puddles) {
        // 물에 잠긴 좌표는 1로 표시
        // 문제에서 x, y 좌표가 반대로 주어지고 있음!!!
        map[puddle[1] - 1][puddle[0] - 1] = 1;
    }
    
    for(int i = 0; i < n; i++) {
        // 중간에 물 웅덩이를 만나면 더 이상 밑으로 내려갈 수 없으므로 break
        if(map[i][0] == 1) {
            break;
        }
        dp[i][0] = 1;
    }
    
    for(int j = 0; j < m; j++) {
        // 중간에 물 웅덩이를 만나면 더 이상 옆으로 갈 수 없으므로 break
        if(map[0][j] == 1) {
            break;
        }
        dp[0][j] = 1;
    }
    
    for(int i = 1; i < n; i++) {
        for(int j = 1; j < m; j++) {
            // 현재 좌표가 물 웅덩이가 아닐 때
            if(map[i][j] != 1) {
                // 위에서 내려오는 경로와 왼쪽에서 오는 경로를 더함
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;             
            }
        }
    }
    
    return dp[n - 1][m - 1];
}