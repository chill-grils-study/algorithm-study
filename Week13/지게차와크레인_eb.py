from collections import deque

def solution(storage, requests):
    h = len(storage)
    w = len(storage[0])

    # 패딩 추가
    board = [['.'] * (w + 2)]
    for row in storage:
        board.append(['.'] + list(row) + ['.'])
    board.append(['.'] * (w + 2))

    H = h + 2
    W = w + 2

    for req in requests:
        target = req[0] # length 2 크레인일 수도 있으니 [0]

        # 크레인
        if len(req) == 2:
            # 전체 돌면서 싹 뺌
            for r in range(1, h + 1):
                for c in range(1, w + 1):
                    if board[r][c] == target:
                        board[r][c] = '.'

        # 지게차
        else:
            # 지게차가 갈 수 있는 길
            outside = [[False] * W for _ in range(H)]
            # 0,0 은 패딩이므로 무조건 가능
            q = deque([(0, 0)])
            outside[0][0] = True

            while q:
                r, c = q.popleft()

                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    # 범위 벗어난 경우
                    if not (0 <= nr < H and 0 <= nc < W):
                        continue
                    # 이미 확인한 경우
                    if outside[nr][nc]:
                        continue
                    # 외부와 연결된 빈 공간이 아니면 이동 불가
                    if board[nr][nc] != '.':
                        continue

                    outside[nr][nc] = True
                    q.append((nr, nc))

            remove = []

            for r in range(1, h + 1):
                for c in range(1, w + 1):
                    if board[r][c] != target:
                        continue

                    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        nr, nc = r + dr, c + dc
                        # 지게차 접근 가능
                        if outside[nr][nc]:
                            remove.append((r, c))
                            break
            # 한번에 빼기
            for r, c in remove:
                board[r][c] = '.'

    answer = 0

    for r in range(1, h + 1):
        for c in range(1, w + 1):
            if board[r][c] != '.':
                answer += 1

    return answer