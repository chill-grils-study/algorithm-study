def solution(sticker):
    answer = 0
    # 10
    # 10 20 
    # 10 20 30 
    # 3번째까지의 최댓값 = max(3번째를 안 고르는 경우, 3번째를 고르는 경우)
    if len(sticker) <= 2:
        return max(sticker)
    # 첫번째 스티커 선택 
    dp = [0] * len(sticker)
    dp[0] = sticker[0]
    dp[1] = dp[0]
    # dp[2] = max(dp[1], dp[0]+ sticker[2])
    # dp[3] = max(dp[2], dp[1]+ sticker[3])
    
    for i in range(2, len(sticker) - 1):
        dp[i] = max(dp[i-1], dp[i-2] + sticker[i])

    case1 = dp[len(sticker) - 2] # 마지막은 선택할 수 없으니 최댓값은 len - 2
    
    # 첫번째 스티커 미선택
    dp = [0] * len(sticker)
    dp[1] = sticker[1]
    
    for i in range(2, len(sticker)):
        dp[i] = max(dp[i-1], dp[i-2] + sticker[i])

    case2 = dp[len(sticker) - 1] 
    return max(case1, case2)
