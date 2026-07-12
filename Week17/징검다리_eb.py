def solution(stones, k):
    left, right = 1, max(stones)
    
    def can_cross(mid):
        cnt = 0
        for stone in stones:
            if stone < mid: # stone - mid < 0 과 같음
                cnt += 1
            else:
                cnt = 0
            if cnt >= k: # 현재 까지 뛰어 넘어야 하는 수 + 1
                return False
        return True
    
    while left <= right:
        mid = (left + right) // 2
        if can_cross(mid):
            left = mid + 1
        else:
            right = mid - 1

    return right