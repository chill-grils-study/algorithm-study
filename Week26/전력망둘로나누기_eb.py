from collections import deque

def solution(n, wires):
    answer = n
    # 간선 하나씩 끊어가며 확인
    for cut in range(len(wires)):
        # 새로운 그래프 매번 만들기
        graph = [[] for _ in range(n + 1)]
        for i, (a, b) in enumerate(wires):
            # 끊은건 append X
            if i == cut:
                continue
            graph[a].append(b)
            graph[b].append(a)

        # 끊어진 노드에서 시작
        start = wires[cut][0]
        visited = [False] * (n + 1)
        visited[start] = True
        q = deque([start])
        # 노드 수
        k = 1
        while q:
            u = q.popleft()
            for v in graph[u]:
                if not visited[v]:
                    visited[v] = True
                    q.append(v)
                    k += 1

        answer = min(answer, abs(k - (n - k)))
    return answer
