#include <string>
#include <vector>

using namespace std;

// 이분탐색 더 풀어봐야 될듯 ^^
// 우선순위큐로 풀려다가 ... 막혀서 보니까 이분탐색이더라..
long long solution(int n, vector<int> times) {
    long long left = 1;
    // 처음 최댓값은 가장 오래걸리는 심사관의 심사시간 * 사람 수
    // 모든 케이스가 알아서 오름차순 정렬 되어 있나봄
    long long right = (long long)times[times.size() - 1] * n;
    
    while(left < right) {
        // 최소 시간
        long long target = (left + right) / 2;
        long long cnt = 0;
        // 주어진 시간동안 모든 사람을 심사해줄 수 있는지 검사
        // [7, 10], 28
        // 1번 심사관은 4명 처리 가능, 2번 심사관은 2명 처리 가능
        // => 6명 모두 처리 가능
        for(int time : times) {
            cnt += target / time;
        }
        // 구간 나눠서 이분탐색
        if(cnt >= n) {
            right = target;
        } else {
            left = target + 1;
        }
    }
    
    return right;
}