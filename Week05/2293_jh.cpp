#include <iostream>
#include <vector>

using namespace std;

// 모르겠어서 지피티의 도움을 받았다죠...
// 처음에는 금액 -> 동전 순으로 루프를 돌았는데 이러면 중복이 발생할 수 있어서
// 동전 -> 금액 순으로 봐야 합니다.
// 시간복잡도: O(N * K)
// 공간복잡도: O(N + K)
int main() {
    int N, K;

    cin >> N >> K;

    vector<int> coins(N);

    for(int i = 0; i < N; i++) {
        cin >> coins[i];
    }

    vector<int> dp(K + 1, 0);

    // 0원을 만드는 방법은 1가지
    dp[0] = 1;

    for(int coin : coins) {
        for(int i = coin; i <= K; i++) {
            // i원을 만드는 방법 = (i - coin)원을 만드는 방법 뒤에 coin을 붙인다
            dp[i] += dp[i - coin];
        }
    }
  
    cout << dp[K];

    return 0;
}
