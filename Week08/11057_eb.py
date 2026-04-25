N = int(input())
MOD = 10007

# dp[i][j] = 길이 i, 마지막 숫자 j
# dp[2][0] = dp[1][0] = 1
# dp[2][1] = dp[1][0] + dp[1][1] = 2
# dp[2][2] = dp[1][0] + dp[1][1] + dp[1][2] = 3
# ...
# dp[2][9] = 10
dp = [[0] * 10 for _ in range(N + 1)]

# 초기값
for i in range(0, 10):
    dp[1][i] = 1

# DP 진행
for i in range(2, N + 1):
    for j in range(10):
        if j == 0:
            dp[i][0] = dp[i-1][0]
        else:
            # 1. 마지막 숫자가 j고, 그 앞이 j보다 작은 경우(확장)
            # 2. 마지막 숫자가 j고, 그 앞도 j인 경우
            dp[i][j] = (dp[i][j-1] + dp[i-1][j]) % MOD
        
# 결과
print(sum(dp[N]) % MOD)