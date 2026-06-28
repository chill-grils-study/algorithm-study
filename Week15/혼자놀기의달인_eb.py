def solution(cards):
    visited = [False] * len(cards)
    results = []

    for i in range(len(cards)):
        if visited[i]: # 이미 봤으면 넘어감
            continue

        cur = i
        cnt = 0 # 싸이클 수

        while not visited[cur]:
            visited[cur] = True
            cnt += 1
            cur = cards[cur] - 1 # 인덱스니까 -1

        results.append(cnt)

    if len(results) < 2:
        return 0

    results.sort(reverse=True)
    return results[0] * results[1]