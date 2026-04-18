import sys
input = sys.stdin.readline

N = int(input())
S = [list(map(int, input().split())) for _ in range(N)]

visited = [False] * N
answer = float('inf')


def dfs(idx, count):
    global answer

    # N/2명 뽑으면 팀 완성
    if count == N // 2:
        start, link = 0, 0

        for i in range(N):
            for j in range(i + 1, N):
                if visited[i] and visited[j]:
                    start += S[i][j] + S[j][i]
                elif not visited[i] and not visited[j]:
                    link += S[i][j] + S[j][i]

        answer = min(answer, abs(start - link))
        return

    # 조합 생성
    for i in range(idx, N):
        visited[i] = True
        dfs(i + 1, count + 1)
        visited[i] = False


dfs(0, 0)
print(answer)
