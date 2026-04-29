#include <iostream>
#include <vector>

using namespace std;

// 시간, 공간복잡도: O(n)
// dp[i][0]: i번째 원소가 직전 원소보다 클 때의 최장 부분 문자열 길이
// dp[i][1]: i번째 원소가 직전 원소보다 작을 때의 최장 부분 문자열 길이
int wiggleMaxLength(vector<int>& nums) {
  int size = nums.size();
  vector<vector<int>> dp(size, vector<int> (2, 0));

  // 처음 최장 부분 문자열 길이는 무조건 1
  dp[0][0] = 1;
  dp[0][1] = 1;

  for(int i = 1; i < size; i++) {
    if(nums[i] > nums[i - 1]) {
      // 직전 원소가 감소한 경우의 최장 부분 문자열 길이에 1을 더함
      // 예: 5 2 (3)
      dp[i][0] = dp[i - 1][1] + 1;
      // 현재 원소가 직전 원소보다 작아질 수 없으니 건너뜀
      dp[i][1] = dp[i - 1][1];
    } else if(nums[i] < nums[i - 1]) {
      // 현재 원소가 직전 원소보다 커질 수 없으니 건너뜀
      dp[i][0] = dp[i - 1][0];
      // 직전 원소가 증가한 경우의 최장 부분 문자열 길이에 1을 더함
      // 예: 5 8 (2)
      dp[i][1] = dp[i - 1][0] + 1;
    } else {
      // 현재 원소와 직전 원소가 같으면 확인 안 하고 건너뜀
      dp[i][0] = dp[i - 1][0];
      dp[i][1] = dp[i - 1][1];
    }
  }

  return max(dp[size - 1][0], dp[size - 1][1]);
}