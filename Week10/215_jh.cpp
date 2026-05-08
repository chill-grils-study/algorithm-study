#include<vector>
#include<algorithm>

using namespace std;

// 근데 이거 제출하니까 엄청 느리던데.. 이게 맏나..
// 사실 정렬 안 하고 푸는 방법을 모르겠어서 피티한테 물어봤어요..ㅎ
class Solution {
public:
    int partition(int left, int right, vector<int>& nums) {
        int pivot = nums[right];
        int storeIndex = left;

        for(int i = left; i < right; i++) {
            if(nums[i] > pivot) {
                swap(nums[i], nums[storeIndex]);
                storeIndex++;
            }
        }

        swap(nums[storeIndex], nums[right]);

        return storeIndex;
    }
    // 퀵 정렬을 만들었어욘
    // pivot을 기준으로 왼쪽은 pivot보다 큰 수들, 오른쪽은 pivot보다 작은 수들이 오도록 정렬합니다.
    int quickSelect(int left, int right, vector<int>& nums, int k) {
        int pivotIndex = partition(left, right, nums);

        if(pivotIndex == k) {
            return nums[pivotIndex];
        } else if(pivotIndex > k) {
            return quickSelect(left, pivotIndex - 1, nums, k);
        } else {
            return quickSelect(pivotIndex + 1, right, nums, k);
        }
    }

    int findKthLargest(vector<int>& nums, int k) {
         return quickSelect(0, nums.size() - 1, nums, k - 1);
    }
};