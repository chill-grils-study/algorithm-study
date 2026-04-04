N = int(input())
MOD = 1000000000

# dp[i][j] = 길이 i, 끝자리 j
# 이전 자리 숫자에서 ±1 해서 다음 숫자를 만든다
# 마지막 한 자리만 붙이는 과정

dp = [[0] * 10 for _ in range(N + 1)]

# 초기값
for i in range(1, 10):
    dp[1][i] = 1

# DP 진행
for i in range(2, N + 1):
    for j in range(10):
        if j == 0:
            dp[i][0] = dp[i-1][1]
        elif j == 9:
            dp[i][9] = dp[i-1][8]
        else:
            # _ 2 라는 숫자를 만든다면 앞자리가 1 이거나 3이어야 함
            dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1]
        
        dp[i][j] %= MOD

# 결과
print(sum(dp[N]) % MOD)