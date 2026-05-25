import heapq

def to_minute(time):
    h, m = map(int, time.split(":"))
    return h * 60 + m

def solution(book_time):
    times = []

    # 시간을 분으로 변환
    for start, end in book_time:
        s = to_minute(start)
        e = to_minute(end) + 10  # 청소시간 추가
        times.append((s, e))

    # 시작 시간 기준 정렬
    times.sort()

    pq = []

    for start, end in times:

        # 가장 빨리 끝난 방 재사용 가능
        if pq and pq[0] <= start:
            heapq.heappop(pq)

        heapq.heappush(pq, end) # 끝나는 시간을 넣기! 

    return len(pq)