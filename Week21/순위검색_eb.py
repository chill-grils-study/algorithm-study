from collections import defaultdict
from itertools import product
from bisect import bisect_left

def binary_search(arr, target):
    left = 0
    right = len(arr)

    while left < right:
        mid = (left + right) // 2

        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid

    return left

def solution(info, query):
    data = defaultdict(list)

    # 1. info를 조건별로 16개 조합으로 만들어 저장
    for person in info:
        language, job, career, food, score = person.split()
        score = int(score)

        conditions = [
            [language, "-"],
            [job, "-"],
            [career, "-"],
            [food, "-"]
        ]

        for combination in product(*conditions):
            key = "_".join(combination)
            data[key].append(score)

    # 2. 각 그룹의 점수를 정렬
    for scores in data.values():
        scores.sort()

    answer = []

    # 3. query 처리
    for q in query:
        parts = q.replace(" and ", " ").split()

        language, job, career, food = parts[:4]
        score = int(parts[4])

        key = "_".join([language, job, career, food])

        # score 이상인 첫 번째 위치
        index = binary_search(data[key], score)

        # 그 뒤에 있는 사람들의 수
        answer.append(len(data[key]) - index)

    return answer
