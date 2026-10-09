#include <string>
#include <vector>

using namespace std;
// ㅎㅎ 무식하게 완탐 돌렸는데 효율성에서 갈렸어요 ^^ㅎ
long long 조합횟수 = 0;
vector<int> answer;

bool 완전탐색(vector<int> curNums, vector<bool> visited, int n, long long k) {
    if(curNums.size() == n) {
        조합횟수++;
        if(조합횟수 == k) {
            answer = curNums;
            return true;
        }
        return false;
    }
    
    for(int i = 1; i <= n; i++) {
        bool result;
        if(!visited[i]) {
            visited[i] = true;
            curNums.push_back(i);
            result = 완전탐색(curNums, visited, n, k);
            if(result) {
                return true;
            }
            curNums.pop_back();
            visited[i] = false;
        }
    }
    
    return false;
}

vector<int> solution(int n, long long k) {
    완전탐색(vector<int>(), vector<bool>(n + 1, false), n, k);
    return answer;
}

// 효율적인 두번째 방법
// 규칙을 찾아봤습니다..
// n: 4일 때
// 1 2 3 4
// 1 2 4 3
// 1 3 2 4
// 1 3 4 2
// 1 4 2 3
// 1 4 3 2
// 2 1 3 4
// 2 1 4 3
// 2 3 1 4
// 2 3 4 1
// 2 4 1 3
// 2 4 3 1
// ... 
// 첫번째 숫자가 같은 숫자인 경우의 수: 6 = 3 * 2 * 1
// 두번째 숫자가 같은 숫자인 경우의 수: 2 = 2 * 1 = 6 / 3
// 세번째 숫자가 같은 숫자인 경우의 수: 1 = 1 = 2 / 2
// k = 11 -> 첫번째 숫자가 2인 그룹 안에서 찾을 수 있다!!
vector<int> solution(int n, long long k) {
    // answer에 넣을 숫자 배열. 몇 번째 숫자를 넣어야 될지 찾기 어려우니 그냥 배열을 만들어서 지워버릴라공,,
    vector<int> nums;
    vector<int> answer;
    long long fact = 1;
    int cnt = n - 1;

    for (int i = 1; i < n; i++) {
        fact *= i;
        nums.push_back(i);
    }
    nums.push_back(n);
    // 인덱스 맞추기 쉽게 k를 그냥 1 빼버림
    k--;
    // answer에 nums가 다 들어가지 않았다면
    while (nums.size() > 1) {
        // 몇 번째 그룹일지
        long long quot = k / fact;
        // 다음 그룹 구하기 위해
        long long remain = k % fact;
        int index = quot;
        k = remain;

        answer.push_back(nums[index]);
        nums.erase(nums.begin() + index);

        fact /= cnt--;
    }

    answer.push_back(nums[0]);

    return answer;
}