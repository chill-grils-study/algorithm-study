from collections import Counter
import heapq
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = Counter(nums)

        heap = []
        for num, freq in count.items():
            heapq.heappush(heap, (freq, num)) # 갯수로 넣음. heapq가 최소힙

            if len(heap) > k:
                heapq.heappop(heap)
        return [num for _, num in heap]