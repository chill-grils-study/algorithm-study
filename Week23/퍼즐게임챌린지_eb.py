def solution(diffs, times, limit):
    answer = 0
    def binary_search():
        left = min(diffs)
        right = max(diffs)
        while left < right:
            mid = (left + right) // 2
            
            if simulation(mid):
                answer = mid
                right = mid
            else:
                left = mid + 1
        return left
                
            
            
    def simulation(level):
        taken = 0
        for idx, (diff, time) in enumerate(zip(diffs, times)):
            if level >= diff:
                taken += time
            else: 
                taken += (time + times[idx-1]) * (diff - level) + time
                
        return limit >= taken 
    return binary_search()

