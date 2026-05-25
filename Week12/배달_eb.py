import heapq

def solution(N, road, K):

    graph = [[] for _ in range(N + 1)]

    for a, b, c in road:
        graph[a].append((b, c))
        graph[b].append((a, c))

    INF = int(1e9)

    dist = [INF] * (N + 1)
    dist[1] = 0

    pq = []
    heapq.heappush(pq, (0, 1))  # 비용, 노드

    while pq:

        cost, now = heapq.heappop(pq)

        # 이미 더 짧은 경로 있음
        if dist[now] < cost:
            continue

        for next_node, next_cost in graph[now]:

            new_cost = cost + next_cost

            if new_cost < dist[next_node]:

                dist[next_node] = new_cost
                heapq.heappush(pq, (new_cost, next_node))

    return sum(d <= K for d in dist)