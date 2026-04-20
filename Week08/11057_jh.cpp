#include <iostream>
#include <vector>

using namespace std;

// 5주차 쉬운 계단수랑 비슷한 문제
// dp[i][j] = i번째 자릿수가 j로 끝나는 오르막 수
// 시간복잡도, 공간복잡도: O(N)
int main() {
    const int SIZE = 10;
    const int MOD = 10007;
    int N;

    cin >> N;

    vector<vector<int>> dp(N + 1, vector<int>(SIZE, 0));

    for(int j = 0; j < SIZE; j++) {
        dp[1][j] = 1;
    }
    
    for(int i = 2; i <= N; i++) {
        for(int j = 0; j < SIZE; j++) {
            for(int k = 0; k <= j; k++) {
                // i번째 자릿수가 j로 끝나는 오르막 수
                // = i-1번째 자릿수가 0로 끝나는 오르막수 + i-1번째 자릿수가 1로 끝나는 오르막수 + i-1번째 자릿수가 2로 끝나는 오르막수 + ... + i-1번째 자릿수가 j로 끝나는 오르막수
                // 0  00
                // 1  01
                //    11
                // 2  02
                //    12
                //    22
                dp[i][j] = (dp[i][j] + dp[i - 1][k]) % MOD;
            }
        }
    }

    int total = 0;

    for(int j = 0; j < SIZE; j++) {
        total += dp[N][j];
    }

    cout << total % MOD;

    return 0;
}
