import heapq

def solution(n, costs):
    answer = 0

    graph = [[] for _ in range(n)]

    for a, b, cost in costs:
        graph[a].append((b, cost))
        graph[b].append((a, cost))
    visited = [False] * n

    min_heap = [(0, 0)]  # (cost, node)

    while min_heap:
        cost, node = heapq.heappop(min_heap)

        if visited[node]:
            continue

        visited[node] = True
        answer += cost

        for neighbor, neighbor_cost in graph[node]:
            if not visited[neighbor]:
                heapq.heappush(min_heap, (neighbor_cost, neighbor))

    return answer
