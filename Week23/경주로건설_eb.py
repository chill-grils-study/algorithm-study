from heapq import heappush, heappop

dx = [-1, 1, 0, 0]   # 상하우좌
dy = [0, 0, 1, -1]

def solution(board):
    n = len(board)
    INF = float('inf')
    dp = [[[INF] * 4 for _ in range(n)] for _ in range(n)]
    queue = []
    if board[1][0] == 0:
        dp[1][0][1] = 100
        heappush(queue, (100, 1, 0, 1))
    if board[0][1] == 0:
        dp[0][1][2] = 100
        heappush(queue, (100, 0, 1, 2))

    while queue:
        current_cost, cx, cy, direction = heappop(queue)
        if current_cost > dp[cx][cy][direction]: # 현재 최소 비용보다 큰 경우 볼 필요 X
            continue
        for i in range(4):
            nx, ny = cx + dx[i], cy + dy[i]
            if nx < 0 or nx >= n or ny < 0 or ny >= n or board[nx][ny] == 1:
                continue
            next_cost = current_cost + (100 if direction == i else 600)
            if next_cost < dp[nx][ny][i]:
                dp[nx][ny][i] = next_cost
                heappush(queue, (next_cost, nx, ny, i))

    return min(dp[n - 1][n - 1])
