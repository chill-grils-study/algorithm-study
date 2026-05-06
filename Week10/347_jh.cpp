#include<queue>
#include<vector>
#include<unordered_map>

using namespace std;

// 처음에는 12ms가 걸렸는데 3군데 최적화하니까 1ms로 바뀜
// 시간복잡도: O(NlogK)
// 공간복잡도: O(K)
vector<int> topKFrequent(vector<int>& nums, int k) {
  priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
  // map 대신 unordered_map 쓰기 -> unordered_map은 키를 정렬하지 않아서 빠름
  unordered_map<int, int> frequency;

  for(int num : nums) {
      frequency[num]++;
  }
  // 원본을 그대로 사용해서 pair 복사하지 않도록 함
  for(auto& item : frequency) {            
      if(pq.size() < k) {
          pq.push({item.second, item.first});
      } else if(pq.size() == k && pq.top().first < item.second) {
          pq.pop();
          pq.push({item.second, item.first});
      }
  }

  vector<int> result;
  // result 벡터에 k개의 원소를 넣겠다고 미리 알리기
  // reserve는 메모리만 확보해서 크기는 그대로이고, resize는 실제 크기를 변경하고 값도 새로 생성됨
  // 미리 reserve 해두면 push_back할 때 재할당되는걸 줄여줌
  result.reserve(k);

  while(!pq.empty()) {
      result.push_back(pq.top().second);
      pq.pop();
  }
  return result;
}