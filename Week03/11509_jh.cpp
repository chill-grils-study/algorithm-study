#include <iostream>
#include <vector>
#include <functional>

using namespace std;

// 시간복잡도: O(N)
// 공간복잡도: O(N)
// 그리디
int main() {
    const int INF = 1000001;
    int N, count = 0;

    cin >> N;

    // 화살 정보
    vector<int> arrows(INF, 0);
    // 풍선
    vector<int> balloons(N + 1, 0);

    for(int i = 1; i <= N; i++) {
        cin >> balloons[i];
    }

    for(int i = 1; i <= N; i++) {
        const int balloon = balloons[i];
        // 풍선이랑 같은 높이인 화살이 없다면
        if(arrows[balloon] == 0) {
            // 화살 추가
            count++;
        } else { // 풍선이랑 같은 높이인 화살이 있으면
            // 해당 높이의 화살은 한개 뺌 (화살 높이 1 줄어들어야 하니까)
            arrows[balloon]--;
        }
        // 화살 높이가 1보다 클 때
        if(balloon > 1) {
            // (해당 풍선 터뜨린 화살 높이 - 1)인 화살 개수 증가
            arrows[balloon - 1]++;
        }

    }

    cout << count << '\n';

    return 0;
}
