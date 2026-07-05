# n = 1
# 1
# n = 2
# 11, 2
# n = 3
# 112, 21, 12
# n = 4
# 1111, 112, 22, 211, 121

def solution(n):
    if n == 1:
        return 1
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    for i in range(3, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n] % 1234567