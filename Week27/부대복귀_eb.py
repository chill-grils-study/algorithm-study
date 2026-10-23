from collections import deque
def solution(n, roads, sources, destination):
    answer = []
    graph = [[] for _ in range(n+1)]
    for start, end in roads:
        graph[start].append(end)
        graph[end].append(start)
    
    queue = deque()
    queue.append(destination)
    
    cal = [-1] * (n + 1)
    cal[destination] = 0
    while queue:
        target = queue.popleft()
        for next in graph[target]:
            if cal[next] == -1:
                cal[next] = cal[target] + 1
                queue.append(next)
    for s in sources:
        answer.append(cal[s])
        
    return answer

