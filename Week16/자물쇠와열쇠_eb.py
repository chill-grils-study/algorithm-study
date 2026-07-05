def rotate(key):
    M = len(key)
    new = [[0] * M for _ in range(M)]

    # 90도 시계 방향 회전
    for i in range(M):
        for j in range(M):
            new[j][M - 1 - i] = key[i][j]

    return new


def check(board, N):
    # 가운데 lock 영역이 모두 1인지 확인
    for i in range(N):
        for j in range(N):
            if board[i + N][j + N] != 1:
                return False
    return True


def solution(key, lock):
    M = len(key)
    N = len(lock)

    # 3배 크기의 배열 생성
    board = [[0] * (3 * N) for _ in range(3 * N)]

    # 가운데에 lock 복사
    for i in range(N):
        for j in range(N):
            board[i + N][j + N] = lock[i][j]

    # 회전 4번
    for _ in range(4):
        key = rotate(key)

        # key를 모든 위치에 올려보기
        for x in range(3 * N - M + 1):
            for y in range(3 * N - M + 1):

                # 1. key 더하기
                for i in range(M):
                    for j in range(M):
                        board[x + i][y + j] += key[i][j]

                # 2. lock이 열리는지 검사
                if check(board, N):
                    return True

                # 3. 원상복구
                for i in range(M):
                    for j in range(M):
                        board[x + i][y + j] -= key[i][j]

    return False