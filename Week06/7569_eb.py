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


# 최적화
import sys
from collections import deque

# 입력을 빠르게 받기 위한 설정
input = sys.stdin.readline

# 1. 입력 및 초기화
R, C = map(int, input().split())
icebergs = []
ice_coords = [] # 빙산이 있는 좌표만 보관하는 리스트

for r in range(R):
    row = list(map(int, input().split()))
    icebergs.append(row)
    for c in range(C):
        if row[c] > 0:
            ice_coords.append((r, c)) # 빙산 위치 미리 저장

dy = [-1, 1, 0, 0]
dx = [0, 0, -1, 1]

def solve():
    global ice_coords
    year = 0

    while ice_coords:
        # --- 1. 덩어리 개수 세기 (BFS) ---
        visited = [[False] * C for _ in range(R)]
        chunks = 0
        nodes_to_remove = [] # 이번 해에 다 녹아서 사라질 좌표들
        
        # 전체 맵을 다 도는 대신, 빙산이 있는 좌표 리스트만 순회!
        for r, c in ice_coords:
            if icebergs[r][c] > 0 and not visited[r][c]:
                chunks += 1
                if chunks >= 2: # 2개 이상이면 바로 정답 리턴
                    return year
                
                # BFS 탐색 시작
                queue = deque([(r, c)])
                visited[r][c] = True
                while queue:
                    curr_r, curr_c = queue.popleft()
                    for i in range(4):
                        nr, nc = curr_r + dy[i], curr_c + dx[i]
                        if 0 <= nr < R and 0 <= nc < C:
                            if icebergs[nr][nc] > 0 and not visited[nr][nc]:
                                visited[nr][nc] = True
                                queue.append((nr, nc))
        
        # 덩어리가 0개라면 (다 녹을 때까지 2개로 안 나뉘었을 때)
        if chunks == 0:
            return 0

        # --- 2. 빙산 녹이기 (Melting) ---
        melt_info = [] # (r, c, 녹을 높이) 저장
        new_ice_coords = [] # 내년에도 살아남을 빙산 좌표들
        
        for r, c in ice_coords:
            sea_count = 0
            for i in range(4):
                nr, nc = r + dy[i], c + dx[i]
                if 0 <= nr < R and 0 <= nc < C:
                    if icebergs[nr][nc] == 0:
                        sea_count += 1
            
            if sea_count > 0:
                melt_info.append((r, c, sea_count))
        
        # 실제 맵 업데이트
        for r, c, m in melt_info:
            icebergs[r][c] = max(0, icebergs[r][c] - m)
        
        # 내년에 검사할 빙산 리스트 갱신 (살아남은 애들만)
        for r, c in ice_coords:
            if icebergs[r][c] > 0:
                new_ice_coords.append((r, c))
        
        ice_coords = new_ice_coords # 리스트 교체
        year += 1

    return 0 # 모든 빙산이 녹을 때까지 분리되지 않은 경우

# 결과 출력
print(solve())