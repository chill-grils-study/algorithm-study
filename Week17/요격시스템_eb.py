def solution(targets):
    answer = 0
    targets.sort(key=lambda x: x[1])
    last_position = 0
    for target in targets:
        if last_position <= target[0]:
          answer += 1
          last_position = target[1]
    return answer