def solution(n, results):
    answer = 0
    graph = [[] for _ in range(n + 1)] # 내가 이기는 사람 찾기
    reverse_graph = [[] for _ in range(n + 1)] # 나를 이기는 사람 찾기


    for a, b in results:
        graph[a].append(b)
        reverse_graph[b].append(a)
        
    def dfs(graph, start):
        visited = []
        stack = [start]

        while stack:
            node = stack.pop()

            if node in visited:
                continue

            visited.append(node)

            for next_node in graph[node]:
                stack.append(next_node)

        return visited
    
    for i in range(1, n+1):
        can_win = len(dfs(graph, i)) - 1 # visited node에 본인도 포함되어 1 빼줌
        cant_win = len(dfs(reverse_graph, i)) - 1
        if can_win + cant_win == n - 1: # 해당 i의 순위를 알 수 있다는 조건
            answer+=1
        
        
    return answer
