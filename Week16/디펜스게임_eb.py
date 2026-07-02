import heapq

def solution(n, k, enemy):
    heap = []

    for i, e in enumerate(enemy):
        n -= e
        heapq.heappush(heap, -e) # 최소힙이라 마이너스로 해서 최대힙처럼

        if n < 0:
            if k > 0:
                top = -heapq.heappop(heap)
                n += top # 병사 복구
                k -= 1
            else:
                return i # 무적권 없으면 이 라운드까지만 가능

    return len(enemy)