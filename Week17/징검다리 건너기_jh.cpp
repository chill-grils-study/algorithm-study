#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// 이분탐색과 dp를 구분하는 기준
// 1. 최소/최대 값을 구한다. k가 정답일 때, k보다 작거나 큰 값이 조건을 만족할 수 있다 -> 이분탐색
// 2. 현재의 선택이 다음 상태에 영향을 끼친다 -> dp
int solution(vector<int> stones, int k) {
    const int SIZE = stones.size();
    int left = 1, right = *max_element(stones.begin(), stones.end());
    
    while(left <= right) {
        int mid = (left + right) / 2;
        int cnt = 0;
        bool canSuccess = true;
        for(int i = 0; i < SIZE; i++) {
            // 연속으로 밟을 수 없는 돌의 개수를 세고 건너뛸 수 없다면 반복문 종료
            if(stones[i] >= mid) {
                if(cnt >= k) {
                    canSuccess = false;
                    break;
                }
                cnt = 0;
            } else {
                cnt++;
            }
        }
        // 마지막 징검다리도 건널 수 있는지 한번 더 확인
        // 이분탐색 범위 수정하는건 여전히 헷갈린다 .. ^^
        if(cnt < k && canSuccess) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return right;
}