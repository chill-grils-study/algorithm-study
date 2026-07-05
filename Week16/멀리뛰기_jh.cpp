#include <string>
#include <vector>

using namespace std;

// 진심 5분만에 품. 오랜만에 정말 뿌 듯 했 다 ^~^
// 어려운 조건이 없어서... 정말 금방 풀었어요
long long solution(int n) {
    const long long MOD = 1234567;
    vector<long long> dp(n + 1, 0);
    long long answer = 0;
    // 아직 출발 안했을 때
    dp[0] = 1;
    
    for(int i = 0; i <= n - 1; i++) {
        // 현재 칸에서 앞으로 한칸 뛴 경우
        dp[i + 1] = (dp[i] + dp[i + 1]) % MOD;
        // 현재 칸에서 앞으로 두칸 뛴 경우
        if(i != n - 1) {
            dp[i + 2] = (dp[i] + dp[i + 2]) % MOD;
        }
    }
    
    return dp[n];
}