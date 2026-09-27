def solution(n, money):
    dp = [0] * (n+1)
    dp[0] = 1
    for coin in money:
        for i in range(1, n+1):
            if i - coin >= 0: dp[i] += dp[i - coin]
            
    return dp[n]
