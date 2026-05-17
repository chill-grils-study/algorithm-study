def solution(players, m, k):
    answer = 0

    # 각 시간대에 현재 살아있는 서버 수
    server = [0] * 24

    for i in range(24):

        # 현재 시간에 필요한 서버 수
        need = players[i] // m

        # 부족한 서버 수
        add = need - server[i]

        # 부족하면 증설
        if add > 0:

            answer += add

            # k시간 동안 서버 유지
            for j in range(i, min(i + k, 24)):
                server[j] += add

    return answer