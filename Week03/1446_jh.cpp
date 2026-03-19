#include <iostream>
#include <vector>
#include <tuple>
#include <queue>
#include <functional>
#include <algorithm>

using namespace std;

// 첫번째 풀이, 우선순위큐 쓰고 dp를 매번 갱신하려고 했음
// 시간복잡도: O(NlogN + D^2)
// 공간복잡도: O(N + D)
int main() {
    int N, D;
    
    cin >> N >> D;

    priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> shortcuts;
    vector<int> dp(D + 1);

    for(int i = 0; i < N; i++) {
        int start, end, length;
        cin >> start >> end >> length;

        if(end <= D) {
            shortcuts.push({start, end, length});
        }
    }

    for(int i = 0; i <= D; i++) {
        dp[i] = i;
    }

    while(!shortcuts.empty()) {
        auto [start, end, length] = shortcuts.top();
        shortcuts.pop();

        if(dp[end] > dp[start] + length) {
            dp[end] = dp[start] + length;

            for(int i = end + 1; i <= D; i++) {
                dp[i] = min(dp[i], i - end + dp[end]);
            }
        }
    }

    cout << dp[D];

    return 0;
}

// 두번째 풀이, 근데 첫번째 풀이랑 메모리, 시간 똑같긴 함
// 시간복잡도: O(N + D)
// -> dp 반복문 안에서 지름길을 찾으니까 O(N * D)라고 생각했음
// 각 지름길 탐색 횟수를 합치면 N이 되기 때문에 O(N + D)
// O(N * D)가 되려면 dp 반복문 안에서 N번 반복하는 반복문이 또 있어야 됨
// 공간복잡도: O(N + D)
#include <iostream>
#include <vector>
#include <functional>
#include <algorithm>

using namespace std;

int main() {
    const int INF = 1000001;
    int N, D;
    
    cin >> N >> D;
  
    vector<vector<pair<int, int>>> shortcuts(D + 1);
    // i 위치까지의 최소 거리
    vector<int> dp(D + 1, INF);

    for(int i = 0; i < N; i++) {
        int start, end, length;
        cin >> start >> end >> length;

        if(end <= D) {
            shortcuts[start].push_back({end, length});
        }
    }

    dp[0] = 0;

    for(int i = 0; i <= D; i++) {
        // 지름길로 안 오고 이전 위치에서 1만큼 더 오는 경우
        if(i > 0) {
            dp[i] = min(dp[i], dp[i - 1] + 1);
        }
        // 지름길로 가는 경우
        for(auto [end, length]: shortcuts[i]) {
            dp[end] = min(dp[i] + length, dp[end]);
        }
    }

    cout << dp[D];

    return 0;
}
