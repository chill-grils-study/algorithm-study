def solution(n, q, ans):
    answer = 0

    def dfs(selected, current_num):
        nonlocal answer

        # 5개를 선택했다면 조건 검사
        if len(selected) == 5:
            count = 0

            for idx, target in enumerate(q):
                if len(set(selected) & set(target)) == ans[idx]:
                    count += 1

            if count == len(q):
                answer += 1

            return

        # n을 넘어가면 종료
        if current_num > n:
            return

        # current_num을 선택하지 않는 경우
        dfs(selected, current_num + 1)

        # current_num을 선택하는 경우
        selected.append(current_num)
        dfs(selected, current_num + 1)
        selected.pop()

    dfs([], 1)

    return answer
