def solution(m, n, puddles):
    answer = 0
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    dp[1][1] = 1
    for x, y in puddles:
        dp[y][x] = -1  # 웅덩이 표시

    for r in range(1, n + 1):
        for c in range(1, m + 1):
            if dp[r][c] == -1:
                dp[r][c] = 0
                continue

            if r == 1 and c == 1:
                continue

            dp[r][c] = dp[r - 1][c] + dp[r][c - 1]
            
    return dp[n][m] % 1000000007