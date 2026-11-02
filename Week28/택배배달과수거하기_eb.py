def solution(cap, n, deliveries, pickups):
    deliveries = deliveries[:]  # 원본 보호
    pickups = pickups[:]
    answer = 0

    def process(arr):
        load = cap
        while arr and load > 0:
            if arr[-1] <= load:
                load -= arr.pop()    # 이 집 물량 전부 처리하고 제거
            else:
                arr[-1] -= load      # 일부만 처리하고 트럭이 꽉 참
                load = 0

    while True:
        # 끝에 남은 0(할 일 없는 집) 제거
        while deliveries and deliveries[-1] == 0:
            deliveries.pop()
        while pickups and pickups[-1] == 0:
            pickups.pop()

        if not deliveries and not pickups:
            break

        # 배열 길이 = 일이 남은 가장 먼 집 번호 (1부터 시작)
        answer += max(len(deliveries), len(pickups)) * 2
        process(deliveries)
        process(pickups)

    return answer
