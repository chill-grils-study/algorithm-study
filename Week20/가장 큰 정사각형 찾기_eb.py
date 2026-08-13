def solution(board):
    answer = 0

    row = len(board)
    col = len(board[0])
    
    # 테케 1 통과 못한 이유
    if col == 1 and board[0][0] == 1:
        return 1

    dp = [[0] * col for _ in range(row)]

    # 첫 번째 행 처리
    for c in range(col):
        if board[0][c] == 1:
            dp[0][c] = 1

    # 첫 번째 열 처리
    for r in range(row):
        if board[r][0] == 1:
            dp[r][0] = 1

    # 나머지 영역
    for r in range(1, row):
        for c in range(1, col):
            if board[r][c] == 1:
                dp[r][c] = min(dp[r][c-1], dp[r-1][c], dp[r-1][c-1]) + 1
                answer = max(dp[r][c], answer)
            else:
                dp[r][c] = 0
    return answer * answer

            
