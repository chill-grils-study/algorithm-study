import math
def solution(n, stations, w):
    answer = 0
    scope = w * 2 + 1
    # 빈 구간을 찾기
    start = 1
    for station in stations:
        end = station - w # 기지국 영향 전

        if start < end:
            length = end - start
            answer += math.ceil(length / scope)
        start = station + w + 1 # 또 다른 빈구간 찾기

    if start <= n:
        length = n - start + 1
        answer += math.ceil(length / scope)

    return answer
