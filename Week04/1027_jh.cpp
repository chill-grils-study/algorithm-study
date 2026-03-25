#include <iostream>
#include <vector>
#include <functional>
#include <math.h>

using namespace std;
// 지피티한테 물어봤슨.. 한번 틀린건 또 틀리는구나...
// 처음에는 두 점을 잇는 선분을 구하고 선분에 닿는 건물 수를 다 구해야 하나..?
// 라고 생각했지만 기울기만 구하면 되는 문제였다..
// 시간복잡도: O(N^2)
// 공간복잡도: O(N)
int main() {
    const int INF = -1000000001;
    int N, maxCount = 0;
    
    cin >> N;
    
    vector<int> height(N , 0);
    vector<int> count(N , 0);

    for(int i = 0; i < N; i++) {
        cin >> height[i];
    }

    for(int i = 0; i < N - 1; i++) {
        double maxSlope = INF;
        // 옆 건물과 현재 건물 사이의 기울기를 구하고
        for(int j = i + 1; j < N; j++) {
            double slope = (double)(height[j] - height[i]) / (j - i);
            // 최대 기울기이면 i와 j가 서로 볼 수 있다는거니까 보이는 건물 개수 1씩 증가
            if(slope > maxSlope) {
                maxSlope = slope;
                count[i]++;
                count[j]++;
            }
        }
    }

    for(int num : count) {
        maxCount = max(maxCount, num);
    }

    cout << maxCount;

    return 0;
}
