from collections import deque

def solution(land):
    n, m = len(land), len(land[0])
    answer = 0

    for col in range(m):
        visited = [[False] * m for _ in range(n)]
        queue = deque()

        # 이 열에서 석유인 칸을 전부 시작점으로 넣기
        for r in range(n):
            if land[r][col] == 1:
                visited[r][col] = True
                queue.append((r, col))

        count = 0
        while queue:
            r, c = queue.popleft()
            count += 1
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < m \
                        and land[nr][nc] == 1 and not visited[nr][nc]:
                    visited[nr][nc] = True
                    queue.append((nr, nc))

        answer = max(answer, count)

    return answer
