def solution(picks, minerals):
    answer = 0
    # 그리디!
    # 캘 수 있는 광물까지 자름
    max_minerals = sum(picks) * 5
    minerals = minerals[:max_minerals]

    group = []
    # 5개씩 묶음. 최대 5개 연속으로 캐기
    for i in range(0, len(minerals), 5):
        dia, iron, stone = 0, 0, 0

        for j in range(i, min(i + 5, len(minerals))):
            if minerals[j] == "diamond":
                dia += 1
            elif minerals[j] == "iron":
                iron += 1
            else:
                stone += 1
        # 돌 곡괭이를 썼을 때 기준으로 cost를 매김
        # 이 기준으로 비용 클수록 절약도 많이 됨
        group.append((dia*25 + iron*5 + stone, dia, iron, stone))
    
    # 비용 많이 드는 순으로 내림차순
    group.sort(key=lambda x: x[0], reverse=True)
    
    answer = 0

    for cost, dia, iron, stone in group:
        if picks[0] > 0:
            picks[0] -= 1
            answer += dia + iron + stone

        elif picks[1] > 0:
            picks[1] -= 1
            answer += dia * 5 + iron + stone

        elif picks[2] > 0:
            picks[2] -= 1
            answer += cost
    return answer