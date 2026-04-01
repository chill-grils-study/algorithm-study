#include <iostream>
#include <vector>

// dp[i][j] = 길이가 i이고, 마지막 숫자가 j인 계단수 개수
// 마지막 자리를 봐야된다는건 처음부터 알았는데 .. 아 점화식 한번에 못 세움 아숩..
// 시간복잡도: O(N)
// 공간복잡도: O(N)
// 0 -> 1
// 1 -> 0, 2
// 2 -> 1, 3
// 3 -> 2, 4
// ...
using namespace std;
int main() {
    const int nums = 10;
    const long long MOD = 1000000000;
    int N;

    cin >> N;

    vector<vector<long long>> dp(N + 1, vector<long long>(nums, 0));

    for(int j = 1; j < nums; j++) {
        dp[1][j] = 1;
    }

    for(int i = 2; i <= N; i++) {
        for(int j = 0; j < nums; j++) {
            if(j == 0) {
                dp[i][j] = dp[i - 1][j + 1];
            } else if(j == 9) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % MOD;
            }
        }
    }

    long long result = 0;

    for(int j = 0; j < nums; j++) {
        result += dp[N][j];
    }

    cout << result % MOD;

    return 0;
}
