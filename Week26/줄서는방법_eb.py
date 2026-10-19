# from itertools import permutations
# 시간 초과
# def solution(n, k):
#     arr = [1 * i for i in range(1, n+1)]
#     answer = list(permutations(arr, n))
#     return answer[k-1]

import math

def solution(n, k):
    people = list(range(1, n + 1))   # 아직 안 고른 사람
    k -= 1                           # 0번째부터 세기
    answer = []
    while people:
        g = math.factorial(len(people) - 1) # 묶음 하나의 크기
        answer.append(people.pop(k // g))     # 몇 번째 묶음인지 → 그 사람을 고름
        k %= g                                # 묶음 안에서 몇 번째인지 → 다음 k
    return answer
