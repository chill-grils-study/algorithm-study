#include <string>
#include <vector>

using namespace std;

int solution(int n, vector<int> money) {
    const int MOD = 1000000007;
    vector<int> dp(n + 1, 0);
    // 0원을 만드는 경우는 1가지. 동전을 아예 안 쓰는 경우
    dp[0] = 1;

    // 동전을 기준으로 검사
    // 현재 동전을 이전 금액에 더해서 현재 금액을 만들 수 있는 경우의 수를 계속 더해간다
    for(int item : money) {
        for(int i = 1; i <= n; i++) {
            if(item > i) {
                continue;
            }
            // 동전: 1원
            // 0 / 0 / 1
            // 1 / 0 + 1 /  0 + 1 = 1
            // 2 / 0 + 1 + 1 / 0 + 1 = 1
            // 3 / 0 + 1 + 1 + 1 / 0 + 1 = 1
            dp[i] = (dp[i] + dp[i - item]) % MOD;
        }
    }
    
    return dp[n] % MOD;
}