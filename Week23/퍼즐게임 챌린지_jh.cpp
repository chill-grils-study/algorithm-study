#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// 보자마자 아핫~! 이분탐색~!! 하고 풀었슨
int solution(vector<int> diffs, vector<int> times, long long limit) {
    const int n = diffs.size();
    int left = 1, right = *max_element(diffs.begin(), diffs.end());
    int answer = 0;

    while(left <= right) {
        int mid = (left + right) / 2;
        
        long long total = times[0];
        int prevTime = times[0];
        // diff와 level(mid)를 비교하며 퍼즐 푸는데 걸리는 시간 계산
        for(int i = 1; i < n; i++) {
            if(diffs[i] <= mid) {
                total += times[i];
            } else {
                total += (diffs[i] - mid) * (prevTime + times[i]) + times[i];
            }
            prevTime = times[i];
        }
        // 퍼즐 다 푸는데 제한시간보다 오래 걸리면 level을 높여야 함
        if(total > limit) {
            left = mid + 1;
        } else { // 반대면 level을 낮추기
            right = mid - 1;
        }
    }
    
    return left;
}