import sys
sys.setrecursionlimit(10**6)
def solution(maps):
    answer = []
    n = len(maps)
    m = len(maps[0])

    visited = [[False] * m for _ in range(n)]
    def dfs(r, c):
        visited[r][c] = True
        total = int(maps[r][c])
        dr = [-1, 1, 0, 0]
        dc = [0, 0, -1, 1]
        for k in range(4):
            nr = r + dr[k]
            nc = c + dc[k]

            if 0 <= nr < n and 0 <= nc < m and not visited[nr][nc] and not maps[nr][nc] == 'X':
                total += dfs(nr, nc)
        
        return total
    
    for i in range(n):
        for j in range(m):
            if maps[i][j].isdigit() and not visited[i][j]:
                answer.append(dfs(i,j))
            
    answer.sort()

    if not answer:
        return [-1]

    return answer