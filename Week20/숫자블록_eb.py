def maxdivisor(num):
    if num == 1:
        return 0

    block = 1

    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:

            # 작은 약수
            if i <= 10_000_000:
                block = max(block, i)

            # 큰 약수
            big = num // i
            if big <= 10_000_000:
                block = max(block, big)

    return block


def solution(begin, end):
    answer = []

    for num in range(begin, end + 1):
        answer.append(maxdivisor(num))

    return answer
