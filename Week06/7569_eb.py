import sys
from collections import deque

sys.stdin = open("input.txt", "r")

input = sys.stdin.readline
C, R, H = map(int, input().split())
boxes = []
for _ in range(H):
    floor = []
    for _ in range(R):
        row = list(map(int, input().split()))
        floor.append(row)

    boxes.append(floor)
dh = [0,0,0,0,1,-1]
dr = [1,-1,0,0,0,0]
dc = [0,0,1,-1,0,0]

unripe_count = 0
queue = deque()
for i in range(H):
    for j in range(R):
        for k in range(C):
            if boxes[i][j][k] == 1:
                queue.append((i,j,k))
            elif boxes[i][j][k] == 0:
                unripe_count += 1

if unripe_count == 0:
    print(0)
    exit(0)
while queue:
    h, r, c = queue.popleft()
    for i in range(6):
        nh, nr, nc = h + dh[i], r + dr[i], c + dc[i]
        if 0 <= nh < H and 0 <= nr < R and 0 <= nc < C:
            if boxes[nh][nr][nc] == 0:
                # 현재 값 + 1을 해서 시간을 기록
                boxes[nh][nr][nc] = boxes[h][r][c] + 1
                queue.append((nh, nr, nc))
                unripe_count -= 1

if unripe_count == 0:
    print(boxes[h][r][c] - 1)
else:
    print(-1)
